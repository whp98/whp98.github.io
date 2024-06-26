# 多线程

## 进程
打开Windows任务管理器可以看到的列表就是进程列表，每一个程序至少会启动一个进程。
进程和进程之间的内存是独立的，不会共享内存。
进程和进程之间内存独立，可以提高稳定性和安全行。

## 线程
一个线程是一个进程中的执行场景，每个进程可以开启多个线程。
下载软件中多个下载任务同时进行，但是可以看到下载软件进程并没有创建出和下载数目相同的进程。
这时候下载软件内的软件就是多线程进行的。
执行期间CPU并不是同时执行，而是进行快速的在线程之间切换，这个就是CPU时分复用。
多线程代码的主要作用就是提高CPU的使用率。
多线程减少了CPU空闲的时间，并不是增加了程序执行的速度。
对于比较耗时的任务开启多线程可以减少CPU等待的时间。可以让CPU去执行不在等待的代码。

多线程场景：同时下载N个文件。和N个人同时开视频会议。等。

## 并行和并发
并行是两个任务同一时刻都在执行，需要CPU有多核支持。
并发是指两个或以上任务在同一时间段内同时发生，CPU在这一段时间内在多个任务之间切换，看上去似乎是两个任务都在执行了。

## 多线程的的缺点
1. 设计比较复杂，共享堆内存和芳芳去，多个线程同时执行的时候数据共享处理等处理步骤比较复杂
2. 增加资源消耗，多线程栈内存是不会共享的，开启多线程会有更多的资源消耗
3. 多线程的开启需要有平衡点，并不是线程被越多越好，线程数量超过了本应设计的数量反而会让程序效率下降。(超过了机器本身的极限)

## 使用Java创建线程
在Java中创建线程有3中方式。
### 继承Thread类
```java
/**
 * 1.创建类，继承java.lang.Thread
 * 2.重写run方法,将要在线程中执行的代码写在run中
 * 3.创建自定义类的对象
 * 4.调用start方法开启线程
 */
public class ThreadTest01 {
    public static void main(String[] args) throws InterruptedException {
        /*创建线程对象*/
        MyThread01 myThread01 = new MyThread01();
        /*启动线程*/
        myThread01.start();
        for (int i = 0; i < 1000; i++) {
            System.out.print("nihao ");
        }
    }
}
class MyThread01 extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 1000; i++) {
            System.out.print("hello ");
        }
        System.out.println();
    }
}
```
### 实现Runnable接口
```java
/**
 * 利用Runnable接口开启多线程
 * 1.自定义类实现java.lang.Runnable
 * 2.覆盖run方法，将多线程代码写在方法内
 * 3.创建Thread对象并将自定义类的对象作为构造函数的方法
 * 4.调用Thread对象的start方法开启线程
 */
public class ThreadTest02 {
    public static void main(String[] args) {
        Thread thread = new Thread(new MyThread02());
        thread.start();
        for (int i = 0; i < 1000; i++) {
            System.out.println("mainThread");
        }
    }
}

class MyThread02 implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 1000; i++) {
            System.out.println("myThread");
        }
    }
}
```
### 显示Callable接口
```java
import java.util.concurrent.*;

/**
 * 实现Callable来开启多线程
 * 1.实现Callable接口
 * 2.重写Call方法,将多线程代码写在方法中
 * 3.创建ExecutorService线程池
 * 4.将自定义类的对象放入线程池
 * 5.获取返回值
 * 6.关闭线程池，不接受新的线程，未执行完毕的线程不会被关闭
 */
public class ThreadTest03 {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        /*创建线程池*/
        /*线程池的作用:
        * 1.减少创建线程的时间，减少线程的资源消耗
        * 2.需要线程时候可以直接从池中取出
        * 3.减少了销毁线程浪费的资源
        * */
        /*参数是线程池的容量*/
        //ExecutorService executorService = Executors.newFixedThreadPool(2);
        /*这个线程池大小不固定，需要注意这个使用起来可能会导致线程过多引起系统耗费资源过大*/
        ExecutorService executorService = Executors.newCachedThreadPool();
        /*将自定义的Callable类的对象放入线程池*/
        Future<Integer> future = executorService.submit(new MyThread03(0));
        Future<Integer> future1 = executorService.submit(new MyThread03(1));
        /*获取结果*/
        /*判断任务是否执行完毕*/
        if(future.isDone()){
            System.out.println(future.get());
        }else{
            System.out.println("线程还没执行完毕");
        }
        if (future1.isDone()){
            System.out.println(future1.get());
        }else{
            System.out.println("线程还没执行完毕");
        }
        /*关闭线程池*/
        executorService.shutdown();
    }
}
/**
 * 计算阶乘代码
 */
class MyThread03 implements Callable<Integer> {
    Integer integer = 0;

    MyThread03(Integer integer) {
        this.integer = integer;
    }

    /*重写Call方法*/
    @Override
    public Integer call() throws Exception {
        int ans = 1;
        if (this.integer == 0) {
            return ans;
        } else if (this.integer < 0) {
            return null;
        } else {
            while (this.integer != 0) {
                ans *= this.integer;
                this.integer--;
            }
            return ans;
        }
    }
}
```
### 以上三种方法对比
1. 第一种调用各种方法就比较方便，但是java不能多继承，想要继承其他类就不行了。
2. 可以实现多种接口，也保留了继承功能，缺点:在run方法内部需要获取到线程的Thread对象才能使用Thread中的方法
3. 可以获取返回值，但是代码编写太复杂了

### 使用匿名内部类创建线程
```java
import java.util.concurrent.*;

/**
 * 使用匿名内部类创建线程
 */
public class ThreadTest04 {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        //Thread
        new Thread() {
            @Override
            public void run() {
                System.out.println("sdadadsasd");
            }
        }.start();

        //Runnable
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("sdadasdasdasd");
            }
        }).start();
        //Callable
        ExecutorService executorService = Executors.newCachedThreadPool();
        Future<Integer> future = executorService.submit(new Callable<Integer>() {
            @Override
            public Integer call() throws Exception {
                return 99;
            }
        });
        System.out.println(future.get());
        executorService.shutdown();
    }
}
```
##  线程操作

### 设置线程的名字的几种方式
```java
/**
 * 设置和获取线程的名字
 */
public class ThreadTest05 {
    public static void main(String[] args) {
        extracted();
        extracted1();
        extracted2();
    }

    private static void extracted2() {
        Thread thread = new Thread(){
            @Override
            public void run() {
                System.out.println("我是"+this.getName());
                System.out.println("hh");
            }
        };
        thread.start();
        /*thread.setName("haha");*/
    }

    private static void extracted1() {
        new Thread(){
            @Override
            /*
              可以在代码内设置线程名字
             */
            public void run() {
                this.setName("haHah");
                System.out.println("线程名字"+this.getName());
            }
        }.start();
    }

    private static void extracted() {
        new Thread("妈妈们"){
            @Override
            public void run() {
                System.out.println("我是:"+this.getName()+" 线程");
            }
        }.start();
        new Thread("妈妈们1"){
            @Override
            public void run() {
                System.out.println("我是:"+this.getName()+" 线程");
            }
        }.start();
    }
}
```
### 获取当前线程
```java
/**
 * 获取当前线程的对象,在任何一个线程都可以使用
 */
public class ThreadTest06 {
    public static void main(String[] args) {
        Thread thread = Thread.currentThread();
        System.out.println(thread.getName());
    }
}

```
### 让线程暂停的方法
```java
/**
 * Thread 的 sleep方法
 */
public class ThreadTest07 {
    public static void main(String[] args) throws InterruptedException {
        for (int i = 10; i > 0; i--) {
            System.out.println("倒计时:"+i);
            Thread.sleep(1000L);
        }
    }
}
```
### 利用Sleep实现交替打印AB
```java
/**
 * 控制台实现交替打印
 */
public class ThreadTest08 {
    public static void main(String[] args) {
        Thread thread = new Thread("线程1") {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println("A");
                    try {
                        Thread.sleep(100L);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        Thread thread1 = new Thread("线程2") {
            @Override
            public void run() {
                for (int i = 0; i < 10; i++) {
                    System.out.println("B");
                    try {
                        Thread.sleep(100L); /* 休息100ms */
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        thread.start();
        thread1.start();
    }
}
```
### 设置线程的优先级
```java
/**
 * 设置进程的优先级
 * 取值范围是整数的 1~10
 * 两个还是会交替执行，只是优先级高的进程获得的cpu时间片比较长
 */
public class ThreadPriority {
    public static void main(String[] args) {
        Thread thread  = new Thread("1"){
            @Override
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    System.out.println("线程1");
                }
            }
        };
        Thread thread1 = new Thread("2"){
            @Override
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    System.out.println("线程2");
                }
            }
        };
        thread.setPriority(1);
        thread1.setPriority(10);
        thread.start();
        thread1.start();
    }
}
```
### 线程的礼让
```java
/**
 * Thread礼让
 * 当线程遇到xx线程的时候将当前线程暂停，执行其他线程，执行完毕之后在执行本线程。
 * 代码执行会切换到其他线程，是礼让的行为。
 */
public class ThreadTest10 {
    public static void main(String[] args) {
        Thread t1 = new Thread("t1") {
            @Override
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    System.out.println("私家车");
                    if (i % 2 == 0) {
                        /*去执行其他线程*/
                        System.out.println("礼让");
                        Thread.yield();
                    }
                }
            }
        };
        Thread t2 = new Thread("t2") {
            @Override
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    System.out.println("消防车");
                }
            }
        };
        t1.start();
        t2.start();
    }
}
```
### 线程的加入
```java
/**
 * 线程的加入
 * A，B 两个线程执行过程中，A正在执行，这时候让B加入，则代码会先执行完B的代码在返回执行A的代码
 * 这时候两个线程会合并成一个线程,里面的代码会按照顺序执行。这时候就没有Cpu在线程之间切换的效果了。
 */
public class ThreadTest11 {
    public static void main(String[] args) {
        Thread t1 = new Thread("1") {
            @Override
            public void run() {
                for (int i = 0; i < 150; i++) {
                    System.out.println("t1");
                }
            }
        };
        Thread t2 = new Thread("2") {
            @Override
            public synchronized void start() {
                for (int i = 1; i < 14; i++) {
                    System.out.println("t2");
                    if (i % 10 == 0){
                        try {
                            t1.join();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        };
        t1.start();
        t2.start();
    }
}
```
### 守护线程
守护线程用来管理非守护线程，如果当前线程中包含一个非守护线程，那么守护线程会一直存在。
守护线程的例子。
```java
/**
 * 守护线程
 * 非守护线程全部结束之后守护线程也会结束
 * Java中的垃圾回收器就是一个守护线程,对于其他执行的内容就是一个非守护线程
 * 可以将守护线程设置成一个服务用来对其他非守护进程提供服务
 */
public class ThreadTest12 {
    public static void main(String[] args) {
        Thread t1 = new Thread("t1") {
            @Override
            public void run() {
                for (int i = 0; i < 1000; i++) {
                    System.out.println("守护线程");
                    try {
                        Thread.sleep(100L);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }

            }
        };
        Thread t2 = new Thread("t2") {
            @Override
            public void run() {
                for (int i = 0; i < 5; i++) {
                    System.out.println("非守护线程");
                    try {
                        Thread.sleep(100L);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        t1.setDaemon(true);
        t1.start();
        t2.start();
    }
}
```
## 线程同步

### 方法的同步
测试类，用来形成共享内存。
```java
/*多线程中堆内存是共享的
* 多个线程之间可以同时修改同一块内存上的变量，这时候就有一个线程不安全的问题 在不加同步代码的时候会发现打印的值是相同的
* */
public class Task {
    /*多个线程共享堆内存
    * 多个线程可以同时运行修改变量的操作，会导致执行结果和预期不相同
    * 可以在一个线程执行一个代码的时候阻止其他进程执行，从而能保证结果正确
    * */
    private int num = 0;
    public synchronized void  changeNum(boolean flag){
        if (flag){
            num = 90;
        }else {
            num = 50;
        }
        System.out.println(Thread.currentThread().getName()+":beg");
        System.out.println(Thread.currentThread().getName()+":"+num);
        System.out.println(Thread.currentThread().getName()+":end");
    }
}
```
同步代码测试类,用来测试同步代码的同步效果。
```java
/**
 * 同步测试代码
 */
public class SynchronizeTest01 {
    public static void main(String[] args) {
        Task task = new Task();
        Thread t1 = new Thread("t1"){
            @Override
            public void run() {
                task.changeNum(true);
            }
        };
        Thread t2 = new Thread("t2"){
            @Override
            public void run() {
                task.changeNum(false);
            }
        };
        t1.start();
        t2.start();
    }
}
```
同步关键字`synchronized`去掉后会发现发现打印的数字相同。
加上之后代码正确执行。
关键字`synchronized`锁住是同一个对象，锁生效的时候是在同一个对象中，如果是两个相同的对象则没有什么意义。

#### 同步和异步
- 同步就是会互相等待，排队执行
- 异步就是直接执行,等执行完毕再通知

### 同步代码块
下面的代码一部分是耗时的，但是并不影响线程安全，只有一部分是操作共享内存是线程不安全的，这种情况下，同步整个方法会降低效率。
```java
/*多线程中堆内存是共享的
 * 多个线程之间可以同时修改同一块内存上的变量，这时候就有一个线程不安全的问题 在不加同步代码的时候会发现打印的值是相同的
 * */
public class Task {
    /*多个线程共享堆内存
     * 多个线程可以同时运行修改变量的操作，会导致执行结果和预期不相同
     * 可以在一个线程执行一个代码的时候阻止其他进程执行，从而能保证结果正确
     * */
    private int num = 0;

    public void changeNum(boolean flag) {
        try {
            /*假设代码执行时间较长,并且没有线程安全问题*/
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        /*下面的代码有线程安全问题，需要同步的只是这部分*/
        synchronized (this) {
            if (flag) {
                num = 90;
            } else {
                num = 50;
            }
            System.out.println(Thread.currentThread().getName() + ":beg");
            System.out.println(Thread.currentThread().getName() + ":" + num);
            System.out.println(Thread.currentThread().getName() + ":end");
        }
    }
}
```
这里的代码是测试任务执行时间的代码，可以通过这个代码来打印两个线程的运行时间。
```java
/**
 * 耗时较长的任务放到同步代码块中，计算执行代码所耗费的的时间
 */
public class SynchronizeTest02 {
    public static long b1;
    public static long e1;
    public static long b2;
    public static long e2;
    public static void main(String[] args) throws InterruptedException {
        Task task = new Task();
        Thread t1 = new Thread("t1") {
            @Override
            public void run() {
                b1 = System.currentTimeMillis();
                task.changeNum(true);
                e1 = System.currentTimeMillis();
            }
        };
        Thread t2 = new Thread("t2") {
            @Override
            public void run() {
                b2 = System.currentTimeMillis();
                task.changeNum(false);
                e2 = System.currentTimeMillis();
            }
        };
        t1.start();
        t2.start();
        Thread.sleep(5000);
        if (!t1.isAlive() && !t2.isAlive())
            System.out.println(((Math.max(e1, e2)) - (Math.min(b1, b2))) / 1000L);
    }
}
```
上面的例子中使用同步代码块让代码执行的时间减少了一半。

#### 同步代码块示例
模拟售票
售票作业
```java
/**
 * 使用多线程模拟售票过程
 * 假设存在100张电影票,有三个公司对外售卖
 * 分析：100张电影票作为成员变量，开三个线程开始执行,每次执行票数减一
 */
public class Ticket implements Runnable {
    /*100张电影票*/
    private int count = 10000;

    @Override
    public void run() {
        while (true) {
            synchronized (this) {
                if (count <= 0) {
                    break;
                } else {
                    count--;
                    System.out.println("当前线程名字:" + Thread.currentThread().getName() + "剩余电影票:" + this.count);
                }
            }
        }
    }
}
```
开启多线程模拟多公司售票
```java
/**
 * 开启三个线程，代表三个公司同时同一种票
 */
public class TicketTest {
    public static void main(String[] args) {
        Ticket ticket = new Ticket();
        Thread thread = new Thread(ticket, "公司1");
        Thread thread1 = new Thread(ticket, "公司2");
        Thread thread2 = new Thread(ticket, "公司3");
        thread.start();
        thread1.start();
        thread2.start();
    }
}
```
## 死锁问题
#### 死锁示例
```java
/**
 * 演示死锁情况
 */
public class DeadLockTest01 {

    private static final Object object1 = new Object();
    private static final Object object2 = new Object();

    public static void main(String[] args) {
        Thread t1 = new Thread() {
            @Override
            public void run() {
                synchronized (object1) {
                    System.out.println("你好我是:" + this.getName());
                    synchronized (object2) {
                        System.out.println("你好我是:" + this.getName());
                    }
                }
            }
        };
        Thread t2 = new Thread() {
            @Override
            public void run() {
                synchronized (object2) {
                    System.out.println("你好我是:" + this.getName());
                    synchronized (object1) {
                        System.out.println("你好我是:" + this.getName());
                    }
                }
            }
        };
        t1.start();
        t2.start();
    }
}
```
上面的示例中两个线程互相等待，并且没有释放另一个进程需要的锁，程序会一直等待下去，这就造成了死锁问题。

#### jps命令
使用jps命令可以看到运行的进程。
#### jstack -l
使用`jstack -l 18700`可以查看特定线程的程序，如果有死锁则会打印出来。

#### `volatile`关键字
这个关键字可以让多个线程访问同一个内存。
```java
/**
 * 不能出现死锁，可能是jdk特定版本才行
 */
public class Task implements Runnable {
    /*这个关键字可以保证每个线程取值的时候都从堆内存取值，保证不会出错*/
    /*java虚拟机运行在64位jdk的server模式下可能会引发flag值不会被修改的情况，从而程序一直执行*/
    private volatile boolean flag = true;

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    @Override
    public void run() {
        while (flag) {
            System.out.println("循环体");
        }
        System.out.println("循环结束");
    }
}
```
```java
/**
 * 测试Volatile
 */
public class VolatileTest01 {
    public static void main(String[] args) throws InterruptedException {
        Task task = new Task();
        Thread t1 = new Thread(task, "t1");
        Thread t2 = new Thread(task, "t2");
        t1.start();
        t2.start();
        Thread.sleep(1000);
        task.setFlag(false);
    }
}
```

## 原子性
代码执行过程中不会跳转到其他线程说明这个代码是原子行的。
原子性代码不存在线程安全问题。
非原子行代码可能会互相切换。
原子性语句
```java
int x = 588;
return x;
```
非原子性语句（多步操作，cpu随时切换到其他线程）
```java
int y = x;
x++;
x = x + 1；
```
volatile是非原子性的。
synchronized是原子性的。

## 定时任务的实现
```java
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Timer;
import java.util.TimerTask;

/**
 * 使用Timer实现定时任务
 */
public class TimerTest {
    public static void main(String[] args) throws ParseException {
        Timer t = new Timer();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss SSS");
        /*到了设定时间之后开始运行，之后每隔500毫秒运行一次*/
        t.schedule(new MyTimerTask(),simpleDateFormat.parse("2022-01-05 20:08:30 000"));
    }
}

/**
 * 继承TimerTask并将run方法重写
 */
class MyTimerTask extends TimerTask{
    @Override
    public void run() {
        System.out.println("hello world");
    }
}
```
## 线程通信

### 两个线程通信
```java
/**
 * 控制台交替打印AB
 */
public class NotifyTest01 {
    public static void main(String[] args) {
        Print print = new Print();
        Thread t1 = new Thread() {
            @Override
            public void run() {
                for (; ; ) {
                    try {
                        print.printA();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        Thread t2 = new Thread() {
            @Override
            public void run() {
                for (; ; ) {
                    try {
                        print.printB();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        };
        t1.start();
        t2.start();
    }
}

class Print {
    private int flag = 1;

    public void printA() throws InterruptedException {
        synchronized (this) {
            if (flag != 1) {
                System.out.println("A");
                this.wait();
            }
            flag = 2;
            this.notify();
        }
    }

    public void printB() throws InterruptedException {
        synchronized (this) {
            if (flag != 2) {
                System.out.println("B");
                this.wait();
            }
            flag = 1;
            this.notify();
        }
    }
}
```
### 三个线程通信
```java
/**
 * 三个线程通过notifyAll进行通信实现循环打印字符串
 * 这个有弊端，每次都会通知每个线程，jdk1.5之前的写法是这样的
 */
public class NotifyAllTest02 {
    public static void main(String[] args) {
        Print1 print1 = new Print1();
        Thread thread = new Thread("t1") {
            @Override
            public void run() {
                for (; ; ) {
                    print1.p1();
                }
            }
        };
        Thread thread1 = new Thread("t2") {
            @Override
            public void run() {
                for (; ; ) {
                    print1.p2();
                }
            }
        };
        Thread thread2 = new Thread("t3") {
            @Override
            public void run() {
                for (; ; ) {
                    print1.p3();
                }
            }
        };
        thread.start();
        thread1.start();
        thread2.start();
    }
}
class Print1 {
    private int flag = 1;
    public void p1() {
        synchronized (this) {
            while (flag != 1) {
                try {
                    this.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println("t1");
            flag = 2;
            this.notifyAll();
        }
    }
    public void p2() {
        synchronized (this) {
            while (flag != 2) {
                try {
                    this.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println("t2");
            flag = 3;
            this.notifyAll();
        }
    }
    public void p3() {
        synchronized (this) {
            while (flag != 3) {

                try {
                    this.wait();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            System.out.println("t3");
            flag = 1;
            this.notifyAll();
        }
    }
}
```
### 多线程等待需要注意的问题
Object类中有多个wait类，是重载关系，包含毫秒数的是多少毫秒进入等待，两个参数的，前面的是毫秒，后一个是纳秒。无参数的立即进入等待状态。
进入等待状态后除非被唤醒否则会一直在等待状态。
锁和wait和notify的操作参数保持一致。
线程wait（）之后会释放掉锁。
Sleep，Notify并不会释放锁。

### 互斥锁实现交替打印
```java
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

/**
 * ReenTrantLock
 */
public class LockTest01 {
    public static void main(String[] args) {
        Print3 print1 = new Print3();
        Thread thread = new Thread("t1") {
            @Override
            public void run() {
                for (; ; ) {
                    print1.p1();
                }
            }
        };

        Thread thread1 = new Thread("t2") {
            @Override
            public void run() {
                for (; ; ) {
                    print1.p2();
                }
            }
        };

        Thread thread2 = new Thread("t3") {
            @Override
            public void run() {
                for (; ; ) {
                    print1.p3();
                }
            }
        };
        thread.start();
        thread1.start();
        thread2.start();
    }
}

class Print3 {
    /*互斥锁*/
    private ReentrantLock reentrantLock = new ReentrantLock();
    /*监视器*/
    private Condition c1 = reentrantLock.newCondition();
    private Condition c2 = reentrantLock.newCondition();
    private Condition c3 = reentrantLock.newCondition();
    private int flag = 1;
    public void p1() {
        reentrantLock.lock();
        while (flag != 1) {
            try {
                c1.await();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("t1");
        flag = 2;
        c2.signal();
        reentrantLock.unlock();
    }

    public void p2() {
        reentrantLock.lock();
        while (flag != 2) {
            try {
                c2.await();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("t2");
        flag = 3;
        c3.signal();
        reentrantLock.unlock();
    }

    public void p3() {
        reentrantLock.lock();
        while (flag != 3) {
            try {
                c3.await();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        System.out.println("t3");
        flag = 1;
        c1.signal();
        reentrantLock.unlock();
    }
}
```
## 线程的生命周期
- 新建
  - 创建线程的对象
- 就绪
  - 等待cpu执行权
- 运行
  - 获得cpu执行权
- 阻塞
  - Sleep
  - Wait
  - 此时没有执行权
- 死亡
  - 此时已经变成垃圾等待回收

新建-> 就绪 -> 运行 -> 就绪 -> 死亡