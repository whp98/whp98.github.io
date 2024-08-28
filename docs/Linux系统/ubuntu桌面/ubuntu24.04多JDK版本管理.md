# ubuntu24.04多JDK版本管理


本文参考 https://blog.csdn.net/NOOBBB/article/details/126758565


```shell
# 先把原来添加的java、javac 删除
update-alternatives --remove-all java
update-alternatives --remove-all javac
```

```shell
vim ~/.bashrc
# 添加如下 
export JAVA_HOME=/usr/local/jdk    ## 这里要注意目录要换成自己解压的jdk 目录
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
```
```shell
# 添加 /usr/local/jdk 的软链接
update-alternatives --install /usr/local/jdk jdk /home/w/.jdks/corretto-1.8.0_422 1000
update-alternatives --install /usr/local/jdk jdk /home/w/.jdks/corretto-17.0.12 1001
```
配置

```shell
update-alternatives --config jdk
```