import { products as staticProducts } from "@/data/products";
import { slugify } from "@/lib/slugify";
import type { Product } from "@/types/product";
import { fetchProductsFromSanity } from "./client";
import { mapGraphQLProduct, type GraphQLProductNode } from "./map-product";

export function getStaticFallbackProducts(): Product[] {
  return staticProducts.map((product) => ({
    slug: slugify(product.name),
    name: product.name,
    price: product.price,
    discountedPrice: product.discountedPrice,
    discount: product.discount,
    category: product.category,
    image: product.image,
    rating: product.rating,
    reviews: product.reviews,
    description: product.description,
    featured: false,
  }));
}

export async function getProducts(locale: string): Promise<Product[]> {
  const hasSanityConfig = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

  if (!hasSanityConfig) {
    return getStaticFallbackProducts();
  }

  try {
    const nodes = await fetchProductsFromSanity();
    const mapped = nodes
      .map((node) => mapGraphQLProduct(node as GraphQLProductNode, locale))
      .filter((product): product is Product => product !== null);

    if (mapped.length > 0) {
      return mapped;
    }
  } catch {
    // Fall through to static catalog when Sanity is unavailable.
  }

  return getStaticFallbackProducts();
}
