 # Windows 下安装 MySQL 8 

在 Windows 下安装 MySQL 8 的具体步骤如下：

1. 下载 MySQL 8 的 Windows 安装包（msi 格式），下载地址：https://dev.mysql.com/downloads/mysql/

2. 双击运行安装包，选择 “Custom” 安装类型，并且保证安装组件中包括以下选项：

   - MySQL Server

   - MySQL Workbench

   - MySQL Shell

3. 点击 “Next” 开始安装，直到安装完成。

4. 启动 MySQL 服务：

   - 点击 “开始菜单 -> MySQL -> MySQL Installer” 打开 MySQL Installer；

   - 在 MySQL Installer 中点击 “MySQL Server”；

   - 在右边点击 “Start” 启动 MySQL 服务。

5. 配置 MySQL：

   - 打开 MySQL Workbench；

   - 在 “Welcome to MySQL Workbench” 弹窗中点击 “Skip”；

   - 点击 “New Connection”；
     - 输入以下信息：
       - Connection Name：自定义名称
       - Hostname：localhost
       - Port：3306
       - Username：root
       - Password：自定义密码

   - 点击 “Test Connection” 检测连接是否正常；

   - 点击 “OK” 保存连接配置。

6. 测试连接：

   - 在 MySQL Workbench 中连接到 MySQL 服务；

   - 创建数据库并添加表，例如：

     ```sql
     sqlCopy codeCREATE DATABASE mydb;
     
     USE mydb;
     
     CREATE TABLE mytable (
       id INT NOT NULL,
       name VARCHAR(20) NOT NULL,
       PRIMARY KEY (id)
     );
     ```

7. 安装成功，现在可以使用 MySQL 8 了