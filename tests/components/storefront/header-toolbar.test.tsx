import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { HeaderToolbar } from "@/components/storefront/header-toolbar";

describe("HeaderToolbar", () => {
  it("handles search input, cart badge, and menu button", async () => {
    const user = userEvent.setup();
    const onCartClick = vi.fn();
    const onMenuClick = vi.fn();
    const onSearchChange = vi.fn();

    const { rerender } = render(
      <HeaderToolbar
        cartItemCount={0}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
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

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(onMenuClick).toHaveBeenCalled();

    rerender(
      <HeaderToolbar
        cartItemCount={3}
        onCartClick={onCartClick}
        onMenuClick={onMenuClick}
        searchQuery="phone"
        onSearchChange={onSearchChange}
      />,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});
