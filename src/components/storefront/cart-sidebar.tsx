"use client";

import { X } from "lucide-react";
import type { CartItem } from "@/types/product";
import { CartFooter } from "./cart-footer";
import { CartItemsList } from "./cart-items-list";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

function getCartTotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) =>
      sum + (item.product.discountedPrice || item.product.price) * item.quantity,
    0,
  );
}

export function CartSidebar({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: Readonly<CartSidebarProps>) {
  const total = getCartTotal(items);

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label="Close cart overlay"
          className="fixed inset-0 z-40 bg-black/50"
          onClick={onClose}
        />
      ) : null}

<div
            className={`fixed top-0 right-0 z-50 h-full w-full transform bg-white shadow-2xl transition-transform duration-300 sm:w-96 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          >
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="text-xl font-bold text-slate-900">Shopping Cart</h2>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full p-2 hover:bg-slate-100"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <CartItemsList
                  items={items}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveItem={onRemoveItem}
                />
              </div>
              {items.length > 0 ? <CartFooter total={total} /> : null}
            </div>
          </div>

</>
  );
}
