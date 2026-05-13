"use client";

import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/types/product";
import { ImageWithFallback } from "./image-with-fallback";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onProductClick,
}: ProductCardProps) {
  return (
    <div className="group cursor-pointer overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 hover:shadow-lg">
      <button
        type="button"
        onClick={() => onProductClick(product)}
        className="relative block aspect-square w-full overflow-hidden bg-slate-100"
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.discount ? (
          <div className="absolute top-2 right-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
            -{product.discount}%
          </div>
        ) : null}
      </button>

      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-sm font-semibold text-slate-900">
          {product.name}
        </h3>
        <p className="mb-3 line-clamp-1 text-xs text-slate-500">
          {product.category}
        </p>
        <div className="mb-3 flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium text-slate-700">
            {product.rating}
          </span>
          <span className="text-xs text-slate-500">({product.reviews})</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            {product.discount ? (
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-900">
                  ${product.discountedPrice}
                </span>
                <span className="text-sm text-slate-500 line-through">
                  ${product.price}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-slate-900">
                ${product.price}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}