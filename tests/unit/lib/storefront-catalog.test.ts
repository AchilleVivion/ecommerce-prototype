import { products } from "@/data/products";
import {
  filterAndSortProducts,
  getListingTitle,
  getProductCategories,
} from "@/lib/storefront-catalog";
import { describe, expect, it } from "vitest";
import { sampleProducts } from "@tests/fixtures/products";

describe("getProductCategories", () => {
  it("collects unique categories", () => {
    expect(getProductCategories(sampleProducts)).toEqual([
      "Electronics",
      "Accessories",
      "Home & Kitchen",
    ]);
  });
});

describe("getListingTitle", () => {
  it("builds listing titles for search, all, and category views", () => {
    expect(getListingTitle("phone", "All")).toBe(
      'Search results for "phone"',
    );
    expect(getListingTitle("", "All")).toBe("All Products");
    expect(getListingTitle("", "Electronics")).toBe("Electronics");
  });
});

describe("filterAndSortProducts", () => {
  const gammaSlug = "gamma-mug";
  const betaSlug = "beta-wallet";
  const alphaSlug = "alpha-headphones";

  it("filters by category and search query", () => {
    const electronics = filterAndSortProducts(
      sampleProducts,
      "Electronics",
      "",
      "featured",
    );
    expect(electronics).toHaveLength(1);
    expect(electronics[0]?.name).toBe("Alpha Headphones");

    const searchResults = filterAndSortProducts(
      sampleProducts,
      "All",
      "wallet",
      "featured",
    );
    expect(searchResults).toHaveLength(1);
    expect(searchResults[0]?.name).toBe("Beta Wallet");
  });

  it("sorts products by price and rating", () => {
    const byPriceLow = filterAndSortProducts(
      sampleProducts,
      "All",
      "",
      "price-low",
    );
    expect(byPriceLow.map((product) => product.slug)).toEqual([
      gammaSlug,
      betaSlug,
      alphaSlug,
    ]);

    const byPriceHigh = filterAndSortProducts(
      sampleProducts,
      "All",
      "",
      "price-high",
    );
    expect(byPriceHigh.map((product) => product.slug)).toEqual([
      alphaSlug,
      betaSlug,
      gammaSlug,
    ]);

    const byRating = filterAndSortProducts(sampleProducts, "All", "", "rating");
    expect(byRating[0]?.slug).toBe(betaSlug);
  });
});

describe("products catalog", () => {
  it("loads the storefront product catalog", () => {
    expect(products.length).toBeGreaterThan(0);
    expect(getProductCategories(products).length).toBeGreaterThan(0);
  });
});
