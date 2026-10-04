import type { Lexicon } from "./concepts";

/* Tamil, the eight concepts every language pack must cover. Not yet reviewed
   by a second speaker, so the UI marks this pack "(beta)". */
export const ta: Lexicon = {
  lang: "ta",
  needsReview: true,
  patterns: {
    GUARANTEE: [
      "உத்தரவாதம்",
      "உறுதியான லாபம்",
      "நிச்சயமான லாபம்",
      "கட்டாய லாபம்",
      "ரிஸ்க் இல்லை",
      "நஷ்டம் வராது",
      "எந்த ஆபத்தும் இல்லை",
    ],
    URGENCY: [
      "உடனே",
      "இன்றே",
      "இன்றே சேருங்கள்",
      "குறைந்த இடங்கள்",
      "கடைசி வாய்ப்பு",
      "சலுகை முடிகிறது",
      "தாமதிக்காதீர்கள்",
    ],
    VIP_GROUP: [
      "விஐபி குழு",
      "பிரீமியம் குழு",
      "குழுவில் சேருங்கள்",
      "தனிப்பட்ட குழு",
      "சேனலில் சேருங்கள்",
    ],
    INSIDER: [
      "உள் தகவல்",
      "ரகசிய தகவல்",
      "ஆபரேட்டர் கால்",
    ],
    DOUBLE_MONEY: [
      "இரட்டிப்பு",
      "பணம் இரட்டிப்பு",
      "டபுள்",
      "மூன்று மடங்கு",
    ],
    OTP: [
      "ஓடிபி",
      "ஓடிபி சொல்லுங்கள்",
      "ஓடிபி அனுப்புங்கள்",
      "பின் சொல்லுங்கள்",
      "கடவுச்சொல் சொல்லுங்கள்",
      "கோட் அனுப்புங்கள்",
    ],
    FEE_TO_WITHDRAW: [
      "பணம் எடுக்க",
      "வரி கட்டுங்கள்",
      "டாக்ஸ் கட்டுங்கள்",
      "ப்ராசஸிங் கட்டணம்",
      "ரிலீஸ் கட்டணம்",
      "கணக்கு ஹோல்ட்",
      "பணத்தை திரும்பப் பெற்றுத் தருவோம்",
    ],
    REMOTE_ACCESS: [
      "எனிடெஸ்க்",
      "டீம்வ்யூவர்",
      "ஸ்கிரீன் ஷேர்",
      "திரையை காட்டுங்கள்",
      "ஏபிகே",
      "ஆப் இன்ஸ்டால் செய்யுங்கள்",
    ],
    /* Isolation is how the pressure survives: a person who is told to keep
       it to themselves has nobody to ask. The pack carried every other core
       concept but this one. */
    SECRECY: [
      "யாரிடமும் சொல்லாதீர்கள்",
      "ரகசியமாக வைத்திருங்கள்",
      "வீட்டில் சொல்லாதீர்கள்",
      "உங்களுக்கு மட்டும்",
    ],
  },
};
