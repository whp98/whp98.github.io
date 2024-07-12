# linux拆分大文本split命令

split命令可以将大文本文件拆分成多个小文本文件。

# 按照行数拆分

```shell
split -l 1000 bigfile.txt smallfile.txt
```
# 按照字节数拆分
```shell
split -b 100m bigfile.txt smallfile.txt
```