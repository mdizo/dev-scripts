module.exports = {
    '!(*.{png,jpg,jpeg,webp})': ['prettier --write --cache'],
    '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
    '**/*.ts?(x)': () => 'pnpm build-types',
    'src/**/*.{astro,css,scss}': ['stylelint --fix --cache']
  }
  