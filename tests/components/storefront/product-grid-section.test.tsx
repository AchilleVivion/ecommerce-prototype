import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductGridSection } from "@/components/storefront/product-grid-section";
import { sampleProducts } from "@tests/fixtures/products";

vi.mock("@/components/storefront/product-card", () => ({
  ProductCard: ({ product }: { product: { name: string } }) => (
    <div>{product.name}</div>
  ),
}));

describe("ProductGridSection", () => {
  it("renders an empty state", () => {
    render(
      <ProductGridSection
        products={[]}
        onAddToCart={vi.fn()}
        onProductClick={vi.fn()}
      />,
    );

    expect(screen.getByText("No products found")).toBeInTheDocument();
  });

  it("renders product cards when items exist", () => {
    render(
      <ProductGridSection
        products={sampleProducts}
        onAddToCart={vi.fn()}
        onProductClick={vi.fn()}
      />,
    );

    expect(screen.getByText("Alpha Headphones")).toBeInTheDocument();
    expect(screen.getByText("Beta Wallet")).toBeInTheDocument();
  });
});
