import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StorefrontMain } from "@/components/storefront/storefront-main";

vi.mock("@/components/storefront/product-grid-section", () => ({
  ProductGridSection: () => <p>grid</p>,
}));

describe("StorefrontMain", () => {
  it("renders the listing title and product count", () => {
    render(
      <StorefrontMain
        selectedCategory="All"
        searchQuery=""
        sortBy="featured"
        onAddToCart={vi.fn()}
        onProductClick={vi.fn()}
      />,
    );

    expect(screen.getByRole("heading", { name: "All Products" })).toBeVisible();
    expect(
      screen.getByText((content) => content.includes("products found")),
    ).toBeVisible();
    expect(screen.getByText("grid")).toBeInTheDocument();
  });
});
