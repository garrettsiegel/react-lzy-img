#!/usr/bin/env node

/**
 * Integration test script to verify React build works correctly
 * after npm install without any additional configuration.
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { existsSync } from 'fs';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

console.log('🧪 Testing react-lzy-img package exports...\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name}`);
    passed++;
  } catch (error) {
    console.log(`❌ ${name}`);
    console.log(`   Error: ${error.message}`);
    failed++;
  }
}

// Test 1: Check package.json exports
test('package.json has correct exports configuration', () => {
  const pkg = require('../package.json');
  if (!pkg.exports['.']) throw new Error('Missing default export');
});

// Test 2: Verify React build files exist
test('React build files exist', () => {
  const files = ['dist/index.d.ts', 'dist/index.es.js', 'dist/index.cjs.js'];
  for (const file of files) {
    const path = resolve(projectRoot, file);
    if (!existsSync(path)) throw new Error(`Missing file: ${file}`);
  }
});

// Test 3: Import React version
test('Can import React version', async () => {
  const { LazyImage } = await import('../dist/index.es.js');
  if (typeof LazyImage !== 'function') throw new Error('LazyImage is not a function');
});

// Test 4: Verify type definitions
test('TypeScript definitions exist', () => {
  const reactTypes = resolve(projectRoot, 'dist/index.d.ts');
  if (!existsSync(reactTypes)) throw new Error('React types missing');
});

// Test 5: Check build size is reasonable
test('Build size is within acceptable range', () => {
  const fs = require('fs');
  const reactSize = fs.statSync(resolve(projectRoot, 'dist/index.es.js')).size;
  
  // React build should be small (~4KB)
  if (reactSize > 10000) throw new Error(`React build too large: ${reactSize} bytes`);
  
  console.log(`   Build size: ${(reactSize / 1024).toFixed(2)}KB`);
});

console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`);

if (failed > 0) {
  console.log('❌ Some tests failed. Please fix the issues above.');
  process.exit(1);
} else {
  console.log('✅ All tests passed! The package is ready for use.');
  process.exit(0);
}
