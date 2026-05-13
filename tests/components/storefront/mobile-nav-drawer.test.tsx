import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { MobileNavDrawer } from "@/components/storefront/mobile-nav-drawer";

const closeOverlayLabel = "Close menu overlay";
const closeMenuLabel = "Close menu";
const searchPlaceholder = "Search products...";

const defaultDrawerProps = {
  isOpen: true,
  onClose: vi.fn(),
  searchQuery: "",
  onSearchChange: vi.fn(),
};

describe("MobileNavDrawer navigation", () => {
  it("shows nav links when open and closes from overlay, button, or link", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { rerender } = render(
      <MobileNavDrawer
        {...defaultDrawerProps}
        isOpen={false}
        onClose={onClose}
      />,
    );

    expect(screen.getByText("Menu")).toBeInTheDocument();
    expect(screen.queryByLabelText(closeOverlayLabel)).not.toBeInTheDocument();

    rerender(<MobileNavDrawer {...defaultDrawerProps} onClose={onClose} />);

    expect(screen.getByRole("link", { name: "All Products" })).toBeVisible();
    expect(screen.getByLabelText(closeOverlayLabel)).toBeInTheDocument();

    await user.click(screen.getByLabelText(closeOverlayLabel));
    expect(onClose).toHaveBeenCalledTimes(1);

    onClose.mockClear();
    await user.click(screen.getByLabelText(closeMenuLabel));
    expect(onClose).toHaveBeenCalledTimes(1);

    onClose.mockClear();
    await user.click(screen.getByRole("link", { name: "Categories" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});

describe("MobileNavDrawer search", () => {
  it("updates search query from the drawer input", async () => {
    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    render(
      <MobileNavDrawer
        {...defaultDrawerProps}
        onSearchChange={onSearchChange}
      />,
    );

    await user.type(screen.getByPlaceholderText(searchPlaceholder), "phone");
    expect(onSearchChange).toHaveBeenCalled();
  });

  it("closes the drawer when pressing Enter or tapping the search icon", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <MobileNavDrawer
        {...defaultDrawerProps}
        onClose={onClose}
        searchQuery="phone"
      />,
    );

    const input = screen.getByPlaceholderText(searchPlaceholder);
    await user.click(input);
    await user.keyboard("{Enter}");
    expect(onClose).toHaveBeenCalledTimes(1);

    onClose.mockClear();
    await user.click(screen.getByRole("button", { name: "Search" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
