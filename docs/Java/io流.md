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

