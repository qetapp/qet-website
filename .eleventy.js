module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("main.js");

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};