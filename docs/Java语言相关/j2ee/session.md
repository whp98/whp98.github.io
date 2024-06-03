# Session

session和cookie都是用来表示http会话的技术，区别如下
- cookie存储在客户端
- session存储在服务端可以用来提高安全性

## javaEE中的session
### 存储session
```java
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class Session01 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        /*获取session*/
        HttpSession session = req.getSession();
        /*将name存储到session中*/
        session.setAttribute("name","haha");
        System.out.println("session存储完毕");
    }
}
```
### 读取session
```java
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;

public class Session02 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession httpSession = req.getSession();
        String s = (String) httpSession.getAttribute("name");
        PrintWriter writer = resp.getWriter();
        writer.println(s);
    }
}
```

服务器会为每个浏览器创建一个session对象。

## session的工作原理
服务器是怎样识别每个会话并找到对应的session对象的。
服务器使用map存储session对象，每次生成session会使用32位随机16进制串作为key，
并将session对象引用放入map中作为value，然后将key作为JSESSIONID作为cookie发送給浏览器，下次请求的时候浏览器会携带这个cookie，服务器就会根据这个key找到对应的session对象。

f12查看下http的请求头可以看到如下的请求头：
```
Cookie: JSESSIONID=D021BDDB61941784692366844FC22992
```

## 设置session的失效时间

web.xml中设置全局的失效时间,单位是分钟，默认超时时间是30分钟，下面的设置了60分钟。
```xml
<session-config>
        <session-timeout>60</session-timeout>
    </session-config>
```
主动让session失效。
```java
public class Session03 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession();
        /*主动让session失效*/
        session.invalidate();
    }
}
```

## session的缺点
- 占用服务器资源，如果请求过多会创建很多session这样的话会让服务器并发遇到瓶颈无法承受更多的请求
- 集群的时候有同步问题，如果多台服务器部署，服务器之间的session需要同步
- JSESSIONID可能会被用户伪造

## 优点
- 使用方便，单服务器情况下直接使用即可
- 安全性比cookie高

## 案例使用session实现购物车

## 展示主界面
```java
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class MainBookCart extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        /*展示全部书籍*/
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter printWriter = resp.getWriter();
        printWriter.write("<h1>全部书</h1><br/>");
        DBMock dbMock = new DBMock();
        List<BookEntity> bookEntityList = dbMock.getAll();
        bookEntityList.stream().forEach(bookEntity -> {
            printWriter.write(bookEntity.getName() + "&nbsp;" + "<a href='" + req.getContextPath() + "/book" + "/add" + "?id="
                    + bookEntity.getId() + "'>添加</a>" + "<br/>");
        });
        printWriter.write("</br><a href='" + req.getContextPath() + "/book" + "/clear" + "'>清空购物车</a><br/>");
        printWriter.write("<a href='" + req.getContextPath() + "/book" + "/showCart" + "'>查看购物车</a><br/>");
    }
}
```
展示效果
```
全部书

穷爸爸，富爸爸 添加
我的奋斗 添加
毛泽东传 添加

清空购物车
查看购物车
```
### 添加购物车
```java
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;

public class AddCart extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        /*图书id*/
        resp.setContentType("text/html;charset=utf-8");
        String id = req.getParameter("id");
        HttpSession httpSession = req.getSession();
        if (httpSession.isNew() || httpSession.getAttribute("cart") == null) {
            httpSession.setAttribute("cart", new HashMap<String, Integer>());
        }
        HashMap<String, Integer> stringIntegerHashMap = (HashMap<String, Integer>) httpSession.getAttribute("cart");
        stringIntegerHashMap.merge(id, 1, Integer::sum);
        resp.getWriter().write("<h1>添加完成</h1>");
        resp.setHeader("Refresh", "0.5; url=" + req.getContextPath() + "/book");
    }
}
```
展示效果
```
添加完成
```
### 清空购物车
```java
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class ClearCart extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getSession().setAttribute("cart", null);
        resp.setContentType("text/html;charset=utf-8");
        resp.getWriter().write("ok");
        resp.setHeader("Refresh", "0.5; url=" + req.getContextPath() + "/book");
    }
}
```
## 展示购物车
```java
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class ShowCart extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html;charset=utf-8");
        HashMap<String, Integer> stringIntegerHashMap = (HashMap<String, Integer>) req.getSession().getAttribute("cart");
        if (stringIntegerHashMap == null) {
            resp.getWriter().write("<h1>购物车为空</h1>");
        }
        Set<Map.Entry<String, Integer>> entrySet = stringIntegerHashMap.entrySet();
        PrintWriter printWriter = resp.getWriter();
        DBMock dbMock = new DBMock();
        entrySet.forEach(stringIntegerEntry ->
                printWriter.write(
                        dbMock.getOneBook(stringIntegerEntry.getKey()).getName()
                                + " X " + stringIntegerEntry.getValue() + "<br/>"));
    }
}
```
展示效果
```
穷爸爸，富爸爸 X 1
我的奋斗 X 1
```



本文结束。