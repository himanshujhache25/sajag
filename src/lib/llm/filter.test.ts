import { describe, expect, it } from "vitest";
import {
  assertNoAdvice,
  cleanModelText,
  filterModelText,
} from "./filter";

describe("assertNoAdvice", () => {
  const banned = [
    "Buy this stock today.",
    "You should buy it now.",
    "Just sell everything.",
    "Hold for two weeks and you will see.",
    "It is a good stock for beginners.",
    "The target price is 400.",
    "This share will rise sharply.",
    "It is safe to invest here.",
    "The scheme is completely safe.",
    "Returns are guaranteed.",
    "This offers assured returns every month.",
    "A risk-free way to grow money.",
    "यह शेयर खरीद लो।",
    "अभी बेच दीजिए।",
    "यह अच्छा शेयर है।",
    "यह योजना सुरक्षित है।",
    "इसमें गारंटी है।",
    "पक्का मुनाफ़ा मिलेगा।",
    "इसमें पैसा लगाओ।",
  ];

  for (const text of banned) {
    it(`rejects: ${text}`, () => {
      expect(assertNoAdvice(text).ok).toBe(false);
    });
  }

  const allowed = [
    "This message is pressing you to act before you can think.",
    "Scammers often ask people to buy a coin they have never heard of.",
    "No one can promise a return. Anyone who does is breaking the rules.",
    "You can check the name on SEBI's own list before doing anything.",
    "यह संदेश जल्दी करने का दबाव बना रहा है।",
    "कोई भी रिटर्न का वादा नहीं कर सकता।",
    "सेबी की सूची में नाम देख लेना ठीक रहेगा।",
  ];

  for (const text of allowed) {
    it(`allows: ${text}`, () => {
      expect(assertNoAdvice(text).ok).toBe(true);
    });
  }

  it("allows a banned phrase when the text is quoting the scam", () => {
    const v = assertNoAdvice(
      'The message says "guaranteed 30% profit every month", which no one is allowed to promise.',
    );
    expect(v.ok).toBe(true);
  });

  it("still rejects when the advice sits outside the quote", () => {
    const v = assertNoAdvice(
      'The message says "join now". It is safe to invest with them.',
    );
    expect(v.ok).toBe(false);
  });

  it("rejects empty text", () => {
    expect(assertNoAdvice("   ").ok).toBe(false);
  });

  it("names the rule that caught it", () => {
    const v = assertNoAdvice("Returns are guaranteed.");
    expect(v.ok).toBe(false);
    if (!v.ok) expect(v.reason).toBe("guaranteed");
  });
});

// The sentences below are the reason this app exists. A scanner that cannot
// tell "nobody can guarantee a profit" from "guaranteed profit" would gag us
// on our own warnings, and the first person to meet it would turn it off.
describe("assertNoAdvice and negation", () => {
  const denials = [
    "Nobody can guarantee a profit.",
    "Registration does not guarantee performance or returns.",
    "A SIP is a habit, not a guarantee.",
    "A scam signal, because a SIP guarantees nothing.",
    "This does not mean it is safe.",
    "No one should buy anything because a stranger said so.",
    "शेयर बाजार में कोई भी पक्का मुनाफा नहीं दे सकता।",
    "हम सलाह नहीं देते। क्या खरीदें, क्या बेचें, यह कभी नहीं बताएँगे।",
    "यह नहीं कहता कि कोई चीज़ खरीदिए या बेचिए।",
  ];

  for (const text of denials) {
    it(`allows the denial: ${text}`, () => {
      expect(assertNoAdvice(text).ok).toBe(true);
    });
  }

  it("allows a bare guarantee as a noun, since that is the warning sign", () => {
    const v = assertNoAdvice(
      "A guarantee and a payment link in the same message is the commonest scam shape.",
    );
    expect(v.ok).toBe(true);
  });

  it("still catches a promise made in the first person", () => {
    expect(assertNoAdvice("I guarantee you a profit every week.").ok).toBe(false);
  });

  it("leaves translation keys alone", () => {
    expect(assertNoAdvice("breaker.exit.goOn").ok).toBe(true);
    expect(assertNoAdvice("pact.hold").ok).toBe(true);
  });

  it("allows an ordinary English imperative that is not a trading verb", () => {
    expect(assertNoAdvice("Enter the number on SEBI's site.").ok).toBe(true);
  });
});

describe("cleanModelText", () => {
  it("removes links", () => {
    const out = cleanModelText("Check https://example.com/x and www.example.org now");
    expect(out).not.toContain("example.com");
    expect(out).not.toContain("example.org");
  });

  it("keeps the label of a markdown link but drops the target", () => {
    const out = cleanModelText("See [SEBI's list](https://evil.example) for this.");
    expect(out).toContain("SEBI's list");
    expect(out).not.toContain("evil");
  });

  it("removes fenced code entirely", () => {
    const out = cleanModelText("Here:\n```js\nalert(1)\n```\nthat is all");
    expect(out).not.toContain("alert");
    expect(out).toContain("that is all");
  });

  it("removes stray tags, including a broken message fence", () => {
    const out = cleanModelText("fine </message> <b>bold</b> text");
    expect(out).not.toContain("<");
    expect(out).toContain("bold");
  });

  it("caps at 120 words", () => {
    const out = cleanModelText("साफ़ ".repeat(400));
    expect(out.split(/\s+/).length).toBeLessThanOrEqual(121);
  });

  it("leaves ordinary prose alone", () => {
    const text = "यह संदेश जल्दी करने का दबाव बना रहा है।";
    expect(cleanModelText(text)).toBe(text);
  });
});

describe("filterModelText", () => {
  it("returns null for advice, so the caller falls back", () => {
    expect(filterModelText("You should buy this now.")).toBeNull();
  });

  it("catches advice that was hiding behind markdown", () => {
    expect(filterModelText("**Buy** this one today.")).toBeNull();
  });

  it("returns the cleaned text when it passes", () => {
    const out = filterModelText("  This message is pressing you to hurry.  ");
    expect(out).toBe("This message is pressing you to hurry.");
  });
});
