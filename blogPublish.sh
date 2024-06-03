#!/bin/sh
echo `date +'%Y/%m/%d %H:%M:%S'`
echo "开始发布";
git fetch;git pull;git add .;git commit -m "发布博客，时间:`date +'%Y/%m/%d %H:%M:%S'`" ; git push;
echo "发布完成";