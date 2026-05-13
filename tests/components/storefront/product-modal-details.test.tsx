import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProductModalDetails } from "@/components/storefront/product-modal-details";
import { sampleProducts } from "@tests/fixtures/products";

describe("ProductModalDetails", () => {
  it("adds to cart and uses a fallback description", async () => {
    const user = userEvent.setup();
    const onAddToCart = vi.fn();
    const onClose = vi.fn();

    render(
      <ProductModalDetails
        product={sampleProducts[1]!}
        onAddToCart={onAddToCart}
        onClose={onClose}
      />,
    );

    expect(screen.getByText("Beta Wallet")).toBeInTheDocument();
    expect(
      screen.getByText(/High-quality beta wallet with exceptional features/),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Add to Cart" }));
    expect(onAddToCart).toHaveBeenCalledWith(sampleProducts[1]);
    expect(onClose).toHaveBeenCalled();
  });

  it("renders an explicit product description", () => {
    const product = {
      ...sampleProducts[0]!,
      description: "Custom description",
    };

    render(
      <ProductModalDetails
        product={product}
        onAddToCart={vi.fn()}
        onClose={vi.fn()}
      />,
    );

    expect(screen.getByText("Custom description")).toBeInTheDocument();
  });
});
