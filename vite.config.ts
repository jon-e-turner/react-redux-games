/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="vitest/config" />

import * as vite from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { configDefaults } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [tailwindcss(), vite.reactRouter(), devtoolsJson()],
  test: {
    exclude: [...configDefaults.exclude, '.react-router/**', 'build/**', 'coverage/**'],
    coverage: {
      include: ['app/**/*.{ts,tsx}'],
      thresholds: { autoUpdate: true },
    },
    projects: [
      {
        test: {
          include: ['**/*.test.ts'],
          name: 'unit',
        },
        resolve: {
          tsconfigPaths: true,
        },
      },
      {
        test: {
          include: ['**/*.test.tsx'],
          name: 'browser',
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: 'chromium' }],
          },
        },
        resolve: {
          tsconfigPaths: true,
        },
      },
    ],
  },
});
