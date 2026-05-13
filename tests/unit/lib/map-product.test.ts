import { describe, expect, it } from "vitest";
import { mapGraphQLProduct } from "@/lib/graphql/map-product";

const alphaNode = {
  slug: { current: "alpha-headphones" },
  name: [
    { language: "en", value: "Alpha Headphones" },
    { language: "fr", value: "Casque Alpha" },
  ],
  description: [{ language: "en", value: "Great sound" }],
  price: 100,
  discountedPrice: 80,
  discount: 20,
  rating: 4.2,
  reviews: 10,
  featured: true,
  category: {
    title: [
      { language: "en", value: "Electronics" },
      { language: "fr", value: "Electronique" },
    ],
  },
  imageUrl: "https://example.com/a.jpg",
};

describe("mapGraphQLProduct locale resolution", () => {
  it("maps a graphql node with locale resolution", () => {
    const product = mapGraphQLProduct(alphaNode, "fr");

    expect(product).toEqual({
      slug: "alpha-headphones",
      name: "Casque Alpha",
      price: 100,
      discountedPrice: 80,
      discount: 20,
      category: "Electronique",
      image: "https://example.com/a.jpg",
      rating: 4.2,
      reviews: 10,
      description: "Great sound",
      featured: true,
    });
  });

  it("falls back to en for partial fr translations", () => {
    const product = mapGraphQLProduct(
      {
        slug: { current: "beta-wallet" },
        name: [{ language: "en", value: "Beta Wallet" }],
        price: 50,
        rating: 4.8,
        reviews: 5,
        category: { title: [{ language: "en", value: "Accessories" }] },
        imageUrl: "https://example.com/b.jpg",
      },
      "fr",
    );

    expect(product?.name).toBe("Beta Wallet");
    expect(product?.category).toBe("Accessories");
  });
});

describe("mapGraphQLProduct validation", () => {
  it("returns null when slug or name is missing", () => {
    expect(mapGraphQLProduct({ slug: { current: "" } }, "en")).toBeNull();
    expect(
      mapGraphQLProduct({ slug: { current: "x" }, name: [] }, "en"),
    ).toBeNull();
  });
});
