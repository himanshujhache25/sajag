import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

/* ============================================================================
   axe on every route. SPEC 11.1 asks for it by name and the Phase 6 gate
   repeats it, and until now it was the one bar in the spec with no coverage
   at all. Contrast was tested token-pair by token-pair, which is not the same
   thing: that proves the palette is sound, not that the palette survived
   contact with real markup, real headings and real labels.

   Three rules this file keeps.

   Every route, not a sample. The list below is generated from src/app and
   must stay complete; a route nobody audits is exactly where a missing label
   goes to live. /dev/gallery is the one exclusion, because it is stripped
   from the production build and therefore is not a route a person can reach.

   One rule is scoped out, and only after the alternative was measured.
   `target-size` fired on five routes, never because a target was small but
   always because the sticky tab bar floated over a row further down the
   page. axe judges the document at one scroll position, and a persistent
   bottom bar will always cover something at some scroll position, so the
   rule can never go green while that bar exists. The substantive
   requirement — that controls are actually big enough — is therefore tested
   directly at the foot of this file, against SPEC 11.1's 52px rather than
   axe's 24px. `.shell-main` was also given the bar's height as bottom
   padding so that no control is permanently trapped underneath it.

   That is the only exception, it is narrow, and it is paid for with a
   stricter test rather than waived. Everything else gets fixed in the
   markup, because an allowlist here would quietly become the place failures
   go to be forgotten — the same mistake the fuzz spec made with test.skip.

   Failures print the offending selector. A bare count tells you nothing at
   half past eleven; the node list tells you which element to open.
   ========================================================================== */

/* WCAG 2.2 AA, which is what SPEC 11.1 commits to. "best-practice" is left
   out deliberately: it carries opinions (region, heading-order preferences)
   that are not the standard we promised, and mixing them in makes a real AA
   failure harder to see. */
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

/* Reachable by a URL alone. */
const STATIC_ROUTES = [
  "/",
  "/about",
  "/check",
  "/family",
  "/family/card",
  "/history",
  "/learn",
  "/learn/sebi-registration",
  "/madad",
  "/more",
  "/offline",
  "/pause",
  "/pause/breaker",
  "/pause/journal",
  "/pause/pact",
  "/settings",
  "/settings/ledger",
  "/simulate",
  "/start",
];

/* G1 from SPEC 11.2, the golden Hinglish message. Used to drive the check
   journey so that /check/result is audited with a real verdict on it rather
   than an empty shell. */
const G1 =
  "Namaste sir! Hamare VIP Premium group me judiye https://chat.whatsapp.com/DEMOcode123 . Daily 5-10% guaranteed profit, 100% sure shot calls. SEBI registered analyst INH000999999. Sirf 20 seats bachi hain, aaj hi join karein. Registration fee Rs 5000 UPI: rajesh.trade@okaxis";

type Settings = { lang?: string; textScale?: number; contrast?: string };

/* The app opens in the phone's language and Playwright reports en-US, so the
   choice is pinned before first paint — through localStorage, the same place
   the real app keeps it, as e2e/lang.ts explains. */
async function openWith(page: Page, settings: Settings) {
  await page.addInitScript((s) => {
    localStorage.setItem("sajag.settings.v1", JSON.stringify(s));
  }, settings);
}

async function audit(page: Page, label: string) {
  /* The app settles in over 180ms (the screen-in keyframe). Auditing mid
     animation can read a half-faded element as a contrast failure, so let
     the paint finish before looking. */
  await page.waitForLoadState("load");
  await page.waitForTimeout(400);

  const results = await new AxeBuilder({ page })
    .withTags(TAGS)
    .disableRules(["target-size"])
    .analyze();

  const detail = results.violations
    .map((v) => {
      const where = v.nodes
        .slice(0, 4)
        .map((n) => `      ${n.target.join(" ")}`)
        .join("\n");
      return `  [${v.impact ?? "unknown"}] ${v.id}: ${v.help}\n${where}`;
    })
    .join("\n");

  expect(
    results.violations,
    `axe found ${results.violations.length} violation(s) on ${label}:\n${detail}`,
  ).toEqual([]);
}

test.describe("axe on every route", () => {
  for (const route of STATIC_ROUTES) {
    test(`${route} has no accessibility violations`, async ({ page }) => {
      await openWith(page, { lang: "hi" });
      await page.goto(route);
      await audit(page, route);
    });
  }

  /* /check/result holds its verdict in memory (useLastResult), so visiting
     the URL directly would audit an empty page and prove nothing. It has to
     be walked into, the way a person arrives at it. */
  test("/check/result has no accessibility violations", async ({ page }) => {
    await openWith(page, { lang: "hi" });
    await page.goto("/check");
    await page.waitForLoadState("load");
    await page.waitForTimeout(2000);

    await page.locator("#message").fill(G1);
    await page.getByRole("button", { name: "जाँचो" }).click();
    await page.waitForURL("**/check/result");

    await audit(page, "/check/result (with a HIGH_RISK verdict)");
  });
});

/* ----------------------------------------------------------------------------
   The two conditions SPEC 11.1 names explicitly, on the screen that matters
   most. High contrast and 150 percent text change real computed colours and
   real box sizes, so they are separate audits rather than a claim.
   -------------------------------------------------------------------------- */
test.describe("axe under the accessibility settings", () => {
  const UNDER_PRESSURE = ["/", "/check", "/madad", "/settings"];

  for (const route of UNDER_PRESSURE) {
    test(`${route} is clean in high contrast`, async ({ page }) => {
      await openWith(page, { lang: "hi", contrast: "high" });
      await page.goto(route);
      await expect(page.locator("html")).toHaveAttribute(
        "data-contrast",
        "high",
      );
      await audit(page, `${route} (high contrast)`);
    });

    test(`${route} is clean at 150 percent text`, async ({ page }) => {
      await openWith(page, { lang: "hi", textScale: 1.5 });
      await page.goto(route);
      await audit(page, `${route} (150% text)`);
    });
  }
});

/* ----------------------------------------------------------------------------
   "Text scales to 150 percent without horizontal scroll at 320px width."
   That sentence is from SPEC 11.1 and axe cannot check it, because overflow
   is a layout fact rather than a markup fact. 320px is the narrowest phone
   still in real use, and 150 percent is the largest step Settings offers —
   the two worst cases at once.
   -------------------------------------------------------------------------- */
test.describe("150 percent text at 320px does not scroll sideways", () => {
  const ROUTES = ["/", "/check", "/madad", "/pause", "/learn", "/settings"];

  for (const route of ROUTES) {
    test(`${route} stays within 320px`, async ({ page }) => {
      await openWith(page, { lang: "hi", textScale: 1.5 });
      await page.setViewportSize({ width: 320, height: 740 });
      await page.goto(route);
      await page.waitForLoadState("load");
      await page.waitForTimeout(400);

      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        /* A couple of pixels of rounding is not a scrollbar. Anything more
           is a person dragging the page sideways to read a sentence. */
        return doc.scrollWidth - doc.clientWidth;
      });

      expect(
        overflow,
        `${route} overflows its 320px viewport by ${overflow}px at 150% text`,
      ).toBeLessThanOrEqual(2);
    });
  }
});

/* ----------------------------------------------------------------------------
   Touch targets, measured directly. This stands in for axe's `target-size`,
   which cannot pass while a sticky tab bar exists (see the header), and it
   holds a higher bar: SPEC 11.1 promises "touch targets at least 52px",
   where the WCAG minimum axe enforces is 24px.

   What this checks is the control's own box — is the thing big enough for a
   thumb — rather than whether something is floating over it right now. That
   is the part of the requirement that belongs to the component, and it is
   the part a person feels when they try to tap it on a moving bus.
   -------------------------------------------------------------------------- */
test.describe("touch targets are big enough for a thumb", () => {
  const ROUTES = [
    "/",
    "/check",
    "/learn",
    "/madad",
    "/pause",
    "/settings",
    "/family",
    "/history",
  ];

  const MIN = 52;

  for (const route of ROUTES) {
    test(`${route} has no control under ${MIN}px`, async ({ page }) => {
      await openWith(page, { lang: "hi" });
      await page.goto(route);
      await page.waitForLoadState("load");
      await page.waitForTimeout(400);

      const small = await page.evaluate((min) => {
        const sel = 'a[href], button, [role="switch"], [role="radio"], input, select, textarea';
        const out: string[] = [];
        for (const el of Array.from(document.querySelectorAll(sel))) {
          /* A checkbox is 24px by convention, but when it sits inside a
             label the whole label is clickable, so the label is the real
             target. Measure what the thumb can actually hit. */
          const wrap = el.closest("label");
          const target = wrap ?? el;
          const r = target.getBoundingClientRect();
          /* Off-screen controls (the hidden file input) have no box to
             measure and no thumb aimed at them. The skip link is clipped
             to a 1px box until it takes focus, which is the standard way
             to hide it; it is checked for size when visible, not here. */
          if (r.width === 0 || r.height === 0) continue;
          if (el.classList.contains("skip-link")) continue;
          /* Visually hidden controls are driven by a visible partner — the
             file input behind the "Photo" button — so the thumb never
             touches them directly. */
          if (el.classList.contains("sr-only")) continue;
          /* Links inside a sentence are exempt in WCAG 2.5.8 itself: they
             are sized by the text around them, and padding them to 52px
             would break the paragraph they live in. `.inline-link` is the
             same thing rendered as a button, so it earns the same exemption. */
          if (el.tagName === "A" && el.closest("p, li")) continue;
          if (el.classList.contains("inline-link")) continue;

          if (r.height < min || r.width < min) {
            const id = el.id ? `#${el.id}` : "";
            const cls =
              typeof el.className === "string" && el.className
                ? `.${el.className.trim().split(/\s+/).join(".")}`
                : "";
            out.push(
              `${el.tagName.toLowerCase()}${id}${cls} — ${Math.round(r.width)}x${Math.round(r.height)}`,
            );
          }
        }
        return out;
      }, MIN);

      expect(
        small,
        `${route} has ${small.length} control(s) under ${MIN}px:\n  ${small.join("\n  ")}`,
      ).toEqual([]);
    });
  }
});
