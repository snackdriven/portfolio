const markdownIt = require("markdown-it");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");
const sanitizeHtml = require("sanitize-html");

module.exports = function (eleventyConfig) {
  // Static assets and the non-Eleventy pages are copied through as-is.
  eleventyConfig.addPassthroughCopy({
    assets: "assets",
    portfolio: "portfolio",
    "404.html": "404.html",
    CNAME: "CNAME",
    "robots.txt": "robots.txt"
  });

  // Atom feed at /feed.xml (referenced from every page's <head>).
  eleventyConfig.addPlugin(feedPlugin, {
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

  // Allow raw HTML in markdown (the terminal code blocks rely on it).
  eleventyConfig.setLibrary("md", markdownIt({ html: true, linkify: true }));


  // YYYY-MM-DD for the post-meta rows and JSON-LD.
  eleventyConfig.addFilter("ymd", (d) => new Date(d).toISOString().slice(0, 10));

  // Sanitize HTML filter
  eleventyConfig.addFilter("sanitize", (html) => {
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': ['class', 'id', 'aria-hidden', 'aria-label', 'title', 'data-solo', 'data-group'],
        'a': ['href', 'name', 'target'],
        'img': ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading']
      }
    });
  });

  // Safe JSON dump to prevent XSS in <script type="application/ld+json">
  eleventyConfig.addFilter("jsonDump", (value) => {
    if (value === undefined) return "undefined";
    return JSON.stringify(value)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  });

  // Visible posts (not hidden), newest first. The landing renders the single
  // post in full when there's one, and falls back to the card list at 2+.
  let cache = null;
  eleventyConfig.on('eleventy.before', () => { cache = null; });

  const getVisible = (api) => {
    if (!cache) cache = api.getFilteredByTag("post").filter((p) => !p.data.hidden);
    return cache;
  };

  eleventyConfig.addCollection("visiblePost", (api) => getVisible(api).slice().reverse());
  eleventyConfig.addCollection("feedPosts", (api) => getVisible(api).slice());

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "njk"
  };
};
