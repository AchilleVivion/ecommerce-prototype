import { http, HttpResponse } from "msw";
import { sampleProducts } from "@tests/fixtures/products";

function toGraphQLProducts() {
  return sampleProducts.map((product) => ({
    slug: { current: product.slug },
    name: [{ language: "en", value: product.name }],
    description: product.description
      ? [{ language: "en", value: product.description }]
      : [],
    price: product.price,
    discountedPrice: product.discountedPrice ?? null,
    discount: product.discount ?? null,
    rating: product.rating,
    reviews: product.reviews,
    featured: product.featured ?? false,
    category: {
      title: [{ language: "en", value: product.category }],
    },
    image: null,
    imageUrl: product.image,
  }));
}

export const handlers = [
  http.post("https://*.apicdn.sanity.io/*", () => {
    return HttpResponse.json({
      data: {
        allProduct: toGraphQLProducts(),
      },
    });
  }),
  http.post("https://*.api.sanity.io/*", () => {
    return HttpResponse.json({
      data: {
        allProduct: toGraphQLProducts(),
      },
    });
  }),
];
