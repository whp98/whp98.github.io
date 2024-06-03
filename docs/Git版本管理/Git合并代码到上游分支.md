# Git合并代码到上游分支

如果在git上fork了一个项目，自己对项目做了改动并提交到了fork出来的仓库中，
此时上游仓库也做了提交，这时候我们就不能直接拉请求，需要本地合并上游分支后才可以。

## 切换到仓库的主分支
```shell
git checkout master
```
output:
```
Already on 'master'
Your branch is up to date with 'origin/master'.
```
## 查看远程分支
```shell
git remote -v
```
output：
```
origin  https://github.com/whp98/Hail.git (fetch)
origin  https://github.com/whp98/Hail.git (push)
upstream        https://github.com/aistra0528/Hail.git (fetch)
upstream        https://github.com/aistra0528/Hail.git (push)
```
这里的upstream是上游的意思
如果没有upstream就需要添加了

## 添加上游分支
```shell
git remote add upstream https://github.com/aistra0528/Hail.git
# 查看结果
git remote -v
```
添加之后可以拉取上游到本地了

## 从上游分支拉取代码

```shell
git fetch upstream
```
## 合并分支到
合并上游分支到主分支
```shell
git merge upstream/master
```

合并后一般会有冲突需要解决，这里可以使用`idea`进行合并合并好之后就可以提交了。 并推送本地分支到远程分支。
```shell
git add .
git commit -m "commit_message"
git push origin master
```