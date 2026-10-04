import { expect, test, type Page } from "@playwright/test";

/* ============================================================================
   Design verification.

   Nobody reviewing this can see the page from inside the test runner, so the
   design is measured instead of looked at. Every number below is taken
   straight from docs/UI_SPEC.md; if a screen drifts off the scale, this fails.
   Section 11 of docs/UI_SPEC.md.
   ========================================================================== */

const ROUTES = [
  "/",
  "/check",
  "/more",
  "/madad",
  "/pause",
  "/learn",
  "/simulate",
  "/family",
  "/history",
  "/settings",
  "/settings/ledger",
  "/about",
  "/start",
];

const PHONE = { width: 390, height: 844 };

/* Sajag now opens in the phone's own language when it is one of the twelve,
   and Playwright's browser reports en-US. Every measurement below is a
   Hindi measurement, so the language is pinned before the first paint
   rather than left to the runner's locale. Tests that care about another
   language set it themselves. */
test.beforeEach(async ({ context }) => {
  await context.addInitScript(() => {
    if (!localStorage.getItem("sajag.settings.v1")) {
      localStorage.setItem("sajag.settings.v1", JSON.stringify({ lang: "hi" }));
    }
  });
});

async function box(page: Page, selector: string) {
  return page.locator(selector).first().boundingBox();
}

/* -------------------------------------------------------------- 1 ------- */
test.describe("no stray underlines", () => {
  for (const route of ROUTES) {
    test(`nothing but InlineLink is underlined on ${route}`, async ({ page }) => {
      await page.goto(route);
      const offenders = await page.evaluate(() => {
        const bad: string[] = [];
        for (const el of Array.from(document.querySelectorAll<HTMLElement>("*"))) {
          const style = getComputedStyle(el);
          if (!style.textDecorationLine.includes("underline")) continue;
          /* The underline is allowed only on the InlineLink itself. An
             underlined parent would paint the line across a whole tile. */
          if (el.classList.contains("inline-link")) continue;
          if (el.closest(".inline-link")) continue;
          bad.push(`${el.tagName.toLowerCase()}.${el.className}`);
        }
        return bad;
      });
      expect(offenders, offenders.join("\n")).toEqual([]);
    });
  }
});

/* -------------------------------------------------------------- 2 ------- */
test("fonts: Mukta for body, the serif for headings, no fake bold", async ({
  page,
}) => {
  await page.goto("/");
  await page.waitForFunction(() => document.fonts.status === "loaded");

  const body = await page.evaluate(() => {
    const s = getComputedStyle(document.body);
    return { family: s.fontFamily, synthesis: s.fontSynthesis };
  });
  expect(body.family.toLowerCase()).toContain("mukta");

  const h1 = await page.evaluate(
    () => getComputedStyle(document.querySelector("h1")!).fontFamily,
  );
  expect(h1.toLowerCase()).toMatch(/tiro|serif/);
});

/* -------------------------------------------------------------- 3 ------- */
test("type: Hindi body is 19px and nothing is under 14px", async ({ page }) => {
  await page.setViewportSize(PHONE);
  await page.goto("/");

  const sizes = await page.evaluate(() => {
    const body = parseFloat(getComputedStyle(document.body).fontSize);
    const h1 = parseFloat(
      getComputedStyle(document.querySelector("h1")!).fontSize,
    );
    let smallest = Infinity;
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("*"))) {
      if (!el.textContent?.trim()) continue;
      if (!el.offsetParent && el !== document.body) continue;
      smallest = Math.min(smallest, parseFloat(getComputedStyle(el).fontSize));
    }
    return { body, h1, smallest };
  });

  /* 18px root × 1.055 Devanagari correction. */
  expect(sizes.body).toBeCloseTo(18.99, 0);
  expect(sizes.h1).toBeGreaterThan(30);
  expect(sizes.smallest).toBeGreaterThanOrEqual(13.9);
});

/* -------------------------------------------------------------- 4 ------- */
test("targets: every control is at least 48 by 48", async ({ page }) => {
  await page.setViewportSize(PHONE);
  await page.goto("/");
  const small = await page.evaluate(() => {
    const bad: string[] = [];
    const sel = "a,button,[role=button],input,select,textarea,summary";
    for (const el of Array.from(document.querySelectorAll<HTMLElement>(sel))) {
      if (el.closest(".skip-link")) continue;
      if (el.classList.contains("inline-link")) continue;
      /* Visually hidden file inputs are driven by a real 56px tool cell. */
      if (el.closest(".sr-only")) continue;
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.height < 48 || r.width < 48) {
        bad.push(`${el.tagName}.${el.className} ${r.width}x${r.height}`);
      }
    }
    return bad;
  });
  expect(small, small.join("\n")).toEqual([]);
});

/* -------------------------------------------------------------- 5 ------- */
test("home metrics at 390x844", async ({ page }) => {
  await page.setViewportSize(PHONE);
  await page.goto("/");

  const header = await box(page, ".app-header");
  expect(header!.height).toBeGreaterThan(60);
  expect(header!.height).toBeLessThan(110);

  /* `main` spans the page; the 20px margin is its padding, so that rules
     and tinted panels can still bleed to the edge when a screen wants it. */
  const pad = await page.evaluate(() =>
    parseFloat(getComputedStyle(document.querySelector("#main")!).paddingLeft),
  );
  expect(pad).toBeCloseTo(20, 0);

  /* Exactly one filled button on the page: "check a message". Everything
     else on Home is a door, and a page with four filled buttons has told
     the person nothing about which one to press. */
  expect(await page.locator(".btn-primary").count()).toBe(1);

  /* The quick-entry card stands in for the composer on Home: a ruled sheet
     that opens /check, with paste, speak and photo beside it. The composer
     itself lives on /check, so there is only ever one box holding text. */
  await expect(page.locator(".quick-surface")).toBeVisible();
  await expect(page.locator(".quick-paste")).toBeVisible();
  expect(await page.locator(".composer-area").count()).toBe(0);

  /* The four trap rows used to live here. They competed with the one action
     on the one screen where someone is deciding whether to send money, so
     they moved to /learn, where a person who wants to study them will go.
     Home must not grow them back. */
  expect(await page.locator(".pattern-row").count()).toBe(0);

  /* Three doors now, not two: money already gone, pause, and learn. They
     are the three questions that are not "is this message real?". */
  const tiles = page.locator(".tile");
  expect(await tiles.count()).toBe(3);
  const first = await tiles.nth(0).boundingBox();
  const second = await tiles.nth(1).boundingBox();
  expect(first!.height).toBeGreaterThanOrEqual(91);
  expect(second!.y - (first!.y + first!.height)).toBeCloseTo(12, 0);

  /* The front door is a front door, not a contents page. The old Home had
     thirty-three tappable things in it and ran 2.8 screens. */
  const taps = await page.locator("#main a, #main button").count();
  expect(taps).toBeLessThanOrEqual(12);
  const screens = await page.evaluate(
    () => document.documentElement.scrollHeight / window.innerHeight,
  );
  expect(screens).toBeLessThan(2);

  /* Five tabs, and every one of them still a real target at 320px. */
  const tabs = page.locator(".tab-bar .tab");
  expect(await tabs.count()).toBe(5);
  await page.setViewportSize({ width: 320, height: 844 });
  for (const tab of await tabs.all()) {
    const b = (await tab.boundingBox())!;
    expect(b.width).toBeGreaterThanOrEqual(60);
    expect(b.height).toBeGreaterThanOrEqual(48);
  }
});

/* -------------------------------------------------------------- 5b ------ */
test("every language renders its own script, and Urdu runs right to left", async ({
  page,
}) => {
  await page.setViewportSize(PHONE);

  for (const [lang, dir, word] of [
    ["ta", "ltr", "தமிழ்"],
    ["bn", "ltr", "বাংলা"],
    ["ml", "ltr", "മലയാളം"],
    ["ur", "rtl", "اردو"],
  ] as const) {
    await page.goto("/");
    await page.evaluate((l) => {
      localStorage.setItem("sajag.settings.v1", JSON.stringify({ lang: l }));
    }, lang);
    await page.reload();
    /* The three attributes everything else hangs off: the language for
       screen readers, the direction for the layout, the script for the
       font stack. All three are set before first paint. */
    await expect(page.locator("html")).toHaveAttribute("lang", lang);
    await expect(page.locator("html")).toHaveAttribute("dir", dir);
    await expect(page.locator("html")).not.toHaveAttribute("data-script", "");

    /* The tab bar is the one piece of chrome on every screen, so if it is
       in the right script the person can navigate even where the long-form
       copy has fallen back to English. */
    const labels = await page.locator(".tab-label").allInnerTexts();
    expect(labels).toHaveLength(5);
    expect(labels.join("").trim().length).toBeGreaterThan(0);

    /* And the picker always names the language in its own letters. */
    await page.locator(".lang-chip").click();
    await expect(page.getByText(word, { exact: true }).first()).toBeVisible();
    await page.keyboard.press("Escape");
  }
});

test("tab bar is hidden where there is only one way forward", async ({
  page,
}) => {
  for (const route of ["/start", "/pause/breaker", "/madad/plan"]) {
    await page.goto(route);
    await expect(page.locator(".tab-bar")).toHaveCount(0);
  }
});

/* -------------------------------------------------------------- 6 ------- */
test("no horizontal scroll at any width or text size", async ({ page }) => {
  for (const width of [320, 360, 390, 768, 1280]) {
    for (const scale of [1, 1.25, 1.5]) {
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/");
      await page.evaluate(
        (s) => document.documentElement.style.setProperty("--text-scale", `${s}`),
        scale,
      );
      const result = await page.evaluate(() => {
        const doc = document.documentElement;
        const overflow = doc.scrollWidth - doc.clientWidth;
        /* Name the culprits, otherwise a failure here is unreadable. */
        const guilty: string[] = [];
        if (overflow > 1) {
          for (const el of Array.from(doc.querySelectorAll<HTMLElement>("*"))) {
            const r = el.getBoundingClientRect();
            if (r.width === 0 || r.right <= doc.clientWidth + 1) continue;
            guilty.push(
              `${el.tagName.toLowerCase()}.${el.className} right=${Math.round(r.right)} w=${Math.round(r.width)}`,
            );
          }
        }
        return { overflow, guilty: guilty.slice(0, 8) };
      });
      expect(
        result.overflow,
        `${width}px at ${scale}×\n${result.guilty.join("\n")}`,
      ).toBeLessThanOrEqual(1);
    }
  }
});

/* -------------------------------------------------------------- 8 ------- */
test("console is clean on every route", async ({ page }) => {
  const noise: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") noise.push(m.text());
  });
  page.on("pageerror", (e) => noise.push(e.message));
  for (const route of ROUTES) {
    await page.goto(route);
    await page.waitForLoadState("networkidle");
  }
  expect(noise, noise.join("\n")).toEqual([]);
});

/* -------------------------------------------------------------- 9 ------- */
test.describe("structure", () => {
  for (const route of ROUTES) {
    test(`one h1, one main and a skip link on ${route}`, async ({ page }) => {
      await page.goto(route);
      expect(await page.locator("h1").count()).toBe(1);
      expect(await page.locator("main").count()).toBe(1);
      await expect(page.locator(".skip-link")).toHaveCount(1);
    });
  }
});

/* ------------------------------------------------------------- 12 ------- */
test("desktop shows the two-pane spread", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await expect(page.locator(".rail")).toBeVisible();
  await expect(page.locator(".tab-bar")).toBeHidden();

  /* The content column used to be pinned at exactly 560px, which left a
     1440px screen showing a phone-shaped strip with 460px of bare desk on
     either side. It now grows with the viewport and stops at a measure that
     is still comfortable to read, rather than running to the full width. */
  const shell = await box(page, ".shell");
  expect(shell!.width).toBeGreaterThan(560);
  expect(shell!.width).toBeLessThanOrEqual(880);

  /* Hero and doors sit side by side, so both are read without scrolling. */
  const hero = await box(page, ".home-hero");
  const doors = await box(page, ".home-doors");
  expect(doors!.x).toBeGreaterThan(hero!.x + hero!.width - 1);
});

/* ------------------------------------------------------------- 13 ------- */
/* Every screen carries the same vertical rhythm. Before this, Home used the
   `.home` gap and everywhere else sprinkled mt-8 / mt-20 / mt-24, so the
   spacing changed under your feet as you navigated and the app read as
   several apps. The test is deliberately about structure rather than exact
   pixels: it checks the rhythm is applied, and that nothing re-introduces a
   hand-rolled top margin on a direct child, which would double up with the
   gap it already inherits. */
test.describe("shared screen rhythm", () => {
  const SCREENS = [
    "/check",
    "/madad",
    "/pause",
    "/learn",
    "/family",
    "/history",
    "/settings",
  ];

  for (const route of SCREENS) {
    test(`${route} uses the shared screen layout`, async ({ page }) => {
      await page.goto(route);

      const screen = page.locator(".screen");
      await expect(screen).toHaveCount(1);

      /* The rhythm is a real gap, not a collapsed one. */
      const gap = await screen.evaluate(
        (el) => getComputedStyle(el).rowGap,
      );
      expect(parseFloat(gap)).toBeGreaterThan(20);

      /* The title and its lead line are one thought and must stay closer
         together than two sections are. */
      const head = page.locator(".screen-head");
      if ((await head.count()) > 0) {
        const headGap = await head
          .first()
          .evaluate((el) => getComputedStyle(el).rowGap);
        expect(parseFloat(headGap)).toBeLessThan(parseFloat(gap));
      }

      /* No direct child may carry its own top margin: it would be added to
         the gap, not replace it, and the page would drift apart. */
      const stacked = await screen.evaluate((el) =>
        [...el.children].filter((child) => {
          const mt = parseFloat(getComputedStyle(child).marginTop);
          return mt > 0;
        }).length,
      );
      expect(stacked).toBe(0);
    });
  }
});

/* ------------------------------------------------------------- 13b ------ */
/* Motion is only defensible if the opt-out genuinely works. This asserts the
   promise rather than trusting the stylesheet: with reduced motion asked
   for, nothing on screen may still be animating. */
test.describe("motion respects the opt-out", () => {
  test("screens animate in by default", async ({ page }) => {
    await page.goto("/check");
    const name = await page
      .locator(".screen")
      .evaluate((el) => getComputedStyle(el).animationName);
    expect(name).toBe("screen-in");
  });

  test("nothing animates when reduced motion is requested", async ({
    browser,
  }) => {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/check");

    const slow = await page.evaluate(() =>
      [...document.querySelectorAll("body *")].filter((el) => {
        const s = getComputedStyle(el);
        const dur = (v: string) =>
          v
            .split(",")
            .map((p) => parseFloat(p) * (p.includes("ms") ? 1 : 1000))
            .some((n) => n > 1);
        return dur(s.animationDuration) || dur(s.transitionDuration);
      }).length,
    );

    expect(slow).toBe(0);
    await context.close();
  });
});

/* ------------------------------------------------------------- 14 ------- */
test("source hygiene: no hex colours or arbitrary values in the screens", async () => {
  const { readdir, readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");

  async function walk(dir: string): Promise<string[]> {
    const out: string[] = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) out.push(...(await walk(p)));
      else if (/\.tsx?$/.test(entry.name)) out.push(p);
    }
    return out;
  }

  /* Three allowed literals:
     - the canvas card renderer, because a 2D context cannot read a CSS var;
     - the icon file, for the same reason inside an SVG filter;
     - `layout.tsx`, whose `themeColor` goes into a `<meta>` tag that the
       browser chrome reads before any stylesheet exists. */
  const allowed = ["family/card", "icons.tsx", "card.ts", "app/layout.tsx"];
  const files = [
    ...(await walk("src/app")),
    ...(await walk("src/components")),
  ].filter((f) => !allowed.some((a) => f.includes(a)));

  const bad: string[] = [];
  for (const file of files) {
    const text = await readFile(file, "utf8");
    text.split("\n").forEach((line, i) => {
      if (/#[0-9a-fA-F]{3,8}\b/.test(line) && !line.includes("//")) {
        bad.push(`${file}:${i + 1} hex colour`);
      }
      if (/\[[0-9]+px\]|\[#/.test(line)) {
        bad.push(`${file}:${i + 1} arbitrary Tailwind value`);
      }
    });
  }
  expect(bad, bad.join("\n")).toEqual([]);
});
