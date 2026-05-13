"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { CartItem, Product } from "@/types/product";

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((previous) => {
      const existing = previous.find(
        (item) => item.product.slug === product.slug,
      );

      if (existing) {
        toast.success("Quantity updated in cart");
        return previous.map((item) =>
          item.product.slug === product.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      toast.success("Added to cart");
      return [...previous, { product, quantity: 1 }];
    });
  };

  const handleRemoveItem = (productSlug: string) => {
    setCartItems((previous) =>
      previous.filter((item) => item.product.slug !== productSlug),
    );
    toast.success("Removed from cart");
  };

  const handleUpdateQuantity = (productSlug: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productSlug);
      return;
    }

    setCartItems((previous) =>
      previous.map((item) =>
        item.product.slug === productSlug ? { ...item, quantity } : item,
      ),
    );
  };

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  return {
    cartItems,
    totalCartItems,
    handleAddToCart,
    handleRemoveItem,
    handleUpdateQuantity,
  };
}
