import { describe, expect, it } from "vitest";
import { normalise } from "./normalise";
import { findHits, LEXICONS, LEXICON_LANGS } from "./lexicon/match";
import { CONCEPTS, type Concept } from "./lexicon/concepts";
import { LANGS } from "@/lib/i18n/langs";

/* The engine was blind in five of the twelve languages the picker offered.
   A message meaning "guaranteed profit, send 5000 now" in Urdu came back as
   "nothing strong found", which is the most dangerous verdict the app can
   give: it is not a blank, it is a clean bill of health.

   These tests exist so that adding a language to the picker without adding
   its words fails here rather than in front of a person holding a scam. */

function concepts(text: string): Concept[] {
  return [
    ...new Set(
      findHits(normalise(text))
        .filter((h) => !h.negated)
        .map((h) => h.concept as Concept),
    ),
  ];
}

describe("lexicon coverage", () => {
  it("has a lexicon for every language the picker offers", () => {
    /* `hinglish` has no entry in LANGS because nobody picks it: it is run
       on every message to catch Roman-script Hindi. The other direction is
       what matters, so only that is asserted. */
    const missing = LANGS.filter((lang) => !LEXICON_LANGS.includes(lang));
    expect(
      missing,
      `These languages are offered but the engine has no words for them, so a scam in them scores nothing: ${missing.join(", ")}`,
    ).toEqual([]);
  });

  /* The nine concepts that carry almost every scam message, and the ones
     every regional pack is expected to cover. English and Hindi go further
     and cover all fifteen; the rest deliberately stop here, because these
     nine are the shapes that appear in nearly all of them and a half-
     translated pack of fifteen is worse than a solid pack of nine.

     The six left out — SEBI_APPROVED, FAKE_PROOF, SMALL_CAPITAL, BORROWED,
     CRYPTO_BOT, AUTHORITY_NAME — lean on Latin-script words ("SEBI",
     "crypto", a broker's name) that the English lexicon already catches
     inside a message written in any script, because every lexicon runs on
     every message. */
  const CORE: Concept[] = [
    "GUARANTEE",
    "URGENCY",
    "VIP_GROUP",
    "INSIDER",
    "DOUBLE_MONEY",
    "OTP",
    "FEE_TO_WITHDRAW",
    "SECRECY",
    "REMOTE_ACCESS",
  ];

  it("covers the nine core concepts in every language", () => {
    const gaps: string[] = [];
    for (const lexicon of LEXICONS) {
      for (const concept of CORE) {
        const patterns = lexicon.patterns[concept];
        if (!patterns || patterns.length === 0) {
          gaps.push(`${lexicon.lang}/${concept}`);
        }
      }
    }
    expect(gaps, `Core concepts with no words: ${gaps.join(", ")}`).toEqual([]);
  });

  it("keeps English and Hindi on the full set, since they are the fallback", () => {
    for (const lang of ["en", "hi"] as const) {
      const lexicon = LEXICONS.find((l) => l.lang === lang);
      const gaps = CONCEPTS.filter(
        (c) => !lexicon?.patterns[c] || lexicon.patterns[c]?.length === 0,
      );
      expect(gaps, `${lang} is missing: ${gaps.join(", ")}`).toEqual([]);
    }
  });

  /* One real sentence per language, in the shape these messages actually
     arrive in: a promise, a push to act now, and a demand for money. If the
     words in the pack are wrong, a typo or a mis-transliteration, this is
     what catches it. A unit test on the data file alone would not. */
  const SCAMS: Array<[string, string, Concept]> = [
    ["Urdu", "یقینی منافع کی گارنٹی! ابھی شامل ہوں", "GUARANTEE"],
    ["Urdu OTP", "اپنا او ٹی پی بتائیں ورنہ اکاؤنٹ بند", "OTP"],
    ["Punjabi", "ਪੱਕਾ ਮੁਨਾਫ਼ਾ ਦੀ ਗਰੰਟੀ! ਹੁਣੇ ਸ਼ਾਮਲ ਹੋਵੋ", "GUARANTEE"],
    ["Punjabi OTP", "ਆਪਣਾ ਓਟੀਪੀ ਦੱਸੋ", "OTP"],
    ["Kannada", "ಖಚಿತ ಲಾಭದ ಖಾತರಿ! ಈಗಲೇ ಸೇರಿ", "GUARANTEE"],
    ["Kannada OTP", "ನಿಮ್ಮ ಓಟಿಪಿ ಹೇಳಿ", "OTP"],
    ["Malayalam", "ഉറപ്പായ ലാഭം ഗ്യാരണ്ടി! ഇപ്പോൾ തന്നെ ചേരൂ", "GUARANTEE"],
    ["Malayalam OTP", "നിങ്ങളുടെ ഒടിപി പറയൂ", "OTP"],
    ["Odia", "ନିଶ୍ଚିତ ଲାଭର ଗ୍ୟାରେଣ୍ଟି! ବର୍ତ୍ତମାନ ଯୋଗ ଦିଅନ୍ତୁ", "GUARANTEE"],
    ["Odia OTP", "ଆପଣଙ୍କ ଓଟିପି କୁହନ୍ତୁ", "OTP"],
  ];

  for (const [label, text, expected] of SCAMS) {
    it(`catches a ${label} message`, () => {
      expect(concepts(text)).toContain(expected);
    });
  }
});
