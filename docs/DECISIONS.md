# Decisions

One line each: date, decision, reason.

- 2026-10-02. Build in `sajag/` inside the SANGYAN workspace. Keeps the brief
  files and the product separate.
- 2026-10-02. Tailwind v4 with `@theme inline` over a `tailwind.config.ts`.
  v4 is the scaffold default and the theme is only our tokens either way.
- 2026-10-02. Removed the scaffold's Geist Google fonts. Section 5.1 bans web
  fonts; the system stack costs no network.
- 2026-10-02. Extra dev dependencies beyond the allowed list: `vite`,
  `@vitejs/plugin-react`, `jsdom`, `prettier`. Vitest needs the first three to
  run React components; Prettier is named in section 1.4.
- 2026-10-02. Installed test tooling with `--legacy-peer-deps`. Testing Library
  has not widened its React 19 peer range yet; nothing in the app depends on it.
- 2026-10-02. Settings live in `localStorage`, user data in IndexedDB. Settings
  must be readable before first paint to set the theme; no cookies are used.
- 2026-10-02. The theme boot script is a file (`/theme-boot.js`), not an inline
  script, so the CSP needs no script nonce or `unsafe-inline` in production.
- 2026-10-02. CSP keeps `style-src 'unsafe-inline'` because Next inlines
  critical CSS. The compromise is recorded here as section 10 asks.
- 2026-10-02. PWA icons are SVG. Chrome accepts them for installability and
  they cost about 600 bytes instead of 30 KB of PNG.
- 2026-10-02. `/dev/gallery` returns 404 in production through a layout check,
  rather than a build-time exclude, which Turbopack does not offer cleanly.
- 2026-10-02. `NOT_ENOUGH_TO_GO_ON` sits off the ruler (notch 0) rather than at
  the first notch, so "we could not tell" never reads as "nothing found".
- 2026-10-02. Settings live in a module store read with `useSyncExternalStore`,
  not React context. React 19's lint rule forbids setting state in an effect,
  and the store also lets `/theme-boot.js` apply the theme before hydration.
- 2026-10-02. `public/**` is outside ESLint. The service worker and the theme
  boot script are plain browser files with their own globals, not bundle code.
- 2026-10-05. `stateFor` reads the rounded probability, not the raw float. A
  verdict that prints 0.70 must not sit in the band below 0.70.
- 2026-10-05. The eight language packs all run on every message. A Bengali
  phrase in a Hinglish sentence is common, and matching costs microseconds.
- 2026-10-05. The five newer packs (mr, bn, ta, te, gu) carry only the first
  eight concepts and are marked `needsReview`. Partial and honest beats
  complete and wrong.
- 2026-10-05. OCR runs in `tesseract.js` with `eng`+`hin` only. More languages
  would cost megabytes of traineddata on a phone that may be metered.
- 2026-10-05. The message text is painted with React nodes and a `<mark>`, never
  with `dangerouslySetInnerHTML`. The input is hostile by definition.
- 2026-10-05. Feedback ("this reading felt wrong") is saved on the phone and
  never sent. We would rather lose the telemetry than break the promise.
- 2026-10-05. `script-src` now allows `'unsafe-inline'`. The App Router streams
  every page through inline bootstrap scripts; with them blocked the app
  served correct-looking HTML and no button ever worked. A nonce would force
  every page to be rendered per request and break the offline precache. The
  message is painted with React nodes and never as HTML, so the injection
  route this directive guards is closed anyway. Found by journey J1, which is
  exactly why the brief asks for journeys and not only unit tests.
- 2026-10-05. The root layout no longer writes its own `<head>`; the boot
  script sits at the top of `<body>` and the App Router owns the head.
- 2026-10-05. The handover from `/check` to `/check/result` is mirrored in
  `sessionStorage`. With the network off the client navigation falls back to
  a full page load, which empties a module-level variable. sessionStorage
  dies with the tab, so nothing outlives the sitting.
- 2026-10-05. `/check` prefetches `/check/result` on mount, so the chunks the
  verdict page needs are in the service worker's cache before the person
  walks into a basement.
- 2026-10-05. Playwright never reuses a running server. A stale `next start`
  on port 3000 silently served an old build and cost an afternoon.

## Design review, end of Phase 2

Walked `/`, `/check`, `/check/result` and `/history` at 320 px with the network
off, in Hindi, at the largest system text size.

- Kept: the stamp carries a word, never only a colour; the ruler has four
  notches and no needle; every number is followed by what it is a number of.
- Fixed: the home row of links wrapped badly once `पुरानी जाँच` was added, so
  it is now `flex-wrap`.
- Fixed: the family note had three equal buttons and no clear first move.
  `नतीजा भेजें` is now the one primary button; WhatsApp and SMS stayed as the
  fallbacks for a phone without the share sheet.
- Fixed: the ledger table's first column header said "Listen". It now says
  "कब" / "When", and the `what` column is a translated key rather than a
  stored English string.
- Fixed, and the worst of the lot: nothing on any page was clickable, because
  the Content Security Policy blocked Next's own inline scripts. The pages
  looked perfect and were stone dead. Unit tests could not see it; the first
  journey found it in one run.
- Accepted for now: the result page is long. The fold for details and the
  numbered sections keep it walkable, and section 6 asks for the full
  reasoning to be reachable, not hidden.
- Accepted for now: read-aloud depends on the browser's Hindi voice. When
  there is none the button is not rendered at all, rather than failing.

- 2026-10-05. The Madad wizard writes every answer to the phone the moment it
  is given, not on "next". Someone who has just lost five lakh rupees should
  never also lose their own transaction ID to a mistyped tap.
- 2026-10-05. The plan is built by a pure function from the case file, so the
  bank step only appears if money actually moved as a transfer and the
  uninstall step only if an app was involved. A plan full of steps that do not
  apply is a plan nobody follows.
- 2026-10-05. The plan says in as many words that SEBI's complaint route
  generally does not cover an unregistered entity. Letting someone wait 21
  days for a reply that cannot come would be its own small cruelty.
- 2026-10-05. The 21-day follow-up is an `.ics` download, not a notification.
  A calendar file needs no permission, no background worker and no promise we
  would have to keep after the tab closes.
- 2026-10-05. Amounts are grouped by hand (`groupIndian`) rather than by
  `Intl.NumberFormat`, because the grouping has to be right mid-keystroke on a
  partial number, before it is a number at all.
- 2026-10-05. Signing the pact is a 1.5-second press with an ink fill, so no
  one signs their own rules by brushing the screen. Enter signs in one press,
  and a checkbox is offered, because a tremor must not be a barrier.
- 2026-10-05. The breaker's sixty seconds can be skipped after ten, and the
  "I will go ahead anyway" exit is always there. We slow people down; we never
  block them, and we never scold.
- 2026-10-05. The journal insight counts and nothing more ("3 of your 5
  decisions began in a group"). It is the person's own data read back, so it
  stays a count, never a suggestion.
- 2026-10-05. The print stylesheet sets an `@page` of A4 with 18mm margins and
  hides the shell through `header[data-shell]`. The plan is carried into a
  police station, so it has to survive a cheap printer in any script, which
  the system font stack already does.
- 2026-10-05. The service worker version moved to `sajag-v2`. A precache list
  only takes effect on install, so adding routes without bumping it leaves
  every returning phone on the old shell.

## Design review, end of Phase 3

Walked `/madad`, `/madad/plan`, `/pause/*` and `/family` at 320 px, in Hindi,
with the network off, and printed the plan to A4.

- Kept: one emergency button in the whole product, and it is a real `tel:1930`
  link. Nothing else is stamp red.
- Kept: the wizard's progress is a ruler with six notches, not a percentage.
- Fixed: `/madad/plan` opened blank with the network off. The client
  navigation degraded to a full page load, and the route was not in the
  precache. Fixed with a prefetch on `/madad` and a service worker bump,
  the same shape of bug J1 found in Phase 2.
- Fixed: the A4 print was carrying the header, the footer and every button.
  They are now `no-print`, and inputs print as thin black rules so a filled
  form reads as a filled form.
- Accepted for now: the breaker holds someone for ten seconds before the skip
  button wakes up. That is the whole point of the room, and the exit is
  visible the entire time.
- Accepted for now: `/family/card` and the install diagrams are plain line
  drawings. The safety-card canvas is Phase 4, as the brief allows.

## Phase 4

- 2026-10-02. The twelve concept cards live in `src/content/learn/*.ts`, not
  in the language packs. They are prose with a shape, not interface strings,
  and a translator needs to read a whole card at once.
- 2026-10-02. Hindi and English are written by hand, side by side. Any other
  language falls back to Hindi with `needsReview: true`, and the index says so
  in a line rather than silently showing Hindi under a Tamil heading.
- 2026-10-02. `/learn`'s search is a plain scorer in `searchConcepts`: a title
  hit beats a keyword hit beats a body hit, and every word of the query has to
  land somewhere. It runs with the net off, which a model cannot.
- 2026-10-02. Every card carries a `search` list, so someone can type
  "मार्जिन" and reach a card titled "उधार और मार्जिन" without fuzzy matching.
- 2026-10-02. `/learn/[id]` is a small server page with
  `generateStaticParams` and `dynamicParams = false` around a client view, so
  all twelve pages are built ahead of time and can be precached by name.
- 2026-10-02. The quiz answer is held as `{card, option}` and compared during
  the render, not cleared in an effect. Changing card or language forgets the
  answer without any state being set from an effect.
- 2026-10-02. No score is kept anywhere, and nothing about the quiz is
  written to the phone. Section 8.7 asks for feedback, not marks.
- 2026-10-02. `/simulate` uses mulberry32 with a fixed first seed
  (`20260101`). A fixed seed means the server and the phone draw the same
  first picture, and the seed on screen means someone can show a friend
  exactly what they saw.
- 2026-10-02. The walk is driftless on purpose. Adding any drift would be a
  claim about markets; the point being made is about leverage and costs.
- 2026-10-02. A run ends at zero and stays there, because that is what a
  broker does. The loan surviving the capital is said in words, not modelled.
- 2026-10-02. The chart is twenty `<polyline>`s and two `<line>`s. No chart
  library, no tooltips, no ticker. The same numbers are printed as text and
  as the SVG's `aria-label`.
- 2026-10-02. Service worker bumped to `sajag-v3` and the twelve concept
  pages added to the precache by name, with a note to keep the list in step
  with `CONCEPT_IDS`.

## Design review, end of Phase 4

Walked `/learn`, all twelve cards and `/simulate` at 320 px, in Hindi, with
the network off.

- Kept: every card has the same five parts in the same order, so the second
  card is already familiar.
- Kept: "यह जानकारी है, सलाह नहीं।" sits at the foot of every card, and the
  made-up-numbers banner sits above the chart on every run, not once at the
  top of the page.
- Fixed: `/simulate` loaded offline but did not react to the slider. The HTML
  was precached; its JavaScript had never been fetched. A `router.prefetch`
  on `/learn` fixed it. This is the third time a route has looked perfect
  online and been dead offline, and the third time only a journey test saw
  it. Precaching a page's HTML is not the same as having its code.
- Accepted for now: the "ask in your own words" box in section 8.7 is not
  built. The local search answers the same questions offline today, and the
  model layer behind it is still ahead of us.

## The safety card and /about

- 2026-10-02. The card is drawn on a canvas on the phone. No image service,
  no server render, and it works with the network off.
- 2026-10-02. `wrapText` takes its measurer as an argument, so the wrapping
  can be tested with a fake one and `card.ts` never needs a canvas to be
  checked. A word longer than the line is left whole: a UPI id or a URL has
  to stay readable even if it overhangs.
- 2026-10-02. The card reads its colours off the live page, so it comes out
  in whatever theme and contrast the person is actually using.
- 2026-10-02. The five lines are also on the page as real text. A picture
  alone is unreadable to a screen reader and useless to anyone who cannot
  see it.
- 2026-10-02. `navigator.canShare({ files })` is checked before sharing. A
  share sheet that silently drops the image is worse than a download.
- 2026-10-02. `saveBlob` is one shared helper in `src/lib/save-blob.ts`. The
  anchor has to be inside the document and the object URL has to outlive the
  click, and `downloadIcs` had been getting both wrong since Phase 3.
- 2026-10-02. `/about` lists every fact with its source and date, and says
  plainly that the registry names in this prototype are fictional.
- 2026-10-02. Playwright is pinned to three workers. Six emulated phones on
  one laptop starved each other and a journey failed on a timeout rather
  than on anything real.

## Design review, end of the card and /about

- Kept: the "what Sajag is not" list is longer than the "what Sajag is"
  list, and it is the second section on the page, not the last.
- Fixed: `/family/card` drew nothing offline. The page was precached; its
  code had never been fetched. A prefetch on `/family` fixed it. This is the
  fourth time. Any new route reached by a client navigation now needs a
  prefetch from wherever people arrive from, and that is written into
  `docs/DECISIONS.md` as a standing rule rather than remembered.
- Fixed: the first version of J6 counted "dark" pixels to prove the card had
  been drawn. An untouched canvas is transparent black, so a completely
  blank card sailed through. It now checks alpha first. A test that cannot
  fail is worse than no test.
- Fixed: `downloadCard` and `downloadIcs` both built an anchor, never
  attached it, clicked it and revoked the URL in the same turn. Nothing was
  ever saved. No unit test could have seen this.
- Accepted for now: one assertion in J6 compares text after Unicode
  normalisation. The same Devanagari sentence has two byte spellings and a
  journey should not fail over which one an editor happened to write.

## The model layer

- 2026-10-02. The default provider is `none`, and the app is complete with
  `none`. Every screen produces its answer on the phone. A model only ever
  adds a paragraph beside work that is already finished and already shown.
- 2026-10-02. `enrichVerdict` copies the state, the probability and the hard
  stop through untouched and never recomputes them. It is one short function
  so that there is exactly one place to look when someone asks whether a
  model can change the answer.
- 2026-10-02. A model signal is accepted only if the words it quotes are in
  the message character for character. At most two survive, each capped at
  p 0.20, and all of them are forced to `moderate` however they were
  labelled. A model that cannot quote the message is not reading it.
- 2026-10-02. `assertNoAdvice` rejects a whole answer rather than editing it
  into line. Half-trusting a model is worse than not using one.
- 2026-10-02. The same filter runs over our own language packs and concept
  cards in `copy-lint.test.ts`. A rule we will not keep ourselves is not a
  rule.
- 2026-10-02. The filter understands negation and quotation. "Nobody can
  guarantee a profit" is the sentence this app exists to say, and a scanner
  that cannot tell it from "guaranteed profit" would gag us on our own
  warnings. Quoted spans are skipped, which is also why the promise options
  in `/madad` now carry quotation marks: they are reported speech.
- 2026-10-02. Model prompts mark the person's text as data inside `<message>`
  tags and say so in words. The adversarial test feeds real injections
  through and asserts the verdict is unmoved.
- 2026-10-02. Keys and model names come from the environment. A hard-coded
  model is a model that will be retired while nobody is looking.
- 2026-10-02. Six-second timeout, no retry. Someone who already has their
  answer does not want us trying again.
- 2026-10-02. Routes never log message text, and `logFailure` takes a reason
  we chose rather than an exception, because a parser's error message can
  contain the text that failed to parse.
- 2026-10-02. The ask box lives on the concept page, not the index. The
  card is chosen by the on-device search and the model is told to use only
  that card, so the restriction in section 7.8 is real rather than claimed.
  With no provider configured it renders nothing.

## Design review, end of the model layer

- Kept: the ask box has no thread and no history. One question, one answer,
  and asking again replaces it. Section 8.7 says never a chat window.
- Fixed: the first draft of the filter treated "enter" and "exit" as trading
  verbs and flagged "Enter the number on SEBI's site." A rule that cries
  wolf on good copy gets switched off, and then it protects nothing.
- Fixed: the first negation list counted reporting verbs, so "The message
  says X. It is safe to invest with them." passed. Reported speech is
  handled by quotation masking, where it can be seen; only real negation
  belongs in that list.
- Fixed: the quote characters in the filter were written literally and were
  flattened to ASCII somewhere between editor and disk, silently disabling
  the rule. They are escapes now. An escape cannot be mangled by accident.
- Fixed: two strings used "safe" to mean "not lost" on the error screen. In
  this app that word means safe from a scam, and spending it on a saved
  draft blunts it.
- Fixed: J6's five-second wait for a 1080x1350 PNG was a coin toss under
  load. It is twenty now. Waiting longer costs nothing when it passes.
- Accepted for now: the rate limit is per-process, so several instances will
  let through several times twenty a minute. It exists to stop a loop
  becoming a bill, not to stop an attacker, and the comment says so.
- Accepted for now: `/api/stt`, `/api/tts`, `/api/rdap` and the radar routes
  from section 7.10 are not built. Speech works through the browser on the
  phone, and the rest are enrichments nothing currently depends on.

## Evaluation, and two false alarms it found

- 2026-10-02. `npm run eval` found a mistake no unit test had: the Hindi
  warning "चेतावनी: कोई भी सेबी अधिकारी आपसे पैसे नहीं माँगता" came out as
  `HIGH_RISK` with a hard stop. Someone forwarding a safety warning to help
  a relative was told they were being robbed. This is the worst mistake this
  engine can make and it was sitting in the corpus the whole time.
- 2026-10-02. The cause: S05 finds its persona with its own regular
  expression, so it never went through the negation and warning-frame check
  that every lexicon hit goes through. The check is now exported as
  `meansIt` and applied. Any signal that matches text by itself has to ask
  the same question.
- 2026-10-02. `NEGATORS` had no "nobody" or "none", so "Nobody can guarantee
  returns" read as a guarantee. The same gap as in the output filter, found
  the same week, in a different file. Worth knowing that negation is where
  this kind of system goes wrong.
- 2026-10-02. False alarm at `MULTIPLE_RED_FLAGS` on clean messages fell
  from 4.8% to 2.4%, and the one `HIGH_RISK` false alarm is gone. Recall is
  unchanged at 95%, and all nine golden messages still match.
- 2026-10-02. `warnings.test.ts` pins both bugs, and also pins that the same
  persona is still caught when it is used in earnest. A fix that only
  removes false alarms is half a fix.
- 2026-10-02. `docs/EVAL.md` now carries a "known limitations" section, and
  `scripts/probe.ts` is wired to `npm run probe` so the next person can ask
  the engine what it saw in one line instead of writing a throwaway script.

## Design review, end of the evaluation pass

- Kept: the remaining false alarm. "If someone promises assured profit, that
  itself is the warning sign" reads as a promise, because the engine checks
  negation and warning frames but does not parse clauses. Narrowing a rule
  until one corpus row passes makes the engine worse on messages nobody has
  written yet, so it is written down in `docs/EVAL.md` instead.
- Kept: "कोई" was left out of the negator list. It means "any", not "no",
  and the Hindi case it would have fixed is already handled by the trailing
  "नहीं". A negator list that is slightly wrong is worse than one that is
  slightly short.
- Fixed: an empty `src/lib/engine/probe.test.ts` was tracked and failing the
  suite with "no test suite found". Scratch probe files are now in
  `.gitignore`, and the real probe tool has a name and a script.
- Accepted for now: every number in `docs/EVAL.md` comes from a corpus we
  wrote ourselves. It says the engine behaves as designed on messages we
  thought of, which is not the same as field accuracy, and the file says so
  in those words.

## Home, and the other ten languages

- 2026-10-04. `/` was the Check composer, so the app opened on a tool and
  never explained itself. Someone arriving from a forwarded link saw an empty
  box. `/` is now a Home page and the composer lives only on `/check`, which
  also means exactly one place in the app holds a half-typed message. The old
  ambiguity — two boxes, two drafts, no rule about which one wins — is gone
  with it.
- 2026-10-04. Home's quick-entry card is a *link that looks like the ruled
  sheet*, not a second textarea. A dead textarea on Home would have been a
  trap: people type into what looks like a box, and then the text either has
  to be carried to `/check` or thrown away. A door that resembles the room
  behind it is honest and has no state to lose.
- 2026-10-04. The four "common traps" rows open the real golden messages in
  the real composer (`/check?sample=G1`), not a canned verdict page.
  Recognition teaches faster than instruction, and ending on the same button
  the person would press for their own message is the whole lesson. Every
  sample is labelled "नमूना" on screen, every time.
- 2026-10-04. One slot on Home swaps with use: "three steps" until the first
  real check, then "last check". Instructions stop being news after the first
  reading, and what a returning person wants is the thing they looked at.
  Both are rendered after mount, with no reserved height, so the top of the
  page never moves under a thumb already travelling.
- 2026-10-04. At most one priority note above the hero, never three stacked.
  A screen that shows the late-night line, the open case and the pact at once
  has told the person nothing about which matters.
- 2026-10-04. Twelve languages, not seven. The ten new packs are
  machine-assisted, carry the screens a person cannot avoid (tabs, Home, the
  composer, the verdict stamps, settings) and fall through to **English**, not
  Hindi, for the long-form copy. A Tamil reader meeting an untranslated line
  is likelier to read English than Devanagari, and the mixed script makes the
  gap visible instead of hiding it. The picker marks every one of them
  "(beta)" rather than shipping them as finished work.
- 2026-10-04. The picker shows each language in its own script *and* its
  Latin name. The person whose phone it is recognises their language at a
  glance; the son setting up his mother's phone can find Odia without
  reading Odia.
- 2026-10-04. On first run only, the app opens in the phone's own language if
  it is one of the twelve. Someone whose phone is already in Malayalam should
  not have to find the picker in a script they cannot read. Hindi remains the
  fallback. This moved the default off Hindi for an `en-US` browser, which is
  why the Playwright suites now pin the language explicitly rather than
  leaning on the runner's locale.
- 2026-10-04. Font stacks are chosen by **script**, not by language, so Hindi
  and Marathi share one and Punjabi gets Gurmukhi. Mukta stays in every stack
  so the Latin inside an Indic sentence ("OTP", "SEBI", "1930") still renders
  in the app's own face. Indic matras sit above and below the baseline, so
  leading is lifted per script (`--script-line`) rather than padding every
  line in the app for the worst case.
- 2026-10-04. Urdu sets `dir="rtl"` on `<html>`, before first paint, in
  `theme-boot.js`. Only direction-bearing icons are mirrored: a stamp, a tick
  and a lock mean the same both ways and read as broken when flipped. A
  pasted message is set `unicode-bidi: plaintext`, because a scam message is
  usually English or mixed and reordering the link and the amount inside it
  would destroy the one detail the person is trying to read.
- 2026-10-04. Digits stay Latin and left-to-right in all twelve languages.
  Someone comparing the number on screen with the number in the message
  should not have to transliterate it first.
- 2026-10-04. Fixed: the skip link was parked at `left: -9999px`. In Urdu
  that offset is *inside* the scrollable area, so the document gained a
  ten-thousand-pixel horizontal scroll and every control went off screen. It
  is clipped now, which works in both directions.
- 2026-10-04. Fixed with the move: the composer's drag handle (`resize` is
  `none`; it still grows with the text) and its ruled lines, which were a
  fixed 32px against a scaling line height and drifted off the words at 125
  and 150 percent text. Both are `2rem` now and scale together.
- 2026-10-04. Five of the twelve languages (Urdu, Punjabi, Kannada, Malayalam,
  Odia) had no scam lexicon at all, so an Urdu scam message came back
  "nothing strong found" — a clean bill of health for a fraud. The packs now
  exist and `lexicon-coverage.test.ts` fails the build if a language is ever
  added without one. The same test found a pre-existing `SECRECY` gap in
  Marathi, Bengali, Tamil, Telugu and Gujarati.
- 2026-10-04. Translation is tiered rather than all-or-nothing. Every language
  now carries the verdict tier — signal titles, the "why", the basis line,
  claim statuses and the unverifiable notes — which took the nine stragglers
  from 11% to 29%. The long-form Madad and Learn copy still falls through to
  English. This is deliberate: the verdict is what a frightened person reads,
  and it is also the copy where a machine-translation error changes how
  urgent a warning feels, so it was worth doing first and worth marking
  "(beta)" until a native speaker has read it.
- 2026-10-04. Undo instead of "are you sure?". A dialogue asks someone to
  predict whether they will regret something; an undo lets them find out.
  Clearing history and clearing the composer both act immediately and keep
  the pieces for eight seconds. The one exception is "erase everything" in
  Settings, which wipes the store itself — there would be nothing left to
  restore, so its confirmation stays.
- 2026-10-04. The vertical rhythm Home earned is now shared. `.screen` gives
  every page the same rule: the gap between sections is larger than any gap
  inside one, so the spacing itself says where an idea stops. Before this,
  only Home had it and everywhere else sprinkled `mt-8` / `mt-20` / `mt-24`,
  which is why the app read as several apps as you navigated. A Playwright
  test now fails if any direct child of `.screen` carries its own top margin,
  because that margin adds to the gap rather than replacing it.
- 2026-10-04. Screens animate in over 180ms and 10px, and only the container
  moves. Staggering the children would look better and would also mean the
  most important thing on the screen arrives last. The point of the movement
  is to answer "did my tap work?" on a slow phone, not to decorate.
- 2026-10-04. React does not hydrate under `next dev` in this environment:
  pages render but nothing is interactive. Every piece of browser testing has
  to run against `next build && next start`, which is what the Playwright
  config already does. Hours were lost to this before the project's own
  passing e2e suite gave it away.

## axe on every route (SPEC 11.1)

**The audit runs on all 22 routes, not a sample.** `/dev/gallery` is the only
exclusion, because it is stripped from the production build. `/check/result`
is walked into with golden G1 rather than visited directly: its verdict lives
in memory, so a direct visit would audit an empty shell and prove nothing.

**It found five real defects on the first run, on 17 of 34 checks.** One
critical: the camera `<input type="file">` is visually hidden but still in the
tab order, and had no accessible name. Three serious: the `<ul role="radiogroup">`
on `/start` orphaned its own `<li>` children, because overriding the list role
removes the list; `Ruler` rendered `role="progressbar"` with no name whenever
it was used without a label; and the empty-state stamp at `opacity: 0.4` fell
to about 1.8:1 against a 3:1 floor.

**The opacity failure is the one worth remembering.** Every colour token
passes the contrast test, and this still broke, because the opacity was
applied over the top. Testing tokens proves the palette is sound; it does not
prove the rendered pixel is. Only a real browser catches that.

**`target-size` is the single disabled rule, and it is paid for.** It fired
only where the sticky tab bar floated over a row further down the page, never
because a target was small. axe judges one scroll position, and a persistent
bottom bar always covers something at some scroll position, so the rule can
never go green while that bar exists. Instead the file measures every control
directly against SPEC 11.1's **52px**, which is stricter than the 24px axe
enforces. That found four more undersized controls — `.size-btn`, `.icon-btn`,
`.btn-text`, `.quick-paste` and `.check-line` were all at 48px or less.
`.shell-main` now also reserves the bar's height so no control is permanently
trapped underneath it.

Checkboxes are measured by their wrapping `<label>`, because that is what the
thumb can actually hit. Inline links and visually hidden inputs are exempt,
as WCAG 2.5.8 itself exempts them.

## A computed flag that nobody read

`registry.ts` has always marked the INB, INF and INR prefixes as a category it
cannot name. It set `categoryUnverified`, the type carried it, and
`registry.test.ts` asserted it was true. Then `grep -rn "categoryUnverified"
src/` returned nothing outside the file that set it.

So the engine knew something it never said. A person checking an INB number
got a verdict computed with that doubt folded in, and no sentence telling them
the doubt existed. That is the exact failure this product is supposed to be
against: confidence that outruns what is actually known.

`unverifiableList()` now pushes `unverifiable.registrationCategory`, and the
string is in all twelve signal packs. Two new tests assert the caution appears
in `check()` output, and stays absent when the category *can* be named —
because a caution that always fires is noise.

The prefixes stay unnamed on purpose. No human has checked them against SEBI's
current register, and a broker registered today carries INZ. An INB number is
therefore older or odder than it should be: more reason to pause, not less.
Closing this means a person reading SEBI's list and writing down what they
find, which is a research task and not a code change.

**The general lesson:** a test can assert a flag is set and prove nothing
about whether anyone is told. We now prefer to assert on what reaches the
person, not on what the engine computed on the way there.

## Manual QA written down, not performed

`docs/QA.md` is new and deliberately unexecuted. It covers the SPEC 11.4 list:
install to home screen, airplane mode after first load, WhatsApp share target,
microphone in Hindi and English, every read-aloud voice, 150 percent text,
dark mode, print preview of the Madad plan, and a 2 GB device under Slow 4G.

It is written as a checklist with blanks for results, including blanks for the
failures, because a QA sheet returned with nothing on it has not been run. The
last section asks the only question that really matters — whether a person
over fifty reads the "this is not proof of safety" line or stops at the colour
of the stamp.
