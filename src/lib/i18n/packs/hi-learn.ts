/* Copy for /learn and /simulate. Section 8.7 of docs/SPEC.md. The concept
   cards themselves live in src/content/learn, not here. */
export const hiLearn: Record<string, string> = {
  "learn.title": "समझो",
  "learn.sub": "बारह बातें, रोज़ की मिसालों में।",
  "learn.searchLabel": "खोजिए",
  "learn.searchPlaceholder": "जैसे: मार्जिन, NAV, फीस",
  "learn.noResult": "इन शब्दों से कुछ नहीं मिला।",
  "learn.noResultLine": "कोई और शब्द आज़माइए, या नीचे की सूची देखिए।",
  "learn.showAll": "सब बारह दिखाओ",
  "learn.found": "{n} मिले",
  "learn.beta":
    "यह सूची अभी हिंदी में है। आपकी भाषा का अनुवाद जाँचा जाना बाकी है।",
  "learn.askTitle": "अपने शब्दों में पूछिए",
  "learn.askLine": "जवाब इन्हीं बारह कार्डों में से आएगा। यह चैट नहीं है।",
  "learn.askPlaceholder": "जैसे: मार्जिन का मतलब क्या है?",
  "learn.ask": "पूछो",
  "learn.askOffline": "नेट नहीं है, इसलिए नीचे वाली खोज से जवाब ढूँढा गया।",
  "learn.askLocal": "आपके फोन पर ही ढूँढा गया।",
  "learn.askNone": "इन बारह कार्डों में इसका जवाब नहीं मिला।",

  "learn.everyday": "रोज़ की मिसाल",
  "learn.meaning": "इसका मतलब",
  "learn.trap": "जाल कहाँ है",
  "learn.try": "खुद आज़माइए",
  "learn.tryAgain": "फिर कोशिश कीजिए",
  "learn.right": "सही",
  "learn.wrong": "यह नहीं",
  "learn.noScore": "कोई नंबर नहीं कटता। बस समझने के लिए है।",
  "learn.infoNotAdvice": "यह जानकारी है, सलाह नहीं।",

  /* The ask box. Only appears when a model is configured. The askTitle,
     askLine, askPlaceholder and ask keys above were written in Phase 4 and
     are reused here rather than duplicated. */
  "learn.asking": "पूछ रहे हैं…",
  "learn.machineWrote": "कंप्यूटर ने लिखा, गलती हो सकती है।",
  "learn.askFailed": "अभी जवाब नहीं बन पाया। ऊपर कार्ड में यही बात लिखी है।",
  "learn.askNote": "सवाल इंटरनेट पर जाता है। कार्ड पढ़ना बिना नेट भी चलता है।",
  "learn.readAloud": "सुनिए",
  "learn.stop": "रोकिए",
  "learn.related": "इससे जुड़ा",
  "learn.prev": "पिछला",
  "learn.next": "अगला",
  "learn.backToIndex": "सूची पर वापस",
  "learn.ofTwelve": "{n} / 12",

  "sim.title": "नुकसान का गणित",
  "sim.sub": "बनावटी आँकड़े, असली पैसा नहीं।",
  "sim.tabLoss": "नुकसान का गणित",
  "sim.tabLeverage": "उधार का तराज़ू",
  "sim.notReal":
    "ये बनावटी आँकड़े हैं, भविष्यवाणी नहीं। असली पैसा नहीं लगा।",

  "sim.loss.lead": "मान लीजिए आपके पास ₹10,000 हैं।",
  "sim.loss.slider": "कितना नुकसान हुआ",
  "sim.loss.after": "₹{start} → ₹{left} ({pct}%)",
  "sim.loss.need": "वापस ₹{start} के लिए +{gain}% चाहिए",
  "sim.loss.barNow": "अभी बचा",
  "sim.loss.barNeed": "वापसी के लिए चाहिए",
  "sim.loss.point":
    "आधा गँवाने पर आधा कमाना काफ़ी नहीं होता। दोगुना करना पड़ता है।",
  "sim.loss.aria":
    "{pct} प्रतिशत नुकसान के बाद ₹{left} बचते हैं, और वापस ₹{start} पर पहुँचने के लिए {gain} प्रतिशत की बढ़त चाहिए।",

  "sim.lev.capital": "आपकी पूँजी",
  "sim.lev.leverage": "उधार का गुणा",
  "sim.lev.move": "रोज़ की चाल",
  "sim.lev.moveCalm": "सामान्य",
  "sim.lev.moveFast": "तेज़",
  "sim.lev.costs": "रोज़ के खर्च और ब्याज जोड़ें",
  "sim.lev.days": "20 दिन",
  "sim.lev.run": "फिर चलाओ",
  "sim.lev.seed": "बीज संख्या: {seed}",
  "sim.lev.chartTitle": "200 में से 20 रास्ते",
  "sim.lev.startLine": "शुरू की पूँजी",
  "sim.lev.result":
    "200 में से {half} बार आधी से ज़्यादा पूँजी डूबी, {zero} बार सब खत्म।",
  "sim.lev.median": "बीच का नतीजा: ₹{median}",
  "sim.lev.best": "सबसे अच्छा: ₹{best}",
  "sim.lev.worst": "सबसे बुरा: ₹{worst}",
  "sim.lev.aria":
    "{lev} गुना उधार पर 200 बार 20 दिन चलाने पर, {half} बार आधी से ज़्यादा पूँजी डूबी और {zero} बार सब खत्म हो गया। बीच का नतीजा ₹{median} रहा।",
  "sim.lev.point":
    "उधार का गुणा जितना बड़ा, सब खत्म होने के मौके उतने ज़्यादा। कमाई भी बढ़ती है, पर खत्म होना वापस नहीं होता।",
  "sim.lev.costsNote":
    "ब्याज और खर्च हर दिन कटते हैं, चाहे कीमत चले या न चले।",
  "sim.noInstruments": "यहाँ किसी असली शेयर या फंड का नाम नहीं है।",
};
