# extra_exer_table

## 👉[点我返回](/codes/sql/exercise/sql_extra_exer.md)👈

## 建表
```sql
DROP TABLE IF EXISTS S;

DROP TABLE IF EXISTS C;

DROP TABLE IF EXISTS SC;

CREATE TABLE
    S (
        SNO VARCHAR(10) NOT NULL,
        SNAME VARCHAR(20) NOT NULL,
        PRIMARY KEY (SNO)
    );

CREATE TABLE
    C (
        CNO VARCHAR(10) NOT NULL,
        CNAME VARCHAR(20) NOT NULL,
        CTEACHER VARCHAR(20) NOT NULL,
        PRIMARY KEY (CNO)
    );

CREATE TABLE
    SC (
        SNO VARCHAR(10) NOT NULL,
        CNO VARCHAR(10) NOT NULL,
        SCGRADE DECIMAL(5, 2),
        PRIMARY KEY (SNO, CNO)
    );
```

## 模拟数据
```sql
INSERT INTO S VALUES ('S001', '张三');

INSERT INTO S VALUES ('S002', '李四');

INSERT INTO S VALUES ('S003', '王五');

INSERT INTO S VALUES ('S004', '赵六');

INSERT INTO S VALUES ('S005', '刘七');

INSERT INTO S VALUES ('S006', '钱八');

INSERT INTO S VALUES ('S007', '吴九');

INSERT INTO S VALUES ('S008', '郑十');

INSERT INTO C VALUES ('C001', '数据库', '黎明');

INSERT INTO C VALUES ('C002', '操作系统', '李华');

INSERT INTO C VALUES ('C003', '计算机网络', '王强');

INSERT INTO C VALUES ('C004', '数据结构', '张三');

INSERT INTO C VALUES ('C005', '编译原理', '王强');

INSERT INTO C VALUES ('C006', '人工智能', '黄明');

INSERT INTO SC VALUES ('S001', 'C002', 90.0);

INSERT INTO SC VALUES ('S001', 'C003', 86.5);

INSERT INTO SC VALUES ('S002', 'C001', 78.0);

INSERT INTO SC VALUES ('S002', 'C002', 85.5);

INSERT INTO SC VALUES ('S003', 'C001', 72.5);

INSERT INTO SC VALUES ('S004', 'C002', 56.3);

INSERT INTO SC VALUES ('S005', 'C001', 59.5);

INSERT INTO SC VALUES ('S005', 'C002', 53.1);

INSERT INTO SC VALUES ('S005', 'C003', 67.2);

INSERT INTO SC VALUES ('S006', 'C001', 82.5);

INSERT INTO SC VALUES ('S007', 'C002', 77.0);

INSERT INTO SC VALUES ('S008', 'C003', 91.5);

INSERT INTO SC VALUES ('S001', 'C004', 75.5);

INSERT INTO SC VALUES ('S002', 'C004', 69.8);
```


