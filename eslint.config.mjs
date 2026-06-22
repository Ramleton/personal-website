import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'tailwind.config.ts',
  ]),

  eslintConfigPrettier,

  {
    rules: {
      'no-eval': 'error',
      'no-var': 'error',
      curly: ['warn', 'all'],
      semi: 'warn',
      quotes: ['error', 'single', { avoidEscape: true }],
      'no-extra-semi': 'error',
      'no-mixed-spaces-and-tabs': 'error',
      'prefer-const': ['warn', { destructuring: 'any' }],
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
    },
  },
]);

export default eslintConfig;
