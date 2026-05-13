import { act, renderHook } from "@testing-library/react";
import { toast } from "sonner";
import { describe, expect, it, vi } from "vitest";
import { useCart } from "@/hooks/use-cart";
import { sampleProducts } from "@tests/fixtures/products";

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("useCart", () => {
  it("adds items and increments quantity for duplicates", () => {
    const product = sampleProducts[0]!;
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.handleAddToCart(product);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.totalCartItems).toBe(1);
    expect(toast.success).toHaveBeenCalledWith("Added to cart");

    act(() => {
      result.current.handleAddToCart(product);
    });

    expect(result.current.cartItems[0]?.quantity).toBe(2);
    expect(result.current.totalCartItems).toBe(2);
    expect(toast.success).toHaveBeenCalledWith("Quantity updated in cart");
  });

  it("updates quantity and removes items", () => {
    const product = sampleProducts[1]!;
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.handleAddToCart(product);
      result.current.handleUpdateQuantity(product.id, 3);
    });
    expect(result.current.cartItems[0]?.quantity).toBe(3);

    act(() => {
      result.current.handleUpdateQuantity(product.id, 0);
    });
    expect(result.current.cartItems).toHaveLength(0);
    expect(toast.success).toHaveBeenCalledWith("Removed from cart");

    act(() => {
      result.current.handleAddToCart(product);
      result.current.handleRemoveItem(product.id);
    });
    expect(result.current.cartItems).toHaveLength(0);
  });
});
