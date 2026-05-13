import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CartFooter } from "@/components/storefront/cart-footer";

describe("CartFooter", () => {
  it("shows the formatted total and checkout action", () => {
    render(<CartFooter total={42.5} />);

    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("$42.50")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Checkout" }),
    ).toBeInTheDocument();
  });
});
