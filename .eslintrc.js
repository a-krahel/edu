/* eslint-disable */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'simple-import-sort', 'sort-keys-fix'],
  rules: {
    'no-console': [
      'error',
      {
        allow: ['error'],
      },
    ],
    'simple-import-sort/imports': 'error',
    'sort-keys-fix/sort-keys-fix': 'error',
  },
};
