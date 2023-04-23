/** @type {import("stylelint").Config} */

module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-clean-order'],
  plugins: ['stylelint-gamut'],
  rules: {
    "gamut/color-no-out-gamut-range": true,
    "function-disallowed-list": ["rgba", "hsla", "rgb", "hsl"],
    "color-function-notation": "modern",
    "color-no-hex": true,
    'selector-pseudo-class-no-unknown': [true, {ignorePseudoClasses: ['global']}],
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
