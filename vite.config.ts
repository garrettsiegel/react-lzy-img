import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
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
