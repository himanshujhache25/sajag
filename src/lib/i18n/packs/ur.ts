import type { Pack } from "../langs";
import { urHelp } from "./ur-help";
import { urSignals } from "./ur-signals";

/* Urdu. Machine-assisted, awaiting a native read. The only right-to-left
   language in the app; direction is handled by `dirOf` in langs.ts, not by
   anything written here. */
export const ur: Pack = {
  lang: "ur",
  needsReview: true,
  strings: {
    ...urSignals,
    ...urHelp,
    "app.tagline": "رکیے · جانچیے · سمجھیے",
    "app.disclaimer":
      "ہم سرمایہ کاری کا مشورہ نہیں دیتے۔ یہ SANGYAN ہیکاتھون کا نمونہ ہے، SEBI یا NSDL کی سرکاری ایپ نہیں۔",
    "app.skipToContent": "اصل مواد پر جائیں",

    "nav.back": "واپس",
    "nav.home": "ہوم",
    "nav.settings": "ترتیبات",
    "nav.about": "ہمارے بارے میں",
    "nav.language": "زبان",

    "common.yes": "ہاں",
    "common.no": "نہیں",
    "common.dontKnow": "معلوم نہیں",
    "common.continue": "آگے",
    "common.cancel": "منسوخ",
    "common.copy": "نقل کریں",
    "common.copied": "نقل ہو گیا",
    "common.listen": "سنیے",
    "common.stop": "روکیں",
    "common.beta": "(بیٹا)",
    "common.close": "بند کریں",
    "common.save": "محفوظ کریں",

    "tab.home": "ہوم",
    "tab.check": "جانچیے",
    "tab.madad": "مدد",
    "tab.pause": "رکیے",
    "tab.more": "مزید",

    "home.hero": "کوئی پیغام آیا ہے؟",
    "home.heroLead": "پیسے یا OTP دینے سے پہلے یہاں جانچ لیجیے۔",
    "home.more": "اور کچھ چاہیے؟",
    "home.madad": "پیسے چلے گئے؟",
    "home.madadLine": "پہلا گھنٹہ، یہیں سے شروع کیجیے",
    "home.pause": "رکیے",
    "home.pauseLine": "کچھ کرنے سے پہلے ایک منٹ",
    "home.traps": "دھوکے کے عام طریقے",
    "home.trapsSub": "دیکھیے یہ کیسے لگتے ہیں",
    "home.trapSub": "دیکھیے یہ کیسا لگتا ہے",
    "home.trap1": "VIP گروپ کی دعوت",
    "home.trap2": "OTP مانگنا",
    "home.trap3": "فیس بھریں، تبھی پیسے ملیں گے",
    "home.trap4": "ایپ لگانے یا اسکرین شیئر کرنے کو کہنا",
    "home.steps": "تین قدم",
    "home.step1": "پیغام چسپاں کیجیے، بولیے یا تصویر بھیجیے",
    "home.step2": "نتیجہ اور وجوہات دیکھیے",
    "home.step3": "رک کر فیصلہ کیجیے۔ چاہیں تو گھر والوں کو بتائیے۔",
    "home.lastCheck": "آخری جانچ",
    "home.openCase": "آپ کا معاملہ کھلا ہے",
    "home.openCaseGo": "جاری رکھیں",
    "home.learn": "سمجھیے",
    "home.family": "خاندان",
    "home.history": "پرانی جانچ",
    "home.historyShort": "پرانی جانچ",
    "home.tipOfDay": "آج کی ایک بات",
    "home.lateNight": "بڑے فیصلے صبح زیادہ صاف نظر آتے ہیں",
    "home.pauseOpen": "رکیے کھولیے",
    "home.privacyLabel": "اس فون سے باہر گیا",
    "home.privacyLine": "جانچ اسی فون پر۔ کوئی اکاؤنٹ نہیں۔ کوئی مشورہ نہیں۔",
    "home.privacySee": "آپ کا ڈیٹا کہاں گیا",
    "home.sampleLink": "کوئی نمونہ پیغام آزمائیے",
    "home.installAdd": "شامل کریں",

    "quick.placeholder": "پیغام یہاں چسپاں کیجیے…",
    "quick.check": "پیغام جانچیے",
    "quick.speak": "بول کر",
    "quick.photo": "تصویر",
    "quick.paste": "چسپاں کریں",

    "sample.banner": "یہ ایک نمونہ پیغام ہے",
    "sample.own": "اپنا پیغام جانچیے",

    "check.title": "آپ کے پاس کیا آیا ہے؟",
    "check.placeholder": "پیغام یہاں چسپاں کیجیے",
    "check.submit": "جانچیے",
    "check.clear": "مٹائیں",

    "state.HIGH_RISK.stamp": "خطرہ",
    "state.MULTIPLE_RED_FLAGS.stamp": "ہوشیار",
    "state.SOME_CONCERNS.stamp": "غور سے دیکھیے",
    "state.NO_STRONG_FLAGS.stamp": "ٹھوس کچھ نہیں ملا",
    "state.NOT_ENOUGH_TO_GO_ON.stamp": "کافی نہیں",

    "result.title": "نتیجہ",
    "result.whatNow": "اب کیا کریں",
    "result.why": "کیوں",

    "privacy.onDevice": "جانچ صرف اسی فون پر ہوتی ہے",

    "start.langTitle": "اپنی زبان چنیے",
    "start.promisesTitle": "تین وعدے",

    "settings.title": "ترتیبات",
    "settings.language": "زبان",
    "settings.textSize": "حروف کا سائز",
    "settings.theme": "ظاہری شکل",
  },
};
