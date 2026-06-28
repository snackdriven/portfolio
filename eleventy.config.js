const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  // Static assets and the non-Eleventy pages are copied through as-is.
  eleventyConfig.addPassthroughCopy({ assets: "assets" });
  eleventyConfig.addPassthroughCopy({ portfolio: "portfolio" });
  eleventyConfig.addPassthroughCopy({ "404.html": "404.html" });
  eleventyConfig.addPassthroughCopy({ CNAME: "CNAME" });

  // Allow raw HTML in markdown (the terminal code blocks rely on it).
  eleventyConfig.setLibrary("md", markdownIt({ html: true, linkify: true }));

  // YYYY-MM-DD for the post-meta rows and JSON-LD.
  eleventyConfig.addFilter("ymd", (d) => new Date(d).toISOString().slice(0, 10));

  return {
    dir: { input: "src", includes: "_includes", output: "_site" },
    markdownTemplateEngine: "njk"
  };
};
