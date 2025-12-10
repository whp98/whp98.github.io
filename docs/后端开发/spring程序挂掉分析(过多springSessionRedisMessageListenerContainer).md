# spring程序挂掉分析(过多springSessionRedisMessageListenerContainer)

## 报错日志

```text
Java HotSpot(TM) 64-Bit Server VM warning: Attempt to protect stack guard pages failed.
Java HotSpot(TM) 64-Bit Server VM warning: Attempt to deallocate stack guard pages failed.
Java HotSpot(TM) 64-Bit Server VM warning: INFO: os::commit_memory(0x0000147b9ce2e000, 12288, 0) failed; error='Cannot allocate memory' (errno=12)
#
# There is insufficient memory for the Java Runtime Environment to continue.
# Native memory allocation (mmap) failed to map 12288 bytes for committing reserved memory.
# An error report file with more information is saved as:
# /home/x/x/hs_err_pid123.log

```


分析log

```text
Java Threads: ( => current thread )
=>0x0000147d9ffe7000 JavaThread "springSessionRedisMessageListenerContainer-326036" [_thread_new, id=142297, stack(0x0000147b9ce2e000,0x0000147b9cf2f000)]
  0x0000147d9ffe5000 JavaThread "springSessionRedisMessageListenerContainer-326035" [_thread_in_native, id=142296, stack(0x0000147b9cf2f000,0x0000147b9d030000)]
  0x0000147d9ffe3000 JavaThread "springSessionRedisMessageListenerContainer-326034" [_thread_blocked, id=142295, stack(0x0000147b9d030000,0x0000147b9d131000)]
  0x0000147d9ffe1000 JavaThread "springSessionRedisMessageListenerContainer-326033" [_thread_blocked, id=142294, stack(0x0000147b9d131000,0x0000147b9d232000)]
  0x0000147d9ffdf000 JavaThread "springSessionRedisMessageListenerContainer-326032" [_thread_blocked, id=142293, stack(0x0000147b9d232000,0x0000147b9d333000)]
  0x0000147d9ffdd000 JavaThread "springSessionRedisMessageListenerContainer-326031" [_thread_blocked, id=142292, stack(0x0000147b9d333000,0x0000147b9d434000)]
  0x0000147d9ffdb000 JavaThread "springSessionRedisMessageListenerContainer-326030" [_thread_blocked, id=142291, stack(0x0000147b9d434000,0x0000147b9d535000)]

```

也就是创建了很多线程卡住了

## 疑似key过期太多导致的，模拟

```python
import redis
import time

r = redis.Redis(host='localhost'
                , port=6379, decode_responses=True
                )

for j in range(10):
    start = time.time()
    pipe = r.pipeline()
    for i in range(40*10000):
        # pipe.setex(f"session:{i}", 10, f"value-{i}")  # 10秒后过期
        pipe.setex(f"bbbb:{i}", 10, f"value-{i}")  # 10秒后过期
        
    pipe.execute()  # 批量提交
    end = time.time()
    print(f"写入完成，耗时: {end - start:.2f} 秒")
    print("等待 10 秒后，将触发大规模过期事件...")


```

19万key同时过期导致卡死

## 参考文章
https://blog.csdn.net/javaee_ssh/article/details/76896132


创建线程池之后重新测试
```xml
<bean id="springSessionRedisTaskExecutor" class="org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor">
		<!-- 核心线程数 -->
		<property name="corePoolSize" value="10" />
		<!-- 最大线程数 -->
		<property name="maxPoolSize" value="300" />
		<!-- 队列最大长度 -->
		<property name="queueCapacity" value="500" />
		<!-- 线程池维护线程所允许的空闲时间，默认为60s -->
		<property name="keepAliveSeconds" value="60" />
</bean>
```
或者代码创建
```Java
    @Bean("springSessionRedisTaskExecutor")
    @ConditionalOnProperty(name = "XX.cacheType", havingValue = "redis", matchIfMissing = true)
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        // 核心线程数
        executor.setCorePoolSize(10);
        // 最大线程数
        executor.setMaxPoolSize(20);
        // 队列最大长度
        executor.setQueueCapacity(500);
        // 线程池维护线程所允许的空闲时间，默认为60s
        executor.setKeepAliveSeconds(60);
        executor.setThreadNamePrefix("redis-listener-executor-");
        logger.info("Init redis task executor [corePoolSize: {}, maxPoolSize: {}, queueCapacity: {}, keepAliveSeconds: {}]",
                executor.getCorePoolSize(), executor.getMaxPoolSize(), executor.getQueueCapacity(), executor.getKeepAliveSeconds());
        return executor;
    }
```
问题解决