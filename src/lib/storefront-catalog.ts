import type { Product } from "@/types/product";

export function getProductCategories(catalog: Product[]): string[] {
  return [...new Set(catalog.map((product) => product.category))];
}

export function getListingTitle(
  searchQuery: string,
  selectedCategory: string,
): string {
  if (searchQuery) {
    return `Search results for "${searchQuery}"`;
  }

  if (selectedCategory === "All") {
    return "All Products";
  }

  return selectedCategory;
}

export function filterAndSortProducts(
  catalog: Product[],
  selectedCategory: string,
  searchQuery: string,
  sortBy: string,
): Product[] {
  let filtered = catalog;

  if (selectedCategory !== "All") {
    filtered = filtered.filter(
      (product) => product.category === selectedCategory,
    );
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    );
  }

  const sorted = [...filtered];

  switch (sortBy) {
    case "price-low": {
      sorted.sort(
        (a, b) =>
          (a.discountedPrice || a.price) - (b.discountedPrice || b.price),
      );
      break;
    }
    case "price-high": {
      sorted.sort(
        (a, b) =>
          (b.discountedPrice || b.price) - (a.discountedPrice || a.price),
      );
      break;
    }
    case "rating": {
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    }
    default: {
      break;
    }
  }

  return sorted;
}
