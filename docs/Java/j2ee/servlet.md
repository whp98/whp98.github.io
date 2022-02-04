# Servlet
## 介绍
是运行再服务端的小程序，在服务端创建出来，用户可以访问servlet提供的service。
## 和web开发的关系
Servlet可以用来编写动态页面，编写后运行在tomcat等web服务器中，为每个servlet配置好url就可以通过web访问服务了。

## Servlet特性
- 单实例多线程
每个Servlet只会被创建一次。之后每次运行会在自己的线程内访问。
这样的特定减少内存占用，每个用户请求后运行在自己的线程内，用户之间不会互相影响。
同样因为这一点不能再Servlet中创建可以修改的变量不然可能会遇到线程安全问题。

-  懒加载
这样会加快启动速度。减少启动的时候内存占用。
在第一次访问的时候会创建实例(调用init方法)，应用结束的时候会调用destrory方法。
当然可以在web.xml中配置load-on-startup在服务器启动时候加载。
## 方法init
这个方法中会有包含一个ServletConfig参数，servletConfig包含几个方法，可以使用这些方法获取参数和Servlet的名称。参数和Servlet名称都是再web.xml中配置的。

## 方法getServletContext
每个web服务器中可能会有多个应用,每个应用都只有一个servletContext对象，被应用中的其他servletcontext共享。
- tomcat
  - app1
    - servlet1
    - servlet2
  - app2
    - servlet1
    - servlet2

上面中app1和app2分别存在一个servletcontext对象。
获取ServletContext需要使用ServletConfig对象。

可以在ServletContext中设置应用参数。这样整个app都可访问到。

## Servletcontext对象（Application）
- contextPath
项目路径
- getRealPath
获取class的路径
- getInitParameter
获取应用的初始化数据。
- setAttribute
向servletContext中添加属性
- removeAttribute
删除属性
- getAttribute
获取属性的Object对象

