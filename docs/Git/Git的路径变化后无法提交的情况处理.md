# Git安装版本修改安装文件的路径后，无法提交的报错`error setting certificate verify locations:`解决方式


## 报错内容

```
fatal: unable to access 'https://github.com/Kiterepo/dns-over-https': error setting certificate verify locations:
  CAfile: D:/ProgramFlie/Git/mingw64/libexec/ssl/certs/ca-bundle.crt
  CApath: none
```

## 解决方式

这个问题出现在我重装windows之后盘符变化的情况，git安装版本会把这个ca的路径写死

经过查找这个文件的路径在git的安装路径下

`E:\DEV_ENV\Git\etc\gitconfig`

打开文件将里面错误的路径直接删除就会好了
,具体的位置应该在 `[http]`下面
