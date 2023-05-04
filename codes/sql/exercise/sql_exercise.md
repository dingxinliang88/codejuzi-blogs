# SQL 练习题

> <strong style="color:red">请在练习前执行对应的👉[建表语句](/codes/sql/exercise/sql_exer_tables.md)👈</strong>

## 1、取得每个部门最高薪水的人员名称

Step1: 取得每个部门最高薪水（按照部门编号分组，找出每一组的最大值）

```sql
select deptno, max(sal) as maxSal from emp group by deptno;
```

```sh
mysql> select deptno, max(sal) as maxSal from emp group by deptno;
+--------+---------+
| deptno | maxSal  |
+--------+---------+
|     20 | 3000.00 |
|     30 | 2850.00 |
|     10 | 5000.00 |
+--------+---------+
3 rows in set (0.00 sec)
```

Step2: 将Step1查询结果当做一张临时表t

t表和emp表联合查询，条件：`t.deptno=emp.deptno and t.maxSal=emp.sal`

```sql
select e.ename, t.*
from emp e
    join (
        select
            deptno,
            max(sal) as maxSal
        from emp
        group by
            deptno
    ) t on t.deptno = e.deptno
    and t.maxSal = e.sal;
```

```sh
mysql> select e.ename, t.*
    -> from emp e
    -> join (select deptno, max(sal) as maxSal from emp group by deptno) t
    -> on t.maxSal = e.sal and t.deptno = e.deptno;
+-------+--------+---------+
| ename | deptno | maxSal  |
+-------+--------+---------+
| BLAKE |     30 | 2850.00 |
| SCOTT |     20 | 3000.00 |
| KING  |     10 | 5000.00 |
| FORD  |     20 | 3000.00 |
+-------+--------+---------+
4 rows in set (0.00 sec)
```

## 2、哪些人的薪水在部门的平均薪水之上
Step1: 找出每个部分的平均薪水
```sql
select deptno, avg(sal) as avgSal from emp group by deptno;
```

```sh
mysql> select deptno, avg(sal) as avgSal from emp group by deptno;
+--------+-------------+
| deptno | avgSal      |
+--------+-------------+
|     20 | 2175.000000 |
|     30 | 1566.666667 |
|     10 | 2916.666667 |
+--------+-------------+
3 rows in set (0.00 sec)
```

Step2: 将Step1的查询结果当做一张临时表t

t表和emp表联合查询，条件：`t.deptno=emp.deptno and t.avgSal < emp.sal`

```sql
select t.*, e.ename, e.sal
from emp e
    join (
        select
            deptno,
            avg(sal) as avgSal
        from emp
        group by
            deptno
    ) t on e.deptno = t.deptno
    and e.sal > t.avgSal;
```

```sh
mysql> select t.*, e.ename, e.sal
    -> from emp e
    -> join (select deptno, avg(sal) as avgSal from emp group by deptno) t
    -> on t.deptno = e.deptno and e.sal > t.avgSal;
+--------+-------------+-------+---------+
| deptno | avgSal      | ename | sal     |
+--------+-------------+-------+---------+
|     30 | 1566.666667 | ALLEN | 1600.00 |
|     20 | 2175.000000 | JONES | 2975.00 |
|     30 | 1566.666667 | BLAKE | 2850.00 |
|     20 | 2175.000000 | SCOTT | 3000.00 |
|     10 | 2916.666667 | KING  | 5000.00 |
|     20 | 2175.000000 | FORD  | 3000.00 |
+--------+-------------+-------+---------+
6 rows in set (0.00 sec)
```

## 3、取得部门中（所有人的）平均的薪水等级
> ### 辨析
> - 平均的薪水等级：先计算每一个薪水的等级，然后找出薪水等级的平均值
> - 平均薪水的等级：先计算平均薪水，然后找出每个平均薪水的等级值

Step1: 找出每个人的薪水等级

emp表和salgrade表联合查询，条件：`e.sal between s.losal and s.hisal`

```sql
select
    e.ename,
    e.sal,
    e.deptno,
    s.grade
from emp e
    join salgrade s on e.sal between s.losal and s.hisal;
```

```sh
mysql> select e.ename, e.sal, e.deptno, s.grade
    -> from emp e
    -> join salgrade s
    -> on e.sal between s.losal and s.hisal;
+--------+---------+--------+-------+
| ename  | sal     | deptno | grade |
+--------+---------+--------+-------+
| SMITH  |  800.00 |     20 |     1 |
| ALLEN  | 1600.00 |     30 |     3 |
| WARD   | 1250.00 |     30 |     2 |
| JONES  | 2975.00 |     20 |     4 |
| MARTIN | 1250.00 |     30 |     2 |
| BLAKE  | 2850.00 |     30 |     4 |
| CLARK  | 2450.00 |     10 |     4 |
| SCOTT  | 3000.00 |     20 |     4 |
| KING   | 5000.00 |     10 |     5 |
| TURNER | 1500.00 |     30 |     3 |
| ADAMS  | 1100.00 |     20 |     1 |
| JAMES  |  950.00 |     30 |     1 |
| FORD   | 3000.00 |     20 |     4 |
| MILLER | 1300.00 |     10 |     2 |
+--------+---------+--------+-------+
14 rows in set (0.00 sec)
```

Step2: 基于Step1查询的结果按照deptno分组，求取grade的平均值

```sql
select e.deptno, avg(s.grade)
from emp e
    join salgrade s on e.sal between s.losal and s.hisal
group by e.deptno;
```

```sh
mysql> select e.deptno, avg(s.grade)
    -> from emp e
    -> join salgrade s
    -> on e.sal between s.losal and s.hisal
    -> group by deptno;
+--------+--------------+
| deptno | avg(s.grade) |
+--------+--------------+
|     20 |       2.8000 |
|     30 |       2.5000 |
|     10 |       3.6667 |
+--------+--------------+
3 rows in set (0.01 sec)
```

## 4、不使用函数Max，取得最高薪水
### 方案一： 按照sal降序，limit 1
```sql
select ename, sal from emp order by sal desc limit 1;
```

```sh
mysql> select ename, sal from emp order by sal desc limit 1;
+-------+---------+
| ename | sal     |
+-------+---------+
| KING  | 5000.00 |
+-------+---------+
1 row in set (0.00 sec)
```

### 方案二：表的自连接

```sql
select ename, sal
from emp
where sal not in(
        select distinct a.sal
        from emp a
            join emp b on a.sal < b.sal
    );
```

子查询使用了联结（JOIN）操作，将emp表自身连接两次（a 和 b），并找出a表中薪资比b表中薪资低的记录。然后，使用 DISTINCT关键字去重，以避免在主查询中出现重复的低薪数据集合。主查询从 emp 表中找出所有不在这个子查询结果集合中的薪资值，也就是所有薪资水平处于高位s员工薪资数据。


```sh
mysql> select ename, sal 
    -> from emp 
    -> where sal not in (
    -> 	select distinct a.sal from emp a join emp b on a.sal < b.sal
    -> );
+-------+---------+
| ename | sal     |
+-------+---------+
| KING  | 5000.00 |
+-------+---------+
1 row in set (0.01 sec)
```

## 5、取得平均薪水最高的部门的部门编号

### 方案一：按照平均薪水降序取第一个
Step1: 找出每个部门的平均薪水

```sql
select deptno, avg(sal) as avgSal from emp group by deptno;
```

```sh
mysql> select deptno, avg(sal) as avgSal from emp group by deptno;
+--------+-------------+
| deptno | avgSal      |
+--------+-------------+
|     20 | 2175.000000 |
|     30 | 1566.666667 |
|     10 | 2916.666667 |
+--------+-------------+
3 rows in set (0.00 sec)
```

Step2: 降序取第一个

```sql
select
    deptno,
    avg(sal) as avgSal
from emp
group by deptno
order by avgSal
limit 1;
```

```sh
mysql> select deptno, avg(sal) as avgSal from emp group by deptno order by avgSal desc limit 1;
+--------+-------------+
| deptno | avgsal      |
+--------+-------------+
|     10 | 2916.666667 |
+--------+-------------+
1 row in set (0.00 sec)
```

### 方案二：max
Step1: 找出每个部门的平均薪水

```sql
select deptno, avg(sal) as avgSal from emp group by deptno;
```

```sh
mysql> select deptno, avg(sal) as avgSal from emp group by deptno;
+--------+-------------+
| deptno | avgSal      |
+--------+-------------+
|     20 | 2175.000000 |
|     30 | 1566.666667 |
|     10 | 2916.666667 |
+--------+-------------+
3 rows in set (0.00 sec)
```

Step2: 找出Step1查询结果avgSal最大的值

```sql
select max(t.avgSal)
from (
        select
            deptno,
            avg(sal) as avgSal
        from emp
        group by deptno
    ) t;
```

```sh
mysql> select max(t.avgSal) from (select deptno, avg(sal) as avgSal from emp group by deptno) t;
+---------------+
| max(t.avgSal) |
+---------------+
|   2916.666667 |
+---------------+
1 row in set (0.00 sec)
```

Step3: 按照deptno分组，找出与Step2查询结果匹配的最大平均薪水

```sql
select
    deptno,
    avg(sal) as avgSal
from emp
group by deptno
having avgSal = (
        select max(t.avgSal)
        from (
                select avg(sal) as avgSal
                from emp
                group by deptno
            ) t
    );
```

```sh
mysql> select deptno, avg(sal) as avgSal
    -> from emp 
    -> group by deptno 
    -> having avgSal = (select max(t.avgSal) from (select deptno, avg(sal) as avgSal from emp group by deptno) t);
+--------+-------------+
| deptno | avgSal      |
+--------+-------------+
|     10 | 2916.666667 |
+--------+-------------+
1 row in set (0.00 sec)
```

## 6、取得平均薪水最高的部门的部门名称

dept表和emp表联合查询，条件：`e.deptno = d.deptno`，根据部门名称分组，按照平均薪水降序排序取第一个

```sql
select
    d.dname,
    avg(e.sal) as avgsal
from dept d
    join emp e on e.deptno = d.deptno
group by d.dname
order by avgsal desc
limit 1;
```

```sh
mysql> select d.dname, avg(e.sal) as avgSal
    -> from dept d
    -> join emp e
    -> on e.deptno = d.deptno 
    -> group by d.dname
    -> order by avgSal desc
    -> limit 1;
+------------+-------------+
| dname      | avgSal      |
+------------+-------------+
| ACCOUNTING | 2916.666667 |
+------------+-------------+
1 row in set (0.00 sec)
```

## 7、求平均薪水的等级最低的部门的部门名称

> 薪水等级：
> - 1: 700 ~ 1200
> - 2: 1201 ~ 1400
> - 3: 1401 ~ 2000
> - 4: 2001 ~ 3000
> - 5: 3001 ~ 9999

Step1: 找出每个部门的平均薪水

```sql
select deptno, avg(sal) as avgSal from emp group by deptno;
```

```sh
mysql> select deptno, avg(sal) as avgSal from emp group by deptno;
+--------+-------------+
| deptno | avgSal      |
+--------+-------------+
|     20 | 2175.000000 |
|     30 | 1566.666667 |
|     10 | 2916.666667 |
+--------+-------------+
3 rows in set (0.00 sec)
```

Step2: 找出每个部门平均薪水的等级

将Stpe1的查询结果t与`salgrade`表联查，条件：`t.avgSal between s.losal and s.hisal`，然后按照薪水等级升序排序取第一个

```sql
select t.*, s.grade
from (
        select
            d.dname,
            avg(sal) as avgsal
        from emp e
            join dept d on e.deptno = d.deptno
        group by d.dname
    ) t
    join salgrade s on t.avgsal between s.losal and s.hisal
order by s.grade
limit 1;
```

```sh
mysql> select t.*, s.grade
    -> from (select d.dname, avg(e.sal) as avgSal from emp e join dept d on e.deptno = d.deptno group by d.dname) t
    -> join salgrade s
    -> on t.avgSal between s.losal and s.hisal
	-> order by s.grade
	-> limit 1;
+-------+-------------+-------+
| dname | avgSal      | grade |
+-------+-------------+-------+
| SALES | 1566.666667 |     3 |
+-------+-------------+-------+
1 row in set (0.00 sec)
```

> 或者
>
> ```sql
> select t.*, s.grade
> from (
>         select
>             d.dname,
>             avg(sal) as avgsal
>         from emp e
>             join dept d on e.deptno = d.deptno
>         group by d.dname
>     ) t
>     join salgrade s on t.avgsal between s.losal and s.hisal
> where s.grade = (
>         select grade
>         from salgrade
>         where (
>                 select avg(sal) as avgsal
>                 from emp
>                 group by deptno
>                 order by avgsal asc
>                 limit 1
>             ) between losal and hisal
>     );
> ```

> ### 思考：最低等级怎么看？
>
> 平均薪水最低的对应的等级一定最低
>
> ```sql
> select avg(sal) as avgsal
> from emp
> group by deptno
> order by avgsal
> limit 1;
> ```
> 
>   ```sh
> mysql> select avg(sal) as avgsal from emp group by deptno order by avgsal asc limit 1;
>   +-------------+
> | avgsal      |
>+-------------+
> | 1566.666667 |
> +-------------+
> 1 row in set (0.00 sec)
> ```
> 
> 
> 
> ```sql
> select grade
>from salgrade
> where (
>        select avg(sal) as avgsal
>         from emp
>         group by deptno
>         order by avgsal asc
>         limit 1
>       ) between losal and hisal;
>   ```
>   
>   ```sh
>   mysql> select grade from salgrade where (select avg(sal) as avgsal from emp group by deptno order by avgsal asc limit 1) between losal and hisal;
> +-------+
> | grade |
>+-------+
> |     3 |
> +-------+
> 1 row in set (0.00 sec)
> ```


## 8、取得比普通员工(员工代码没有在 mgr 字段上出现的) 的最高薪水还要高的领导人姓名

> ```sh
> mysql> select distinct(mgr) from emp where mgr is not null;
> +------+
> | mgr  |
> +------+
> | 7902 |
> | 7698 |
> | 7839 |
> | 7566 |
> | 7788 |
> | 7782 |
> +------+
> 6 rows in set (0.00 sec)
> ``` 
> 员工编号没有以上范围出现的都是普通员工
>

Step1: 找出普通员工的最高薪水

📢注意：not in在使用的时候，后面的范围一定要排除null

```sql
select max(sal) as maxSal
from emp
where empno not in (
        select distinct(mgr)
        from emp
        where mgr is not null
    );
```


```sh
mysql> select max(sal) as maxSal from emp where empno not in (select distinct(mgr) from emp where mgr is not null);
+---------+
| maxSal  |
+---------+
| 1600.00 |
+---------+
1 row in set (0.00 sec)
```

Step2: 找出工资高于Step1查出的maxSal

```sql
select ename, sal
from emp
where sal > (
        select max(sal) as maxSal
        from emp
        where empno not in (
                select distinct(mgr)
                from emp
                where mgr is not null
            )
    );
```

```sh
mysql> select ename, sal from emp where sal > (select max(sal) as maxSal from emp where empno not in (select distinct(mgr) from emp where mgr is not null));
+-------+---------+
| ename | sal     |
+-------+---------+
| JONES | 2975.00 |
| BLAKE | 2850.00 |
| CLARK | 2450.00 |
| SCOTT | 3000.00 |
| KING  | 5000.00 |
| FORD  | 3000.00 |
+-------+---------+
6 rows in set (0.00 sec)
```

## 9、取得薪水最高的前五名员工

```sql
select ename, sal from emp order by sal desc limit 5;
```

```sh
mysql> select ename, sal from emp order by sal desc limit 5;
+-------+---------+
| ename | sal     |
+-------+---------+
| KING  | 5000.00 |
| SCOTT | 3000.00 |
| FORD  | 3000.00 |
| JONES | 2975.00 |
| BLAKE | 2850.00 |
+-------+---------+
5 rows in set (0.00 sec)
```


## 10、取得薪水最高的第六到第十名员工

```sql
select ename, sal from emp order by sal desc limit 5, 5;
```

```sh
mysql> select ename, sal from emp order by sal desc limit 5, 5;
+--------+---------+
| ename  | sal     |
+--------+---------+
| CLARK  | 2450.00 |
| ALLEN  | 1600.00 |
| TURNER | 1500.00 |
| MILLER | 1300.00 |
| WARD   | 1250.00 |
+--------+---------+
5 rows in set (0.00 sec)
```

## 11、找出最后入职的5名员工

日期可以升序也可以降序

```sql
select ename, hiredate from emp order by hiredate desc limit 5;
```


```sh
mysql> select ename, hiredate from emp order by hiredate desc limit 5;
+--------+------------+
| ename  | hiredate   |
+--------+------------+
| ADAMS  | 1987-05-23 |
| SCOTT  | 1987-04-19 |
| MILLER | 1982-01-23 |
| FORD   | 1981-12-03 |
| JAMES  | 1981-12-03 |
+--------+------------+
5 rows in set (0.00 sec)
```

## 12、取得每个薪水等级有多少员工

Step1: 找出每个员工的薪水等级

```sql
select e.ename, e.sal, s.grade
from emp e
    join salgrade s on e.sal between s.losal and s.hisal;
```

```sh
mysql> select e.ename, e.sal, s.grade 
    -> from emp e
    -> join salgrade s
    -> on e.sal between s.losal and s.hisal;
+--------+---------+-------+
| ename  | sal     | grade |
+--------+---------+-------+
| SMITH  |  800.00 |     1 |
| ALLEN  | 1600.00 |     3 |
| WARD   | 1250.00 |     2 |
| JONES  | 2975.00 |     4 |
| MARTIN | 1250.00 |     2 |
| BLAKE  | 2850.00 |     4 |
| CLARK  | 2450.00 |     4 |
| SCOTT  | 3000.00 |     4 |
| KING   | 5000.00 |     5 |
| TURNER | 1500.00 |     3 |
| ADAMS  | 1100.00 |     1 |
| JAMES  |  950.00 |     1 |
| FORD   | 3000.00 |     4 |
| MILLER | 1300.00 |     2 |
+--------+---------+-------+
14 rows in set (0.00 sec)
```

Step2: 按照薪水等级分组统计

```sql
select s.grade, count(1)
from emp e
    join salgrade s on e.sal between s.losal and s.hisal
group by s.grade;
```

```sh
mysql> select s.grade, count(1) 
    -> from emp e
    -> join salgrade s
    -> on e.sal between s.losal and s.hisal
    -> group by s.grade;
+-------+----------+
| grade | count(1) |
+-------+----------+
|     1 |        3 |
|     3 |        2 |
|     2 |        3 |
|     4 |        5 |
|     5 |        1 |
+-------+----------+
5 rows in set (0.00 sec)
```

## 13、列出所有员工及领导的姓名

```sql
select
    a.ename '员工',
    b.ename '领导'
from emp a
    left join emp b on a.mgr = b.empno;
```

这里使用`left join`是为了保证员工是都被查询到的，因为最顶级的领导是没有领导的，具体的可以观察下面查询结果
`| KING   | NULL   |`

```sh
mysql> select a.ename '员工', b.ename '领导'
    -> from emp a
    -> left join emp b
    -> on a.mgr = b.empno;
+--------+--------+
| 员工   | 领导   |
+--------+--------+
| SMITH  | FORD   |
| ALLEN  | BLAKE  |
| WARD   | BLAKE  |
| JONES  | KING   |
| MARTIN | BLAKE  |
| BLAKE  | KING   |
| CLARK  | KING   |
| SCOTT  | JONES  |
| KING   | NULL   |
| TURNER | BLAKE  |
| ADAMS  | SCOTT  |
| JAMES  | BLAKE  |
| FORD   | JONES  |
| MILLER | CLARK  |
+--------+--------+
14 rows in set (0.00 sec)
```

## 14、列出受雇日期早于其直接上级的所有员工的编号、姓名、部门名称

emp表自连接查询，emp a => 员工表， emp b => 领导表

条件：`a.mgr = b.empno and a.hiredate < b.hiredate`

emp表和dept表联合查询，条件：`emp.deptno = dept.deptno`

```sql
select
    a.ename '员工',
    a.hiredate,
    b.ename '领导',
    b.hiredate,
    d.dname
from emp a
    join emp b on a.mgr = b.empno and a.hiredate < b.hiredate
    join dept d on a.deptno = d.deptno;
```

```sh
mysql> select a.ename '员工', a.hiredate, b.ename '领导', b.hiredate, d.dname
    -> from emp a 
    -> join emp b
    -> on a.mgr = b.empno and a.hiredate < b.hiredate
    -> join dept d
    -> on a.deptno = d.deptno;
+--------+------------+--------+------------+------------+
| 员工   | hiredate   | 领导   | hiredate   | dname      |
+--------+------------+--------+------------+------------+
| SMITH  | 1980-12-17 | FORD   | 1981-12-03 | RESEARCH   |
| ALLEN  | 1981-02-20 | BLAKE  | 1981-05-01 | SALES      |
| WARD   | 1981-02-22 | BLAKE  | 1981-05-01 | SALES      |
| JONES  | 1981-04-02 | KING   | 1981-11-17 | RESEARCH   |
| BLAKE  | 1981-05-01 | KING   | 1981-11-17 | SALES      |
| CLARK  | 1981-06-09 | KING   | 1981-11-17 | ACCOUNTING |
+--------+------------+--------+------------+------------+
6 rows in set (0.00 sec)
```

## 15、列出部门名称和这些部门的员工信息, 同时列出那些没有员工的部门

部门表dept要全部查询到

```sql
select e.*, d.dname
from emp e
    right join dept d on e.deptno = d.deptno;
```

```sh
mysql> select e.*, d.dname
    -> from emp e
    -> right join dept d
    -> on e.deptno = d.deptno;
+-------+--------+-----------+------+------------+---------+---------+--------+------------+
| EMPNO | ENAME  | JOB       | MGR  | HIREDATE   | SAL     | COMM    | DEPTNO | dname      |
+-------+--------+-----------+------+------------+---------+---------+--------+------------+
|  7934 | MILLER | CLERK     | 7782 | 1982-01-23 | 1300.00 |    NULL |     10 | ACCOUNTING |
|  7839 | KING   | PRESIDENT | NULL | 1981-11-17 | 5000.00 |    NULL |     10 | ACCOUNTING |
|  7782 | CLARK  | MANAGER   | 7839 | 1981-06-09 | 2450.00 |    NULL |     10 | ACCOUNTING |
|  7902 | FORD   | ANALYST   | 7566 | 1981-12-03 | 3000.00 |    NULL |     20 | RESEARCH   |
|  7876 | ADAMS  | CLERK     | 7788 | 1987-05-23 | 1100.00 |    NULL |     20 | RESEARCH   |
|  7788 | SCOTT  | ANALYST   | 7566 | 1987-04-19 | 3000.00 |    NULL |     20 | RESEARCH   |
|  7566 | JONES  | MANAGER   | 7839 | 1981-04-02 | 2975.00 |    NULL |     20 | RESEARCH   |
|  7369 | SMITH  | CLERK     | 7902 | 1980-12-17 |  800.00 |    NULL |     20 | RESEARCH   |
|  7900 | JAMES  | CLERK     | 7698 | 1981-12-03 |  950.00 |    NULL |     30 | SALES      |
|  7844 | TURNER | SALESMAN  | 7698 | 1981-09-08 | 1500.00 |    0.00 |     30 | SALES      |
|  7698 | BLAKE  | MANAGER   | 7839 | 1981-05-01 | 2850.00 |    NULL |     30 | SALES      |
|  7654 | MARTIN | SALESMAN  | 7698 | 1981-09-28 | 1250.00 | 1400.00 |     30 | SALES      |
|  7521 | WARD   | SALESMAN  | 7698 | 1981-02-22 | 1250.00 |  500.00 |     30 | SALES      |
|  7499 | ALLEN  | SALESMAN  | 7698 | 1981-02-20 | 1600.00 |  300.00 |     30 | SALES      |
|  NULL | NULL   | NULL      | NULL | NULL       |    NULL |    NULL |   NULL | OPERATIONS |
+-------+--------+-----------+------+------------+---------+---------+--------+------------+
15 rows in set (0.00 sec)
```


## 16、列出至少有 5 个员工的所有部门

按照部门编号分组、计数，筛选

```sql
select
    d.deptno,
    d.dname,
    count(*) as 'num'
from emp e
    join dept d on e.deptno = d.deptno
group by deptno
having num >= 5;
```

```sh
mysql> select d.deptno, d.dname, count(*) as 'num'
    -> from emp e 
    -> join dept d
    -> on e.deptno = d.deptno 
    -> group by deptno 
    -> having num >= 5;
+--------+----------+-----+
| deptno | dname    | num |
+--------+----------+-----+
|     20 | RESEARCH |   5 |
|     30 | SALES    |   6 |
+--------+----------+-----+
2 rows in set (0.00 sec)
```

## 17、列出薪金比"SMITH" 多的所有员工信息

子查询，先查出SMITH的薪金

```sql
select empno, ename, sal
from emp
where sal > (
        select sal
        from emp
        where ename = 'SMITH'
    );
```

```sh
mysql> select empno, ename, sal
    -> from emp 
    -> where sal > (select sal from emp where ename = 'SMITH');
+-------+--------+---------+
| empno | ename  | sal     |
+-------+--------+---------+
|  7499 | ALLEN  | 1600.00 |
|  7521 | WARD   | 1250.00 |
|  7566 | JONES  | 2975.00 |
|  7654 | MARTIN | 1250.00 |
|  7698 | BLAKE  | 2850.00 |
|  7782 | CLARK  | 2450.00 |
|  7788 | SCOTT  | 3000.00 |
|  7839 | KING   | 5000.00 |
|  7844 | TURNER | 1500.00 |
|  7876 | ADAMS  | 1100.00 |
|  7900 | JAMES  |  950.00 |
|  7902 | FORD   | 3000.00 |
|  7934 | MILLER | 1300.00 |
+-------+--------+---------+
13 rows in set (0.00 sec)
```

## 18、列出所有"CLERK"(办事员) 的姓名及其部门名称, 部门的人数

Step1: 找出所有办事员的姓名及其部门名称

```sql
select
    e.ename,
    e.job,
    d.deptno,
    d.dname
from emp e
    join dept d on e.deptno = d.deptno
where e.job = 'CLERK';
```

```sh
mysql> select e.ename, e.job, d.deptno, d.dname
    -> from emp e
    -> join dept d
    -> on e.deptno = d.deptno
    -> where e.job = 'CLERK';
+--------+-------+--------+------------+
| ename  | job   | deptno | dname      |
+--------+-------+--------+------------+
| SMITH  | CLERK |     20 | RESEARCH   |
| ADAMS  | CLERK |     20 | RESEARCH   |
| JAMES  | CLERK |     30 | SALES      |
| MILLER | CLERK |     10 | ACCOUNTING |
+--------+-------+--------+------------+
4 rows in set (0.00 sec)
```

Step2: 查询部门人数
```sql
select t1.*, t2.deptcount
from (
        select
            e.ename,
            e.job,
            d.deptno,
            d.dname
        from emp e
            join dept d on e.deptno = d.deptno
        where e.job = 'CLERK'
    ) t1
    join (
        select
            deptno,
            count(1) as deptcount
        from emp
        group by
            deptno
    ) t2 on t1.deptno = t2.deptno;
```

```sh
mysql> select t1.*, t2.deptcount
    -> from (select e.ename, e.job, d.deptno, d.dname from emp e join dept d on e.deptno = d.deptno where e.job = 'CLERK') t1
    -> join (select deptno, count(1) as deptcount from emp group by deptno) t2
    -> on t1.deptno = t2.deptno;
+--------+-------+--------+------------+-----------+
| ename  | job   | deptno | dname      | deptcount |
+--------+-------+--------+------------+-----------+
| SMITH  | CLERK |     20 | RESEARCH   |         5 |
| ADAMS  | CLERK |     20 | RESEARCH   |         5 |
| JAMES  | CLERK |     30 | SALES      |         6 |
| MILLER | CLERK |     10 | ACCOUNTING |         3 |
+--------+-------+--------+------------+-----------+
4 rows in set (0.00 sec)
```

## 19、列出最低薪金大于 1500 的各种工作及从事此工作的全部雇员人数

按照工作岗位分组求最小值

```sql

```

```sh
mysql> select job, count(1) from emp group by job having min(sal) > 1500;
+-----------+----------+
| job       | count(1) |
+-----------+----------+
| MANAGER   |        3 |
| ANALYST   |        2 |
| PRESIDENT |        1 |
+-----------+----------+
3 rows in set (0.00 sec)
```

## 20、列出在部门"SALES"<销售部> 工作的员工的姓名, 假定不知道销售部的部门编号

```sql
select ename
from emp
where deptno = (
        select deptno
        from dept
        where dname = 'SALES'
    );
```

```sh
mysql> select ename 
    -> from emp 
    -> where deptno = (select deptno from dept where dname = 'SALES');
+--------+
| ename  |
+--------+
| ALLEN  |
| WARD   |
| MARTIN |
| BLAKE  |
| TURNER |
| JAMES  |
+--------+
6 rows in set (0.00 sec)
```

## 21、列出薪金高于公司平均薪金的所有员工, 所在部门, 上级领导, 雇员的工资等级

```sql
select
    e.ename '员工',
    d.dname,
    l.ename '领导',
    s.grade
from emp e
    join dept d on e.deptno = d.deptno
    left join emp l on e.mgr = l.empno
    join salgrade s on e.sal between s.losal and s.hisal
where e.sal > (
        select avg(sal)
        from emp
    );
```

```sh
mysql> select e.ename '员工',d.dname,l.ename '领导',s.grade
    -> from emp e
    -> join dept d
    -> on e.deptno = d.deptno
    -> left join emp l
    -> on e.mgr = l.empno 
    -> join salgrade s
    -> on e.sal between s.losal and s.hisal
    -> where e.sal > (select avg(sal) from emp);
+--------+------------+--------+-------+
| 员工   | dname      | 领导   | grade |
+--------+------------+--------+-------+
| FORD   | RESEARCH   | JONES  |     4 |
| SCOTT  | RESEARCH   | JONES  |     4 |
| CLARK  | ACCOUNTING | KING   |     4 |
| BLAKE  | SALES      | KING   |     4 |
| JONES  | RESEARCH   | KING   |     4 |
| KING   | ACCOUNTING | NULL   |     5 |
+--------+------------+--------+-------+
6 rows in set (0.01 sec)
```

## 22、列出与"SCOTT"从事相同工作的所有员工及部门名称

```sql
select
    e.ename,
    e.job,
    d.dname
from emp e
    join dept d on e.deptno = d.deptno
where e.job = (
        select job
        from emp
        where
            ename = 'SCOTT'
    )
    and e.ename <> 'SCOTT';
```

```sh
mysql> select e.ename, e.job, d.dname
    -> from emp e
    -> join dept d
    -> on e.deptno = d.deptno 
    -> where e.job = (select job from emp where ename = 'SCOTT')
    -> and e.ename <> 'SCOTT';
+-------+---------+----------+
| ename | job     | dname    |
+-------+---------+----------+
| FORD  | ANALYST | RESEARCH |
+-------+---------+----------+
1 row in set (0.00 sec)
```


## 23、列出薪金等于部门编号为30中员工的薪金的其他员工的姓名和薪金

```sql
select ename, sal
from emp
where sal in (
        select distinct(sal)
        from emp
        where deptno = 30
    ) and deptno <> 30;
```

```sh
mysql> select ename, sal 
    -> from emp 
    -> where sal in (select distinct(sal) from emp where deptno = 30)
    -> and deptno <> 30;
Empty set (0.00 sec)
```

## 24、列出薪金高于在部门编号为30的工作的所有员工的薪金的员工姓名和薪金，部门名称

```sql
select
    e.ename,
    e.sal,
    d.dname
from emp e
    join dept d on e.deptno = d.deptno
where e.sal > (
        select max(sal)
        from emp
        where deptno = 30
    );
```

```sh
mysql> select e.ename,e.sal,d.dname
    -> from emp e
    -> join dept d
    -> on e.deptno = d.deptno
    -> where e.sal > (select max(sal) from emp where deptno = 30);
+-------+---------+------------+
| ename | sal     | dname      |
+-------+---------+------------+
| JONES | 2975.00 | RESEARCH   |
| SCOTT | 3000.00 | RESEARCH   |
| KING  | 5000.00 | ACCOUNTING |
| FORD  | 3000.00 | RESEARCH   |
+-------+---------+------------+
4 rows in set (0.01 sec)
```