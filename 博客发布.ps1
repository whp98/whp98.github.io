echo "开始发布";
git fetch;yarn docs:build;git pull;yarn docs:build;git add .;yarn docs:build;git commit -m "发布博客，时间:$(Get-Date  -Format 'yyyy-MM-dd HH:mm:ss')" ; git push;
echo "发布完成";