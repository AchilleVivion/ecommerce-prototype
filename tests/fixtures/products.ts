import type { Product } from "@/types/product";

export const sampleProducts: Product[] = [
  {
    slug: "alpha-headphones",
    name: "Alpha Headphones",
    price: 100,
    discountedPrice: 80,
    discount: 20,
    category: "Electronics",
    image: "https://example.com/a.jpg",
    rating: 4.2,
    reviews: 10,
  },
  {
    slug: "beta-wallet",
    name: "Beta Wallet",
    price: 50,
    category: "Accessories",
    image: "https://example.com/b.jpg",
    rating: 4.8,
    reviews: 5,
  },
  {
    slug: "gamma-mug",
    name: "Gamma Mug",
    price: 20,
    category: "Home & Kitchen",
    image: "https://example.com/c.jpg",
    rating: 3.9,
    reviews: 2,
  },
];
