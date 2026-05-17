/**
 * Copies schema.json files from src/api to dist/src/api after tsc compilation.
 * TypeScript compiler only processes .ts files; JSON files must be copied manually.
 */
const fs = require('fs');
const path = require('path');

const srcApiDir = path.join(__dirname, '..', 'src', 'api');
const distApiDir = path.join(__dirname, '..', 'dist', 'src', 'api');

function copyDir(src, dst) {
  if (!fs.existsSync(src)) return;
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const dstPath = path.join(dst, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(dstPath, { recursive: true });
      copyDir(srcPath, dstPath);
    } else if (entry.name.endsWith('.json')) {
      fs.mkdirSync(dst, { recursive: true });
      fs.copyFileSync(srcPath, dstPath);
      console.log(`  copied ${path.relative(path.join(__dirname, '..'), dstPath)}`);
    }
  }
}

console.log('Copying JSON schemas to dist/...');
copyDir(srcApiDir, distApiDir);
console.log('Done.');
