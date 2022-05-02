# 切面编程

## AOP通知
### 前置通知
在方法前执行
### 后置通知
在方法后执行，方法需要正常执行不能出现异常
### 环绕通知
在方法执行前后都可以执行的通知
### 异常通知
方法调用异常则通知
### 最终通知
在方法执行后执行，无论是否异常都会执行

## 例子

### 监控service方法执行时间
```java
@Aspect
@Component
public class ServiceLogAspect {
    private static final Logger logger = LoggerFactory.getLogger(ServiceLogAspect.class);
    /**
     * 切面表达式
     * execution
     * 第一处表示返回值类型 * : 全部返回值类型
     * 第二处表示包 xyz.intellij.shopdev.service.impl
     * 第三处表示 子包 ..
     * 第四处表示类 *
     * 第五处表示方法 .*()
     * 第六处表示任何参数 (..)
     */
    @Around("execution(* xyz.intellij.shopdev.service.impl..*.*(..))")
    public Object serviceTimeLog(ProceedingJoinPoint joinPoint) throws Throwable {
        logger.info("====开始执行{}.{}======", joinPoint.getTarget().getClass(), joinPoint.getSignature().getName());
        long begTime = System.currentTimeMillis();
        /*执行目标方法*/
        Object re = joinPoint.proceed();
        long endTime = System.currentTimeMillis();
        long takeTime = endTime - begTime;
        logger.info("====结束执行{}.{}======", joinPoint.getTarget().getClass(), joinPoint.getSignature().getName());
        if (takeTime > 3000) {
            logger.error("=======执行结束耗时:{}毫秒=========", takeTime);
        } else if (takeTime > 1000) {
            logger.warn("=======执行结束耗时:{}毫秒=========", takeTime);
        }
        return re;
    }
}
```