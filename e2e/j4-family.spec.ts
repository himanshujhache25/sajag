import { test, expect } from "@playwright/test";
import { openInHindi } from "./lang";

/* J4, the checklist part — Priya is setting up her father's phone from two
   states away. Six steps, a trusted number that stays on the phone, and a
   plain statement that she cannot read his messages. */

openInHindi();

test("J4: the caregiver checklist and the trusted contact", async ({ page }) => {
  await page.goto("/family");
  await expect(page.getByRole("heading", { name: "परिवार" })).toBeVisible();
  await page.waitForLoadState("load");
  await page.waitForTimeout(1500);

  /* The promise comes before the instructions, not after them. */
  await expect(
    page.getByText("आप उनके मैसेज नहीं देख सकते।"),
  ).toBeVisible();

  await page.locator("#trusted-name").click();
  await page.keyboard.insertText("प्रिया");
  await page.locator("#trusted-number").click();
  await page.keyboard.insertText("9876543210");
  await page.getByRole("button", { name: "फोन में रख लो" }).click();
  await expect(page.getByText("रख लिया।")).toBeVisible();

  /* Six steps, and the counter follows the ticks. */
  const boxes = page.locator("#caregiver-checklist input[type=checkbox]");
  await expect(boxes).toHaveCount(6);
  await expect(page.getByText("0 / 6 हो गया")).toBeVisible();
  for (let i = 0; i < 6; i++) await boxes.nth(i).check();
  await expect(page.getByText("6 / 6 हो गया")).toBeVisible();

  /* The checklist hands off to the real screens rather than describing them. */
  await expect(page.getByRole("link", { name: "सेटिंग खोलो" }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "समझौता खोलो" })).toBeVisible();

  /* The trusted person survives a reload, because it is on the phone. */
  await page.reload();
  await expect(page.locator("#trusted-name")).toHaveValue("प्रिया");
});
