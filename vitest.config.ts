import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],
    exclude: ["**/node_modules/**", "tests/e2e/**"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/app/**/layout.tsx",
        "src/app/**/page.tsx",
        "src/proxy.ts",
        "src/i18n/**",
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(root, "./src"),
      "@tests": path.resolve(root, "./tests"),
    },
  },
});
