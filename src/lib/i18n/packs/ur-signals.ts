/* Urdu verdict copy. Machine-assisted, not yet read by a native speaker.
   Same keys and same order as en-signals.ts so the two can be diffed.
   Urdu renders right-to-left; the shell sets dir="rtl" for this pack. */
export const urSignals: Record<string, string> = {
  "signal.S01.title": "OTP، PIN یا پاس ورڈ مانگ رہا ہے",
  "signal.S01.why":
    "کوئی اصل کمپنی، بینک یا سرکاری افسر کبھی OTP، PIN، CVV یا پاس ورڈ نہیں مانگتا۔",
  "signal.S01.basis": "بنیاد: بینک اور ریگولیٹر کی تنبیہ",

  "signal.S02.title": "آپ کے فون کا قابو چاہتا ہے",
  "signal.S02.why":
    "اسکرین شیئر کرنا یا لنک سے ایپ ڈالنا کسی اجنبی کو آپ کی بینکنگ ایپ تک پہنچا دیتا ہے۔",
  "signal.S02.basis": "بنیاد: سائبر کرائم پورٹل کی تنبیہ",

  "signal.S03.title": "پیسے ملنے سے پہلے فیس مانگی جا رہی ہے",
  "signal.S03.why":
    "اپنا ہی پیسہ نکالنے کے لیے کبھی ٹیکس، فیس یا جمع نہیں لیا جاتا۔ یہ دوسرا فراڈ ہے۔",
  "signal.S03.basis": "بنیاد: SEBI سرمایہ کار تنبیہ",

  "signal.S04.title": "یقینی منافع کا وعدہ اور ساتھ پیسے بھرنے کا راستہ",
  "signal.S04.why":
    "ایک ہی پیغام میں گارنٹی اور ادائیگی یا گروپ کا لنک — دھوکے کی یہی سب سے عام شکل ہے۔",
  "signal.S04.basis": "بنیاد: SEBI سرمایہ کار تنبیہ",

  "signal.S05.title": "SEBI، ایکسچینج یا بینک کا نام استعمال کر رہا ہے",
  "signal.S05.why":
    "SEBI کسی گروپ یا ٹپ کو منظوری نہیں دیتی، اور آپ سے کبھی پیسے نہیں مانگتی۔",
  "signal.S05.basis": "بنیاد: SEBI کی اپنی سرکاری فہرست",

  "signal.S10.title": "یقینی منافع یا کوئی خطرہ ہی نہیں، یہ کہتا ہے",
  "signal.S10.why":
    "حصص بازار میں منافع کا وعدہ کوئی نہیں کر سکتا۔ وعدہ خود ہی تنبیہ ہے۔",
  "signal.S10.basis": "بنیاد: SEBI سرمایہ کار تنبیہ",

  "signal.S11.title": "ایسا منافع جو ہو ہی نہیں سکتا",
  "signal.S11.why":
    "روزانہ یا ہفتہ وار مقررہ فیصد، یا پیسہ دگنا ہونا — اصل سرمایہ کاری میں ایسا نہیں ہوتا۔",
  "signal.S11.basis": "بنیاد: SEBI سرمایہ کار تعلیمی مواد",

  "signal.S12.title": "ایک نجی گروپ میں کھینچ رہا ہے",
  "signal.S12.why":
    "بند گروپ کے اندر کیا کہا جاتا ہے، باہر کا کوئی نہیں دیکھ سکتا، اس لیے دباؤ ڈالنا آسان ہو جاتا ہے۔",
  "signal.S12.basis": "بنیاد: SEBI سرمایہ کار تنبیہ",

  "signal.S13.title": "اندر کی خبر ہونے کا دعویٰ کرتا ہے",
  "signal.S13.why":
    "ایسی خبر پر سودا کرنا غیر قانونی ہے، اور اکثر ایسی کوئی خبر ہوتی ہی نہیں۔",
  "signal.S13.basis": "بنیاد: SEBI انسائیڈر ٹریڈنگ قواعد",

  "signal.S14.title": "ذاتی UPI یا اکاؤنٹ میں پیسے مانگے جا رہے ہیں",
  "signal.S14.why":
    "رجسٹرڈ ادارہ اپنے ہی اکاؤنٹ میں پیسے لیتا ہے۔ آپ جانچ سکیں، اس لیے SEBI @valid UPI پتے دیتی ہے۔",
  "signal.S14.basis": "بنیاد: SEBI کا @valid UPI انتظام",

  "signal.S15.title": "رجسٹریشن نمبر میل نہیں کھاتا",
  "signal.S15.why":
    "نمبر کی ساخت غلط ہے، ہماری فہرست میں نہیں ہے، نام سے میل نہیں کھاتا، یا اس کام کے لیے غلط زمرے کا ہے۔",
  "signal.S15.basis": "بنیاد: SEBI کی ثالثوں کی فہرست",

  "signal.S16.title": "لنک میں کچھ گڑبڑ ہے",
  "signal.S16.why":
    "ملتا جلتا پتہ، خالی IP، چھوٹا کیا گیا لنک یا بالکل نیا ڈومین — سب چھپنے کے راستے ہیں۔",
  "signal.S16.basis": "بنیاد: سائبر کرائم پورٹل کی تنبیہ",

  "signal.S17.title": "کسی کو نہ بتانے کو کہتا ہے",
  "signal.S17.why":
    "دباؤ تبھی چلتا ہے جب آپ اکیلے ہوں۔ ایماندار کام کے پاس چھپانے کو کچھ نہیں ہوتا۔",
  "signal.S17.basis": "بنیاد: SEBI سرمایہ کار تعلیمی مواد",

  "signal.S20.title": "جلدی کروا رہا ہے",
  "signal.S20.why":
    "آپ سوچ نہ سکیں، اسی لیے کم نشستوں اور کم وقت کی بات کی جاتی ہے۔",
  "signal.S20.basis": "بنیاد: SEBI سرمایہ کار تعلیمی مواد",

  "signal.S21.title": "منافع کا ثبوت دکھاتا ہے",
  "signal.S21.why": "اسکرین شاٹ بنانا آسان ہے، اس لیے وہ ثبوت نہیں ہیں۔",
  "signal.S21.basis": "بنیاد: SEBI سرمایہ کار تعلیمی مواد",

  "signal.S22.title": "کسی بڑے نام کا سہارا لیتا ہے",
  "signal.S22.why":
    "مشہور نام بھروسہ ادھار لینے کے لیے لیا جاتا ہے۔ یہ جانچ کا بدل نہیں۔",
  "signal.S22.basis": "بنیاد: SEBI سرمایہ کار تعلیمی مواد",

  "signal.S23.title": "بغیر جانچے ذریعے سے ٹپ کی شکل میں مشورہ",
  "signal.S23.why":
    "صرف رجسٹرڈ ریسرچ اینالسٹ یا انویسٹمنٹ ایڈوائزر ہی خریدنے یا بیچنے کو کہہ سکتا ہے۔",
  "signal.S23.basis": "بنیاد: SEBI کی ثالثوں کی فہرست",

  "signal.S24.title": "تھوڑی رقم سے بڑی کمائی",
  "signal.S24.why":
    "تھوڑے سے شروع کرنا پہلا قدم ہے؛ رقم بعد میں بڑھائی جاتی ہے۔",
  "signal.S24.basis": "بنیاد: SEBI سرمایہ کار تعلیمی مواد",

  "signal.S25.title": "کرپٹو، بوٹ یا فاریکس سگنل",
  "signal.S25.why":
    "ان میں سے کئی بھارت میں ضابطے سے باہر ہیں، اس لیے شکایت کرنے کی جگہ ہی نہیں۔",
  "signal.S25.basis": "بنیاد: SEBI سرمایہ کار تنبیہ",

  "signal.S26.title": "قرض لے کر سرمایہ کاری کرنے کو کہتا ہے",
  "signal.S26.why":
    "قرض کا پیسہ ڈوبے تو نقصان دوہرا ہوتا ہے: پیسہ بھی گیا اور قرض بھی رہا۔",
  "signal.S26.basis": "بنیاد: SEBI سرمایہ کار تعلیمی مواد",

  "signal.S27.title": "عام موبائل نمبر سے سروس کال",
  "signal.S27.why":
    "رجسٹرڈ ادارے موجودہ گاہکوں کو 1600 سے شروع ہونے والے نمبروں سے ہی سروس کال کرتے ہیں۔ فروخت کی کالیں اس میں نہیں آتیں، اس لیے یہ ہلکا سا اشارہ ہی ہے۔",
  "signal.S27.basis": "بنیاد: 1600 نمبر سلسلے کا انتظام",

  "signal.S28.title": "منافع کی تقسیم یا پیشگی فیس",
  "signal.S28.why":
    "منافع میں حصہ دینے کا وعدہ اور پیشگی فیس لینا — دونوں مشورے کے قواعد کے خلاف ہیں۔",
  "signal.S28.basis": "بنیاد: SEBI انویسٹمنٹ ایڈوائزر قواعد",

  "positive.P01.title": "یہ UPI آئی ڈی ایک @valid پتہ ہے",
  "positive.P02.title": "رجسٹریشن ہماری فہرست میں ہے اور نام میل کھاتا ہے",
  "positive.P03.title": "یہ نمبر 1600 سلسلے کا ہے",
  "positive.P04.title": "یہ لنک سرکاری فہرست میں ہے",

  "verified.P01.title": "یہ UPI آئی ڈی ایک @valid پتہ ہے",
  "verified.P02.title": "رجسٹریشن ہماری فہرست میں ہے اور نام میل کھاتا ہے",
  "verified.P03.title": "یہ نمبر 1600 سلسلے کا ہے",
  "verified.P04.title": "یہ لنک سرکاری فہرست میں ہے",
  "verified.registrationIsNotPerformance":
    "رجسٹریشن کارکردگی یا منافع کی کوئی ضمانت نہیں دیتی۔",

  "unverifiable.sender": "یہ اصل میں کس نے بھیجا، ہم نہیں جان سکتے",
  "unverifiable.sender.how":
    "اپنے رابطوں میں نمبر تلاش کریں، یا ادارے کے سرکاری نمبر پر پوچھیں۔",
  "unverifiable.linksNotOpened":
    "ہم لنک کبھی نہیں کھولتے، اس لیے اندر کیا ہے، نہیں بتا سکتے",
  "unverifiable.linksNotOpened.how":
    "جانا ہی پڑے تو ادارے کا نام خود ٹائپ کر کے اس کی سرکاری سائٹ سے جائیں۔",
  "unverifiable.registrationNotInSnapshot":
    "رجسٹریشن نمبر ہماری فہرست میں نہیں ہے، اس کا مطلب یہ نہیں کہ وہ غلط ہے",
  "unverifiable.registrationNotInSnapshot.how":
    "SEBI کی سائٹ پر نمبر ڈال کر خود دیکھ لیں۔",
  "unverifiable.snapshotStale": "ہماری فہرست تیس دن سے زیادہ پرانی ہے",
  "unverifiable.snapshotStale.how": "موجودہ حالت SEBI کی سائٹ پر دیکھ لیں۔",
  "unverifiable.registrationCategory":
    "یہ نمبر کس قسم کی رجسٹریشن ہے، ہم نہیں کہہ سکتے",
  "unverifiable.registrationCategory.how":
    "نمبر SEBI کی سائٹ پر ڈالیں اور قسم وہیں خود پڑھ لیں۔",
  "unverifiable.domainAgeNeedsInternet":
    "ڈومین کتنا پرانا ہے، انٹرنیٹ کے بغیر جانچا نہیں جا سکتا",
  "unverifiable.domainAgeNeedsInternet.how": "آن لائن ہونے پر دوبارہ دیکھ لیجیے گا۔",
  "unverifiable.contextNotAsked": "تین چھوٹے سوالوں کے جواب نہیں دیے گئے",
  "unverifiable.contextNotAsked.how":
    "جانچ کے صفحے پر واپس جا کر تینوں کے جواب دیں۔",
  "unverifiable.voiceAndVideo": "ہم آواز یا ویڈیو کی جانچ نہیں کرتے",
  "unverifiable.voiceAndVideo.how":
    "ویڈیو میں چہرہ اور آواز دونوں نقلی بنائے جا سکتے ہیں؛ ان پر بھروسہ نہ کریں۔",

  "claim.status.AGAINST_RULES": "قواعد کے خلاف",
  "claim.status.CANNOT_BE_VERIFIED": "جانچا نہیں جا سکتا",
  "claim.status.CHECK_ELSEWHERE": "یہاں دیکھیں",
  "claim.status.NEEDS_CONTEXT": "مزید تفصیل درکار",

  "claim.C_GUARANTEE.claim": "یقینی منافع کا وعدہ",
  "claim.C_GUARANTEE.evidence":
    "منافع کا وعدہ کوئی نہیں کر سکتا، اس لیے اس کا کوئی ثبوت ہو ہی نہیں سکتا۔",
  "claim.C_GUARANTEE.where": "SEBI کا سرمایہ کار مواد",

  "claim.C_SEBI_APPROVED.claim": "SEBI کی منظوری کا دعویٰ",
  "claim.C_SEBI_APPROVED.evidence":
    "SEBI مشیروں کو رجسٹر کرتی ہے؛ کسی گروپ یا ٹپ کو منظوری نہیں دیتی۔",
  "claim.C_SEBI_APPROVED.where": "SEBI کی ثالثوں کی فہرست میں نمبر دیکھیں",

  "claim.C_INSIDER.claim": "اندر کی خبر کا دعویٰ",
  "claim.C_INSIDER.evidence": "ایسی خبر پر سودا کرنا غیر قانونی ہے۔",
  "claim.C_INSIDER.where": "SEBI کے انسائیڈر ٹریڈنگ قواعد",

  "claim.C_DOUBLE_MONEY.claim": "پیسہ دگنا کرنے کا دعویٰ",
  "claim.C_DOUBLE_MONEY.evidence": "بازار کا منافع بدلتا رہتا ہے اور نقصان بھی ہو سکتا ہے۔",
  "claim.C_DOUBLE_MONEY.where": "رجسٹرڈ مشیر سے اس کے ڈسکلوژر مانگیں",

  "claim.C_RETURN_FIGURE.claim": "مقررہ منافع کا ہندسہ",
  "claim.C_RETURN_FIGURE.evidence": "بازار کا منافع بدلتا رہتا ہے اور نقصان بھی ہو سکتا ہے۔",
  "claim.C_RETURN_FIGURE.where": "رجسٹرڈ مشیر سے اس کے ڈسکلوژر مانگیں",

  "claim.C_FAKE_PROOF.claim": "منافع کے اسکرین شاٹ",
  "claim.C_FAKE_PROOF.evidence": "اسکرین شاٹ نقلی بنانا آسان ہے، اس لیے وہ ثبوت نہیں۔",
  "claim.C_FAKE_PROOF.where": "اصل بروکر اسٹیٹمنٹ مانگیں",

  "claim.C_SMALL_CAPITAL.claim": "تھوڑی رقم سے بڑی کمائی",
  "claim.C_SMALL_CAPITAL.evidence": "تھوڑی رقم پر بھی بازار کا خطرہ اتنا ہی ہے۔",
  "claim.C_SMALL_CAPITAL.where": "SEBI کا سرمایہ کار مواد",

  "claim.C_URGENCY.claim": "جلدی کریں، یا چند ہی نشستیں",
  "claim.C_URGENCY.evidence": "جلدی فیصلہ کروانا ایک عام جال ہے۔",
  "claim.C_URGENCY.where": "ایک دن انتظار کر کے دوبارہ دیکھیں",

  "claim.C_SECRECY.claim": "کسی کو نہ بتانے کو کہا گیا",
  "claim.C_SECRECY.evidence": "ایماندار کام کے پاس چھپانے کو کچھ نہیں ہوتا۔",
  "claim.C_SECRECY.where": "گھر میں کسی کو دکھائیں",

  "claim.C_BORROWED.claim": "قرض لے کر سرمایہ کاری کرنے کو کہا گیا",
  "claim.C_BORROWED.evidence": "قرض کا پیسہ ڈوبے تو نقصان دوہرا ہوتا ہے۔",
  "claim.C_BORROWED.where": "SEBI کا سرمایہ کار مواد",

  "claim.C_CRYPTO_BOT.claim": "کرپٹو، بوٹ یا فاریکس کا دعویٰ",
  "claim.C_CRYPTO_BOT.evidence": "ان میں سے کئی ضابطے سے باہر ہیں۔",
  "claim.C_CRYPTO_BOT.where": "SEBI کا سرمایہ کار مواد",

  "claim.C_AUTHORITY_NAME.claim": "بڑے نام کا سہارا",
  "claim.C_AUTHORITY_NAME.evidence": "نام لینا اور رجسٹرڈ ہونا ایک بات نہیں۔",
  "claim.C_AUTHORITY_NAME.where": "SEBI کی ثالثوں کی فہرست",

  "claim.C_REGISTRATION.claim": "رجسٹریشن کا دعویٰ",
  "claim.C_REGISTRATION.evidence": "نمبر، نام اور زمرہ — تینوں میل کھانے چاہییں۔",
  "claim.C_REGISTRATION.where": "SEBI کی سائٹ پر نمبر ڈالیں",

  "claim.C_TIP.claim": "خریدنے یا بیچنے کا مشورہ",
  "claim.C_TIP.evidence":
    "مشورہ دینے کے لیے ریسرچ اینالسٹ یا انویسٹمنٹ ایڈوائزر رجسٹریشن درکار ہے۔",
  "claim.C_TIP.where": "SEBI کی ثالثوں کی فہرست",
};
