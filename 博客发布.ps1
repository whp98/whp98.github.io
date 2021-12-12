echo "开始发布"；
git fetch;git add . ; git commit -m "发布博客，时间:$(Get-Date)" ; git push;
echo "发布完成";