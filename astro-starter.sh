#!/bin/bash

set -e

export GUM_SPIN_SPINNER=pulse

gum style --border normal --margin "1" --padding "1 2" --border-foreground 212 "Hello, there! Welcome to $(gum style --foreground 212 'Gum')."
NAME=$(gum input --char-limit=32 --placeholder "Pick a project name")

printf "Project $(gum style --foreground 212 "$NAME") initiated!"

sleep 2; clear

if [ $# -eq 0 ]; then
    FETCH_TEMPLATES=$(gum spin --spinner pulse --title "Fetching list of Astro templates..." --show-output -- svn ls https://github.com/withastro/astro.git/branches/main/examples | grep "/$" | sed "s,/$,,")
    TEMPLATE=$(gum choose $FETCH_TEMPLATES --height=20)
    pnpm create astro@latest $NAME --no-install --git --typescript strictest --template $TEMPLATE; clear
else 
    pnpm create astro@latest $NAME --no-install --git --typescript strictest --template $1; clear
fi

cd $NAME

gum spin --title "Installing commit tools..." -- pnpm add -D husky commitizen cz-git @commitlint/{config-conventional,cli}
npx husky install && npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
echo "/** @type {import('cz-git').UserConfig} */" > commitlint.config.cjs
echo "module.exports = {extends: ['@commitlint/config-conventional'], prompt: {useEmoji: true}}" >> commitlint.config.cjs
pnpm pkg set scripts.prepare="husky install" scripts.cz="cz" config.commitizen.path="./node_modules/cz-git"

git add .
git commit -m "chore: :hammer: add + configure tools for better commit messages"

ESLINT="eslint eslint-config-standard-with-typescript eslint-config-prettier @typescript-eslint/parser"
ESLINT_PLUGINS=(eslint-plugin-{jsx-a11y,astro,import,n,promise})
PRETTIER='prettier prettier-config-standard prettier-plugin-astro'
gum spin --title "Installing linters..." -- pnpm add -D lint-staged $ESLINT ${ESLINT_PLUGINS[@]} $PRETTIER
gum spin --title "Downloading configs..." -- svn export https://github.com/mdizo/dev-scripts.git/branches/main/astro/ . --force

npm pkg set scripts.lint="prettier --write  \"**/*.{js,jsx,ts,tsx,md,mdx,astro}\" && eslint --fix \"src/**/*.{js,ts,jsx,tsx,astro}\""
npm pkg set scripts.build-types="tsc --noEmit --pretty"
npx husky add .husky/pre-commit 'npx lint-staged --concurrent false'

git add .
git commit -m "chore: :hammer: add + configure linters to enforce code styles"