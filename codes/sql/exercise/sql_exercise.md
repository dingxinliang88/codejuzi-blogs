# SQL 练习题

> 请在练习前执行对应的[建表语句](./codes/sql/exercise/tables)

## 1、 取得每个部门最高薪水的人员名称

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