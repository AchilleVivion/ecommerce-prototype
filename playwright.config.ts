import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  globalSetup: "./tests/mocks/global-setup.ts",
  globalTeardown: "./tests/mocks/global-teardown.ts",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    env: {
      USE_MOCKS: process.env.USE_MOCKS ?? "",
      NEXT_PUBLIC_SANITY_PROJECT_ID:
        process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "test-project",
      NEXT_PUBLIC_SANITY_DATASET:
        process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
      NEXT_PUBLIC_SANITY_GRAPHQL_TAG:
        process.env.NEXT_PUBLIC_SANITY_GRAPHQL_TAG ?? "default",
    },
  },
});
