import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ProductModal } from "@/components/storefront/product-modal";
import { sampleProducts } from "@tests/fixtures/products";

vi.mock("@/components/storefront/product-modal-body", () => ({
  ProductModalBody: () => <p>modal-body</p>,
}));

describe("ProductModal", () => {
  it("returns null when closed or missing a product", () => {
    const { container, rerender } = render(
      <ProductModal
        product={null}
        isOpen
        onClose={vi.fn()}
        onAddToCart={vi.fn()}
      />,
    );
    expect(container).toBeEmptyDOMElement();

    rerender(
      <ProductModal
        product={sampleProducts[0]!}
        isOpen={false}
        onClose={vi.fn()}
        onAddToCart={vi.fn()}
      />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("renders and closes when open", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <ProductModal
        product={sampleProducts[0]!}
        isOpen
        onClose={onClose}
        onAddToCart={vi.fn()}
      />,
    );

    expect(screen.getByText("modal-body")).toBeInTheDocument();
    await user.click(screen.getByLabelText("Close product details"));
    expect(onClose).toHaveBeenCalled();
  });
});
