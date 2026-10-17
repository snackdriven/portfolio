const test = require('node:test');
const assert = require('node:assert/strict');
const configFn = require('../eleventy.config.js');

test('markdown strips executable HTML and URLs while preserving post markup', () => {
  let markdown;
  configFn({
    addPassthroughCopy() {},
    addPlugin() {},
    setLibrary(name, library) { if (name === 'md') markdown = library; },
    addFilter() {},
    addCollection() {},
    on() {},
  });
  const html = markdown.render('<p class="lead" onclick="alert(1)">Hello</p>\n<script>alert(1)</script>\n<a href="javascript:alert(1)">bad</a>\n<pre><code><span class="g">PASS</span></code></pre>');
  assert.match(html, /<p class="lead">Hello<\/p>/);
  assert.match(html, /<pre><code><span class="g">PASS<\/span><\/code><\/pre>/);
  assert.doesNotMatch(html, /<script|onclick|javascript:/i);
});
