const minify = require("html-minifier").minify;
const fs = require("fs");
const htmlPath = "./dist/index.html";
const result = minify(fs.readFileSync(htmlPath, { encoding: "utf-8" }), {
  removeAttributeQuotes: true,
  minifyJS: true,
  minifyCSS: true,
});
fs.writeFileSync(htmlPath, result, { encoding: "utf-8" });
console.log("Minify Successful!");