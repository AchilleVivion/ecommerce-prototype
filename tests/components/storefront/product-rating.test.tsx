import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProductRating } from "@/components/storefront/product-rating";

describe("ProductRating", () => {
  it("renders card and modal variants", () => {
    const { rerender } = render(
      <ProductRating rating={4.5} reviews={12} />,
    );

    expect(screen.getByText("4.5")).toBeInTheDocument();
    expect(screen.getByText("(12)")).toBeInTheDocument();

    rerender(<ProductRating rating={4.8} reviews={99} size="modal" />);
    expect(screen.getByText("(99 reviews)")).toBeInTheDocument();
  });
});
