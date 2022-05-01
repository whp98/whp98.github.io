# Spring Boot事务

## Spring使用注解开启事务的方式

Spring boot应用中默认开启了事务而Spring框架需要加上注解才行`@EnableTransactionManagement`
下面两个是使用的例子。

### 注解自动开启事务
```java
@Override
    @Transactional(propagation = Propagation.REQUIRED)
    public void save1() {
        System.out.println("save1开启事务" + (TransactionSynchronizationManager.isActualTransactionActive() ? "是" : "否"));
        Users users = new Users();
        Random random = new Random();
        int id = random.nextInt();
        users.setId("111" + id);
        users.setUsername("sdsasd" + id);
        users.setUpdatedTime(new Date());
        users.setFace("s");
        users.setCreatedTime(new Date());
        users.setPassword("sdsad");
        userService.saveUser(users);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void save2() {
        System.out.println("save2开启事务" + (TransactionSynchronizationManager.isActualTransactionActive() ? "是" : "否"));
        Users users = new Users();
        Random random = new Random();
        int id = random.nextInt();
        users.setId("111" + id);
        users.setUsername("sdsasd" + id);
        users.setUpdatedTime(new Date());
        users.setFace("s");
        users.setCreatedTime(new Date());
        users.setPassword("sdsad");
        userService.saveUser(users);
    }
```

### 手动开启事务
```java
@Autowired
    DataSourceTransactionManager transactionManager;
    @Override
    public void save3() {
        DefaultTransactionDefinition def = new DefaultTransactionDefinition();
        def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW); // 事物隔离级别
        TransactionStatus status = transactionManager.getTransaction(def);// 事务状态
        try {
            Users users = new Users();
            Random random = new Random();
            int id = random.nextInt();
            users.setId("111" + id);
            users.setUsername("sdsasd" + id);
            users.setUpdatedTime(new Date());
            users.setFace("s");
            users.setCreatedTime(new Date());
            users.setPassword("sdsad");
            userService.saveUser(users);
            transactionManager.commit(status);
        } catch (Exception e) {
            transactionManager.rollback(status);
        }
    }
```

## 测试事务的注意事项
事务注解必须加在方法的public方法上，只有直接调用public方法事务才会生效。

如果是同一个bean中的不支持事务的方法，调用其他支持事务的方法也是无效的（会发现没有事务）。

事务一般加在service层，加在controller是无效的，当然可以手动配置，让事务在controller生效但是没有这个必要。

更多的请参考[@Transactional和Propagation的使用](https://blog.csdn.net/scgyus/article/details/105141107)

## 事务传播

### REQUIRED

字面上理解是需要的必须的，这个事务级别的行为如下
1. 如果没有就创建
2. 如果有事务（父方法开启了）就加入

这个事务一般用于一般的增删改。

### SUPPORTS

字面上意思是支持事务的，但是没有强制的意思。行为如下
1. 没有就没有按照没有事务执行
2. 父方法或者说调用者开启了事务就加入到事务中

### MANDATORY
强制的，不开事务就抛出异常。行为
1. 调用者，开启了事务就加入事务中
2. 调用者没有开启事务，就抛出异常

### REQUIRES_NEW
新建一个事务开启，并挂起原来的事务。
1. 原来有事务，那么开启新的事务，这个事务和原来的事务无关，回滚也只是回滚本事务，而不会影响原来事务
2. 原来事务会挂起，等待这个事务执行完毕之后，原来的事务会继续执行。

### NOT_SUPPORTS
不使用事务。行为如下。
1. 调用者开启了事务，但是到这个方法挂起了原来事务，用无事务的方式执行此方法。执行完毕之后再回到原来的事务。
2. 调用者没有开启事务，直接执行，不会开启事务。

### NEVER
强制不使用事务。行为如下。
1. 调用者开启了事务，直接抛出异常
2. 调用者没有开启事务，直接执行，不开启事务。

### NESTED
如果存在事务那么成为子事务，否则就新建一个事务。
1. 调用者开启事务，成为子事务
2. 调用者没有开启事务，新建一个事务

这里和`REQUIRES_NEW`的区别是嵌套或父子事务是一起提交的。
而新建事务则是单独提交的。主方法异常会导致子事务回滚而新建的事务则不会收到影响。

子事务出现异常可以在父事务决定是否一起回滚，可以视情况决定是否主动回滚。

