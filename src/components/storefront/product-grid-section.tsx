import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

interface ProductGridSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function ProductGridSection({
  products,
  onAddToCart,
  onProductClick,
}: Readonly<ProductGridSectionProps>) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-slate-500">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onProductClick={onProductClick}
        />
      ))}
    </div>
  );
}
