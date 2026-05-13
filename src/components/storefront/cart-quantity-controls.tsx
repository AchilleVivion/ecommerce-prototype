"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

interface CartQuantityControlsProps {
  productSlug: string;
  quantity: number;
  onUpdateQuantity: (productSlug: string, quantity: number) => void;
  onRemoveItem: (productSlug: string) => void;
}

export function CartQuantityControls({
  productSlug,
  quantity,
  onUpdateQuantity,
  onRemoveItem,
}: Readonly<CartQuantityControlsProps>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onUpdateQuantity(productSlug, quantity - 1)}
          className="rounded p-1 hover:bg-slate-200"
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
        <button
          type="button"
          onClick={() => onUpdateQuantity(productSlug, quantity + 1)}
          className="rounded p-1 hover:bg-slate-200"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <button
        type="button"
        onClick={() => onRemoveItem(productSlug)}
        className="rounded p-1 text-red-600 hover:bg-red-100"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}
