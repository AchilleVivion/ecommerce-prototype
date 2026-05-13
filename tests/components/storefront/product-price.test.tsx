import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductPrice } from "@/components/storefront/product-price";
import { sampleProducts } from "@tests/fixtures/products";

describe("ProductPrice", () => {
  it("renders discounted and regular prices", () => {
    const { rerender } = render(
      <ProductPrice product={sampleProducts[0]!} />,
    );

    expect(screen.getByText("$80")).toBeInTheDocument();
    expect(screen.getByText("$100")).toBeInTheDocument();

    rerender(<ProductPrice product={sampleProducts[1]!} size="modal" />);
    expect(screen.getByText("$50")).toBeInTheDocument();
  });
});
