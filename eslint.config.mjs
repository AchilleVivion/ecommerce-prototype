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
      "sonarjs/cognitive-complexity": ["error", 15],
      "sonarjs/no-duplicate-string": "error",
      "sonarjs/no-identical-functions": "error",
      "unicorn/filename-case": ["error", { "cases": { "kebabCase": true } }],
      "unicorn/no-array-for-each": "error",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-null": "off",
      "max-lines-per-function": ["error", { 
        "max": 50, 
        "skipBlankLines": true, 
        "skipComments": true,
        "IIFEs": true,
      }],
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