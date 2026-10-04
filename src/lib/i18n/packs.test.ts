import { describe, expect, it } from "vitest";
import { en } from "@/lib/i18n/packs/en";
import { hi } from "@/lib/i18n/packs/hi";
import { ALL_PACKS, coverage, getPack, needsReview, t } from "@/lib/i18n";
import { LANGS, LANG_INFO, dirOf, matchLang } from "@/lib/i18n/langs";

/* The two complete packs. Every key in one must be in the other. */
const packs = [hi, en];

/* The screens a person cannot avoid. Every language must carry these in its
   own script; falling back to English here would strand the reader on the
   first screen they see. */
const MUST_TRANSLATE = [
  "app.tagline",
  "tab.home",
  "tab.check",
  "tab.madad",
  "tab.pause",
  "tab.more",
  "home.hero",
  "home.heroLead",
  "home.madad",
  "home.pause",
  "quick.check",
  "check.submit",
  "state.HIGH_RISK.stamp",
  "settings.language",
];

describe("language packs", () => {
  it("have the same keys in every complete pack", () => {
    const base = Object.keys(hi.strings).sort();
    for (const pack of packs) {
      expect(Object.keys(pack.strings).sort(), pack.lang).toEqual(base);
    }
  });

  it("have no empty strings", () => {
    for (const pack of ALL_PACKS) {
      for (const [key, value] of Object.entries(pack.strings)) {
        expect(value.trim().length, `${pack.lang}:${key}`).toBeGreaterThan(0);
      }
    }
  });

  it("invents no keys English does not have", () => {
    for (const pack of ALL_PACKS) {
      for (const key of Object.keys(pack.strings)) {
        expect(key in en.strings, `${pack.lang}:${key}`).toBe(true);
      }
    }
  });

  it("translates the unavoidable screens in every language", () => {
    for (const lang of LANGS) {
      const pack = getPack(lang);
      for (const key of MUST_TRANSLATE) {
        expect(pack.strings[key], `${lang}:${key}`).toBeTruthy();
      }
    }
  });

  it("marks an unreviewed pack as beta and a reviewed one as not", () => {
    expect(needsReview("hi")).toBe(false);
    expect(needsReview("en")).toBe(false);
    expect(needsReview("ta")).toBe(true);
  });

  it("falls back to English for a key a pack has not translated", () => {
    expect(t("ta", "report.title")).toBe(en.strings["report.title"]);
  });

  it("uses the pack, not English, for a key it does have", () => {
    expect(t("ta", "tab.home")).not.toBe(en.strings["tab.home"]);
  });

  it("fills variables", () => {
    expect(t("en", "{a} and {b}", { a: "one", b: "two" })).toBe("one and two");
  });

  it("carries no emoji", () => {
    const emoji = /\p{Extended_Pictographic}/u;
    for (const pack of ALL_PACKS) {
      for (const [key, value] of Object.entries(pack.strings)) {
        expect(emoji.test(value), `${pack.lang}:${key}`).toBe(false);
      }
    }
  });

  it("keeps a pack for every language and a language for every pack", () => {
    expect(ALL_PACKS.map((p) => p.lang).sort()).toEqual([...LANGS].sort());
    for (const lang of LANGS) expect(getPack(lang).lang).toBe(lang);
  });

  it("gives every language a direction, a locale and a native name", () => {
    for (const lang of LANGS) {
      const info = LANG_INFO[lang];
      expect(info.native.trim().length, lang).toBeGreaterThan(0);
      expect(info.english.trim().length, lang).toBeGreaterThan(0);
      expect(info.locale, lang).toMatch(/^[a-z]{2}-[A-Z]{2}$/);
    }
    expect(dirOf("ur")).toBe("rtl");
    expect(dirOf("hi")).toBe("ltr");
  });

  it("matches a browser tag to a language we have", () => {
    expect(matchLang("ta-IN")).toBe("ta");
    expect(matchLang("en-GB")).toBe("en");
    expect(matchLang("fr-FR")).toBe(null);
    expect(matchLang(null)).toBe(null);
  });

  it("keeps coverage honest", () => {
    expect(coverage("en")).toBe(1);
    expect(coverage("hi")).toBe(1);
    /* A beta pack is partial by design, but never empty. */
    expect(coverage("ur")).toBeGreaterThan(0.1);
  });
});

