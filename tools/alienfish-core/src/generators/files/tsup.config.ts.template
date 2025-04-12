import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: false, // We'll generate declarations with tsc instead
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  treeshake: true,
  tsconfig: "./tsconfig.json",
  outExtension({ format }) {
    return {
      js: format === 'esm' ? '.js' : '.cjs',
    };
  },
});
