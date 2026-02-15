import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [".next", "node_modules", "out", ".velite", "dist", "build"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,mjs}"],
    rules: js.configs.recommended.rules,
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      ...tseslint.configs.recommended[0].rules,
    },
  },
];
