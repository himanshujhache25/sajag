import { test, expect } from "@playwright/test";

/* Temporary reproduction for the photo bug. Not part of the suite.
   The previous version pinned lang=en and asserted nothing, so it could not
   fail. The app defaults to Hindi, which is the case that breaks. */

for (const lang of ["en", "hi"]) {
  test(`photo upload, lang=${lang}`, async ({ page }) => {
    const problems: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error" || m.type() === "warning")
        problems.push("CONSOLE " + m.text());
    });
    page.on("pageerror", (e) => problems.push("PAGEERROR " + e.message));
    page.on("requestfailed", (r) =>
      problems.push("REQFAIL " + r.url() + " :: " + r.failure()?.errorText),
    );
    page.on("response", (r) => {
      if (!r.url().includes("127.0.0.1"))
        problems.push(`EXTERNAL ${r.status()} ${r.url()}`);
    });

    await page.addInitScript((l) => {
      localStorage.setItem("sajag:lang", l as string);
      localStorage.setItem("sajag:seen-start", "1");
    }, lang);
    await page.goto("/check");

    /* A real PNG with real text drawn into it, so OCR has something to read. */
    const png = await page.evaluate(async () => {
      const c = document.createElement("canvas");
      c.width = 700;
      c.height = 200;
      const x = c.getContext("2d")!;
      x.fillStyle = "#fff";
      x.fillRect(0, 0, 700, 200);
      x.fillStyle = "#000";
      x.font = "32px sans-serif";
      x.fillText("Guaranteed 10% daily profit", 20, 70);
      x.fillText("UPI rajesh.trade@okaxis", 20, 130);
      const blob: Blob = await new Promise((res) =>
        c.toBlob((b) => res(b!), "image/png"),
      );
      const buf = new Uint8Array(await blob.arrayBuffer());
      return Array.from(buf);
    });

    await page.setInputFiles("#photo", {
      name: "shot.png",
      mimeType: "image/png",
      buffer: Buffer.from(png),
    });

    await page.waitForTimeout(25000);

    const notice = await page
      .locator("[role='status'], .notice")
      .allTextContents();
    const box = await page.locator("textarea").first().inputValue();

    console.log(`\n===== lang=${lang} =====`);
    console.log("NOTICE: " + JSON.stringify(notice));
    console.log("BOX: " + JSON.stringify(box.slice(0, 120)));
    for (const p of problems) console.log(p);
    console.log("===== END =====\n");

    expect(true).toBe(true);
  });
}
