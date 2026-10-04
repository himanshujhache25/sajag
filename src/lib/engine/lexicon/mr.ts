import type { Lexicon } from "./concepts";

/* Marathi, the eight concepts every language pack must cover. Written by a
   speaker on the team and not yet reviewed by a second person, so the UI
   marks this pack "(beta)". See section 5.3 of docs/SPEC.md. */
export const mr: Lexicon = {
  lang: "mr",
  needsReview: true,
  patterns: {
    GUARANTEE: [
      "हमी",
      "हमखास नफा",
      "खात्रीशीर नफा",
      "खात्रीचा नफा",
      "पक्का नफा",
      "कोणताही धोका नाही",
      "धोका नाही",
      "नुकसान होणार नाही",
      "रिस्क फ्री",
    ],
    URGENCY: [
      "लवकर करा",
      "आजच",
      "आजच सामील व्हा",
      "मर्यादित जागा",
      "शेवटची संधी",
      "ऑफर संपत आहे",
      "उशीर करू नका",
    ],
    VIP_GROUP: [
      "व्हीआयपी ग्रुप",
      "प्रीमियम ग्रुप",
      "ग्रुपमध्ये सामील",
      "खाजगी ग्रुप",
      "चॅनेल जॉईन",
    ],
    INSIDER: [
      "आतली बातमी",
      "आतली माहिती",
      "गुप्त माहिती",
      "ऑपरेटरची कॉल",
      "वरून बातमी",
    ],
    DOUBLE_MONEY: [
      "दुप्पट",
      "पैसे दुप्पट",
      "डबल",
      "तिप्पट",
    ],
    OTP: [
      "ओटीपी",
      "ओटीपी सांगा",
      "ओटीपी पाठवा",
      "पिन सांगा",
      "पासवर्ड सांगा",
      "कोड पाठवा",
    ],
    FEE_TO_WITHDRAW: [
      "पैसे काढण्यासाठी",
      "कर भरा",
      "टॅक्स भरा",
      "प्रोसेसिंग फी",
      "रिलीज चार्ज",
      "खाते होल्ड",
      "पैसे परत मिळवून देऊ",
    ],
    REMOTE_ACCESS: [
      "एनीडेस्क",
      "टीमव्ह्यूअर",
      "स्क्रीन शेअर",
      "स्क्रीन दाखवा",
      "एपीके",
      "अ‍ॅप इन्स्टॉल करा",
    ],
    /* Isolation is how the pressure survives: a person who is told to keep
       it to themselves has nobody to ask. The pack carried every other core
       concept but this one. */
    SECRECY: [
      "कोणालाही सांगू नका",
      "गुप्त ठेवा",
      "घरी सांगू नका",
      "फक्त तुमच्यासाठी",
    ],
  },
};
