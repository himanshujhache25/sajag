/* Punjabi verdict copy. Machine-assisted, not yet read by a native speaker.
   Same keys and same order as en-signals.ts so the two can be diffed. */
export const paSignals: Record<string, string> = {
  "signal.S01.title": "OTP, PIN ਜਾਂ ਪਾਸਵਰਡ ਮੰਗ ਰਿਹਾ ਹੈ",
  "signal.S01.why":
    "ਕੋਈ ਅਸਲੀ ਕੰਪਨੀ, ਬੈਂਕ ਜਾਂ ਅਫ਼ਸਰ ਕਦੇ ਵੀ OTP, PIN, CVV ਜਾਂ ਪਾਸਵਰਡ ਨਹੀਂ ਮੰਗਦਾ।",
  "signal.S01.basis": "ਆਧਾਰ: ਬੈਂਕ ਅਤੇ ਰੈਗੂਲੇਟਰ ਦੀ ਚੇਤਾਵਨੀ",

  "signal.S02.title": "ਤੁਹਾਡੇ ਫ਼ੋਨ ਦਾ ਕਬਜ਼ਾ ਚਾਹੁੰਦਾ ਹੈ",
  "signal.S02.why":
    "ਸਕਰੀਨ ਸਾਂਝੀ ਕਰਨ ਜਾਂ ਲਿੰਕ ਤੋਂ ਐਪ ਪਾਉਣ ਨਾਲ ਕੋਈ ਓਪਰਾ ਬੰਦਾ ਤੁਹਾਡੀ ਬੈਂਕਿੰਗ ਐਪ ਤੱਕ ਪਹੁੰਚ ਜਾਂਦਾ ਹੈ।",
  "signal.S02.basis": "ਆਧਾਰ: ਸਾਈਬਰ ਕਰਾਈਮ ਪੋਰਟਲ ਦੀ ਚੇਤਾਵਨੀ",

  "signal.S03.title": "ਪੈਸੇ ਮਿਲਣ ਤੋਂ ਪਹਿਲਾਂ ਫ਼ੀਸ ਮੰਗੀ ਜਾ ਰਹੀ ਹੈ",
  "signal.S03.why":
    "ਆਪਣੇ ਹੀ ਪੈਸੇ ਕਢਵਾਉਣ ਲਈ ਕਦੇ ਟੈਕਸ, ਫ਼ੀਸ ਜਾਂ ਜਮ੍ਹਾਂ ਨਹੀਂ ਲਿਆ ਜਾਂਦਾ। ਇਹ ਦੂਜੀ ਠੱਗੀ ਹੈ।",
  "signal.S03.basis": "ਆਧਾਰ: SEBI ਨਿਵੇਸ਼ਕ ਚੇਤਾਵਨੀ",

  "signal.S04.title": "ਪੱਕੇ ਮੁਨਾਫ਼ੇ ਦਾ ਵਾਅਦਾ ਅਤੇ ਨਾਲ ਪੈਸੇ ਭਰਨ ਦਾ ਰਾਹ",
  "signal.S04.why":
    "ਇੱਕੋ ਸੁਨੇਹੇ ਵਿੱਚ ਗਰੰਟੀ ਅਤੇ ਅਦਾਇਗੀ ਜਾਂ ਗਰੁੱਪ ਦਾ ਲਿੰਕ — ਠੱਗੀ ਦੀ ਇਹੀ ਸਭ ਤੋਂ ਆਮ ਸ਼ਕਲ ਹੈ।",
  "signal.S04.basis": "ਆਧਾਰ: SEBI ਨਿਵੇਸ਼ਕ ਚੇਤਾਵਨੀ",

  "signal.S05.title": "SEBI, ਐਕਸਚੇਂਜ ਜਾਂ ਬੈਂਕ ਦਾ ਨਾਂ ਵਰਤ ਰਿਹਾ ਹੈ",
  "signal.S05.why":
    "SEBI ਕਿਸੇ ਗਰੁੱਪ ਜਾਂ ਟਿੱਪ ਨੂੰ ਮਨਜ਼ੂਰੀ ਨਹੀਂ ਦਿੰਦੀ, ਅਤੇ ਤੁਹਾਡੇ ਤੋਂ ਕਦੇ ਪੈਸੇ ਨਹੀਂ ਮੰਗਦੀ।",
  "signal.S05.basis": "ਆਧਾਰ: SEBI ਦੀ ਆਪਣੀ ਸਰਕਾਰੀ ਸੂਚੀ",

  "signal.S10.title": "ਪੱਕਾ ਮੁਨਾਫ਼ਾ ਜਾਂ ਕੋਈ ਖ਼ਤਰਾ ਹੀ ਨਹੀਂ, ਇਹ ਕਹਿੰਦਾ ਹੈ",
  "signal.S10.why":
    "ਸ਼ੇਅਰ ਬਜ਼ਾਰ ਵਿੱਚ ਰਿਟਰਨ ਦਾ ਵਾਅਦਾ ਕੋਈ ਨਹੀਂ ਕਰ ਸਕਦਾ। ਵਾਅਦਾ ਆਪ ਹੀ ਚੇਤਾਵਨੀ ਹੈ।",
  "signal.S10.basis": "ਆਧਾਰ: SEBI ਨਿਵੇਸ਼ਕ ਚੇਤਾਵਨੀ",

  "signal.S11.title": "ਅਜਿਹਾ ਰਿਟਰਨ ਜੋ ਹੋ ਹੀ ਨਹੀਂ ਸਕਦਾ",
  "signal.S11.why":
    "ਰੋਜ਼ ਜਾਂ ਹਫ਼ਤੇ ਦਾ ਪੱਕਾ ਫ਼ੀਸਦੀ, ਜਾਂ ਪੈਸੇ ਦੁੱਗਣੇ ਹੋਣਾ — ਅਸਲੀ ਨਿਵੇਸ਼ ਵਿੱਚ ਇਹ ਨਹੀਂ ਹੁੰਦਾ।",
  "signal.S11.basis": "ਆਧਾਰ: SEBI ਨਿਵੇਸ਼ਕ ਸਿੱਖਿਆ ਸਮੱਗਰੀ",

  "signal.S12.title": "ਇੱਕ ਨਿੱਜੀ ਗਰੁੱਪ ਵਿੱਚ ਖਿੱਚ ਰਿਹਾ ਹੈ",
  "signal.S12.why":
    "ਬੰਦ ਗਰੁੱਪ ਦੇ ਅੰਦਰ ਕੀ ਕਿਹਾ ਜਾਂਦਾ ਹੈ, ਬਾਹਰਲਾ ਕੋਈ ਨਹੀਂ ਵੇਖ ਸਕਦਾ, ਇਸ ਲਈ ਦਬਾਅ ਪਾਉਣਾ ਸੌਖਾ ਹੋ ਜਾਂਦਾ ਹੈ।",
  "signal.S12.basis": "ਆਧਾਰ: SEBI ਨਿਵੇਸ਼ਕ ਚੇਤਾਵਨੀ",

  "signal.S13.title": "ਅੰਦਰ ਦੀ ਖ਼ਬਰ ਹੋਣ ਦਾ ਦਾਅਵਾ ਕਰਦਾ ਹੈ",
  "signal.S13.why":
    "ਅਜਿਹੀ ਖ਼ਬਰ ਉੱਤੇ ਵਪਾਰ ਕਰਨਾ ਗ਼ੈਰ-ਕਾਨੂੰਨੀ ਹੈ, ਅਤੇ ਬਹੁਤੀ ਵਾਰ ਅਜਿਹੀ ਕੋਈ ਖ਼ਬਰ ਹੁੰਦੀ ਹੀ ਨਹੀਂ।",
  "signal.S13.basis": "ਆਧਾਰ: SEBI ਇਨਸਾਈਡਰ ਟਰੇਡਿੰਗ ਨਿਯਮ",

  "signal.S14.title": "ਨਿੱਜੀ UPI ਜਾਂ ਖਾਤੇ ਵਿੱਚ ਪੈਸੇ ਮੰਗੇ ਜਾ ਰਹੇ ਹਨ",
  "signal.S14.why":
    "ਰਜਿਸਟਰਡ ਫ਼ਰਮ ਆਪਣੇ ਹੀ ਖਾਤੇ ਵਿੱਚ ਪੈਸੇ ਲੈਂਦੀ ਹੈ। ਤੁਸੀਂ ਪਰਖ ਸਕੋ, ਇਸ ਲਈ SEBI @valid UPI ਪਤੇ ਦਿੰਦੀ ਹੈ।",
  "signal.S14.basis": "ਆਧਾਰ: SEBI ਦਾ @valid UPI ਪ੍ਰਬੰਧ",

  "signal.S15.title": "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨੰਬਰ ਮੇਲ ਨਹੀਂ ਖਾਂਦਾ",
  "signal.S15.why":
    "ਨੰਬਰ ਦੀ ਸ਼ਕਲ ਗ਼ਲਤ ਹੈ, ਸਾਡੀ ਸੂਚੀ ਵਿੱਚ ਨਹੀਂ ਹੈ, ਨਾਂ ਨਾਲ ਮੇਲ ਨਹੀਂ ਖਾਂਦਾ, ਜਾਂ ਇਸ ਕੰਮ ਲਈ ਗ਼ਲਤ ਸ਼੍ਰੇਣੀ ਦਾ ਹੈ।",
  "signal.S15.basis": "ਆਧਾਰ: SEBI ਦੀ ਵਿਚੋਲਿਆਂ ਦੀ ਸੂਚੀ",

  "signal.S16.title": "ਲਿੰਕ ਵਿੱਚ ਕੁਝ ਗ਼ਲਤ ਹੈ",
  "signal.S16.why":
    "ਮਿਲਦਾ-ਜੁਲਦਾ ਪਤਾ, ਨਿਰਾ IP, ਛੋਟਾ ਕੀਤਾ ਲਿੰਕ ਜਾਂ ਬਿਲਕੁਲ ਨਵਾਂ ਡੋਮੇਨ — ਸਭ ਲੁਕਣ ਦੇ ਰਾਹ ਹਨ।",
  "signal.S16.basis": "ਆਧਾਰ: ਸਾਈਬਰ ਕਰਾਈਮ ਪੋਰਟਲ ਦੀ ਚੇਤਾਵਨੀ",

  "signal.S17.title": "ਕਿਸੇ ਨੂੰ ਨਾ ਦੱਸਣ ਲਈ ਕਹਿੰਦਾ ਹੈ",
  "signal.S17.why":
    "ਦਬਾਅ ਉਦੋਂ ਹੀ ਚੱਲਦਾ ਹੈ ਜਦੋਂ ਤੁਸੀਂ ਇਕੱਲੇ ਹੋਵੋ। ਇਮਾਨਦਾਰ ਕੰਮ ਕੋਲ ਲੁਕਾਉਣ ਲਈ ਕੁਝ ਨਹੀਂ ਹੁੰਦਾ।",
  "signal.S17.basis": "ਆਧਾਰ: SEBI ਨਿਵੇਸ਼ਕ ਸਿੱਖਿਆ ਸਮੱਗਰੀ",

  "signal.S20.title": "ਕਾਹਲੀ ਕਰਵਾ ਰਿਹਾ ਹੈ",
  "signal.S20.why":
    "ਤੁਸੀਂ ਸੋਚ ਨਾ ਸਕੋ, ਇਸੇ ਲਈ ਥੋੜ੍ਹੀਆਂ ਸੀਟਾਂ ਤੇ ਥੋੜ੍ਹੇ ਸਮੇਂ ਦੀ ਗੱਲ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।",
  "signal.S20.basis": "ਆਧਾਰ: SEBI ਨਿਵੇਸ਼ਕ ਸਿੱਖਿਆ ਸਮੱਗਰੀ",

  "signal.S21.title": "ਮੁਨਾਫ਼ੇ ਦਾ ਸਬੂਤ ਵਿਖਾਉਂਦਾ ਹੈ",
  "signal.S21.why": "ਸਕਰੀਨਸ਼ਾਟ ਬਣਾਉਣੇ ਸੌਖੇ ਹਨ, ਇਸ ਲਈ ਉਹ ਸਬੂਤ ਨਹੀਂ ਹਨ।",
  "signal.S21.basis": "ਆਧਾਰ: SEBI ਨਿਵੇਸ਼ਕ ਸਿੱਖਿਆ ਸਮੱਗਰੀ",

  "signal.S22.title": "ਕਿਸੇ ਵੱਡੇ ਨਾਂ ਦਾ ਸਹਾਰਾ ਲੈਂਦਾ ਹੈ",
  "signal.S22.why":
    "ਮਸ਼ਹੂਰ ਨਾਂ ਭਰੋਸਾ ਉਧਾਰ ਲੈਣ ਲਈ ਲਿਆ ਜਾਂਦਾ ਹੈ। ਇਹ ਪਰਖ ਦਾ ਬਦਲ ਨਹੀਂ।",
  "signal.S22.basis": "ਆਧਾਰ: SEBI ਨਿਵੇਸ਼ਕ ਸਿੱਖਿਆ ਸਮੱਗਰੀ",

  "signal.S23.title": "ਬਿਨਾਂ ਪਰਖੀ ਥਾਂ ਤੋਂ ਟਿੱਪ ਦੀ ਸ਼ਕਲ ਵਿੱਚ ਸਲਾਹ",
  "signal.S23.why":
    "ਸਿਰਫ਼ ਰਜਿਸਟਰਡ ਰਿਸਰਚ ਐਨਾਲਿਸਟ ਜਾਂ ਇਨਵੈਸਟਮੈਂਟ ਐਡਵਾਈਜ਼ਰ ਹੀ ਖ਼ਰੀਦਣ ਜਾਂ ਵੇਚਣ ਲਈ ਕਹਿ ਸਕਦਾ ਹੈ।",
  "signal.S23.basis": "ਆਧਾਰ: SEBI ਦੀ ਵਿਚੋਲਿਆਂ ਦੀ ਸੂਚੀ",

  "signal.S24.title": "ਥੋੜ੍ਹੀ ਰਕਮ ਤੋਂ ਵੱਡੀ ਕਮਾਈ",
  "signal.S24.why":
    "ਥੋੜ੍ਹੇ ਤੋਂ ਸ਼ੁਰੂ ਕਰਨਾ ਪਹਿਲਾ ਕਦਮ ਹੈ; ਰਕਮ ਮਗਰੋਂ ਵਧਾਈ ਜਾਂਦੀ ਹੈ।",
  "signal.S24.basis": "ਆਧਾਰ: SEBI ਨਿਵੇਸ਼ਕ ਸਿੱਖਿਆ ਸਮੱਗਰੀ",

  "signal.S25.title": "ਕ੍ਰਿਪਟੋ, ਬੌਟ ਜਾਂ ਫਾਰੇਕਸ ਸਿਗਨਲ",
  "signal.S25.why":
    "ਇਨ੍ਹਾਂ ਵਿੱਚੋਂ ਕਈ ਭਾਰਤ ਵਿੱਚ ਰੈਗੂਲੇਸ਼ਨ ਤੋਂ ਬਾਹਰ ਹਨ, ਇਸ ਲਈ ਸ਼ਿਕਾਇਤ ਕਰਨ ਦੀ ਥਾਂ ਹੀ ਨਹੀਂ।",
  "signal.S25.basis": "ਆਧਾਰ: SEBI ਨਿਵੇਸ਼ਕ ਚੇਤਾਵਨੀ",

  "signal.S26.title": "ਉਧਾਰ ਲੈ ਕੇ ਨਿਵੇਸ਼ ਕਰਨ ਲਈ ਕਹਿੰਦਾ ਹੈ",
  "signal.S26.why":
    "ਉਧਾਰ ਲਏ ਪੈਸੇ ਜਾਣ ਤਾਂ ਨੁਕਸਾਨ ਦੂਣਾ ਹੁੰਦਾ ਹੈ: ਪੈਸੇ ਵੀ ਗਏ ਤੇ ਕਰਜ਼ਾ ਵੀ ਰਿਹਾ।",
  "signal.S26.basis": "ਆਧਾਰ: SEBI ਨਿਵੇਸ਼ਕ ਸਿੱਖਿਆ ਸਮੱਗਰੀ",

  "signal.S27.title": "ਆਮ ਮੋਬਾਈਲ ਨੰਬਰ ਤੋਂ ਸਰਵਿਸ ਕਾਲ",
  "signal.S27.why":
    "ਰਜਿਸਟਰਡ ਫ਼ਰਮਾਂ ਮੌਜੂਦਾ ਗਾਹਕਾਂ ਨੂੰ 1600 ਤੋਂ ਸ਼ੁਰੂ ਹੋਣ ਵਾਲੇ ਨੰਬਰਾਂ ਤੋਂ ਹੀ ਸਰਵਿਸ ਕਾਲ ਕਰਦੀਆਂ ਹਨ। ਵਿਕਰੀ ਦੀਆਂ ਕਾਲਾਂ ਇਸ ਵਿੱਚ ਨਹੀਂ ਆਉਂਦੀਆਂ, ਇਸ ਲਈ ਇਹ ਹਲਕਾ ਜਿਹਾ ਇਸ਼ਾਰਾ ਹੀ ਹੈ।",
  "signal.S27.basis": "ਆਧਾਰ: 1600 ਨੰਬਰ ਲੜੀ ਦਾ ਪ੍ਰਬੰਧ",

  "signal.S28.title": "ਮੁਨਾਫ਼ੇ ਦੀ ਵੰਡ ਜਾਂ ਪਹਿਲਾਂ ਫ਼ੀਸ",
  "signal.S28.why":
    "ਮੁਨਾਫ਼ੇ ਵਿੱਚ ਹਿੱਸਾ ਦੇਣ ਦਾ ਵਾਅਦਾ ਅਤੇ ਪਹਿਲਾਂ ਫ਼ੀਸ ਲੈਣੀ — ਦੋਵੇਂ ਸਲਾਹ ਦੇ ਨਿਯਮਾਂ ਦੇ ਖ਼ਿਲਾਫ਼ ਹਨ।",
  "signal.S28.basis": "ਆਧਾਰ: SEBI ਇਨਵੈਸਟਮੈਂਟ ਐਡਵਾਈਜ਼ਰ ਨਿਯਮ",

  "positive.P01.title": "ਇਹ UPI ਆਈਡੀ ਇੱਕ @valid ਪਤਾ ਹੈ",
  "positive.P02.title": "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਾਡੀ ਸੂਚੀ ਵਿੱਚ ਹੈ ਅਤੇ ਨਾਂ ਮੇਲ ਖਾਂਦਾ ਹੈ",
  "positive.P03.title": "ਇਹ ਨੰਬਰ 1600 ਲੜੀ ਦਾ ਹੈ",
  "positive.P04.title": "ਇਹ ਲਿੰਕ ਸਰਕਾਰੀ ਸੂਚੀ ਵਿੱਚ ਹੈ",

  "verified.P01.title": "ਇਹ UPI ਆਈਡੀ ਇੱਕ @valid ਪਤਾ ਹੈ",
  "verified.P02.title": "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਾਡੀ ਸੂਚੀ ਵਿੱਚ ਹੈ ਅਤੇ ਨਾਂ ਮੇਲ ਖਾਂਦਾ ਹੈ",
  "verified.P03.title": "ਇਹ ਨੰਬਰ 1600 ਲੜੀ ਦਾ ਹੈ",
  "verified.P04.title": "ਇਹ ਲਿੰਕ ਸਰਕਾਰੀ ਸੂਚੀ ਵਿੱਚ ਹੈ",
  "verified.registrationIsNotPerformance":
    "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਕਾਰਗੁਜ਼ਾਰੀ ਜਾਂ ਰਿਟਰਨ ਦੀ ਕੋਈ ਗਰੰਟੀ ਨਹੀਂ ਦਿੰਦੀ।",

  "unverifiable.sender": "ਇਹ ਅਸਲ ਵਿੱਚ ਕਿਸ ਨੇ ਭੇਜਿਆ, ਅਸੀਂ ਨਹੀਂ ਜਾਣ ਸਕਦੇ",
  "unverifiable.sender.how":
    "ਆਪਣੇ ਸੰਪਰਕਾਂ ਵਿੱਚ ਨੰਬਰ ਲੱਭੋ, ਜਾਂ ਫ਼ਰਮ ਦੇ ਸਰਕਾਰੀ ਨੰਬਰ ਉੱਤੇ ਪੁੱਛੋ।",
  "unverifiable.linksNotOpened":
    "ਅਸੀਂ ਲਿੰਕ ਕਦੇ ਨਹੀਂ ਖੋਲ੍ਹਦੇ, ਇਸ ਲਈ ਅੰਦਰ ਕੀ ਹੈ, ਨਹੀਂ ਦੱਸ ਸਕਦੇ",
  "unverifiable.linksNotOpened.how":
    "ਜਾਣਾ ਹੀ ਪਵੇ ਤਾਂ ਫ਼ਰਮ ਦਾ ਨਾਂ ਆਪ ਟਾਈਪ ਕਰ ਕੇ ਉਸ ਦੀ ਸਰਕਾਰੀ ਸਾਈਟ ਤੋਂ ਜਾਓ।",
  "unverifiable.registrationNotInSnapshot":
    "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਨੰਬਰ ਸਾਡੀ ਸੂਚੀ ਵਿੱਚ ਨਹੀਂ ਹੈ, ਇਸ ਦਾ ਮਤਲਬ ਇਹ ਨਹੀਂ ਕਿ ਉਹ ਗ਼ਲਤ ਹੈ",
  "unverifiable.registrationNotInSnapshot.how":
    "SEBI ਦੀ ਸਾਈਟ ਉੱਤੇ ਨੰਬਰ ਪਾ ਕੇ ਆਪ ਵੇਖ ਲਵੋ।",
  "unverifiable.snapshotStale": "ਸਾਡੀ ਸੂਚੀ ਤੀਹ ਦਿਨਾਂ ਤੋਂ ਵੱਧ ਪੁਰਾਣੀ ਹੈ",
  "unverifiable.snapshotStale.how": "ਹੁਣ ਦੀ ਹਾਲਤ SEBI ਦੀ ਸਾਈਟ ਉੱਤੇ ਵੇਖੋ।",
  "unverifiable.registrationCategory":
    "ਇਹ ਨੰਬਰ ਕਿਸ ਕਿਸਮ ਦੀ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਹੈ, ਅਸੀਂ ਨਹੀਂ ਕਹਿ ਸਕਦੇ",
  "unverifiable.registrationCategory.how":
    "ਨੰਬਰ SEBI ਦੀ ਸਾਈਟ ਉੱਤੇ ਪਾਓ ਅਤੇ ਸ਼੍ਰੇਣੀ ਉੱਥੇ ਹੀ ਆਪ ਪੜ੍ਹ ਲਵੋ।",
  "unverifiable.domainAgeNeedsInternet":
    "ਡੋਮੇਨ ਕਿੰਨਾ ਪੁਰਾਣਾ ਹੈ, ਇੰਟਰਨੈੱਟ ਤੋਂ ਬਿਨਾਂ ਪਰਖਿਆ ਨਹੀਂ ਜਾ ਸਕਦਾ",
  "unverifiable.domainAgeNeedsInternet.how": "ਆਨਲਾਈਨ ਹੋਣ ਤੇ ਮੁੜ ਵੇਖ ਲੈਣਾ।",
  "unverifiable.contextNotAsked": "ਤਿੰਨ ਛੋਟੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬ ਨਹੀਂ ਦਿੱਤੇ ਗਏ",
  "unverifiable.contextNotAsked.how":
    "ਪਰਖ ਵਾਲੇ ਪੰਨੇ ਉੱਤੇ ਵਾਪਸ ਜਾ ਕੇ ਤਿੰਨਾਂ ਦੇ ਜਵਾਬ ਦਿਓ।",
  "unverifiable.voiceAndVideo": "ਅਸੀਂ ਆਵਾਜ਼ ਜਾਂ ਵੀਡੀਓ ਦੀ ਜਾਂਚ ਨਹੀਂ ਕਰਦੇ",
  "unverifiable.voiceAndVideo.how":
    "ਵੀਡੀਓ ਵਿੱਚ ਚਿਹਰਾ ਤੇ ਆਵਾਜ਼ ਦੋਵੇਂ ਨਕਲੀ ਬਣਾਏ ਜਾ ਸਕਦੇ ਹਨ; ਇਨ੍ਹਾਂ ਉੱਤੇ ਭਰੋਸਾ ਨਾ ਕਰੋ।",

  "claim.status.AGAINST_RULES": "ਨਿਯਮਾਂ ਦੇ ਖ਼ਿਲਾਫ਼",
  "claim.status.CANNOT_BE_VERIFIED": "ਪਰਖਿਆ ਨਹੀਂ ਜਾ ਸਕਦਾ",
  "claim.status.CHECK_ELSEWHERE": "ਇੱਥੇ ਵੇਖੋ",
  "claim.status.NEEDS_CONTEXT": "ਹੋਰ ਵੇਰਵਾ ਚਾਹੀਦਾ ਹੈ",

  "claim.C_GUARANTEE.claim": "ਪੱਕੇ ਮੁਨਾਫ਼ੇ ਦਾ ਵਾਅਦਾ",
  "claim.C_GUARANTEE.evidence":
    "ਰਿਟਰਨ ਦਾ ਵਾਅਦਾ ਕੋਈ ਨਹੀਂ ਕਰ ਸਕਦਾ, ਇਸ ਲਈ ਇਸ ਦਾ ਕੋਈ ਸਬੂਤ ਹੋ ਹੀ ਨਹੀਂ ਸਕਦਾ।",
  "claim.C_GUARANTEE.where": "SEBI ਦੀ ਨਿਵੇਸ਼ਕ ਸਮੱਗਰੀ",

  "claim.C_SEBI_APPROVED.claim": "SEBI ਦੀ ਮਨਜ਼ੂਰੀ ਦਾ ਦਾਅਵਾ",
  "claim.C_SEBI_APPROVED.evidence":
    "SEBI ਸਲਾਹਕਾਰਾਂ ਨੂੰ ਰਜਿਸਟਰ ਕਰਦੀ ਹੈ; ਕਿਸੇ ਗਰੁੱਪ ਜਾਂ ਟਿੱਪ ਨੂੰ ਮਨਜ਼ੂਰੀ ਨਹੀਂ ਦਿੰਦੀ।",
  "claim.C_SEBI_APPROVED.where": "SEBI ਦੀ ਵਿਚੋਲਿਆਂ ਦੀ ਸੂਚੀ ਵਿੱਚ ਨੰਬਰ ਵੇਖੋ",

  "claim.C_INSIDER.claim": "ਅੰਦਰ ਦੀ ਖ਼ਬਰ ਦਾ ਦਾਅਵਾ",
  "claim.C_INSIDER.evidence": "ਅਜਿਹੀ ਖ਼ਬਰ ਉੱਤੇ ਵਪਾਰ ਕਰਨਾ ਗ਼ੈਰ-ਕਾਨੂੰਨੀ ਹੈ।",
  "claim.C_INSIDER.where": "SEBI ਦੇ ਇਨਸਾਈਡਰ ਟਰੇਡਿੰਗ ਨਿਯਮ",

  "claim.C_DOUBLE_MONEY.claim": "ਪੈਸੇ ਦੁੱਗਣੇ ਕਰਨ ਦਾ ਦਾਅਵਾ",
  "claim.C_DOUBLE_MONEY.evidence": "ਬਜ਼ਾਰ ਦਾ ਰਿਟਰਨ ਬਦਲਦਾ ਰਹਿੰਦਾ ਹੈ ਤੇ ਘਾਟਾ ਵੀ ਹੋ ਸਕਦਾ ਹੈ।",
  "claim.C_DOUBLE_MONEY.where": "ਰਜਿਸਟਰਡ ਸਲਾਹਕਾਰ ਤੋਂ ਉਸ ਦੇ ਡਿਸਕਲੋਜ਼ਰ ਮੰਗੋ",

  "claim.C_RETURN_FIGURE.claim": "ਪੱਕਾ ਰਿਟਰਨ ਦਾ ਅੰਕੜਾ",
  "claim.C_RETURN_FIGURE.evidence": "ਬਜ਼ਾਰ ਦਾ ਰਿਟਰਨ ਬਦਲਦਾ ਰਹਿੰਦਾ ਹੈ ਤੇ ਘਾਟਾ ਵੀ ਹੋ ਸਕਦਾ ਹੈ।",
  "claim.C_RETURN_FIGURE.where": "ਰਜਿਸਟਰਡ ਸਲਾਹਕਾਰ ਤੋਂ ਉਸ ਦੇ ਡਿਸਕਲੋਜ਼ਰ ਮੰਗੋ",

  "claim.C_FAKE_PROOF.claim": "ਮੁਨਾਫ਼ੇ ਦੇ ਸਕਰੀਨਸ਼ਾਟ",
  "claim.C_FAKE_PROOF.evidence": "ਸਕਰੀਨਸ਼ਾਟ ਨਕਲੀ ਬਣਾਉਣੇ ਸੌਖੇ ਹਨ, ਇਸ ਲਈ ਉਹ ਸਬੂਤ ਨਹੀਂ।",
  "claim.C_FAKE_PROOF.where": "ਅਸਲੀ ਬਰੋਕਰ ਸਟੇਟਮੈਂਟ ਮੰਗੋ",

  "claim.C_SMALL_CAPITAL.claim": "ਥੋੜ੍ਹੀ ਰਕਮ ਤੋਂ ਵੱਡੀ ਕਮਾਈ",
  "claim.C_SMALL_CAPITAL.evidence": "ਥੋੜ੍ਹੀ ਰਕਮ ਉੱਤੇ ਵੀ ਬਜ਼ਾਰ ਦਾ ਖ਼ਤਰਾ ਓਨਾ ਹੀ ਹੈ।",
  "claim.C_SMALL_CAPITAL.where": "SEBI ਦੀ ਨਿਵੇਸ਼ਕ ਸਮੱਗਰੀ",

  "claim.C_URGENCY.claim": "ਕਾਹਲੀ ਕਰੋ, ਜਾਂ ਥੋੜ੍ਹੀਆਂ ਹੀ ਸੀਟਾਂ",
  "claim.C_URGENCY.evidence": "ਛੇਤੀ ਫ਼ੈਸਲਾ ਕਰਵਾਉਣਾ ਇੱਕ ਆਮ ਜਾਲ ਹੈ।",
  "claim.C_URGENCY.where": "ਇੱਕ ਦਿਨ ਉਡੀਕ ਕੇ ਮੁੜ ਵੇਖੋ",

  "claim.C_SECRECY.claim": "ਕਿਸੇ ਨੂੰ ਨਾ ਦੱਸਣ ਲਈ ਕਿਹਾ ਗਿਆ",
  "claim.C_SECRECY.evidence": "ਇਮਾਨਦਾਰ ਕੰਮ ਕੋਲ ਲੁਕਾਉਣ ਲਈ ਕੁਝ ਨਹੀਂ ਹੁੰਦਾ।",
  "claim.C_SECRECY.where": "ਘਰ ਵਿੱਚ ਕਿਸੇ ਨੂੰ ਵਿਖਾਓ",

  "claim.C_BORROWED.claim": "ਉਧਾਰ ਲੈ ਕੇ ਨਿਵੇਸ਼ ਕਰਨ ਲਈ ਕਿਹਾ ਗਿਆ",
  "claim.C_BORROWED.evidence": "ਉਧਾਰ ਲਏ ਪੈਸੇ ਜਾਣ ਤਾਂ ਨੁਕਸਾਨ ਦੂਣਾ ਹੁੰਦਾ ਹੈ।",
  "claim.C_BORROWED.where": "SEBI ਦੀ ਨਿਵੇਸ਼ਕ ਸਮੱਗਰੀ",

  "claim.C_CRYPTO_BOT.claim": "ਕ੍ਰਿਪਟੋ, ਬੌਟ ਜਾਂ ਫਾਰੇਕਸ ਦਾ ਦਾਅਵਾ",
  "claim.C_CRYPTO_BOT.evidence": "ਇਨ੍ਹਾਂ ਵਿੱਚੋਂ ਕਈ ਰੈਗੂਲੇਸ਼ਨ ਤੋਂ ਬਾਹਰ ਹਨ।",
  "claim.C_CRYPTO_BOT.where": "SEBI ਦੀ ਨਿਵੇਸ਼ਕ ਸਮੱਗਰੀ",

  "claim.C_AUTHORITY_NAME.claim": "ਵੱਡੇ ਨਾਂ ਦਾ ਸਹਾਰਾ",
  "claim.C_AUTHORITY_NAME.evidence": "ਨਾਂ ਲੈਣਾ ਤੇ ਰਜਿਸਟਰਡ ਹੋਣਾ ਇੱਕ ਗੱਲ ਨਹੀਂ।",
  "claim.C_AUTHORITY_NAME.where": "SEBI ਦੀ ਵਿਚੋਲਿਆਂ ਦੀ ਸੂਚੀ",

  "claim.C_REGISTRATION.claim": "ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਦਾ ਦਾਅਵਾ",
  "claim.C_REGISTRATION.evidence": "ਨੰਬਰ, ਨਾਂ ਤੇ ਸ਼੍ਰੇਣੀ — ਤਿੰਨੇ ਮੇਲ ਖਾਣੇ ਚਾਹੀਦੇ ਹਨ।",
  "claim.C_REGISTRATION.where": "SEBI ਦੀ ਸਾਈਟ ਉੱਤੇ ਨੰਬਰ ਪਾਓ",

  "claim.C_TIP.claim": "ਖ਼ਰੀਦਣ ਜਾਂ ਵੇਚਣ ਦੀ ਸਲਾਹ",
  "claim.C_TIP.evidence":
    "ਸਲਾਹ ਦੇਣ ਲਈ ਰਿਸਰਚ ਐਨਾਲਿਸਟ ਜਾਂ ਇਨਵੈਸਟਮੈਂਟ ਐਡਵਾਈਜ਼ਰ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਚਾਹੀਦੀ ਹੈ।",
  "claim.C_TIP.where": "SEBI ਦੀ ਵਿਚੋਲਿਆਂ ਦੀ ਸੂਚੀ",
};
