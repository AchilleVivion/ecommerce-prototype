import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  sonarjs.configs.recommended,
  unicorn.configs.recommended,
  {
    rules: {
      "unicorn/prevent-abbreviations": "off",
      "unicorn/filename-case": "off",
      "unicorn/no-null": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "node_modules/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
