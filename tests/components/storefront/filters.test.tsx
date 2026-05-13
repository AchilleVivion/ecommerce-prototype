import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Filters } from "@/components/storefront/filters";

const defaultProps = {
  categories: ["Electronics", "Accessories"],
  selectedCategory: "All",
  onCategoryChange: vi.fn(),
  sortBy: "featured",
  onSortChange: vi.fn(),
};

const openFiltersLabel = "Open filters";
const closeOverlayLabel = "Close filters overlay";

describe("Filters desktop", () => {
  it("changes category and sort options", async () => {
    const user = userEvent.setup();
    const onCategoryChange = vi.fn();
    const onSortChange = vi.fn();

    render(
      <Filters
        {...defaultProps}
        onCategoryChange={onCategoryChange}
        onSortChange={onSortChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Electronics" }));
    expect(onCategoryChange).toHaveBeenCalledWith("Electronics");

    await user.selectOptions(screen.getByRole("combobox"), "rating");
    expect(onSortChange).toHaveBeenCalledWith("rating");
  });
});

describe("Filters mobile sheet", () => {
  it("opens and closes the filters sheet", async () => {
    const user = userEvent.setup();

    render(<Filters {...defaultProps} />);

    expect(screen.getByRole("button", { name: openFiltersLabel })).toBeInTheDocument();
    expect(screen.getByText("All · Featured")).toBeInTheDocument();
    expect(screen.queryByLabelText(closeOverlayLabel)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: openFiltersLabel }));
    expect(screen.getByLabelText(closeOverlayLabel)).toBeInTheDocument();

    await user.click(screen.getByLabelText(closeOverlayLabel));
    expect(screen.queryByLabelText(closeOverlayLabel)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: openFiltersLabel }));
    await user.click(screen.getByLabelText("Close filters"));
    expect(screen.queryByLabelText(closeOverlayLabel)).not.toBeInTheDocument();
  });

  it("applies filter changes inside the mobile sheet", async () => {
    const user = userEvent.setup();
    const onCategoryChange = vi.fn();
    const onSortChange = vi.fn();

    render(
      <Filters
        {...defaultProps}
        onCategoryChange={onCategoryChange}
        onSortChange={onSortChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: openFiltersLabel }));
    await user.click(screen.getAllByRole("button", { name: "Accessories" })[0]!);
    expect(onCategoryChange).toHaveBeenCalledWith("Accessories");

    await user.selectOptions(screen.getAllByRole("combobox")[0]!, "price-low");
    expect(onSortChange).toHaveBeenCalledWith("price-low");
  });
});
