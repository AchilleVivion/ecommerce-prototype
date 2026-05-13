import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CartItemsList } from "@/components/storefront/cart-items-list";
import { sampleProducts } from "@tests/fixtures/products";

vi.mock("@/components/storefront/cart-item-row", () => ({
  CartItemRow: ({ item }: { item: { product: { name: string } } }) => (
    <div>{item.product.name}</div>
  ),
}));

describe("CartItemsList", () => {
  it("renders empty and populated states", () => {
    const { rerender } = render(
      <CartItemsList
        items={[]}
        onUpdateQuantity={vi.fn()}
        onRemoveItem={vi.fn()}
      />,
    );

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();

    rerender(
      <CartItemsList
        items={[{ product: sampleProducts[0]!, quantity: 1 }]}
        onUpdateQuantity={vi.fn()}
        onRemoveItem={vi.fn()}
      />,
    );

    expect(screen.getByText("Alpha Headphones")).toBeInTheDocument();
  });
});
