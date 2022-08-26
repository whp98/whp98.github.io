# JSP

## 基本理解
一个jsp就是一个servlet，目的是为了简化动态网站的开发，可以将java代码和html代码混
合在一起开发，提高效率。

## 第一个JSP
首先web项目引入jsp的api-jar
```xml
<dependencies>
        <!-- https://mvnrepository.com/artifact/javax.servlet/servlet-api -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>servlet-api</artifactId>
            <version>2.5</version>
            <scope>provided</scope>
        </dependency>
        <!-- https://mvnrepository.com/artifact/javax.servlet/jsp-api -->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>jsp-api</artifactId>
            <version>2.0</version>
            <scope>provided</scope>
        </dependency>
    </dependencies>
```

然后编写第一个jsp文件，然后就可以把访问这个页面了。
文件
```html
<%@ page import="java.util.Date" %><%--
  Created by IntelliJ IDEA.
  User: w
  Date: 2022/4/6
  Time: 12:10
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>First Page</title>
</head>
<body>
<% Date date = new Date();%>
<% out.write("服务器时间"); %>
<% out.write(date.toLocaleString()); %>
</body>
</html>
```

显示结果
```text
服务器时间 2022年4月6日 下午7:10:35
```


## JSP的基本原理


tomcat里面有一个work，里面有临时文件，对于idea来说会在一个特殊的地方，比如我的在
```text
C:\Users\www\AppData\Local\JetBrains\IntelliJIdea2021.3\tomcat\2ba1a2bb-d42b-493f-8b8d-a10a6d38e665\work\Catalina\localhost\JavaWeb_war_exploded\org\apache\jsp
```
里面可以看到两个文件
```text
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----          2022/4/6     12:24           5669 first_jsp.class
-a----          2022/4/6     12:24           5170 first_jsp.java
```
这不就是java吗？这个名字和我的jsp名字相同。
原来jsp引擎会在页面第一次访问的时候将页面编译成java。
jsp会继承HttpJspBase而HttpJspBase又继承了Servlet，所以可以称jsp就是一个servlet。

当然这个过程也省略了配置web.xml的过程。

## 语法规则
支持html注释`<!-- 注释内容 -->`好处是html中可以看到。
支持jsp注释`<%-- 注释内容 --%>`

`<% %>`中不能出现
- 声明变量不能添加访问权限修饰符
- 不能定义方法
- 不能添加静态代码语句块
原因时jsp中的内容会被放到一个文件中。

如果想要定义方法需要将方法定义代码放在`<%! %>`中。
直接输出的内容可以直接放在`<%=%>`中，等号后面的内容会被直接放在out.write()中。

## 九大内置对象
PageContext  页面上下文
request
session 和servlet一样
application 应用程序
response
config 
out 和printWriter类似继承了io的Writer
page 就是this对象
exception 

## JSP指令
JSP指令可以开启关闭session（session=true）
还有exception对象 （isErrorPage=true）
还可以使用include指令静态引入其他界面（变量不能重复）。
可以指定错误处理界面 errorPage=/error.jsp来指定专门应该处理错误的页面。

## EL表达式
全称表达式语言。
会自动进行类型转换。
以“${”开始，以“}”作为结束：
总结来说和js使用很像。
表达错误的时候并不会报错。
可以使用运算符。
el表达式中可以使用一些内置对象。
可以自定义一些el函数（tld文件放在web-inf下）。

## JSTL标签
JSTL标签类似一个类库包含了很多常用的工具类。
可以引入jsp文件中使用。
类似于前端开发的lodash。
