# SQL 练习题

> 请在练习前执行对应的[建表语句](./codes/sql/exercise/tables)

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
select 
	e.ename, t.*
from 
	emp e
join
	(select deptno,max(sal) as maxSal from emp group by deptno) t
on
	t.deptno = e.deptno and t.maxSal = e.sal;
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
select 
	t.*, e.ename, e.sal
from
	emp e
join
	(select deptno,avg(sal) as avgSal from emp group by deptno) t
on
	e.deptno = t.deptno and e.sal > t.avgSal;
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
	e.ename,e.sal,e.deptno,s.grade
from
	emp e
join
	salgrade s
on
	e.sal between s.losal and s.hisal;
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
select 
	e.deptno,avg(s.grade)
from
	emp e
join
	salgrade s
on
	e.sal between s.losal and s.hisal
group by
	e.deptno;
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
select ename, sal from emp where sal not in(select distinct a.sal from emp a join emp b on a.sal < b.sal);
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
select deptno, avg(sal) as avgSal from emp group by deptno order by avgSal limit 1;
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
select max(t.avgSal) from (select deptno, avg(sal) as avgSal from emp group by deptno) t;
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
	deptno,avg(sal) as avgSal 
from 
	emp 
group by 
	deptno
having
	avgSal = (select max(t.avgSal) from (select avg(sal) as avgSal from emp group by deptno) t);
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
	d.dname,avg(e.sal) as avgsal 
from 
	dept d
join
	emp e
on
	e.deptno = d.deptno
group by 
	d.dname
order by 
	avgsal desc 
limit 
	1;
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
select 
	t.*,s.grade
from
	(select d.dname,avg(sal) as avgsal from emp e join dept d on e.deptno = d.deptno group by d.dname) t
join
	salgrade s
on
	t.avgsal between s.losal and s.hisal;
order by 
	s.grade
limit 
	1;
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
> select 
> 	t.*,s.grade
> from
> 	(select d.dname,avg(sal) as avgsal from emp e join dept d on e.deptno = d.deptno group by d.dname) t
> join
> 	salgrade s
> on
> 	t.avgsal between s.losal and s.hisal
> where
> 	s.grade = (select grade from salgrade where (select avg(sal) as avgsal from emp group by deptno order by avgsal asc limit 1) between losal and hisal);
> ```

> ### 思考：最低等级怎么看？
>
> 平均薪水最低的对应的等级一定最低
>
> ```sql
> select 
> 	avg(sal) as avgsal 
> from 
> 		emp 
> group by 
> 		deptno 
> order by 
>   	avgsal 
> limit 
>   	1;
> ```
>
> ```sh
> mysql> select avg(sal) as avgsal from emp group by deptno order by avgsal asc limit 1;
> +-------------+
> | avgsal      |
> +-------------+
> | 1566.666667 |
> +-------------+
> 1 row in set (0.00 sec)
> ```
>
> 
>
> ```sql
> select grade
> from salgrade
> where (
>   select avg(sal) as avgsal
>   from emp
>   group by deptno
>   order by avgsal asc
>   limit 1
> ) between losal and hisal;
> ```
>
> ```sh
> mysql> select grade from salgrade where (select avg(sal) as avgsal from emp group by deptno order by avgsal asc limit 1) between losal and hisal;
> +-------+
> | grade |
> +-------+
> |     3 |
> +-------+
> 1 row in set (0.00 sec)
> ```
>