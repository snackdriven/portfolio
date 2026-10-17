const markdownIt = require("markdown-it");
const { feedPlugin } = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
  // Static assets and the non-Eleventy pages are copied through as-is.
  eleventyConfig.addPassthroughCopy({ assets: "assets" });
  eleventyConfig.addPassthroughCopy({ portfolio: "portfolio" });
  eleventyConfig.addPassthroughCopy({ "404.html": "404.html" });
  eleventyConfig.addPassthroughCopy({ CNAME: "CNAME" });
  eleventyConfig.addPassthroughCopy({ "robots.txt": "robots.txt" });

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

  // Allow raw HTML in markdown (the terminal code blocks rely on it),
  // but sanitize the output to prevent XSS.
  const md = markdownIt({ html: true, linkify: true });
  const sanitizeHtml = require("sanitize-html");

  const originalRender = md.render.bind(md);
  md.render = function(src, env) {
    const html = originalRender(src, env);
    return sanitizeHtml(html, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'pre', 'code', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': ['class', 'id', 'data-*'],
        'a': ['href', 'name', 'target', 'rel'],
        'img': ['src', 'srcset', 'alt', 'title', 'width', 'height', 'loading']
      }
    });
  };
  eleventyConfig.setLibrary("md", md);

  // YYYY-MM-DD for the post-meta rows and JSON-LD.
  eleventyConfig.addFilter("ymd", (d) => new Date(d).toISOString().slice(0, 10));

  // Visible posts (not hidden), newest first. The landing renders the single
  // post in full when there's one, and falls back to the card list at 2+.
  eleventyConfig.addCollection("visiblePost", (api) =>
    api.getFilteredByTag("post").filter((p) => !p.data.hidden).reverse()
  );

  // Chronological (oldest-first) for the Atom feed; feedPlugin reverses it -> newest-first.
  eleventyConfig.addCollection("feedPosts", (api) =>
    api.getFilteredByTag("post").filter((p) => !p.data.hidden)
  );

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "njk"
  };
};
