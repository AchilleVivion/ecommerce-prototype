import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  fetchProductsFromSanity,
  getSanityGraphQLEndpoint,
} from "@/lib/graphql/client";

const demoProject = "demo-project";

describe("getSanityGraphQLEndpoint", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns null when project id is missing", () => {
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    expect(getSanityGraphQLEndpoint()).toBeNull();
  });

  it("builds the CDN graphql endpoint from env vars", () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = demoProject;
    process.env.NEXT_PUBLIC_SANITY_DATASET = "staging";
    process.env.NEXT_PUBLIC_SANITY_GRAPHQL_TAG = "experiment";

    expect(getSanityGraphQLEndpoint()).toBe(
      `https://${demoProject}.apicdn.sanity.io/v2025-02-19/graphql/staging/experiment`,
    );
  });
});

describe("fetchProductsFromSanity success", () => {
  const originalEnv = { ...process.env };
  const fetchMock = vi.fn();

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SANITY_PROJECT_ID: demoProject,
    };
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
  });

  it("returns products from a successful response", async () => {
    const products = [{ slug: { current: "alpha-headphones" } }];
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ data: { allProduct: products } }),
    });

    await expect(fetchProductsFromSanity()).resolves.toEqual(products);
  });

  it("returns an empty array when data is missing", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    await expect(fetchProductsFromSanity()).resolves.toEqual([]);
  });
});

describe("fetchProductsFromSanity errors", () => {
  const originalEnv = { ...process.env };
  const fetchMock = vi.fn();

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SANITY_PROJECT_ID: demoProject,
    };
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
  });

  it("throws when the endpoint is not configured", async () => {
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

    await expect(fetchProductsFromSanity()).rejects.toThrow(
      "Sanity GraphQL endpoint is not configured",
    );
  });

  it("throws when the response is not ok", async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 503 });

    await expect(fetchProductsFromSanity()).rejects.toThrow(
      "Sanity GraphQL request failed: 503",
    );
  });

  it("throws when graphql returns errors", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ errors: [{ message: "bad query" }] }),
    });

    await expect(fetchProductsFromSanity()).rejects.toThrow(
      "Sanity GraphQL returned errors",
    );
  });
});
