import { describe, expect, it } from "vitest";
import { resolveLocalizedString } from "@/lib/graphql/resolve-localized";

describe("resolveLocalizedString", () => {
  it("returns fr when present", () => {
    expect(
      resolveLocalizedString(
        [
          { language: "en", value: "Headphones" },
          { language: "fr", value: "Casque" },
        ],
        "fr",
      ),
    ).toBe("Casque");
  });

  it("falls back to en when fr is missing or empty", () => {
    expect(
      resolveLocalizedString([{ language: "en", value: "Headphones" }], "fr"),
    ).toBe("Headphones");

    expect(
      resolveLocalizedString(
        [
          { language: "en", value: "Headphones" },
          { language: "fr", value: "   " },
        ],
        "fr",
      ),
    ).toBe("Headphones");
  });

  it("returns first non-empty value as last resort", () => {
    expect(
      resolveLocalizedString([{ language: "de", value: "Kopfhorer" }], "fr"),
    ).toBe("Kopfhorer");
  });

  it("returns empty string for empty or missing arrays", () => {
    expect(resolveLocalizedString([], "fr")).toBe("");
    expect(resolveLocalizedString(undefined, "fr")).toBe("");
  });
});
