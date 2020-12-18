const MdToHtmlPlugin = require("./md-to-html-plugin/index.js");

MdToHtmlPlugin([
  {
    entryFilename: "bookmarks.md",
    template: "bookmarks",
    outFilename: "index.html",
  },
  {
    entryFilename: "github.md",
    template: "github",
    outFilename: "github.html",
  },
]);
