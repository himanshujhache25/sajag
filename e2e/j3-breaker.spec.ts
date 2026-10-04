import { test, expect } from "@playwright/test";
import { openInHindi } from "./lang";

/* J3 — somebody is about to chase a loss. The breaker must slow them down
   without blocking them, and whatever they choose must end in the journal. */

openInHindi();

test("J3: the breaker reaches an exit and writes a journal entry", async ({
  page,
}) => {
  await page.goto("/pause");
  await expect(page.getByRole("heading", { name: "रुको। पहले सोचो।" })).toBeVisible();
  await page.waitForLoadState("load");
  await page.waitForTimeout(1500);

  await page.getByRole("link", { name: /अभी कुछ करने वाला हूँ/ }).click();
  await page.waitForURL("**/pause/breaker");

  await page
    .getByRole("radio", { name: "अभी नुकसान हुआ, वापस कमाना है" })
    .click();

  /* Step 2 reads the person's own pact back, or says plainly there is none. */
  await expect(page.getByText(/आपने यह लिखा था|अभी कोई समझौता/)).toBeVisible();
  await page.getByRole("button", { name: "आगे", exact: true }).click();

  /* The sixty seconds cannot be skipped for the first ten. */
  const skip = page.getByRole("button", { name: "आगे बढ़ो" });
  await expect(skip).toBeDisabled();
  await expect(skip).toBeEnabled({ timeout: 15_000 });
  await skip.click();

  await expect(page.getByText("यह किसका पैसा है?")).toBeVisible();
  await page.getByRole("button", { name: "आगे", exact: true }).click();

  /* The reality card for a loss quotes a sourced fact, never a scolding. */
  await expect(page.getByText(/करीब 90% को फिर घाटा हुआ/)).toBeVisible();
  await expect(page.getByText(/SEBI study/)).toBeVisible();
  await page.getByRole("button", { name: "आगे", exact: true }).click();

  await page.getByRole("button", { name: "24 घंटे रुकूँगा" }).click();
  await expect(page.getByText("डायरी में लिख लिया।")).toBeVisible();

  await page.getByRole("link", { name: "डायरी खोलो" }).click();
  await page.waitForURL("**/pause/journal");

  /* The entry is there, and it is waiting out its 24 hours. */
  await expect(page.getByText("24 घंटे बाकी")).toBeVisible();
});
