import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HeaderBrand } from "@/components/storefront/header-brand";

describe("HeaderBrand", () => {
  it("renders the ShopHub brand and navigation links", () => {
    render(<HeaderBrand />);

    expect(screen.getByRole("heading", { name: "ShopHub" })).toBeVisible();
    expect(screen.getByRole("link", { name: "All Products" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Categories" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Deals" })).toBeVisible();
  });
});
