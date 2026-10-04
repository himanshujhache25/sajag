/* Marathi: Madad (the first hour), the plan, the verdict steps, the complaint
   drafts and the Check screen. Machine-assisted, not yet read by a native
   speaker — the pack stays `needsReview`, so the picker shows "(बीटा)".

   Same keys and same order as the English source so the two can be diffed.
   Placeholders ({n}, {amount}, {txn} …) are copied exactly; a translated
   placeholder silently prints itself instead of the value. */
export const mrHelp: Record<string, string> = {
  /* ---------------------------------------------------------- madad ---- */
  "madad.title": "पैसे गेले? आधी एक श्वास घ्या.",
  "madad.sub": "तुम्ही एकटे नाही. पहिला तासच सर्वात महत्त्वाचा असतो.",
  "madad.call1930": "१९३० वर फोन करा",
  "madad.call1930Line":
    "जितक्या लवकर कळवाल, तितकी पैसे थांबवण्याची शक्यता जास्त. कोणीही खात्री देऊ शकत नाही.",
  "madad.stepOf": "{n} / {total}",
  "madad.next": "पुढे",
  "madad.back": "मागे",
  "madad.skip": "वगळा",
  "madad.makePlan": "माझी योजना तयार करा",
  "madad.savedHere": "तुमची उत्तरे याच फोनवर ठेवली जात आहेत.",
  "madad.resume": "एक अपूर्ण प्रकरण उघडे आहे",
  "madad.startOver": "नवीन प्रकरण सुरू करा",

  "madad.q1": "तुम्ही कधी पाठवले?",
  "madad.when.now": "आत्ताच, किंवा एका तासात",
  "madad.when.today": "आज",
  "madad.when.week": "गेल्या ७ दिवसांत",
  "madad.when.older": "त्याहून जुने",

  "madad.q2": "तुम्ही कसे पाठवले?",
  "madad.q2Hint": "एकापेक्षा जास्त निवडू शकता.",
  "madad.how.upi": "UPI",
  "madad.how.bank": "बँक हस्तांतरण (NEFT, IMPS)",
  "madad.how.card": "कार्ड",
  "madad.how.crypto": "क्रिप्टो",
  "madad.how.cash": "रोख किंवा दुसरे काही",

  "madad.q3": "किती?",
  "madad.amountLabel": "रक्कम, रुपयांत",

  "madad.q4": "कोणाला, आणि कुठे?",
  "madad.q4Hint": "UPI आयडी, खाते क्रमांक, अ‍ॅप किंवा संकेतस्थळ, गट किंवा क्रमांक.",
  "madad.q4Found": "आम्हाला यात हे सापडले",
  "madad.txnLabel": "व्यवहार आयडी किंवा UTR",

  "madad.q5": "तुम्हाला काय वचन दिले होते?",
  "madad.promised.sureProfit": "“पक्का नफा”",
  "madad.promised.double": "“पैसे दुप्पट”",
  "madad.promised.ipo": "“IPO वाटप”",
  "madad.promised.feeToWithdraw": "“काढण्यासाठी शुल्क भरा”",
  "madad.promised.other": "दुसरे काही",
  "madad.promisedNote": "तुमच्या स्वतःच्या शब्दांत",

  "madad.q6": "तुमच्याकडे काय पुरावा आहे?",
  "madad.proof.utr": "व्यवहार आयडी किंवा UTR",
  "madad.proof.screenshots": "संभाषणाचे स्क्रीनशॉट",
  "madad.proof.handle": "क्रमांक किंवा हँडल",
  "madad.proof.app": "अ‍ॅपचे नाव किंवा APK",
  "madad.proof.website": "संकेतस्थळाची लिंक",
  "madad.proof.recording": "कॉल रेकॉर्डिंग",
  "madad.proof.statement": "बँक स्टेटमेंट",

  "madad.script.title": "१९३० वर हे वाचून सांगा",
  "madad.script.body":
    "माझे नाव {name}, मी {place} येथून बोलत आहे. ऑनलाइन गुंतवणुकीच्या नावाखाली माझी फसवणूक झाली आहे. मी {how} ने {amount} रुपये पाठवले. व्यवहार आयडी {txn} आहे. पैसे {toWhom} कडे गेले.",
  "madad.script.nameLabel": "तुमचे नाव",
  "madad.script.placeLabel": "गाव किंवा शहर",

  /* ----------------------------------------------------------- plan ---- */
  "plan.title": "तुमची योजना",
  "plan.sub": "तुमच्याच उत्तरांवरून तयार केली. ती याच फोनवर राहते.",

  "plan.now.title": "आत्ताच, पहिल्या तासात",
  "plan.now.call1930": "१९३० वर फोन करून वरचा मजकूर वाचून सांगा.",
  "plan.now.tellBank":
    "तुमच्या UPI अ‍ॅपला किंवा बँकेच्या मदत क्रमांकालाही लगेच कळवा.",
  "plan.now.sendNothingMore":
    "आणखी पैसे पाठवू नका. “वसुली एजंट”ला शुल्क देऊ नका; ती बहुधा दुसरी फसवणूक असते.",

  "plan.today.title": "आजचा दिवस संपण्याआधी",
  "plan.today.portal":
    "cybercrime.gov.in वर संपूर्ण तपशील भरा. १९३० च्या फोनवरून मिळालेला पोचपावती क्रमांक जपून ठेवा; हे साधारणपणे २४ तासांत करायला सांगितले जाते.",
  "plan.today.keepEvidence": "संभाषण मिटवू नका. आहे तसेच राहू द्या.",
  "plan.today.screenshotsSafe":
    "स्क्रीनशॉट दुसरीकडे कॉपी करून ठेवा, म्हणजे फोनमधून हरवणार नाहीत.",

  "plan.week.title": "या आठवड्यात",
  "plan.week.firstTheFirm":
    "ती कंपनी SEBI कडे नोंदणीकृत असेल, तर आधी कंपनीकडेच तक्रार करा.",
  "plan.week.scores":
    "मग ती SCORES वर टाका. कंपनीला उत्तर द्यायला २१ दिवस असतात, त्यानंतर दोन पातळ्यांवर फेरआढावा असतो.",
  "plan.week.ifUnregistered":
    "कंपनी नोंदणीकृत नसेल, तर SEBI चा तक्रार मार्ग सहसा लागू होत नाही. पोलिस आणि सायबर क्राइमचा मार्गच योग्य.",
  "plan.week.card":
    "कार्डने पैसे दिले असतील, तर बँकेकडे चार्जबॅकबद्दल विचारा.",
  "plan.week.uninstall":
    "ते अ‍ॅप काढून टाका, बँकेचे पासवर्ड आणि पिन बदला, आणि बँकेला कळवा.",

  "plan.truth.title": "खरे काय ते सरळ",
  "plan.truth.mayNotComeBack": "पैसे परत येणार नाहीत असेही होऊ शकते.",
  "plan.truth.fasterHelps": "लवकर कळवल्याने ते थांबवण्याची शक्यता वाढते.",
  "plan.truth.recoveryFeeIsSecondScam":
    "तुमचे पैसे परत मिळवून देण्यासाठी शुल्क मागणारा माणूस ही दुसरी फसवणूक आहे.",
  "plan.truth.notYourShame":
    "या फसवणुका मोठ्या काळजीने रचलेल्या असतात. त्यात फसणे लाजिरवाणे नाही.",
  "plan.truth.teleManas":
    "मनावर ओझे वाटत असेल, तर टेली-मानस १४४१६ वर बोलू शकता.",

  "plan.timeline": "काय घडले, क्रमाने",
  "plan.timelineWhen": "कधी",
  "plan.timelineWhat": "काय घडले",
  "plan.timelineAdd": "एक ओळ जोडा",
  "plan.timelineRemove": "काढा",

  "plan.drafts": "तक्रारीचे मसुदे",
  "plan.portalFields": "सायबर क्राइम पोर्टल हे विचारेल",
  "plan.scoresDraft": "SCORES साठी मसुदा",
  "plan.print": "छापा किंवा PDF करा",
  "plan.sendSelf": "व्हॉट्सअ‍ॅपवर स्वतःला पाठवा",

  "plan.myCase": "माझे प्रकरण",
  "plan.ackLabel": "१९३० कडून मिळालेला पोचपावती क्रमांक",
  "plan.done.called": "१९३० वर फोन केला",
  "plan.done.portal": "पोर्टलवर भरले",
  "plan.done.bank": "बँकेला किंवा अ‍ॅपला कळवले",
  "plan.done.firm": "कंपनीकडे तक्रार केली",
  "plan.done.scores": "SCORES वर टाकले",
  "plan.reminder": "२१ दिवसांची तारीख माझ्या दिनदर्शिकेत ठेवा",
  "plan.reminderTitle": "SCORES: २१ दिवस पूर्ण झाले",
  "plan.reminderNote":
    "कंपनीने उत्तर दिले नसेल, तर SCORES वर पुढच्या पातळीवर फेरआढावा मागा.",
  "plan.empty": "आधी मदत मध्ये सहा प्रश्नांची उत्तरे द्या.",

  /* ----------------------------------------------------------- step ---- */
  "step.high.1": "पैसे, OTP किंवा अ‍ॅप देऊ नका.",
  "step.high.2": "हा क्रमांक किंवा गट ब्लॉक करून तक्रार करा.",
  "step.high.3": "विश्वासातल्या कोणाला तरी दाखवा.",
  "step.multiple.1": "आज पैसे पाठवू नका. २४ तास थांबा.",
  "step.multiple.2": "नोंदणी स्वतः SEBI च्या संकेतस्थळावर तपासा.",
  "step.multiple.3": "कोणाला तरी विचारा.",
  "step.some.1": "घाईत पैसे पाठवू नका.",
  "step.some.2": "नोंदणी स्वतः SEBI च्या संकेतस्थळावर तपासा.",
  "step.some.3": "कोणाला तरी विचारा.",
  "step.none.1": "याचा अर्थ हे सुरक्षित आहे असा नाही.",
  "step.none.2": "पैसे पाठवण्याआधी UPI किंवा खाते SEBI Check वर तपासा.",
  "step.notEnough.1": "पूर्ण संदेश चिकटवा, मग काही सांगता येईल.",

  /* ---------------------------------------------------------- draft ---- */
  "draft.portal.category": "प्रकार: ऑनलाइन गुंतवणुकीच्या नावाखाली फसवणूक",
  "draft.portal.when": "कधी घडले",
  "draft.portal.amount": "किती पाठवले",
  "draft.portal.how": "पैसे कसे गेले",
  "draft.portal.toWhom": "कुठे गेले: UPI आयडी, खाते, अ‍ॅप, संकेतस्थळ",
  "draft.portal.txn": "व्यवहार आयडी किंवा UTR",
  "draft.portal.contact": "तुमचे नाव, पत्ता आणि मोबाइल क्रमांक",
  "draft.portal.evidence": "तुमच्या पुराव्याच्या फाइल",
  "draft.scores.noChronology": "(घटनांचा क्रम अजून भरलेला नाही)",
  "draft.scores.body": `प्रति,
तक्रार निवारण कक्ष

विषय: ऑनलाइन गुंतवणुकीच्या नावाखाली झालेल्या फसवणुकीबद्दल तक्रार

१. तक्रारदाराचा तपशील: (नाव, पत्ता, मोबाइल, ईमेल भरा)
२. ज्यांच्याविरुद्ध तक्रार: {toWhom}
३. तक्रारीचे स्वरूप: {promised} असे वचन देऊन पैसे घेतले गेले.
४. घटनाक्रम:
{chronology}
५. रक्कम: रु {amount}
६. व्यवहार आयडी: {txn}
७. मागितलेली दाद: पाठवलेली रक्कम परत मिळावी, आणि चौकशी व्हावी.
८. जोडलेली कागदपत्रे: {evidence}

आपला विश्वासू,
(नाव आणि सही)`,
  "draft.copy": "मसुदा कॉपी करा",
  "draft.copied": "कॉपी झाले",

  /* ---------------------------------------------------------- check ---- */
  "check.speak": "बोला",
  "check.paste": "चिकटवा",
  "check.photo": "फोटो",
  "check.counter": "{count} / {max}",
  "check.pasteDenied":
    "चिकटवण्याची परवानगी मिळाली नाही. चौकट दाबून धरा, मग चिकटवा निवडा.",
  "check.fromShare": "व्हॉट्सअ‍ॅपवरून पाठवलेला संदेश",
  "check.tooShort": "थोडे अजून लिहा, एवढ्यावरून काही सांगता येत नाही.",
  "check.tooLong": "संदेश खूप मोठा आहे, पहिली {max} अक्षरे तपासत आहोत.",
  "check.questionsTitle": "वाटल्यास, तीन छोटे प्रश्न",
  "check.q1": "त्यांनीच आधी संपर्क केला होता का?",
  "check.q2": "पैसे, OTP किंवा अ‍ॅप मागितले का?",
  "check.q3": "ही व्यक्ती तुम्हाला माहीत आहे का?",
  "check.samples": "नमुने",
  "check.samplesTitle": "नमुना संदेश",
  "check.samplesLine": "हे सगळे काल्पनिक आहेत, कोणीही खरी व्यक्ती नाही.",
  "check.useSample": "हा तपासा",
  "check.listening": "ऐकत आहे",
  "check.speakIdle": "बोला",
  "check.voiceUnavailable": "या फोनवर बोलण्याची सोय नाही. संदेश चिकटवा.",
  "check.voiceOffline": "बोलण्यासाठी इंटरनेट लागते. संदेश चिकटवा.",
  "check.voiceNothingHeard": "काही ऐकू आले नाही. पुन्हा करा, किंवा संदेश चिकटवा.",
  "check.voiceDenied":
    "मायक्रोफोन बंद आहे. ब्राउझरच्या सेटिंगमध्ये परवानगी द्या, किंवा संदेश चिकटवा.",
  "check.ocrOffline": "फोटो वाचायला पहिल्यांदा इंटरनेट लागते. संदेश चिकटवा.",
  "check.ocrReading": "चित्र वाचत आहे",
  "check.ocrStayed": "फोटो तुमचा फोन सोडून गेला नाही",
  "check.ocrLowConfidence": "काही शब्द चुकीचे वाचले गेले असतील, एकदा पाहून घ्या.",
  "check.ocrFailed":
    "चित्र स्पष्ट वाचता आले नाही. संदेश चिकटवा किंवा पुन्हा काढा.",

  /* ------------------------------------------------------- composer ---- */
  "composer.placeholder": "संदेश इथे चिकटवा, किंवा खाली बोला",
  "composer.label": "तपासायचा संदेश",
  "composer.speak": "बोला",
  "composer.photo": "फोटो",
  "composer.primedVoice": "बोला दाबा आणि संदेश वाचून सांगा.",
  "composer.primedPhoto": "फोटो दाबून स्क्रीनशॉट निवडा.",
  "composer.paste": "चिकटवा",
  "composer.clear": "पुसा",
  "composer.submit": "तपासा",
  "composer.empty": "आधी संदेश चिकटवा किंवा बोला",
  "composer.privacy": "तपासणी फक्त याच फोनवर होते",
  "composer.photoPrivacy": "फोटो तुमचा फोन सोडून गेला नाही",
  "composer.photoReading": "फोटो वाचत आहे… {pct}%",
  "composer.fromShare": "दुसऱ्या अ‍ॅपवरून पाठवलेला संदेश",
  "composer.cleared": "तुम्ही लिहिलेले पुसले.",
};
