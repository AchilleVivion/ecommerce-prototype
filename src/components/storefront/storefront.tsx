"use client";

import { useMemo, useState } from "react";
import { Toaster } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { getProductCategories } from "@/lib/storefront-catalog";
import type { Product } from "@/types/product";
import { Filters } from "./filters";
import { Header } from "./header";
import { StorefrontMain } from "./storefront-main";
import { StorefrontOverlays } from "./storefront-overlays";

interface StorefrontProps {
  initialProducts: Product[];
}

function useStorefrontState() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const cart = useCart();

  return {
    isCartOpen,
    setIsCartOpen,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    selectedProduct,
    setSelectedProduct,
    isProductModalOpen,
    setIsProductModalOpen,
    cart,
  };
}

export function Storefront({ initialProducts }: Readonly<StorefrontProps>) {
  const state = useStorefrontState();
  const categories = useMemo(
    () => getProductCategories(initialProducts),
    [initialProducts],
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="bottom-right" richColors />
      <Header
        cartItemCount={state.cart.totalCartItems}
        onCartClick={() => state.setIsCartOpen(true)}
        searchQuery={state.searchQuery}
        onSearchChange={state.setSearchQuery}
      />
      <Filters
        categories={categories}
        selectedCategory={state.selectedCategory}
        onCategoryChange={state.setSelectedCategory}
        sortBy={state.sortBy}
        onSortChange={state.setSortBy}
      />
      <StorefrontMain
        products={initialProducts}
        selectedCategory={state.selectedCategory}
        searchQuery={state.searchQuery}
        sortBy={state.sortBy}
        onAddToCart={state.cart.handleAddToCart}
        onProductClick={(product) => {
          state.setSelectedProduct(product);
          state.setIsProductModalOpen(true);
        }}
      />
      <StorefrontOverlays
        isCartOpen={state.isCartOpen}
        onCartClose={() => state.setIsCartOpen(false)}
        cartItems={state.cart.cartItems}
        onUpdateQuantity={state.cart.handleUpdateQuantity}
        onRemoveItem={state.cart.handleRemoveItem}
        selectedProduct={state.selectedProduct}
        isProductModalOpen={state.isProductModalOpen}
        onProductModalClose={() => state.setIsProductModalOpen(false)}
        onAddToCart={state.cart.handleAddToCart}
      />
    </div>
  );
}
