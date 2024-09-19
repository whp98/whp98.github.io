# Spring 框架接口接收数据报400或415

## 先看400报错

```
HTTP Status 400 – Bad Request
Type Status Report

Message Required XXXDTO parameter 'XXXDTO' is not present

Description The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).

Apache Tomcat/8.0.0
```
大概意思是XXXDTO这个参数没有在参数中出现。

看下接口是怎么写的

```java
@RequestMapping(value = "/getXXXList.action", method = {RequestMethod.POST}, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public xxxResponse<xxxVO> getMainList(@RequestParam XXXDTO XXXDTO) {
        ... ...
```
经过查询知道`@RequestParam`这个注解用于get请求获取参数使用。
而本请求是post请求，并且使用实体入参，如果传参为json字符串那么应该使用的正确的注解是`@RequestBody`,如果入参为表单或json对象的话那么不使用注解即可。

本请求通过浏览器调试查询payload发现是表单post请求，只需要将注解去掉即可。

## 415报错
报错内容
```
HTTP Status 415 – Unsupported Media Type
Type Status Report

Description The origin server is refusing to service the request because the payload is in a format not supported by this method on the target resource.

Apache Tomcat/8.0.0
```

报错后台接口
```java
@RequestMapping(value = "/getDetailList.action", method = {RequestMethod.POST}, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public XXXResponse<XXXDetailVO> getDetailList(@RequestBody XXXDTO XXXDTO) {
        ... ...
```
浏览器请求，payload查看负载,查看源
```
pagex=1&startx=0&limitx=20
```
这个是表单post请求。

和上面的一样只要去掉`@RequestBody`这个注解即可。

同样的如果post请求查看源中是json字符串数据，那么就需要加上这个注解来解析。