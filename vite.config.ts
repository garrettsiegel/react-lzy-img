import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isLibraryBuild = mode === 'production';

  return {
    plugins: [
      react(),
      ...(isLibraryBuild
        ? [
            dts({
              include: ['src/index.ts', 'src/LazyImage.tsx'],
              exclude: ['src/**/*.test.tsx', 'src/**/*.test.ts', 'tests/**', 'website/**'],
            }),
          ]
        : []),
    ],
    ...(isLibraryBuild
      ? {
          build: {
            outDir: 'dist',
            sourcemap: true,
            lib: {
              entry: path.resolve(__dirname, 'src/index.ts'),
              name: 'ReactLzyImg',
              fileName: (format) => `index.${format}.js`,
              formats: ['es', 'cjs'],
            },
            rollupOptions: {
              external: ['react', 'react-dom', 'react/jsx-runtime', 'blurhash'],
              output: {
                globals: {
                  react: 'React',
                  'react-dom': 'ReactDOM',
                  'react/jsx-runtime': 'ReactJSXRuntime',
                  blurhash: 'blurhash',
                },
              },
            },
            minify: true,
          },
        }
      : {
          root: '.',
          build: {
            outDir: 'dist-demo',
          },
        }),
  };
});
