import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintReact from '@eslint-react/eslint-plugin';
import markdown from '@eslint/markdown';
// import css from '@eslint/css';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['.react-router/', 'build/']),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: [js.configs.recommended, tseslint.configs.recommended, eslintReact.configs['recommended-typescript']],
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'no-empty-pattern': 'off',
      '@eslint-react/no-array-index-key': 'off',
    },
  },
  tseslint.configs.recommended,
  eslintConfigPrettier,
  { files: ['**/*.md'], plugins: { markdown }, language: 'markdown/gfm', extends: ['markdown/recommended'] },
  // { files: ['**/*.css'], plugins: { css }, language: 'css/css', extends: ['css/recommended'] },
]);
