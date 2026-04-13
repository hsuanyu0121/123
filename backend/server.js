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
  // Taipei City (12 districts)
  { name: "Taipei-Ximending", latitude: 25.0421, longitude: 121.5094 },
  { name: "Taipei-Xinyi", latitude: 25.033, longitude: 121.5654 },
  { name: "Taipei-Zhongzheng", latitude: 25.0324, longitude: 121.5199 },
  { name: "Taipei-Datong", latitude: 25.0637, longitude: 121.5125 },
  { name: "Taipei-Wanhua", latitude: 25.0314, longitude: 121.4978 },

  // New Taipei City (29 districts)
  { name: "NewTaipei-Banqiao", latitude: 25.0143, longitude: 121.4672 },
  { name: "NewTaipei-Zhonghe", latitude: 24.9936, longitude: 121.5091 },
  { name: "NewTaipei-Tucheng", latitude: 24.9742, longitude: 121.4407 },
  { name: "NewTaipei-Xinzhuang", latitude: 25.0375, longitude: 121.4521 },
  { name: "NewTaipei-Sanchong", latitude: 25.0648, longitude: 121.4869 },

  // Taoyuan City (13 districts)
  { name: "Taoyuan-Taoyuan", latitude: 24.9936, longitude: 121.3010 },
  { name: "Taoyuan-Zhongli", latitude: 24.9632, longitude: 121.2217 },
  { name: "Taoyuan-Pingzhen", latitude: 24.9435, longitude: 121.2168 },
  { name: "Taoyuan-Bade", latitude: 24.9286, longitude: 121.2988 },
  { name: "Taoyuan-Daxi", latitude: 24.8809, longitude: 121.2901 },

  // Taichung City (29 districts)
  { name: "Taichung-Xitun", latitude: 24.1820, longitude: 120.6169 },
  { name: "Taichung-Nantun", latitude: 24.1477, longitude: 120.6736 },
  { name: "Taichung-Beitun", latitude: 24.1675, longitude: 120.7407 },
  { name: "Taichung-Dali", latitude: 24.0996, longitude: 120.6931 },
  { name: "Taichung-Wufeng", latitude: 24.0692, longitude: 120.6992 },

  // Tainan City (37 districts)
  { name: "Tainan-Anping", latitude: 22.9997, longitude: 120.1658 },
  { name: "Tainan-Xinying", latitude: 23.3064, longitude: 120.3208 },
  { name: "Tainan-Yongkang", latitude: 23.0386, longitude: 120.2478 },
  { name: "Tainan-Rende", latitude: 22.9238, longitude: 120.2381 },
  { name: "Tainan-Guiren", latitude: 22.8873, longitude: 120.2971 },

  // Kaohsiung City (38 districts)
  { name: "Kaohsiung-Sanzih", latitude: 22.6273, longitude: 120.3014 },
  { name: "Kaohsiung-Nanzih", latitude: 22.7284, longitude: 120.3255 },
  { name: "Kaohsiung-Qianzhen", latitude: 22.6113, longitude: 120.3071 },
  { name: "Kaohsiung-Xinxing", latitude: 22.6237, longitude: 120.3021 },
  { name: "Kaohsiung-Yancheng", latitude: 22.6544, longitude: 120.2868 },

  // Keelung City (7 districts)
  { name: "Keelung-Zhongzheng", latitude: 25.1276, longitude: 121.7444 },
  { name: "Keelung-Xinyi", latitude: 25.1292, longitude: 121.7594 },
  { name: "Keelung-Ren'ai", latitude: 25.1256, longitude: 121.7424 },

  // Hsinchu City (3 districts)
  { name: "Hsinchu-Xiangshan", latitude: 24.8138, longitude: 120.9675 },
  { name: "Hsinchu-North", latitude: 24.8138, longitude: 120.9675 },
  { name: "Hsinchu-East", latitude: 24.8138, longitude: 120.9675 },

  // Chiayi City (2 districts)
  { name: "Chiayi-East", latitude: 23.4791, longitude: 120.4411 },
  { name: "Chiayi-West", latitude: 23.4791, longitude: 120.4411 },

  // Hsinchu County
  { name: "HsinchuCounty-Zhubei", latitude: 24.8383, longitude: 121.0077 },
  { name: "HsinchuCounty-Hukou", latitude: 24.9047, longitude: 121.0387 },

  // Miaoli County
  { name: "Miaoli-Miaoli", latitude: 24.5649, longitude: 120.8202 },
  { name: "Miaoli-Tongxiao", latitude: 24.4914, longitude: 120.6839 },
  { name: "Miaoli-Zhunan", latitude: 24.6869, longitude: 120.8793 },

  // Changhua County
  { name: "Changhua-Changhua", latitude: 24.0717, longitude: 120.5624 },
  { name: "Changhua-Lukang", latitude: 24.0578, longitude: 120.4367 },
  { name: "Changhua-Yuanlin", latitude: 23.9664, longitude: 120.5711 },

  // Nantou County
  { name: "Nantou-Nantou", latitude: 23.9157, longitude: 120.6639 },
  { name: "Nantou-Puli", latitude: 23.9664, longitude: 120.9714 },
  { name: "Nantou-Zhushan", latitude: 23.7649, longitude: 120.6799 },

  // Yunlin County
  { name: "Yunlin-Douliu", latitude: 23.7094, longitude: 120.5437 },
  { name: "Yunlin-Huwei", latitude: 23.7119, longitude: 120.4311 },
  { name: "Yunlin-Beigang", latitude: 23.5753, longitude: 120.2931 },

  // Chiayi County
  { name: "ChiayiCounty-Budai", latitude: 23.3829, longitude: 120.1231 },
  { name: "ChiayiCounty-Dalin", latitude: 23.6008, longitude: 120.4567 },
  { name: "ChiayiCounty-Xikou", latitude: 23.1464, longitude: 120.4661 },

  // Pingtung County
  { name: "Pingtung-Pingtung", latitude: 22.6642, longitude: 120.4881 },
  { name: "Pingtung-Kaohsiung", latitude: 22.6273, longitude: 120.3014 },
  { name: "Pingtung-Chaozhou", latitude: 22.5533, longitude: 120.5364 },

  // Yilan County
  { name: "Yilan-Yilan", latitude: 24.7571, longitude: 121.7530 },
  { name: "Yilan-Luodong", latitude: 24.6797, longitude: 121.7670 },
  { name: "Yilan-Suao", latitude: 24.5951, longitude: 121.8534 },

  // Hualien County
  { name: "Hualien-Hualien", latitude: 23.9872, longitude: 121.6015 },
  { name: "Hualien-Ji'an", latitude: 23.9711, longitude: 121.5525 },
  { name: "Hualien-Xincheng", latitude: 24.0358, longitude: 121.6094 },

  // Taitung County
  { name: "Taitung-Taitung", latitude: 22.7583, longitude: 121.1444 },
  { name: "Taitung-Beinan", latitude: 22.7967, longitude: 121.1250 },
  { name: "Taitung-Chishang", latitude: 22.8333, longitude: 121.0833 },

  // Penghu County
  { name: "Penghu-Magong", latitude: 23.5655, longitude: 119.5667 },
  { name: "Penghu-Xiyu", latitude: 23.5994, longitude: 119.5117 },

  // Kinmen County
  { name: "Kinmen-Jinsha", latitude: 24.4478, longitude: 118.4391 },
  { name: "Kinmen-Jincheng", latitude: 24.4341, longitude: 118.3186 },

  // Lienchiang County (Matsu)
  { name: "Lienchiang-Nangan", latitude: 26.1597, longitude: 119.9499 },
  { name: "Lienchiang-Beigan", latitude: 26.2242, longitude: 120.0022 }
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
    // Process cities in batches to avoid overwhelming the API
    const BATCH_SIZE = 10;
    const DELAY_MS = 100; // Delay between batches

    const successful = [];
    const failed = [];

    for (let i = 0; i < TAIWAN_CITIES.length; i += BATCH_SIZE) {
      const batch = TAIWAN_CITIES.slice(i, i + BATCH_SIZE);
      const batchResults = await Promise.allSettled(batch.map((city) => fetchTaiwanCityHeat(city)));

      batchResults.forEach((result) => {
        if (result.status === "fulfilled") {
          successful.push(result.value);
        } else {
          failed.push(result.reason);
        }
      });

      // Add delay between batches (except for the last batch)
      if (i + BATCH_SIZE < TAIWAN_CITIES.length) {
        await new Promise(resolve => setTimeout(resolve, DELAY_MS));
      }
    }

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

// Get detailed weather for a specific location
app.get("/api/location-weather", async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        errorCode: "MISSING_CITY",
        errorMessage: "City parameter is required",
        httpStatus: 400,
      });
    }

    // Find the city in our TAIWAN_CITIES array
    const cityData = TAIWAN_CITIES.find(c => c.name === city);
    if (!cityData) {
      return res.status(404).json({
        errorCode: "CITY_NOT_FOUND",
        errorMessage: "City not found in our database",
        httpStatus: 404,
      });
    }

    // Fetch detailed weather data for this city
    const weatherData = await fetchTaiwanCityHeat(cityData);

    // Calculate heat stress level based on Taiwan government standards
    const heatStressLevel = calculateHeatStressLevel(weatherData.heatIndexC, weatherData.relativeHumidity);

    return res.json({
      source: "Open-Meteo",
      updatedAt: new Date().toISOString(),
      location: weatherData,
      heatStress: heatStressLevel,
    });
  } catch (error) {
    console.error("Location weather error:", error);
    return res.status(500).json({
      errorCode: "LOCATION_WEATHER_FETCH_FAILED",
      errorMessage: "Failed to fetch location weather data.",
      httpStatus: 500,
    });
  }
});

// Calculate heat stress level based on Taiwan government standards
function calculateHeatStressLevel(heatIndexC, humidity) {
  if (typeof heatIndexC !== "number" || Number.isNaN(heatIndexC)) {
    return {
      level: "unknown",
      description: "Unable to determine heat stress level",
      recommendations: ["Monitor weather conditions closely"]
    };
  }

  // Taiwan Central Weather Bureau heat stress classification
  if (heatIndexC >= 54) {
    return {
      level: "extreme_danger",
      description: "極端危險 (Extreme Danger)",
      color: "#8B0000",
      recommendations: [
        "避免所有戶外活動",
        "待在有空調的室內環境",
        "準備充足的飲用水",
        "監測身體狀況，如有不適立即就醫"
      ]
    };
  } else if (heatIndexC >= 41) {
    return {
      level: "danger",
      description: "危險 (Danger)",
      color: "#DC143C",
      recommendations: [
        "減少戶外活動時間",
        "多補充水分和電解質",
        "穿著輕便透氣衣物",
        "注意休息，避免劇烈運動"
      ]
    };
  } else if (heatIndexC >= 32) {
    return {
      level: "extreme_caution",
      description: "極端注意 (Extreme Caution)",
      color: "#FF8C00",
      recommendations: [
        "限制戶外活動時間",
        "多喝水，注意休息",
        "避免在中午陽光下活動",
        "監測年長者和孩童的健康狀況"
      ]
    };
  } else if (heatIndexC >= 27) {
    return {
      level: "caution",
      description: "注意 (Caution)",
      color: "#FFD700",
      recommendations: [
        "適度補充水分",
        "避免長時間在烈日下活動",
        "穿著適當的防曬衣物",
        "注意身體的早期不適症狀"
      ]
    };
  } else {
    return {
      level: "comfortable",
      description: "舒適 (Comfortable)",
      color: "#32CD32",
      recommendations: [
        "正常活動",
        "保持適度水分補充",
        "享受戶外活動"
      ]
    };
  }
}

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
