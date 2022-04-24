# gluon编译native应用

## 本人参考文档

[简书 GraalVM将JavaFX程序编译成windows下直接执行的exe](https://www.jianshu.com/p/43957dc13a6a)

[gluon 官网文档](https://docs.gluonhq.com/#platforms_windows)

[Fxml项目参考](https://blog.csdn.net/wangpaiblog/article/details/122850438)

## 1. 安装工具

visual studio 2020 社区版

安装英文语言包
安装C++桌面开发
安装win10sdk
安装windows 通用crt

## 2.配置好mvn设置阿里源
请自行处理。
## 3.运行命令
在同一窗口执行
设置编译环境
```ps
CMD /K "C:\Program Files\Microsoft Visual Studio\2022\Community\VC\Auxiliary\Build\vcvars64.bat"
```
进入官方demo目录

```ps
 cd E:\MY_CODE\Java_project\v2getJ\gluon-samples\HelloFX
```

执行mvn构建

```ps
mvn clean gluonfx:build
```
查看编译产物

```ps
cd target\gluonfx\x86_64-windows
dir
```

编译fxml项目多些配置而已，但是步骤差不多。
