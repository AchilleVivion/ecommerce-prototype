#!/usr/bin/env tsx
import { createClient } from "next-sanity";
import { products } from "../src/data/products";
import { slugify } from "../src/lib/slugify";

function localizedEn(value: string) {
  return [{ _key: "en", _type: "internationalizedArrayStringValue", language: "en", value }];
}

function localizedEnText(value: string) {
  return [{ _key: "en", _type: "internationalizedArrayTextValue", language: "en", value }];
}

async function seedCategories(
  client: ReturnType<typeof createClient>,
  uniqueCategories: string[],
) {
  const categoryIds = new Map<string, string>();

  for (const title of uniqueCategories) {
    const slug = slugify(title);
    const document = await client.createOrReplace({
      _id: `category-${slug}`,
      _type: "category",
      title: localizedEn(title),
      slug: { _type: "slug", current: slug },
    });
    categoryIds.set(title, document._id);
  }

  return categoryIds;
}

async function seedProducts(
  client: ReturnType<typeof createClient>,
  categoryIds: Map<string, string>,
) {
  for (const product of products) {
    const slug = slugify(product.name);
    const categoryId = categoryIds.get(product.category);

    if (!categoryId) {
      throw new Error(`Missing category for product: ${product.name}`);
    }

    await client.createOrReplace({
      _id: `product-${slug}`,
      _type: "product",
      name: localizedEn(product.name),
      slug: { _type: "slug", current: slug },
      description: product.description
        ? localizedEnText(product.description)
        : [],
      price: product.price,
      discountedPrice: product.discountedPrice,
      discount: product.discount,
      rating: product.rating,
      reviews: product.reviews,
      featured: false,
      category: { _type: "reference", _ref: categoryId },
      imageUrl: product.image,
    });
  }
}

async function main() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !token) {
    throw new Error(
      "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding.",
    );
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2025-02-19",
    token,
    useCdn: false,
  });

  const uniqueCategories = [...new Set(products.map((product) => product.category))];
  const categoryIds = await seedCategories(client, uniqueCategories);
  await seedProducts(client, categoryIds);

  console.log(`Seeded ${products.length} products and ${uniqueCategories.length} categories.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
