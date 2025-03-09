import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginTS from "@typescript-eslint/eslint-plugin";
import eslintPluginJSXA11y from "eslint-plugin-jsx-a11y";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ),
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/public/**"],
    plugins: {
      prettier: eslintPluginPrettier,
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "@typescript-eslint": eslintPluginTS,
      "jsx-a11y": eslintPluginJSXA11y,
    },
    rules: {
      // Prettier のルールを ESLint に適用
      "prettier/prettier": [
        "warn",
        { singleQuote: true, semi: false, printWidth: 100 },
      ],

      // Next.js では不要なルールの無効化
      "react/react-in-jsx-scope": "off",
      "jsx-a11y/anchor-is-valid": "off",

      // TypeScript のルール調整
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];

export default eslintConfig;
