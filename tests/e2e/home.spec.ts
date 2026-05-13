import { expect, test } from "@playwright/test";

test("home page renders storefront hero", async ({ page }) => {
  await page.goto("/en");

  await expect(
    page.getByRole("heading", { name: "Ecommerce prototype" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Browse catalog" })).toBeVisible();
});
