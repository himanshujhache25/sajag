# Manual QA

SPEC 11.4. The things an emulated phone cannot honestly tell us.

Everything in `npm run verify` and the Playwright suite runs on a simulated
Pixel at 360×740. That catches layout, copy, logic and accessibility markup.
It cannot catch a microphone that mishears Bhojpuri-accented Hindi, a share
sheet that arrives with the text in the wrong field, or a 2 GB phone that
takes nine seconds to load Tesseract. Those need a real device and a person.

**This file has not been executed yet.** Nothing below is a claim about how
the app behaves on real hardware — it is the list of things to find out.
When you run it, put the date, the device and the result next to each line,
and keep the failures in. A QA sheet with no failures on it has not been run.

## Before you start

| | |
|---|---|
| Device | A real Android phone, Chrome. A 2 GB device if one can be found. |
| Network | Chrome DevTools remote debugging, throttled to Slow 4G |
| Build | Production (`npm run build && npx next start`), never `next dev` |
| Language | Start in Hindi, because that is what Rameshwar reads |

A note on the build: React does not hydrate under `npm run dev` in this
project. Pages render and look right, and nothing responds to a tap. If you
QA a dev build you will file a dozen false "button does nothing" bugs.

---

## 1. First load, cold

- [ ] Open the URL on a phone that has never seen it. Time to first readable text on Slow 4G: ______ (budget: under 3s)
- [ ] The language picker is the first thing, before any content
- [ ] Pick Odia. Every screen label changes. The Latin name under each language made it findable without reading the script
- [ ] Switch back to Hindi
- [ ] Nothing asks to sign up, sign in, or allow a notification

## 2. Install to the home screen

- [ ] Chrome offers "Add to Home screen", or the menu item works
- [ ] The icon on the home screen is the Sajag mark, not a screenshot of the page
- [ ] Opening from the icon gives no browser address bar
- [ ] The splash colour matches the app's paper, with no white flash

## 3. Airplane mode, after the first load

This is the one the whole service worker exists for.

- [ ] Load the app once, then turn on airplane mode
- [ ] Home, Check, Madad, Pause, Learn, Family all open
- [ ] Paste a message into Check. **The verdict still appears.** This is the core promise
- [ ] The offline banner is visible and says so in Hindi
- [ ] Something that genuinely needs the network (photo OCR, first time) says it needs the internet, and does not simply hang or fail silently

## 4. Share from WhatsApp

The share target is in the manifest but has never been fired by a real app.

- [ ] Open WhatsApp, long-press any message, Share, choose Sajag
- [ ] Sajag opens on the Check screen
- [ ] **The message text is in the box**, not empty, not truncated, not URL-encoded
- [ ] The "message shared from WhatsApp" line is shown
- [ ] Press Check. The verdict is about the shared message
- [ ] Try it with a message containing an emoji, and one containing a link

## 5. Microphone

Two languages, because the engine guesses language from what it hears.

- [ ] Tap Speak. The permission prompt appears once
- [ ] Deny it. The app says the microphone is blocked and offers paste instead — it does not just sit there
- [ ] Allow it. Speak a Hindi scam line. The text that lands is close enough to check
- [ ] Speak an English line. Same
- [ ] Speak nothing for ten seconds. The app says it heard nothing
- [ ] Turn on airplane mode and tap Speak. It says speaking needs the internet

Note what the recogniser does with Hinglish, because that is what people
actually speak: ______________________

## 6. Read aloud

- [ ] Open a verdict, press Listen. It reads in the chosen language
- [ ] Try every voice the phone offers. List any that are silent, wrong-language, or unbearably fast: ______________________
- [ ] Press Stop mid-sentence. It stops

## 7. Photo and OCR

- [ ] Take a screenshot of a WhatsApp message, then use Photo in Check
- [ ] The progress line moves, and the percentage is not stuck
- [ ] The text extracted is good enough to produce a sensible verdict
- [ ] "The photo never left your phone" is shown
- [ ] On a 2 GB device, note the time from choosing the photo to the verdict: ______ (if this is over ~15s the lazy Tesseract load needs revisiting)
- [ ] Try a blurry photo. It says some words may have been read wrongly

## 8. Text at 150 percent

- [ ] Settings → text size → largest
- [ ] Home, Check, Madad, Settings: no text is cut off, no control is unreachable
- [ ] **Nothing scrolls sideways.** Automated at 320px; confirm on the real screen
- [ ] The tab bar labels still fit

## 9. Dark mode and high contrast

- [ ] Settings → dark. Read the app outdoors or under a bright light
- [ ] The verdict stamp is still legible in dark
- [ ] High contrast on: every border is visibly heavier, no text is washed out
- [ ] Switch the OS to dark while the app is open. Nothing flashes white

## 10. The Madad plan, printed

- [ ] Walk the whole wizard to a plan
- [ ] Print → Save as PDF
- [ ] **The 1930 script is on the first page**, not orphaned onto page two
- [ ] The complaint draft is complete and selectable as text
- [ ] Nothing is cut off at the right margin
- [ ] The tab bar and buttons do not appear in the print

## 11. The journey that matters

Do this one last, in one sitting, without touching anything else. Hand the
phone to somebody over fifty who has not seen the app, and watch.

- [ ] Give them a scam message on WhatsApp and say nothing else
- [ ] Where did they hesitate? ______________________
- [ ] Did they find Check without help? ______________________
- [ ] Did they understand the verdict, or just the colour? ______________________
- [ ] Did they read the "this is not proof of safety" line, or stop at the stamp? ______________________

That last question is the one worth the whole exercise. The product's
honesty is only real if people actually read it.

---

## Found

| Date | Device | Android / Chrome | Issue | Severity |
|---|---|---|---|---|
| | | | | |
