import { test, expect } from "@playwright/test";
import { openInHindi } from "./lang";

/* J7 — reading a photo.

   This exists because photo reading was broken in every production build and
   no test noticed. Tesseract fetches its worker, its wasm core and each
   language file at runtime, and by default it fetches them from a CDN. The
   Content-Security-Policy allows neither, so the worker died on load, the
   catch in the composer ran, and the person was told "the picture was not
   read clearly. Paste the message or take it again" — blaming their photo
   for a configuration mistake, and sending them off to retake a picture that
   was never going to work.

   So the assertion that matters is not "no error appeared". It is that real
   words came out of a real image, and that nothing was fetched from anybody
   else's server on the way. */

openInHindi();

async function drawMessage(page: import("@playwright/test").Page) {
  /* Drawn in the browser rather than committed as a fixture, so the test
     cannot pass against a stale file. */
  const bytes = await page.evaluate(async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 700;
    canvas.height = 200;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#000000";
    context.font = "32px sans-serif";
    context.fillText("Guaranteed 10% daily profit", 20, 70);
    context.fillText("UPI rajesh.trade@okaxis", 20, 130);
    const blob: Blob = await new Promise((resolve) =>
      canvas.toBlob((b) => resolve(b!), "image/png"),
    );
    return Array.from(new Uint8Array(await blob.arrayBuffer()));
  });
  return Buffer.from(bytes);
}

test("J7: a photo is read on the phone, with nothing fetched from a CDN", async ({
  page,
}) => {
  const offsite: string[] = [];
  page.on("request", (request) => {
    const url = request.url();
    /* blob: and data: URLs are built by the page itself and never leave it;
       the worker is started from one. Only a real host is a leak. */
    const local =
      url.startsWith("http://127.0.0.1") ||
      url.startsWith("blob:http://127.0.0.1") ||
      url.startsWith("data:");
    if (!local) offsite.push(url);
  });

  await page.goto("/check");
  await page.setInputFiles("#photo", {
    name: "whatsapp.png",
    mimeType: "image/png",
    buffer: await drawMessage(page),
  });

  const box = page.locator("textarea").first();
  await expect(box).toHaveValue(/Guaranteed/i, { timeout: 60_000 });

  /* The words the engine needs to find must survive the reading. */
  const text = await box.inputValue();
  expect(text).toMatch(/10\s*%/);
  expect(text).toMatch(/okaxis/i);

  /* The failure message must not be on screen. */
  await expect(page.getByText(/not read clearly|साफ़ नहीं/i)).toHaveCount(0);

  /* The whole point of on-device reading: the image, and the person, stay
     private. A CDN request here would also mean the app stops working on a
     phone with no network. */
  expect(offsite).toEqual([]);
});
