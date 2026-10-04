import { describe, expect, it } from "vitest";
import { traineddataFor } from "./ocr";
import { LANGS } from "./i18n/langs";

/* The photo route used to be hard-wired to ["eng", "hin"], so a photo of a
   Tamil or Bengali message came back as transliterated noise in every
   language except Hindi. */

describe("traineddataFor", () => {
  it("asks for a model for every language the app speaks", () => {
    for (const lang of LANGS) {
      const codes = traineddataFor(lang);
      expect(codes.length, `${lang} has no OCR model`).toBeGreaterThan(0);
      /* English is the only one that needs no second model, because the
         Latin model is already the one it would ask for. */
      if (lang !== "en") expect(codes.length, `${lang}`).toBe(2);
    }
  });

  it("always keeps English alongside, for the Latin words inside a message", () => {
    /* "OTP", "UPI", "SEBI" and the URLs stay in Latin letters even in a
       message that is otherwise entirely Tamil, and the engine's lexicon
       matches on exactly those. */
    for (const lang of LANGS) {
      expect(traineddataFor(lang)).toContain("eng");
    }
  });

  it("uses Tesseract's three-letter codes, not the app's language tags", () => {
    expect(traineddataFor("ta")).toEqual(["eng", "tam"]);
    expect(traineddataFor("bn")).toEqual(["eng", "ben"]);
    expect(traineddataFor("ur")).toEqual(["eng", "urd"]);
    expect(traineddataFor("hi")).toEqual(["eng", "hin"]);
  });

  it("falls back to English when no language is known yet", () => {
    expect(traineddataFor(undefined)).toEqual(["eng"]);
  });
});
