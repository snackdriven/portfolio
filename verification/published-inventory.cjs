const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const matter = require('gray-matter');
const inventory = require('../src/_data/portfolioPages.json');
const site = 'https://snackdriven.com';
const root = path.resolve('_site');
const output = url => path.join(root, url.endsWith('/') ? url + 'index.html' : url);

test('published sitemap includes canonical cases and visible posts once, while unlisted posts still build', () => {
  const document = new JSDOM(fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8'), { contentType: 'application/xml' }).window.document;
  const urls = [...document.querySelectorAll('loc')].map(node => node.textContent);
  assert.equal(urls.length, new Set(urls).size, 'sitemap URLs are unique');
  const expected = [site + '/', ...inventory.map(url => site + url)];
  for (const name of fs.readdirSync('src/blog/posts').filter(name => name.endsWith('.md'))) {
    const { data } = matter(fs.readFileSync(path.join('src/blog/posts', name), 'utf8'));
    assert.ok(fs.existsSync(output(data.permalink)), `unlisted/public permalink still builds: ${name}`);
    if (!data.hidden) expected.push(site + data.permalink);
    else assert.ok(!urls.includes(site + data.permalink), `unlisted post excluded: ${name}`);
  }
  assert.deepEqual([...urls].sort(), expected.sort());
  const caseFiles = fs.readdirSync('portfolio/projects').filter(name => name.endsWith('.html')).map(name => '/portfolio/projects/' + name);
  assert.deepEqual(inventory.filter(url => url.startsWith('/portfolio/projects/')).sort(), caseFiles.sort(), 'inventory covers actual public case files');
  for (const url of inventory) {
    const page = new JSDOM(fs.readFileSync(output(url), 'utf8')).window.document;
    assert.equal(page.querySelector('link[rel="canonical"]')?.href, site + url, `${url} canonical agrees with sitemap`);
  }
});
