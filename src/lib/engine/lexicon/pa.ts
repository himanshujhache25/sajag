import type { Lexicon } from "./concepts";

/* Punjabi (Gurmukhi), the eight concepts every language pack must cover.
   Written to close a gap found by probing: the picker offered Punjabi while
   the engine had no Punjabi words at all, so a scam in Gurmukhi scored
   nothing. Not yet reviewed by a second speaker, so the UI marks this pack
   "(beta)". */
export const pa: Lexicon = {
  lang: "pa",
  needsReview: true,
  patterns: {
    GUARANTEE: [
      "ਗਰੰਟੀ",
      "ਪੱਕਾ ਮੁਨਾਫ਼ਾ",
      "ਯਕੀਨੀ ਮੁਨਾਫ਼ਾ",
      "ਕੋਈ ਖ਼ਤਰਾ ਨਹੀਂ",
      "ਨੁਕਸਾਨ ਨਹੀਂ ਹੋਵੇਗਾ",
      "ਰਿਸਕ ਨਹੀਂ",
      "ਸੌ ਫ਼ੀਸਦੀ ਮੁਨਾਫ਼ਾ",
    ],
    URGENCY: [
      "ਹੁਣੇ",
      "ਅੱਜ ਹੀ",
      "ਤੁਰੰਤ",
      "ਆਖ਼ਰੀ ਮੌਕਾ",
      "ਛੇਤੀ ਕਰੋ",
      "ਥੋੜ੍ਹੀਆਂ ਸੀਟਾਂ",
      "ਆਫ਼ਰ ਖ਼ਤਮ",
      "ਦੇਰ ਨਾ ਕਰੋ",
    ],
    VIP_GROUP: [
      "ਵੀਆਈਪੀ ਗਰੁੱਪ",
      "ਪ੍ਰੀਮੀਅਮ ਗਰੁੱਪ",
      "ਗਰੁੱਪ ਵਿੱਚ ਸ਼ਾਮਲ",
      "ਨਿੱਜੀ ਗਰੁੱਪ",
      "ਖ਼ਾਸ ਗਰੁੱਪ",
      "ਚੈਨਲ ਵਿੱਚ ਸ਼ਾਮਲ",
    ],
    INSIDER: [
      "ਅੰਦਰ ਦੀ ਖ਼ਬਰ",
      "ਗੁਪਤ ਜਾਣਕਾਰੀ",
      "ਪੱਕੀ ਖ਼ਬਰ",
      "ਆਪਰੇਟਰ ਕਾਲ",
    ],
    DOUBLE_MONEY: [
      "ਦੁੱਗਣਾ",
      "ਪੈਸਾ ਦੁੱਗਣਾ",
      "ਡਬਲ",
      "ਤਿੰਨ ਗੁਣਾ",
    ],
    OTP: [
      "ਓਟੀਪੀ",
      "ਓਟੀਪੀ ਦੱਸੋ",
      "ਓਟੀਪੀ ਭੇਜੋ",
      "ਪਿੰਨ ਦੱਸੋ",
      "ਪਾਸਵਰਡ ਦੱਸੋ",
      "ਕੋਡ ਭੇਜੋ",
    ],
    FEE_TO_WITHDRAW: [
      "ਕੱਢਣ ਲਈ",
      "ਟੈਕਸ ਭਰੋ",
      "ਪ੍ਰੋਸੈਸਿੰਗ ਫ਼ੀਸ",
      "ਰਿਲੀਜ਼ ਫ਼ੀਸ",
      "ਖਾਤਾ ਹੋਲਡ",
      "ਫ਼ੀਸ ਅਦਾ ਕਰੋ",
      "ਪੈਸੇ ਵਾਪਸ ਦਿਵਾਵਾਂਗੇ",
    ],
    SECRECY: [
      "ਕਿਸੇ ਨੂੰ ਨਾ ਦੱਸੋ",
      "ਗੁਪਤ ਰੱਖੋ",
      "ਘਰ ਵਿੱਚ ਨਾ ਦੱਸੋ",
      "ਸਿਰਫ਼ ਤੁਹਾਡੇ ਲਈ",
    ],
    REMOTE_ACCESS: [
      "ਐਨੀਡੈਸਕ",
      "ਟੀਮਵਿਊਅਰ",
      "ਸਕਰੀਨ ਸ਼ੇਅਰ",
      "ਸਕਰੀਨ ਦਿਖਾਓ",
      "ਏਪੀਕੇ",
      "ਐਪ ਇੰਸਟਾਲ ਕਰੋ",
    ],
  },
};
