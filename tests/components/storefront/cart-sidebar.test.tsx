import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CartSidebar } from "@/components/storefront/cart-sidebar";
import { sampleProducts } from "@tests/fixtures/products";

describe("CartSidebar", () => {
  const cartTitle = "Shopping Cart";
  const closeOverlayLabel = "Close cart overlay";

  it("renders open and closed states", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { rerender } = render(
      <CartSidebar
        isOpen={false}
        onClose={onClose}
        items={[]}
        onUpdateQuantity={vi.fn()}
        onRemoveItem={vi.fn()}
      />,
    );

    expect(screen.getByText(cartTitle)).toBeInTheDocument();
    expect(screen.queryByLabelText(closeOverlayLabel)).not.toBeInTheDocument();

    rerender(
      <CartSidebar
        isOpen
        onClose={onClose}
        items={[{ product: sampleProducts[0]!, quantity: 1 }]}
        onUpdateQuantity={vi.fn()}
        onRemoveItem={vi.fn()}
      />,
    );

    expect(screen.getByLabelText(closeOverlayLabel)).toBeInTheDocument();
    expect(screen.getByText("Checkout")).toBeInTheDocument();

    await user.click(screen.getByLabelText(closeOverlayLabel));
    expect(onClose).toHaveBeenCalled();
  });
});
