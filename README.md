# md2bookmarks

> 利用 MD 文档 生成书签网站

## 文件目录

```
- md2bookmarks
  - docs  # MD文档存储文件夹
  - md-to-html-plugin # 主编译插件
```

## 热更新

> 配置 nodemon.json ,使用的 nodemon 进行监听。

```json
{
  "restartable": "rs", // 设置重启模式
  "ignore": [".git", "node_modules/**/node_modules"], // 设置忽略文件
  "verbose": true, // 设置日志输出模式，true 详细模式
  // 设置运行服务的后缀名与对应的命令
  "execMap": {
    "js": "node --harmony"
  },
  // 事件
  "events": {
    "restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
  },
  // 监听哪些文件的变化，当变化的时候自动重启
  "watch": ["dosc"],
  "env": {
    "NODE_ENV": "development"
  },
  // 监控指定的后缀文件名
  "ext": "js,json"
}
```


