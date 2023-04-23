/** @type {import("stylelint").Config} */

module.exports = {
  extends: ['stylelint-config-standard-scss'],
  customSyntax: 'postcss-html',
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
    }
  ]
}
