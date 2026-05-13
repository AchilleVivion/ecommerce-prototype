const SANITY_GRAPHQL_API_VERSION = "2025-02-19";

export function getSanityGraphQLEndpoint(): string | null {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const tag = process.env.NEXT_PUBLIC_SANITY_GRAPHQL_TAG ?? "default";

  if (!projectId) {
    return null;
  }

  return `https://${projectId}.apicdn.sanity.io/v${SANITY_GRAPHQL_API_VERSION}/graphql/${dataset}/${tag}`;
}

export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products {
    allProduct(sort: [{ featured: DESC }]) {
      slug {
        current
      }
      name {
        language
        value
      }
      description {
        language
        value
      }
      price
      discountedPrice
      discount
      rating
      reviews
      featured
      category {
        title {
          language
          value
        }
      }
      image {
        asset {
          url
        }
      }
      imageUrl
    }
  }
`;

interface ProductsQueryResponse {
  allProduct: unknown[];
}

export async function fetchProductsFromSanity(): Promise<unknown[]> {
  const endpoint = getSanityGraphQLEndpoint();
  if (!endpoint) {
    throw new Error("Sanity GraphQL endpoint is not configured");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: PRODUCTS_QUERY }),
    next: { revalidate: 60, tags: ["products"] },
  });

  if (!response.ok) {
    throw new Error(`Sanity GraphQL request failed: ${response.status}`);
  }

  const json = (await response.json()) as {
    data?: ProductsQueryResponse;
    errors?: unknown[];
  };

  if (json.errors?.length) {
    throw new Error("Sanity GraphQL returned errors");
  }

  return json.data?.allProduct ?? [];
}
