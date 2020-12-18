#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

rm -rf dist

npm run build

cd  dist

git init
git add .
git commit -m "bot deploy"

git push --force git@github.com:LuckRain7/bookmarks.git master

git push --force git@gitee.com:LuckRain/bookmarks.git master:page

cd ..

rm -rf dist


cd -