module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
  overrides: [
    {
      // Vercel serverless functions run on Node, not in the browser.
      files: ["api/**/*.js"],
      env: { node: true, browser: false },
    },
    {
      // react-three-fiber uses lowercase Three.js element props that the DOM
      // linter doesn't recognise.
      files: ["src/three/**/*.jsx"],
      rules: { "react/no-unknown-property": "off" },
    },
  ],
};
