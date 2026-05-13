import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as graphqlClient from "@/lib/graphql/client";
import {
  getProducts,
  getStaticFallbackProducts,
} from "@/lib/graphql/get-products";

vi.mock("@/lib/graphql/client", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/lib/graphql/client")>();

  return {
    ...actual,
    fetchProductsFromSanity: vi.fn(),
  };
});

const fetchProductsFromSanity = vi.mocked(graphqlClient.fetchProductsFromSanity);
const demoProject = "demo-project";

describe("getStaticFallbackProducts", () => {
  it("maps static catalog items to storefront products with slugs", () => {
    const products = getStaticFallbackProducts();

    expect(products.length).toBeGreaterThan(0);
    expect(products[0]).toMatchObject({
      slug: expect.any(String),
      name: expect.any(String),
      category: expect.any(String),
      featured: false,
    });
  });
});

describe("getProducts", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
    fetchProductsFromSanity.mockReset();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns static fallback when sanity env is missing", async () => {
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

    const products = await getProducts("en");

    expect(products).toEqual(getStaticFallbackProducts());
    expect(fetchProductsFromSanity).not.toHaveBeenCalled();
  });

  it("returns mapped sanity products when fetch succeeds", async () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = demoProject;
    fetchProductsFromSanity.mockResolvedValue([
      {
        slug: { current: "alpha-headphones" },
        name: [{ language: "en", value: "Alpha Headphones" }],
        price: 100,
        rating: 4.2,
        reviews: 10,
        category: { title: [{ language: "en", value: "Electronics" }] },
        imageUrl: "https://example.com/a.jpg",
      },
    ]);

    const products = await getProducts("en");

    expect(products).toHaveLength(1);
    expect(products[0]?.slug).toBe("alpha-headphones");
  });

  it("falls back when fetch fails", async () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = demoProject;
    fetchProductsFromSanity.mockRejectedValue(new Error("network"));

    const products = await getProducts("en");

    expect(products).toEqual(getStaticFallbackProducts());
  });

  it("falls back when sanity returns no valid products", async () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = demoProject;
    fetchProductsFromSanity.mockResolvedValue([{ slug: { current: "" } }]);

    const products = await getProducts("en");

    expect(products).toEqual(getStaticFallbackProducts());
  });
});
