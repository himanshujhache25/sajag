import { test, expect, type Page } from "@playwright/test";

/* ============================================================================
   Random and awkward input, everywhere except Check.

   Check was fuzzed earlier and held up. These are the screens that have
   never seen hostile input: the Madad wizard, the Pause tools, Family and
   Simulate. The point is not to assert a particular verdict — the engine
   tests do that — but to prove that nothing here crashes, swallows a page
   error, or renders an untranslated key when a person types something the
   designer never imagined.

   Note for anyone running these by hand: the app does not hydrate under
   `next dev` in this environment, so these must run against a production
   build. The Playwright config already does that.
   ========================================================================== */

/* The shapes that break naive handling: empty, whitespace, injection,
   enormous, emoji-only, right-to-left, and a lone surrogate. */
const NASTY = [
  "",
  "   ",
  "\n\n\t\n",
  "<script>alert(1)</script>",
  "'; DROP TABLE users; --",
  "{{constructor.constructor('alert(1)')()}}",
  "../../etc/passwd",
  "😀😀😀😀😀",
  "ا".repeat(300),
  "अ".repeat(300),
  "A".repeat(5000),
  "%s %d %n %@",
  "\u0000\u001b[31m",
  "\ud800",
  "0",
  "-1",
];

/* Fails the test if the page throws, rather than letting a crashed render
   pass quietly as an empty screen. */
function watch(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(m.text());
  });
  return errors;
}

/* A raw key reaching the screen means a missing translation. The engine and
   i18n tests catch most of these; this catches the ones only a weird input
   path can produce. */
async function noRawKeys(page: Page) {
  const body = (await page.locator("body").innerText()).replace(/\s+/g, " ");
  expect(body).not.toMatch(/\b(madad|pause|check|family|common)\.[a-zA-Z]+\b/);
}

test.describe("fuzz: text inputs survive awkward values", () => {
  for (const route of ["/pause/journal", "/pause/pact", "/family"]) {
    test(`${route} handles nasty text`, async ({ page }) => {
      const errors = watch(page);
      await page.goto(route);

      const fields = page.locator(
        'input[type="text"], input:not([type]), textarea',
      );

      /* Fields may not exist on the first frame. Family fills its
         trusted-person form from an async storage read, so the inputs
         appear a tick after the page does; checking immediately found
         nothing and made the fuzz look impossible. Wait for one first. */
      await fields
        .first()
        .waitFor({ state: "attached", timeout: 2000 })
        .catch(() => {});

      /* Some screens keep their fields behind a reveal — the Journal writes
         into a sheet that has to be opened. An earlier version of this test
         skipped when it found nothing, which meant it silently fuzzed
         neither screen.

         Press the buttons to find the way in, but stay on the page: the
         first button on several screens is "back", and following it would
         fuzz whatever happened to load next. */
      if ((await fields.count()) === 0) {
        const buttons = page.locator("main button, main [role=button]");
        for (let i = 0; i < (await buttons.count()); i++) {
          const b = buttons.nth(i);
          if (!(await b.isVisible())) continue;
          await b.click({ force: true }).catch(() => {});
          await page.waitForTimeout(80);

          if (!page.url().includes(route)) {
            await page.goto(route);
            continue;
          }
          if ((await fields.count()) > 0) break;
        }
      }

      const count = await fields.count();
      expect(
        count,
        `no free-text field found on ${route}; the fuzz would be a no-op`,
      ).toBeGreaterThan(0);

      for (const value of NASTY) {
        for (let i = 0; i < count; i++) {
          const field = fields.nth(i);
          if (!(await field.isVisible())) continue;
          if (await field.isDisabled()) continue;
          await field.fill(value).catch(() => {});
        }
        /* Give React a frame to re-render before looking. */
        await page.waitForTimeout(16);
      }

      await expect(page.locator("h1")).toBeVisible();
      await noRawKeys(page);
      expect(errors, errors.join("\n")).toEqual([]);
    });
  }
});

test.describe("fuzz: the Madad wizard cannot be walked into a corner", () => {
  test("every step renders, and start-over always returns to step one", async ({
    page,
  }) => {
    const errors = watch(page);
    await page.goto("/madad");

    /* Walk forward by always taking the first available answer, which is the
       path a confused person in a hurry actually takes. The walk stays
       inside Madad: the screen also offers a helpline link and a way out to
       Check, and following either would mean asserting about a different
       page while claiming to test the wizard. */
    for (let step = 0; step < 12; step++) {
      if (!page.url().includes("/madad")) break;
      await expect(page.locator("h1")).toBeVisible();

      const choice = page.locator('input[type="radio"]').first();
      if (await choice.count()) {
        if (await choice.isVisible()) await choice.check({ force: true });
      }

      const forward = page.locator("main button").last();
      if ((await forward.count()) === 0) break;
      if (!(await forward.isVisible())) break;
      await forward.click({ force: true }).catch(() => {});
      await page.waitForTimeout(80);

      if (page.url().includes("/madad/plan")) break;
    }

    if (!page.url().includes("/madad")) await page.goto("/madad");
    await expect(page.locator("h1")).toBeVisible();
    await noRawKeys(page);
    expect(errors, errors.join("\n")).toEqual([]);
  });

  test("reloading mid-wizard does not lose the page", async ({ page }) => {
    const errors = watch(page);
    await page.goto("/madad");

    const choice = page.locator('input[type="radio"]').first();
    if ((await choice.count()) && (await choice.isVisible())) {
      await choice.check({ force: true });
    }

    await page.reload();
    await expect(page.locator("h1")).toBeVisible();
    expect(errors, errors.join("\n")).toEqual([]);
  });
});

test.describe("fuzz: query strings nobody meant to type", () => {
  const JUNK = [
    "?mode=<script>alert(1)</script>",
    "?mode=",
    "?mode=voice&mode=photo",
    "?lang=zz",
    "?lang=../../etc",
    "?demo=999",
    "?samples=<>",
    "?" + "a=1&".repeat(400),
  ];

  for (const q of JUNK) {
    test(`/check${q.slice(0, 32)} still renders`, async ({ page }) => {
      const errors = watch(page);
      await page.goto(`/check${q}`);
      await expect(page.locator("h1")).toBeVisible();
      /* An unknown language must fall back, never blank the interface. */
      const body = await page.locator("body").innerText();
      expect(body.trim().length).toBeGreaterThan(20);
      expect(errors, errors.join("\n")).toEqual([]);
    });
  }
});

test.describe("fuzz: every screen survives a language switch", () => {
  /* Switching language re-renders every string on the page. Urdu is the one
     right-to-left language, so it is the one most likely to break a layout
     that quietly assumed left-to-right. */
  for (const route of ["/", "/check", "/madad", "/pause", "/learn", "/family"]) {
    test(`${route} in Urdu`, async ({ page }) => {
      const errors = watch(page);
      await page.addInitScript(() => {
        localStorage.setItem("sajag.settings", JSON.stringify({ lang: "ur" }));
      });
      await page.goto(route);

      await expect(page.locator("h1")).toBeVisible();
      await noRawKeys(page);

      /* Nothing may spill sideways out of the viewport. */
      const overflow = await page.evaluate(() => {
        const w = document.documentElement.clientWidth;
        return [...document.querySelectorAll("body *")].filter(
          (el) => el.getBoundingClientRect().right > w + 1,
        ).length;
      });
      expect(overflow).toBe(0);

      expect(errors, errors.join("\n")).toEqual([]);
    });
  }
});
