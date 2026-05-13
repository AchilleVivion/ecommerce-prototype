import type { Product } from "@/types/product";
import { ImageWithFallback } from "./image-with-fallback";

interface ProductModalGalleryProps {
  product: Product;
}

export function ProductModalGallery({ product }: ProductModalGalleryProps) {
  return (
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
  );
}
