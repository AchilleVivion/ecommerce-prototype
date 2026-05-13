import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CategoryButton } from "@/components/storefront/category-button";

describe("CategoryButton", () => {
  it("renders active and inactive styles and handles clicks", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    const { rerender } = render(
      <CategoryButton label="Electronics" isActive={false} onClick={onClick} />,
    );

    const button = screen.getByRole("button", { name: "Electronics" });
    expect(button.className).toContain("bg-slate-100");

    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();

    rerender(
      <CategoryButton label="Electronics" isActive onClick={onClick} />,
    );
    expect(button.className).toContain("bg-blue-600");
  });
});
