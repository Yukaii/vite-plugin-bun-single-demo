import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/build-server.ts', 'src/cli.ts'],
  outDir: 'dist',
  format: ['esm'],
  dts: true,
  splitting: false,
  clean: true,
  shims: false,
  target: 'node18',
  onSuccess: 'echo Build complete!'
});
