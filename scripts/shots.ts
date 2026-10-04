import { chromium, devices } from "@playwright/test";
import { mkdir } from "node:fs/promises";

/* ============================================================================
   npm run shots — writes docs/screens/<route>-<viewport>-<theme>.png.

   The point is not a gallery. It is that a change to a token or a primitive
   can be reviewed across nineteen screens, four widths and two themes in one
   pass, by a person who then sends four of them back with notes.
   Section 11 of docs/UI_SPEC.md.
   ========================================================================== */

const BASE = process.env.SHOT_BASE ?? "http://127.0.0.1:3000";
const OUT = "docs/screens";

const ROUTES = [
  "/",
  "/check",
  "/check/result",
  "/more",
  "/madad",
  "/madad/plan",
  "/pause",
  "/pause/pact",
  "/pause/breaker",
  "/pause/journal",
  "/learn",
  "/learn/sebi-registration",
  "/simulate",
  "/family",
  "/family/card",
  "/history",
  "/settings",
  "/settings/ledger",
  "/about",
  "/start",
  "/offline",
];

const VIEWPORTS = [
  { name: "360x740", width: 360, height: 740, scale: 1.5 },
  { name: "390x844", width: 390, height: 844, scale: 1 },
  { name: "768x1024", width: 768, height: 1024, scale: 1 },
  { name: "1280x800", width: 1280, height: 800, scale: 1 },
];

function slug(route: string) {
  return route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "-");
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const browser = await chromium.launch();

  for (const theme of ["light", "dark"] as const) {
    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        ...devices["Pixel 7"],
        viewport: { width: vp.width, height: vp.height },
        isMobile: vp.width < 768,
        hasTouch: vp.width < 768,
        deviceScaleFactor: 2,
        colorScheme: theme,
      });

      /* Seed the settings the boot script reads, so the page paints in the
         right theme and size on the very first frame instead of flipping. */
      await context.addInitScript(
        ([t, s]) => {
          window.localStorage.setItem(
            "sajag.settings.v1",
            JSON.stringify({ theme: t, textScale: s, lang: "hi" }),
          );
        },
        [theme, vp.scale] as const,
      );

      const page = await context.newPage();
      for (const route of ROUTES) {
        try {
          await page.goto(BASE + route, { waitUntil: "networkidle" });
          await page.waitForTimeout(250);
          await page.screenshot({
            path: `${OUT}/${slug(route)}-${vp.name}-${theme}.png`,
            fullPage: true,
          });
        } catch (error) {
          console.warn(`skipped ${route} ${vp.name} ${theme}:`, error);
        }
      }
      await context.close();
    }
  }

  await browser.close();
  console.log(`wrote screenshots to ${OUT}`);
}

void main();
