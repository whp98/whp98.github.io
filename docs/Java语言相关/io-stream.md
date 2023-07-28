# Java IO流

## 概述

io就是输入输出，java中读取文件是按照字节读取，输入是输入到内存中，从内存中输出就是输出流。

io分类
按照流向分类
- 输入
InputStream 和 Reader 
- 输出
OutputStream和Writer

按照操作类型分类
- 字节流
InputStream和OutputStream，可以操作任何类型的数据因为其操作的是字节和数据类型无关。
- 字符流
Reader和Writer只能操作纯字符可以防止乱码的发生，
以上四种io都是抽象类。

Java中的io汇总
- IO流
  - 字节流
    - InputStream
      - FileInputStream
      - BufferedInputStream
      - DataInputStream
      - ObjectInputStream
    - OutputStream
      - FileObjectStream
      - BufferedOutputStream
      - DataOutputStream
      - ObjectOutputStream
  - 字符流
    - Writer
      - FileWriter
      - BufferedWriter
      - OutputStreamWriter
    - Reader
      - FileReader
      - BufferedReader
      - InputStreamReader

以上的类都在java.io下面。

### 绝对路径和相对路径
举个例子
1. 绝对路径举例`E:\dsasd\dasd\docs\Java\io流.md`
2. 相对路径举例 `docs\Java\io流.md`

总的来说绝对路径是对资源位置所在位置的完全描述，相对路径则是相对于当前目录的位置。

## 使用FileInputStream读取文件
```java

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

/**
 * 使用fileinputStream读取文件
 */
public class FileInputStreamTest {
    public static void main(String[] args) {
        FileInputStream fileInputStream = null;
        try {
            /*绝对路径*/
            /*fileInputStream = new FileInputStream("E:\\MY_CODE\\Java_project\\java_playGround\\src\\main\\resources\\iofile\\mytext.txt");*/
            /*相对路径*/
            fileInputStream = new FileInputStream("src/main/resources/iofile/mytext.txt");

            File directory = new File("");//参数为空
            String courseFile = directory.getCanonicalPath() ;
            String author =directory.getAbsolutePath();
            /*读取到字符的ascii编码*/
            /*每次只能读取一个字节，效率不高*/
            /*int temp;
            while ((temp = fileInputStream.read()) != -1) {
                System.out.print((char) temp);
            }*/
            /*为了增加读取数量可以使用一个byte数组来缓存,每次从硬盘读取3个字节*/
            byte[] bytes = new byte[3];
            int temp;
            /*有缓存的情况会返回读取了几个字节,取值的时候需要使用这个读取的量来取值*/
            while ((temp = fileInputStream.read(bytes)) != -1) {
                System.out.print(new String(bytes,0,temp));
            }
        } catch (FileNotFoundException e) {
            System.out.println("文件不存在");
        } catch (IOException e) {
            System.out.println("读取异常");
        } finally {
            try {
                fileInputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("关闭异常");
            }
        }
    }
}

```
## 使用FileOutputStream写入文件

```java
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;

/**
 * 使用fileoutputstream来写入文件
 * */
public class FileOutputStreamTest {
    public static void main(String[] args) {
        FileOutputStream fileOutputStream = null;
        try{
            fileOutputStream = new FileOutputStream("src/main/resources/iofile/mytext.txt");
            String s = "my text";
            fileOutputStream.write(s.getBytes(StandardCharsets.UTF_8));
            fileOutputStream.flush();
        }catch (Exception e){
            System.out.println("文件写入异常");
        }finally{
            try{
                fileOutputStream.close();
            }catch (Exception e){
                System.out.println("文件关闭异常");
            }
        }

    }
}
```



## 使用文件分隔符来解决不同系统下的兼容问题

可以同时在linux和windows使用
```java
import java.io.File;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;

/**
 * 开发中文件分隔符最好使用兼容的
 */
public class FileSeparatorTest {
    public static void main(String[] args) {
        FileOutputStream fileOutputStream = null;
        String s = "src/main/resources/iofile/mytext.txt";
        s = s.replaceAll("//",  File.separator);
        try {
            /*第二个布尔参数控制是否是追加模式*/
            System.out.println(s);
            fileOutputStream = new FileOutputStream(s, true);
            String s1 = "my text";
            fileOutputStream.write(s1.getBytes(StandardCharsets.UTF_8));
            fileOutputStream.flush();
        } catch (Exception e) {
            System.out.println("文件写入异常");
        } finally {
            try {
                fileOutputStream.close();
            } catch (Exception e) {
                System.out.println("文件关闭异常");
            }
        }
    }
}
```

## 使用IO进行文件复制
```java

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

/**
 * 使用java io流进行文件复制的例子
 */
public class FileCopyTest {
    public static void main(String[] args) {
        FileOutputStream fileOutputStream = null;
        FileInputStream fileInputStream = null;
        String file1 = "src/main/resources/iofile/mytext.txt";
        String file2 = "src/main/resources/iofile/copymytext.txt";
        file1 = file1.replaceAll("//", File.separator);
        file2 = file2.replaceAll("//", File.separator);
        try {
            fileInputStream = new FileInputStream(file1);
            fileOutputStream = new FileOutputStream(file2, false);
            byte[] bytes = new byte[8];
            int temp;
            while ((temp = fileInputStream.read(bytes)) != -1) {
                fileOutputStream.write(bytes, 0, temp);

            }
            fileOutputStream.flush();
        } catch (Exception e) {
            System.out.println("文件写入异常");
        } finally {
            try {
                fileOutputStream.close();
                fileInputStream.close();
            } catch (Exception e) {
                System.out.println("文件关闭异常");
            }
        }
    }
}
```

## 使用缓冲类进进行文件拷贝
```java
import java.io.*;

/**
 * 使用缓冲类进行文件拷贝
 * use Buffered io class copy file
 */
public class BufferedFileCopy {
    public static void main(String[] args) {
        BufferedOutputStream bufferedOutputStream = null;
        BufferedInputStream bufferedInputStream = null;
        String file1 = "src/main/resources/iofile/mytext.txt";
        String file2 = "src/main/resources/iofile/copymytext.txt";
        file1 = file1.replaceAll("//", File.separator);
        file2 = file2.replaceAll("//", File.separator);
        try {
            bufferedInputStream =new BufferedInputStream(new FileInputStream(file1)) ;
            bufferedOutputStream = new BufferedOutputStream(new FileOutputStream(file2));
            byte[] bytes = new byte[8];
            int temp;
            while ((temp = bufferedInputStream.read(bytes)) != -1) {
                bufferedOutputStream.write(bytes, 0, temp);
            }
            bufferedOutputStream.flush();
        } catch (Exception e) {
            System.out.println("文件写入异常");
        } finally {
            try {
                bufferedOutputStream.close();
                bufferedInputStream.close();
            } catch (Exception e) {
                System.out.println("文件关闭异常");
            }
        }
    }
}
```
## JDK7新加入特性，自动关闭io资源
```java

import java.io.*;

/**
 * JDK 7 不需要手动关闭io的写法
 * jdk7新加入了一个AutoCloseable的接口
 */
public class FileCopyTest {
    public static void main(String[] args) {
        String file1 = "src/main/resources/iofile/mytext.txt";
        String file2 = "src/main/resources/iofile/copymytext.txt";
        file1 = file1.replaceAll("//", File.separator);
        file2 = file2.replaceAll("//", File.separator);
        try (
                FileInputStream fileInputStream = new FileInputStream(file1);
                FileOutputStream fileOutputStream = new FileOutputStream(file2, false);
        ) {
            byte[] bytes = new byte[8];
            int temp;
            while ((temp = fileInputStream.read(bytes)) != -1) {
                fileOutputStream.write(bytes, 0, temp);

            }
            fileOutputStream.flush();
        } catch (Exception e) {
            System.out.println("文件写入异常");
        }

        try (
                MyAutoCloseable myAutoCloseable = new MyAutoCloseable();
        ) {
            System.out.println("jahja");
        } catch (Exception e) {

        }
    }
}

class MyAutoCloseable implements AutoCloseable {
    @Override
    public void close() throws Exception {
        System.out.println("已经关闭");
    }
}
```
## 使用异或实现加密或解密文件
原理是对文件异或两次是其本身
```java

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;

/**
 * 使用异或操作实现简单的文件加密和解密（解密就是取出来再次异或）
 */
public class FileDeCryptTest {
    public static void main(String[] args) {
        FileOutputStream fileOutputStream = null;
        FileInputStream fileInputStream = null;
        String file2 = "src/main/resources/iofile/mytext.txt";
        String file1 = "src/main/resources/iofile/copymytext.txt";
        file1 = file1.replaceAll("//", File.separator);
        file2 = file2.replaceAll("//", File.separator);
        try {
            fileInputStream = new FileInputStream(file1);
            fileOutputStream = new FileOutputStream(file2, false);
            byte[] bytes = new byte[8];
            int temp;
            while ((temp = fileInputStream.read(bytes)) != -1) {
                for (int i = 0; i < temp; i++) {
                    bytes[i] = (byte) (bytes[i] ^ 8);
                }
                fileOutputStream.write(bytes, 0, temp);

            }
            fileOutputStream.flush();
        } catch (Exception e) {
            System.out.println("文件写入异常");
        } finally {
            try {
                fileOutputStream.close();
                fileInputStream.close();
            } catch (Exception e) {
                System.out.println("文件关闭异常");
            }
        }
    }
}

```
## 字符流
特点是一次读取一个字符，可以比较方便的处理字符文件
```java
import java.io.BufferedReader;
import java.io.FileReader;

/**
 * 使用bufferedWriter缓冲字符流
 */
public class BufferedReaderTest {
    public static void main(String[] args) {
        try {
            BufferedReader bufferedReader = new BufferedReader(new FileReader("src/main/resources/iofile/copymytext.txt"));
            String line;
            while ((line = bufferedReader.readLine())!=null){
                System.out.println(line);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

```
```java
import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;

/**
 * 使用bufferwriter
 */
public class BufferedWriterTest {
    public static void main(String[] args) {
        try (BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter("src/main/resources/iofile/copymytext.txt"));
        ) {
            bufferedWriter.write("sdahkdahsdkjahsdkjshdaksjdasncmnxzncmn\n\n\n\naddsadasdasd\n");
            bufferedWriter.newLine();
            bufferedWriter.write("你好我是Java");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

## 使用io流完成的软件试用操作逻辑
```java
import org.junit.jupiter.api.Test;

import java.io.*;
import java.nio.charset.Charset;

/**
 * 收费软件试用模拟 用户可以试用软件三次
 * 1.使用文件保存软件使用次数
 * 2.读取内容小于0提示用户购买正版软件
 * 3.应该对读写操作进行加密操作
 */
public class Trial {
    final static String path = "src/main/resources/iofile/trial.txt".replaceAll("//", File.separator);
    static int pass = 907898791;

    public static boolean main(String[] args) {
        int i = 0;
        try (
                BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(path), Charset.forName("UTF-8")));
        ) {
            String num = br.readLine();
            if (null != num) {
                i = Integer.parseInt(num) ^ pass;
            }
            if (i <= 0) {
                System.out.println("试用结束，请购买正版软件");
                return false;
            } else {
                System.out.println("您的试用次数还剩:" + i + "次");
                i--;
            }
        } catch (Exception e) {
            System.out.println("io异常");
            e.printStackTrace();
        }
        try (
                BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path), Charset.forName("UTF-8")));
        ) {
            bw.write("" + (i ^ pass));
            bw.flush();
        } catch (Exception e) {
            System.out.println("io异常");
            e.printStackTrace();
        }
        return true;
    }

    /**
     * 测试
     */
    @Test
    void testThis() {
        try (
                BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(path), Charset.forName("UTF-8")));
        ) {
            bw.write("" + (3 ^ pass));
            bw.flush();
        } catch (Exception e) {
            System.out.println("io异常");
            e.printStackTrace();
        }
        do {
            System.out.println("开始测试");
        }while (main(new String[1]));
    }
}
```
## `File`类

### 用File类创建文件和文件夹
```java
import java.io.File;
import java.io.IOException;
/**
 * 用File类创建文件和文件夹
 */
public class FileTest01 {
    public static void main(String[] args) throws IOException {
        /*创建文件的时候会判断是否已经存在，如果文件存在，则返回false，文件不存在的时候会创建相应的文件并且返回true*/
        File file1 = new File(FilePaths.myTestPath + "hello.txt");
        System.out.println(file1.createNewFile());
        /*创建文件夹的创建文件类似，返回值逻辑也是相同的，存在的时候会返回false*/
        File file2 = new File(FilePaths.myTestPath + "test");
        System.out.println(file2.mkdir());
        /*想要创建多级目录需要使用下面的方法*/
        File file3 = new File(FilePaths.myTestPath + "test" + File.separator + "dadsds" + File.separator + "sdadsasd");
        System.out.println(file3.mkdirs());
        /*文件名是可以带 . 的*/
        File file4 = new File(FilePaths.myTestPath + "dsadjashdj.txt");
        System.out.println(file4.mkdirs());
        /*创建文件不写盘符会在项目根目录创建*/
        File file5 = new File("mytext.txt");
        System.out.println(file5.getAbsolutePath());
        System.out.println(file5.createNewFile());
        /*可以使用下面的方法判断文件是不是存在*/
        System.out.println(file5.exists());
    }
}
```
### File 类重命名或删除文件
```java
import java.io.File;
/**
 * 重命名和删除文件
 */
public class FileTest02 {
    public static void main(String[] args) {
        /*
          文件重命名
         */
        File oldfile = new File(FilePaths.myTestPath+"hello.txt");
        File newFile = new File(FilePaths.myTestPath+"world.txt");
        /*返回值是重命名结果，如果成功会是true否则就是false*/
        System.out.println(oldfile.renameTo(newFile));
        /*在目录之间重命名会有移动文件的效果*/
        File newFile1 = new File(FilePaths.myTestPath+"test"+File.separator+"world.txt");
        System.out.println(newFile.renameTo(newFile1));
        /*文件删除,文件并不会进入回收站，而是直接删除*/
        File deleteFile = new File(FilePaths.myTestPath+"test"+File.separator+"world.txt");
        /*返回值是删除结果*/
        System.out.println(deleteFile.delete());
        /*删除文件夹*/
        /*如果文件夹中有内容会删除失败*/
        File deleteFloder = new File(FilePaths.myTestPath+"test");
        System.out.println(deleteFloder.delete());
    }
}
```
### 常用的方法
判断类的方法
```java
import java.io.File;
/**
 * 文件中常用的判断方法
 */
public class FileTest03 {
    public static void main(String[] args) {
        File file1 = new File(FilePaths.myTestPath);
        /*判断是不是文件夹*/
        System.out.println(file1.isDirectory());
        /*判断是不是文件*/
        System.out.println(file1.isFile());
        /*判断文件或者文件夹是否存在*/
        System.out.println(file1.exists());
        /*判断文件或文件夹是不是隐藏了*/
        System.out.println(file1.isHidden());
    }
}
```
其他比较实用的方法
```java
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * File类中其他常用方法
 */
public class FileTest04 {
    public static void main(String[] args) {
        File file  = new File(FilePaths.myTestPath+"gbk.txt");
        /*查看文件的绝对路径*/
        System.out.println(file.getAbsolutePath());
        /*文件的大小单位是字节*/
        System.out.println(file.length());
        /*最后修改时间*/
        long x = file.lastModified();
        Date date = new Date(x);
        SimpleDateFormat simpleFormatter = new SimpleDateFormat();
        System.out.println(simpleFormatter.format(date));
        /*列出某个目录下的文件名*/
        File file1 = new File(FilePaths.myTestPath);
        String[] names = file1.list();
        for (String s: names){
            System.out.println(s);
        }
        /*列出某个目录下的所有文件（同级）*/
        File file2 = new File(FilePaths.myTestPath);
        File[] files = null;
        files = file2.listFiles();
        for (File file3:files){
            System.out.println(file3.getAbsolutePath());
        }
    }
}
```
### `File`类使用案例
#### 统计目录下`.txt`文件数量
```java
import java.io.File;

/**
 * 统计目录下txt文件数量
 */
public class FileTest05 {
    public static void main(String[] args) {
        File file = new File(FilePaths.myTestPath);
        File[] listFiles = file.listFiles();
        int i = 0;
        assert listFiles != null;
        for (File file1 : listFiles) {
            if (file1.isFile() && file1.getName().endsWith(".txt")) {
                System.out.println(file1.getName());
                i++;
            }
        }
        System.out.println(i);
    }
}
```
#### 通过文件过滤器筛选文件并统计
```java
import java.io.File;
import java.io.FilenameFilter;

/**
 * 通过文件过滤器筛选文件
 *  实现统计txt文件的功能
 */
public class FileTest06 {
    public static void main(String[] args) {
        File file = new File(FilePaths.myTestPath);
        String names[] = file.list(new FilenameFilter() {
            @Override
            public boolean accept(File dir, String name) {
                if (dir.isFile()){
                    return name.endsWith(".txt");
                }else {
                    return false;
                }
            }
        });
        int i = 0;
        assert names != null;
        for (String s : names) {
            System.out.println(s);
            i++;
        }
        System.out.println(i);
    }
}
```
#### 按照层级打印目录下所有文件和文件夹
```java
import java.io.File;

/**
 * 从键盘接受路径并按照路径下文件的层级打印目录结构
 */
public class FileTest07 {

    public static void main(String[] args) {
        printFileWithLevel(FilePaths.myTestPath, 0);
    }

    static void printFileWithLevel(String path, int level) {
        File file = new File(path);
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < level; i++) {
            stringBuilder.append(" ");
        }
        if (file.isFile()) {
            System.out.println(stringBuilder + "❤" + file.getName());
        } else {
            System.out.println(stringBuilder + "💌" + file.getName());
        }
        File[] files = file.listFiles();
        assert files != null;
        for (File file1 : files) {
            if (file1.isFile()) {
                System.out.println(stringBuilder + " " + "❤" + file1.getName());
            } else {
                printFileWithLevel(file1.getAbsolutePath(), ++level);
                --level;
            }
        }
    }
}
```
## 序列化和反序列化
序列化市值将对象转换成序列进行传输，反之就可以称为反序列化。
支持序列化需要实现`Serializable`。
```java
import xyz.intellij.playground.basic.io.file.FilePaths;

import java.io.*;

/**
 * 保存测试类到硬盘并从硬盘读取还原
 */
public class ObjectOutput {
    public static void main(String[] args) {
        Student student = new Student();
        student.setId(String.valueOf(100));
        student.setName("zhangsan");
        saveObject(FilePaths.myTestPath + "object" + File.separator, "stu1.obj", student);
        System.out.println(readObject(FilePaths.myTestPath + "object" + File.separator, "stu1.obj"));
    }

    static void saveObject(String path, String name, Object obj) {
        try (
                ObjectOutputStream objectOutputStream = new ObjectOutputStream(new FileOutputStream(path + name))
        ) {
            objectOutputStream.writeObject(obj);
            objectOutputStream.flush();
        } catch (Exception e) {
            System.out.println("序列化失败或io异常");
            e.printStackTrace();
        }
    }

    static Object readObject(String path, String name) {
        try (
                ObjectInputStream objectInputStream = new ObjectInputStream(new FileInputStream(path + name));
        ) {
            return objectInputStream.readObject();
        } catch (Exception e) {
            System.out.println("序列化失败或io异常");
            e.printStackTrace();
        }
        return null;
    }
}
```
序列化和反序列化需要注意实体类型改动之后序列化会报错。为了防止报错可以将序列化id写死。
```java
import java.io.Serializable;

/**
 * Serializable 不包含方法用来标记对象
 */
public class Student implements Serializable {
    /*添加属性的时候反序列化会报错*/
    /*InvalidClassException*/
    /*如果不写这个则每次都是java自动生成一个id如果这个类修改了id也就变了*/
    private static final long serialVersionUID = -3401995999593411028L;
    private String name;
    private String id;
    /*transient修饰的字段不会被序列化*/
    transient private Integer age;
    private float weight;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public float getWeight() {
        return weight;
    }

    public void setWeight(float weight) {
        this.weight = weight;
    }

    @Override
    public String toString() {
        return "Student{" +
                "name='" + name + '\'' +
                ", id='" + id + '\'' +
                ", age=" + age +
                '}';
    }
}
```
