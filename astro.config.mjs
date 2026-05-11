// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import fs from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const sassRoot = resolve(__dirname, 'src/sass');

/** @type {import('sass').FileImporter<'sync'>} */
const sassAliasImporter = {
  findFileUrl(url) {
    if (!url.startsWith('@')) return null;
    const slash = url.indexOf('/');
    if (slash === -1) return null;
    const folder = url.slice(1, slash);
    const rest = url.slice(slash + 1);
    const candidates = [
      resolve(sassRoot, folder, `_${rest}.scss`),
      resolve(sassRoot, folder, `${rest}.scss`),
      resolve(sassRoot, folder, rest, `_index.scss`),
      resolve(sassRoot, folder, rest, `index.scss`),
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) return pathToFileURL(c);
    }
    return null;
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://alvarobarrenadev.github.io',
  base: process.env.NODE_ENV === 'production' ? '/apuntes-sql' : '/',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          importers: [sassAliasImporter],
        },
      },
    },
    resolve: {
      alias: {
        '@components': resolve(__dirname, 'src/components'),
        '@layouts': resolve(__dirname, 'src/layouts'),
        '@data': resolve(__dirname, 'src/data'),
        '@utils': resolve(__dirname, 'src/utils'),
      },
    },
  },
});
