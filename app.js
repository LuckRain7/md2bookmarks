const { resolve } = require("path");
const Koa = require("koa");
const MdToHtmlPlugin = require("./md-to-html-plugin/index.js");

const app = new Koa();
app.use(require("koa-static")(__dirname + "/dist")); // 静态文件

MdToHtmlPlugin({
  template: resolve(__dirname, "docs/test.md"),
  filename: "index.html",
});

// 监听端口
app.listen(3000, function () {
  console.log("server run in http://localhost:3000");
});
