import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'lcov'],
      exclude: [
        '**/node_modules/**',
        '**/dist/**',
        '*.config.*',
        "src/index.ts",
        "src/types.ts",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80
      }
    },
  },
});