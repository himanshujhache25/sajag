import type { Lexicon } from "./concepts";

/* Telugu, the eight concepts every language pack must cover. Not yet reviewed
   by a second speaker, so the UI marks this pack "(beta)". */
export const te: Lexicon = {
  lang: "te",
  needsReview: true,
  patterns: {
    GUARANTEE: [
      "గ్యారంటీ",
      "ఖచ్చితమైన లాభం",
      "పక్కా లాభం",
      "నిశ్చిత లాభం",
      "రిస్క్ లేదు",
      "ఎలాంటి ప్రమాదం లేదు",
      "నష్టం రాదు",
    ],
    URGENCY: [
      "వెంటనే",
      "ఈరోజే",
      "ఈరోజే చేరండి",
      "పరిమిత సీట్లు",
      "చివరి అవకాశం",
      "ఆఫర్ ముగుస్తుంది",
      "ఆలస్యం చేయకండి",
    ],
    VIP_GROUP: [
      "వీఐపీ గ్రూప్",
      "ప్రీమియం గ్రూప్",
      "గ్రూప్‌లో చేరండి",
      "ప్రైవేట్ గ్రూప్",
      "ఛానెల్‌లో చేరండి",
    ],
    INSIDER: [
      "లోపలి సమాచారం",
      "రహస్య సమాచారం",
      "ఆపరేటర్ కాల్",
    ],
    DOUBLE_MONEY: [
      "రెట్టింపు",
      "డబ్బు రెట్టింపు",
      "డబుల్",
      "మూడు రెట్లు",
    ],
    OTP: [
      "ఓటీపీ",
      "ఓటీపీ చెప్పండి",
      "ఓటీపీ పంపండి",
      "పిన్ చెప్పండి",
      "పాస్‌వర్డ్ చెప్పండి",
      "కోడ్ పంపండి",
    ],
    FEE_TO_WITHDRAW: [
      "డబ్బు తీసుకోవడానికి",
      "పన్ను కట్టండి",
      "టాక్స్ కట్టండి",
      "ప్రాసెసింగ్ ఫీజు",
      "రిలీజ్ ఛార్జీ",
      "ఖాతా హోల్డ్",
      "డబ్బు తిరిగి ఇప్పిస్తాం",
    ],
    REMOTE_ACCESS: [
      "ఎనీడెస్క్",
      "టీమ్‌వ్యూయర్",
      "స్క్రీన్ షేర్",
      "స్క్రీన్ చూపించండి",
      "ఏపీకే",
      "యాప్ ఇన్‌స్టాల్ చేయండి",
    ],
    /* Isolation is how the pressure survives: a person who is told to keep
       it to themselves has nobody to ask. The pack carried every other core
       concept but this one. */
    SECRECY: [
      "ఎవరికీ చెప్పవద్దు",
      "రహస్యంగా ఉంచండి",
      "ఇంట్లో చెప్పవద్దు",
      "మీకు మాత్రమే",
      "గోప్యంగా ఉంచండి",
    ],
  },
};
