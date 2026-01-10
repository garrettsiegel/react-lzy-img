import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src/index.ts', 'src/LazyImage.tsx'],
      exclude: ['src/**/*.test.tsx', 'src/**/*.test.ts', 'src/__tests__'],
    }),
  ],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReactLzyImg',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'blurhash'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          blurhash: 'blurhash',
        },
      },
    },
    minify: true,
  },
});
