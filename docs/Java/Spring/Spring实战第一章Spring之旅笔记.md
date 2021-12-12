---
title: Spring实战第一章Spring之旅笔记
tags:
  - Spring
  - Spring实战
abbrlink: 5a27
date: 2020-04-29 14:31:58
---

Spring的两个核心特性是，依赖注入（dependency injection，DI）和面向切片编程（aspect-oriented programming，AOP）

Spring提供了轻量级和简单的编程模型来替代重量级的企业级Java技术，它增强了简单老式的Java对象（Plain Old Java Object， POJO），

让其具备了之前之后（Enterprise JavaBean，EJB）才有的的功能。

Spring最早由Rod Johnson创建，是为了简化Java开发，降低企业开发的复杂性而创建的，对于这个目标Spring采用四种关键策略：

- 基于POJO的轻量级和面向接口的最小侵入式编程；
- 通过依赖注入和面向接口实现松耦合；
- 基于切面和管理进行声明式编程；
- 通过切面和模板减少样式代码

Spring尽量避免自身的API影响到你的代码，不会强制你继承Spring类或者实现某个Spring接口，因为以上的操作会导致你的代码和框架绑死。

Spring最坏的情况乱下是你的代码中发使用了Spring注解，但你的代码依然是POJO，通过下面例子说明Spring的Bean的普通和不易察觉。

```java
public class HelloWorldBean{
    public String sayHello(){
        return "Hello";
    }
}
```
上面的例子就是一个POJO，你看不出它是一个Spring组件，这就是Spring非侵入式编程的特点，这意味着无论是Spring应用和非Spring应用都能，发挥同样的作用。 上面的Bean看上去很简单，Spring可以让POJO具有强大的功能，Spring发挥作用的方式就是通过DI来装配Bean。

## 依赖注入

依赖注入是一个听上去高大上的词汇，DI已经演变成为一系列复杂的编程技巧和设计模式理念，在项目中使用依赖注入将会使项目的代码变得简单和容易理解和测试。

依赖注是如何实现的呢

### 解决高度的耦合性

正常情况下，一个有实际意义的类，会有几个互相协作的类组成，每一个对象会负责管理和自己协作的对象的引用，这导致高度的耦合，并且难以测试。


