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
下面的代码演示了流的使用
```java
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Collection可以使用Stream进行操作
 * Stream本身支持函数式编程
 */
public class StreamTest01 {
    public static void main(String[] args) {
        List<Student> studentList = getStudents();
        testMethod1(studentList);
        testMethod2(studentList);
    }

    private static void testMethod1(List<Student> studentList) {
        /*实现找到成年人，并按照年龄降序排序*/
        /*实现1*/
        List<Student> resList = new ArrayList<>(6);
        for (Student student : studentList) {
            /*筛选出成年人*/
            if (student.getAge() >= 18) {
                resList.add(student);
            }
        }
        resList.sort(new Comparator<Student>() {
            @Override
            public int compare(Student o1, Student o2) {
                return o2.getAge() - o1.getAge();
            }
        });
        System.out.println(resList);
        /*实现2 使用Stream实现*/
        /**
         * 1.使用Stream API
         * 2.过滤
         * 3.排序
         * 4.使用collect将Stream转换成List
         */
        /*Stream内部实现了内部迭代，jdk8中的迭代速度比传统迭代慢*/
        List<Student> arrayList = studentList.stream()
                .filter((student -> student.getAge() >= 18))
                //.sorted(((o1, o2) -> Integer.compare(o2.getAge(), o1.getAge())))
                .sorted(Comparator.comparing(Student::getAge).reversed())
                .collect(Collectors.toList());
        System.out.println(arrayList);
        /*Stream流是一次性的,是不能重复的*/
    }

    private static void testMethod2(List<Student> studentList){
        /*流只能使用一次*/
        Stream<Student> stream = studentList.stream();
        stream.forEach(System.out::println);
        /*此时流已经被关闭，无法被操作*/
        stream.forEach(System.out::println);
    }
    private static List<Student> getStudents() {
        List<Student> studentList = new ArrayList<Student>();
        studentList.add(new Student("小明", 10));
        studentList.add(new Student("小网", 18));
        studentList.add(new Student("小的", 51));
        studentList.add(new Student("小主", 34));
        studentList.add(new Student("小哈哈", 61));
        studentList.add(new Student("小大明", 12));
        return studentList;
    }
}
```
使用流API操作集合能减少遍历代码，代码写起来和看起来都会比较好。

## map-reduce 计算数据
map-reduce可以比较优雅的操作数据计算，这个思想最初来源于谷歌，用于数据分析。
```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * map-reduce 是谷歌提出的应用于大数据分析的方法
 * map是数据映射 某一组数据
 * reduce是数据计算 某一个值
 */
public class MapReduce {
    public static void main(String[] args) {
        List<Student> studentList = getStudents();
        /*使用map获取学生的数学成绩*/
        List<Double> mathMarks = studentList
                .stream()
                .map(Student::getMathMark)
                .collect(Collectors.toList());
        System.out.println(mathMarks);
        /*使用map获取学生姓名的长度*/
        List<Integer> nameLength = studentList.stream()
                .map(Student::getName)
                .map(String::length)
                .collect(Collectors.toList());
        System.out.println(nameLength);
        /*将每个学生分数减少10*/
        List<Double> math_10 = studentList.stream().map(Student::getMathMark)
                .map(i -> i - 10)
                .collect(Collectors.toList());
        System.out.println(math_10);
        /*Reduce方法*/
        /*计算学生的数学总分*/
        /*相当于 0 + sum([分数])*/
        Double mathMarkSum = studentList.stream().map(Student::getMathMark)
                .reduce((double) 0, Double::sum);
        System.out.println(mathMarkSum);
        /*Optional对象可以比较方便的判断类型是不是空,并且可以指定为空的时候的解决方案*/
        Double mathMarkSum1 = studentList.stream().map(Student::getMathMark)
                .reduce(Double::sum).orElse((double) 0);
        System.out.println(mathMarkSum1);
        /*计算最高分*/
        double max = studentList.stream().map(Student::getMathMark).reduce(Double::max).orElse((double) 0);
        System.out.println(max);
    }

    private static List<Student> getStudents() {
        List<Student> studentList = new ArrayList<Student>();
        studentList.add(new Student("小明", 121, 23, 45));
        studentList.add(new Student("小网", 2, 4, 6));
        studentList.add(new Student("小的", 3, 55, 66));
        studentList.add(new Student("小主", 23, 56, 8));
        studentList.add(new Student("小哈哈", 41, 24, 5));
        studentList.add(new Student("小大明", 5, 6, 7));
        return studentList;
    }
}
```
## 数字流

数字流提供了可以方便操作数字的的API可以很简单的计算数据。
```java
import java.util.List;
import java.util.stream.IntStream;

/**
 * IntStream DoubleStream LongStream
 * 数字流
 */
public class IntStreamTest {
    public static void main(String[] args) {
        List<Student> studentList = MapReduce.getStudents();
        /*计算数学的总分和平均分*/
        double sum = studentList.stream().mapToDouble(Student::getMathMark).sum();
        /*计算平均分*/
        double avg = studentList.stream().mapToDouble(Student::getMathMark).average().orElse(0);
        System.out.println(sum);
        System.out.println(avg);
        /*生成数字流*/
        /*不包含100*/
        IntStream intStream = IntStream.range(0, 100);
        /*包含100*/
        IntStream intStream1 = IntStream.rangeClosed(0, 100);
        /*计算1-100之间的偶数的个数*/
        System.out.println(IntStream.rangeClosed(1, 100).filter(n -> n % 2 == 0).count());
    }
}
```

## 自己创建流
这里有简单的代码示例
```java
import java.util.Arrays;
import java.util.stream.IntStream;
import java.util.stream.Stream;
/**
 * 自己创建一个流
 */
public class StreamTest {
    public static void main(String[] args) {
        String[] str = {"sd", "asd", "sdad"};
        /*创建Stream.of方法*/
        Stream.of(str).map(String::toUpperCase).forEach(System.out::println);
        int[] arr = {1, 4, 5, 5};
        //使用Arrays.stream
        IntStream intStream = Arrays.stream(arr);
        System.out.println(intStream.sum());
        //使用函数创建流,无限流，limit可以只回去前n条数据
        Stream.iterate(0, n -> n + 2)
                .limit(50) /*获取前N条数据*/
                .forEach(System.out::println);
    }
}
```
## Optional类
- 解决空指针
- 可以编写更精简的代码

示例代码
```java
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

/**
 * Optional可以帮助做数据判断输出解决空指针异常
 */
public class OptionalTest {
    public static void main(String[] args) {
        List<Student> studentList = MapReduce.getStudents();

        /*计算分数在60下面的分数总和*/
        Optional<Double> optional = studentList.stream().map(Student::getMathMark)
                .filter(s -> s > 100) /*这里可能会导致解决为空，没有成绩大于100的情况下*/
                .reduce(Double::sum);
        /*在为空的时候使用0作为默认值*/
        System.out.println(optional.orElse((double) 0));
        /*取值的时候需要判断*/
        Map<Integer,String> stringMap = new HashMap<>();
        stringMap.put(1,"122");
        /*可以为空的数据*/
        System.out.println(Optional.ofNullable(stringMap.get(1)).orElse("kong"));
        /*不可以为空的数据*/
        System.out.println(Optional.of(stringMap.get(0)).orElse("kong"));
    }
}
```

## 新增的日期类
LocalDate类可以操作日期
```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

/**
 * LocalDate: 只能处理日期相关的数据，没有时间
 * Java8的日期处理类
 */
public class LocalDateTest {
    public static void main(String[] args) {
        LocalDate localDate = LocalDate.now();
        System.out.println(localDate);
        /*获取年*/
        System.out.println(localDate.getYear());
        /*获取月*/
        System.out.println(localDate.getMonthValue());
        /*获取天*/
        System.out.println(localDate.getDayOfMonth());
        /*日期格式化*/
        System.out.println(localDate.format(DateTimeFormatter.ofPattern("yyyy年MM月dd日")));
        /*判断闰年*/
        System.out.println(localDate.isLeapYear());
        /*判断当天月的天数*/
        System.out.println(localDate.lengthOfMonth());
        /*自己定义的日期*/
        /*方式1*/
        LocalDate date = LocalDate.parse("2018-12-03");
        /*方式2*/
        LocalDate date2 = LocalDate.of(2017,8,15);
        /*判断日期是否相等*/
        System.out.println(date.equals(date2));
        /*日期偏移计算,如当前日期向后偏移一周*/
        System.out.println(localDate.plus(1, ChronoUnit.WEEKS));
        System.out.println(localDate.plus(-1, ChronoUnit.WEEKS));
    }
}
```
## 新增的时间操作类
新增的LocalTime可以帮助更简单的操作时间。
```java
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

/**
 * localTime只能处理时间
 */
public class LocalTimeTest {
    public static void main(String[] args) {
        /*获取当前时间，不包含毫秒*/
        LocalTime localTime = LocalTime.now();
        System.out.println(localTime);
        /*去除毫秒*/
        System.out.println(localTime.withNano(0));
        /*时间的偏移计算*/
        /*下面的计算时间偏移一小时*/
        localTime.plus(1, ChronoUnit.HOURS);
    }
}
```

## 日期时间操作类
可以同时处理日期和时间的
LocalDateTime类
```java
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 同时处理日期和时间
 */
public class LocalDateTimeTest {
    public static void main(String[] args) {
        /*获取当前的日期和时间*/
        LocalDateTime localDateTime = LocalDateTime.now();
        System.out.println(localDateTime);
        System.out.println(localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        /*创建日期和时间类*/
        LocalDateTime localDateTime1 = LocalDateTime.of(2017,1,10,10,1);
        System.out.println(localDateTime1);
    }
}

```
## 日期和时间的差异计算类
Duration 类 Period类
```java
/**
 * Duration 时间
 * Period 日期
 */
public class DurtionPeriodTest {
    public static void main(String[] args) {
        LocalDate date1 = LocalDate.parse("2017-10-20");
        LocalDate date2 = LocalDate.parse("2017-09-01");
        Period period = Period.between(date2,date1);
        /*分别计算日期在月份日和年上面的差别*/
        System.out.println(period.getMonths());
        System.out.println(period.getDays());
        System.out.println(period.getYears());
        LocalTime localTime1 = LocalTime.parse("10:20:11");
        LocalTime localTime2 = LocalTime.parse("10:20:12");
        Duration duration = Duration.between(localTime1,localTime2);
        /*用来计算时间差*/
        System.out.println(duration.getNano());
        System.out.println(duration.getSeconds());
    }
}
```