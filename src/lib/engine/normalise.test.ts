import { describe, expect, it } from "vitest";
import { normalise } from "./normalise";

describe("normalise", () => {
  it("keeps the original text untouched", () => {
    const raw = "Guaranteed 10% Profit!";
    expect(normalise(raw).original).toBe(raw);
  });

  it("lowercases Latin letters", () => {
    expect(normalise("GUARANTEED").normalised).toContain("guaranteed");
  });

  it("removes zero-width characters", () => {
    expect(normalise("gua\u200brant\u200deed").normalised).toContain(
      "guaranteed",
    );
  });

  it("converts Indic digits to ASCII", () => {
    expect(normalise("५ लाख").normalised).toContain("5");
    expect(normalise("১০%").normalised).toContain("10");
    expect(normalise("૨૦").normalised).toContain("20");
  });

  it("collapses letters spaced out one by one", () => {
    expect(normalise("g u a r a n t e e d").normalised).toContain("guaranteed");
  });

  it("collapses letters separated by dots", () => {
    expect(normalise("G.U.A.R.A.N.T.E.E.D").normalised).toContain("guaranteed");
  });

  it("folds leetspeak only when the result is a real word", () => {
    expect(normalise("j0in our gr0up").normalised).toContain("join");
    expect(normalise("j0in our gr0up").normalised).toContain("group");
  });

  it("leaves a code that is not a word alone", () => {
    expect(normalise("DEMOcode123").normalised).toContain("democode123");
  });

  it("squeezes runs of the same character", () => {
    expect(normalise("suuuuure shot").normalised).toContain("suure shot");
  });

  it("normalises every currency marker to the rupee sign", () => {
    for (const raw of ["Rs 5000", "Rs. 5000", "INR 5000", "रु 5000", "₹5000"]) {
      expect(normalise(raw).normalised, raw).toContain("₹");
    }
  });

  it("reads Indian number words into digits", () => {
    expect(normalise("5 lakh").numbers[0]).toBe(500000);
    expect(normalise("5 लाख").numbers[0]).toBe(500000);
    expect(normalise("1.5 crore").numbers[0]).toBe(15000000);
    expect(normalise("1.5 करोड़").numbers[0]).toBe(15000000);
    expect(normalise("4,20,000").numbers[0]).toBe(420000);
  });

  it("maps every normalised offset back into the original", () => {
    const n = normalise("G.U.A.R.A.N.T.E.E.D profit");
    const at = n.normalised.indexOf("guaranteed");
    expect(n.offsetMap[at]).toBe(0);
    expect(n.original.slice(n.offsetMap[at], n.offsetMap[at + 9] + 1)).toBe(
      "G.U.A.R.A.N.T.E.E.D",
    );
  });

  describe("language guess", () => {
    it("reads plain English", () => {
      expect(normalise("Dear investor, your SIP is due on 5 Oct.").language).toBe(
        "en",
      );
    });

    it("reads Hinglish by its function words", () => {
      expect(
        normalise("Namaste sir, aaj hi join karein, paisa double ho jayega")
          .language,
      ).toBe("hinglish");
    });

    it("reads Hindi by its script", () => {
      expect(normalise("आज का सुपर टिप, पक्का मुनाफा").language).toBe("hi");
    });

    it("calls a mixed message mixed", () => {
      expect(
        normalise(
          "Guaranteed profit, join now. पक्का मुनाफा, अभी जुड़ें, सीटें कम हैं.",
        ).language,
      ).toBe("mixed");
    });
  });

  describe("sentences", () => {
    it("splits on Hindi and Latin full stops", () => {
      const n = normalise("पहला वाक्य। दूसरा वाक्य। Third one.");
      expect(n.sentences).toHaveLength(3);
    });

    it("marks a sentence that opens with a warning frame", () => {
      const n = normalise("Scam alert: they promise guaranteed profit.");
      expect(n.sentences[0].warningFrame).toBe(true);
      expect(n.warningContext).toBe(true);
    });

    it("marks the Hindi warning frames too", () => {
      expect(normalise("सावधान! ठगों से बचें।").warningContext).toBe(true);
      expect(normalise("सतर्क रहें, लोग गारंटी देते हैं।").warningContext).toBe(
        true,
      );
    });

    it("does not treat an ordinary message as a warning", () => {
      expect(normalise("Guaranteed profit, join now.").warningContext).toBe(
        false,
      );
    });
  });
});
