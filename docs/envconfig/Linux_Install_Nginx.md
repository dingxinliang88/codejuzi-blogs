# Linux如何安装Nginx

> 环境
>
> - Ubuntu 22.04 arm64

# 编译安装 Nginx：

1. 安装编译 Nginx 所需的依赖库：

	```sh
	sudo apt update
	sudo apt install build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev openssl libssl-dev
	```

2. 下载 Nginx 的源代码包：

	```sh
	wget http://nginx.org/download/nginx-1.24.0.tar.gz
	```

	> 这步比较慢，可以直接去http://nginx.org/download下载好，上传服务器 / 虚拟机 即可

3. 解压源代码包：

	```sh
	tar -zxvf nginx-1.24.0.tar.gz
	```

4. 进入解压后的目录：

	```sh
	cd nginx-1.24.0
	```

5. 配置和编译 Nginx：

	```sh
	./configure
	make
	```

6. 安装 Nginx：

	```sh
	make install
	```

7. 启动 Nginx 服务：

	进入安装好的目录：`/usr/local/nginx/sbin`

	```sh
	sudo ./nginx
	```

	也可以使用 `sudo service nginx start` 或 `sudo systemctl start nginx` 命令来启动 Nginx。

> 如果外部访问不到，可以试试以下方法：
>
> - 放行80端口：`sudo firewall-cmd --zone=public --add-port=80/tcp --permanent`
> - 关闭防火墙：`sudo systemctl stop firewalld`

## nginx的启停命令

- `nginx` => 启动
- `nginx -s stop` => 快速停止
- `nginx -s quit` => 优雅停止，在退出前完成已经接受的连接请求
- `nginx -s reload` => 重新加载配置

## 额外配置——安装成系统配置

> 此配置可以使得nginx开机自启

1. 创建服务脚本：`sudo vim /usr/lib/systemd/system/nginx.service`

2. 服务脚本内容：

	```ini
	[Unit]
	Description=nginx -  web server
	After=network.target remote-fs.target nss-lookup.target
	[Service]
	Type=forking
	PIDFile=/usr/local/nginx/logs/nginx.pid
	ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf
	ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf
	ExecReload=/usr/local/nginx/sbin/nginx -s reload
	ExecStop=/usr/local/nginx/sbin/nginx -s stop
	ExecQuit=/usr/local/nginx/sbin/nginx -s quit
	PrivateTmp=true
	[Install]
	WantedBy=multi-user.target
	```

3. 重新加载系统服务：`sudo systemctl daemon-reload`

4. 启动服务：`sudo systemctl start nginx.service`

	> 要注意80端口不能被其他服务占用哦，否则这步是不能成功的
	>
	> 使用以下命令检查哪个进程正在占用端口 80：
	>
	> ```sh
	> sudo lsof -i :80
	> ```
	>
	> 这将给出监听端口 80 的进程的 PID。您可以使用以下命令停止该进程：
	>
	> ```sh
	> sudo kill -9 <PID>
	> ```
	>
	> 使用上面找到的实际 PID 替换 `<PID>`。

5. 配置开机自启：`sudo systemctl enable nginx.service`

# Docker 安装 Nginx：

1. 下载并运行 Nginx 镜像：

	```sh
	docker run -d -p 80:80 nginx
	```

	这将在后台运行一个 Nginx 容器，并将主机的 80 端口映射到容器的 80 端口。

2. 在浏览器中访问服务器的 IP 地址或域名来验证 Nginx 是否成功安装