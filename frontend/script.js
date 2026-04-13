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

// Location selector elements
const locationSelector = document.getElementById("locationSelect");
const personalWeatherCard = document.getElementById("personalWeatherCard");
const personalLocationName = document.getElementById("personalLocationName");
const personalTempValue = document.getElementById("personalTemp");
const personalRhValue = document.getElementById("personalHumidity");
const personalHeatValue = document.getElementById("personalHeatIndex");
const personalRiskLevel = document.getElementById("stressLevel");
const personalHeatAlert = document.getElementById("heatStressAlert");
const personalRecommendations = document.getElementById("personalRecommendations");

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
    liveDataTitle: "Live Taiwan Heat Snapshot - All Districts",
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
    selectLocation: "Select your location:",
    chooseLocation: "Choose your location...",
    yourLocationWeather: "Your Location Weather",
    temperature: "Temperature",
    humidity: "Humidity",
    heatIndex: "Heat Index",
    heatStress: "Heat Stress",
    recommendations: "Recommendations",
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
    liveDataTitle: "台灣即時熱風險快照 - 全區覆蓋",
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
    selectLocation: "選擇您的位置：",
    chooseLocation: "選擇您的位置...",
    yourLocationWeather: "您的位置天氣",
    temperature: "氣溫",
    humidity: "濕度",
    heatIndex: "熱指數",
    heatStress: "熱壓力",
    recommendations: "建議",
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
let personalWeatherData = null;

const CITY_NAME_MAP = {
  zh: {
    // Taipei City districts
    "Taipei-Ximending": "台北西門町",
    "Taipei-Xinyi": "台北信義",
    "Taipei-Zhongzheng": "台北中正",
    "Taipei-Datong": "台北大同",
    "Taipei-Wanhua": "台北萬華",

    // New Taipei City districts
    "NewTaipei-Banqiao": "新北板橋",
    "NewTaipei-Zhonghe": "新北中和",
    "NewTaipei-Tucheng": "新北土城",
    "NewTaipei-Xinzhuang": "新北新莊",
    "NewTaipei-Sanchong": "新北三重",

    // Taoyuan City districts
    "Taoyuan-Taoyuan": "桃園桃園",
    "Taoyuan-Zhongli": "桃園中壢",
    "Taoyuan-Pingzhen": "桃園平鎮",
    "Taoyuan-Bade": "桃園八德",
    "Taoyuan-Daxi": "桃園大溪",

    // Taichung City districts
    "Taichung-Xitun": "台中西屯",
    "Taichung-Nantun": "台中南屯",
    "Taichung-Beitun": "台中北屯",
    "Taichung-Dali": "台中大里",
    "Taichung-Wufeng": "台中霧峰",

    // Tainan City districts
    "Tainan-Anping": "台南安平",
    "Tainan-Xinying": "台南新營",
    "Tainan-Yongkang": "台南永康",
    "Tainan-Rende": "台南仁德",
    "Tainan-Guiren": "台南歸仁",

    // Kaohsiung City districts
    "Kaohsiung-Sanzih": "高雄三民",
    "Kaohsiung-Nanzih": "高雄楠梓",
    "Kaohsiung-Qianzhen": "高雄前鎮",
    "Kaohsiung-Xinxing": "高雄新興",
    "Kaohsiung-Yancheng": "高雄鹽埕",

    // Keelung City districts
    "Keelung-Zhongzheng": "基隆中正",
    "Keelung-Xinyi": "基隆信義",
    "Keelung-Ren'ai": "基隆仁愛",

    // Hsinchu City districts
    "Hsinchu-Xiangshan": "新竹香山",
    "Hsinchu-North": "新竹北區",
    "Hsinchu-East": "新竹東區",

    // Chiayi City districts
    "Chiayi-East": "嘉義東區",
    "Chiayi-West": "嘉義西區",

    // Counties
    "HsinchuCounty-Zhubei": "新竹縣竹北",
    "HsinchuCounty-Hukou": "新竹縣湖口",
    "Miaoli-Miaoli": "苗栗苗栗",
    "Miaoli-Tongxiao": "苗栗通霄",
    "Miaoli-Zhunan": "苗栗竹南",
    "Changhua-Changhua": "彰化彰化",
    "Changhua-Lukang": "彰化鹿港",
    "Changhua-Yuanlin": "彰化員林",
    "Nantou-Nantou": "南投南投",
    "Nantou-Puli": "南投埔里",
    "Nantou-Zhushan": "南投竹山",
    "Yunlin-Douliu": "雲林斗六",
    "Yunlin-Huwei": "雲林虎尾",
    "Yunlin-Beigang": "雲林北港",
    "ChiayiCounty-Budai": "嘉義縣布袋",
    "ChiayiCounty-Dalin": "嘉義縣大林",
    "ChiayiCounty-Xikou": "嘉義縣溪口",
    "Pingtung-Pingtung": "屏東屏東",
    "Pingtung-Kaohsiung": "屏東高雄",
    "Pingtung-Chaozhou": "屏東潮州",
    "Yilan-Yilan": "宜蘭宜蘭",
    "Yilan-Luodong": "宜蘭羅東",
    "Yilan-Suao": "宜蘭蘇澳",
    "Hualien-Hualien": "花蓮花蓮",
    "Hualien-Ji'an": "花蓮吉安",
    "Hualien-Xincheng": "花蓮新城",
    "Taitung-Taitung": "台東台東",
    "Taitung-Beinan": "台東卑南",
    "Taitung-Chishang": "台東池上",
    "Penghu-Magong": "澎湖馬公",
    "Penghu-Xiyu": "澎湖西嶼",
    "Kinmen-Jinsha": "金門金沙",
    "Kinmen-Jincheng": "金門金城",
    "Lienchiang-Nangan": "連江南竿",
    "Lienchiang-Beigan": "連江北竿"
  },
  en: {
    // Taipei City districts
    "Taipei-Ximending": "Taipei Ximending",
    "Taipei-Xinyi": "Taipei Xinyi",
    "Taipei-Zhongzheng": "Taipei Zhongzheng",
    "Taipei-Datong": "Taipei Datong",
    "Taipei-Wanhua": "Taipei Wanhua",

    // New Taipei City districts
    "NewTaipei-Banqiao": "New Taipei Banqiao",
    "NewTaipei-Zhonghe": "New Taipei Zhonghe",
    "NewTaipei-Tucheng": "New Taipei Tucheng",
    "NewTaipei-Xinzhuang": "New Taipei Xinzhuang",
    "NewTaipei-Sanchong": "New Taipei Sanchong",

    // Taoyuan City districts
    "Taoyuan-Taoyuan": "Taoyuan Taoyuan",
    "Taoyuan-Zhongli": "Taoyuan Zhongli",
    "Taoyuan-Pingzhen": "Taoyuan Pingzhen",
    "Taoyuan-Bade": "Taoyuan Bade",
    "Taoyuan-Daxi": "Taoyuan Daxi",

    // Taichung City districts
    "Taichung-Xitun": "Taichung Xitun",
    "Taichung-Nantun": "Taichung Nantun",
    "Taichung-Beitun": "Taichung Beitun",
    "Taichung-Dali": "Taichung Dali",
    "Taichung-Wufeng": "Taichung Wufeng",

    // Tainan City districts
    "Tainan-Anping": "Tainan Anping",
    "Tainan-Xinying": "Tainan Xinying",
    "Tainan-Yongkang": "Tainan Yongkang",
    "Tainan-Rende": "Tainan Rende",
    "Tainan-Guiren": "Tainan Guiren",

    // Kaohsiung City districts
    "Kaohsiung-Sanzih": "Kaohsiung Sanzih",
    "Kaohsiung-Nanzih": "Kaohsiung Nanzih",
    "Kaohsiung-Qianzhen": "Kaohsiung Qianzhen",
    "Kaohsiung-Xinxing": "Kaohsiung Xinxing",
    "Kaohsiung-Yancheng": "Kaohsiung Yancheng",

    // Keelung City districts
    "Keelung-Zhongzheng": "Keelung Zhongzheng",
    "Keelung-Xinyi": "Keelung Xinyi",
    "Keelung-Ren'ai": "Keelung Ren'ai",

    // Hsinchu City districts
    "Hsinchu-Xiangshan": "Hsinchu Xiangshan",
    "Hsinchu-North": "Hsinchu North",
    "Hsinchu-East": "Hsinchu East",

    // Chiayi City districts
    "Chiayi-East": "Chiayi East",
    "Chiayi-West": "Chiayi West",

    // Counties
    "HsinchuCounty-Zhubei": "Hsinchu County Zhubei",
    "HsinchuCounty-Hukou": "Hsinchu County Hukou",
    "Miaoli-Miaoli": "Miaoli Miaoli",
    "Miaoli-Tongxiao": "Miaoli Tongxiao",
    "Miaoli-Zhunan": "Miaoli Zhunan",
    "Changhua-Changhua": "Changhua Changhua",
    "Changhua-Lukang": "Changhua Lukang",
    "Changhua-Yuanlin": "Changhua Yuanlin",
    "Nantou-Nantou": "Nantou Nantou",
    "Nantou-Puli": "Nantou Puli",
    "Nantou-Zhushan": "Nantou Zhushan",
    "Yunlin-Douliu": "Yunlin Douliu",
    "Yunlin-Huwei": "Yunlin Huwei",
    "Yunlin-Beigang": "Yunlin Beigang",
    "ChiayiCounty-Budai": "Chiayi County Budai",
    "ChiayiCounty-Dalin": "Chiayi County Dalin",
    "ChiayiCounty-Xikou": "Chiayi County Xikou",
    "Pingtung-Pingtung": "Pingtung Pingtung",
    "Pingtung-Kaohsiung": "Pingtung Kaohsiung",
    "Pingtung-Chaozhou": "Pingtung Chaozhou",
    "Yilan-Yilan": "Yilan Yilan",
    "Yilan-Luodong": "Yilan Luodong",
    "Yilan-Suao": "Yilan Suao",
    "Hualien-Hualien": "Hualien Hualien",
    "Hualien-Ji'an": "Hualien Ji'an",
    "Hualien-Xincheng": "Hualien Xincheng",
    "Taitung-Taitung": "Taitung Taitung",
    "Taitung-Beinan": "Taitung Beinan",
    "Taitung-Chishang": "Taitung Chishang",
    "Penghu-Magong": "Penghu Magong",
    "Penghu-Xiyu": "Penghu Xiyu",
    "Kinmen-Jinsha": "Kinmen Jinsha",
    "Kinmen-Jincheng": "Kinmen Jincheng",
    "Lienchiang-Nangan": "Lienchiang Nangan",
    "Lienchiang-Beigan": "Lienchiang Beigan"
  }
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

function populateLocationSelector() {
  if (!locationSelector) {
    return;
  }

  // Clear existing options except the first one
  while (locationSelector.children.length > 1) {
    locationSelector.removeChild(locationSelector.lastChild);
  }

  // Add all Taiwan cities
  const cities = [
    // Taipei City
    { name: "Taipei-Ximending", display: "Taipei Ximending" },
    { name: "Taipei-Xinyi", display: "Taipei Xinyi" },
    { name: "Taipei-Zhongzheng", display: "Taipei Zhongzheng" },
    { name: "Taipei-Datong", display: "Taipei Datong" },
    { name: "Taipei-Wanhua", display: "Taipei Wanhua" },

    // New Taipei City
    { name: "NewTaipei-Banqiao", display: "New Taipei Banqiao" },
    { name: "NewTaipei-Zhonghe", display: "New Taipei Zhonghe" },
    { name: "NewTaipei-Tucheng", display: "New Taipei Tucheng" },
    { name: "NewTaipei-Xinzhuang", display: "New Taipei Xinzhuang" },
    { name: "NewTaipei-Sanchong", display: "New Taipei Sanchong" },

    // Taoyuan City
    { name: "Taoyuan-Taoyuan", display: "Taoyuan Taoyuan" },
    { name: "Taoyuan-Zhongli", display: "Taoyuan Zhongli" },
    { name: "Taoyuan-Pingzhen", display: "Taoyuan Pingzhen" },
    { name: "Taoyuan-Bade", display: "Taoyuan Bade" },
    { name: "Taoyuan-Daxi", display: "Taoyuan Daxi" },

    // Taichung City
    { name: "Taichung-Xitun", display: "Taichung Xitun" },
    { name: "Taichung-Nantun", display: "Taichung Nantun" },
    { name: "Taichung-Beitun", display: "Taichung Beitun" },
    { name: "Taichung-Dali", display: "Taichung Dali" },
    { name: "Taichung-Wufeng", display: "Taichung Wufeng" },

    // Tainan City
    { name: "Tainan-Anping", display: "Tainan Anping" },
    { name: "Tainan-Xinying", display: "Tainan Xinying" },
    { name: "Tainan-Yongkang", display: "Tainan Yongkang" },
    { name: "Tainan-Rende", display: "Tainan Rende" },
    { name: "Tainan-Guiren", display: "Tainan Guiren" },

    // Kaohsiung City
    { name: "Kaohsiung-Sanzih", display: "Kaohsiung Sanzih" },
    { name: "Kaohsiung-Nanzih", display: "Kaohsiung Nanzih" },
    { name: "Kaohsiung-Qianzhen", display: "Kaohsiung Qianzhen" },
    { name: "Kaohsiung-Xinxing", display: "Kaohsiung Xinxing" },
    { name: "Kaohsiung-Yancheng", display: "Kaohsiung Yancheng" },

    // Keelung City
    { name: "Keelung-Zhongzheng", display: "Keelung Zhongzheng" },
    { name: "Keelung-Xinyi", display: "Keelung Xinyi" },
    { name: "Keelung-Ren'ai", display: "Keelung Ren'ai" },

    // Hsinchu City
    { name: "Hsinchu-Xiangshan", display: "Hsinchu Xiangshan" },
    { name: "Hsinchu-North", display: "Hsinchu North" },
    { name: "Hsinchu-East", display: "Hsinchu East" },

    // Chiayi City
    { name: "Chiayi-East", display: "Chiayi East" },
    { name: "Chiayi-West", display: "Chiayi West" },

    // Counties
    { name: "HsinchuCounty-Zhubei", display: "Hsinchu County Zhubei" },
    { name: "HsinchuCounty-Hukou", display: "Hsinchu County Hukou" },
    { name: "Miaoli-Miaoli", display: "Miaoli Miaoli" },
    { name: "Miaoli-Tongxiao", display: "Miaoli Tongxiao" },
    { name: "Miaoli-Zhunan", display: "Miaoli Zhunan" },
    { name: "Changhua-Changhua", display: "Changhua Changhua" },
    { name: "Changhua-Lukang", display: "Changhua Lukang" },
    { name: "Changhua-Yuanlin", display: "Changhua Yuanlin" },
    { name: "Nantou-Nantou", display: "Nantou Nantou" },
    { name: "Nantou-Puli", display: "Nantou Puli" },
    { name: "Nantou-Zhushan", display: "Nantou Zhushan" },
    { name: "Yunlin-Douliu", display: "Yunlin Douliu" },
    { name: "Yunlin-Huwei", display: "Yunlin Huwei" },
    { name: "Yunlin-Beigang", display: "Yunlin Beigang" },
    { name: "ChiayiCounty-Budai", display: "Chiayi County Budai" },
    { name: "ChiayiCounty-Dalin", display: "Chiayi County Dalin" },
    { name: "ChiayiCounty-Xikou", display: "Chiayi County Xikou" },
    { name: "Pingtung-Pingtung", display: "Pingtung Pingtung" },
    { name: "Pingtung-Kaohsiung", display: "Pingtung Kaohsiung" },
    { name: "Pingtung-Chaozhou", display: "Pingtung Chaozhou" },
    { name: "Yilan-Yilan", display: "Yilan Yilan" },
    { name: "Yilan-Luodong", display: "Yilan Luodong" },
    { name: "Yilan-Suao", display: "Yilan Suao" },
    { name: "Hualien-Hualien", display: "Hualien Hualien" },
    { name: "Hualien-Ji'an", display: "Hualien Ji'an" },
    { name: "Hualien-Xincheng", display: "Hualien Xincheng" },
    { name: "Taitung-Taitung", display: "Taitung Taitung" },
    { name: "Taitung-Beinan", display: "Taitung Beinan" },
    { name: "Taitung-Chishang", display: "Taitung Chishang" },
    { name: "Penghu-Magong", display: "Penghu Magong" },
    { name: "Penghu-Xiyu", display: "Penghu Xiyu" },
    { name: "Kinmen-Jinsha", display: "Kinmen Jinsha" },
    { name: "Kinmen-Jincheng", display: "Kinmen Jincheng" },
    { name: "Lienchiang-Nangan", display: "Lienchiang Nangan" },
    { name: "Lienchiang-Beigan", display: "Lienchiang Beigan" }
  ];

  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city.name;
    option.textContent = translateCityName(city.name);
    locationSelector.appendChild(option);
  });
}

async function fetchPersonalWeatherData(location) {
  if (!location) {
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/location-weather?city=${encodeURIComponent(location)}&ts=${Date.now()}`);
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json") ? await response.json() : {};

    if (!response.ok) {
      throw new Error(data.errorMessage || `HTTP ${response.status}`);
    }

    personalWeatherData = data;
    renderPersonalWeatherCard();
  } catch (error) {
    console.error("Failed to fetch personal weather data:", error);
    // Hide personal weather card on error
    if (personalWeatherCard) {
      personalWeatherCard.style.display = "none";
    }
  }
}

function renderPersonalWeatherCard() {
  if (!personalWeatherCard || !personalWeatherData) {
    return;
  }

  const locationData = personalWeatherData.location;
  const heatStressData = personalWeatherData.heatStress;

  // Show the card
  personalWeatherCard.style.display = "block";

  // Update location name
  if (personalLocationName) {
    personalLocationName.textContent = translateCityName(locationData.city);
  }

  // Update metrics
  if (personalTempValue) {
    personalTempValue.textContent = formatMetric(locationData.temperatureC, "", 1);
  }

  if (personalRhValue) {
    personalRhValue.textContent = formatMetric(locationData.relativeHumidity, "", 1);
  }

  if (personalHeatValue) {
    personalHeatValue.textContent = formatMetric(locationData.heatIndexC, "", 1);
  }

  // Update risk level
  if (personalRiskLevel) {
    personalRiskLevel.className = `risk-pill ${riskClass(locationData.heatRiskLevel)}`;
    personalRiskLevel.textContent = riskLabel(locationData.heatRiskLevel);
  }

  // Update heat alert
  if (personalHeatAlert) {
    const alertElement = document.getElementById("heatStressAlert");
    const alertTitle = document.getElementById("alertTitle");
    const alertMessage = document.getElementById("alertMessage");

    if (alertElement && alertTitle && alertMessage) {
      alertElement.style.display = "block";
      alertTitle.textContent = heatStressData?.description || getHeatAlertText(locationData.heatRiskLevel);
      alertMessage.textContent = getHeatAlertDescription(locationData.heatRiskLevel);
    }
  }

  // Update recommendations
  if (personalRecommendations) {
    const recommendations = heatStressData?.recommendations || getHeatRecommendations(locationData.heatRiskLevel);
    personalRecommendations.innerHTML = recommendations.map(rec => `<li>${rec}</li>`).join("");
  }
}

function getHeatAlertText(level) {
  const alerts = {
    en: {
      low: "Low heat risk - Stay hydrated",
      caution: "Caution - Monitor heat conditions",
      extreme_caution: "Extreme caution - Take preventive measures",
      danger: "Danger - High heat risk, limit outdoor activities",
      extreme_danger: "Extreme danger - Seek cool environments immediately",
      unknown: "Heat conditions unknown"
    },
    zh: {
      low: "低溫風險 - 保持水分補充",
      caution: "注意 - 監測高溫狀況",
      extreme_caution: "高度注意 - 採取預防措施",
      danger: "危險 - 高溫風險高，減少戶外活動",
      extreme_danger: "極度危險 - 立即尋找涼爽環境",
      unknown: "高溫狀況未知"
    }
  };

  return alerts[currentLanguage]?.[level] || alerts.en[level] || alerts.en.unknown;
}

function getHeatAlertClass(level) {
  switch (level) {
    case "low": return "alert-low";
    case "caution": return "alert-caution";
    case "extreme_caution": return "alert-extreme-caution";
    case "danger": return "alert-danger";
    case "extreme_danger": return "alert-extreme-danger";
    default: return "alert-unknown";
  }
}

function getHeatAlertDescription(level) {
  const descriptions = {
    en: {
      low: "Low heat stress conditions. Stay hydrated and monitor weather changes.",
      caution: "Caution advised. Take preventive measures to avoid heat-related issues.",
      extreme_caution: "Extreme caution required. Reduce outdoor activities and stay in cool environments.",
      danger: "Danger level heat stress. Limit outdoor exposure and seek shade frequently.",
      extreme_danger: "Extreme danger. Avoid all outdoor activities and stay in air-conditioned spaces.",
      unknown: "Heat conditions unknown. Monitor local weather advisories."
    },
    zh: {
      low: "低溫壓力狀況。保持水分補充並監測天氣變化。",
      caution: "注意級別。採取預防措施避免熱相關問題。",
      extreme_caution: "高度注意。減少戶外活動並待在涼爽環境。",
      danger: "危險級別熱壓力。限制戶外暴露並經常尋找陰涼處。",
      extreme_danger: "極度危險。避免所有戶外活動並待在空調環境。",
      unknown: "高溫狀況未知。關注本地天氣警報。"
    }
  };

  return descriptions[currentLanguage]?.[level] || descriptions.en[level] || descriptions.en.unknown;
}

function handleLocationChange() {
  const selectedLocation = locationSelector.value;
  if (selectedLocation) {
    fetchPersonalWeatherData(selectedLocation);
  } else {
    // Hide personal weather card when no location is selected
    if (personalWeatherCard) {
      personalWeatherCard.style.display = "none";
    }
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

  // Re-render personal weather card if data exists
  if (personalWeatherData) {
    renderPersonalWeatherCard();
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

// Location selector event listener
if (locationSelector) {
  locationSelector.addEventListener("change", handleLocationChange);
}

animateHeatNumber();
initRevealAnimation();
initChecklist();
applyLanguage(currentLanguage);
populateLocationSelector();
fetchTaiwanHeatData();
startTaiwanHeatAutoRefresh();

addMessage(t("chatGreeting"), "ai");

// Chat Modal functionality
const chatbotButton = document.getElementById("chatbotButton");
const chatModal = document.getElementById("chatModal");
const closeChatButton = document.getElementById("closeChatButton");

function initChatModal() {
  if (chatbotButton) {
    chatbotButton.addEventListener("click", openChatModal);
  }
  if (closeChatButton) {
    closeChatButton.addEventListener("click", closeChatModal);
  }
}

function openChatModal() {
  if (chatModal) {
    chatModal.classList.add("active");
    messageInput.focus();
  }
}

function closeChatModal() {
  if (chatModal) {
    chatModal.classList.remove("active");
  }
}

initChatModal();

// Quiz functionality
const quizButton = document.getElementById("quizButton");
const quizModal = document.getElementById("quizModal");
const closeButton = document.querySelector(".close-button");
const submitQuiz = document.getElementById("submitQuiz");
const quizContent = document.getElementById("quizContent");
const quizResult = document.getElementById("quizResult");

const quizQuestions = [
  {
    question: "How often do you check the weather/heat forecasts?",
    options: ["Never/Rarely", "Sometimes", "Often", "Very frequently", "Always before going out"],
    actualRisk: ["Very High", "High", "Moderate", "Low", "Very Low"],
    realityFact: "Heat changes can happen quickly. Regular monitoring is essential."
  },
  {
    question: "On a hot day, how many hours do you spend outdoors?",
    options: ["Less than 1 hour", "1-2 hours", "2-4 hours", "4-6 hours", "More than 6 hours"],
    actualRisk: ["Very Low", "Low", "Moderate", "High", "Very High"],
    realityFact: "Extended heat exposure increases risk significantly, especially during peak hours."
  },
  {
    question: "How much water do you drink on extremely hot days?",
    options: ["Less than 1 liter", "1-2 liters", "2-3 liters", "3-4 liters", "More than 4 liters"],
    actualRisk: ["Very High", "High", "Moderate", "Low", "Very Low"],
    realityFact: "Proper hydration is critical. Most people don't drink enough in extreme heat."
  },
  {
    question: "Do you take breaks in cool/shaded areas on hot days?",
    options: ["Never", "Rarely", "Sometimes", "Often", "Always when needed"],
    actualRisk: ["Very High", "High", "Moderate", "Low", "Very Low"],
    realityFact: "Heat breaks are essential for body temperature regulation and prevent heat illness."
  },
  {
    question: "How would you rate your personal heat-related illness risk?",
    options: ["No risk at all", "Minimal risk", "Moderate risk", "Significant risk", "Very high risk"],
    actualRisk: ["Very High (Underestimating!)", "High (Likely underestimating)", "Moderate (Reasonably aware)", "High (May be overestimating)", "Very High (Realistic assessment)"],
    realityFact: "Most people significantly underestimate their heat risk, regardless of age or occupation."
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
  const riskAssessments = [];
  
  quizQuestions.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    if (selected) {
      const selectedIndex = parseInt(selected.value);
      answers.push(selectedIndex);
      riskAssessments.push({
        question: index,
        userAnswer: q.options[selectedIndex],
        assessedRisk: q.actualRisk[selectedIndex],
        fact: q.realityFact
      });
    } else {
      answers.push(null);
    }
  });

  // Calculate risk perception gap
  let riskGapScore = 0; // 0 = well-calibrated, positive = underestimating, negative = overestimating
  
  // Q1: Weather check frequency (higher is better)
  if (answers[0] !== null) {
    riskGapScore += (2 - answers[0]); // 2 is optimal (Often)
  }
  
  // Q2: Time spent outdoors (lower is better)
  if (answers[1] !== null) {
    riskGapScore += (answers[1] - 2); // 2 is optimal (2-4 hours)
  }
  
  // Q3: Water consumption (higher is better)
  if (answers[2] !== null) {
    riskGapScore += (2 - answers[2]); // 2-3 liters is optimal
  }
  
  // Q4: Cool breaks (higher is better)
  if (answers[3] !== null) {
    riskGapScore += (4 - answers[3]); // Always is optimal
  }
  
  // Q5: Self-assessment of risk
  if (answers[4] !== null) {
    riskGapScore += (2 - answers[4]); // Moderate is realistic
  }

  let resultText = `<h3>Your Heat Safety Awareness Assessment</h3>`;
  
  // Determine perception gap
  if (riskGapScore > 5) {
    resultText += `<p style="color: #d13a2f; font-weight: 700;"><strong>⚠️ SIGNIFICANT UNDERESTIMATION</strong></p>`;
    resultText += `<p>You are significantly <strong>underestimating your heat risk</strong>. Your current behaviors suggest you may not be taking adequate precautions against heat-related illness.</p>`;
  } else if (riskGapScore > 2) {
    resultText += `<p style="color: #ff8a3d; font-weight: 700;"><strong>⚠️ MODERATE UNDERESTIMATION</strong></p>`;
    resultText += `<p>You appear to be <strong>somewhat underestimating your risk</strong>. While you have some awareness, there's room for improvement in your heat safety practices.</p>`;
  } else if (riskGapScore > -2) {
    resultText += `<p style="color: #1489cc; font-weight: 700;"><strong>✓ WELL-CALIBRATED AWARENESS</strong></p>`;
    resultText += `<p>Your risk perception appears <strong>reasonably accurate</strong>. You're taking appropriate precautions and seem aware of heat-related risks.</p>`;
  } else if (riskGapScore > -5) {
    resultText += `<p style="color: #1489cc; font-weight: 700;"><strong>✓ CAUTIOUS APPROACH</strong></p>`;
    resultText += `<p>You may be <strong>slightly overestimating risk</strong>, but this conservative approach is generally better for heat safety.</p>`;
  } else {
    resultText += `<p style="color: #1489cc; font-weight: 700;"><strong>✓ VERY CAUTIOUS</strong></p>`;
    resultText += `<p>You are taking <strong>very comprehensive precautions</strong> against heat-related illness.</p>`;
  }

  // Add key insights
  resultText += `<div style="margin-top: 16px; padding: 14px; background: #fff2ee; border-radius: 12px; border-left: 4px solid #f2613f;">`;
  resultText += `<p><strong>Key Insights from your answers:</strong></p>`;
  riskAssessments.forEach((assessment, idx) => {
    resultText += `<p style="margin: 8px 0;"><small><strong>Q${idx + 1}:</strong> ${assessment.fact}</small></p>`;
  });
  resultText += `</div>`;
  
  resultText += `<p style="margin-top: 16px; font-size: 0.9rem; color: #5f6b7a;"><strong>Recommendation:</strong> Review the "How to Protect Yourself" section above to build better heat safety habits.</p>`;

  quizResult.innerHTML = resultText;
  quizResult.style.display = "block";
}

initQuiz();
