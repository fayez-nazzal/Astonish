module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: "plugin:react/recommended",
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/no-unknown-property": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
