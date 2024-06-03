# Oracle转MySQL5.7语法

## ROW_NUMBER() OVER() 转会话变量
oracle语句
```sql
SELECT TR2.HH_CODE,
       TR2.RANK,
       TR2.RANK_NUM,
       ROW_NUMBER() OVER (PARTITION BY TR2.HH_CODE ORDER BY TR2.DATE DESC) RN
FROM TABLE_XX TR2
WHERE TR2.DATE >='2022-10-10' and TR2.DATE < '2022-11-10'
```
mysql语句
```sql
SELECT TR2.HH_CODE,
       TR2.RANK,
       TR2.RANK_NUM,
       (@row_number := CASE WHEN @prev_values = TR2.HH_CODE THEN @row_number + 1 ELSE 1 END) AS RN,
       @prev_values := TR2.HH_CODE                                                           AS dummy
FROM TABLE_XX TR2
         JOIN
         (SELECT @row_number := 0, @prev_values := '') AS vars
WHERE TR2.DATE >= '2022-10-10'
  and TR2.DATE < '2022-11-10'
order by TR2.HH_CODE, TR2.DATE desc
```
会话变量会在排序之后进行。如果多个字段分区就需要把多个字段拼起来赋值。

## NVL函数转 IFNULL 或者COALESCE

这个就不贴sql，主要注意部分是，coalesce这个多个变量的时候数据类型要注意这个函数两个库都可以用，但是数据类型要一致，要不然会报错。

## DECODE转 CASE WHEN THEN 语句
oracle语句
```sql
select decode(1,1,'是','否') from dual;
```
mysql语句
```sql
select case when 1=1 then '是' else '否' end from dual;
```

## MERGE INTO 转 先删除后插入(在java种完成数据数据更新后插入)

merge into 也可以用mysql的 insert on duplicate key代替前提是merge into 的关联条件是主键。

## LIST_AGG 使用 group_concat代替

如果需要排序,写法有些不同，注意一下。

## LAG函数进行改造，数据排序后把需要进行偏移关联的部分在java中实现

这个比较简单主要是一个for循环就搞定，主要注意偏移的量和取数据的时候的有序性。

## '||' 使用concat进行代替
这个需要注意 mysql的concat支持多变量数据，oracle只能两个变量，所以多拼接的时候需要嵌套concat


## MYSQL所有嵌套都必须有别名
oracle 的语句需要检查是不是都有别名。