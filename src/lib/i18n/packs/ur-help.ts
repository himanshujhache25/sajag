/* Urdu: Madad (the first hour), the plan, the verdict steps, the complaint
   drafts and the Check screen. Machine-assisted, not yet read by a native
   speaker — the pack stays `needsReview`, so the picker shows "(بیٹا)".

   Same keys and same order as the English source so the two can be diffed.
   Placeholders ({n}, {amount}, {txn} …) are copied exactly; a translated
   placeholder silently prints itself instead of the value.

   This is the right-to-left pack. The Latin names that must stay Latin —
   UPI, SEBI, SCORES, APK, UTR, PDF — are left as they are; the fuzz spec
   re-renders every screen in Urdu and checks nothing overflows. */
export const urHelp: Record<string, string> = {
  /* ---------------------------------------------------------- madad ---- */
  "madad.title": "پیسے چلے گئے؟ پہلے ایک سانس لیں۔",
  "madad.sub": "آپ اکیلے نہیں ہیں۔ پہلا گھنٹہ ہی سب سے اہم ہے۔",
  "madad.call1930": "1930 پر فون کریں",
  "madad.call1930Line":
    "جتنی جلدی اطلاع دیں گے، پیسہ روکنے کا امکان اتنا ہی زیادہ ہے۔ کوئی وعدہ نہیں کر سکتا۔",
  "madad.stepOf": "{n} / {total}",
  "madad.next": "آگے",
  "madad.back": "پیچھے",
  "madad.skip": "چھوڑیں",
  "madad.makePlan": "میرا منصوبہ بنائیں",
  "madad.savedHere": "آپ کے جواب اسی فون میں رکھے جا رہے ہیں۔",
  "madad.resume": "ایک ادھورا معاملہ کھلا ہے",
  "madad.startOver": "نیا معاملہ شروع کریں",

  "madad.q1": "آپ نے کب بھیجے؟",
  "madad.when.now": "ابھی ابھی، یا ایک گھنٹے کے اندر",
  "madad.when.today": "آج",
  "madad.when.week": "پچھلے 7 دنوں میں",
  "madad.when.older": "اس سے بھی پرانا",

  "madad.q2": "آپ نے کیسے بھیجے؟",
  "madad.q2Hint": "ایک سے زیادہ چن سکتے ہیں۔",
  "madad.how.upi": "UPI",
  "madad.how.bank": "بینک ٹرانسفر (NEFT, IMPS)",
  "madad.how.card": "کارڈ",
  "madad.how.crypto": "کرپٹو",
  "madad.how.cash": "نقد یا کچھ اور",

  "madad.q3": "کتنے؟",
  "madad.amountLabel": "رقم، روپوں میں",

  "madad.q4": "کس کو، اور کہاں؟",
  "madad.q4Hint": "UPI آئی ڈی، کھاتہ نمبر، ایپ یا ویب سائٹ، گروپ یا نمبر۔",
  "madad.q4Found": "ہمیں اس میں یہ ملا",
  "madad.txnLabel": "لین دین آئی ڈی یا UTR",

  "madad.q5": "آپ سے کیا وعدہ کیا گیا تھا؟",
  "madad.promised.sureProfit": "“پکا منافع”",
  "madad.promised.double": "“پیسہ دوگنا”",
  "madad.promised.ipo": "“IPO الاٹمنٹ”",
  "madad.promised.feeToWithdraw": "“نکالنے کے لیے فیس دیں”",
  "madad.promised.other": "کچھ اور",
  "madad.promisedNote": "اپنے الفاظ میں",

  "madad.q6": "آپ کے پاس کیا ثبوت ہے؟",
  "madad.proof.utr": "لین دین آئی ڈی یا UTR",
  "madad.proof.screenshots": "گفتگو کے اسکرین شاٹ",
  "madad.proof.handle": "نمبر یا ہینڈل",
  "madad.proof.app": "ایپ کا نام یا APK",
  "madad.proof.website": "ویب سائٹ کا لنک",
  "madad.proof.recording": "کال ریکارڈنگ",
  "madad.proof.statement": "بینک اسٹیٹمنٹ",

  "madad.script.title": "1930 پر یہ پڑھ کر سنائیں",
  "madad.script.body":
    "میرا نام {name} ہے، میں {place} سے بول رہا ہوں۔ آن لائن سرمایہ کاری کے نام پر میرے ساتھ دھوکہ ہوا ہے۔ میں نے {how} کے ذریعے {amount} روپے بھیجے۔ لین دین آئی ڈی {txn} ہے۔ پیسہ {toWhom} کو گیا۔",
  "madad.script.nameLabel": "آپ کا نام",
  "madad.script.placeLabel": "گاؤں یا شہر",

  /* ----------------------------------------------------------- plan ---- */
  "plan.title": "آپ کا منصوبہ",
  "plan.sub": "آپ ہی کے جوابوں سے بنا ہے۔ یہ اسی فون میں رہتا ہے۔",

  "plan.now.title": "ابھی، پہلے گھنٹے میں",
  "plan.now.call1930": "1930 پر فون کر کے اوپر والا متن پڑھ کر سنائیں۔",
  "plan.now.tellBank":
    "اپنی UPI ایپ یا بینک کی ہیلپ لائن کو بھی فوراً بتائیں۔",
  "plan.now.sendNothingMore":
    "مزید پیسے نہ بھیجیں۔ کسی “ریکوری ایجنٹ” کو فیس نہ دیں؛ وہ اکثر دوسرا دھوکہ ہوتا ہے۔",

  "plan.today.title": "آج کا دن ختم ہونے سے پہلے",
  "plan.today.portal":
    "cybercrime.gov.in پر پوری تفصیل بھریں۔ 1930 کی کال سے ملا رسید نمبر سنبھال کر رکھیں؛ عام طور پر یہ 24 گھنٹوں میں کرنے کو کہا جاتا ہے۔",
  "plan.today.keepEvidence": "گفتگو نہ مٹائیں۔ جیسی ہے ویسی رہنے دیں۔",
  "plan.today.screenshotsSafe":
    "اسکرین شاٹ کہیں اور نقل کر کے رکھیں، تاکہ فون سے گم نہ ہو جائیں۔",

  "plan.week.title": "اس ہفتے",
  "plan.week.firstTheFirm":
    "اگر ادارہ SEBI کے پاس رجسٹرڈ ہے، تو پہلے ادارے ہی سے شکایت کریں۔",
  "plan.week.scores":
    "پھر اسے SCORES پر ڈالیں۔ ادارے کے پاس جواب دینے کے لیے 21 دن ہیں، اس کے بعد دو درجوں کا جائزہ ہے۔",
  "plan.week.ifUnregistered":
    "اگر ادارہ رجسٹرڈ نہیں، تو SEBI کا شکایتی راستہ عموماً لاگو نہیں ہوتا۔ پولیس اور سائبر کرائم کا راستہ ہی درست ہے۔",
  "plan.week.card":
    "اگر کارڈ سے ادائیگی کی تھی، تو بینک سے چارج بیک کے بارے میں پوچھیں۔",
  "plan.week.uninstall":
    "وہ ایپ ہٹا دیں، بینکنگ پاس ورڈ اور پن بدلیں، اور بینک کو بتائیں۔",

  "plan.truth.title": "سچ، سیدھا",
  "plan.truth.mayNotComeBack": "پیسہ واپس نہ بھی آئے۔",
  "plan.truth.fasterHelps": "جلدی اطلاع دینے سے اسے روکنے کا امکان بڑھتا ہے۔",
  "plan.truth.recoveryFeeIsSecondScam":
    "جو آپ کا پیسہ واپس دلانے کے لیے فیس مانگے، وہ دوسرا دھوکہ ہے۔",
  "plan.truth.notYourShame":
    "یہ دھوکے بڑی احتیاط سے بنائے جاتے ہیں۔ ان میں پھنس جانا شرم کی بات نہیں۔",
  "plan.truth.teleManas":
    "اگر دل پر بوجھ لگے، تو ٹیلی-مانس 14416 پر بات کر سکتے ہیں۔",

  "plan.timeline": "کیا ہوا، ترتیب سے",
  "plan.timelineWhen": "کب",
  "plan.timelineWhat": "کیا ہوا",
  "plan.timelineAdd": "ایک سطر جوڑیں",
  "plan.timelineRemove": "ہٹائیں",

  "plan.drafts": "شکایت کے مسودے",
  "plan.portalFields": "سائبر کرائم پورٹل یہ پوچھے گا",
  "plan.scoresDraft": "SCORES کے لیے مسودہ",
  "plan.print": "چھاپیں یا PDF بنائیں",
  "plan.sendSelf": "واٹس ایپ پر خود کو بھیجیں",

  "plan.myCase": "میرا معاملہ",
  "plan.ackLabel": "1930 سے ملا رسید نمبر",
  "plan.done.called": "1930 پر فون کیا",
  "plan.done.portal": "پورٹل میں بھرا",
  "plan.done.bank": "بینک یا ایپ کو بتایا",
  "plan.done.firm": "ادارے سے شکایت کی",
  "plan.done.scores": "SCORES پر ڈالا",
  "plan.reminder": "21 دن کی تاریخ میرے کیلنڈر میں رکھیں",
  "plan.reminderTitle": "SCORES: 21 دن پورے ہو گئے",
  "plan.reminderNote":
    "اگر ادارے نے جواب نہیں دیا، تو SCORES پر اگلے درجے کا جائزہ مانگیں۔",
  "plan.empty": "پہلے مدد میں چھ سوالوں کے جواب دیں۔",

  /* ----------------------------------------------------------- step ---- */
  "step.high.1": "پیسے، OTP یا ایپ نہ دیں۔",
  "step.high.2": "اس نمبر یا گروپ کو بلاک کر کے شکایت کریں۔",
  "step.high.3": "کسی بھروسے والے کو دکھائیں۔",
  "step.multiple.1": "آج پیسے نہ بھیجیں۔ 24 گھنٹے انتظار کریں۔",
  "step.multiple.2": "رجسٹریشن خود SEBI کی سائٹ پر دیکھیں۔",
  "step.multiple.3": "کسی سے پوچھیں۔",
  "step.some.1": "جلدی میں پیسے نہ بھیجیں۔",
  "step.some.2": "رجسٹریشن خود SEBI کی سائٹ پر دیکھیں۔",
  "step.some.3": "کسی سے پوچھیں۔",
  "step.none.1": "اس کا مطلب یہ نہیں کہ یہ محفوظ ہے۔",
  "step.none.2": "پیسے بھیجنے سے پہلے UPI یا کھاتہ SEBI Check پر دیکھیں۔",
  "step.notEnough.1": "پورا پیغام چسپاں کریں، پھر کچھ کہا جا سکے گا۔",

  /* ---------------------------------------------------------- draft ---- */
  "draft.portal.category": "قسم: آن لائن سرمایہ کاری کے نام پر دھوکہ",
  "draft.portal.when": "کب ہوا",
  "draft.portal.amount": "کتنے بھیجے گئے",
  "draft.portal.how": "پیسہ کیسے گیا",
  "draft.portal.toWhom": "کہاں گیا: UPI آئی ڈی، کھاتہ، ایپ، ویب سائٹ",
  "draft.portal.txn": "لین دین آئی ڈی یا UTR",
  "draft.portal.contact": "آپ کا نام، پتہ اور موبائل نمبر",
  "draft.portal.evidence": "آپ کی ثبوت کی فائلیں",
  "draft.scores.noChronology": "(واقعات کی ترتیب ابھی بھری نہیں گئی)",
  "draft.scores.body": `بخدمت،
شکایات ازالہ سیل

موضوع: آن لائن سرمایہ کاری کے نام پر ہوئے دھوکے کی شکایت

1. شکایت کنندہ کی تفصیل: (نام، پتہ، موبائل، ای میل بھریں)
2. جس کے خلاف شکایت ہے: {toWhom}
3. شکایت کی نوعیت: {promised} کا وعدہ کر کے پیسہ لیا گیا۔
4. واقعات کی ترتیب:
{chronology}
5. رقم: روپے {amount}
6. لین دین آئی ڈی: {txn}
7. مطلوبہ داد رسی: بھیجی گئی رقم کی واپسی، اور ایک تحقیقات۔
8. منسلکہ دستاویزات: {evidence}

آپ کا مخلص،
(نام اور دستخط)`,
  "draft.copy": "مسودہ نقل کریں",
  "draft.copied": "نقل ہو گیا",

  /* ---------------------------------------------------------- check ---- */
  "check.speak": "بولیں",
  "check.paste": "چسپاں کریں",
  "check.photo": "تصویر",
  "check.counter": "{count} / {max}",
  "check.pasteDenied":
    "چسپاں کرنے کی اجازت نہیں ملی۔ خانے کو دبا کر رکھیں، پھر چسپاں کریں چنیں۔",
  "check.fromShare": "واٹس ایپ سے بھیجا گیا پیغام",
  "check.tooShort": "تھوڑا اور لکھیں، اتنے سے کچھ نہیں کہا جا سکتا۔",
  "check.tooLong": "پیغام بہت لمبا ہے، پہلے {max} حروف دیکھے جا رہے ہیں۔",
  "check.questionsTitle": "اگر چاہیں، تین چھوٹے سوال",
  "check.q1": "کیا انہوں نے ہی پہلے رابطہ کیا تھا؟",
  "check.q2": "کیا پیسے، OTP یا ایپ مانگی؟",
  "check.q3": "کیا آپ اس شخص کو جانتے ہیں؟",
  "check.samples": "نمونے",
  "check.samplesTitle": "نمونہ پیغامات",
  "check.samplesLine": "یہ سب فرضی ہیں، کوئی بھی کسی اصل شخص کا نہیں۔",
  "check.useSample": "یہ دیکھیں",
  "check.listening": "سن رہے ہیں",
  "check.speakIdle": "بولیں",
  "check.voiceUnavailable":
    "اس فون میں بولنے کی سہولت نہیں۔ پیغام چسپاں کریں۔",
  "check.voiceOffline": "بولنے کے لیے انٹرنیٹ چاہیے۔ پیغام چسپاں کریں۔",
  "check.voiceNothingHeard":
    "کچھ سنائی نہیں دیا۔ دوبارہ کوشش کریں، یا پیغام چسپاں کریں۔",
  "check.voiceDenied":
    "مائیکروفون بند ہے۔ براؤزر کی ترتیبات میں اجازت دیں، یا پیغام چسپاں کریں۔",
  "check.ocrOffline":
    "تصویر پڑھنے کے لیے پہلی بار انٹرنیٹ چاہیے۔ پیغام چسپاں کریں۔",
  "check.ocrReading": "تصویر پڑھی جا رہی ہے",
  "check.ocrStayed": "تصویر آپ کے فون سے باہر نہیں گئی",
  "check.ocrLowConfidence": "کچھ الفاظ غلط پڑھے گئے ہو سکتے ہیں، ایک بار دیکھ لیں۔",
  "check.ocrFailed":
    "تصویر صاف نہیں پڑھی گئی۔ پیغام چسپاں کریں یا دوبارہ تصویر لیں۔",

  /* ------------------------------------------------------- composer ---- */
  "composer.placeholder": "پیغام یہاں چسپاں کریں، یا نیچے بولیں",
  "composer.label": "جانچنے والا پیغام",
  "composer.speak": "بولیں",
  "composer.photo": "تصویر",
  "composer.primedVoice": "بولیں دبائیں اور پیغام پڑھ کر سنائیں۔",
  "composer.primedPhoto": "تصویر دبا کر اسکرین شاٹ چنیں۔",
  "composer.paste": "چسپاں کریں",
  "composer.clear": "مٹائیں",
  "composer.submit": "جانچیں",
  "composer.empty": "پہلے پیغام چسپاں کریں یا بولیں",
  "composer.privacy": "جانچ صرف اسی فون میں ہوتی ہے",
  "composer.photoPrivacy": "تصویر آپ کے فون سے باہر نہیں گئی",
  "composer.photoReading": "تصویر پڑھی جا رہی ہے… {pct}%",
  "composer.fromShare": "کسی اور ایپ سے بھیجا گیا پیغام",
  "composer.cleared": "جو آپ نے لکھا تھا وہ مٹا دیا۔",
};
