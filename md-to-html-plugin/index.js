const { readFileSync, writeFileSync, mkdirSync, existsSync } = require("fs");
const { resolve } = require("path");
const { compilerHTML, compilerArr } = require("./compiler.js");
const icon = require("./config.icon.js");
const ejs = require("ejs");
// const INNER_MARK = "<!-- inner -->";

function MdToHtmlPlugin(_arr) {
  _arr.forEach(({ entryFilename, template, outFilename }) => {
    if (!template) {
      throw new Error('The config for "template" must be configured');
    }

    let templatePath = resolve(__dirname, "./template/" + template + ".ejs");
    let entryFilenamePath = resolve(__dirname, "../docs/" + entryFilename);
    let outFilenamePath = resolve(__dirname, "../dist/" + outFilename)

    // md文档内容
    const _mdContent = readFileSync(entryFilenamePath, "utf-8");

    // html模板
    const _templateHTML = readFileSync(templatePath, "utf-8");

    // 将md转换成arr
    const _mdContentArr = _mdContent.split("\n"); 

    // 进行编译
    const renderData = compilerArr(_mdContentArr);

    // 进行 模板字符串 替换
    const _renderHTML = ejs.render(_templateHTML, {render: renderData,icon: icon});

    // 判断文件夹是否存在
    existsSync(resolve(__dirname, "../dist")) || mkdirSync(resolve(__dirname, "../dist"));

    // 写入文件
    writeFileSync( outFilenamePath, _renderHTML, "utf-8" );
  });
}

module.exports = MdToHtmlPlugin;
