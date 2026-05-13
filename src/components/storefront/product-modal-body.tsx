import type { Product } from "@/types/product";
import { ProductModalDetails } from "./product-modal-details";
import { ProductModalGallery } from "./product-modal-gallery";

interface ProductModalBodyProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onClose: () => void;
}

export function ProductModalBody({
  product,
  onAddToCart,
  onClose,
}: Readonly<ProductModalBodyProps>) {
  return (
    <div className="grid gap-8 p-8 md:grid-cols-2">
      <ProductModalGallery product={product} />
      <ProductModalDetails
        product={product}
        onAddToCart={onAddToCart}
        onClose={onClose}
      />
    </div>
  );
}
