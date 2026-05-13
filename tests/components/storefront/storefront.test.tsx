import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Storefront } from "@/components/storefront/storefront";
import { getStaticFallbackProducts } from "@/lib/graphql/get-products";

vi.mock("sonner", () => ({
  Toaster: () => null,
  toast: { success: vi.fn() },
}));

describe("Storefront", () => {
  it("supports category filters, search, cart, and product modal flows", async () => {
    const user = userEvent.setup();

    render(<Storefront initialProducts={getStaticFallbackProducts()} />);

    expect(screen.getByRole("heading", { name: "All Products" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Accessories" }));
    expect(screen.getByRole("heading", { name: "Accessories" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: "All" }));

    await user.type(
      screen.getByPlaceholderText("Search products..."),
      "Headphones",
    );
    expect(
      screen.getByRole("heading", {
        name: 'Search results for "Headphones"',
      }),
    ).toBeVisible();

    await user.click(
      screen.getByRole("button", { name: /Bluetooth Headphones/i }),
    );
    expect(screen.getByRole("button", { name: "Add to Cart" })).toBeVisible();

    await user.click(screen.getByLabelText("Close product details"));

    const addToCartButton = screen
      .getAllByRole("button")
      .find((button) => button.className.includes("rounded-full bg-blue-600"));
    await user.click(addToCartButton!);

    const cartButton = screen
      .getAllByRole("button")
      .find((button) => button.className.includes("hover:bg-slate-100"));
    await user.click(cartButton!);
    expect(screen.getByLabelText("Close cart overlay")).toBeInTheDocument();
  });
});
