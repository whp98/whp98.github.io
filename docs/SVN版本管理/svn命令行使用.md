# svn命令行使用

## 拉取代码
```shell
svn checkout svn://192.168.1.1/svn/test/trunk test
```

## 更新代码
```shell
svn update
svn update -r 100
svn update -r HEAD
svn update -r 100:HEAD
svn update -r 100:HEAD --set-depth infinity
svn update -r 100:HEAD --set-depth immediates
svn update -r 100:HEAD --set-depth empty
```

## 提交代码
```shell
svn commit -m "提交说明"
svn commit -m "提交说明" --username=admin --password=admin
svn commit -m "提交说明" --username=admin --password=admin --no-auth-cache
```

## 添加文件到版本库

```shell
svn add file1 file2 file3
svn add file1 file2 file3 --force
```
## 删除文件
```shell
svn delete file1 file2 file3
svn delete file1 file2 file3 --force
```

## 忽略文件
```shell
svn propset svn:ignore "*.log" .
svn propset svn:ignore "*.log" . --force
```

## 创建标签
```shell
svn copy svn://192.168.1.1/svn/test/trunk svn://192.168.1.1/svn/test/tags/1.0.0 -m "创建标签"
svn copy svn://192.168.1.1/svn/test/trunk svn://192.168.1.1/svn/test/tags/1.0.0 -m "创建标签" --username=admin --password=admin
```

## 创建分支
```shell
svn copy svn://192.168.1.1/svn/test/trunk svn://192.168.1.1/svn/test/branches/1.0.0 -m "创建分支"
svn copy svn://192.168.1.1/svn/test/trunk svn://192.168.1.1/svn/test/branches/1.0.0 -m "创建分支" --username=admin --password=admin
```

## 查看日志

```shell
svn log svn://192.168.1.1/svn/test/trunk
svn log svn://192.168.1.1/svn/test/trunk -l 10
svn log svn://192.168.1.1/svn/test/trunk -r 100:HEAD
```

## 查看文件修改记录
```shell
svn blame svn://192.168.1.1/svn/test/trunk/test.php
svn blame svn://192.168.1.1/svn/test/trunk/test.php -r 100:HEAD
```

## 查看文件差异
```shell
svn diff svn://192.168.1.1/svn/test/trunk/test.php
svn diff svn://192.168.1.1/svn/test/trunk/test.php -r 100:HEAD
```

## 查看文件状态
```shell
svn status
svn status -u
svn status -u --username=admin --password=admin
```

## 清理缓存
```shell
svn cleanup
svn cleanup --username=admin --password=admin
svn cleanup --force
```

## 清理锁
```shell
svn cleanup --remove-locks
svn cleanup --remove-locks --username=admin --password=admin
```
