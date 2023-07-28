## 使用Maven下载源代码

1. 使用maven命令行下载依赖的源代码

```
mvn dependency:resolve -Dclassifier=sources
```

2. 使用idea Maven选项卡刷新源码的按钮

再次定位到依赖项目的源代码发现已经可以看到注释了不再是反编译的内容了。