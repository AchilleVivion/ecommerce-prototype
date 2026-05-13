import { expect, test } from "@playwright/test";

test("home page renders ShopHub storefront", async ({ page }) => {
  await page.goto("/en");

  await expect(page.getByRole("heading", { name: "ShopHub" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "All Products" })).toBeVisible();
});
