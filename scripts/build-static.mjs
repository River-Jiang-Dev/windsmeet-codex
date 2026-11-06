// Production build for Cloudflare Workers static assets.
//
// next-intl loads @swc/core while Next compiles. On the Workers Builds image
// the native binding's cache root fails the Unix ownership check, and npm may
// also skip the @swc/core postinstall unless allowScripts permits it.
// Match the wow-forever fix: an absolute cache directory plus
// SWC_NATIVE_BINDING_CACHE_SKIP_SECURITY_CHECK=1.
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cache = process.env.SWC_NATIVE_BINDING_CACHE || path.join(root, '.swc-native-cache');

if (!path.isAbsolute(cache)) {
  console.error('SWC_NATIVE_BINDING_CACHE must be an absolute path.');
  process.exit(1);
}

mkdirSync(cache, { recursive: true });

const env = {
  ...process.env,
  NEXT_TELEMETRY_DISABLED: process.env.NEXT_TELEMETRY_DISABLED || '1',
  SWC_NATIVE_BINDING_CACHE: cache,
  SWC_NATIVE_BINDING_CACHE_SKIP_SECURITY_CHECK:
    process.env.SWC_NATIVE_BINDING_CACHE_SKIP_SECURITY_CHECK || '1',
};

const require = createRequire(import.meta.url);
const nextBin = require.resolve('next/dist/bin/next');

const code = await new Promise((resolve) => {
  const child = spawn(process.execPath, [nextBin, 'build', '--webpack'], {
    cwd: root,
    env,
    stdio: 'inherit',
  });
  child.on('exit', (status) => resolve(status ?? 1));
});

if (code !== 0) {
  process.exit(code);
}

const outDir = path.join(root, 'out');
const notFound = readFileSync(path.join(root, 'public', '404.html'));

function replaceNotFoundPages(dir) {
  for (const name of readdirSync(dir)) {
    const fullPath = path.join(dir, name);
    if (statSync(fullPath).isDirectory()) {
      replaceNotFoundPages(fullPath);
    } else if (name === '404.html') {
      writeFileSync(fullPath, notFound);
    }
  }
}

replaceNotFoundPages(outDir);
if (!existsSync(path.join(outDir, '404.html'))) {
  writeFileSync(path.join(outDir, '404.html'), notFound);
}

const homepage =
  existsSync(path.join(outDir, 'en.html')) || existsSync(path.join(outDir, 'en', 'index.html'));
if (!homepage) {
  console.error('Static export did not produce the English homepage.');
  process.exit(1);
}
