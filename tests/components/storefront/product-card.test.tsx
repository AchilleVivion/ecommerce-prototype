/* eslint-disable @next/next/no-img-element -- lightweight test doubles */

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProductCard } from "@/components/storefront/product-card";
import { sampleProducts } from "@tests/fixtures/products";

vi.mock("@/components/storefront/image-with-fallback", () => ({
  ImageWithFallback: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

describe("ProductCard", () => {
  it("handles product click and add to cart actions", async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();
    const onProductClick = vi.fn();

    render(
      <ProductCard
        product={sampleProducts[0]!}
        onAddToCart={onAddToCart}
        onProductClick={onProductClick}
      />,
    );

    expect(screen.getByText("Alpha Headphones")).toBeInTheDocument();
    expect(screen.getByText("-20%")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /Alpha Headphones/ }));
    expect(onProductClick).toHaveBeenCalledWith(sampleProducts[0]);

    await user.click(screen.getAllByRole("button")[1]!);
    expect(onAddToCart).toHaveBeenCalledWith(sampleProducts[0]);
  });

  it("renders products without a discount badge", () => {
    render(
      <ProductCard
        product={sampleProducts[1]!}
        onAddToCart={vi.fn()}
        onProductClick={vi.fn()}
      />,
    );

    expect(screen.queryByText(/-%/)).not.toBeInTheDocument();
  });
});
