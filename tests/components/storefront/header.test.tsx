import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "@/components/storefront/header";

describe("Header", () => {
  it("composes brand and toolbar sections", () => {
    render(
      <Header
        cartItemCount={1}
        onCartClick={vi.fn()}
        searchQuery=""
        onSearchChange={vi.fn()}
      />,
    );

    expect(screen.getByRole("heading", { name: "ShopHub" })).toBeVisible();
    expect(screen.getByPlaceholderText("Search products...")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
  });
});
