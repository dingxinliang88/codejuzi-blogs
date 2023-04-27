#  Linux安装PostgreSQL 14步骤

## 一、卸载旧版本的PostgreSQL

1. 卸载pgsql的相关包

   ```sh
   sudo yum remove postgresql-server postgresql-contrib
   ```

2. 删除残余文件

   ```sh
   sudo rm -rf /var/lib/pgsql /etc/postgresql
   ```

## 二、安装PostgreSQL 14

1. 将PostgreSQL 14的Yum存储库添加到系统中

   ```sh
   sudo rpm -Uvh https://download.postgresql.org/pub/repos/yum/reporpms/EL-8-x86_64/pgdg-redhat-repo-latest.noarch.rpm
   ```

2. 安装PostgreSQL 14

   ```sh
   sudo yum install postgresql14-server postgresql14-contrib
   ```

3. 初始化数据库

   ```sh
   sudo /usr/pgsql-14/bin/postgresql-14-setup initdb
   ```

4. 启动PostgreSQL服务

   ```sh
   sudo systemctl start postgresql-14
   sudo systemctl enable postgresql-14
   ```

5. 验证安装

   登录pgsql：

   ```sh
   sudo -u postgres psql
   ```

   查询版本信息：

   ```sql
   SELECT version();
   ```

   退出pgsql

   ```sql
   \q
   ```

##  三、具体使用

官网：https://www.postgresql.org/

PostgreSQL 14官方文档：https://www.postgresql.org/docs/14/index.html