#!/usr/bin/env node
import { rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distPath = join(__dirname, '..', 'dist');

if (existsSync(distPath)) {
  rmSync(distPath, { recursive: true, force: true });
}
