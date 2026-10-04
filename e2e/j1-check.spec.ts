import { test, expect } from "@playwright/test";
import { openInHindi } from "./lang";

/* J1 — Rameshwar, 64, Hindi, a borrowed phone with no network.
   He pastes a message, taps जाँचो, and must see a verdict he can act on.
   The whole journey has to work with the aeroplane mode on. */

const G1 =
  "Namaste sir! Hamare VIP Premium group me judiye https://chat.whatsapp.com/DEMOcode123 . Daily 5-10% guaranteed profit, 100% sure shot calls. SEBI registered analyst INH000999999. Sirf 20 seats bachi hain, aaj hi join karein. Registration fee Rs 5000 UPI: rajesh.trade@okaxis";

openInHindi();

test("J1: a risky message is judged in Hindi with the network off", async ({
  page,
  context,
}) => {
  await page.goto("/check");

  /* Hindi is the default, so the heading is the first thing we check. */
  await expect(page.getByRole("heading", { name: "क्या आया है आपके पास?" })).toBeVisible();

  /* Wait until the page is alive in the hand before cutting the network,
     the way a real phone loads once and then walks into a basement. */
  await page.waitForLoadState("load");
  await page.waitForTimeout(2000);
  await page.locator("#message").click();
  await page.keyboard.insertText("abc");
  await expect(page.getByRole("button", { name: "जाँचो" })).toBeEnabled();

  /* From here on nothing may touch the wire. */
  await context.setOffline(true);

  await page.locator("#message").fill("");
  await page.locator("#message").click();
  await page.keyboard.insertText(G1);
  await expect(page.locator("#message")).toHaveValue(G1);
  await page.getByRole("button", { name: "जाँचो" }).click();

  await page.waitForURL("**/check/result");

  /* The stamp, in words, not only in colour. */
  await expect(page.getByText("खतरा", { exact: false }).first()).toBeVisible();

  /* What to do now comes before why, always. */
  const whatNow = page.getByText("अभी क्या करें");
  await expect(whatNow).toBeVisible();

  /* Three steps for a high-risk reading. */
  const steps = page.locator("ol li");
  expect(await steps.count()).toBeGreaterThanOrEqual(3);

  /* The family note can be opened and carries the verdict word. */
  await page.getByRole("button", { name: /परिवार|बताएँ|भेज/ }).first().click();
  await expect(page.locator("#family-message")).toHaveValue(/खतरा/);

  await context.setOffline(false);
});
