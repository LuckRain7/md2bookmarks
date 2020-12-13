const { readFileSync, writeFileSync, mkdirSync, existsSync } = require("fs");
const { resolve } = require("path");
const { compilerHTML, compilerArr } = require("./compiler.js");
const ejs = require("ejs");
const INNER_MARK = "<!-- inner -->";

function MdToHtmlPlugin({ template, filename }) {
  if (!template) {
    throw new Error('The config for "template" must be configured');
  }

  this.template = template;
  this.filename = filename ? filename : ".md.html";

  // 拿到对应md文档内容 还有html模板
  const _mdContent = readFileSync(this.template, "utf-8");

  // prettier-ignore
  const _templateHTML = readFileSync(resolve(__dirname, "template.ejs"), "utf-8");

  const _mdContentArr = _mdContent.split("\n"); // 将md转换成arr

  const renderData = compilerArr(_mdContentArr);

  // console.log(" --- compilerArr --- ", JSON.stringify(renderData, null, "\t"));

  // prettier-ignore
  // 进行 模板字符串 替换
  const _renderHTML = ejs.render(_templateHTML, {render: renderData});

  // prettier-ignore
  existsSync(resolve(__dirname, "../dist")) || mkdirSync(resolve(__dirname, "../dist"));

  writeFileSync(resolve(__dirname, "../dist/index.html"), _renderHTML, "utf-8");
}

module.exports = MdToHtmlPlugin;
