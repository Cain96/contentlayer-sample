/** @type {import('eslint/lib/shared/types').ConfigData} */
const config = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["unused-imports"],
  extends: ["next", "next/core-web-vitals"],
  rules: { "unused-imports/no-unused-imports": "error" },
  overrides: [
    { files: ["*.js"], extends: ["prettier"] },
    {
      extends: ["plugin:@typescript-eslint/eslint-recommended", "plugin:@typescript-eslint/recommended", "prettier"],
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: { ecmaFeatures: { jsx: true }, sourceType: "module" },
      plugins: ["@typescript-eslint"],
    },
  ],
};

module.exports = config;
