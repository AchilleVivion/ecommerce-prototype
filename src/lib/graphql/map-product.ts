import type { LocalizedItem } from "./resolve-localized";
import { resolveLocalizedString } from "./resolve-localized";
import type { Product } from "@/types/product";

export interface GraphQLProductNode {
  slug?: { current?: string | null } | null;
  name?: LocalizedItem[] | null;
  description?: LocalizedItem[] | null;
  price?: number | null;
  discountedPrice?: number | null;
  discount?: number | null;
  rating?: number | null;
  reviews?: number | null;
  featured?: boolean | null;
  category?: {
    title?: LocalizedItem[] | null;
  } | null;
  image?: {
    asset?: { url?: string | null } | null;
  } | null;
  imageUrl?: string | null;
}

export function mapGraphQLProduct(
  node: GraphQLProductNode,
  locale: string,
): Product | null {
  const slug = node.slug?.current?.trim();
  if (!slug) {
    return null;
  }

  const name = resolveLocalizedString(node.name, locale);
  if (!name) {
    return null;
  }

  const price = node.price ?? 0;
  const discountedPrice = node.discountedPrice ?? undefined;
  const discount = node.discount ?? undefined;
  const image = node.image?.asset?.url ?? node.imageUrl ?? "";

  return {
    slug,
    name,
    price,
    discountedPrice,
    discount,
    category: resolveLocalizedString(node.category?.title, locale) || "Uncategorized",
    image,
    rating: node.rating ?? 0,
    reviews: node.reviews ?? 0,
    description: resolveLocalizedString(node.description, locale) || undefined,
    featured: node.featured ?? false,
  };
}
