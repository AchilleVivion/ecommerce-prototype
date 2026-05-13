"use client";

import { X } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductModalBody } from "./product-modal-body";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function ProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: Readonly<ProductModalProps>) {
  if (!product || !isOpen) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        aria-label="Close product details"
        className="fixed inset-0 z-50 bg-black/50"
        onClick={onClose}
      />

      <div className="fixed inset-4 z-50 overflow-hidden rounded-lg bg-white shadow-2xl sm:inset-auto sm:top-1/2 sm:left-1/2 sm:w-full sm:max-w-4xl sm:-translate-x-1/2 sm:-translate-y-1/2">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-white p-2 shadow-lg hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="max-h-[90vh] overflow-y-auto">
          <ProductModalBody
            product={product}
            onAddToCart={onAddToCart}
            onClose={onClose}
          />
        </div>
      </div>
    </>
  );
}
