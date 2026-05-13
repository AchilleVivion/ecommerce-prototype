import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Filters } from "@/components/storefront/filters";

describe("Filters", () => {
  it("changes category and sort options", async () => {
    const user = userEvent.setup();
    const onCategoryChange = vi.fn();
    const onSortChange = vi.fn();

    render(
      <Filters
        categories={["Electronics", "Accessories"]}
        selectedCategory="All"
        onCategoryChange={onCategoryChange}
        sortBy="featured"
        onSortChange={onSortChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Electronics" }));
    expect(onCategoryChange).toHaveBeenCalledWith("Electronics");

    await user.selectOptions(screen.getByRole("combobox"), "rating");
    expect(onSortChange).toHaveBeenCalledWith("rating");
  });
});
