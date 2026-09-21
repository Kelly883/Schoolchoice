const js = require('@eslint/js');
const next = require('eslint-config-next');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  js.configs.recommended,
  ...next.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    rules: {
      'no-unused-vars': 'warn',
      'react/no-unescaped-entities': 'off',
    },
  },
];
