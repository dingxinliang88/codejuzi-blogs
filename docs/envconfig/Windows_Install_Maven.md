# Windows安装配置Maven

> 以下以3.8.3版本为例

在 Windows 操作系统下安装和配置 Maven 3.8.3 的具体步骤：

1. 下载 Maven 3.8.3 的二进制包

   在 Maven 的官网上，下载 Maven 3.8.3 的二进制包。下载地址为：https://maven.apache.org/download.cgi，选择 apache-maven-3.8.3-bin.zip 下载。下载完成后，解压到指定的目录，比如：`D:\Maven\apache-maven-3.8.3`。

2. 配置环境变量

   右键点击“此电脑”（或“计算机”）->“属性”->“高级系统设置”->“环境变量”->“系统变量”->“新建”。在“变量名”处输入：`MAVEN_HOME`，在“变量值”处输入 Maven 的安装路径，比如：``D:\Maven\apache-maven-3.8.3`。找到“系统变量”下的“Path”变量，在末尾加上“;`%MAVEN_HOME%\bin`”。

3. 验证 Maven 是否安装成功

   打开命令行窗口，输入以下命令：

   ```shell
   mvn -v
   ```

   如果看到类似下面的输出，就说明 Maven 安装成功了：

   ```sh
   Apache Maven 3.8.3 (......)
   Maven home: D:\Maven\apache-maven-3.8.3\bin\..
   Java version: 1.8.0_271, vendor: Oracle Corporation, runtime: C:\Program Files\Java\jdk1.8.0_271\jre
   Default locale: en_US, platform encoding: GBK
   OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"
   ```

   

安装配置 Maven 完成后，就可以在命令行窗口中使用 Maven 命令了。