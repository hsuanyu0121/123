import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "..", "frontend");

const TAIWAN_CITIES = [
  { name: "Taipei", latitude: 25.033, longitude: 121.5654 },
  { name: "Taichung", latitude: 24.1477, longitude: 120.6736 },
  { name: "Tainan", latitude: 22.9997, longitude: 120.227 },
  { name: "Kaohsiung", latitude: 22.6273, longitude: 120.3014 },
  { name: "Hsinchu", latitude: 24.8138, longitude: 120.9675 },
  { name: "Hualien", latitude: 23.9872, longitude: 121.6015 },
];

if (!process.env.GEMINI_API_KEY) {
  console.error("Missing GEMINI_API_KEY in environment variables.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.static(frontendPath));

function roundTo(value, digits = 1) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return null;
  }

  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function average(values) {
  const valid = values.filter((value) => typeof value === "number" && !Number.isNaN(value));

  if (!valid.length) {
    return null;
  }

  return valid.reduce((sum, value) => sum + value, 0) / valid.length;
}

function calculateHeatIndexCelsius(temperatureC, relativeHumidity) {
  if (typeof temperatureC !== "number" || typeof relativeHumidity !== "number") {
    return null;
  }

  const temperatureF = (temperatureC * 9) / 5 + 32;
  const rh = relativeHumidity;

  if (temperatureF < 80 || rh < 40) {
    return roundTo(temperatureC, 1);
  }

  const heatIndexF =
    -42.379 +
    2.04901523 * temperatureF +
    10.14333127 * rh -
    0.22475541 * temperatureF * rh -
    0.00683783 * temperatureF * temperatureF -
    0.05481717 * rh * rh +
    0.00122874 * temperatureF * temperatureF * rh +
    0.00085282 * temperatureF * rh * rh -
    0.00000199 * temperatureF * temperatureF * rh * rh;

  const heatIndexC = ((heatIndexF - 32) * 5) / 9;
  return roundTo(heatIndexC, 1);
}

function getHeatRiskLevel(heatIndexC) {
  if (typeof heatIndexC !== "number" || Number.isNaN(heatIndexC)) {
    return "unknown";
  }

  if (heatIndexC < 27) {
    return "low";
  }

  if (heatIndexC < 32) {
    return "caution";
  }

  if (heatIndexC < 41) {
    return "extreme_caution";
  }

  if (heatIndexC < 54) {
    return "danger";
  }

  return "extreme_danger";
}

async function fetchTaiwanCityHeat(city) {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    timezone: "Asia/Taipei",
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,dew_point_2m,wind_speed_10m,surface_pressure",
  });

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const weatherResponse = await fetch(weatherUrl);

  if (!weatherResponse.ok) {
    throw new Error(`Weather API failed for ${city.name} with status ${weatherResponse.status}`);
  }

  const weatherJson = await weatherResponse.json();
  const current = weatherJson?.current || {};

  const temperatureC = typeof current.temperature_2m === "number" ? current.temperature_2m : null;
  const relativeHumidity = typeof current.relative_humidity_2m === "number" ? current.relative_humidity_2m : null;
  const apparentTemperatureC = typeof current.apparent_temperature === "number" ? current.apparent_temperature : null;
  const dewPointC = typeof current.dew_point_2m === "number" ? current.dew_point_2m : null;
  const windSpeedKmh = typeof current.wind_speed_10m === "number" ? current.wind_speed_10m : null;
  const pressureHpa = typeof current.surface_pressure === "number" ? current.surface_pressure : null;

  const heatIndexC = calculateHeatIndexCelsius(temperatureC, relativeHumidity);
  const heatRiskLevel = getHeatRiskLevel(heatIndexC);

  return {
    city: city.name,
    observedAt: current.time || null,
    temperatureC: roundTo(temperatureC, 1),
    relativeHumidity: roundTo(relativeHumidity, 1),
    apparentTemperatureC: roundTo(apparentTemperatureC, 1),
    dewPointC: roundTo(dewPointC, 1),
    windSpeedKmh: roundTo(windSpeedKmh, 1),
    pressureHpa: roundTo(pressureHpa, 1),
    heatIndexC,
    heatRiskLevel,
  };
}

app.get("/api/taiwan-heat", async (req, res) => {
  try {
    const cityResults = await Promise.allSettled(TAIWAN_CITIES.map((city) => fetchTaiwanCityHeat(city)));

    const successful = cityResults
      .filter((result) => result.status === "fulfilled")
      .map((result) => result.value);

    if (!successful.length) {
      return res.status(502).json({
        errorCode: "WEATHER_API_UNAVAILABLE",
        errorMessage: "Unable to retrieve live Taiwan weather data right now.",
        httpStatus: 502,
      });
    }

    const hottest = successful.reduce((currentMax, item) => {
      if (!currentMax) {
        return item;
      }

      return (item.heatIndexC ?? -Infinity) > (currentMax.heatIndexC ?? -Infinity) ? item : currentMax;
    }, null);

    const summary = {
      averageTemperatureC: roundTo(average(successful.map((item) => item.temperatureC)), 1),
      averageRelativeHumidity: roundTo(average(successful.map((item) => item.relativeHumidity)), 1),
      averageApparentTemperatureC: roundTo(average(successful.map((item) => item.apparentTemperatureC)), 1),
      averageWindSpeedKmh: roundTo(average(successful.map((item) => item.windSpeedKmh)), 1),
      maxHeatIndexC: hottest?.heatIndexC ?? null,
      maxHeatCity: hottest?.city ?? null,
      maxHeatRiskLevel: hottest?.heatRiskLevel ?? "unknown",
    };

    return res.json({
      source: "Open-Meteo",
      updatedAt: new Date().toISOString(),
      summary,
      locations: successful,
    });
  } catch (error) {
    console.error("Taiwan heat data error:", error);
    return res.status(500).json({
      errorCode: "TAIWAN_HEAT_FETCH_FAILED",
      errorMessage: "Failed to fetch Taiwan heat data.",
      httpStatus: 500,
    });
  }
});

function getModelCandidates() {
  const primaryModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  const fallbackModels = (process.env.GEMINI_FALLBACK_MODELS || "gemini-2.5-flash-lite,gemini-2.0-flash-lite")
    .split(",")
    .map((model) => model.trim())
    .filter(Boolean)
    .filter((model) => model !== primaryModel);

  return [primaryModel, ...fallbackModels];
}

async function callGeminiModel(model, message) {
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

  const geminiResponse = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    }),
  });

  let data = {};

  try {
    data = await geminiResponse.json();
  } catch {
    data = {};
  }

  return { geminiResponse, data };
}

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        reply: "Message is required.",
        errorCode: "BAD_REQUEST",
        errorMessage: "The message field must be a non-empty string.",
        httpStatus: 400,
      });
    }

    const modelCandidates = getModelCandidates();
    let lastError = null;

    for (let index = 0; index < modelCandidates.length; index += 1) {
      const model = modelCandidates[index];
      const isLastModel = index === modelCandidates.length - 1;
      const { geminiResponse, data } = await callGeminiModel(model, message.trim());

      if (geminiResponse.ok) {
        const reply =
          (data?.candidates?.[0]?.content?.parts || [])
            .map((part) => part.text || "")
            .join("\n")
            .trim() || "I could not generate a response.";

        return res.json({ reply, modelUsed: model });
      }

      const errorCode = data?.error?.status || "GEMINI_API_ERROR";
      const providerCode = data?.error?.code || geminiResponse.status;
      const errorMessage = data?.error?.message || "Gemini API request failed.";
      const shouldTryFallback = geminiResponse.status === 503 || errorCode === "UNAVAILABLE";

      lastError = {
        httpStatus: geminiResponse.status,
        errorCode,
        providerCode,
        errorMessage,
        model,
      };

      if (shouldTryFallback && !isLastModel) {
        console.warn("Gemini model unavailable, trying fallback model.", {
          failedModel: model,
          nextModel: modelCandidates[index + 1],
          errorCode,
          httpStatus: geminiResponse.status,
        });
        continue;
      }

      break;
    }

    if (lastError) {
      console.error("Gemini API error:", lastError);

      return res.status(lastError.httpStatus).json({
        reply: `AI request failed (${lastError.errorCode}): ${lastError.errorMessage}`,
        errorCode: lastError.errorCode,
        errorMessage: lastError.errorMessage,
        httpStatus: lastError.httpStatus,
        providerCode: lastError.providerCode,
        modelTried: lastError.model,
      });
    }

    return res.status(500).json({
      reply: "AI request failed (GEMINI_API_ERROR): Unknown provider error.",
      errorCode: "GEMINI_API_ERROR",
      errorMessage: "Unknown provider error.",
      httpStatus: 500,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown server error.";
    return res.status(500).json({
      reply: "Server error while processing chat request.",
      errorCode: "INTERNAL_SERVER_ERROR",
      errorMessage,
      httpStatus: 500,
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
