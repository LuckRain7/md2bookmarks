const { randomNum } = require("./utils.js");

const reg_mark = /^(.+?)\s/;
const reg_sharp = /^\#/;
const reg_crossbar = /^\-/; // 以横线开头的
const reg_number = /^\d/; // 以数字开头的

function createTree(mdArr) {
  let _htmlPool = {};
  let _lastMark = ""; // 上一行的标签
  let _key = 0;
  mdArr.forEach((mdFragment) => {
    const matched = mdFragment.match(reg_mark);
    if (matched) {
      const mark = matched[1];
      const input = matched["input"];

      // 对 # 进行处理 => h1
      if (reg_sharp.test(mark)) {
        const tag = `h${mark.length}`; // 进行标签替换
        const tagContent = input.replace(reg_mark, ""); // 进行内容替换

        // 和一个标签进行匹配，进行判断是否是一组内容
        if (_lastMark === mark) {
          _htmlPool[`${tag}-${_key}`].tags = [
            ..._htmlPool[`${tag}-${_key}`].tags,
            `<${tag}>${tagContent}</${tag}>`,
          ];
        } else {
          _lastMark = mark;
          _key = randomNum();
          _htmlPool[`${tag}-${_key}`] = {
            type: "single",
            tags: [`<${tag}>${tagContent}</${tag}>`],
          };
        }
      }

      // 对 - 进行处理 => ul
      if (reg_crossbar.test(mark)) {
        const tag = `li`; // 进行标签替换
        const tagContent = input.replace(reg_mark, ""); // 进行内容替换

        if (reg_crossbar.test(_lastMark)) {
          _htmlPool[`ul-${_key}`].tags = [
            ..._htmlPool[`ul-${_key}`].tags,
            `<${tag}>${tagContent}</${tag}>`,
          ];
        } else {
          _key = randomNum();
          _lastMark = mark;
          _htmlPool[`ul-${_key}`] = {
            type: "wrap",
            tags: [`<${tag}>${tagContent}</${tag}>`],
          };
        }
      }

      // 对 1. 进行处理 => ol
      if (reg_number.test(mark)) {
        const tag = "li";
        const tagContent = input.replace(reg_mark, "");

        if (reg_number.test(_lastMark)) {
          _htmlPool[`ol-${_key}`].tags = [
            ..._htmlPool[`ol-${_key}`].tags,
            `<${tag}>${tagContent}</${tag}>`,
          ];
        } else {
          _lastMark = mark;
          _key = randomNum();
          _htmlPool[`ol-${_key}`] = {
            type: "wrap",
            tags: [`<${tag}>${tagContent}</${tag}>`],
          };
        }
      }
    }
  });

  return _htmlPool;
}

function compilerHTML(_mdArr) {
  const _htmlPool = createTree(_mdArr);
  let _htmlStr = "";
  let item;
  for (let k in _htmlPool) {
    item = _htmlPool[k];
    if (item.type === "single") {
      item.tags.forEach((tag) => {
        _htmlStr += tag;
      });
    } else if (item.type === "wrap") {
      let _list = `<${k.split("-")[0]}>`;
      item.tags.forEach((tag) => {
        _list += tag;
      });
      _list += `</${k.split("-")[0]}>`;
      _htmlStr += _list;
    }
  }
  //   console.log(_htmlStr);
  return _htmlStr;
}

const reg_brackets = /\[(.+?)\]/; // 匹配中括号中的内容
const reg_parenthesis = /\((.+?)\)/; // 匹配小括号中的内容
const reg_content = /\[(.+?)\)/; // 匹配小括号中的内容
const reg_two_sharp = /^\##/; // 匹配两个 #号 以上内容
const sharpDic = { 2: "h4", 3: "h5" }; // sharp 对应字典
function compilerArr(_mdArr) {
  let _renderArr = [];
  let _curObj = {};
  let _lastMark = ""; // 上一行的标签
  let _key = 0;
  _mdArr.forEach((mdFragment) => {
    if (mdFragment.length < 1) return; // 去除空行

    // 先进行标题匹配  匹配带 ## 的
    if (mdFragment.match(reg_two_sharp)) {
      const matched = mdFragment.match(reg_two_sharp)["input"];
      const [sharp, title] = matched.split(" ");

      _curObj = {
        tag: sharpDic[sharp.length],
        title: title,
        children: [],
      };
      _renderArr.push(_curObj);

      return;
    }

    // 匹配 链接内容
    if (mdFragment.match(reg_content)) {
      const matched = mdFragment.match(reg_content)["input"];
      const url = matched.match(reg_parenthesis)[1]; // 匹配到的地址
      const content = matched.match(reg_brackets)[1]; // 匹配到的内容
      let title, intro;
      if (content.indexOf(" - ")) {
        [title, intro] = content.split(" - ");
      }

      _curObj.children.push({
        tag: "a",
        title: title,
        intro: intro || "",
        url: url,
      });
    }
  });

  return _renderArr;
}

module.exports = { compilerHTML, compilerArr };
