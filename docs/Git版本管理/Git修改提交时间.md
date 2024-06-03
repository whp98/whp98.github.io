# Git修改提交时间

首先获取日期格式
```bash
date -R
```
获取到的日期
```
Mon, 8 Jan 2022 16:42:25 +0800
```
输入命令修改对应的COMMITID
`a1efd370673d545abde30d62e871e8b915f9485c`


```
git commit --amend  --date='Mon, 9 Jan 2022 16:42:25 +0800' -C a1efd370673d545abde30d62e871e8b915f9485c
```