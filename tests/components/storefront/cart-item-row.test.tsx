/* eslint-disable @next/next/no-img-element -- lightweight test doubles */

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CartItemRow } from "@/components/storefront/cart-item-row";
import { sampleProducts } from "@tests/fixtures/products";

vi.mock("@/components/storefront/image-with-fallback", () => ({
  ImageWithFallback: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

describe("CartItemRow", () => {
  it("renders product details and discounted price", () => {
    render(
      <CartItemRow
        item={{ product: sampleProducts[0]!, quantity: 2 }}
        onUpdateQuantity={vi.fn()}
        onRemoveItem={vi.fn()}
      />,
    );

    expect(screen.getByText("Alpha Headphones")).toBeInTheDocument();
    expect(screen.getByText("$80")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
