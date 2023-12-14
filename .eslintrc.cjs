/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  plugins: [
    'filename-rules',
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    'filename-rules/match': [2, { '.vue': 'pascalcase' }],
  },
  parserOptions: {
    ecmaVersion: 'latest'
  },
}
