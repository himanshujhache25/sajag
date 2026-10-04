import type { Lexicon } from "./concepts";

/* Kannada, the eight concepts every language pack must cover. Written to
   close a gap found by probing: the picker offered Kannada while the engine
   had no Kannada words at all. Not yet reviewed by a second speaker, so the
   UI marks this pack "(beta)". */
export const kn: Lexicon = {
  lang: "kn",
  needsReview: true,
  patterns: {
    GUARANTEE: [
      "ಖಾತರಿ",
      "ಖಚಿತ ಲಾಭ",
      "ನಿಶ್ಚಿತ ಲಾಭ",
      "ಅಪಾಯವಿಲ್ಲ",
      "ನಷ್ಟವಾಗುವುದಿಲ್ಲ",
      "ರಿಸ್ಕ್ ಇಲ್ಲ",
      "ನೂರಕ್ಕೆ ನೂರು ಲಾಭ",
    ],
    URGENCY: [
      "ಈಗಲೇ",
      "ಇಂದೇ",
      "ತಕ್ಷಣ",
      "ಕೊನೆಯ ಅವಕಾಶ",
      "ಬೇಗ ಮಾಡಿ",
      "ಕಡಿಮೆ ಸ್ಥಳ",
      "ಆಫರ್ ಮುಗಿಯುತ್ತಿದೆ",
      "ತಡ ಮಾಡಬೇಡಿ",
    ],
    VIP_GROUP: [
      "ವಿಐಪಿ ಗುಂಪು",
      "ಪ್ರೀಮಿಯಂ ಗುಂಪು",
      "ಗುಂಪಿಗೆ ಸೇರಿ",
      "ಖಾಸಗಿ ಗುಂಪು",
      "ವಿಶೇಷ ಗುಂಪು",
      "ಚಾನೆಲ್‌ಗೆ ಸೇರಿ",
    ],
    INSIDER: [
      "ಒಳಗಿನ ಮಾಹಿತಿ",
      "ಗುಪ್ತ ಮಾಹಿತಿ",
      "ಖಚಿತ ಸುದ್ದಿ",
      "ಆಪರೇಟರ್ ಕಾಲ್",
    ],
    DOUBLE_MONEY: [
      "ಡಬಲ್",
      "ಹಣ ದ್ವಿಗುಣ",
      "ದ್ವಿಗುಣ",
      "ಮೂರು ಪಟ್ಟು",
    ],
    OTP: [
      "ಓಟಿಪಿ",
      "ಓಟಿಪಿ ಹೇಳಿ",
      "ಓಟಿಪಿ ಕಳುಹಿಸಿ",
      "ಪಿನ್ ಹೇಳಿ",
      "ಪಾಸ್‌ವರ್ಡ್ ಹೇಳಿ",
      "ಕೋಡ್ ಕಳುಹಿಸಿ",
    ],
    FEE_TO_WITHDRAW: [
      "ಹಣ ತೆಗೆಯಲು",
      "ತೆರಿಗೆ ಕಟ್ಟಿ",
      "ಪ್ರೊಸೆಸಿಂಗ್ ಶುಲ್ಕ",
      "ರಿಲೀಸ್ ಶುಲ್ಕ",
      "ಖಾತೆ ಹೋಲ್ಡ್",
      "ಶುಲ್ಕ ಪಾವತಿಸಿ",
      "ಹಣ ವಾಪಸ್ ಕೊಡಿಸುತ್ತೇವೆ",
    ],
    SECRECY: [
      "ಯಾರಿಗೂ ಹೇಳಬೇಡಿ",
      "ಗುಟ್ಟಾಗಿ ಇಡಿ",
      "ಮನೆಯಲ್ಲಿ ಹೇಳಬೇಡಿ",
      "ನಿಮಗೆ ಮಾತ್ರ",
    ],
    REMOTE_ACCESS: [
      "ಎನಿಡೆಸ್ಕ್",
      "ಟೀಮ್‌ವ್ಯೂವರ್",
      "ಸ್ಕ್ರೀನ್ ಶೇರ್",
      "ಪರದೆ ತೋರಿಸಿ",
      "ಎಪಿಕೆ",
      "ಆಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ",
    ],
  },
};
