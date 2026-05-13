"use client";

import type { CartItem } from "@/types/product";
import { CartQuantityControls } from "./cart-quantity-controls";
import { ImageWithFallback } from "./image-with-fallback";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productSlug: string, quantity: number) => void;
  onRemoveItem: (productSlug: string) => void;
}

export function CartItemRow({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: Readonly<CartItemRowProps>) {
  const price = item.product.discountedPrice || item.product.price;

  return (
    <div className="flex gap-4 rounded-lg bg-slate-50 p-3">
      <ImageWithFallback
        src={item.product.image}
        alt={item.product.name}
        className="h-20 w-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="mb-1 text-sm font-semibold text-slate-900">
          {item.product.name}
        </h3>
        <p className="mb-2 text-sm font-bold text-slate-900">${price}</p>
        <CartQuantityControls
          productSlug={item.product.slug}
          quantity={item.quantity}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
        />
      </div>
    </div>
  );
}
