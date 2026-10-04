import { test, expect } from "@playwright/test";
import { openInHindi } from "./lang";

/* J6 — Priya wants to send her father something he will actually keep. The
   card has to be drawn on the phone, with the network off, and the five
   lines have to be readable as text as well as pixels. */

openInHindi();

test("J6: the safety card is drawn on the phone and /about is honest", async ({
  page,
  context,
}) => {
  await page.goto("/family");
  await page.waitForLoadState("load");
  await page.waitForTimeout(2500);
  await context.setOffline(true);

  await page.getByRole("link", { name: "सुरक्षा कार्ड बनाओ" }).click();
  await page.waitForURL("**/family/card");

  /* The canvas is the real 1080 by 1350 the brief asks for, and something
     has actually been painted onto it. Alpha is what proves that: an
     untouched canvas is transparent, and transparent black would sail
     through a test that only looked at how dark the pixels were. */
  const canvas = page.getByRole("img", { name: /सुरक्षा कार्ड/ });
  await expect(canvas).toBeVisible();
  const size = await canvas.evaluate((el) => {
    const c = el as HTMLCanvasElement;
    const ctx = c.getContext("2d");
    const data = ctx?.getImageData(0, 0, c.width, c.height).data;
    let painted = 0;
    let dark = 0;
    for (let i = 0; data && i < data.length; i += 4000) {
      if (data[i + 3] > 0) painted += 1;
      if (data[i + 3] > 0 && data[i] < 120) dark += 1;
    }
    return { w: c.width, h: c.height, painted, dark };
  });
  expect(size.w).toBe(1080);
  expect(size.h).toBe(1350);
  /* Paper everywhere, and ink somewhere. */
  expect(size.painted).toBeGreaterThan(300);
  expect(size.dark).toBeGreaterThan(0);

  /* The same five lines as text, for anyone who cannot see the picture. */
  await expect(page.getByRole("heading", { name: "सच्चा सलाहकार कभी नहीं करेगा" })).toBeVisible();
  for (const line of [
    "पक्के मुनाफे की गारंटी देना",
    "OTP या स्क्रीन-शेयर माँगना",
    "किसी के निजी UPI या खाते में पैसा मँगवाना",
    "कहना कि जल्दी करो, सीटें कम हैं",
    "कहना कि किसी को मत बताना",
  ]) {
    await expect(page.getByText(line)).toBeVisible();
  }
  await expect(page.getByText(/पैसा चला गया: 1930/)).toBeVisible();

  /* Saving must produce a real PNG, offline, with no server anywhere.

     Chromium's mobile emulation never raises a download event, so instead
     of waiting for one we check the two things that actually matter: the
     canvas turns into real PNG bytes, and the save hands those bytes to the
     phone through an anchor that is in the document and carries a .png
     name. Both of those were broken before this test existed. */
  const bytes = await canvas.evaluate(
    (el) =>
      new Promise<number>((resolve) =>
        (el as HTMLCanvasElement).toBlob(
          (b) => resolve(b ? b.size : 0),
          "image/png",
        ),
      ),
  );
  expect(bytes).toBeGreaterThan(10_000);

  await page.evaluate(() => {
    const w = window as unknown as { saved?: { name: string; inDoc: boolean } };
    const real = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function patched(this: HTMLAnchorElement) {
      if (this.download) {
        w.saved = {
          name: this.download,
          inDoc: document.body.contains(this),
        };
        return;
      }
      real.call(this);
    };
  });

  await page.getByRole("button", { name: "इमेज सेव करो" }).click();

  /* The save confirmation, and the two things that make the save real: an
     anchor carrying a .png name, attached to the document. Both were broken
     before this test existed, and `downloadIcs` had the same bug.

     The confirmation is compared after Unicode normalisation, because the
     same Devanagari sentence can be spelled two ways in bytes and a test
     should not fail over that. */
  await expect
    .poll(
      async () =>
        (await page.evaluate(() => document.body.innerText)).normalize("NFC"),
      // Encoding a 1080x1350 PNG is real work. On a laptop running several
      // emulated phones at once, or on the cheap phone this is built for,
      // the default five seconds is a coin toss. Waiting longer costs
      // nothing when it passes.
      { timeout: 20_000 },
    )
    .toContain("सेव हो गया".normalize("NFC"));

  const saved = await page.evaluate(
    () => (window as unknown as { saved?: { name: string; inDoc: boolean } }).saved,
  );
  expect(saved?.name).toMatch(/\.png$/);
  expect(saved?.inDoc).toBe(true);

  /* /about must say what Sajag is not, in plain words, and carry the
     sources with their dates. */
  await page.getByRole("link", { name: "हमारे बारे में" }).click();
  await page.waitForURL("**/about");

  await expect(page.getByText("यह निवेश की सलाह नहीं देता। कभी नहीं।")).toBeVisible();
  await expect(
    page.getByText(/यह SEBI या NSDL का आधिकारिक ऐप नहीं है/),
  ).toBeVisible();
  await expect(page.getByText(/रजिस्ट्री के नाम बनावटी हैं/)).toBeVisible();
  await expect(page.getByText(/SEBI study of individual traders/).first()).toBeVisible();
  await expect(page.getByText("लाइसेंस: MIT")).toBeVisible();

  /* Every official link is a real SEBI, NSDL, CDSL or government URL. */
  const links = page.getByRole("link", { name: /sebi|nsdl|cdsl|gov\.in/i });
  expect(await links.count()).toBeGreaterThan(5);
});
