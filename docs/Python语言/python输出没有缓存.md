# python输出没有缓存


python输出到文件会有输出缓存，需要使用如下参数来关闭:


```shell
nohup python -u abc.py > log.txt 2>&1 &
```