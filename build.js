const MdToHtmlPlugin = require("./md-to-html-plugin/index.js");

MdToHtmlPlugin([
  {
    entryFilename: "bookmarks.md",
    template: "template.v2",
    outFilename: "index.html",
  },
  {
    entryFilename: "github.md",
    template: "template.v2",
    outFilename: "github.html",
  },
]);
console.log('[info] build....');
