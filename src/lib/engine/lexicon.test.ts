import { describe, expect, it } from "vitest";
import { normalise } from "./normalise";
import { findHits } from "./lexicon/match";
import type { Concept } from "./lexicon/concepts";

function concepts(text: string): Concept[] {
  return [
    ...new Set(
      findHits(normalise(text))
        .filter((h) => !h.negated)
        .map((h) => h.concept as Concept),
    ),
  ];
}

function has(text: string, concept: Concept) {
  return concepts(text).includes(concept);
}

describe("lexicon matching", () => {
  it("runs every language, not only the guessed one", () => {
    const found = concepts(
      "Guaranteed profit. पक्का मुनाफा. pakka munafa bhi.",
    );
    expect(found).toContain("GUARANTEE");
  });

  it("matches on word boundaries, not inside words", () => {
    expect(has("the otp is needed", "OTP")).toBe(true);
    expect(has("we adopted a new plan", "OTP")).toBe(false);
  });

  it("quotes the evidence from the original text, longest phrase first", () => {
    const raw = "Daily 5% GUARANTEED profit";
    const hit = findHits(normalise(raw)).find((h) => h.concept === "GUARANTEE");
    expect(raw.slice(hit!.start, hit!.end)).toBe("GUARANTEED profit");
  });

  describe("negation", () => {
    it("ignores a guarantee that is denied", () => {
      expect(
        has("A stop-loss does not guarantee execution at that price", "GUARANTEE"),
      ).toBe(false);
    });

    it("ignores the Hindi denial", () => {
      expect(has("कोई गारंटी नहीं दे सकता", "GUARANTEE")).toBe(false);
    });

    it("ignores the Hinglish denial", () => {
      expect(has("koi bhi guarantee nahi de sakta", "GUARANTEE")).toBe(false);
    });

    it("keeps a denial in a different sentence out of it", () => {
      expect(
        has("Nothing is free. Guaranteed profit every day, join now.", "GUARANTEE"),
      ).toBe(true);
    });

    it("still records the hit, marked as negated", () => {
      const hits = findHits(normalise("does not guarantee execution"));
      expect(hits.some((h) => h.concept === "GUARANTEE" && h.negated)).toBe(true);
    });
  });

  describe("warning context", () => {
    it("marks hits inside a forwarded warning", () => {
      const hits = findHits(
        normalise("सावधान! ठगों से बचें। वे पक्का मुनाफा और गारंटी का वादा करते हैं।"),
      );
      const guarantee = hits.filter((h) => h.concept === "GUARANTEE");
      expect(guarantee.length).toBeGreaterThan(0);
      expect(guarantee.every((h) => h.inWarningFrame)).toBe(true);
    });

    it("leaves an ordinary message unmarked", () => {
      const hits = findHits(normalise("गारंटी के साथ पक्का मुनाफा"));
      expect(hits.every((h) => !h.inWarningFrame)).toBe(true);
    });
  });

  describe("every concept, in every main language", () => {
    const cases: [Concept, string[], string[]][] = [
      [
        "GUARANTEE",
        ["guaranteed returns daily", "pakka munafa milega", "पक्का मुनाफा मिलेगा"],
        ["returns are never certain", "बाजार में जोखिम रहता है"],
      ],
      [
        "URGENCY",
        ["only 20 seats left", "aaj hi join karein", "सीटें कम हैं, जल्दी कीजिए"],
        ["take your time to decide", "सोचकर फैसला कीजिए"],
      ],
      [
        "VIP_GROUP",
        ["join our vip group", "premium group me judiye", "प्रीमियम ग्रुप में जुड़ें"],
        ["our family group photo", "स्कूल का ग्रुप फोटो"],
      ],
      [
        "INSIDER",
        [
          "we have insider information",
          "andar ki khabar hai",
          "अंदर की खबर है",
        ],
        ["public disclosures are on the website", "सूचना वेबसाइट पर है"],
      ],
      [
        "DOUBLE_MONEY",
        ["double your money in 15 days", "paisa double ho jayega", "पैसा दोगुना"],
        ["double bed for sale", "दोहरी जिम्मेदारी है"],
      ],
      [
        "OTP",
        ["share the otp with us", "otp batao jaldi", "ओटीपी बताइए"],
        ["never share your otp with anyone", "किसी को ओटीपी मत बताइए"],
      ],
      [
        "FEE_TO_WITHDRAW",
        [
          "pay processing fee to release the funds",
          "paisa nikalne ke liye tax bharo",
          "पैसा निकालने के लिए टैक्स जमा करें",
        ],
        ["the bank charges no fee", "कोई शुल्क नहीं लगता"],
      ],
      [
        "REMOTE_ACCESS",
        ["install anydesk now", "screen share karo", "स्क्रीन शेयर कीजिए"],
        ["the screen is cracked", "स्क्रीन टूट गई है"],
      ],
      [
        "SECRECY",
        [
          "keep it secret from everyone",
          "kisi ko mat batana",
          "किसी को मत बताना",
        ],
        ["tell your family before paying", "घरवालों को बता दीजिए"],
      ],
      [
        "SEBI_APPROVED",
        ["sebi approved scheme", "sebi se approved hai", "सेबी अप्रूव्ड है"],
        ["check the registration on sebi's site", "सेबी की साइट पर देखिए"],
      ],
      [
        "FAKE_PROOF",
        [
          "see yesterday's profit screenshot",
          "aaj ka profit dekho",
          "आज का मुनाफा देखिए",
        ],
        ["read the scheme documents", "दस्तावेज़ पढ़िए"],
      ],
      [
        "SMALL_CAPITAL",
        [
          "small capital big profit",
          "kam paise me zyada profit",
          "कम पूंजी में ज्यादा कमाई",
        ],
        ["start with what you can lose", "जितना सह सकें उतना ही"],
      ],
      [
        "BORROWED",
        [
          "take a loan to invest with us",
          "loan lekar invest karo",
          "लोन लेकर निवेश कीजिए",
        ],
        ["never invest borrowed money", "उधार का पैसा मत लगाइए"],
      ],
      [
        "CRYPTO_BOT",
        ["our trading bot runs daily", "crypto double scheme", "ट्रेडिंग बॉट"],
        ["robots are used in factories", "मशीन कारखाने में है"],
      ],
    ];

    for (const [concept, positives, negatives] of cases) {
      it(`${concept} fires on real examples`, () => {
        for (const text of positives) {
          expect(has(text, concept), text).toBe(true);
        }
      });

      it(`${concept} stays quiet otherwise`, () => {
        for (const text of negatives) {
          expect(has(text, concept), text).toBe(false);
        }
      });
    }
  });
});
