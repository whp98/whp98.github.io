# maven打包命令

## 1. maven打包的指令，跳过测试
```shell
mvn clean install package -Dmaven.test.skip=true
```

## 2. maven打包指定setting.xml 

```shell
mvn clean install package -Dmaven.test.skip=true -B -DskipTests --settings ./settings.xml
```

## 3.更多其他参数说明

https://blog.csdn.net/wangjunjun2008/article/details/18982089