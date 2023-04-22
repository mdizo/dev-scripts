export default {
    '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
    '**/*.ts?(x)': () => 'pnpm build-types',
    '!(*.{png,jpg,jpeg,webp})': ['prettier --write --cache']
  }
  