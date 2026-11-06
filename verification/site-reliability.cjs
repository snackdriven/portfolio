const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const nunjucks = require('nunjucks');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');

for (const isPost of [false, true]) {
  for (const reduced of [false, true]) {
    test(`${isPost ? 'post' : 'home'} initializes steady branding without errors (reduced motion: ${reduced})`, async () => {
      const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(path.join(root, 'src/_includes')));
      env.addFilter('jsonDump', JSON.stringify);
      env.addFilter('ymd', () => '2026-10-19');
      const html = env.render('base.njk', { title: 'Test', page: { url: isPost ? '/test.html' : '/' }, content: '<h1>Test</h1>', isPost });
      const errors = [];
      const timers = [];
      const console = new VirtualConsole();
      console.on('jsdomError', error => errors.push(error.message));
      class LocalAssets extends ResourceLoader {
        fetch(url) {
          const asset = new URL(url).pathname;
          if (asset.startsWith('/assets/') && asset.endsWith('.js')) return Promise.resolve(fs.readFileSync(path.join(root, asset)));
          return Promise.resolve(Buffer.from(''));
        }
      }
      const dom = new JSDOM(html, { url: 'https://site.test/', resources: new LocalAssets(), runScripts: 'dangerously', virtualConsole: console,
        beforeParse(window) {
          window.matchMedia = () => ({ matches: reduced });
          window.setTimeout = callback => { timers.push(callback); return timers.length; };
          window.Math.random = () => 0.8;
        }
      });
      await new Promise(resolve => dom.window.addEventListener('load', resolve));
      assert.deepEqual(errors, []);
      const document = dom.window.document;
      assert.equal(timers.length, 0, 'branding never schedules automatic motion');
      assert.equal(document.querySelector('script[src*="neon-flicker"]'), null);
      assert.equal(document.querySelector('.flickering'), null);
      assert.equal(document.documentElement.dataset.theme, 'dark');
      assert.equal(document.documentElement.dataset.ornament, 'signal');
      assert.equal(document.querySelector('link[rel="icon"]')?.getAttribute('href'), '/assets/brand/favicon.svg');
      const brand = document.querySelector('.topbar a.sd-brand');
      assert.equal(brand?.getAttribute('href'), '/');
      assert.equal(brand.getAttribute('aria-current'), isPost ? null : 'page');
      assert.equal(brand.querySelector('.sd-brand-icon')?.getAttribute('src'), '/assets/brand/icon.svg');
      assert.equal(brand.querySelector('.sd-brand-icon')?.getAttribute('alt'), '', 'candy is decorative beside the named wordmark');
      const wordmark = brand.querySelector('.sd-brand-wordmark');
      assert.equal(wordmark?.getAttribute('src'), '/assets/brand/wordmark-tidy200-dark.svg');
      assert.equal(wordmark?.getAttribute('alt'), 'snackdriven', 'brand link keeps an accessible name');
      const styles = [...document.querySelectorAll('link[rel="stylesheet"]')].map(link => link.getAttribute('href'));
      assert.deepEqual(styles.slice(-2), ['/assets/brand/component-appearance-tokens.css', '/assets/brand-v2.css']);
      assert.equal(document.querySelector('.skip-link')?.getAttribute('href'), '#main-content');
      assert.ok(document.getElementById('main-content'));
      const navigation = document.querySelector('nav[aria-label="Site"]');
      for (const href of ['/', '/portfolio/', '/portfolio/resume/kayla-young-resume.pdf']) assert.ok(navigation.querySelector(`a[href="${href}"]`));
      dom.window.close();
    });
  }
}

test('404 retains the missing address and offers portfolio and log recovery without scripts', () => {
  const dom = new JSDOM(fs.readFileSync(path.join(root, '404.html'), 'utf8'), { url: 'https://site.test/missing' });
  const document = dom.window.document;
  assert.equal(document.querySelector('meta[http-equiv="refresh"]'), null);
  assert.match(document.querySelector('h1')?.textContent || '', /not found|missing/i);
  for (const href of ['/', '/portfolio/']) assert.ok(document.querySelector(`a[href="${href}"]`));
  assert.equal(dom.window.location.pathname, '/missing');
  dom.window.close();
});
