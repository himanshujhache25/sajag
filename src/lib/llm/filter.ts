// The output filter.
//
// This is the gate between a language model and a person's screen. Sajag is
// allowed to explain what a message is doing. It is never allowed to tell
// anyone to buy or sell anything, to call something safe, or to promise a
// number. A model that wanders into that territory does not get edited into
// line: its whole answer is thrown away and the engine's own explanation is
// shown instead. Half-trusting a model is worse than not using one.

/** A span the scanner should skip, because the text is quoting a scam rather
 *  than committing one. Describing "guaranteed 30% profit" has to be
 *  sayable, or we cannot name the thing we are warning about.
 *
 *  The quote characters are written as escapes on purpose. Curly quotes are
 *  invisible to a code reviewer and get flattened to ASCII by editors and
 *  copy-paste, which silently turns this rule off. An escape cannot be
 *  mangled by accident.
 *
 *  The ASCII apostrophe is deliberately not in this list: it would pair up
 *  with the next apostrophe in ordinary prose and blank out a whole
 *  sentence, taking real advice with it. */
const Q = "\\u00AB\\u00BB\\u201C\\u201D\\u2018\\u2019\\u0022";
const QUOTED = new RegExp(
  `[${Q}][^${Q}]{0,400}[${Q}]|<message>[\\s\\S]*?<\\/message>|\`[^\`]*\``,
  "g",
);

/** Verbs that are only a problem when they are an instruction. "Scammers
 *  ask you to buy" is a description. "Buy now" is advice. The difference is
 *  whether the verb opens a sentence.
 *
 *  Deliberately short. An earlier version also caught "enter", "exit" and
 *  "book", which are trading verbs but are first of all ordinary English
 *  ones, and it flagged "Enter the number on SEBI's site". A rule that
 *  cries wolf on good copy gets switched off, and then it protects nothing. */
const IMPERATIVE =
  /(?:^|[.!?;\n]\s*)(?:(?:just|now|please|quickly|today|so)\s+){0,2}(?:buy|sell|hold|invest)\b/i;

/** Phrases that are a problem wherever they appear. */
const BANNED: Array<[string, RegExp]> = [
  ["invest-in", /\binvest\s+in\b/i],
  ["should-buy", /\b(?:should|must|ought to)\s+(?:buy|sell|hold|invest)\b/i],
  ["good-stock", /\bgood\s+(?:stock|share|scrip|buy|investment|bet)\b/i],
  ["target-price", /\btarget\s+price\b/i],
  ["will-move", /\bwill\s+(?:rise|fall|go up|go down|double|moon|crash)\b/i],
  ["sure-shot", /\b(?:sure[- ]shot|multibagger|risk[- ]free)\b/i],
  ["safe-to-invest", /\bsafe\s+to\s+(?:invest|buy|trade|put money)\b/i],
  ["is-safe", /\b(?:is|are|it'?s)\s+(?:totally\s+|completely\s+|100%\s+)?safe\b/i],
  // "guarantee" as a bare noun is allowed: we need to be able to say that a
  // guarantee is itself the warning sign. What is banned is making one.
  ["guaranteed", /\bguaranteed\b/i],
  ["guarantee-you", /\bguarantee(?:s)?\s+(?:you\b|me\b|a\s+(?:profit|return))/i],
  ["assured", /\bassured\s+(?:returns?|profits?|income)\b/i],

  // Hindi. The imperative and the polite imperative both count.
  ["hi-buy", /खरीद(?:ें|िए|ो|\s*लो|\s*लीजिए|\s*लें)/],
  ["hi-sell", /बेच(?:ें|िए|ो|\s*दो|\s*दीजिए|\s*दें)/],
  ["hi-good-share", /अच्छा\s+(?:शेयर|स्टॉक|सौदा|निवेश)/],
  ["hi-safe", /सुरक्षित\s+है/],
  ["hi-guarantee", /(?:गारंटी|गारण्टी)\s+(?:है|देते|दूँगा|दूंगा)/],
  ["hi-pakka-munafa", /(?:पक्का|निश्चित)\s+(?:मुनाफ़ा|मुनाफा|फ़ायदा|फायदा|रिटर्न)/],
  ["hi-paisa-lagao", /पैसा\s+लगा(?:ओ|इए|एं|ें)/],
];

/** Words that turn a promise into a description of one. "Nobody can
 *  guarantee a profit" is the exact sentence this whole app exists to say,
 *  and a scanner that cannot tell it apart from "guaranteed profit" is
 *  useless here.
 *
 *  Only real negation belongs in this list. An earlier draft also counted
 *  reporting verbs — says, claims, promises — and "The message says X. It is
 *  safe to invest with them." sailed straight through. Reported speech is
 *  handled by the quotation masking above, where it can be seen. */
const NEGATORS =
  /\b(?:no|not|n't|never|nobody|none|nothing|cannot|can't|without|don't|doesn't|isn't|aren't|won't)\b|नहीं|कभी\s+न|बिना|कोई\s+भी/i;

const LOOK_BACK = 48;
const LOOK_AHEAD = 28;

/** Is this match sitting inside a sentence that denies it? */
function isNegated(text: string, at: number, length: number): boolean {
  const before = text.slice(Math.max(0, at - LOOK_BACK), at);
  const after = text.slice(at + length, at + length + LOOK_AHEAD);
  return NEGATORS.test(before) || NEGATORS.test(after);
}

/** Translation keys and other identifiers are code, not copy. `pact.hold`
 *  promises nobody anything. */
const IDENTIFIER = /^[A-Za-z][\w-]*(?:\.[\w-]+)+$/;

export type FilterVerdict =
  | { ok: true; text: string }
  | { ok: false; reason: string };

/** Blank out the parts we are allowed to quote, keeping the length the same
 *  so that any offsets we report still line up with the original. */
function maskQuotes(text: string): string {
  return text.replace(QUOTED, (m) => " ".repeat(m.length));
}

/**
 * Decide whether a piece of model prose may be shown.
 *
 * Returns the trimmed text when it passes, or the name of the rule that
 * caught it when it does not. The caller never shows the rejected text; it
 * falls back to the engine's own words.
 */
export function assertNoAdvice(text: string): FilterVerdict {
  const body = text.trim();
  if (!body) return { ok: false, reason: "empty" };
  if (IDENTIFIER.test(body)) return { ok: true, text: body };

  const scan = maskQuotes(body);

  const imp = IMPERATIVE.exec(scan);
  if (imp && !isNegated(scan, imp.index, imp[0].length)) {
    return { ok: false, reason: "imperative" };
  }
  for (const [reason, re] of BANNED) {
    const m = re.exec(scan);
    if (m && !isNegated(scan, m.index, m[0].length)) {
      return { ok: false, reason };
    }
  }
  return { ok: true, text: body };
}


const MAX_CHARS = 700;
const MAX_WORDS = 120;

/**
 * Take the formatting out of a model's answer before it is filtered.
 *
 * Models like to add links, code fences and markdown emphasis. None of that
 * belongs on these screens: a link we did not choose is a link we cannot
 * vouch for, and `src/data/official-links.ts` is the only place links come
 * from.
 */
export function cleanModelText(raw: string): string {
  let t = raw;
  t = t.replace(/```[\s\S]*?```/g, " "); // fenced code
  t = t.replace(/`([^`]*)`/g, "$1"); // inline code, keep the words
  t = t.replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1"); // markdown links, keep the label
  t = t.replace(/\bhttps?:\/\/\S+/gi, " "); // bare urls
  t = t.replace(/\b(?:www\.)[^\s)]+/gi, " ");
  t = t.replace(/<[^>]+>/g, " "); // any tags, including a stray </message>
  t = t.replace(/[*_#>]+/g, " "); // markdown furniture
  t = t.replace(/[ \t]+/g, " ");
  t = t.replace(/\n{3,}/g, "\n\n");
  t = t.trim();

  const words = t.split(/\s+/);
  if (words.length > MAX_WORDS) t = words.slice(0, MAX_WORDS).join(" ") + " …";
  if (t.length > MAX_CHARS) t = t.slice(0, MAX_CHARS).trimEnd() + " …";
  return t;
}

/**
 * The whole gate in one call: tidy it, then judge it.
 *
 * `null` means show the engine's explanation and nothing else. Every caller
 * must handle `null` as an ordinary outcome, not an error.
 */
export function filterModelText(raw: string): string | null {
  const verdict = assertNoAdvice(cleanModelText(raw));
  return verdict.ok ? verdict.text : null;
}
