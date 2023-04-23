/** @type {import("stylelint").Config} */

module.exports = {
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  },
  overrides: [
    {
      files: ['*.scss', '**/*.scss'],
      customSyntax: 'postcss-scss'
    },
    {
      files: ['*.astro', '**/*.astro'],
      customSyntax: 'postcss-html'
    }
  ]
}
