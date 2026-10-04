# Sajag · सजग

**रुको · जाँचो · समझो** — Pause · Check · Understand.

A phone-first, offline-first, installable web app that helps first-time and
senior investors in Tier-2 and Tier-3 India spot an investment trap before the
money moves — and walks them through the first hour if it already has.

Built for the **SANGYAN Investor Resilience Hackathon** (SEBI · NSDL · S&T
Council, IIT (BHU) Varanasi). Tracks **A, B, C, D, E** through one coherent
product.

> Sajag gives **no investment advice**. It judges the *source and the form* of a
> message, never the merit of a security. It never says "safe". It never asks
> you to sign up.

---

## What it does

Three doors on the home screen, one product.

| Door | Screen | What happens |
| --- | --- | --- |
| **जाँचो / Check** | `/check` | Speak, paste, or photograph a WhatsApp / Telegram message. In about ten seconds you get a rubber-stamp verdict, a risk ruler, *what to do now* before *why*, the exact words that triggered each flag marked up over your original message, and a never-empty list of what could **not** be checked. |
| **पैसा चला गया? / Already paid?** | `/madad` | A six-step wizard builds a case file, then a first-hour plan: the 1930 call script, the cybercrime portal field list, a SCORES complaint draft, a timeline, and a `.ics` reminder for the day-21 escalation date. |
| **रुको / Pause** | `/pause` | A pre-commitment pact you sign by press-and-hold, a sixty-second cooling-off circuit breaker with a sourced reality card, and a decision journal that surfaces one counted insight from five entries up. |

Smaller rooms:

- **समझो / Learn** (`/learn`) — twelve hand-written concept cards in Hindi and
  English (NAV, nominee, SEBI registration, F&O, compounding, fees…), each with
  an everyday picture, the trap, and one question with feedback on every option.
  Plus an "ask in your own words" box when a model provider is configured.
- **Consequence simulator** (`/simulate`) — 200 driftless random paths with real
  costs, showing what leverage and the `1/(1-L)-1` recovery maths actually feel
  like. Made-up numbers, clearly labelled, with the SEBI F&O facts beside them.
- **परिवार / Family** (`/family`) — set up a parent's phone, name a trusted
  contact, and draw a shareable 1080×1350 safety card on the device.
- **About** (`/about`) — every fact with its source and date, every official
  link, and the data controls.

## Guardrails, in code and not only in copy

1. **No investment advice.** Every string we ship — language packs, concept
   cards, and anything a language model writes — is run through
   `assertNoAdvice` (`src/lib/llm/filter.ts`). `copy-lint.test.ts` fails the
   build if our own copy drifts. The filter understands negation and quotation
   in Hindi and English.
2. **No commercial angle.** No ads, affiliates, referral codes, lead capture, or
   paid tier. The only outbound links are the official sources in
   `src/data/official-links.ts`.
3. **Privacy by design.** No SMS, OTP, contacts, clipboard, location, accounts,
   cookies, or third-party scripts. Text is redacted *before* it is normalised
   (Aadhaar, PAN, Luhn-checked cards, OTPs, account numbers, emails, your own
   phone number). Anything leaving the device is opt-in, shown to you first, and
   written into an on-device **privacy ledger** you can read at
   `/settings/ledger` and erase.
4. **Honest uncertainty.** There is no "safe", no "verified", no green tick.
   Absence of red flags reads as *"nothing strong found, which is not proof of
   safety"*, and the unverifiable list is never empty.
5. **The model can explain; it can never decide.** Verdicts come only from the
   deterministic engine. A model reply is capped at 2 signals and p 0.20, must
   quote verbatim evidence from the message to be accepted, can never set or
   lower a state or a hard stop, and is labelled *"कंप्यूटर ने लिखा"* on screen.
   `adversarial.test.ts` pins this against 22 real prompt injections.
6. **No accusation of named persons.** "This matches known scam patterns", never
   "X is a fraudster".

## How the check works

A pure, dependency-free pipeline in `src/lib/engine/` — no DOM, no Node, no
React, no app imports, enforced by a test. It runs in a Web Worker, falling back
to the main thread, and works with the network switched off.

```
redact → normalise → extract → signals → registry → score → claims → lens
```

- **normalise** — NFKC, zero-width strip, Indic digits, spaced and dotted
  letters, leetspeak folded only onto real words, letter runs squeezed, lakh and
  crore, language guess, sentence split, warning-frame detection, and an offset
  map back to the original so every mark lands on the right character.
- **extract** — URLs, domains, phones by series, UPI handles by category,
  WhatsApp and Telegram, `IN[A-Z]` and `IN-DP` registration numbers, ARN,
  claimed entity names, amounts, percentages with periods, app mentions, and
  tip-format detection that never keeps the security's name.
- **lexicons** — en, Hinglish and hi in full (15 concepts); mr, bn, ta, te, gu
  for the first eight, marked `needsReview` so the UI says "(beta)". Negation is
  read on both sides, because Hindi puts the negator after the verb.
- **domains** — lookalikes by edit distance and brand token, raw IPs, punycode,
  shorteners, suspicious TLDs, official-list membership.
- **registry** — all six verified SEBI prefixes, the three unverified ones
  refused by name, every status, token-set name matching, and a stale-snapshot
  note. **The registry data is 30 fictional demo entities**, not a live SEBI
  feed; the app says so on screen.
- **signals / score** — 28 negative signals and 4 positives, combined with a
  noisy-or. A hard stop always wins; positives never override a hard stop and
  never, on their own, produce a reassuring state.

### Measured, not asserted

`npm run eval` replays a 9-message golden set and a 120-message synthetic corpus
and writes `docs/EVAL.md`, which carries its own known-limitations section.

| | Result | Target |
| --- | --- | --- |
| Recall | **95.0%** | ≥ 90% |
| False alarm at *multiple* | **2.4%** | ≤ 5% |
| False alarm at *some* | **11.9%** | ≤ 15% |
| Golden set | **9 / 9** | 9 / 9 |

Two false alarms were found *by* the eval and fixed in the engine, with
`warnings.test.ts` pinning both.

## Bharat-first, by construction

- **Hindi and English** language packs with a key-parity test, a no-emoji test,
  and English fallback. Seven more languages in the engine lexicons.
- **No web fonts.** System font stack with the Noto Indic families, so there is
  zero network cost and correct shaping for Devanagari, Bengali, Tamil, Telugu
  and Gujarati.
- **Offline first.** A hand-written service worker precaches 35 routes. The
  check, Learn, the simulator, the pact and the journal all work with the
  network off — Playwright asserts it.
- **Text size, high contrast, dark, and simple mode**, stored on the phone. A
  test computes the contrast of every text/surface pair and fails under 4.5:1
  (7:1 in high contrast).
- **Read-aloud** with the phone's own voices. The button is simply absent when
  there is no voice, rather than failing.
- **Photo OCR** on the device with `tesseract.js` (`eng`+`hin`), greyscale and
  contrast-stretched on a canvas first, with a low-confidence warning.
- **Share target** in the manifest, so a forwarded WhatsApp message can be sent
  straight into Sajag.
- 52px minimum touch targets, one column, 560px maximum width, and an A4 print
  stylesheet for the plan and the case file.

## Design

Every screen is a page from a **bahi-khata**, a shopkeeper's ledger. Verdicts are
rubber stamps, records are entries, risk is a ruler. Cream paper, ink, a red
margin line, and a 1.5px border — no gradients, no glass, no chatbot bubble. The
24 icons are hand-written inline SVG; there is no icon library. The palette is
defined once as CSS variables and Tailwind is wired to those tokens only.

## Running it

```bash
cd sajag
npm install
npm run dev          # http://localhost:3000
```

Node 24 or newer (there is an `.nvmrc`). Nothing needs configuring: with no
environment variables at all the whole product works, because the check runs on
the device and the two server routes answer `501`, which the app handles
quietly.

To enable the optional explain-only model layer, copy `.env.example` to `.env`
and fill it in.

```bash
npm run verify   # lint + typecheck + 488 unit tests + production build
npm run e2e      # 6 Playwright user journeys on a Pixel 7 profile
npm run eval     # replay the corpus and rewrite docs/EVAL.md
npm run probe -- "your message here"   # ask the engine what it saw
```

### Deploying

The app is a standard Next.js App Router project and deploys to Vercel,
Cloudflare, or any Node host with no further setup. Security headers (CSP,
Referrer-Policy, `nosniff`, Permissions-Policy) ship from `next.config.ts`.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 wired to
the ledger tokens only · Vitest · Playwright · `tesseract.js` for on-device OCR ·
`tldts` · `zod` · `idb-keyval`. No UI kit, no icon library, no analytics, no
tracker, no font CDN.

## Repository map

```
src/lib/engine/   the pure check pipeline, lexicons, registry, signals, scoring
src/lib/llm/      provider, prompts, output filter, evidence acceptance, limits
src/lib/i18n/     language packs and t()
src/content/      the twelve concept cards, in Hindi and English
src/components/   Stamp, Gauge, Button, Sheet, LedgerRow, NotepadInput …
src/app/          35 routes
eval/             the golden set and the 120-message corpus
e2e/              six end-to-end user journeys
docs/             SPEC, DECISIONS, PERSONAS, EVAL, VERIFY
```

`docs/SPEC.md` is the specification the whole thing was built from, and
`docs/DECISIONS.md` records what was decided and why, including the mistakes.

## Status and limits

- The SEBI registry is a **fictional 30-entity demo snapshot**. A production
  deployment would read the live SEBI intermediary lists.
- The simulator's numbers are **made up on purpose** and labelled as such on
  screen.
- Languages beyond Hindi and English are marked **(beta)** where the lexicon is
  partial.
- Sajag is a **hackathon prototype. It is not an official SEBI or NSDL app**, and
  that line sits in the footer of every screen.

## Licence

MIT. See [`LICENSE`](LICENSE).
