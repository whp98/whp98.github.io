# Quarkus的Panache让你写数据库交互更加简单

## 官网介绍

https://cn.quarkus.io/guides/hibernate-orm-panache

## 如何简单使用

### 1. 创建实体类

```java
@Entity
public class Book {
    @Id
    Long id;

    String title;

    String author;

   ......
}
```
### 2.继承PanacheEntity

```java
@Entity
public class Book extends PanacheEntity {
...
}
```

### 3.使用
```java
PanacheQuery<PanacheEntityBase> all = Book.findAll(Sort.by("id", Sort.Direction.Descending));
return Result.ok(all.firstResult());
```

### 4.分页查询

```java
PanacheQuery<Book> all = Book.findAll(Sort.by("id", Sort.Direction.Descending)).page(dto.getCurrentPage() - 1, dto.getPageSize());
```