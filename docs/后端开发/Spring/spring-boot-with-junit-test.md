# springboot添加junit测试

### 添加pom依赖

```xml
<!--测试支持-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
```


### 在test包下面创建测试类并编写用例

下面是我实际使用的时候使用的代码。

```java
@SpringBootTest
public class SelectTest {
    @Resource
    ShowDataService showDataService;

    @Test
    public void ssLikeTest() {
        System.out.println();
        long t1 = System.currentTimeMillis();
        for (int i = 0; i < 100; i++) {
            showDataService.getListBySs("123");
        }


        long t2 = System.currentTimeMillis();
    }


}
```