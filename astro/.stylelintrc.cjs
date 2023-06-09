/** @type {import("stylelint").Config} */

module.exports = {
  extends: ['stylelint-config-clean-order', 'stylelint-config-standard-scss'],
  plugins: ['stylelint-gamut'],
  rules: {
    'declaration-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: [
          'after-declaration',
          'after-comment',
          'inside-single-line-block'
        ],
        severity: 'warning'
      }
    ],
    "gamut/color-no-out-gamut-range": true,
    "function-disallowed-list": ["rgba", "hsla", "rgb", "hsl"],
    "color-function-notation": "modern",
    "color-no-hex": true,
    'selector-pseudo-class-no-unknown': [true, {ignorePseudoClasses: ['global']}],
    'custom-property-pattern': [
			'^[a-z0-9]+((\-[a-z0-9]+)*(\-\-[a-z0-9]+)?)?$',
			{
				message: (name) => `Expected custom property name "${name}" to be kebab-case`,
			},
		],
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
