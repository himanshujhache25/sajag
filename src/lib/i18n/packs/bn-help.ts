/* Bengali: Madad (the first hour), the plan, the verdict steps, the complaint
   drafts and the Check screen. Machine-assisted, not yet read by a native
   speaker — the pack stays `needsReview`, so the picker shows "(বিটা)".

   Same keys and same order as the English source so the two can be diffed.
   Placeholders ({n}, {amount}, {txn} …) are copied exactly; a translated
   placeholder silently prints itself instead of the value. */
export const bnHelp: Record<string, string> = {
  /* ---------------------------------------------------------- madad ---- */
  "madad.title": "টাকা চলে গেছে? আগে একটু শ্বাস নিন।",
  "madad.sub": "আপনি একা নন। প্রথম এক ঘণ্টাই সবচেয়ে জরুরি।",
  "madad.call1930": "১৯৩০-এ ফোন করুন",
  "madad.call1930Line":
    "যত তাড়াতাড়ি জানাবেন, টাকা আটকানোর সম্ভাবনা তত বেশি। কেউ কথা দিতে পারে না।",
  "madad.stepOf": "{n} / {total}",
  "madad.next": "পরের",
  "madad.back": "পিছনে",
  "madad.skip": "এড়িয়ে যান",
  "madad.makePlan": "আমার পরিকল্পনা তৈরি করুন",
  "madad.savedHere": "আপনার উত্তরগুলি এই ফোনেই রাখা হচ্ছে।",
  "madad.resume": "একটি অসমাপ্ত কেস খোলা আছে",
  "madad.startOver": "নতুন কেস শুরু করুন",

  "madad.q1": "কখন পাঠিয়েছিলেন?",
  "madad.when.now": "এইমাত্র, বা এক ঘণ্টার মধ্যে",
  "madad.when.today": "আজ",
  "madad.when.week": "গত ৭ দিনে",
  "madad.when.older": "তারও আগে",

  "madad.q2": "কীভাবে পাঠিয়েছিলেন?",
  "madad.q2Hint": "একের বেশি বেছে নিতে পারেন।",
  "madad.how.upi": "UPI",
  "madad.how.bank": "ব্যাঙ্ক ট্রান্সফার (NEFT, IMPS)",
  "madad.how.card": "কার্ড",
  "madad.how.crypto": "ক্রিপ্টো",
  "madad.how.cash": "নগদ বা অন্য কিছু",

  "madad.q3": "কত টাকা?",
  "madad.amountLabel": "টাকার পরিমাণ",

  "madad.q4": "কাকে, আর কোথায়?",
  "madad.q4Hint": "UPI আইডি, অ্যাকাউন্ট নম্বর, অ্যাপ বা ওয়েবসাইট, গ্রুপ বা নম্বর।",
  "madad.q4Found": "এর মধ্যে আমরা এটি পেয়েছি",
  "madad.txnLabel": "লেনদেন আইডি বা UTR",

  "madad.q5": "আপনাকে কী কথা দেওয়া হয়েছিল?",
  "madad.promised.sureProfit": "“নিশ্চিত লাভ”",
  "madad.promised.double": "“টাকা দ্বিগুণ”",
  "madad.promised.ipo": "“IPO বরাদ্দ”",
  "madad.promised.feeToWithdraw": "“তুলতে হলে ফি দিন”",
  "madad.promised.other": "অন্য কিছু",
  "madad.promisedNote": "আপনার নিজের ভাষায়",

  "madad.q6": "আপনার কাছে কী প্রমাণ আছে?",
  "madad.proof.utr": "লেনদেন আইডি বা UTR",
  "madad.proof.screenshots": "চ্যাটের স্ক্রিনশট",
  "madad.proof.handle": "নম্বর বা হ্যান্ডেল",
  "madad.proof.app": "অ্যাপের নাম বা APK",
  "madad.proof.website": "ওয়েবসাইটের লিঙ্ক",
  "madad.proof.recording": "কল রেকর্ডিং",
  "madad.proof.statement": "ব্যাঙ্ক স্টেটমেন্ট",

  "madad.script.title": "১৯৩০-এ এটি পড়ে শোনান",
  "madad.script.body":
    "আমার নাম {name}, আমি {place} থেকে বলছি। অনলাইন বিনিয়োগের নামে আমার সঙ্গে প্রতারণা হয়েছে। আমি {how} মারফত {amount} টাকা পাঠিয়েছি। লেনদেন আইডি {txn}। টাকা গেছে {toWhom}-এ।",
  "madad.script.nameLabel": "আপনার নাম",
  "madad.script.placeLabel": "শহর বা গ্রাম",

  /* ----------------------------------------------------------- plan ---- */
  "plan.title": "আপনার পরিকল্পনা",
  "plan.sub": "আপনার নিজের উত্তর থেকেই তৈরি। এটি এই ফোনেই থাকে।",

  "plan.now.title": "এখনই, প্রথম এক ঘণ্টায়",
  "plan.now.call1930": "১৯৩০-এ ফোন করে উপরের লেখাটি পড়ে শোনান।",
  "plan.now.tellBank":
    "আপনার UPI অ্যাপ বা ব্যাঙ্কের হেল্পলাইনেও সঙ্গে সঙ্গে জানান।",
  "plan.now.sendNothingMore":
    "আর টাকা পাঠাবেন না। কোনও “রিকভারি এজেন্ট”-কে ফি দেবেন না; ওটা প্রায়ই দ্বিতীয় প্রতারণা।",

  "plan.today.title": "আজ শেষ হওয়ার আগে",
  "plan.today.portal":
    "cybercrime.gov.in-এ পুরো বিবরণ ভরুন। ১৯৩০-এর ফোন থেকে পাওয়া স্বীকৃতি নম্বরটি রাখুন; সাধারণত ২৪ ঘণ্টার মধ্যে এটি করতে বলা হয়।",
  "plan.today.keepEvidence": "চ্যাট মুছবেন না। যেমন আছে তেমনই থাকতে দিন।",
  "plan.today.screenshotsSafe":
    "স্ক্রিনশটগুলি অন্য কোথাও কপি করে রাখুন, যাতে ফোন থেকে হারিয়ে না যায়।",

  "plan.week.title": "এই সপ্তাহে",
  "plan.week.firstTheFirm":
    "সংস্থাটি SEBI-তে নথিভুক্ত হলে, প্রথমে সংস্থাটিকেই অভিযোগ জানান।",
  "plan.week.scores":
    "তারপর SCORES-এ দিন। সংস্থার উত্তর দেওয়ার জন্য ২১ দিন আছে, তারপর দুই স্তরের পর্যালোচনা আছে।",
  "plan.week.ifUnregistered":
    "সংস্থাটি নথিভুক্ত না হলে, SEBI-র অভিযোগের পথ সাধারণত খাটে না। পুলিশ ও সাইবার ক্রাইমের পথই তখন ঠিক।",
  "plan.week.card":
    "কার্ডে টাকা দিয়ে থাকলে, ব্যাঙ্ককে চার্জব্যাকের কথা জিজ্ঞাসা করুন।",
  "plan.week.uninstall":
    "ওই অ্যাপটি আনইনস্টল করুন, ব্যাঙ্কিং পাসওয়ার্ড ও পিন বদলান, আর ব্যাঙ্ককে জানান।",

  "plan.truth.title": "সত্যিটা সোজাসুজি",
  "plan.truth.mayNotComeBack": "টাকা ফেরত নাও আসতে পারে।",
  "plan.truth.fasterHelps": "তাড়াতাড়ি জানালে তা আটকানোর সম্ভাবনা বাড়ে।",
  "plan.truth.recoveryFeeIsSecondScam":
    "যে আপনার টাকা ফিরিয়ে দেওয়ার জন্য ফি চায়, সে দ্বিতীয় প্রতারণা।",
  "plan.truth.notYourShame":
    "এই প্রতারণাগুলি অত্যন্ত যত্ন করে বানানো। এতে ঠকে যাওয়া লজ্জার কিছু নয়।",
  "plan.truth.teleManas":
    "মনের উপর চাপ পড়লে, টেলি-মানস ১৪৪১৬-এ কথা বলতে পারেন।",

  "plan.timeline": "যা ঘটেছে, পরপর",
  "plan.timelineWhen": "কখন",
  "plan.timelineWhat": "কী ঘটেছিল",
  "plan.timelineAdd": "একটি লাইন যোগ করুন",
  "plan.timelineRemove": "সরান",

  "plan.drafts": "অভিযোগের খসড়া",
  "plan.portalFields": "সাইবার ক্রাইম পোর্টাল এগুলি জানতে চাইবে",
  "plan.scoresDraft": "SCORES-এর জন্য খসড়া",
  "plan.print": "প্রিন্ট করুন বা PDF বানান",
  "plan.sendSelf": "হোয়াটসঅ্যাপে নিজেকে পাঠান",

  "plan.myCase": "আমার কেস",
  "plan.ackLabel": "১৯৩০ থেকে পাওয়া স্বীকৃতি নম্বর",
  "plan.done.called": "১৯৩০-এ ফোন করা হয়েছে",
  "plan.done.portal": "পোর্টালে ভরা হয়েছে",
  "plan.done.bank": "ব্যাঙ্ক বা অ্যাপকে জানানো হয়েছে",
  "plan.done.firm": "সংস্থাকে অভিযোগ জানানো হয়েছে",
  "plan.done.scores": "SCORES-এ দেওয়া হয়েছে",
  "plan.reminder": "২১ দিনের তারিখটি আমার ক্যালেন্ডারে রাখুন",
  "plan.reminderTitle": "SCORES: ২১ দিন পূর্ণ হয়েছে",
  "plan.reminderNote":
    "সংস্থা উত্তর না দিলে, SCORES-এ পরের স্তরের পর্যালোচনা চান।",
  "plan.empty": "আগে মদদ-এ ছয়টি প্রশ্নের উত্তর দিন।",

  /* ----------------------------------------------------------- step ---- */
  "step.high.1": "টাকা, OTP বা অ্যাপ দেবেন না।",
  "step.high.2": "এই নম্বর বা গ্রুপ ব্লক করে রিপোর্ট করুন।",
  "step.high.3": "বিশ্বাসযোগ্য কাউকে দেখান।",
  "step.multiple.1": "আজ টাকা পাঠাবেন না। ২৪ ঘণ্টা অপেক্ষা করুন।",
  "step.multiple.2": "SEBI-র সাইটে নিজে নথিভুক্তি যাচাই করুন।",
  "step.multiple.3": "কাউকে জিজ্ঞাসা করুন।",
  "step.some.1": "তাড়াহুড়ো করে টাকা পাঠাবেন না।",
  "step.some.2": "SEBI-র সাইটে নিজে নথিভুক্তি যাচাই করুন।",
  "step.some.3": "কাউকে জিজ্ঞাসা করুন।",
  "step.none.1": "এর মানে এই নয় যে এটি নিরাপদ।",
  "step.none.2": "টাকা পাঠানোর আগে UPI বা অ্যাকাউন্ট SEBI Check-এ দেখে নিন।",
  "step.notEnough.1": "পুরো বার্তাটি পেস্ট করুন, তবেই কিছু বলা যাবে।",

  /* ---------------------------------------------------------- draft ---- */
  "draft.portal.category": "শ্রেণি: অনলাইন বিনিয়োগের নামে প্রতারণা",
  "draft.portal.when": "কখন ঘটেছিল",
  "draft.portal.amount": "কত টাকা পাঠানো হয়েছিল",
  "draft.portal.how": "টাকা কীভাবে গেল",
  "draft.portal.toWhom": "কোথায় গেল: UPI আইডি, অ্যাকাউন্ট, অ্যাপ, ওয়েবসাইট",
  "draft.portal.txn": "লেনদেন আইডি বা UTR",
  "draft.portal.contact": "আপনার নাম, ঠিকানা ও মোবাইল নম্বর",
  "draft.portal.evidence": "আপনার প্রমাণের ফাইল",
  "draft.scores.noChronology": "(ঘটনার ক্রম এখনও ভরা হয়নি)",
  "draft.scores.body": `প্রতি,
অভিযোগ নিষ্পত্তি সেল

বিষয়: অনলাইন বিনিয়োগের নামে প্রতারণা সংক্রান্ত অভিযোগ

১. অভিযোগকারীর বিবরণ: (নাম, ঠিকানা, মোবাইল, ইমেল ভরুন)
২. যে সংস্থার বিরুদ্ধে অভিযোগ: {toWhom}
৩. অভিযোগের প্রকৃতি: {promised} প্রতিশ্রুতি দিয়ে টাকা নেওয়া হয়েছে।
৪. ঘটনাক্রম:
{chronology}
৫. পরিমাণ: টাকা {amount}
৬. লেনদেন আইডি: {txn}
৭. প্রার্থিত প্রতিকার: পাঠানো টাকা ফেরত, এবং একটি তদন্ত।
৮. সংযুক্ত নথি: {evidence}

আপনার বিশ্বস্ত,
(নাম ও স্বাক্ষর)`,
  "draft.copy": "খসড়া কপি করুন",
  "draft.copied": "কপি হয়েছে",

  /* ---------------------------------------------------------- check ---- */
  "check.speak": "বলুন",
  "check.paste": "পেস্ট",
  "check.photo": "ছবি",
  "check.counter": "{count} / {max}",
  "check.pasteDenied":
    "পেস্ট করার অনুমতি পাওয়া যায়নি। বাক্সটি চেপে ধরে রাখুন, তারপর পেস্ট বেছে নিন।",
  "check.fromShare": "হোয়াটসঅ্যাপ থেকে পাঠানো বার্তা",
  "check.tooShort": "আর একটু লিখুন, এতে কিছু বলা যাচ্ছে না।",
  "check.tooLong": "বার্তাটি খুব লম্বা, প্রথম {max} অক্ষর দেখা হচ্ছে।",
  "check.questionsTitle": "ইচ্ছে হলে, তিনটি ছোট প্রশ্ন",
  "check.q1": "ওরাই কি আগে যোগাযোগ করেছিল?",
  "check.q2": "টাকা, OTP বা অ্যাপ চেয়েছিল?",
  "check.q3": "এই লোককে আপনি চেনেন?",
  "check.samples": "নমুনা",
  "check.samplesTitle": "নমুনা বার্তা",
  "check.samplesLine": "সবগুলিই বানানো, কোনওটিই সত্যিকারের কারও নয়।",
  "check.useSample": "এটি দেখুন",
  "check.listening": "শুনছি",
  "check.speakIdle": "বলুন",
  "check.voiceUnavailable": "এই ফোনে বলার সুবিধা নেই। বার্তাটি পেস্ট করুন।",
  "check.voiceOffline": "বলার জন্য ইন্টারনেট লাগে। বার্তাটি পেস্ট করুন।",
  "check.voiceNothingHeard":
    "কিছু শোনা যায়নি। আবার চেষ্টা করুন, বা বার্তাটি পেস্ট করুন।",
  "check.voiceDenied":
    "মাইক্রোফোন বন্ধ আছে। ব্রাউজারের সেটিংসে অনুমতি দিন, বা বার্তাটি পেস্ট করুন।",
  "check.ocrOffline":
    "ছবি পড়তে প্রথমবার ইন্টারনেট লাগে। বার্তাটি পেস্ট করুন।",
  "check.ocrReading": "ছবিটি পড়া হচ্ছে",
  "check.ocrStayed": "ছবিটি আপনার ফোন ছেড়ে যায়নি",
  "check.ocrLowConfidence": "কিছু শব্দ ভুল পড়া হয়ে থাকতে পারে, একবার দেখে নিন।",
  "check.ocrFailed":
    "ছবিটি স্পষ্ট পড়া গেল না। বার্তাটি পেস্ট করুন বা আবার তুলুন।",

  /* ------------------------------------------------------- composer ---- */
  "composer.placeholder": "বার্তাটি এখানে পেস্ট করুন, বা নীচে বলুন",
  "composer.label": "যে বার্তাটি দেখতে হবে",
  "composer.speak": "বলুন",
  "composer.photo": "ছবি",
  "composer.primedVoice": "বলুন-এ চাপ দিন আর বার্তাটি পড়ে শোনান।",
  "composer.primedPhoto": "ছবি-তে চাপ দিয়ে স্ক্রিনশটটি বেছে নিন।",
  "composer.paste": "পেস্ট",
  "composer.clear": "মুছুন",
  "composer.submit": "দেখুন",
  "composer.empty": "আগে বার্তাটি পেস্ট করুন বা বলুন",
  "composer.privacy": "যাচাই শুধু এই ফোনেই হয়",
  "composer.photoPrivacy": "ছবিটি আপনার ফোন ছেড়ে যায়নি",
  "composer.photoReading": "ছবিটি পড়া হচ্ছে… {pct}%",
  "composer.fromShare": "অন্য অ্যাপ থেকে পাঠানো বার্তা",
  "composer.cleared": "আপনি যা লিখেছিলেন তা মুছে দেওয়া হয়েছে।",
};
