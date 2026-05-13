import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ImageWithFallback } from "@/components/storefront/image-with-fallback";

describe("ImageWithFallback", () => {
  it("renders the image and falls back after an error", () => {
    render(
      <ImageWithFallback src="https://example.com/product.jpg" alt="Product" />,
    );

    const image = screen.getByRole("img", { name: "Product" });
    expect(image).toHaveAttribute("src", "https://example.com/product.jpg");

    fireEvent.error(image);
    expect(
      screen.getByRole("img", { name: "Error loading image" }),
    ).toBeInTheDocument();
  });
});
