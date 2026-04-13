const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:3000"
  : "https://chatbot-api-py4s.onrender.com";

const chatForm = document.getElementById("chatForm");
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const heatNumber = document.getElementById("heatNumber");
const checklistForm = document.getElementById("preventionChecklist");
const checkCount = document.getElementById("checkCount");
const langToggle = document.getElementById("langToggle");
const liveDataStatus = document.getElementById("liveDataStatus");
const liveAvgTempValue = document.getElementById("liveAvgTempValue");
const liveAvgRhValue = document.getElementById("liveAvgRhValue");
const liveMaxHeatValue = document.getElementById("liveMaxHeatValue");
const liveHottestCityValue = document.getElementById("liveHottestCityValue");
const liveDataTableBody = document.getElementById("liveDataTableBody");

const TRANSLATIONS = {
  en: {
    heroEyebrow: "Heat and Health Briefing",
    heroTitle: "Heat is Not Harmless",
    heroLead: "You may be underestimating your risk of heat-related illness.",
    metricLabelHeatIndex: "Animated heat index",
    metricLabelRiskTrend: "Risk trend",
    metricRiskValue: "Rising",
    metricRiskSub: "Hotter nights and humidity are increasing stress on the body.",
    scrollIndicator: "Scroll to explore",
    climateEyebrow: "Climate and Risk",
    climateTitle: "Why Heat is Becoming More Dangerous",
    climateBody1:
      "Heat danger is not just about air temperature. As humidity increases, sweat evaporates more slowly, and your body loses one of its most important cooling mechanisms.",
    climateBody2:
      "This means the heat index can climb far above the raw temperature reading, especially in dense urban spaces.",
    climateHighlight: "High humidity prevents the body from cooling down efficiently.",
    liveDataTitle: "Live Taiwan Heat Snapshot",
    liveLoading: "Loading latest Taiwan weather data...",
    liveUpdatedPrefix: "Updated",
    liveSourcePrefix: "Source",
    liveFetchError: "Could not load live Taiwan heat data",
    liveNoData: "No weather stations returned usable data.",
    liveAvgTempLabel: "Avg temperature",
    liveAvgRhLabel: "Avg humidity",
    liveMaxHeatLabel: "Max heat index",
    liveHottestCityLabel: "Highest-risk city",
    liveColCity: "City",
    liveColTemp: "Temp (C)",
    liveColRh: "RH (%)",
    liveColApparent: "Feels like (C)",
    liveColHeatIndex: "Heat index (C)",
    liveColRisk: "Risk",
    riskLow: "Low",
    riskCaution: "Caution",
    riskExtremeCaution: "Extreme caution",
    riskDanger: "Danger",
    riskExtremeDanger: "Extreme danger",
    riskUnknown: "Unknown",
    illnessEyebrow: "Heat Illness Basics",
    illnessTitle: "What is Heat-Related Illness?",
    crampsTitle: "Heat cramps",
    crampsDesc: "Painful muscle cramps triggered by heat and heavy sweating.",
    crampsSym1: "Muscle spasms in legs or abdomen",
    crampsSym2: "Heavy sweating",
    crampsSym3: "Thirst and fatigue",
    exhaustionTitle: "Heat exhaustion",
    exhaustionDesc: "The body is struggling to cool itself, often after prolonged heat exposure.",
    exhaustionSym1: "Dizziness and weakness",
    exhaustionSym2: "Nausea or headache",
    exhaustionSym3: "Cool, clammy skin",
    strokeTitle: "Heat stroke",
    strokeDesc: "A medical emergency where body temperature can rise rapidly to life-threatening levels.",
    strokeSym1: "Confusion or loss of consciousness",
    strokeSym2: "Hot, dry skin or no sweat",
    strokeSym3: "Rapid pulse and high body temperature",
    gapEyebrow: "Research Highlight",
    gapTitle: "Are You Really Safe?",
    gapSignalLabel: "Perception gap signal",
    gapSignalDesc: "of people report they are not personally at risk during extreme heat.",
    gapContrast: "Heat-related cases are increasing every year.",
    gapStatement: "There is a gap between real risk and perceived risk.",
    chip1: "Outdoor workers",
    chip2: "Young adults",
    chip3: "Older adults",
    chip4: "Athletes",
    portalEyebrow: "Portal",
    portalTitle: "Official Heat Safety Resources",
    portalDescription: "Quick access to official agencies for health guidance and weather alerts.",
    preventionEyebrow: "Prevention and Action",
    preventionTitle: "How to Protect Yourself",
    action1Title: "Drink more water",
    action1Desc: "Hydrate steadily across the day, not only when thirsty.",
    action2Title: "Avoid peak heat hours",
    action2Desc: "Reduce outdoor activity during the hottest afternoon period.",
    action3Title: "Check heat warnings",
    action3Desc: "Use weather alerts to plan safer work and travel schedules.",
    action4Title: "Wear light clothing",
    action4Desc: "Choose breathable fabrics and lighter colors when possible.",
    action5Title: "Stay in cool environments",
    action5Desc: "Take frequent cooling breaks in shade or air-conditioned spaces.",
    checklistTitle: "How many are you doing?",
    checkItem1: "Drink water every hour",
    checkItem2: "Limit exposure from 11 AM to 3 PM",
    checkItem3: "Review local heat alerts daily",
    checkItem4: "Wear breathable clothes outdoors",
    checkItem5: "Plan breaks in cool spaces",
    checkCountSuffix: "habits checked today",
    chatbotLabel: "Ask about heat safety",
    chatHeaderTitle: "Heat Safety Assistant",
    chatHeaderDesc: "Ask about symptoms, risk, and prevention.",
    chatPlaceholder: "Ask a heat safety question...",
    chatSend: "Send",
    chatGreeting: "Hello. I can explain heat risk, symptoms, and prevention steps.",
    typing: "AI is typing...",
    noResponse: "No response from AI.",
    requestFailed: "Request failed.",
    errorPrefix: "Error",
    networkPrefix: "Network error",
    quizButton: "Take Risk Perception Quiz",
    quizTitle: "Risk Perception Quiz",
    quizDesc: "Answer these questions to see if there's a gap between your perceived risk and actual risk of heat-related illness.",
    submitQuiz: "Submit Quiz",
  },
  zh: {
    heroEyebrow: "高溫與健康重點",
    heroTitle: "熱不是小事",
    heroLead: "你可能低估了自己罹患熱相關疾病的風險。",
    metricLabelHeatIndex: "體感溫度示意",
    metricLabelRiskTrend: "風險趨勢",
    metricRiskValue: "持續上升",
    metricRiskSub: "高溫夜晚與濕度上升，正在增加身體的熱壓力。",
    scrollIndicator: "向下捲動查看",
    climateEyebrow: "氣候與風險",
    climateTitle: "為什麼高溫越來越危險",
    climateBody1:
      "高溫風險不只看氣溫。當濕度上升，汗水蒸發會變慢，人體最重要的散熱機制就會受限。",
    climateBody2: "這代表體感溫度可能遠高於實際氣溫，尤其在都市熱島環境更明顯。",
    climateHighlight: "高濕度會讓身體難以有效降溫。",
    liveDataTitle: "台灣即時熱風險快照",
    liveLoading: "正在載入台灣即時氣象資料...",
    liveUpdatedPrefix: "更新時間",
    liveSourcePrefix: "資料來源",
    liveFetchError: "無法載入台灣即時熱資料",
    liveNoData: "目前沒有可用的測站資料。",
    liveAvgTempLabel: "平均氣溫",
    liveAvgRhLabel: "平均相對濕度",
    liveMaxHeatLabel: "最高熱指數",
    liveHottestCityLabel: "最高風險城市",
    liveColCity: "城市",
    liveColTemp: "氣溫 (C)",
    liveColRh: "濕度 (%)",
    liveColApparent: "體感溫度 (C)",
    liveColHeatIndex: "熱指數 (C)",
    liveColRisk: "風險等級",
    riskLow: "低",
    riskCaution: "注意",
    riskExtremeCaution: "高度注意",
    riskDanger: "危險",
    riskExtremeDanger: "極度危險",
    riskUnknown: "未知",
    illnessEyebrow: "熱傷害基礎知識",
    illnessTitle: "什麼是熱相關疾病？",
    crampsTitle: "熱痙攣",
    crampsDesc: "在高溫大量流汗後，肌肉容易出現疼痛性抽筋。",
    crampsSym1: "腿部或腹部肌肉痙攣",
    crampsSym2: "大量出汗",
    crampsSym3: "口渴與疲倦",
    exhaustionTitle: "熱衰竭",
    exhaustionDesc: "長時間暴露高溫後，身體調節溫度能力開始失衡。",
    exhaustionSym1: "頭暈與虛弱",
    exhaustionSym2: "噁心或頭痛",
    exhaustionSym3: "皮膚濕冷黏膩",
    strokeTitle: "熱中暑",
    strokeDesc: "屬於緊急醫療狀況，體溫可能快速升高到危及生命。",
    strokeSym1: "意識混亂或昏迷",
    strokeSym2: "皮膚灼熱乾燥或停止出汗",
    strokeSym3: "脈搏快速且體溫升高",
    gapEyebrow: "研究重點",
    gapTitle: "你真的安全嗎？",
    gapSignalLabel: "風險認知落差",
    gapSignalDesc: "的人認為自己在極端高溫下沒有明顯風險。",
    gapContrast: "熱相關病例每年都在增加。",
    gapStatement: "真實風險與主觀感受之間，存在明顯落差。",
    chip1: "戶外工作者",
    chip2: "年輕成人",
    chip3: "高齡族群",
    chip4: "運動族群",
    portalEyebrow: "傳送門",
    portalTitle: "官方熱安全資源",
    portalDescription: "快速連結到政府機構的健康指引與氣象警示。",
    preventionEyebrow: "預防與行動",
    preventionTitle: "如何保護自己",
    action1Title: "多補充水分",
    action1Desc: "整天分次補水，不要等口渴才喝。",
    action2Title: "避開尖峰高溫時段",
    action2Desc: "在午後最熱時間減少戶外活動。",
    action3Title: "查看高溫警示",
    action3Desc: "依照天氣警報調整行程與工作安排。",
    action4Title: "穿著輕薄透氣衣物",
    action4Desc: "優先選擇透氣材質與淺色服裝。",
    action5Title: "待在涼爽環境",
    action5Desc: "定時到陰涼或空調空間休息降溫。",
    checklistTitle: "你今天做到幾項？",
    checkItem1: "每小時補充一次水分",
    checkItem2: "11 點到 3 點盡量減少曝曬",
    checkItem3: "每天查看在地高溫警示",
    checkItem4: "戶外穿著透氣衣物",
    checkItem5: "安排在涼爽空間休息",
    checkCountSuffix: "項今天已做到",
    chatbotLabel: "詢問高溫安全",
    chatHeaderTitle: "高溫安全助理",
    chatHeaderDesc: "可詢問症狀、風險與預防建議。",
    chatPlaceholder: "請輸入高溫安全問題...",
    chatSend: "送出",
    chatGreeting: "你好，我可以說明高溫風險、症狀與預防方法。",
    typing: "AI 正在輸入...",
    noResponse: "AI 沒有回覆。",
    requestFailed: "請求失敗。",
    errorPrefix: "錯誤",
    networkPrefix: "網路錯誤",
    quizButton: "進行風險認知測驗",
    quizTitle: "風險認知測驗",
    quizDesc: "回答這些問題，看看你對熱相關疾病的認知風險與實際風險是否有落差。",
    submitQuiz: "提交測驗",
  },
};

const CHART_TEXT = {
  en: {
    climateLabels: ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"],
    tempLabel: "Temperature (C)",
    heatLabel: "Heat index (C)",
    perceptionLabels: ["People who feel low personal risk", "Measured rise in heat-related cases"],
    perceptionDatasetLabel: "Percent",
  },
  zh: {
    climateLabels: ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
    tempLabel: "氣溫 (C)",
    heatLabel: "體感溫度 (C)",
    perceptionLabels: ["自認風險低的人", "熱相關病例增幅"],
    perceptionDatasetLabel: "百分比",
  },
};

let currentLanguage = localStorage.getItem("siteLanguage") === "zh" ? "zh" : "en";
let climateChartInstance = null;
let perceptionChartInstance = null;
let taiwanHeatData = null;
let taiwanHeatRefreshTimer = null;

const CITY_NAME_MAP = {
  zh: {
    Taipei: "台北",
    Taichung: "台中",
    Tainan: "台南",
    Kaohsiung: "高雄",
    Hsinchu: "新竹",
    Hualien: "花蓮",
  },
};

function t(key) {
  return TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS.en[key] || "";
}

function translateCityName(city) {
  if (!city) {
    return "--";
  }

  return CITY_NAME_MAP[currentLanguage]?.[city] || city;
}

function formatMetric(value, suffix = "", digits = 1) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "--";
  }

  return `${value.toFixed(digits)}${suffix}`;
}

function riskLabel(level) {
  const keyMap = {
    low: "riskLow",
    caution: "riskCaution",
    extreme_caution: "riskExtremeCaution",
    danger: "riskDanger",
    extreme_danger: "riskExtremeDanger",
    unknown: "riskUnknown",
  };

  return t(keyMap[level] || "riskUnknown");
}

function riskClass(level) {
  switch (level) {
    case "low":
      return "risk-low";
    case "caution":
      return "risk-caution";
    case "extreme_caution":
      return "risk-extreme-caution";
    case "danger":
      return "risk-danger";
    case "extreme_danger":
      return "risk-extreme-danger";
    default:
      return "risk-unknown";
  }
}

function setLiveStatus(text, isError = false) {
  if (!liveDataStatus) {
    return;
  }

  liveDataStatus.textContent = text;
  liveDataStatus.classList.toggle("error", isError);
}

function renderLiveDataTableRows(locations) {
  if (!liveDataTableBody) {
    return;
  }

  liveDataTableBody.innerHTML = "";

  if (!Array.isArray(locations) || !locations.length) {
    const emptyRow = document.createElement("tr");
    const emptyCell = document.createElement("td");
    emptyCell.colSpan = 6;
    emptyCell.textContent = t("liveNoData");
    emptyRow.appendChild(emptyCell);
    liveDataTableBody.appendChild(emptyRow);
    return;
  }

  locations.forEach((location) => {
    const row = document.createElement("tr");

    const cityCell = document.createElement("td");
    cityCell.textContent = translateCityName(location.city);
    row.appendChild(cityCell);

    const tempCell = document.createElement("td");
    tempCell.textContent = formatMetric(location.temperatureC, "", 1);
    row.appendChild(tempCell);

    const rhCell = document.createElement("td");
    rhCell.textContent = formatMetric(location.relativeHumidity, "", 1);
    row.appendChild(rhCell);

    const apparentCell = document.createElement("td");
    apparentCell.textContent = formatMetric(location.apparentTemperatureC, "", 1);
    row.appendChild(apparentCell);

    const heatCell = document.createElement("td");
    heatCell.textContent = formatMetric(location.heatIndexC, "", 1);
    row.appendChild(heatCell);

    const riskCell = document.createElement("td");
    const riskPill = document.createElement("span");
    riskPill.className = `risk-pill ${riskClass(location.heatRiskLevel)}`;
    riskPill.textContent = riskLabel(location.heatRiskLevel);
    riskCell.appendChild(riskPill);
    row.appendChild(riskCell);

    liveDataTableBody.appendChild(row);
  });
}

function renderTaiwanHeatPanel() {
  if (!taiwanHeatData) {
    return;
  }

  const summary = taiwanHeatData.summary || {};

  if (liveAvgTempValue) {
    liveAvgTempValue.textContent = `${formatMetric(summary.averageTemperatureC, "", 1)} C`;
  }

  if (liveAvgRhValue) {
    liveAvgRhValue.textContent = `${formatMetric(summary.averageRelativeHumidity, "", 1)} %`;
  }

  if (liveMaxHeatValue) {
    liveMaxHeatValue.textContent = `${formatMetric(summary.maxHeatIndexC, "", 1)} C`;
  }

  if (liveHottestCityValue) {
    liveHottestCityValue.textContent = summary.maxHeatCity ? translateCityName(summary.maxHeatCity) : "--";
  }

  renderLiveDataTableRows(taiwanHeatData.locations);

  if (taiwanHeatData.updatedAt) {
    const updatedDate = new Date(taiwanHeatData.updatedAt);
    const locale = currentLanguage === "zh" ? "zh-TW" : "en-US";
    const formattedDate = updatedDate.toLocaleString(locale, { hour12: false });
    setLiveStatus(`${t("liveUpdatedPrefix")}: ${formattedDate} | ${t("liveSourcePrefix")}: ${taiwanHeatData.source || "--"}`);
  }
}

async function fetchTaiwanHeatData() {
  setLiveStatus(t("liveLoading"));

  try {
    const response = await fetch(`${API_URL}/api/taiwan-heat?ts=${Date.now()}`);
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json") ? await response.json() : {};

    if (!response.ok) {
      const errorMessage = data.errorMessage || `${response.status}`;
      throw new Error(errorMessage);
    }

    taiwanHeatData = data;
    renderTaiwanHeatPanel();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    setLiveStatus(`${t("liveFetchError")}: ${errorMessage}`, true);

    if (!taiwanHeatData) {
      renderLiveDataTableRows([]);
    }
  }
}

function startTaiwanHeatAutoRefresh() {
  if (taiwanHeatRefreshTimer) {
    clearInterval(taiwanHeatRefreshTimer);
  }

  taiwanHeatRefreshTimer = setInterval(() => {
    fetchTaiwanHeatData();
  }, 10 * 60 * 1000);
}

function addMessage(text, role, className = "") {
  const messageEl = document.createElement("div");
  messageEl.className = `message ${role} ${className}`.trim();
  messageEl.textContent = text;
  chatBox.appendChild(messageEl);
  chatBox.scrollTop = chatBox.scrollHeight;
  return messageEl;
}

async function sendMessage() {
  const message = messageInput.value.trim();

  if (!message) {
    return;
  }

  addMessage(message, "user");
  messageInput.value = "";
  messageInput.focus();

  sendButton.disabled = true;
  const typingEl = addMessage(t("typing"), "ai", "typing");

  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json()
      : { reply: await response.text() };

    typingEl.remove();

    if (!response.ok) {
      const errorCode = data.errorCode || `HTTP_${response.status}`;
      const errorMessage = data.errorMessage || data.reply || t("requestFailed");
      addMessage(`${t("errorPrefix")} ${response.status} (${errorCode}): ${errorMessage}`, "ai");
      return;
    }

    addMessage(data.reply || t("noResponse"), "ai");
  } catch (error) {
    typingEl.remove();
    const errorMessage = error instanceof Error ? error.message : "Unexpected network error.";
    addMessage(`${t("networkPrefix")} (NETWORK_ERROR): ${errorMessage}`, "ai");
  } finally {
    sendButton.disabled = false;
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

function animateHeatNumber() {
  if (!heatNumber) {
    return;
  }

  const start = 29;
  const end = 43;
  const duration = 2200;
  const startTime = performance.now();

  function step(timestamp) {
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(start + (end - start) * progress);
    heatNumber.textContent = String(value);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function initRevealAnimation() {
  const sections = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.22,
    }
  );

  sections.forEach((section) => {
    if (!section.classList.contains("is-visible")) {
      observer.observe(section);
    }
  });
}

function updateChecklistCount() {
  if (!checklistForm || !checkCount) {
    return;
  }

  const checked = checklistForm.querySelectorAll("input[name='prevention']:checked").length;
  checkCount.textContent = `${checked}/5 ${t("checkCountSuffix")}`;
}

function initChecklist() {
  if (!checklistForm) {
    return;
  }

  checklistForm.addEventListener("change", updateChecklistCount);
  updateChecklistCount();
}

function renderCharts() {
  if (typeof Chart === "undefined") {
    return;
  }

  const chartText = CHART_TEXT[currentLanguage] || CHART_TEXT.en;
  const climateCanvas = document.getElementById("climateChart");
  const perceptionCanvas = document.getElementById("perceptionChart");

  if (climateCanvas) {
    if (climateChartInstance) {
      climateChartInstance.destroy();
    }

    climateChartInstance = new Chart(climateCanvas, {
      type: "line",
      data: {
        labels: chartText.climateLabels,
        datasets: [
          {
            label: chartText.tempLabel,
            data: [27, 30, 34, 36, 33, 30],
            borderColor: "#1489cc",
            backgroundColor: "rgba(20, 137, 204, 0.1)",
            tension: 0.35,
            pointRadius: 3,
            pointHoverRadius: 4,
            borderWidth: 2,
          },
          {
            label: chartText.heatLabel,
            data: [29, 34, 40, 44, 41, 35],
            borderColor: "#f2613f",
            backgroundColor: "rgba(242, 97, 63, 0.12)",
            tension: 0.35,
            pointRadius: 3,
            pointHoverRadius: 4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              boxWidth: 12,
              color: "#334155",
            },
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              color: "#64748b",
            },
            grid: {
              color: "rgba(148, 163, 184, 0.24)",
            },
          },
          x: {
            ticks: {
              color: "#64748b",
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }

  if (perceptionCanvas) {
    if (perceptionChartInstance) {
      perceptionChartInstance.destroy();
    }

    perceptionChartInstance = new Chart(perceptionCanvas, {
      type: "bar",
      data: {
        labels: chartText.perceptionLabels,
        datasets: [
          {
            label: chartText.perceptionDatasetLabel,
            data: [62, 81],
            backgroundColor: ["#94a3b8", "#f2613f"],
            borderRadius: 12,
            maxBarThickness: 56,
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            beginAtZero: true,
            max: 100,
            ticks: {
              callback(value) {
                return `${value}%`;
              },
              color: "#64748b",
            },
            grid: {
              color: "rgba(148, 163, 184, 0.24)",
            },
          },
          y: {
            ticks: {
              color: "#334155",
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}

function applyLanguage(language) {
  currentLanguage = language === "zh" ? "zh" : "en";
  localStorage.setItem("siteLanguage", currentLanguage);
  document.documentElement.lang = currentLanguage === "zh" ? "zh-Hant" : "en";

  document.querySelectorAll("[data-i18n-key]").forEach((element) => {
    const translated = t(element.dataset.i18nKey);
    if (translated) {
      element.textContent = translated;
    }
  });

  document.querySelectorAll("[data-i18n-placeholder-key]").forEach((element) => {
    const translated = t(element.dataset.i18nPlaceholderKey);
    if (translated) {
      element.setAttribute("placeholder", translated);
    }
  });

  if (langToggle) {
    langToggle.textContent = currentLanguage === "en" ? "中文" : "EN";
    langToggle.setAttribute("aria-label", currentLanguage === "en" ? "切換到中文" : "Switch to English");
  }

  updateChecklistCount();
  renderCharts();

  if (taiwanHeatData) {
    renderTaiwanHeatPanel();
  } else {
    setLiveStatus(t("liveLoading"));
    renderLiveDataTableRows([]);
  }
}

if (chatForm) {
  chatForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage();
  });
}

if (messageInput) {
  messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });
}

if (langToggle) {
  langToggle.addEventListener("click", () => {
    applyLanguage(currentLanguage === "en" ? "zh" : "en");
  });
}

animateHeatNumber();
initRevealAnimation();
initChecklist();
applyLanguage(currentLanguage);
fetchTaiwanHeatData();
startTaiwanHeatAutoRefresh();

addMessage(t("chatGreeting"), "ai");

// Quiz functionality
const quizButton = document.getElementById("quizButton");
const quizModal = document.getElementById("quizModal");
const closeButton = document.querySelector(".close-button");
const submitQuiz = document.getElementById("submitQuiz");
const quizContent = document.getElementById("quizContent");
const quizResult = document.getElementById("quizResult");

const quizQuestions = [
  {
    question: "How often do you check the weather forecast before going outdoors?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    correct: 3, // Often or Always
    riskGap: "Many people underestimate how quickly heat conditions can change."
  },
  {
    question: "When do you think heat-related illness is most likely to occur?",
    options: ["Morning", "Afternoon", "Evening", "Night", "Any time"],
    correct: 4, // Any time
    riskGap: "Heat illness can happen at any time, especially with high humidity."
  },
  {
    question: "How much water do you drink on a hot day?",
    options: ["Less than 1 liter", "1-2 liters", "2-3 liters", "More than 3 liters", "I don't track"],
    correct: 2, // 2-3 liters
    riskGap: "Dehydration is a major risk factor, but many drink less than needed."
  },
  {
    question: "Which group are you in regarding heat risk?",
    options: ["Low risk", "Moderate risk", "High risk", "Very high risk", "I don't know"],
    correct: null, // No single correct, but awareness matters
    riskGap: "Risk perception often doesn't match actual vulnerability."
  }
];

function initQuiz() {
  if (quizButton) {
    quizButton.addEventListener("click", openQuiz);
  }
  if (closeButton) {
    closeButton.addEventListener("click", closeQuiz);
  }
  if (submitQuiz) {
    submitQuiz.addEventListener("click", submitQuizAnswers);
  }
  window.addEventListener("click", (event) => {
    if (event.target === quizModal) {
      closeQuiz();
    }
  });
}

function openQuiz() {
  quizModal.style.display = "block";
  renderQuiz();
}

function closeQuiz() {
  quizModal.style.display = "none";
  quizResult.style.display = "none";
}

function renderQuiz() {
  quizContent.innerHTML = "";
  quizQuestions.forEach((q, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "quiz-question";
    questionDiv.innerHTML = `
      <p><strong>${index + 1}. ${q.question}</strong></p>
      ${q.options.map((option, i) => `
        <label>
          <input type="radio" name="q${index}" value="${i}" />
          ${option}
        </label>
      `).join("")}
    `;
    quizContent.appendChild(questionDiv);
  });
}

function submitQuizAnswers() {
  const answers = [];
  let score = 0;
  quizQuestions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected) {
      answers.push(parseInt(selected.value));
      if (q.correct !== null && parseInt(selected.value) >= q.correct) {
        score++;
      }
    } else {
      answers.push(null);
    }
  });

  const totalQuestions = quizQuestions.length;
  const percentage = Math.round((score / totalQuestions) * 100);

  let resultText = `<h3>Your Risk Perception Score: ${percentage}%</h3>`;
  if (percentage < 50) {
    resultText += "<p>You may have a significant gap between perceived and actual risk. Consider reviewing heat safety guidelines.</p>";
  } else if (percentage < 80) {
    resultText += "<p>You have moderate awareness, but there's room for improvement in recognizing heat risks.</p>";
  } else {
    resultText += "<p>Great! You seem well-aware of heat-related risks.</p>";
  }

  resultText += "<p><strong>Key Insight:</strong> " + quizQuestions[0].riskGap + "</p>";

  quizResult.innerHTML = resultText;
  quizResult.style.display = "block";
}

initQuiz();
