import type { Lexicon } from "./concepts";

/* Bengali, the eight concepts every language pack must cover. Not yet
   reviewed by a second speaker, so the UI marks this pack "(beta)". */
export const bn: Lexicon = {
  lang: "bn",
  needsReview: true,
  patterns: {
    GUARANTEE: [
      "গ্যারান্টি",
      "গ্যারান্টি সহ",
      "নিশ্চিত লাভ",
      "নিশ্চিত মুনাফা",
      "পাকা লাভ",
      "কোনো ঝুঁকি নেই",
      "ঝুঁকি নেই",
      "ক্ষতি হবে না",
      "রিস্ক ফ্রি",
    ],
    URGENCY: [
      "তাড়াতাড়ি করুন",
      "আজই",
      "আজই যোগ দিন",
      "সীমিত আসন",
      "শেষ সুযোগ",
      "অফার শেষ",
      "দেরি করবেন না",
    ],
    VIP_GROUP: [
      "ভিআইপি গ্রুপ",
      "প্রিমিয়াম গ্রুপ",
      "গ্রুপে যোগ দিন",
      "ব্যক্তিগত গ্রুপ",
      "চ্যানেলে যোগ দিন",
    ],
    INSIDER: [
      "ভেতরের খবর",
      "ভেতরের তথ্য",
      "গোপন তথ্য",
      "অপারেটরের কল",
    ],
    DOUBLE_MONEY: [
      "দ্বিগুণ",
      "টাকা দ্বিগুণ",
      "ডাবল",
      "তিনগুণ",
    ],
    OTP: [
      "ওটিপি",
      "ওটিপি বলুন",
      "ওটিপি পাঠান",
      "পিন বলুন",
      "পাসওয়ার্ড বলুন",
      "কোড পাঠান",
    ],
    FEE_TO_WITHDRAW: [
      "টাকা তোলার জন্য",
      "কর দিন",
      "ট্যাক্স দিন",
      "প্রসেসিং ফি",
      "রিলিজ চার্জ",
      "অ্যাকাউন্ট হোল্ড",
      "টাকা ফেরত দেব",
    ],
    REMOTE_ACCESS: [
      "এনিডেস্ক",
      "টিমভিউয়ার",
      "স্ক্রিন শেয়ার",
      "স্ক্রিন দেখান",
      "এপিকে",
      "অ্যাপ ইনস্টল করুন",
    ],
    /* Isolation is how the pressure survives: a person who is told to keep
       it to themselves has nobody to ask. The pack carried every other core
       concept but this one. */
    SECRECY: [
      "কাউকে বলবেন না",
      "গোপন রাখুন",
      "বাড়িতে বলবেন না",
      "শুধু আপনার জন্য",
    ],
  },
};
