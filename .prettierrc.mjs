/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.ts",

  // Basic formatting
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  trailingComma: "all",
  printWidth: 80,

  // JSX formatting
  jsxSingleQuote: true,
  bracketSpacing: true,

  // Tailwind specific
  tailwindFunctions: ["cn", "cva"],
};

export default config;
