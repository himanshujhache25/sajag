import type { Concept, ConceptPack } from "./types";
import { CONCEPT_IDS } from "./types";
import { LEARN_HI } from "./hi";
import { LEARN_EN } from "./en";

export type { Concept, ConceptPack, Quiz } from "./types";
export { CONCEPT_IDS } from "./types";

/* Hindi and English are written by hand. Every other language falls back to
   Hindi for now and is flagged, so the index can show "(beta)" honestly
   rather than pretending the cards were written in that language. */
const PACKS: Record<string, Concept[]> = { hi: LEARN_HI, en: LEARN_EN };

export function conceptsFor(lang: string): ConceptPack {
  const written = PACKS[lang];
  if (written) return { lang, concepts: written };
  return { lang, concepts: LEARN_HI, needsReview: true };
}

export function conceptById(lang: string, id: string): Concept | undefined {
  return conceptsFor(lang).concepts.find((c) => c.id === id);
}

/* The search box works with the net off, so it is a plain scorer rather than
   anything clever: a hit in the title counts for more than a hit in the body,
   and every word of the query has to land somewhere. */
export function searchConcepts(concepts: Concept[], query: string): Concept[] {
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return concepts;

  const scored = concepts.map((c) => {
    const title = `${c.title} ${c.line}`.toLowerCase();
    const keys = c.search.join(" ").toLowerCase();
    const body = `${c.everyday} ${c.meaning.join(" ")} ${c.trap.join(" ")}`
      .toLowerCase();

    let score = 0;
    for (const w of words) {
      if (title.includes(w)) score += 6;
      else if (keys.includes(w)) score += 4;
      else if (body.includes(w)) score += 1;
      else return { c, score: 0 };
    }
    return { c, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.c.n - b.c.n)
    .map((s) => s.c);
}

/* Read aloud wants one piece of text, not five boxes. */
export function conceptAsSpeech(c: Concept): string {
  return [c.title, c.everyday, ...c.meaning, ...c.trap].join(" ");
}

export const LEARN_COUNT = CONCEPT_IDS.length;
