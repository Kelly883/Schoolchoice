import jsConfig from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import nextConfig from 'eslint-config-next';

const { plugins, configs: nextConfigs } = nextConfig;

export default [
  jsConfig.configs.recommended,
  ...nextConfigs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,mts,cts,tsx}'],
    rules: {
      'no-unused-vars': 'warn',
      'react/no-unescaped-entities': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      ...nextConfig.languageOptions,
      parserOptions: {
        ...nextConfig.languageOptions.parserOptions,
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
  },
];