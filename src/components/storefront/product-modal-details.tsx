import { RotateCcw, Shield, ShoppingCart, Truck } from "lucide-react";
import type { Product } from "@/types/product";
import { ProductPrice } from "./product-price";
import { ProductRating } from "./product-rating";

interface ProductModalDetailsProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClose: () => void;
}

export function ProductModalDetails({
  product,
  onAddToCart,
  onClose,
}: Readonly<ProductModalDetailsProps>) {
  const description =
    product.description ||
    `High-quality ${product.name.toLowerCase()} with exceptional features and durability. Perfect for everyday use and built to last.`;

  return (
    <div className="flex flex-col">
      <span className="mb-2 text-sm font-medium text-blue-600">
        {product.category}
      </span>
      <h2 className="mb-4 text-3xl font-bold text-slate-900">{product.name}</h2>
      <ProductRating rating={product.rating} reviews={product.reviews} size="modal" />
      <div className="my-6">
        <ProductPrice product={product} size="modal" />
      </div>
      <p className="mb-8 leading-relaxed text-slate-600">{description}</p>
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
  );
}
