"use client";

import type { CartItem, Product } from "@/types/product";
import { CartSidebar } from "./cart-sidebar";
import { ProductModal } from "./product-modal";

interface StorefrontOverlaysProps {
  isCartOpen: boolean;
  onCartClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productSlug: string, quantity: number) => void;
  onRemoveItem: (productSlug: string) => void;
  selectedProduct: Product | null;
  isProductModalOpen: boolean;
  onProductModalClose: () => void;
  onAddToCart: (product: Product) => void;
}

export function StorefrontOverlays({
  isCartOpen,
  onCartClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  selectedProduct,
  isProductModalOpen,
  onProductModalClose,
  onAddToCart,
}: Readonly<StorefrontOverlaysProps>) {
  return (
    <>
      <CartSidebar
        isOpen={isCartOpen}
        onClose={onCartClose}
        items={cartItems}
        onUpdateQuantity={onUpdateQuantity}
        onRemoveItem={onRemoveItem}
      />
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={onProductModalClose}
        onAddToCart={onAddToCart}
      />
    </>
  );
}
