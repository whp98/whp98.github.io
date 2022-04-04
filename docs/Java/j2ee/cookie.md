# Cookie

http协议是无状态的，你访问了一个网站第二次访问请求是一样的http本身不会记录状态。
当数据传输完成连接断开，http就结束了此时无法再次向请求端发送数据。
那么登录网站之后登录状态时如何保存的呢，这时候cookie的作用就显现出来了，用户登录完成后服务端会设置cookie并返回给浏览器，此时浏览器会将cookie保存在电脑上，第二次请求的时候cookie会被带上发送到服务器，服务器即可获取当前登录的用户。
cookie可以用来保存用户登录的状态等信息。

cookie不是java特有的，所有的web开发都要用到，cookie的结构类似于map是一个键值对结构。
## 查看cookie
浏览器->开发者工具->应用程序->存储->cookie

不同域之间的cookie是不能共享的，可以保护数据安全。

## 持久化
Chrome通过Sql lite存储cookie数据，其他浏览器可能会通过其他方式存储cookie，
总之浏览器负责存储cookie。

## 阻止cookie

浏览器 可以设置阻止第三方网站的cookie，设置之后可能会导致cookie支持的功能失效。

## cookie注意事项
- cookie是会话层的用户退出浏览器后cookie会被删除
- 浏览器 会对cookie的总数有限制，总300个，每个网站20个，每个cookie最大4kB
- cookie可以设置有效时间`maxAge`将这个值设置为0则表示浏览器会删除

## j2ee中的cookie技术
java中设置cookie的代码示例
```java
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/*Cookie的默认绑定路径*/
public class Cookie01 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        /*第一个参数类似map的key，第二个类似value,不能存放中文*/
        Cookie cookie1 = new Cookie("userName","haha");
        Cookie cookie2 = new Cookie("userId","001");
        resp.addCookie(cookie1);
        resp.addCookie(cookie2);
    }
}
```
上面的代码中没有设置过期时间，默认的有效时间是会话，也就是这个浏览器页面被关闭这个Cookie也就不过期了。
上面的代码中没有设置path，默认的path是设置cookie的请求的上一级，

## cookie请求头的携带原理
比如设置的url是 `/app/cookie/cookie01`则此时的path是`/app/cookie`。
当url中包含cookie的path的时候才会将cookie的信息带入请求头。

## 设置path
那么如何设置path呢。下面的代码设置了cookie可以作为参考。

```java
public class Cookie01 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        /*第一个参数类似map的key，第二个类似value,不能存放中文*/
        Cookie cookie1 = new Cookie("userName","haha");
        Cookie cookie2 = new Cookie("userId","001");
        /*手动设置cookie的绑定路径*/
        String contextPath  = req.getContextPath();
        cookie1.setPath(contextPath+"/aaa");
        cookie2.setPath(contextPath+"/bbb");
        resp.addCookie(cookie1);
        resp.addCookie(cookie2);
    }
}
```
浏览器的响应头中包含了设置cookie的响应头。
```text
Set-Cookie: userName=haha; Path=/JavaWeb_war_exploded/aaa
Set-Cookie: userId=001; Path=/JavaWeb_war_exploded/bbb
```
此时访问`http://localhost:8964/JavaWeb_war_exploded/aaa`，或`http://localhost:8964/JavaWeb_war_exploded/bbb`,
就会发现请求头中携带的cookie信息。

## 设置cookie的有效时间。

```java
/*设置Cookie的失效时间,单位是秒*/
        cookie1.setMaxAge(60*60)/*一小时*/;
        cookie2.setMaxAge(60*60*24)/*一天*/;
```
设置之后可以看到浏览器cookie会显示过期时间为具体的时间而不是会话。

可以看到响应头中包含失效时间的信息。
```text
Set-Cookie: userName=haha; Max-Age=3600; Expires=Mon, 04-Apr-2022 12:11:41 GMT; Path=/JavaWeb_war_exploded/aaa
Set-Cookie: userId=001; Max-Age=86400; Expires=Tue, 05-Apr-2022 11:11:41 GMT; Path=/JavaWeb_war_exploded/bbb
```
## 接受Cookie

下面的java代码想你展示了如何接受cookie
```java
public class CookieReceive extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        Cookie[] cookies = req.getCookies();
        for (Cookie cookie:cookies){
            System.out.println("name="+cookie.getName());
            System.out.println("value="+cookie.getValue());
            System.out.println("maxAge="+cookie.getMaxAge());
        }
    }
}
```
此时访问url控制台打印
```text
name=userName
value=haha
maxAge=-1
```
## 应用案例
### 1.实现显示上次系统登录时间的功能
实现思路
用户访问url后记录当前时间将时间放入cookie发送给用户浏览器，用户第二次访问的时候，尝试获取上次登录时间的cookie。获取到之后就直接将这个cookie的时间更新，并返回上次登录时间。

### 2.实现免登录
免登录实现原理。
第一次登录用户将自己的用户名和密码等输入登录时候判断用户是否勾选免登录选项，如果勾选了就将代表用户信息的内容放入cookie中用户下次访问次url的时候直接判断是否包含cookie，如果不包含就展示登录页面，如果包含则校验用户信息，如果正确就提示用户登录成功。