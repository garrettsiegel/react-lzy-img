#!/usr/bin/env node

// Test script to verify React export works correctly
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

console.log('🔍 Checking react-lzy-img build outputs...\n');

// Check React build
const reactFiles = [
  'dist/index.d.ts',
  'dist/index.es.js',
  'dist/index.cjs.js',
];

let allGood = true;

console.log('✅ React Build:');
for (const file of reactFiles) {
  const fullPath = resolve(projectRoot, file);
  const exists = existsSync(fullPath);
  console.log(`  ${exists ? '✓' : '✗'} ${file}`);
  if (!exists) allGood = false;
}

// Try to import the package
console.log('\n🔄 Testing imports...\n');

try {
  const ReactLazyImage = await import('../dist/index.es.js');
  console.log('✓ React import successful:', Object.keys(ReactLazyImage));
  const expected = ['LazyImage', 'useLazyLoad'];
  for (const exportName of expected) {
    if (!(exportName in ReactLazyImage)) {
      console.log(`✗ Missing export: ${exportName}`);
      allGood = false;
    }
  }
} catch (error) {
  console.log('✗ React import failed:', error.message);
  allGood = false;
}

console.log('\n' + (allGood ? '✅ All checks passed!' : '❌ Some checks failed!'));
process.exit(allGood ? 0 : 1);
