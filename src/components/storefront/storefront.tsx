"use client";

import { useMemo, useState } from "react";
import { Toaster } from "sonner";
import { products } from "@/data/products";
import { useCart } from "@/hooks/use-cart";
import { getProductCategories } from "@/lib/storefront-catalog";
import type { Product } from "@/types/product";
import { Filters } from "./filters";
import { Header } from "./header";
import { StorefrontMain } from "./storefront-main";
import { StorefrontOverlays } from "./storefront-overlays";

export function Storefront() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const cart = useCart();
  const categories = useMemo(() => getProductCategories(products), []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="bottom-right" richColors />
      <Header
        cartItemCount={cart.totalCartItems}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Filters
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <StorefrontMain
        selectedCategory={selectedCategory}
        searchQuery={searchQuery}
        sortBy={sortBy}
        onAddToCart={cart.handleAddToCart}
        onProductClick={(product) => {
          setSelectedProduct(product);
          setIsProductModalOpen(true);
        }}
      />
      <StorefrontOverlays
        isCartOpen={isCartOpen}
        onCartClose={() => setIsCartOpen(false)}
        cartItems={cart.cartItems}
        onUpdateQuantity={cart.handleUpdateQuantity}
        onRemoveItem={cart.handleRemoveItem}
        selectedProduct={selectedProduct}
        isProductModalOpen={isProductModalOpen}
        onProductModalClose={() => setIsProductModalOpen(false)}
        onAddToCart={cart.handleAddToCart}
      />
    </div>
  );
}
