/** @type {import("eslint").Linter.Config} */

export default {
  extends: ['standard-with-typescript', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: true,
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  rules: {
    '@typescript-eslint/triple-slash-reference': 'warn'
  },
  overrides: [
    // Configuration for astro files
    {
      files: ["**/*.astro"],
      extends: [
        'standard-with-typescript', 'plugin:prettier/recommended', 'plugin:astro/recommended', 'plugin:astro/jsx-a11y-recommended'
      ],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      }
    }
  ]
}