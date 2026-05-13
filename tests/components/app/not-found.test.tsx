import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import NotFound from "@/app/not-found";

describe("NotFound", () => {
  it("renders the 404 page", () => {
    render(<NotFound />);

    expect(screen.getByRole("heading", { name: "404" })).toBeVisible();
    expect(
      screen.getByText("This page could not be found."),
    ).toBeInTheDocument();
  });
});
