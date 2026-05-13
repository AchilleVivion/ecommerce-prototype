import type { CartItem } from "@/types/product";
import { CartItemRow } from "./cart-item-row";

interface CartItemsListProps {
  items: CartItem[];
  onUpdateQuantity: (productSlug: string, quantity: number) => void;
  onRemoveItem: (productSlug: string) => void;
}

export function CartItemsList({
  items,
  onUpdateQuantity,
  onRemoveItem,
}: Readonly<CartItemsListProps>) {
  if (items.length === 0) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-slate-500">
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItemRow
          key={item.product.slug}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
}
