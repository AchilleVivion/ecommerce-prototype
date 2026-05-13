"use client";

import {
  RotateCcw,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  X,
} from "lucide-react";
import type { Product } from "@/types/product";
import { ImageWithFallback } from "./image-with-fallback";

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
}: ProductModalProps) {
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
            <div className="grid gap-8 p-8 md:grid-cols-2">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
                <ImageWithFallback
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                {product.discount ? (
                  <div className="absolute top-4 right-4 rounded bg-red-500 px-3 py-1.5 text-sm font-bold text-white">
                    -{product.discount}% OFF
                  </div>
                ) : null}
              </div>

              <div className="flex flex-col">
                <div className="mb-2">
                  <span className="text-sm font-medium text-blue-600">
                    {product.category}
                  </span>
                </div>

                <h2 className="mb-4 text-3xl font-bold text-slate-900">
                  {product.name}
                </h2>

                <div className="mb-6 flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {product.rating}
                  </span>
                  <span className="text-sm text-slate-500">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="mb-6">
                  {product.discount ? (
                      <div className="flex items-center gap-3">
                        <span className="text-4xl font-bold text-slate-900">
                          ${product.discountedPrice}
                        </span>
                        <span className="text-2xl text-slate-500 line-through">
                          ${product.price}
                        </span>
                      </div>
                  ) : (
                    <span className="text-4xl font-bold text-slate-900">
                      ${product.price}
                    </span>
                  )}
                </div>

                <p className="mb-8 leading-relaxed text-slate-600">
                  {product.description ||
                    `High-quality ${product.name.toLowerCase()} with exceptional features and durability. Perfect for everyday use and built to last.`}
                </p>

                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>

                <div className="grid grid-cols-3 gap-4 border-t pt-6">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Truck className="h-6 w-6 text-blue-600" />
                    <span className="text-xs text-slate-600">Free Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <span className="text-xs text-slate-600">2 Year Warranty</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <RotateCcw className="h-6 w-6 text-blue-600" />
                    <span className="text-xs text-slate-600">30 Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

