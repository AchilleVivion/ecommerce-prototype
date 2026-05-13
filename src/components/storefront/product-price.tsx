import type { Product } from "@/types/product";

interface ProductPriceProps {
  product: Product;
  size?: "card" | "modal";
}

export function ProductPrice({ product, size = "card" }: Readonly<ProductPriceProps>) {
  const priceClass = size === "modal" ? "text-4xl" : "text-lg";
  const strikeClass = size === "modal" ? "text-2xl" : "text-sm";

  if (product.discount) {
    return (
      <div className="flex items-center gap-2">
        <span className={`${priceClass} font-bold text-slate-900`}>
          ${product.discountedPrice}
        </span>
        <span className={`${strikeClass} text-slate-500 line-through`}>
          ${product.price}
        </span>
      </div>
    );
  }

  return (
    <span className={`${priceClass} font-bold text-slate-900`}>
      ${product.price}
    </span>
  );
}
