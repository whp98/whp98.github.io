# Oracle表结构导出

这是一个工具脚本


将TABLE_NAME替换成想要导出的表名即可导出

```sql
SELECT /*t.OWNER*/ 'DB', t.TABLE_NAME, t.COLUMN_ID, t.COLUMN_NAME
     , REGEXP_REPLACE(t1.COMMENTS, '[\(\)\（\）\的\ \n]') AS comments, t.data_type || '(' || t.data_length || ')' AS "数据类型"
     , CASE t2.PK WHEN 'Y' THEN t2.PK ELSE 'N' END     AS "是否主键", t.nullable AS "是允许为空", 'N' AS "代码表", 'N' AS "代码表引用"
FROM ALL_tab_columns t
         LEFT JOIN ALL_col_comments t1 ON t.TABLE_NAME = t1.TABLE_NAME AND t.COLUMN_NAME = t1.COLUMN_NAME
         LEFT JOIN (SELECT cu.OWNER, CU.TABLE_NAME, CU.COLUMN_NAME, 'Y' AS PK
    FROM ALL_cons_columns cu, ALL_constraints au
    WHERE cu.constraint_name = au.constraint_name AND au.constraint_type = 'P') t2
                   ON t.TABLE_NAME = t2.TABLE_NAME AND t.OWNER = t2.OWNER AND t.COLUMN_NAME = t2.COLUMN_NAME
WHERE UPPER(t.Table_Name) = UPPER('TABLE_NAME')
ORDER BY t.COLUMN_ID
```
