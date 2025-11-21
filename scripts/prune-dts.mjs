#!/usr/bin/env node
import { readdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');
const keep = new Set(['index.d.ts', 'LazyImage.d.ts', 'LazyPicture.d.ts', 'types.d.ts', 'useLazyLoad.d.ts', 'constants.d.ts', 'PlaceholderComponents.d.ts']);

for (const file of readdirSync(distDir)) {
  if (file.endsWith('.d.ts') && !keep.has(file)) {
    rmSync(join(distDir, file), { force: true });
  }
}
