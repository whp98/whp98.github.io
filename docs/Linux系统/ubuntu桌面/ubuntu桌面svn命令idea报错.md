# ubuntu桌面svn命令idea报错

## 说明

我的系统是ubuntu 24

## 报错内容是

更新更改时出错: svn: warning: cannot set LC_CTYPE locale svn: warning: environment variable LC_ALL is en_US.UTF-8 svn: warning: please check that your locale name is correct svn: E000022: Error converting entry in directory '/home/w/MY_CODE/XXX' to UTF-8 svn: E000022: Can't convert string from native encoding to 'UTF-8': svn: E000022: XXX

## 解决方法

安装对应的语言

```shell
sudo locale-gen en_US.UTF-8
```

## 参考文献

https://stackoverflow.com/questions/11300633/svn-cannot-set-lc-ctype-locale