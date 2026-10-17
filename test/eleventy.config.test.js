const test = require('node:test');
const assert = require('node:assert');
const configFn = require('../eleventy.config.js');
const markdownIt = require('markdown-it');
const { feedPlugin } = require('@11ty/eleventy-plugin-rss');

test('eleventy.config.js configuration', () => {
  const calls = {
    addPassthroughCopy: [],
    addPlugin: [],
    setLibrary: [],
    addFilter: [],
    addCollection: [],
  };

  const mockConfig = {
    addPassthroughCopy: (arg) => calls.addPassthroughCopy.push(arg),
    addPlugin: (plugin, options) => calls.addPlugin.push({ plugin, options }),
    setLibrary: (name, lib) => calls.setLibrary.push({ name, lib }),
    addFilter: (name, fn) => calls.addFilter.push({ name, fn }),
    addCollection: (name, fn) => calls.addCollection.push({ name, fn }),
  };

  const result = configFn(mockConfig);

  // Return value tests
  assert.deepStrictEqual(result, {
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "njk"
  });

  // Passthrough copy tests
  assert.deepStrictEqual(calls.addPassthroughCopy, [
    { assets: "assets" },
    { portfolio: "portfolio" },
    { "404.html": "404.html" },
    { CNAME: "CNAME" },
    { "robots.txt": "robots.txt" }
  ]);

  // Plugin tests
  assert.strictEqual(calls.addPlugin.length, 1);
  assert.strictEqual(calls.addPlugin[0].plugin, feedPlugin);
  assert.deepStrictEqual(calls.addPlugin[0].options, {
    type: "atom",
    outputPath: "/feed.xml",
    collection: { name: "feedPosts", limit: 0 },
    metadata: {
      language: "en",
      title: "snackdriven.com — the log",
      subtitle: "Test automation by trade, and the log of every working tool I couldn't leave alone.",
      base: "https://snackdriven.com/",
      author: { name: "Kayla Young" }
    }
  });

  // Library tests
  assert.strictEqual(calls.setLibrary.length, 1);
  assert.strictEqual(calls.setLibrary[0].name, 'md');
  const mdInstance = markdownIt({ html: true, linkify: true });
  // Just testing the function was called. Complex object comparison fails easily with markdown-it.
  assert.ok(calls.setLibrary[0].lib);

  // Filter tests
  assert.strictEqual(calls.addFilter.length, 1);
  const ymdFilter = calls.addFilter.find(f => f.name === 'ymd');
  assert.ok(ymdFilter);
  assert.strictEqual(ymdFilter.fn('2023-10-27T10:00:00Z'), '2023-10-27');

  // Collection tests
  assert.strictEqual(calls.addCollection.length, 2);

  const visiblePostCollection = calls.addCollection.find(c => c.name === 'visiblePost');
  assert.ok(visiblePostCollection);

  const feedPostsCollection = calls.addCollection.find(c => c.name === 'feedPosts');
  assert.ok(feedPostsCollection);

  // Mock API for collection testing
  const mockPosts = [
    { data: { hidden: false }, date: 1 },
    { data: { hidden: true }, date: 2 },
    { data: { hidden: false }, date: 3 }
  ];
  const mockApi = {
    getFilteredByTag: (tag) => {
      assert.strictEqual(tag, 'post');
      return [...mockPosts];
    }
  };

  const visibleResult = visiblePostCollection.fn(mockApi);
  assert.deepStrictEqual(visibleResult, [
    { data: { hidden: false }, date: 3 },
    { data: { hidden: false }, date: 1 }
  ]);

  const feedResult = feedPostsCollection.fn(mockApi);
  assert.deepStrictEqual(feedResult, [
    { data: { hidden: false }, date: 1 },
    { data: { hidden: false }, date: 3 }
  ]);
});
