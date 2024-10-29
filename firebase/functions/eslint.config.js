const prettier = require('eslint-config-prettier');
const globals = require('globals');
const ts = require('typescript-eslint');

module.exports = ts.config(
  ...ts.configs.recommended,
  prettier,
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    ignores: ['lib/', 'eslint.config.js'],
  },
);
