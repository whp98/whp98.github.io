# Java反射
反射机制可以在程序运行状态中，对于任何一个类，知道这个类所有的属性和方法，并且可以调用任意方法，访问任意属性。

## 作用
可以通过反射实现反编译。
通过反射获取类的属性、方法等。
IDE展示类的属性或方法就是实用反射原理实现的。
反射应用最多的地方就是框架，String，Spring MVC，Mybatis等等。

## Class对象
JVM将`.class`文件读取到内存中,就会创建出一个class对象。
java.lang.Class这个类是反射中常用的。
获取Class对象的几种方式。
```java
/**
 * 获取.class文件的Class对象
 */
public class ReflectTest01 {
    public static void main(String[] args) throws ClassNotFoundException {
        /*1.通过类的全名来获取类*/
        Class clazz = Class.forName("xyz.intellij.playground.basic.reflect.Dog");
        /*2.实用类的class属性获取*/
        Class clazz1 = Dog.class;
        /*3.通过对象的getClass方法获取*/
        Object  d = new Dog();
        Class clazz2 = d.getClass();
        /*以上三种方式会获得同一个class对象*/
        System.out.println(clazz == clazz2 && clazz2 == clazz1);
    }
}
```
## 创建对象
使用反射创建对象
```java
import java.util.Date;

/**
 * 使用反射创建对象
 */
public class ReflectMakeNewObject {
    public static void main(String[] args) throws ClassNotFoundException, InstantiationException, IllegalAccessException {
        /*使用这个方法就可以将类读取到内存中*/
        Class clazz = Class.forName("xyz.intellij.playground.basic.reflect.Dog");
        Object object = clazz.newInstance();
        System.out.println(object);
        Class clazzo = Class.forName("java.util.Date");
        Object o1 = clazzo.newInstance();
        System.out.println(o1 instanceof Date);
        System.out.println(o1);
    }
}
```

## 利用Java的配置文件创建出可以配置的程序
```java
import xyz.intellij.playground.basic.io.file.FilePaths;

import java.io.FileReader;
import java.io.IOException;
import java.util.Properties;

/**
 * 可以通过配置文件来实现可以配置的java程序
 * 再利用反射机制动态的加载配置好的类
 */
public class ReflectIoExample {
    private static final String keyName = "dogClass";
    public static void main(String[] args) throws IOException, ClassNotFoundException, InstantiationException, IllegalAccessException {
        /*读取配置文件,并创建配置类的对象*/
        try (FileReader fileReader = new FileReader(FilePaths.myTestPath + "dog.properties")) {
            Properties properties = new Properties();
            properties.load(fileReader);
            System.out.println(properties.getProperty(keyName));
            System.out.println(Class.forName(properties.getProperty(keyName)));
            System.out.println(Class.forName(properties.getProperty(keyName)).newInstance());
        }
    }
}
```
```
dogClass=xyz.intellij.playground.basic.reflect.Dog
```
## 获取类中的属性
可以获取属性和简单实现反编译（没有方法）的处理
```java
import java.lang.reflect.Field;
import java.lang.reflect.Modifier;
import java.util.Date;

/**
 * 使用反射获取类中的属性
 * 以及反编译类成员变量
 */
public class GetClassProperties {
    public static void main(String[] args) throws ClassNotFoundException {
        Class clazz = Class.forName("xyz.intellij.playground.basic.reflect.Dog");
        //获取public成员变量数组
        Field[] fields = clazz.getFields();
        for (Field field : fields) {
            System.out.println(field);
        }
        //获取类中所有的成员变量
        Field[] fields1 = clazz.getDeclaredFields();
        for (int i = 0; i < fields1.length; i++) {
            System.out.println("------");
            /*获取变量名称*/
            System.out.println(fields1[i].getName());
            /*获取访问控制修饰符号的int值*/
            System.out.println(fields1[i].getModifiers());
            /*获取修饰符*/
            System.out.println(Modifier.toString(fields1[i].getModifiers()));
            /*获取成员变量的类型*/
            System.out.println(fields1[i].getType());
            /*带包名*/
            System.out.println(fields1[i].getType().getName());
            /*不带包名*/
            System.out.println(fields1[i].getType().getSimpleName());
            System.out.println(Declass(Date.class));
        }
    }

    /**
     * 反编译类 只包含属性
     * @param c 类的class对象
     * @return 返回类的字符串
     */
    public static String Declass(Class c) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(Modifier.toString(c.getModifiers()));
        /*类开始*/
        stringBuilder.append(" class ");
        stringBuilder.append(c.getSimpleName());
        stringBuilder.append(" ");
        stringBuilder.append("{");
        stringBuilder.append("\n");
        Field[] fields = c.getDeclaredFields();
        /*属性*/
        for(Field field:fields){
            stringBuilder.append("    ");
            stringBuilder.append(Modifier.toString(field.getModifiers()));
            stringBuilder.append(" ");
            stringBuilder.append(field.getType().getSimpleName());
            stringBuilder.append(" ");
            stringBuilder.append(field.getName());
            stringBuilder.append(";");
            stringBuilder.append("\n");
        }
        stringBuilder.append("\n}");
        return stringBuilder.toString();
    }
}
```
## 使用反射赋值
```java
import java.lang.reflect.Field;

/**
 * 使用反射获取指定属性并为赋值
 */
public class ReflectAssignProperties {
    public static void main(String[] args) throws ClassNotFoundException, NoSuchFieldException, InstantiationException, IllegalAccessException {
        Class clazz = Class.forName("xyz.intellij.playground.basic.reflect.Dog");
        /*获取dog的name属性*/
        Field field = clazz.getDeclaredField("name");
        Field field1 = clazz.getDeclaredField("age");
        Object o = clazz.newInstance();
        System.out.println(field);
        /*给特定字段赋值*/
        field.set(o,"zhazha");
        /*私有变量不能赋值，没有权限*/
        /*需要从外部打破封装性，这种方式不建议使用*/
        field1.setAccessible(true);
        field1.set(o,"12");
        System.out.println(o);
    }
}
```

## 获取类中方法
```java
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

/**
 * 使用反射获取类中的方法
 */
public class ReflectMethod {
    public static void main(String[] args) throws ClassNotFoundException {
        Class clazz = Class.forName("xyz.intellij.playground.basic.reflect.Dog");
        getMethod(clazz);
    }

    public static String getMethod(Class clazz) {
        StringBuilder stringBuilder = new StringBuilder();
        Method[] methods = clazz.getDeclaredMethods();
        for (Method method : methods) {
            /*获取方法修饰符号*/
            stringBuilder.append("    ");
            stringBuilder.append(Modifier.toString(method.getModifiers()));
            stringBuilder.append(" ");
            stringBuilder.append(method.getReturnType().getSimpleName());
            stringBuilder.append(" ");
            stringBuilder.append(method.getName());
            stringBuilder.append("(");
            Class[] prams = method.getParameterTypes();
            for (Class c : prams) {
                stringBuilder.append(c.getSimpleName());
                stringBuilder.append(",");
            }
            for (int i = 0; i < prams.length; i++) {
                Class c = prams[i];
                stringBuilder.append(c.getSimpleName());
                if (i < prams.length - 1)
                    stringBuilder.append(",");
            }
            stringBuilder.append(")");
            stringBuilder.append(";");
            stringBuilder.append("\n");
        }
        return stringBuilder.toString();
    }
}
```
## 调用类中的方法
```java
/*使用反射调用类中的方法*/
    public static Object runMethod(Class c) throws NoSuchMethodException, InstantiationException, IllegalAccessException, InvocationTargetException {
        Method method = c.getDeclaredMethod("setName",String.class);
        Object o = c.newInstance();
        return method.invoke(o,"dsad");
    }
```

## 获取类的构造方法

```java
public static void getConstuctor(Class c){
        Constructor[] constructors = c.getDeclaredConstructors();
        for (Constructor c1:constructors){
            System.out.println(Modifier.toString(c1.getModifiers()));
            System.out.println(c1.getName());
            for (Class cf : c1.getParameterTypes()) {
                System.out.println(cf.getSimpleName());
                System.out.println(",");
            }
        }
    }
```


## 获取父类和实现的接口
```java
/**
 * 获取类的父类和实现的接口
 */
public class ReflectGetParentClass {
    public static void main(String[] args) {
        Class clazz = StringBuffer.class;
        Class parentClass = clazz.getSuperclass();
        System.out.println(parentClass.getName());
            //        获取接口
        Class[] inter = clazz.getInterfaces();
        for (Class i:inter){
            System.out.println(i);
        }
    }
}
```