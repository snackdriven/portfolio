const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const nunjucks = require('nunjucks');
const { JSDOM, ResourceLoader, VirtualConsole } = require('jsdom');
const root = path.resolve(__dirname, '..');

for (const isPost of [false, true]) {
  for (const reduced of [false, true]) {
    test(`${isPost ? 'post' : 'home'} initializes deferred neon without errors (reduced motion: ${reduced})`, async () => {
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
          if (url.endsWith('/assets/neon-flicker.js')) return Promise.resolve(fs.readFileSync(path.join(root, 'assets/neon-flicker.js')));
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
      assert.equal(timers.length > 0, !reduced);
      if (!reduced) {
        timers[0]();
        assert.ok(dom.window.document.querySelector('.topbar .flickering'));
      }
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
