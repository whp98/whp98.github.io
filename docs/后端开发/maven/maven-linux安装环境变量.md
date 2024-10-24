# maven-linux安装配置环境变量并查看版本信息

## 编辑`vim ~/.bashrc`

```shell
vim ~/.bashrc
# 输入以下内容
export MAVEN_HOME=/opt/apache-maven-3.6.3
export PATH=$PATH:$MAVEN_HOME/bin
source ~/.bashrc
## 查看路径
which mvn
```

## 查看版本信息

```shell
mvn -v
```

## 查看生效的设置

```shell
mvn help:effective-settings
```