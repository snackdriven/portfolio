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
      subtitle: "Debugging by trade. Useful tools, odd little projects, and the decisions behind them.",
      base: "https://snackdriven.com/",
      author: { name: "Kayla Young" }
    }
  });

  // Preserve the posts' raw markup while stripping executable HTML and unsafe URLs.
  const md = markdownIt({ html: true, linkify: true });
  const render = md.render.bind(md);
  const sanitizeOptions = {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "span"],
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class", "id"],
      a: ["href", "name", "target", "rel"],
      img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
    },
  };
  md.render = (source, env) => sanitizeHtml(render(source, env), sanitizeOptions);
  eleventyConfig.setLibrary("md", md);

  // YYYY-MM-DD for the post-meta rows and JSON-LD.
  eleventyConfig.addFilter("ymd", (d) => new Date(d).toISOString().slice(0, 10));

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
