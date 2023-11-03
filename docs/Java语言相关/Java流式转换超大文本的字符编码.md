# Java流式转换超大文本的字符编码

使用powershell导出的mysqldump是utf-16 le的格式的文本。
在linux上需要使用utf-8的文本导入。这是本程序的由来。

程序使用java实现尽量使用buffered的io实现，可调节bufferSize，流式的读取文件，将原来的数据重新编码后写入新文件。

```java
import java.io.*;
import java.nio.charset.Charset;
import java.nio.charset.CharsetEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Stream;

/**
 * <p>Title: </p>
 * <p>Description:主要功能:流式的转换文件文件的编码,适用于超大型文本文件的处理
 * 测试使用321GB 29万行 的mysqldump文件(utf-16 le)，在增大bufferSize的时候可以用200MB每秒的速度写入(utf-8)
 * 写入后 占用空间 169GB
 * </p>
 *
 * @author whp98
 */
public class FileEncodeChanger {
    public static final String UTF8_BOM = "\uFEFF";
    //实测使用 8192 * 100000 会占用大约6G内存
    public static int bufferSize = 8192 * 100000;

    public static void convertEncoding(Path sourceFile, Path targetFile, Charset sourceCharset, Charset targetCharset) throws IOException {
        CharsetEncoder encoder = targetCharset.newEncoder();
        try (Stream<String> lines = Files.lines(sourceFile, sourceCharset);
             Writer writerOp = new OutputStreamWriter(Files.newOutputStream(targetFile, StandardOpenOption.CREATE, StandardOpenOption.WRITE), encoder);
             BufferedWriter writer = new BufferedWriter(writerOp, bufferSize)
        ) {
            AtomicLong currentLine = new AtomicLong(0L);
            lines.forEach(line -> {
                try {
                    currentLine.getAndIncrement();
                    if (currentLine.get() == 1) {
                        if (line.startsWith(UTF8_BOM)) {
                            line = line.substring(1);
                        }
                        writer.write(line);
                    } else {
                        writer.write(line);
                    }
                    if (currentLine.get() % 10000 == 0) {
                        System.out.printf("write %s", (currentLine.get() / 10000) + "万 \n");
                    }
                    writer.newLine();
                } catch (IOException e) {
                    throw new UncheckedIOException(e);
                }
            });
        }
    }

    public static void main(String[] args) {
        Path sourceFile = Paths.get("D:\\mysql57\\mysql-5.7.31-winx64\\bin\\all231101.sql"); // 修改为实际文件路径
        Path targetFile = Paths.get("F:\\all231101-utf8.sql"); // 修改为实际文件路径
        Charset sourceCharset = StandardCharsets.UTF_16LE; // 源文件编码
        Charset targetCharset = StandardCharsets.UTF_8; // 目标文件编码
        try {
            convertEncoding(sourceFile, targetFile, sourceCharset, targetCharset);
            System.out.println("文件编码转换完成！");
        } catch (IOException e) {
            throw new RuntimeException("文件操作失败:" + e.getMessage(), e);
        }
    }
}

```
