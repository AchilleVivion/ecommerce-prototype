import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HeaderToolbar } from "@/components/storefront/header-toolbar";

describe("HeaderToolbar", () => {
  it("handles search input and cart badge visibility", async () => {
    const user = userEvent.setup();
    const onCartClick = vi.fn();
    const onSearchChange = vi.fn();

    const { rerender } = render(
      <HeaderToolbar
        cartItemCount={0}
        onCartClick={onCartClick}
        searchQuery=""
        onSearchChange={onSearchChange}
      />,
    );

    await user.type(
      screen.getByPlaceholderText("Search products..."),
      "phone",
    );
    expect(onSearchChange).toHaveBeenCalled();

    await user.click(screen.getAllByRole("button")[0]!);
    expect(onCartClick).toHaveBeenCalled();

    rerender(
      <HeaderToolbar
        cartItemCount={3}
        onCartClick={onCartClick}
        searchQuery="phone"
        onSearchChange={onSearchChange}
      />,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
