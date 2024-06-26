# Java设计模式

设计模式就是前辈开发者在遇到一些类型的问题给出的解决方案。
有助于我们解决问题。

## 装饰者设计模式
装饰着模式适用于对某个对象进行装饰，这个类并不改变原类，只是在已经有原来的类的基础上对原来的类进行增强。
JDK中很多类都使用了装饰着模式，比如BufferedInputStream，这个类传入了FileInputStream,不改变原来的类的基础上为文件的读取加上了缓存，可以说是比较好的参考。

装饰者设计模式代码示例。
```java
/**
 * 在不修改原来的类实现装饰者设计模式优点：
 * 代码耦合度低
 * 在不修改原来代码的基础上对原来的功能升级
 */
/*自动驾驶汽车的装饰者设计模式案例*/
public class DecoratorPattern {
    public static void main(String[] args) {
        /**
         * 我有一辆汽车
         */
        Car car = new Car();
        /**
         * 我为汽车安装了自动驾驶套件
         */
        AutoPilotCar autoPilotCar = new AutoPilotCar(car);
        /**
         * 安装了自动驾驶的汽车更加好用了，只要输入地址就可以了
         */
        autoPilotCar.goSomeWere("天安门");
    }
}

/**
 * 一辆普通汽车
 * 包含基础的操作可以加速转弯等
 */
class Car {
    /**
     * 左转
     */
    void turnLeft() {

    }

    /**
     * 右转
     */
    void turnRight() {

    }

    /**
     * 加速
     */
    void speedUp() {

    }

    /**
     * 减速
     */
    void speedDown() {

    }

    /**
     * 拍照等
     *
     * @return 图片路径
     */
    String takePicture() {
        return "pic";
    }
}

/**
 * 自动驾驶汽车
 */
class AutoPilotCar {
    Car car;

    /**
     * 自动驾驶汽车需要在普通汽车基础上产生
     *
     * @param car
     */
    AutoPilotCar(Car car) {
        this.car = car;
    }

    /**
     * 自动驾驶到某地
     *
     * @param dest 目的地
     */
    void goSomeWere(String dest) {
        /*自动驾驶的逻辑*/
        /*自动调用普通汽车的逻辑*/
    }
}
```

### 单例设计模式
保证软件运行过程中，特定类在内存中只有一个对象。
代码示例
饿汉式
```java
/*
 * 饿汉式加载模式，无论用不用都会创建一个对象
 * 1.构造方法私有化
 * 2.在类内部创建一个对象
 * 3.对象暴露给外部
 * */
public class SingletonTest01 {
    public static void main(String[] args) {
        Singleton singleton1 = Singleton.getInstence();
        Singleton singleton2 = Singleton.getInstence();
        System.out.println(singleton1 == singleton2);
    }
}

class Singleton {
    /*防止在类外部创建类的对象*/
    private Singleton() {

    }

    private static final Singleton s = new Singleton();

    public static Singleton getInstence() {
        return s;
    }
}
```
单例的延迟加载模式(懒汉式)
```java
/**
 * 懒汉式 用的时候才创建单例对象
 */
public class SingletonTest02 {
    public static void main(String[] args) {
        Singleton1 singleton1 = Singleton1.getInstance();
        Singleton1 singleton2 = Singleton1.getInstance();
        System.out.println(singleton2 == singleton1);
    }
}

class Singleton1 {
    private Singleton1() {

    }

    /*保证修改后多线程可以见*/
    private volatile static Singleton1 singleton1 = null;

    /*对外部获取对象提供同步的方法*/
    /*多线程同时访问创建语句可能会创建多个对象*/
    public synchronized static Singleton1 getInstance() {
        if (singleton1 == null) {
            singleton1 = new Singleton1();
            return singleton1;
        }
        return singleton1;
    }
}
```
## 适配器设计模式
适配器设计模式：
一种让两个接口互相兼容的一种设计模式，可以参考电源适配器，手机想要充电但是，必须使用电源适配器将接口转换成手机能使用的电压和电流。

用GenericServlet举例
这个类是一个简单使用Servlet的适配器，这个类可以满足只重写一个方法就能
实现一个Servlet。
GenericServlet内部实现了Servlet的一些方法，并且巧妙的设计暴露出来的方法，
让使用变得更加简单。
继承此抽象类只需要重写service方法，如果想要重写init可以重写GenericServlet的无参init构造方法。而不需要重写Servlet的有参构造方法。

## 观察者设计模式

路上有个老奶奶摔倒了，这时候可能有三个人正在看这一过程，三个人可能会做出不同的反应，这就是观察者设计模式的实例。

观察者是一种一对多的关系。

### Java实现观察者设计模式

观察者接口定义如下：
```java
/**
 * 观察者设计模式-观察者接口
 */
public interface Observer {
    /**
     * 在接收到通知后进行响应的处理
     */
    void handleNotify(String message);
}

```
被观察者接口设计如下：
```java
/**
 * 被观察者
 */
public interface ToBeObserver {
    /**
     * 添加观察者
     * */
    void addObserver(Observer observer);

    /**
     * 删除观察者
     * */
    void removeObserver(Observer observer);

    /**
     * 通知观察者
     * */
    void notifyObserver(String message);
}

```
观察者1，观察者2，代码如下
```java
import xyz.intellij.playground.basic.designmodel.observer.Observer;

public class ObserverA implements Observer {
    @Override
    public void handleNotify(String message) {
        System.out.println("A收到了信息:"+message);
        System.out.println("A逃跑了");
    }
}
```
```java
import xyz.intellij.playground.basic.designmodel.observer.Observer;

public class ObserverB implements Observer {
    @Override
    public void handleNotify(String message) {
        System.out.println("B收到了信息:" + message);
        System.out.println("B上前帮助");
    }
}

```
被观察者如下
```java
import java.util.ArrayList;
import java.util.List;

/**
 * 被观察的老人
 */
public class OldMan implements ToBeObserver {
    /**
     * 观察者集合
     */
    private List<Observer> observers;

    /**增加观察者*/
    @Override
    public void addObserver(Observer observer) {
        if (null == observers) {
            observers = new ArrayList<>();
            observers.add(observer);
        } else {
            observers.add(observer);
        }
    }

    /**删除观察者*/
    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }
    /**通知观察者*/
    @Override
    public void notifyObserver(String message) {
        observers.forEach(observer -> observer.handleNotify(message));
    }
}
```

测试类
```java
import xyz.intellij.playground.basic.designmodel.observer.impl.ObserverA;
import xyz.intellij.playground.basic.designmodel.observer.impl.ObserverB;
import xyz.intellij.playground.basic.designmodel.observer.impl.OldMan;

public class ObserverTest {
    public static void main(String[] args) {
        /*老人*/
        OldMan oldMan = new OldMan();
        /*观察者1*/
        ObserverA observerA = new ObserverA();
        /*观察者2*/
        ObserverB observerB = new ObserverB();
        oldMan.addObserver(observerA);
        oldMan.addObserver(observerB);
        oldMan.notifyObserver("老人摔倒了");
        oldMan.removeObserver(observerA);
        oldMan.notifyObserver("老人起来了");
    }
}
```
测试输出如下
```
A收到了信息:老人摔倒了
A逃跑了
B收到了信息:老人摔倒了
B上前帮助
B收到了信息:老人起来了
B上前帮助
```