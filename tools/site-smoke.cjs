const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const { createHash } = require('node:crypto');
const pages = require('../src/_data/portfolioPages.json');
const root = path.resolve('_site');
const production = 'https://snackdriven.com';
const critical = ['/', ...pages, '/keeping-the-haunted-shop-stocked.html'];
const local = process.argv.includes('--local');
const base = new URL(process.env.SMOKE_BASE_URL || production);
assert.ok(['http:', 'https:'].includes(base.protocol));
function fileFor(url) { return path.join(root, url.endsWith('/') ? url + 'index.html' : url); }
async function read(url, type, status = 200) {
  const expected = await fs.readFile(fileFor(url));
  if (local) return expected;
  const response = await fetch(new URL(url, base), { redirect: 'manual', signal: AbortSignal.timeout(15000), headers: { 'Cache-Control': 'no-cache' } });
  assert.equal(response.status, status, `${url} status`);
  assert.ok(response.headers.get('content-type')?.includes(type), `${url} content type`);
  const actual = Buffer.from(await response.arrayBuffer());
  assert.equal(createHash('sha256').update(actual).digest('hex'), createHash('sha256').update(expected).digest('hex'), `${url} differs from the tested artifact`);
  return actual;
}
async function smoke() {
  const styles = new Set();
  await Promise.all(critical.map(async (url) => {
    const html = (await read(url, 'text/html')).toString();
    assert.match(html, /<h1\b/i, `${url} heading`);
    assert.ok(html.includes(`href="${production}${url}"`), `${url} canonical`);
    for (const tag of html.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi)) {
      const href = tag[0].match(/href=["']([^"']+)["']/i)?.[1];
      if (!href) continue;
      const css = new URL(href, new URL(url, production));
      if (css.origin === production) styles.add(css.pathname + css.search);
    }
  }));
  assert.ok(styles.size, 'critical pages have local styles');
  await Promise.all([...styles].map(async (href) => {
    const url = new URL(href, production);
    const bytes = await fs.readFile(fileFor(url.pathname));
    const hash = createHash('sha256').update(bytes).digest('hex').slice(0, 12);
    assert.equal(url.searchParams.get('v'), hash, `${href} stylesheet version`);
    if (!local) {
      const response = await fetch(new URL(href, base), { signal: AbortSignal.timeout(15000), redirect: 'manual' });
      assert.equal(response.status, 200, `${href} status`);
      assert.ok(response.headers.get('content-type')?.includes('text/css'), `${href} content type`);
      assert.deepEqual(Buffer.from(await response.arrayBuffer()), bytes, `${href} served stylesheet`);
    }
  }));
  const pdf = await read('/portfolio/resume/kayla-young-resume.pdf', 'application/pdf');
  assert.equal(pdf.subarray(0, 5).toString(), '%PDF-');
  await read('/sitemap.xml', 'xml');
  await read('/feed.xml', 'xml');
  await read('/robots.txt', 'text/plain');
  const missing = (await read('/404.html', 'text/html')).toString();
  assert.match(missing, /Page not found/);
  assert.doesNotMatch(missing, /http-equiv=["']refresh/i);
  if (!local) {
    const response = await fetch(new URL('/smoke-missing-' + process.env.GITHUB_SHA, base), { redirect: 'manual', signal: AbortSignal.timeout(15000) });
    assert.equal(response.status, 404, 'missing path retains HTTP 404');
    assert.equal(await response.text(), missing, 'hosted missing path serves the recovery page');
  }
  console.log(`Smoke passed: ${local ? 'local artifact' : base.origin}; release ${process.env.GITHUB_SHA || 'local'}; ${critical.length} HTML pages, ${styles.size} stylesheets, PDF, sitemap, feed, robots and 404.`);
}
(async () => {
  const attempts = local ? 1 : 6;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try { await smoke(); return; }
    catch (error) {
      if (attempt === attempts) throw error;
      console.warn(`Smoke attempt ${attempt}: ${error.message}; waiting for hosted propagation.`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
