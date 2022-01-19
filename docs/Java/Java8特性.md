# Java8特性

## 函数式编程
这是一种编程的范式。和命令式编程对应。
可以减少代码量。尽量多的使用函数和表达式。

### 函数式接口
```java
/**
 * 函数式接口
 * default方法 java8出现的新接口方法,这种方式可以让方法实现多继承
 * 提高程序的兼容性,默认方法是在原来的基础上进行扩展的
 */
@FunctionalInterface
public interface MyInterface {
    void m1();

    default void print(Object o){
        System.out.println(o);
    }
}
```
使用函数式接口可以在接口中增加使用default修饰的非抽象方法，利用这种方法可以实现多继承类似的功能。
测试上面的接口可以正常使用。
```java
/* 测试代码 */
/**
 * default方法测试
 */
public class FunctionTest implements MyInterface{
    public static void main(String[] args) {
        FunctionTest functionTest = new FunctionTest();
        functionTest.print("dsada");
    }

    @Override
    public void m1() {
        System.out.println("s");
    }
}
```
函数式接口只能包含一个抽象方法，多于一个就会报错。
实例化这些接口可以使用lambda表达式。


## lambda表达式
函数式接口，的出现一个目的就是为了适应lambda表达式。
lambda可以看作是一个匿名函数。
`()->{}`

可以十分精简的写代码，下面是例子。
```java
/**
 * lambda表达式,例子
 */
public class LambdaTest01 {
    public static void main(String[] args) {
        MyInterface myInterface = () -> System.out.println("1");
        myInterface.m1();
        /*使用lambda创建匿名内部类*/
        /*看上去十分的简洁*/
        MyInterface myInterface1 = () -> System.out.println("2");
        myInterface1.m1();

        MyInterface2 myInterface2 = Integer::sum;
        System.out.println(myInterface2.m2(1,2));
    }
}
```
使用lambda创建线程的例子
```java
/**
 * lambda表达式创建线程
 */
public class LambdaTest02 {
    public static void main(String[] args) {
        new Thread() {
            @Override
            public void run() {
                System.out.println("1");
            }
        }.start();
        /*使用Lambda创建线程*/
        new Thread(() -> System.out.println("2")).start();
    }
}
```
## forEach遍历
```java
import edu.princeton.cs.introcs.StdOut;
import java.util.Arrays;
import java.util.List;

/**
 * 使用Foreach方法和lambda遍历集合
 */
public class ForEachTest {
    public static void main(String[] args) {
        Integer[] integers = new Integer[]{31, 32, 3, 312, 44, 35};
        List<Integer> list = Arrays.asList(integers);
        list.forEach((i) -> StdOut.print(i+" "));
        System.out.println();
    }
}
```
当lambda只有一个参数的时候可以省略小括号
如`(i)->func(i)`等价于`i->func(i)`。

## 方法引用
lambda只有一句的时候可以使用方法引用。方法引用的例子。
```java
import java.util.Arrays;

/**
 * 方法引用
 */
public class LambdaTest04 {
    public static void main(String[] args) {
        Integer[] integers = new Integer[]{31, 32, 3, 312, 44, 35};
        /*Arrays.sort(integers, new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return Integer.compare(o1, o2);
            }
        });*/
        /*使用方法引用*/
        Arrays.sort(integers, Integer::compare);
        Arrays.stream(integers).forEach(System.out::println);
    }
}
```

## Stream API
