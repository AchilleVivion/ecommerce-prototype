import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "@/app/api/revalidate/route";

const revalidateTag = vi.fn();

vi.mock("next/cache", () => ({
  revalidateTag: (...args: unknown[]) => revalidateTag(...args),
}));

function createRequest(options?: {
  headerSecret?: string;
  querySecret?: string;
}) {
  const url = new URL("http://localhost/api/revalidate");
  if (options?.querySecret) {
    url.searchParams.set("secret", options.querySecret);
  }

  const headers = new Headers();
  if (options?.headerSecret) {
    headers.set("x-sanity-webhook-secret", options.headerSecret);
  }

  return new NextRequest(url, { method: "POST", headers });
}

describe("POST /api/revalidate", () => {
  const originalEnv = { ...process.env };
  const testSecret = "test-secret";

  beforeEach(() => {
    process.env = { ...originalEnv, SANITY_REVALIDATE_SECRET: testSecret };
    revalidateTag.mockReset();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns 500 when secret is not configured", async () => {
    delete process.env.SANITY_REVALIDATE_SECRET;

    const response = await POST(createRequest());

    expect(response.status).toBe(500);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("returns 401 for invalid secrets", async () => {
    const response = await POST(
      createRequest({ headerSecret: "wrong", querySecret: "nope" }),
    );

    expect(response.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("revalidates when header secret matches", async () => {
    const response = await POST(createRequest({ headerSecret: testSecret }));

    expect(response.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith("products", "max");
    await expect(response.json()).resolves.toMatchObject({ revalidated: true });
  });

  it("revalidates when query secret matches", async () => {
    const response = await POST(createRequest({ querySecret: testSecret }));

    expect(response.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith("products", "max");
  });
});
