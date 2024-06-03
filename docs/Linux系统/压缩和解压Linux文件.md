# 压缩和解压Linux文件

原文[链接](https://www.jianshu.com/p/ca41f32420d6)

## .xz

```bash
  解包：tar xvf FileName.tar.xz
  打包：tar cvf FileName.tar DirName
```
## .tar
```bash
 解包：tar xvf FileName.tar
 打包：tar cvf FileName.tar DirName
（注：tar是打包，不是压缩！）
```

## .gz

```bash
　　解压1：gunzip FileName.gz
　　解压2：gzip -d FileName.gz
　　压缩：gzip FileName
```

## .tar.gz 和 .tgz

```bash
　　解压：tar zxvf FileName.tar.gz
　　压缩：tar zcvf FileName.tar.gz DirName
```

## bz2
```bash
　　解压1：bzip2 -d FileName.bz2
　　解压2：bunzip2 FileName.bz2
　　压缩： bzip2 -z FileName
```

## bz

```bash
　　解压1：bzip2 -d FileName.bz
　　解压2：bunzip2 FileName.bz
　　压缩：未知
```

## .tar.bz .tar.bz2

```bash
  解压：tar jxvf FileName.tar.bz
  压缩：tar -cjf archive.tar.bz2 file_or_directory
```

## .Z

```bash
　解压：uncompress FileName.Z
　压缩：compress FileName
```

## .tar.Z

```bash
　　解压：tar Zxvf FileName.tar.Z
　　压缩：tar Zcvf FileName.tar.Z DirName
```

## .zip

```bash　　
解压：unzip FileName.zip
　　压缩：zip FileName.zip DirName
　　压缩一个目录使用 -r 参数，-r 递归。例： $ zip -r FileName.zip DirName
```
## .rar

```bash　　
解压：rar x FileName.rar
压缩：rar a FileName.rar DirName
　　
rar请到：http://www.rarsoft.com/download.htm 下载！
解压后请将rar_static拷贝到/usr/bin目录（其他由$PATH环境变量指定的目录也可以）：
[root@www2 tmp]# cp rar_static /usr/bin/rar
```
## .lha

```bash
解压：lha -e FileName.lha
压缩：lha -a FileName.lha FileName
lha请到：http://www.infor.kanazawa-it.ac.jp/~ishii/lhaunix/下载！
>解压后请将lha拷贝到/usr/bin目录（其他由$PATH环境变量指定的目录也可以）：
[root@www2 tmp]# cp lha /usr/bin/
```
## .rpm

```bash
　　解包：rpm2cpio FileName.rpm | cpio -div
```
## .deb

```bash
解包：ar p FileName.deb data.tar.gz | tar zxf -
```
