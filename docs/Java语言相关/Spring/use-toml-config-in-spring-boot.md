# 在Spring Boot项目中使用Toml配置文件

接触过rust和python之后我发现了toml配置文件，发现很整洁没有缩进的严格要求很好用，
然后我查了下Spring Boot官方并没有提供toml配置文件支持。
我再网上找了一个项目[spring-boot-starter-toml](https://github.com/ladutsko/spring-boot-starter-toml)
这个项目实现了toml的支持，不过其依赖的toml版本有点老了，于是我就找了toml官方项目做一个自己的toml起步依赖。


## toml官网和对应的java项目

[官网](https://toml.io/cn)

[tomlj项目](https://github.com/tomlj/tomlj)

## 我自己的实现

[tomlj-spring-boot-starter](https://github.com/whp98/tomlj-spring-boot-starter)

我的主要工作是编写了解析toml代码的部分,
并且基本上测试了toml所有数据类型和数据结构,
有两个case注入不到spring框架中其他都可以，
考虑到spring配置文件基本不会出现这种类型的配置，
我就没有做深入处理。
## 如何使用
### 将我的起步依赖添加到Spring Boot项目中
中央仓库 [sonatype](https://s01.oss.sonatype.org/#nexus-search;quick~tomlj-spring-boot-starter)
jitpack库 [jitpack](https://jitpack.io/#whp98/tomlj-spring-boot-starter/)

下面是1.1.6版本，最新的请访问上面的链接
```xml
	<repositories>
		<repository>
		    <id>jitpack.io</id>
		    <url>https://jitpack.io</url>
		</repository>
	</repositories>
```
```xml
	<dependency>
	    <groupId>com.github.whp98</groupId>
	    <artifactId>tomlj-spring-boot-starter</artifactId>
	    <version>v1.1.6</version>
	</dependency>
```

### 迁移到toml配置文件
在网上找个[yaml转toml转换器](https://www.convertsimple.com/convert-yaml-to-toml/).
然后使用把原先的配置文件转换下即可。

实测项目可以完美迁移。
