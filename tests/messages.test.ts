import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import { describe, expect, it } from "vitest";

describe("messages", () => {
  it("exposes home page copy in English and French", () => {
    expect(en.HomePage.title).toBeTruthy();
    expect(fr.HomePage.title).toBeTruthy();
    expect(en.HomePage).toEqual(
      expect.objectContaining({
        description: expect.any(String),
        cta: expect.any(String),
      }),
    );
  });
});
