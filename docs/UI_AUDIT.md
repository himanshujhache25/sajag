# UI audit — what was wrong, where it came from, what replaced it

Written before the rebuild, from reading the code behind the home-screen
screenshot. Each row is a defect from section 0 of `docs/UI_SPEC.md`, the file
and line that produced it, and the fix. Everything here is now done unless the
status says otherwise.

| # | Defect | Where it came from | Fix | Status |
|---|---|---|---|---|
| 1 | Everything underlined: tiles, titles, numbers, wordmark, tagline | `src/app/globals.css:112` — a global `a { text-decoration: underline }`, applied to whole-tile links | Global reset `a { text-decoration: none }` in `src/styles/base.css`; a single `InlineLink` component in `src/components/ui/index.tsx` is the only underlined thing in the app | done |
| 2 | No hierarchy; no filled button anywhere on home | `src/app/page.tsx:36–79` — three `LedgerRow`s, one outlined `ButtonLink`, four bare `Link`s, all at the same weight | Home now has exactly one filled button, the composer's "जाँचो". Tiles, quick tiles and footer links step down in weight below it | done |
| 3 | The main action was not on the home screen | `src/app/page.tsx` had no input; the composer lived only on `/check` | `Composer` extracted to `src/components/ui/composer.tsx` and placed on Home above the fold | done |
| 4 | The mic button looked disabled | `src/app/page.tsx:62` — a `kind="secondary"` full-width `ButtonLink` wrapping a blue underlined label | The mic is now one of three cells in the composer toolbar, each 56px with icon over word, and it turns `--danger-tint` with a red dot while listening | done |
| 5 | Tiles did not look tappable; "1. 2. 3." read as a ranking; a lone red tick; weak icons | `src/components/ledger.tsx` `LedgerRow` (`n`, `mark` props) and the phone/clock icons in `src/app/page.tsx:42–57` | `ActionTile`: 92px, 1.5px `--edge` border, 3px hard bottom edge, a 56px tinted icon plate, a tone left bar and a chevron. Numbers and the tick are gone. New `lifebuoy` and `pause` icons replace the phone and the clock | done |
| 6 | A pile of blue words for navigation | `src/app/page.tsx:74–79` | Replaced by a 3-up `QuickTile` grid and a four-item `TabBar`; the vague "खुद चलाकर देखिए" is renamed to "नुकसान का गणित" and moved into `/more` | done |
| 7 | Header was a tiny wordmark plus two unlabelled icons | `src/components/shell.tsx:47–73` — `GlobeIcon` and `LedgerIcon`, both icon-only, no language name, no text-size control | New `Header` in `src/components/ui/nav.tsx`: 30px serif wordmark with the red dot, tagline, a `LanguageChip` showing the language's own name, and a round text-size button that cycles 100/125/150 with a snackbar. Double rule beneath | done |
| 8 | Accidental typography: fake-bold sans headings, no serif, system fonts only | `src/app/globals.css:76–91` — `--font-sans: system-ui…`, `h1,h2,h3 { font-weight: 600 }` on a serif stack that was never loaded | Self-hosted Mukta (400/600) and Tiro Devanagari Hindi (400) via `next/font/local` in `src/fonts/index.ts`; `font-synthesis: none`; full scale in `--t-*` tokens; `--script-scale` 1.055 for Devanagari | done |
| 9 | Uneven spacing, dead space above the footer | Ad-hoc `mt-4`/`mt-5`/`mt-6` throughout `src/app/page.tsx` | A 4–64px scale and named rhythm classes in `src/styles/components.css`; 32 between sections, 12 between tiles; the footer sits at the end of content with the tab bar below it | done |
| 10 | Dull palette, dark-first | `src/app/globals.css:5–30`, and `theme-boot.js` defaulting to `auto` | New semantic token set in `src/styles/tokens.css`; light is the default in `DEFAULTS.theme` and in `theme-boot.js`; dark is a deliberate "night ledger", not an inversion | done |
| 11 | Footer disclaimer and links small, grey, underlined | `src/components/shell.tsx:94–100` — `text-[0.76rem]` | `Footer` in `nav.tsx`: 14px disclaimer, 16px/600 `InlineLink`s with 48px targets | done |
| 12 | Red "Issue" badge from a hydration mismatch | `src/app/page.tsx:18–30` — `useNow()` fed `new Date()` into the tip of the day and the late-night line during render | Both are computed in an effect and the first paint renders a stable placeholder; `<html>` carries `suppressHydrationWarning` for the boot script alone | done |

## Rebuilt so far

- Foundations: `src/fonts/*`, `src/styles/tokens.css`, `src/styles/base.css`,
  `src/styles/components.css`, `src/app/globals.css`, `src/components/icons.tsx`.
- Primitives: `src/components/ui/index.tsx`, `overlay.tsx`, `nav.tsx`,
  `composer.tsx`.
- Screens: shell and tab bar, Home, Check, Result, More.

## Still to rebuild

Start, Madad landing and wizard and plan, Pause landing, pact, breaker and
journal, Learn index and concept, Simulate, Family and the card, Settings and
the privacy ledger, History, About, offline, 404 and error. They render in the
new colours and fonts already, because the Tailwind aliases in `globals.css`
point the old `paper`/`nib`/`stamp` names at the new tokens, but their layout
is still the old one and each needs converting to the primitives.
