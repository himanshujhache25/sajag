import { test } from "@playwright/test";

/* ============================================================================
   Sajag now opens in the phone's own language when it is one of the twelve
   it speaks, and Playwright's browser reports en-US. The journeys below are
   all written as Hindi journeys — Rameshwar pastes a message and looks for
   "जाँचो" — so each one pins the language before the first paint instead of
   depending on the runner's locale.

   It is written through localStorage rather than a URL flag because that is
   where the real app keeps the choice: the test exercises the same path a
   returning person takes, not a back door.
   ========================================================================== */

export function openInHindi() {
  test.beforeEach(async ({ context }) => {
    await context.addInitScript(() => {
      if (!localStorage.getItem("sajag.settings.v1")) {
        localStorage.setItem(
          "sajag.settings.v1",
          JSON.stringify({ lang: "hi" }),
        );
      }
    });
  });
}
