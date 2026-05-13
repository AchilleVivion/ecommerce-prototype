"use client";

import { Minus, Plus, Trash2, X } from "lucide-react";
import type { CartItem } from "@/types/product";
import { ImageWithFallback } from "./image-with-fallback";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

export function CartSidebar({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartSidebarProps) {
  const total = items.reduce(
    (sum, item) =>
      sum + (item.product.discountedPrice || item.product.price) * item.quantity,
    0,
  );

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
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-slate-500">
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 rounded-lg bg-slate-50 p-3"
                    >
                      <ImageWithFallback
                        src={item.product.image}
                        alt={item.product.name}
                        className="h-20 w-20 rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="mb-1 text-sm font-semibold text-slate-900">
                          {item.product.name}
                        </h3>
                        <p className="mb-2 text-sm font-bold text-slate-900">
                          ${item.product.discountedPrice || item.product.price}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              className="rounded p-1 hover:bg-slate-200"
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              className="rounded p-1 hover:bg-slate-200"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id)}
                            className="rounded p-1 text-red-600 hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          {items.length > 0 ? (
            <div className="space-y-4 border-t p-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">
                  Total:
                </span>
                <span className="text-2xl font-bold text-slate-900">
                  ${total.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                Checkout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

