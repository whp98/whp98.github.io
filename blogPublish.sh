#!/bin/bash
echo `date +'%Y/%m/%d %H:%M:%S'`
echo "开始发布";
git fetch;fnm use 18;pnpm install;pnpm run docs:build;git pull;pnpm run docs:build;git add .;pnpm run docs:build;git commit -m "发布博客，时间:`date +'%Y/%m/%d %H:%M:%S'`"; git push;
echo "发布完成";