const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { versionStylesheets } = require('../tools/version-stylesheets.cjs');

test('CSS changes invalidate URLs in generated and copied pages without changing external fonts', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'portfolio-css-'));
  try {
    await fs.mkdir(path.join(root, 'portfolio'));
    await fs.writeFile(path.join(root, 'style.css'), 'body { color: purple; }');
    await fs.writeFile(path.join(root, 'index.html'), '<link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter">');
    await fs.writeFile(path.join(root, 'portfolio/index.html'), '<link rel="stylesheet" href="../style.css">');
    await versionStylesheets(root);
    const first = await fs.readFile(path.join(root, 'index.html'), 'utf8');
    const copied = await fs.readFile(path.join(root, 'portfolio/index.html'), 'utf8');
    assert.match(first, /\/style\.css\?v=[a-f0-9]{12}/);
    assert.match(copied, /\.\.\/style\.css\?v=[a-f0-9]{12}/);
    assert.match(first, /href="https:\/\/fonts.googleapis.com\/css2\?family=Inter"/);
    await versionStylesheets(root);
    assert.equal(await fs.readFile(path.join(root, 'index.html'), 'utf8'), first);
    await fs.writeFile(path.join(root, 'style.css'), 'body { color: green; }');
    await versionStylesheets(root);
    assert.notEqual(await fs.readFile(path.join(root, 'index.html'), 'utf8'), first);
  } finally {
    await fs.rm(root, { recursive: true, force: true });
  }
});
