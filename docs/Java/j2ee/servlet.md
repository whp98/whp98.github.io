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

## 欢迎页面设置
在web.xml中可以配置一个欢迎页面列表`<welcome-file-list>`，tomcat服务器会依次查找`<welcome-file>`。
不设置欢迎页面系统会默认index.html为欢迎页面，这算是一个约定。

```xml
<welcome-file-list>
        <welcome-file>index.html</welcome-file>
</welcome-file-list>
```

## 可以使用更加简单的Generic Servlet类来实现Servlet
```java
public class SimpleServlet extends GenericServlet {
    /**
     * 更加简单的匹配服务
     * 只需要实现一个方法
     */
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("hello generic service");
    }
}
```

## HttpServlet 
这个类方便操作各种http请求，对于http请求的get post put delete 支持比较好。
如果需要支持某种http请求就重写对应的方法，如果没有重写对应的方法就会
报method not allowed 错误，默认的方法返回都是不允许的。
这个类会通过请求类型将不同请求分发到不同的方法来处理。


## HttpServletRequest 
服务器将请求封装成这个对象。
每次请求只有一个对象，生命周期较为短暂，当程序拿到这个对象的时候其生命周期就已经结束了。
封装了请求的参数，可以获取用户请求的参数。

## 数据返回实操
```java
/**
 * 继承HttpServlet可以处理get和post请求
 */
public class HttpServlet01 extends HttpServlet {
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        System.out.println(req.getParameter("username"));
        System.out.println("post");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html; charset=UTF-8");
        PrintWriter printWriter = resp.getWriter();
        printWriter.println(req.getParameter("username"));
        printWriter.println(req.getParameter("passwd"));
    }


    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println(req.getParameter("username"));
        System.out.println("get");
    }
}
```