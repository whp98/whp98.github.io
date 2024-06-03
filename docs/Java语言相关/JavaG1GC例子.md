# Java G1GC例子带注释

```text 
# gc设置 beg
# 初始化堆内存
-Xms10G
# 最大堆内存
-Xmx20G
# 设置新生代大小为5GB
-Xmn5G
# 使用G1垃圾收集器
-XX:+UseG1GC
# 设置GC最大停顿时间为200ms
-XX:MaxGCPauseMillis=200
# 开启字符串去重
-XX:+UseStringDeduplication
# 优化字符串连接
-XX:+OptimizeStringConcat
# 设置垃圾收集线程数为8
-XX:ParallelGCThreads=8
# 设置并发垃圾收集线程数为2
-XX:ConcGCThreads=2
# 使用线程本地分配缓冲区
-XX:+UseTLAB
# 优化NUMA架构的内存分配
-XX:+UseNUMA
# 不自动选择堆区大小
-XX:-UseAdaptiveSizePolicy
# 打印GC详细日志
-XX:+PrintGCDetails
# 打印GC时间戳
-XX:+PrintGCTimeStamps
# 打印GC日期戳
-XX:+PrintGCDateStamps
# 设置GC日志文件的输出路径
-Xloggc:gc.log
#设置内存dump文件的输出路径
# -XX:HeapDumpPath=heapdump.hprof
# -XX:+HeapDumpOnOutOfMemoryError
# gc设置 end
```
