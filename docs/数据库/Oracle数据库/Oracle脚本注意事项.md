# Oracle脚本注意事项

Oracle数据脚本一般都会使用pl/sql执行或者使用命令行执行，有一些问题会导致脚本无法顺利执行，下面谈谈我遇到的案例。
## 转义

1. 字符串内的单引号需要通过自身来转义，如表达`'你好'`书写成`'''你好'''`
2. `&`符号，这个是用自身转义自身`&&`或者使用Chr(38)表示
3. `"`这个双引号可以用于报错非法字符,如`to_char(sysdate,'hh24"小时"mi"分"ss"秒"')`


## 结束符号
对于脚本中DECLARE结束，需要使用如下的结束符号结束。
```sql
END;
/
```
## 非法空行

表定义中如果在列中包含空行则会导致报错，如下的代码中N2_S下方就是一个空行，执行到这一行会导致后面的的 `）TAB ...`被当成一个单独的sql从而创建表报错。
```sql
CREATE TABLE TRSK_RPT_DATA_211213
(
    N1_S NUMBER(35, 8),
    N2_S NUMBER(35, 8)

) TABLESPACE MASTER_APP_DAT PCTFREE 10 INITRANS 1 MAXTRANS 255 STORAGE
(
    INITIAL 64K
    NEXT 1M
    MINEXTENTS 1
    MAXEXTENTS UNLIMITED
);
```