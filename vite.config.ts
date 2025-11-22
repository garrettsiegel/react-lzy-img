import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
      jsxImportSource: undefined,
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'ReactLzyImg',
      fileName: (format) => `index.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: (id) => {
        return id === 'react' || 
               id === 'react-dom' || 
               id === 'blurhash' ||
               id.startsWith('react/');
      },
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          blurhash: 'blurhash',
        },
      },
    },
    outDir: 'dist',
    minify: 'esbuild',
    cssCodeSplit: false,
  },
});
