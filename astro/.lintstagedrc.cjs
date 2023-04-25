module.exports = {
    '*.{js,jsx,ts,tsx,md,mdx,astro,css,scss}': ['prettier --write --cache'],
    '*.{js,jsx,ts,tsx}': ['eslint --fix', 'eslint'],
    '*.{astro,css,scss}': ['stylelint --fix --cache']
  }
  