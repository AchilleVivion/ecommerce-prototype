import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slugify";

describe("slugify", () => {
  it("converts names into url-safe slugs", () => {
    expect(slugify("Wireless Bluetooth Headphones")).toBe(
      "wireless-bluetooth-headphones",
    );
    expect(slugify("  Hello---World!! ")).toBe("hello-world");
  });
});
