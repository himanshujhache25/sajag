import type { Pack } from "../langs";
import { mrHelp } from "./mr-help";
import { mrSignals } from "./mr-signals";

/* Marathi. Machine-assisted, not yet read by a native speaker, so
   `needsReview` is true and the picker marks it "(beta)". Keys that are not
   here fall back to English, never to a blank. */
export const mr: Pack = {
  lang: "mr",
  needsReview: true,
  strings: {
    ...mrSignals,
    ...mrHelp,
    "app.tagline": "थांबा · तपासा · समजून घ्या",
    "app.disclaimer":
      "आम्ही गुंतवणुकीचा सल्ला देत नाही. हे SANGYAN हॅकेथॉनचे प्रारूप आहे, SEBI किंवा NSDL चे अधिकृत अ‍ॅप नाही.",
    "app.skipToContent": "मुख्य मजकुराकडे जा",

    "nav.back": "मागे",
    "nav.home": "मुख्यपृष्ठ",
    "nav.settings": "सेटिंग्ज",
    "nav.about": "आमच्याविषयी",
    "nav.language": "भाषा",

    "common.yes": "होय",
    "common.no": "नाही",
    "common.dontKnow": "माहीत नाही",
    "common.continue": "पुढे",
    "common.cancel": "रद्द करा",
    "common.copy": "कॉपी करा",
    "common.copied": "कॉपी झाले",
    "common.listen": "ऐका",
    "common.stop": "थांबवा",
    "common.beta": "(बीटा)",
    "common.close": "बंद करा",
    "common.save": "जतन करा",

    "tab.home": "होम",
    "tab.check": "तपासा",
    "tab.madad": "मदत",
    "tab.pause": "थांबा",
    "tab.more": "आणखी",

    "home.hero": "एखादा मेसेज आला आहे का?",
    "home.heroLead": "पैसे किंवा OTP देण्याआधी इथे तपासून घ्या.",
    "home.more": "आणखी काही हवे आहे?",
    "home.madad": "पैसे गेले का?",
    "home.madadLine": "पहिला तास, इथूनच सुरुवात करा",
    "home.pause": "थांबा",
    "home.pauseLine": "काही करण्याआधी एक मिनिट",
    "home.traps": "फसवणुकीचे नेहमीचे मार्ग",
    "home.trapsSub": "ते कसे दिसतात ते पाहा",
    "home.trapSub": "हे कसे दिसते ते पाहा",
    "home.trap1": "VIP गटाचे आमंत्रण",
    "home.trap2": "OTP मागणे",
    "home.trap3": "शुल्क भरा, तरच पैसे मिळतील",
    "home.trap4": "अ‍ॅप टाका किंवा स्क्रीन शेअर करा असे सांगणे",
    "home.steps": "तीन पावले",
    "home.step1": "मेसेज चिकटवा, बोला किंवा फोटो पाठवा",
    "home.step2": "निकाल आणि कारणे पाहा",
    "home.step3": "थांबून ठरवा. वाटल्यास घरच्यांना सांगा.",
    "home.lastCheck": "शेवटची तपासणी",
    "home.openCase": "तुमचे प्रकरण सुरू आहे",
    "home.openCaseGo": "पुढे चालू ठेवा",
    "home.learn": "समजून घ्या",
    "home.family": "कुटुंब",
    "home.history": "जुन्या तपासण्या",
    "home.historyShort": "जुन्या तपासण्या",
    "home.tipOfDay": "आजची एक गोष्ट",
    "home.lateNight": "मोठे निर्णय सकाळी अधिक स्पष्ट दिसतात",
    "home.pauseOpen": "थांबा उघडा",
    "home.privacyLabel": "या फोनबाहेर गेले",
    "home.privacyLine": "तपासणी याच फोनवर. खाते नाही. सल्ला नाही.",
    "home.privacySee": "तुमचा डेटा कुठे गेला",
    "home.sampleLink": "एखादा नमुना मेसेज पाहा",
    "home.installAdd": "जोडा",

    "quick.placeholder": "इथे मेसेज चिकटवा…",
    "quick.check": "मेसेज तपासा",
    "quick.speak": "बोलून",
    "quick.photo": "फोटो",
    "quick.paste": "चिकटवा",

    "sample.banner": "हा एक नमुना मेसेज आहे",
    "sample.own": "तुमचा स्वतःचा मेसेज तपासा",

    "check.title": "तुमच्याकडे काय आले आहे?",
    "check.placeholder": "इथे मेसेज चिकटवा",
    "check.submit": "तपासा",
    "check.clear": "पुसा",

    "state.HIGH_RISK.stamp": "धोका",
    "state.MULTIPLE_RED_FLAGS.stamp": "सावधान",
    "state.SOME_CONCERNS.stamp": "नीट पाहा",
    "state.NO_STRONG_FLAGS.stamp": "ठोस काही नाही",
    "state.NOT_ENOUGH_TO_GO_ON.stamp": "पुरेसे नाही",

    "result.title": "निकाल",
    "result.whatNow": "आता काय करावे",
    "result.why": "का",

    "privacy.onDevice": "तपासणी फक्त याच फोनवर होते",

    "start.langTitle": "तुमची भाषा निवडा",
    "start.promisesTitle": "तीन वचने",

    "settings.title": "सेटिंग्ज",
    "settings.language": "भाषा",
    "settings.textSize": "अक्षरांचा आकार",
    "settings.theme": "रूप",
  },
};
