import { defineConfig, devices } from "@playwright/test";

/* The journeys are walked on a small, slow phone, because that is the phone
   the people we built this for actually hold. */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  /* Three at a time. Six phones at once starved each other on a laptop and
     a journey failed on a timeout rather than on anything real. */
  workers: 3,
  /* A running list locally, because that is what you watch. On CI nobody is
     watching, so write the HTML report the workflow keeps as an artifact. */
  reporter: process.env.CI
    ? [["list"], ["html", { open: "never" }]]
    : [["list"]],
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "phone",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: process.env.E2E_DEV
      ? "npx next dev -p 3000"
      : "npx next build && npx next start -p 3000",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: false,
    timeout: 240_000,
  },
});
