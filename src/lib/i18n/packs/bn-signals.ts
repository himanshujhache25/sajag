/* Bengali verdict copy. Machine-assisted, not yet read by a native speaker.
   Same keys and same order as en-signals.ts so the two can be diffed. */
export const bnSignals: Record<string, string> = {
  "signal.S01.title": "OTP, PIN বা পাসওয়ার্ড চাইছে",
  "signal.S01.why":
    "কোনও আসল কোম্পানি, ব্যাঙ্ক বা সরকারি লোক কখনও OTP, PIN, CVV বা পাসওয়ার্ড চায় না।",
  "signal.S01.basis": "ভিত্তি: ব্যাঙ্ক ও নিয়ন্ত্রকের সতর্কতা",

  "signal.S02.title": "আপনার ফোনের নিয়ন্ত্রণ চাইছে",
  "signal.S02.why":
    "স্ক্রিন শেয়ার করা বা লিঙ্ক থেকে অ্যাপ বসানো মানে একজন অচেনা লোক আপনার ব্যাঙ্কিং অ্যাপ পর্যন্ত পৌঁছে যাবে।",
  "signal.S02.basis": "ভিত্তি: সাইবার ক্রাইম পোর্টালের সতর্কতা",

  "signal.S03.title": "টাকা ছাড়ার আগে একটা ফি চাওয়া হচ্ছে",
  "signal.S03.why":
    "নিজের টাকা তুলতে কখনও কর, ফি বা জমা লাগে না। এটা দ্বিতীয় প্রতারণা।",
  "signal.S03.basis": "ভিত্তি: SEBI বিনিয়োগকারী সতর্কতা",

  "signal.S04.title": "নিশ্চিত লাভের প্রতিশ্রুতি, সঙ্গে টাকা দেওয়ার রাস্তা",
  "signal.S04.why":
    "একই বার্তায় গ্যারান্টি আর টাকা দেওয়ার বা গ্রুপের লিঙ্ক — এটাই সবচেয়ে চেনা প্রতারণার চেহারা।",
  "signal.S04.basis": "ভিত্তি: SEBI বিনিয়োগকারী সতর্কতা",

  "signal.S05.title": "SEBI, এক্সচেঞ্জ বা ব্যাঙ্কের নাম ধার করছে",
  "signal.S05.why":
    "SEBI কোনও গ্রুপ বা টিপস অনুমোদন করে না, আর আপনার কাছে কখনও টাকা চায় না।",
  "signal.S05.basis": "ভিত্তি: SEBI-র নিজস্ব সরকারি তালিকা",

  "signal.S10.title": "নিশ্চিত লাভ বা কোনও ঝুঁকি নেই বলছে",
  "signal.S10.why":
    "শেয়ার বাজারে রিটার্নের প্রতিশ্রুতি কেউ দিতে পারে না। প্রতিশ্রুতিটাই সতর্কবার্তা।",
  "signal.S10.basis": "ভিত্তি: SEBI বিনিয়োগকারী সতর্কতা",

  "signal.S11.title": "যে রিটার্ন হওয়াই সম্ভব নয়",
  "signal.S11.why":
    "দিনে বা সপ্তাহে বাঁধা শতাংশ, কিংবা টাকা দ্বিগুণ হওয়া — আসল বিনিয়োগে এসব হয় না।",
  "signal.S11.basis": "ভিত্তি: SEBI বিনিয়োগকারী শিক্ষামূলক উপকরণ",

  "signal.S12.title": "একটা প্রাইভেট গ্রুপে টেনে নিচ্ছে",
  "signal.S12.why":
    "বন্ধ গ্রুপের ভিতরে কে কী বলছে বাইরের কেউ দেখতে পায় না, তাই চাপ দেওয়া সহজ।",
  "signal.S12.basis": "ভিত্তি: SEBI বিনিয়োগকারী সতর্কতা",

  "signal.S13.title": "ভিতরের খবর আছে বলে দাবি করছে",
  "signal.S13.why":
    "এমন খবরের ভিত্তিতে লেনদেন বেআইনি, আর বেশিরভাগ সময় আদৌ কোনও খবরই থাকে না।",
  "signal.S13.basis": "ভিত্তি: SEBI ইনসাইডার ট্রেডিং নিয়ম",

  "signal.S14.title": "ব্যক্তিগত UPI বা অ্যাকাউন্টে টাকা চাওয়া হচ্ছে",
  "signal.S14.why":
    "নথিভুক্ত সংস্থা নিজের অ্যাকাউন্টেই টাকা নেয়। যাচাই করার জন্য SEBI @valid UPI হ্যান্ডেল দেয়।",
  "signal.S14.basis": "ভিত্তি: SEBI-র @valid UPI ব্যবস্থা",

  "signal.S15.title": "রেজিস্ট্রেশন নম্বর মিলছে না",
  "signal.S15.why":
    "নম্বরের গড়ন ভুল, আমাদের তালিকায় নেই, নামের সঙ্গে মিলছে না, কিংবা এই কাজের জন্য ভুল শ্রেণির।",
  "signal.S15.basis": "ভিত্তি: SEBI-র মধ্যস্থতাকারীদের তালিকা",

  "signal.S16.title": "লিঙ্কে কোথাও গণ্ডগোল আছে",
  "signal.S16.why":
    "প্রায় একইরকম দেখতে ঠিকানা, খালি IP, ছোট করা লিঙ্ক বা একদম নতুন ডোমেন — সবই লুকোনোর উপায়।",
  "signal.S16.basis": "ভিত্তি: সাইবার ক্রাইম পোর্টালের সতর্কতা",

  "signal.S17.title": "কাউকে বলতে বারণ করছে",
  "signal.S17.why":
    "আপনি একা থাকলেই চাপ কাজ করে। সৎ কাজের লুকোনোর কিছু থাকে না।",
  "signal.S17.basis": "ভিত্তি: SEBI বিনিয়োগকারী শিক্ষামূলক উপকরণ",

  "signal.S20.title": "তাড়া দিচ্ছে",
  "signal.S20.why":
    "আপনি যাতে ভাবতে না পারেন, তাই অল্প জায়গা আর কম সময়ের কথা বলা হয়।",
  "signal.S20.basis": "ভিত্তি: SEBI বিনিয়োগকারী শিক্ষামূলক উপকরণ",

  "signal.S21.title": "লাভের প্রমাণ দেখাচ্ছে",
  "signal.S21.why": "স্ক্রিনশট বানানো সহজ, তাই ওগুলো প্রমাণ নয়।",
  "signal.S21.basis": "ভিত্তি: SEBI বিনিয়োগকারী শিক্ষামূলক উপকরণ",

  "signal.S22.title": "বড় নামের আড়াল নিচ্ছে",
  "signal.S22.why":
    "বিখ্যাত নাম আনা হয় বিশ্বাস ধার করতে। সেটা যাচাইয়ের বিকল্প নয়।",
  "signal.S22.basis": "ভিত্তি: SEBI বিনিয়োগকারী শিক্ষামূলক উপকরণ",

  "signal.S23.title": "অযাচাই করা জায়গা থেকে টিপসের চেহারায় পরামর্শ",
  "signal.S23.why":
    "শুধু নথিভুক্ত রিসার্চ অ্যানালিস্ট বা ইনভেস্টমেন্ট অ্যাডভাইজারই কেনা-বেচার কথা বলতে পারেন।",
  "signal.S23.basis": "ভিত্তি: SEBI-র মধ্যস্থতাকারীদের তালিকা",

  "signal.S24.title": "অল্প টাকায় বড় রোজগার",
  "signal.S24.why":
    "অল্প দিয়ে শুরু করাটা প্রথম ধাপ; টাকার অঙ্ক পরে বাড়ানো হয়।",
  "signal.S24.basis": "ভিত্তি: SEBI বিনিয়োগকারী শিক্ষামূলক উপকরণ",

  "signal.S25.title": "ক্রিপ্টো, বট বা ফরেক্স সিগন্যাল",
  "signal.S25.why":
    "এর অনেকগুলোই ভারতে নিয়ন্ত্রণের বাইরে, তাই নালিশ জানানোর জায়গাই নেই।",
  "signal.S25.basis": "ভিত্তি: SEBI বিনিয়োগকারী সতর্কতা",

  "signal.S26.title": "ধার করে বিনিয়োগ করতে বলছে",
  "signal.S26.why":
    "ধার করা টাকা গেলে ক্ষতি দুদিক থেকে: টাকাও যায়, ঋণও থাকে।",
  "signal.S26.basis": "ভিত্তি: SEBI বিনিয়োগকারী শিক্ষামূলক উপকরণ",

  "signal.S27.title": "সাধারণ মোবাইল নম্বর থেকে সার্ভিস কল",
  "signal.S27.why":
    "নথিভুক্ত সংস্থা পুরোনো গ্রাহকদের 1600 দিয়ে শুরু হওয়া নম্বর থেকেই সার্ভিস কল করে। বিক্রির কল এর মধ্যে পড়ে না, তাই এটা হালকা ইঙ্গিত মাত্র।",
  "signal.S27.basis": "ভিত্তি: 1600 নম্বর সিরিজের ব্যবস্থা",

  "signal.S28.title": "লাভের ভাগ বা আগাম ফি",
  "signal.S28.why":
    "লাভের ভাগ দেওয়ার কথা বলা আর আগাম ফি নেওয়া — দুটোই পরামর্শের নিয়মের বিরুদ্ধে।",
  "signal.S28.basis": "ভিত্তি: SEBI ইনভেস্টমেন্ট অ্যাডভাইজার নিয়ম",

  "positive.P01.title": "এই UPI আইডিটি একটি @valid ঠিকানা",
  "positive.P02.title": "রেজিস্ট্রেশন আমাদের তালিকায় আছে এবং নাম মিলছে",
  "positive.P03.title": "নম্বরটি 1600 সিরিজের",
  "positive.P04.title": "লিঙ্কটি সরকারি তালিকায় আছে",

  "verified.P01.title": "এই UPI আইডিটি একটি @valid ঠিকানা",
  "verified.P02.title": "রেজিস্ট্রেশন আমাদের তালিকায় আছে এবং নাম মিলছে",
  "verified.P03.title": "নম্বরটি 1600 সিরিজের",
  "verified.P04.title": "লিঙ্কটি সরকারি তালিকায় আছে",
  "verified.registrationIsNotPerformance":
    "রেজিস্ট্রেশন কাজের ফল বা রিটার্নের কোনও নিশ্চয়তা দেয় না।",

  "unverifiable.sender": "আসলে কে এটা পাঠিয়েছে, তা আমরা জানতে পারি না",
  "unverifiable.sender.how":
    "নিজের কনট্যাক্টে নম্বরটা খুঁজুন, অথবা সংস্থার সরকারি নম্বরে ফোন করে জিজ্ঞেস করুন।",
  "unverifiable.linksNotOpened":
    "আমরা কখনও লিঙ্ক খুলি না, তাই ভিতরে কী আছে বলতে পারব না",
  "unverifiable.linksNotOpened.how":
    "যেতেই হলে সংস্থার নাম নিজে টাইপ করে তার সরকারি সাইট থেকে যান।",
  "unverifiable.registrationNotInSnapshot":
    "রেজিস্ট্রেশন নম্বরটি আমাদের তালিকায় নেই, তার মানে এই নয় যে এটা ভুল",
  "unverifiable.registrationNotInSnapshot.how":
    "SEBI-র সাইটে নম্বরটা দিয়ে নিজে দেখে নিন।",
  "unverifiable.snapshotStale": "আমাদের তালিকা তিরিশ দিনের বেশি পুরোনো",
  "unverifiable.snapshotStale.how": "এখনকার অবস্থা SEBI-র সাইটে দেখে নিন।",
  "unverifiable.registrationCategory":
    "এই নম্বরটি কোন ধরনের নথিভুক্তি, তা আমরা বলতে পারি না",
  "unverifiable.registrationCategory.how":
    "নম্বরটি SEBI-র সাইটে দিন আর শ্রেণিটি সেখানেই নিজে পড়ে নিন।",
  "unverifiable.domainAgeNeedsInternet":
    "ডোমেনটা কত পুরোনো, ইন্টারনেট ছাড়া তা যাচাই করা যায় না",
  "unverifiable.domainAgeNeedsInternet.how": "অনলাইনে এলে আবার দেখে নেবেন।",
  "unverifiable.contextNotAsked": "তিনটি ছোট প্রশ্নের উত্তর দেওয়া হয়নি",
  "unverifiable.contextNotAsked.how":
    "যাচাইয়ের পাতায় ফিরে গিয়ে তিনটিরই উত্তর দিন।",
  "unverifiable.voiceAndVideo": "আমরা গলার স্বর বা ভিডিও পরীক্ষা করি না",
  "unverifiable.voiceAndVideo.how":
    "ভিডিওতে মুখ আর গলা — দুটোই নকল করা যায়; ওগুলোকে বিশ্বাস করবেন না।",

  "claim.status.AGAINST_RULES": "নিয়মের বিরুদ্ধে",
  "claim.status.CANNOT_BE_VERIFIED": "যাচাই করা যাচ্ছে না",
  "claim.status.CHECK_ELSEWHERE": "এখানে দেখুন",
  "claim.status.NEEDS_CONTEXT": "আরও তথ্য দরকার",

  "claim.C_GUARANTEE.claim": "নিশ্চিত লাভের প্রতিশ্রুতি",
  "claim.C_GUARANTEE.evidence":
    "রিটার্নের প্রতিশ্রুতি কেউ দিতে পারে না, তাই এর কোনও প্রমাণ থাকতেই পারে না।",
  "claim.C_GUARANTEE.where": "SEBI-র বিনিয়োগকারী উপকরণ",

  "claim.C_SEBI_APPROVED.claim": "SEBI অনুমোদনের দাবি",
  "claim.C_SEBI_APPROVED.evidence":
    "SEBI উপদেষ্টাদের নথিভুক্ত করে; কোনও গ্রুপ বা টিপস অনুমোদন করে না।",
  "claim.C_SEBI_APPROVED.where": "SEBI-র মধ্যস্থতাকারীদের তালিকায় নম্বরটি দেখুন",

  "claim.C_INSIDER.claim": "ভিতরের খবরের দাবি",
  "claim.C_INSIDER.evidence": "এমন খবরের ভিত্তিতে লেনদেন বেআইনি।",
  "claim.C_INSIDER.where": "SEBI-র ইনসাইডার ট্রেডিং নিয়ম",

  "claim.C_DOUBLE_MONEY.claim": "টাকা দ্বিগুণ করার দাবি",
  "claim.C_DOUBLE_MONEY.evidence": "বাজারের রিটার্ন ওঠানামা করে, ঋণাত্মকও হতে পারে।",
  "claim.C_DOUBLE_MONEY.where": "নথিভুক্ত উপদেষ্টার কাছে তাঁর ডিসক্লোজার চান",

  "claim.C_RETURN_FIGURE.claim": "বাঁধা রিটার্নের অঙ্ক",
  "claim.C_RETURN_FIGURE.evidence": "বাজারের রিটার্ন ওঠানামা করে, ঋণাত্মকও হতে পারে।",
  "claim.C_RETURN_FIGURE.where": "নথিভুক্ত উপদেষ্টার কাছে তাঁর ডিসক্লোজার চান",

  "claim.C_FAKE_PROOF.claim": "লাভের স্ক্রিনশট",
  "claim.C_FAKE_PROOF.evidence": "স্ক্রিনশট নকল করা সহজ, তাই ওগুলো প্রমাণ নয়।",
  "claim.C_FAKE_PROOF.where": "আসল ব্রোকার স্টেটমেন্ট চান",

  "claim.C_SMALL_CAPITAL.claim": "অল্প টাকায় বড় রোজগার",
  "claim.C_SMALL_CAPITAL.evidence": "অল্প টাকাতেও বাজারের ঝুঁকি ঠিক একই।",
  "claim.C_SMALL_CAPITAL.where": "SEBI-র বিনিয়োগকারী উপকরণ",

  "claim.C_URGENCY.claim": "তাড়াতাড়ি করুন, বা অল্প জায়গা",
  "claim.C_URGENCY.evidence": "দ্রুত সিদ্ধান্ত নিতে বাধ্য করা একটা চেনা ফাঁদ।",
  "claim.C_URGENCY.where": "একটা দিন অপেক্ষা করে আবার দেখুন",

  "claim.C_SECRECY.claim": "কাউকে না বলতে বলা হয়েছে",
  "claim.C_SECRECY.evidence": "সৎ কাজের লুকোনোর কিছু থাকে না।",
  "claim.C_SECRECY.where": "বাড়ির কাউকে দেখান",

  "claim.C_BORROWED.claim": "ধার করে বিনিয়োগ করতে বলা হয়েছে",
  "claim.C_BORROWED.evidence": "ধার করা টাকা গেলে ক্ষতি দুদিক থেকে।",
  "claim.C_BORROWED.where": "SEBI-র বিনিয়োগকারী উপকরণ",

  "claim.C_CRYPTO_BOT.claim": "ক্রিপ্টো, বট বা ফরেক্সের দাবি",
  "claim.C_CRYPTO_BOT.evidence": "এর অনেকগুলোই নিয়ন্ত্রণের বাইরে।",
  "claim.C_CRYPTO_BOT.where": "SEBI-র বিনিয়োগকারী উপকরণ",

  "claim.C_AUTHORITY_NAME.claim": "বড় নামের আড়াল নেওয়া",
  "claim.C_AUTHORITY_NAME.evidence": "নাম বলা আর নথিভুক্ত হওয়া এক কথা নয়।",
  "claim.C_AUTHORITY_NAME.where": "SEBI-র মধ্যস্থতাকারীদের তালিকা",

  "claim.C_REGISTRATION.claim": "রেজিস্ট্রেশনের দাবি",
  "claim.C_REGISTRATION.evidence": "নম্বর, নাম আর শ্রেণি — তিনটিই মিলতে হবে।",
  "claim.C_REGISTRATION.where": "SEBI-র সাইটে নম্বরটি দিন",

  "claim.C_TIP.claim": "কেনা বা বেচার পরামর্শ",
  "claim.C_TIP.evidence":
    "পরামর্শ দিতে হলে রিসার্চ অ্যানালিস্ট বা ইনভেস্টমেন্ট অ্যাডভাইজার রেজিস্ট্রেশন লাগে।",
  "claim.C_TIP.where": "SEBI-র মধ্যস্থতাকারীদের তালিকা",
};
