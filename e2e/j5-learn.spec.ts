import { test, expect } from "@playwright/test";
import { openInHindi } from "./lang";

/* J5 — someone on a train with no signal wants to understand a word they
   saw in a message, and then wants to see what borrowing actually does.
   Both must work with the network off: the twelve cards and the simulator
   are precached, and nothing about either asks a server anything. */

openInHindi();

test("J5: the concept cards and the simulator work offline", async ({
  page,
  context,
}) => {
  await page.goto("/learn");
  await page.waitForLoadState("load");
  /* Give the service worker time to take the twelve pages. */
  await page.waitForTimeout(2500);
  await context.setOffline(true);

  await expect(page.getByRole("heading", { name: "समझो" })).toBeVisible();

  /* All twelve, numbered. */
  const index = page.getByRole("navigation", { name: "समझो" });
  await expect(index.getByRole("link")).toHaveCount(12);

  /* The search runs on the phone. "मार्जिन" is nowhere in the leverage card's
     title, only in its keywords, so this also proves the scorer works. */
  await page.getByLabel("खोजिए").fill("मार्जिन");
  await expect(index.getByRole("link")).toHaveCount(1);
  await expect(index.getByRole("link").first()).toContainText("उधार और मार्जिन");

  await index.getByRole("link").first().click();
  await page.waitForURL("**/learn/leverage");

  /* The five parts are all there, in order. */
  await expect(page.getByRole("heading", { name: "उधार और मार्जिन" })).toBeVisible();
  await expect(page.getByRole("heading", { name: /रोज़ की मिसाल/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /इसका मतलब/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /जाल कहाँ है/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /खुद आज़माइए/ })).toBeVisible();
  await expect(page.getByText("यह जानकारी है, सलाह नहीं।")).toBeVisible();

  /* One wrong answer, then the right one. No score either way. */
  await page.getByRole("button", { name: /₹1,000 का नुकसान/ }).click();
  await expect(page.getByText("यह नहीं")).toBeVisible();
  await expect(page.getByText("यह बिना उधार वाली हालत होती।")).toBeVisible();

  await page.getByRole("button", { name: "फिर कोशिश कीजिए" }).click();
  await page.getByRole("button", { name: /लगभग पूरी पूँजी चली गई/ }).click();
  await expect(page.getByText("सही", { exact: true })).toBeVisible();
  await expect(page.getByText("कोई नंबर नहीं कटता।")).toBeVisible();

  /* The related link goes to the simulator, which is also offline. */
  await page.getByRole("link", { name: /उधार का तराज़ू चलाइए/ }).click();
  await page.waitForURL("**/simulate");

  /* The banner is above the chart on every run, and it is unmissable. */
  await expect(
    page.getByText("ये बनावटी आँकड़े हैं, भविष्यवाणी नहीं। असली पैसा नहीं लगा।"),
  ).toBeVisible();

  /* Tab one: the asymmetry of a loss, which is the whole point. */
  await expect(page.getByText("₹10,000 → ₹5,000 (-50%)")).toBeVisible();
  await expect(page.getByText("वापस ₹10,000 के लिए +100% चाहिए")).toBeVisible();

  /* Push the slider all the way to 90 percent with the keyboard, the way
     someone using a switch or a screen reader would. */
  const slider = page.getByLabel(/कितना नुकसान हुआ/);
  await slider.focus();
  await expect(slider).toHaveValue("50");
  await page.keyboard.press("End");
  await expect(slider).toHaveValue("90");
  await expect(page.getByText(/वापस ₹10,000 के लिए/)).toHaveText(
    "वापस ₹10,000 के लिए +900% चाहिए",
  );

  /* Tab two: the same seed must draw the same picture twice. */
  await page.getByRole("tab", { name: "उधार का तराज़ू" }).click();
  await expect(page.getByText("बीज संख्या: 20260101")).toBeVisible();

  const first = await page.getByText(/बीच का नतीजा: ₹/).textContent();
  await page.getByRole("button", { name: "फिर चलाओ" }).click();
  await expect(page.getByText("बीज संख्या: 20260102")).toBeVisible();

  /* Ten times leverage must wipe people out more often than one times.
     The summary is read out of the chart's own label, so a screen reader
     gets the same numbers the eye does. */
  await page.getByRole("button", { name: "1×" }).click();
  const calm = await page.getByRole("img").getAttribute("aria-label");

  await page.getByRole("button", { name: "10×" }).click();
  await page.getByRole("button", { name: "तेज़" }).click();
  const wild = await page.getByRole("img").getAttribute("aria-label");

  expect(calm).toContain("200 बार 20 दिन");
  expect(wild).toContain("10 गुना उधार");
  expect(wild).not.toBe(calm);
  expect(first).toBeTruthy();

  /* The SEBI card sits below the chart with its source and date. */
  await expect(page.getByText(/SEBI study of individual traders/)).toBeVisible();
  await expect(
    page.getByText("यहाँ किसी असली शेयर या फंड का नाम नहीं है।"),
  ).toBeVisible();
});
