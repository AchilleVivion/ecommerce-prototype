import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Header } from "@/components/storefront/header";

vi.mock("@/components/storefront/header-brand", () => ({
  HeaderBrand: () => <div>brand</div>,
}));

vi.mock("@/components/storefront/header-toolbar", () => ({
  HeaderToolbar: ({
    onMenuClick,
  }: {
    onMenuClick: () => void;
  }) => (
    <button type="button" onClick={onMenuClick}>
      Open menu
    </button>
  ),
}));

vi.mock("@/components/storefront/mobile-nav-drawer", () => ({
  MobileNavDrawer: ({
    isOpen,
    onClose,
  }: {
    isOpen: boolean;
    onClose: () => void;
  }) =>
    isOpen ? (
      <button type="button" onClick={onClose}>
        Close menu
      </button>
    ) : null,
}));

describe("Header", () => {
  const closeMenuLabel = "Close menu";

  it("opens and closes the mobile navigation drawer", async () => {
    const user = userEvent.setup();

    render(
      <Header
        cartItemCount={0}
        onCartClick={vi.fn()}
        searchQuery=""
        onSearchChange={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: closeMenuLabel })).toBeVisible();

    await user.click(screen.getByRole("button", { name: closeMenuLabel }));
    expect(screen.queryByRole("button", { name: closeMenuLabel })).not.toBeInTheDocument();
  });
});
