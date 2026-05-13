import {
  filterAndSortProducts,
  getListingTitle,
} from "@/lib/storefront-catalog";
import type { Product } from "@/types/product";
import { products } from "@/data/products";
import { ProductGridSection } from "./product-grid-section";

interface StorefrontMainProps {
  selectedCategory: string;
  searchQuery: string;
  sortBy: string;
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export function StorefrontMain({
  selectedCategory,
  searchQuery,
  sortBy,
  onAddToCart,
  onProductClick,
}: StorefrontMainProps) {
  const filteredProducts = filterAndSortProducts(
    products,
    selectedCategory,
    searchQuery,
    sortBy,
  );
  const listingTitle = getListingTitle(searchQuery, selectedCategory);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{listingTitle}</h2>
        <p className="mt-1 text-slate-600">
          {filteredProducts.length} products found
        </p>
      </div>
      <ProductGridSection
        products={filteredProducts}
        onAddToCart={onAddToCart}
        onProductClick={onProductClick}
      />
    </main>
  );
}
