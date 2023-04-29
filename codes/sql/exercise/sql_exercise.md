# SQL 练习题

> 请在练习前执行对应的[建表语句](./codes/sql/exercise/tables)

## ① 取得每个部门最高薪水的人员名称

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