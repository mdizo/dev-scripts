/** @type {import("eslint").Linter.Config} */

module.exports = {
  extends: ['standard-with-typescript'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest',
    project: './tsconfig.json'
  },
  rules: {
    '@typescript-eslint/triple-slash-reference': 'warn',
  },
  overrides: [
    {
      files: ['*.astro'],
      extends: ['standard-with-typescript', 'plugin:astro/recommended'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      }
    }
  ]
}