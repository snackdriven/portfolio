jest.mock('@11ty/eleventy-plugin-rss', () => ({ feedPlugin: jest.fn() }));
jest.mock('sanitize-html', () => {
  const sanitize = jest.fn((html) => html);
  sanitize.defaults = { allowedTags: ['p', 'pre', 'code'], allowedAttributes: {} };
  return sanitize;
});

const configFn = require('../eleventy.config.js');
const { feedPlugin } = require('@11ty/eleventy-plugin-rss');
const sanitizeHtml = require('sanitize-html');

function configure() {
  const calls = { passthrough: [], plugins: [], libraries: [], filters: new Map(), collections: new Map(), events: [] };
  const result = configFn({
    addPassthroughCopy: (value) => calls.passthrough.push(value),
    addPlugin: (plugin, options) => calls.plugins.push({ plugin, options }),
    setLibrary: (name, lib) => calls.libraries.push({ name, lib }),
    addFilter: (name, fn) => calls.filters.set(name, fn),
    addCollection: (name, fn) => calls.collections.set(name, fn),
    on: (name, fn) => calls.events.push({ name, fn }),
  });
  return { calls, result };
}

test('configures the site, feed, filters, and visible collections', () => {
  const { calls, result } = configure();
  expect(result).toEqual({ dir: { input: 'src', includes: '_includes', output: '_site' }, markdownTemplateEngine: 'njk' });
  expect(calls.passthrough).toEqual([{ assets: 'assets', portfolio: 'portfolio', '404.html': '404.html', CNAME: 'CNAME', 'robots.txt': 'robots.txt' }]);
  expect(calls.plugins).toHaveLength(1);
  expect(calls.plugins[0].plugin).toBe(feedPlugin);
  expect(calls.plugins[0].options.collection).toEqual({ name: 'feedPosts', limit: 0 });
  expect(calls.filters.get('ymd')('2023-10-27T10:00:00Z')).toBe('2023-10-27');
  expect(calls.filters.get('jsonDump')('</script>')).toBe('"\\u003c/script\\u003e"');
  expect(calls.filters.get('jsonDump')(undefined)).toBe('undefined');
  expect(calls.collections.has('visiblePost')).toBe(true);
  expect(calls.collections.has('feedPosts')).toBe(true);
  expect(calls.events.map((event) => event.name)).toContain('eleventy.before');
});

test('passes rendered markdown through the sanitizer', () => {
  const { calls } = configure();
  const markdown = calls.libraries.find((entry) => entry.name === 'md').lib;
  markdown.render('<p>Hello</p>');
  expect(sanitizeHtml).toHaveBeenCalledWith(expect.stringContaining('<p>Hello</p>'), expect.objectContaining({ allowedTags: expect.arrayContaining(['img', 'span']) }));
});
