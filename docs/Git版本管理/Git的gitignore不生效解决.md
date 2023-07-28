# Git的gitignore不生效解决


## 1.   `.gitignore`编码不符合规范

.gitignore如果不是`utf-8`有可能会识别失败,导致`.gitignore`添加忽略失效


在windows中使用 echo命令生成的文件编码不是utf-8如果再此基础上对这个文件进行修改，
会发现无法识别。网上使用的命令组合没有作用。

## 2. 解决编码问题后的删除暂存命令

```shell
git rm -r --cached .
git add .
git commit -m ‘更新 .gitignore’
```
第一行删除暂存区的文件，如果删除不掉可以使用强制删除加上 `-f` 参数 
，第二行添加当前目录下的文件，这里注意使用`git status`查看`.gitignore`命令生效了没有。
第三行提交并加上提交信息。
