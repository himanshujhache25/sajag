/* Copy for every signal, positive, claim and "could not check" line, kept in
   its own file so the main pack stays readable. The basis line names the kind
   of source, never a bare assertion; anything still to be confirmed against a
   primary source is listed in docs/VERIFY.md. */
export const hiSignals: Record<string, string> = {
  "signal.S01.title": "OTP, पिन या पासवर्ड माँगा गया",
  "signal.S01.why":
    "कोई भी सच्ची कंपनी, बैंक या अधिकारी कभी OTP, पिन, CVV या पासवर्ड नहीं माँगता।",
  "signal.S01.basis": "आधार: बैंक और नियामक की आम चेतावनी",

  "signal.S02.title": "फोन पर कब्ज़ा माँगा जा रहा है",
  "signal.S02.why":
    "स्क्रीन शेयर या लिंक से आया ऐप लगवाकर ठग आपके बैंक ऐप तक पहुँच जाते हैं।",
  "signal.S02.basis": "आधार: साइबर अपराध पोर्टल की आम चेतावनी",

  "signal.S03.title": "पैसा निकालने के लिए पहले फीस माँगी गई",
  "signal.S03.why":
    "आपका अपना पैसा निकालने के लिए टैक्स, फीस या डिपॉज़िट कभी नहीं भरवाया जाता। यह दूसरी ठगी है।",
  "signal.S03.basis": "आधार: निवेशक चेतावनी, SEBI",

  "signal.S04.title": "पक्के मुनाफे का वादा और पैसे का रास्ता, दोनों साथ",
  "signal.S04.why":
    "वादा और भुगतान या ग्रुप का लिंक एक ही मैसेज में हों, तो यह ठगी का सबसे आम ढाँचा है।",
  "signal.S04.basis": "आधार: निवेशक चेतावनी, SEBI",

  "signal.S05.title": "सेबी, एक्सचेंज या बैंक का नाम ओढ़ा गया है",
  "signal.S05.why":
    "सेबी किसी ग्रुप या टिप को मंज़ूरी नहीं देती और न ही आपसे पैसा माँगती है।",
  "signal.S05.basis": "आधार: SEBI की आधिकारिक सूची",

  "signal.S10.title": "पक्के मुनाफे या बिना जोखिम का वादा",
  "signal.S10.why":
    "शेयर बाजार में कोई भी पक्का मुनाफा नहीं दे सकता। ऐसा वादा अपने आप में निशानी है।",
  "signal.S10.basis": "आधार: निवेशक चेतावनी, SEBI",

  "signal.S11.title": "ऐसा मुनाफा जो हो ही नहीं सकता",
  "signal.S11.why":
    "रोज़ या हफ्ते का तय प्रतिशत, या पैसा दोगुना करने की बात, किसी असली निवेश में नहीं होती।",
  "signal.S11.basis": "आधार: निवेशक शिक्षा सामग्री, SEBI",

  "signal.S12.title": "निजी ग्रुप में ले जाया जा रहा है",
  "signal.S12.why":
    "बंद ग्रुप में दूसरों की नज़र नहीं पड़ती, इसलिए दबाव बनाना आसान हो जाता है।",
  "signal.S12.basis": "आधार: निवेशक चेतावनी, SEBI",

  "signal.S13.title": "अंदर की खबर होने का दावा",
  "signal.S13.why":
    "ऐसी खबर पर सौदा करना कानून के खिलाफ है, और अक्सर खबर होती ही नहीं।",
  "signal.S13.basis": "आधार: भेदिया कारोबार नियम, SEBI",

  "signal.S14.title": "पैसा किसी व्यक्ति के यूपीआई या खाते में माँगा गया",
  "signal.S14.why":
    "रजिस्टर्ड कंपनी का पैसा उसके अपने खाते में जाता है। सेबी ने जाँचने के लिए @valid वाला यूपीआई दिया है।",
  "signal.S14.basis": "आधार: SEBI का @valid यूपीआई इंतज़ाम",

  "signal.S15.title": "रजिस्ट्रेशन नंबर की बात मेल नहीं खा रही",
  "signal.S15.why":
    "नंबर गलत ढाँचे का है, हमारे पास नहीं है, नाम से मेल नहीं खाता, या श्रेणी इस काम की नहीं है।",
  "signal.S15.basis": "आधार: SEBI की मध्यस्थ सूची",

  "signal.S16.title": "लिंक में गड़बड़ है",
  "signal.S16.why":
    "असली नाम से मिलता-जुलता पता, सीधा आईपी, छोटा किया हुआ लिंक या नया डोमेन, सब छिपाने के तरीके हैं।",
  "signal.S16.basis": "आधार: साइबर अपराध पोर्टल की आम चेतावनी",

  "signal.S17.title": "किसी को न बताने के लिए कहा गया",
  "signal.S17.why":
    "अलग-थलग कर देने पर ही दबाव टिकता है। सच्चे काम में छिपाने को कुछ नहीं होता।",
  "signal.S17.basis": "आधार: निवेशक शिक्षा सामग्री, SEBI",

  "signal.S20.title": "जल्दबाज़ी कराई जा रही है",
  "signal.S20.why": "सोचने का समय न मिले, इसीलिए सीट और समय कम बताए जाते हैं।",
  "signal.S20.basis": "आधार: निवेशक शिक्षा सामग्री, SEBI",

  "signal.S21.title": "मुनाफे के सबूत दिखाए जा रहे हैं",
  "signal.S21.why": "स्क्रीनशॉट बनाना आसान है, इसलिए वह सबूत नहीं माना जाता।",
  "signal.S21.basis": "आधार: निवेशक शिक्षा सामग्री, SEBI",

  "signal.S22.title": "बड़े नामों का सहारा लिया गया",
  "signal.S22.why":
    "किसी मशहूर नाम का ज़िक्र भरोसे के लिए है, वह जाँच की जगह नहीं लेता।",
  "signal.S22.basis": "आधार: निवेशक शिक्षा सामग्री, SEBI",

  "signal.S23.title": "टिप की शक्ल में सलाह, पर देने वाला जाँचा नहीं गया",
  "signal.S23.why":
    "खरीदने या बेचने की सलाह सिर्फ रजिस्टर्ड रिसर्च एनालिस्ट या निवेश सलाहकार दे सकते हैं।",
  "signal.S23.basis": "आधार: SEBI की मध्यस्थ सूची",

  "signal.S24.title": "थोड़े पैसे में बहुत कमाई का लालच",
  "signal.S24.why": "छोटी रकम से शुरू कराना पहला कदम होता है, फिर रकम बढ़वाई जाती है।",
  "signal.S24.basis": "आधार: निवेशक शिक्षा सामग्री, SEBI",

  "signal.S25.title": "क्रिप्टो, बॉट या फॉरेक्स सिग्नल की बात",
  "signal.S25.why":
    "इनमें से कई चीज़ें भारत में नियमों के दायरे में नहीं आतीं, शिकायत की जगह भी नहीं बनती।",
  "signal.S25.basis": "आधार: निवेशक चेतावनी, SEBI",

  "signal.S26.title": "उधार लेकर लगाने को कहा गया",
  "signal.S26.why": "कर्ज़ लेकर लगाया पैसा डूबे तो नुकसान दोगुना हो जाता है।",
  "signal.S26.basis": "आधार: निवेशक शिक्षा सामग्री, SEBI",

  "signal.S27.title": "सेवा की कॉल आम मोबाइल नंबर से",
  "signal.S27.why":
    "रजिस्टर्ड कंपनियाँ अपने ग्राहकों को सेवा की कॉल 1600 से शुरू होने वाले नंबर से करती हैं। बिक्री की कॉल इसमें नहीं आती, इसलिए यह हल्का संकेत है।",
  "signal.S27.basis": "आधार: 1600 नंबर शृंखला का इंतज़ाम",

  "signal.S28.title": "मुनाफे में हिस्सा या पहले फीस",
  "signal.S28.why":
    "मुनाफे में हिस्सा लेने का वादा और पहले से फीस, दोनों सलाह के नियमों के खिलाफ हैं।",
  "signal.S28.basis": "आधार: निवेश सलाहकार नियम, SEBI",

  "positive.P01.title": "यूपीआई आईडी @valid वाली है",
  "positive.P02.title": "रजिस्ट्रेशन हमारी सूची में मिला और नाम भी मिला",
  "positive.P03.title": "नंबर 1600 शृंखला का है",
  "positive.P04.title": "लिंक आधिकारिक सूची का है",

  "verified.P01.title": "यूपीआई आईडी @valid वाली है",
  "verified.P02.title": "रजिस्ट्रेशन हमारी सूची में मिला और नाम भी मिला",
  "verified.P03.title": "नंबर 1600 शृंखला का है",
  "verified.P04.title": "लिंक आधिकारिक सूची का है",
  "verified.registrationIsNotPerformance":
    "रजिस्ट्रेशन मुनाफे या प्रदर्शन की गारंटी नहीं है।",

  "unverifiable.sender": "यह मैसेज असल में किसने भेजा, यह हम नहीं जान सकते",
  "unverifiable.sender.how": "नंबर को अपनी डायरी में ढूँढिए, या सीधे कंपनी के आधिकारिक नंबर पर पूछिए।",
  "unverifiable.linksNotOpened": "हम कोई लिंक खोलते नहीं, इसलिए उसके अंदर क्या है यह नहीं पता",
  "unverifiable.linksNotOpened.how": "लिंक पर जाना ही हो तो कंपनी का नाम खुद टाइप करके उसकी आधिकारिक साइट से जाइए।",
  "unverifiable.registrationNotInSnapshot":
    "रजिस्ट्रेशन नंबर हमारी सूची में नहीं है, इसका मतलब गलत होना नहीं",
  "unverifiable.registrationNotInSnapshot.how": "सेबी की साइट पर नंबर डालकर खुद देख लीजिए।",
  "unverifiable.snapshotStale": "हमारी सूची तीस दिन से पुरानी है",
  "unverifiable.snapshotStale.how": "सेबी की साइट पर ताज़ा हालत देख लीजिए।",
  "unverifiable.registrationCategory":
    "यह नंबर किस तरह का पंजीकरण है, हम नहीं कह सकते",
  "unverifiable.registrationCategory.how":
    "नंबर सेबी की साइट पर डालिए और श्रेणी वहीं खुद पढ़ लीजिए।",
  "unverifiable.domainAgeNeedsInternet": "डोमेन कितना पुराना है, यह नेट के बिना नहीं देखा जा सकता",
  "unverifiable.domainAgeNeedsInternet.how": "नेट आने पर दोबारा जाँचिए।",
  "unverifiable.contextNotAsked": "तीन छोटे सवालों के जवाब नहीं मिले",
  "unverifiable.contextNotAsked.how": "जाँच के पन्ने पर जाकर तीनों सवालों के जवाब दीजिए।",
  "unverifiable.voiceAndVideo": "आवाज़ और वीडियो हम नहीं जाँचते",
  "unverifiable.voiceAndVideo.how": "वीडियो में चेहरा और आवाज़ दोनों बनाए जा सकते हैं, उन पर भरोसा न कीजिए।",

  "claim.status.AGAINST_RULES": "नियम के खिलाफ",
  "claim.status.CANNOT_BE_VERIFIED": "जाँचा नहीं जा सकता",
  "claim.status.CHECK_ELSEWHERE": "यहाँ देखें",
  "claim.status.NEEDS_CONTEXT": "संदर्भ चाहिए",

  "claim.C_GUARANTEE.claim": "पक्के मुनाफे का वादा",
  "claim.C_GUARANTEE.evidence": "कोई भी पक्का मुनाफा नहीं दे सकता, इसलिए सबूत बन ही नहीं सकता।",
  "claim.C_GUARANTEE.where": "सेबी की निवेशक सामग्री",

  "claim.C_SEBI_APPROVED.claim": "सेबी से मंज़ूरी का दावा",
  "claim.C_SEBI_APPROVED.evidence": "सेबी सलाहकार को रजिस्टर करती है, किसी ग्रुप या टिप को मंज़ूरी नहीं देती।",
  "claim.C_SEBI_APPROVED.where": "सेबी की मध्यस्थ सूची में नंबर देखिए",

  "claim.C_INSIDER.claim": "अंदर की खबर का दावा",
  "claim.C_INSIDER.evidence": "ऐसी खबर पर सौदा करना कानून के खिलाफ है।",
  "claim.C_INSIDER.where": "सेबी के भेदिया कारोबार नियम",

  "claim.C_DOUBLE_MONEY.claim": "पैसा दोगुना करने का दावा",
  "claim.C_DOUBLE_MONEY.evidence": "बाजार का रिटर्न बदलता रहता है और घट भी सकता है।",
  "claim.C_DOUBLE_MONEY.where": "रजिस्टर्ड सलाहकार के खुलासे माँगिए",

  "claim.C_RETURN_FIGURE.claim": "तय रिटर्न का आँकड़ा",
  "claim.C_RETURN_FIGURE.evidence": "बाजार का रिटर्न बदलता रहता है और घट भी सकता है।",
  "claim.C_RETURN_FIGURE.where": "रजिस्टर्ड सलाहकार के खुलासे माँगिए",

  "claim.C_FAKE_PROOF.claim": "मुनाफे के स्क्रीनशॉट",
  "claim.C_FAKE_PROOF.evidence": "स्क्रीनशॉट बनाना आसान है, वह सबूत नहीं है।",
  "claim.C_FAKE_PROOF.where": "ब्रोकर का असली स्टेटमेंट माँगिए",

  "claim.C_SMALL_CAPITAL.claim": "थोड़े पैसे से बहुत कमाई का दावा",
  "claim.C_SMALL_CAPITAL.evidence": "छोटी रकम पर भी बाजार का जोखिम उतना ही रहता है।",
  "claim.C_SMALL_CAPITAL.where": "सेबी की निवेशक सामग्री",

  "claim.C_URGENCY.claim": "जल्दबाज़ी या सीट कम होने की बात",
  "claim.C_URGENCY.evidence": "जल्दी फैसला कराना आम जाल है।",
  "claim.C_URGENCY.where": "एक दिन रुककर दोबारा देखिए",

  "claim.C_SECRECY.claim": "किसी को न बताने की बात",
  "claim.C_SECRECY.evidence": "सच्चे काम में छिपाने को कुछ नहीं होता।",
  "claim.C_SECRECY.where": "घर में किसी को दिखा लीजिए",

  "claim.C_BORROWED.claim": "उधार लेकर लगाने की बात",
  "claim.C_BORROWED.evidence": "कर्ज़ का पैसा डूबे तो नुकसान दोगुना होता है।",
  "claim.C_BORROWED.where": "सेबी की निवेशक सामग्री",

  "claim.C_CRYPTO_BOT.claim": "क्रिप्टो, बॉट या फॉरेक्स का दावा",
  "claim.C_CRYPTO_BOT.evidence": "इनमें से कई चीज़ें नियमों के दायरे में नहीं आतीं।",
  "claim.C_CRYPTO_BOT.where": "सेबी की निवेशक सामग्री",

  "claim.C_AUTHORITY_NAME.claim": "बड़े नाम का सहारा",
  "claim.C_AUTHORITY_NAME.evidence": "नाम का ज़िक्र रजिस्ट्रेशन की जगह नहीं लेता।",
  "claim.C_AUTHORITY_NAME.where": "सेबी की मध्यस्थ सूची",

  "claim.C_REGISTRATION.claim": "रजिस्ट्रेशन का दावा",
  "claim.C_REGISTRATION.evidence": "नंबर, नाम और श्रेणी तीनों मिलने चाहिए।",
  "claim.C_REGISTRATION.where": "सेबी की साइट पर नंबर डालकर देखिए",

  "claim.C_TIP.claim": "खरीदने या बेचने की सलाह",
  "claim.C_TIP.evidence": "सलाह देने के लिए रिसर्च एनालिस्ट या निवेश सलाहकार का रजिस्ट्रेशन चाहिए।",
  "claim.C_TIP.where": "सेबी की मध्यस्थ सूची",
};
