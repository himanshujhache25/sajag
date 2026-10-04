import { describe, expect, it } from "vitest";
import { LEARN_HI } from "./hi";
import { LEARN_EN } from "./en";
import {
  CONCEPT_IDS,
  conceptAsSpeech,
  conceptById,
  conceptsFor,
  searchConcepts,
} from "./index";

const PACKS = { hi: LEARN_HI, en: LEARN_EN };

describe("the concept library", () => {
  for (const [lang, pack] of Object.entries(PACKS)) {
    it(`${lang} has all twelve concepts, numbered 1 to 12`, () => {
      expect(pack.map((c) => c.id)).toEqual([...CONCEPT_IDS]);
      expect(pack.map((c) => c.n)).toEqual([
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
      ]);
    });

    it(`${lang} keeps every card to the same shape`, () => {
      for (const c of pack) {
        expect(c.title.length, c.id).toBeGreaterThan(1);
        expect(c.line.length, c.id).toBeGreaterThan(1);
        expect(c.everyday.length, c.id).toBeGreaterThan(20);
        expect(c.meaning, c.id).toHaveLength(2);
        expect(c.trap.length, c.id).toBeGreaterThanOrEqual(1);
        expect(c.trap.length, c.id).toBeLessThanOrEqual(2);
        expect(c.quiz.options, c.id).toHaveLength(3);
        expect(c.quiz.why, c.id).toHaveLength(3);
        expect(c.search.length, c.id).toBeGreaterThan(1);
      }
    });

    it(`${lang} points every answer at a real option`, () => {
      for (const c of pack) {
        expect(c.quiz.options[c.quiz.answer], c.id).toBeTruthy();
      }
    });

    it(`${lang} links only to screens that exist`, () => {
      const known = ["/check", "/madad", "/simulate", "/pause", "/family"];
      for (const c of pack) {
        if (c.related) expect(known, c.id).toContain(c.related.href);
      }
    });

    it(`${lang} never promises a return`, () => {
      /* Section 4 of the spec. The teaching copy must not contain the very
         sentences the engine flags. */
      const banned = /guarantee[d]? (profit|return)|पक्का मुनाफा मिलेगा|दोगुना कर देंगे/i;
      for (const c of pack) {
        const all = [c.everyday, ...c.meaning, ...c.trap].join(" ");
        expect(banned.test(all), c.id).toBe(false);
      }
    });
  }

  it("matches the two packs card for card", () => {
    expect(LEARN_EN.map((c) => c.id)).toEqual(LEARN_HI.map((c) => c.id));
    for (let i = 0; i < LEARN_HI.length; i += 1) {
      expect(LEARN_EN[i].quiz.answer, LEARN_HI[i].id).toBe(
        LEARN_HI[i].quiz.answer,
      );
      expect(LEARN_EN[i].related?.href).toBe(LEARN_HI[i].related?.href);
    }
  });

  it("falls back to Hindi and says so", () => {
    expect(conceptsFor("hi").needsReview).toBeUndefined();
    expect(conceptsFor("en").needsReview).toBeUndefined();
    const ta = conceptsFor("ta");
    expect(ta.needsReview).toBe(true);
    expect(ta.concepts).toHaveLength(12);
  });

  it("finds a concept by id", () => {
    expect(conceptById("en", "nav")?.title).toBe("NAV");
    expect(conceptById("en", "no-such-thing")).toBeUndefined();
  });
});

describe("the local search", () => {
  it("returns everything for an empty query", () => {
    expect(searchConcepts(LEARN_EN, "   ")).toHaveLength(12);
  });

  it("puts a title hit above a body hit", () => {
    const found = searchConcepts(LEARN_EN, "leverage");
    expect(found[0].id).toBe("leverage");
  });

  it("finds a card through a word that is not in its title", () => {
    expect(searchConcepts(LEARN_EN, "cdsl")[0].id).toBe("demat");
    expect(searchConcepts(LEARN_HI, "मार्जिन")[0].id).toBe("leverage");
  });

  it("needs every word of the query to land", () => {
    expect(searchConcepts(LEARN_EN, "leverage zzzz")).toEqual([]);
  });

  it("ignores case", () => {
    expect(searchConcepts(LEARN_EN, "SEBI")[0].id).toBe("sebi-registration");
  });

  it("gives read-aloud one string with the trap in it", () => {
    const said = conceptAsSpeech(LEARN_EN[0]);
    expect(said).toContain("SEBI registration");
    expect(said).toContain("Check the number on SEBI's own site");
  });
});
