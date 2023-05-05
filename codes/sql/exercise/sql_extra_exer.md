# SQL 附加题

> 先点到这里的，建议先去看看[SQL练习](/codes/sql/exercise/sql_exercise.md)哦


相应的建表语句和模拟数据👉[点这里哦](/codes/sql/exercise/sql_exer_extra_table.md)👈

有 3 个表 S(学生表)，C（课程表），SC（学生选课表）
- S（SNO，SNAME）代表（学号，姓名）
- C（CNO，CNAME，CTEACHER）代表（课号，课名，教师）
- SC（SNO，CNO，SCGRADE）代表（学号，课号，成绩）

# 问题
1. 找出没选过“黎明”老师的所有学生姓名。
2. 列出2门以上（含2门）不及格学生姓名及平均成绩。
3. 找出学过1号课程又学过2号课所有学生的姓名。

# 解答

## 找出没选过“黎明”老师的所有学生姓名
- 没选课
- 选课了但是没有选“黎明”老师

```sql
select distinct s.sname
from s
    left join sc on s.sno = sc.sno
    left join c on c.cno = sc.cno
where
    c.cteacher <> '黎明'
    or c.cno is null;
```


```sh
mysql> select distinct s.sname
    -> from s
    -> left join sc on s.sno = sc.sno
    -> left join c on c.cno = sc.cno
    -> where c.cteacher <> '黎明' or c.cno is null;
+--------+
| sname  |
+--------+
| 张三   |
| 李四   |
| 赵六   |
| 刘七   |
| 吴九   |
| 郑十   |
+--------+
6 rows in set (0.00 sec)
```


## 列出2门以上（含2门）不及格学生姓名及平均成绩

首先需要找出每个学生的不及格课程数量和总成绩，然后筛选出不及格课程数量大于等于 2 的记录，并计算平均成绩。

```sql
select
    s.sname,
    avg(sc.scgrade) as avgGrade
from s
    join sc on s.sno = sc.sno
group by s.sno, s.sname
having
    count(
        case
            when sc.scgrade < 60 then 1
        end
    ) >= 2;
```

```sh
mysql> select s.sname, avg(sc.scgrade) as avgGrade
    -> from s
    -> join sc
    -> on s.sno = sc.sno
    -> group by s.sno, s.sname
    -> having count(case when sc.scgrade < 60 then 1 end) >= 2;
+--------+-----------+
| sname  | avgGrade  |
+--------+-----------+
| 刘七   | 59.933333 |
+--------+-----------+
1 row in set (0.01 sec)
```

## 找出学过C001号课程又学过C002号课所有学生的姓名

### 子查询实现

```sql
select distinct s.sname
from s
where s.sno in (
        select sc1.sno
        from sc sc1
            join sc sc2 on sc1.sno = sc2.sno
        where
            sc1.cno = 'C001'
            and sc2.cno = 'C002'
    );
```

```sh
mysql> select distinct s.sname
    -> from s
    -> where s.sno in (
    -> select sc1.sno
    -> from sc sc1
    -> join sc sc2
    -> on sc1.sno = sc2.sno
    -> where sc1.cno = 'C001' and sc2.cno = 'C002');
+--------+
| sname  |
+--------+
| 李四   |
| 刘七   |
+--------+
2 rows in set (0.01 sec)
```

### 使用INTERSECT实现

```sql
select distinct sname
from s
where sno in (
        select sno
        from sc
        where cno = 'C001'
        intersect
        select sno
        from sc
        where cno = 'C002'
    );
```

```sh
mysql> select distinct sname
    -> from s
    -> where sno in (
    -> select sno from sc where cno = 'C001' 
    -> intersect
    -> select sno from sc where cno = 'C002'
    -> );
+--------+
| sname  |
+--------+
| 李四   |
| 刘七   |
+--------+
2 rows in set (0.01 sec)
```

> SQL练习题暂时完结咯 ~~ 
> 
> Congratulations!!!