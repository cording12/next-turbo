/** @type {import("@ianvs/prettier-plugin-sort-imports").PrettierConfig} */
module.exports = {
  // standard prettier options
  endOfLine: "lf",
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",

  //@ianvs/prettier-plugin-sort-imports
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@types/(.*)$",
    "^@config/(.*)$",
    "^@lib/(.*)$",
    "^@hooks/(.*)$",
    "^@components/ui/(.*)$",
    "^@components/(.*)$",
    "^@styles/(.*)$",
    "^@app/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "4.9.5",

  // prettier-plugin-tailwindcss
  tailwindFunctions: ["cva", "clsx"],

  // plugins
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
}
