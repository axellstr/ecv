#!/usr/bin/env node
/**
 * Wraps each <path> in the SVG with a <g class="hero-svg-part"> for staggered animation.
 * Run: node scripts/wrap-svg-paths.js
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const inputPath = join(root, 'scripts', 'sources', 'download.svg');
const outputPath = join(root, 'public', 'images', 'hero-illustration.svg');

const svg = readFileSync(inputPath, 'utf8');

const STAGGER_MS = 12;

let index = 0;
const result = svg.replace(/<path\s+([^>]+)\s*\/>/g, (_, attrs) => {
  const delay = index * STAGGER_MS;
  index += 1;
  return `<g class="hero-svg-part" style="animation-delay: ${delay}ms"><path ${attrs} /></g>`;
});

writeFileSync(outputPath, result, 'utf8');
console.log(`Wrote ${outputPath} with ${(result.match(/hero-svg-part/g) || []).length} wrapped path groups`);
