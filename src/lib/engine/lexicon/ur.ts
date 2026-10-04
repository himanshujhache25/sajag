import type { Lexicon } from "./concepts";

/* Urdu, the eight concepts every language pack must cover.

   Written because a probe found the gap: an Urdu message meaning
   "guaranteed profit! join now and send 5000 rupees" came back as NOTHING
   STRONG FOUND, while the same sentence in Tamil was flagged. The picker
   offered Urdu and the engine was blind in it, which is worse than not
   offering it at all.

   Urdu is written right to left, but the matcher works on code points and
   never on visual order, so nothing here needs to care about direction.
   Both the Perso-Arabic spellings and the Latin ones people actually type
   on a phone keyboard are listed, because a scam forwarded into WhatsApp
   arrives in whichever the sender had to hand.

   Not yet reviewed by a second speaker, so the UI marks this pack "(beta)". */
export const ur: Lexicon = {
  lang: "ur",
  needsReview: true,
  patterns: {
    GUARANTEE: [
      "گارنٹی",
      "یقینی منافع",
      "پکا منافع",
      "ضمانت شدہ",
      "کوئی خطرہ نہیں",
      "نقصان نہیں ہوگا",
      "رسک نہیں",
      "سو فیصد منافع",
    ],
    URGENCY: [
      "ابھی",
      "فوراً",
      "آج ہی",
      "آخری موقع",
      "جلدی کریں",
      "کم سیٹیں",
      "چند سیٹیں",
      "آفر ختم",
      "دیر نہ کریں",
    ],
    VIP_GROUP: [
      "وی آئی پی گروپ",
      "پریمیم گروپ",
      "گروپ میں شامل",
      "نجی گروپ",
      "خاص گروپ",
      "چینل میں شامل",
    ],
    INSIDER: [
      "اندر کی خبر",
      "خفیہ اطلاع",
      "خفیہ خبر",
      "آپریٹر کال",
      "پکی خبر",
    ],
    DOUBLE_MONEY: [
      "دگنا",
      "پیسہ دگنا",
      "رقم دگنی",
      "ڈبل",
      "تین گنا",
    ],
    OTP: [
      "او ٹی پی",
      "اوٹی پی بتائیں",
      "او ٹی پی بھیجیں",
      "پن بتائیں",
      "پاس ورڈ بتائیں",
      "کوڈ بھیجیں",
      "کوڈ بتائیں",
    ],
    FEE_TO_WITHDRAW: [
      "نکالنے کے لیے",
      "ٹیکس جمع کریں",
      "ٹیکس بھریں",
      "پروسیسنگ فیس",
      "ریلیز فیس",
      "اکاؤنٹ ہولڈ",
      "رقم واپس دلوائیں گے",
      "فیس ادا کریں",
    ],
    SECRECY: [
      "کسی کو نہ بتائیں",
      "راز میں رکھیں",
      "خفیہ رکھیں",
      "گھر میں نہ بتائیں",
      "صرف آپ کے لیے",
    ],
    /* The product names stay in Latin letters even in an Urdu message, so
       the English lexicon catches those; these are the words around them. */
    REMOTE_ACCESS: [
      "اینی ڈیسک",
      "ٹیم ویور",
      "اسکرین شیئر",
      "اسکرین دکھائیں",
      "اے پی کے",
      "ایپ انسٹال کریں",
    ],
  },
};
