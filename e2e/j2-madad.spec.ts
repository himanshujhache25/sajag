import { test, expect } from "@playwright/test";
import { openInHindi } from "./lang";

/* J2 — the money has already gone. Six questions, then a plan the person can
   carry into a police station. All of it with the network off, because the
   first thing many people do is panic and lose signal in a bank queue. */

openInHindi();

test("J2: the madad wizard reaches a plan and a printable page offline", async ({
  page,
  context,
}) => {
  await page.goto("/madad");
  await expect(
    page.getByRole("heading", { name: "पैसा चला गया? पहले साँस लें।" }),
  ).toBeVisible();

  /* The only emergency button in the product, and it must be a real dial. */
  const call = page.getByRole("link", { name: "1930 पर कॉल करें" });
  await expect(call).toHaveAttribute("href", "tel:1930");

  await page.waitForLoadState("load");
  await page.waitForTimeout(2000);
  await page.getByRole("radio", { name: "आज", exact: true }).click();
  await context.setOffline(true);

  await expect(page.getByText("1 / 6")).toBeVisible();
  await page.getByRole("button", { name: "आगे", exact: true }).click();

  await page.getByRole("checkbox", { name: "यूपीआई", exact: true }).click();
  await page.getByRole("button", { name: "आगे", exact: true }).click();

  await page.locator("#amount").click();
  await page.keyboard.insertText("500000");
  /* Indian grouping while typing: five lakh, not five hundred thousand. */
  await expect(page.locator("#amount")).toHaveValue("5,00,000");
  await page.getByRole("button", { name: "आगे", exact: true }).click();

  await page.locator("#to-whom").click();
  await page.keyboard.insertText("rajesh.trade@okaxis INH000999999");
  await page.locator("#txn").click();
  await page.keyboard.insertText("UTR123456789");
  await page.getByRole("button", { name: "आगे", exact: true }).click();

  // The promise options are quotations of what was said to the person, so
  // they carry quotation marks. Matched loosely here: this journey is about
  // reaching a plan, not about punctuation.
  await page.getByRole("checkbox", { name: /पक्का मुनाफा/ }).click();
  await page.getByRole("button", { name: "आगे", exact: true }).click();

  await expect(page.getByText("6 / 6")).toBeVisible();
  await page
    .getByRole("checkbox", { name: "चैट के स्क्रीनशॉट", exact: true })
    .click();
  await page.getByRole("button", { name: "मेरी योजना बनाओ" }).click();

  await page.waitForURL("**/madad/plan");

  /* The script carries the person's own facts, with the blanks visible. */
  const script = page.locator("#script-card");
  await expect(script).toContainText("5,00,000");
  await expect(script).toContainText("UTR123456789");

  /* Four time boxes, right now first and the plain truth last. */
  await expect(page.getByText("अभी, पहले घंटे में")).toBeVisible();
  await expect(page.getByText("आज के अंदर")).toBeVisible();
  await expect(page.getByText("इस हफ्ते")).toBeVisible();
  await expect(page.getByText("सच बात")).toBeVisible();

  /* Money went by UPI, so the bank step must be there. Nothing promises the
     money back, and the recovery-fee warning is present. */
  await expect(
    page.getByText("अपने यूपीआई ऐप या बैंक की हेल्पलाइन"),
  ).toBeVisible();
  await expect(page.getByText("हो सकता है पैसा वापस न आए।")).toBeVisible();
  await expect(page.getByText("वह दूसरी ठगी है।")).toBeVisible();

  /* The draft is there to be carried away. */
  await expect(page.getByText("SCORES के लिए मसौदा")).toBeVisible();

  /* It prints: in print the shell is gone and the page is black on white. */
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("header[data-shell]")).toBeHidden();
  await expect(page.getByRole("button", { name: /छापें/ })).toBeHidden();
  await expect(script).toBeVisible();
  const colour = await script.evaluate(
    (el) => getComputedStyle(el).color,
  );
  expect(colour).toBe("rgb(0, 0, 0)");
  await page.emulateMedia({ media: "screen" });

  await context.setOffline(false);
});
