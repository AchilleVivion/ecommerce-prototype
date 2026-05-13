import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { StorefrontOverlays } from "@/components/storefront/storefront-overlays";
import { sampleProducts } from "@tests/fixtures/products";

vi.mock("@/components/storefront/cart-sidebar", () => ({
  CartSidebar: () => <p>cart-sidebar</p>,
}));

vi.mock("@/components/storefront/product-modal", () => ({
  ProductModal: () => <p>product-modal</p>,
}));

describe("StorefrontOverlays", () => {
  it("renders cart and product modal overlays", () => {
    render(
      <StorefrontOverlays
        isCartOpen
        onCartClose={vi.fn()}
        cartItems={[]}
        onUpdateQuantity={vi.fn()}
        onRemoveItem={vi.fn()}
        selectedProduct={sampleProducts[0]!}
        isProductModalOpen
        onProductModalClose={vi.fn()}
        onAddToCart={vi.fn()}
      />,
    );

    expect(screen.getByText("cart-sidebar")).toBeInTheDocument();
    expect(screen.getByText("product-modal")).toBeInTheDocument();
  });
});
