/* eslint-disable @next/next/no-img-element -- lightweight test doubles */

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductModalGallery } from "@/components/storefront/product-modal-gallery";
import { sampleProducts } from "@tests/fixtures/products";

vi.mock("@/components/storefront/image-with-fallback", () => ({
  ImageWithFallback: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

describe("ProductModalGallery", () => {
  it("shows discount badge when present", () => {
    const { rerender } = render(
      <ProductModalGallery product={sampleProducts[0]!} />,
    );
    expect(screen.getByText("-20% OFF")).toBeInTheDocument();

    rerender(<ProductModalGallery product={sampleProducts[1]!} />);
    expect(screen.queryByText(/OFF/)).not.toBeInTheDocument();
  });
});
