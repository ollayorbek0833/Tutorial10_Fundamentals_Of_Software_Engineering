// eslint.config.mjs
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  { ignores: ["node_modules/**","dist/**","build/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts","**/*.tsx"],
    rules: {
      complexity: ["warn", 10],
      "max-lines-per-function": ["warn", 50],
      "@typescript-eslint/no-explicit-any": "warn",
      "no-unused-vars": "warn"
    }
  }
]);
