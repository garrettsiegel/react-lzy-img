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
            exclude: ['src/**/*.test.tsx', 'src/**/*.test.ts', 'src/__tests__'],
          }),
        ]
      : []),
  ],
  ...(isLibraryBuild
    ? {
        build: {
          sourcemap: true,
          lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'ReactLzyImg',
            fileName: (format) => `index.${format}.js`,
            formats: ['es', 'cjs'],
          },
          rollupOptions: {
            external: ['react', 'react-dom', 'preact', 'preact/hooks', 'blurhash'],
            output: {
              globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
                preact: 'preact',
                'preact/hooks': 'preactHooks',
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
