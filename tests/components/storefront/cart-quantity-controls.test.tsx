import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CartQuantityControls } from "@/components/storefront/cart-quantity-controls";

describe("CartQuantityControls", () => {
  it("updates and removes cart quantities", async () => {
    const user = userEvent.setup();
    const onUpdateQuantity = vi.fn();
    const onRemoveItem = vi.fn();

    render(
      <CartQuantityControls
        productId={7}
        quantity={2}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
      />,
    );

    expect(screen.getByText("2")).toBeInTheDocument();

    await user.click(screen.getAllByRole("button")[0]!);
    expect(onUpdateQuantity).toHaveBeenCalledWith(7, 1);

    await user.click(screen.getAllByRole("button")[1]!);
    expect(onUpdateQuantity).toHaveBeenCalledWith(7, 3);

    await user.click(screen.getAllByRole("button")[2]!);
    expect(onRemoveItem).toHaveBeenCalledWith(7);
  });
});
