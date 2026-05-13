import { expect, test } from "@playwright/test";

test("home page renders ShopHub storefront", async ({ page }) => {
  await page.goto("/en");

  await expect(page.getByRole("heading", { name: "ShopHub" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "All Products" })).toBeVisible();
  await expect(page.getByText("Alpha Headphones")).toBeVisible();
});

test("fr locale falls back to english product copy from mocks", async ({ page }) => {
  await page.goto("/fr");

  await expect(page.getByText("Alpha Headphones")).toBeVisible();
});
