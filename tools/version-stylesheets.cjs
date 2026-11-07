const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');

// Include copied portfolio pages as well as Eleventy templates. A changed
// stylesheet gets a new URL, so a deployment cannot reuse an older CSS response.
async function versionStylesheets(outputDirectory) {
  const root = path.resolve(outputDirectory);
  const hashCache = new Map();

  async function visit(directory) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) { await visit(file); continue; }
      if (!entry.name.endsWith('.html')) continue;
      const source = await fs.readFile(file, 'utf8');
      let result = source;
      for (const match of source.matchAll(/<link\b[^>]*\brel=["']stylesheet["'][^>]*>/gi)) {
        const href = match[0].match(/\bhref=(["'])([^"']+)\1/i);
        if (!href || /^(?:[a-z]+:|\/\/)/i.test(href[2])) continue;
        const url = new URL(href[2], `https://site.test/${path.relative(root, file).split(path.sep).join('/')}`);
        const cssFile = path.resolve(root, '.' + decodeURIComponent(url.pathname));
        if (!cssFile.startsWith(root + path.sep) || !cssFile.endsWith('.css')) continue;

        let hash = hashCache.get(cssFile);
        if (!hash) {
          const css = await fs.readFile(cssFile);
          hash = createHash('sha256').update(css).digest('hex').slice(0, 12);
          hashCache.set(cssFile, hash);
        }

        url.searchParams.set('v', hash);
        const nextHref = href[2].split(/[?#]/)[0] + url.search + url.hash;
        result = result.replace(match[0], match[0].replace(href[0], `href=${href[1]}${nextHref}${href[1]}`));
      }
      if (result !== source) await fs.writeFile(file, result);
    }
  }
  await visit(root);
}
module.exports = { versionStylesheets };
