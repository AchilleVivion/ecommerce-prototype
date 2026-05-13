import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ProductModalBody } from "@/components/storefront/product-modal-body";
import { sampleProducts } from "@tests/fixtures/products";

vi.mock("@/components/storefront/product-modal-gallery", () => ({
  ProductModalGallery: () => <p>gallery</p>,
}));

vi.mock("@/components/storefront/product-modal-details", () => ({
  ProductModalDetails: () => <p>details</p>,
}));

describe("ProductModalBody", () => {
  it("renders gallery and details sections", () => {
    render(
      <ProductModalBody
        product={sampleProducts[0]!}
        onAddToCart={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText("gallery")).toBeInTheDocument();
    expect(screen.getByText("details")).toBeInTheDocument();
  });
});
