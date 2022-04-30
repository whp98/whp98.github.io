## Mapper文件idea爆红解决


本文参考[知识拂柳玉龙00](https://wenku.baidu.com/view/fbfc1d6a306c1eb91a37f111f18583d049640fe9.html)

解决`@Autowired`爆红的⽅案有四个：
1. mapper加⼊@Mapper注解（启动类可省去@MapperScan）,因为@Mapper的⽂件会被去⾃动扫描注⼊，但是需要全体Mapper⽂件都加

2. mapper加⼊@Repository注解（启动类必须加@MapperScan）

3. mapper加⼊@Component注解（启动类必须加@MapperScan）

4. 改@Autowired为@Resource,但程序运⾏报不报错还取决于mapper注⼊正确与否（看mapper⽂件⽤了什么注解以及启动类是否配了@MapperScan）


简单来说就是两种情况：
- 启动类配置了@MapperScan且路径正确，mapper接口可以不配任何注解（当然你也可以随意写上@Mapper，@Respository,@Component注解，不会有任何影响）
- 启动类未配置了@MapperScan，则Mapper接口必须配置@Mapper注解


我的解决方案如下：

启动类加@MapperScan 配合使⽤ @Resource （替换@Autowired）

