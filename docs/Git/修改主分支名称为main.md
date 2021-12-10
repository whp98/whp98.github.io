# Github老仓库将主分支重命名成 main


命令操作


```
# 使用以下命令将master分支移到main：
git branch -m master main
# 使用以下命令将新命名的main分支推送到GitHub(假设这是您的远程存储库)：
git push -u origin main
# 使用以下命令将HEAD指向main：
git symbolic-ref refs/remotes/origin/HEAD refs/remotes/origin/main

```

登录进入到您的GitHub帐户，打开项目的存储库，点击“设置” |“分支”。在左侧边栏中，点击“分支”，然后从下拉列表中选择“Main”作为默认值。点击“更新”，出现提示后，点击“我了解”。

```
git push origin --delete master
```