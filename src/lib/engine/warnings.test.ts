// Messages that warn people about scams must not be mistaken for scams.
//
// Both cases here were found by `npm run eval` rather than by a unit test,
// and the first was the worst mistake this engine can make: a safety warning
// that somebody forwarded to help a relative came out as HIGH_RISK with a
// hard stop. Someone doing the right thing was told they were being robbed.
//
// The cause was that S05 finds its persona with its own regular expression
// and so never went through the negation and warning-frame check that every
// lexicon hit goes through. The fix was to export that check as `meansIt`
// and apply it. The lesson generalises: any signal matching text by itself
// has to ask the same question.

import { describe, expect, it } from "vitest";
import { check } from "./check";
import { normalise } from "./normalise";
import { findHits, meansIt } from "./lexicon/match";

describe("forwarded warnings are not scams", () => {
  it("a Hindi warning that SEBI officers never ask for money is not high risk", () => {
    const v = check({
      text: "चेतावनी: कोई भी सेबी अधिकारी आपसे पैसे नहीं माँगता, ऐसे फोन पर भरोसा न करें",
    });
    expect(v.state).not.toBe("HIGH_RISK");
    expect(v.hardStop).toBe(false);
  });

  it("does not raise S05 on that warning", () => {
    const v = check({
      text: "चेतावनी: कोई भी सेबी अधिकारी आपसे पैसे नहीं माँगता, ऐसे फोन पर भरोसा न करें",
    });
    expect(v.signals.map((s) => s.id)).not.toContain("S05");
  });

  it("still catches the same persona when it is used in earnest", () => {
    const v = check({
      text: "Sir I am SEBI recovery officer, pay Rs 50,400 tax now to release your funds. Contact me on Telegram @demo_officer",
    });
    expect(v.signals.map((s) => s.id)).toContain("S05");
  });

  it("an English sentence saying nobody can guarantee returns is not a guarantee", () => {
    const n = normalise("Nobody can guarantee returns in the securities market.");
    const hits = findHits(n).filter((h) => h.concept === "GUARANTEE");
    expect(hits.every((h) => h.negated)).toBe(true);
  });

  it("but a bare guarantee still counts", () => {
    const n = normalise("Guaranteed 30% returns every week, join now.");
    const hits = findHits(n).filter((h) => h.concept === "GUARANTEE");
    expect(hits.some((h) => !h.negated)).toBe(true);
  });
});

describe("meansIt", () => {
  const at = (text: string, phrase: string) => {
    const n = normalise(text);
    const i = n.normalised.indexOf(phrase);
    return { n, i };
  };

  it("is false anywhere in a message that opens with a warning", () => {
    const { n, i } = at("सावधान! ठग पक्का मुनाफा का वादा करते हैं।", "पक्का मुनाफा");
    expect(i).toBeGreaterThanOrEqual(0);
    expect(meansIt(n, i, i + "पक्का मुनाफा".length)).toBe(false);
  });

  it("is false when the phrase is negated", () => {
    const { n, i } = at("We do not guarantee any return.", "guarantee");
    expect(meansIt(n, i, i + "guarantee".length)).toBe(false);
  });

  it("is true for a plain claim", () => {
    const { n, i } = at("Guaranteed profit every week.", "guaranteed");
    expect(meansIt(n, i, i + "guaranteed".length)).toBe(true);
  });
});
