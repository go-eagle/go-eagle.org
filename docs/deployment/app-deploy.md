---
id: app-deploy
title: 应用部署
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /deployment/app-deploy
---

支持三种常见的部署方式：`Dockerfile`、`docker-compose`、`Kubernetes`

下面以部署用户服务为例：user-service

## 编译并运行

在部署前需要对go服务进行编译，具体命令如下:

```bash
make build
```

运行

```bash
/data/work/user-service/bin/user-service -p 8080 -c /data/work/user-service/conf/config-test.yaml -l /data/logs/user-service
```

## 二进制文件部署

可以使用 scp、rsync、ansible 或者 Jenkins 部署到目标服务器。但为了防止进程意外退出，可以使用 `systemd` 或 `Supervisord` 进行进程守护。

在此之前先需要创建用户和用户组:

```bash
# 创建用户组
groupadd work
# 创建用户并添加到用户组
useradd -g work work
# 设置用户密码
passwd work

# 查看用户
id work
# 查看用户组
groups work
```

创建相应的目录

```bash
mkdir -p /data/work/user-service/bin
mkdir -p /data/work/user-service/logs
```

最后还需要把程序执行目录修改下所属用户和组

```bash
chown -R work:work /data/work
```

### 使用 systemd

1. 创建 systemd 服务单元文件

```bash
sudo touch /etc/systemd/system/user-service.service
```

2. 配置服务单元文件

在 `user-service.service` 中添加如下内容:

```bash
[Unit]
Description=User service
After=network.target

[Service]
User=work
Group=work
ExecStart=/data/work/user-service/bin/user-service -p 8080 -c /data/work/user-service/conf/config-test.yaml -l /data/logs/user-service
Restart=always
RestartSec=10
StartLimitBurst=5

[Install]
WantedBy=multi-user.target
```

3. 启动和管理服务

```bash
# 重载
sudo systemctl daemon-reload

# 启动
sudo systemctl start user-service.service

# 启用服务开机自启
sudo systemctl enable user-service.service

# 查看服务状态
sudo systemctl status user-service.service

# 查看服务日志
journalctl -u user-service.service

# 查看实时日志
journalctl -u user-service.service -f
```

> 注意：这里使用 user-service.service 和 user-service 都是可以的

### 使用 Supervisord

> 这里日志目录设定为 /data/logs

1. 安装 supervisord

```bash
sudo apt-get update
sudo apt-get install supervisor
```
2. 创建 supervisord 配置文件

配置文件通常位于 `/etc/supervisor/conf.d/` 目录下。创建一个新的配置文件: `/etc/supervisor/supervisord.conf` 中加入以下配置

```ini
[program:user-service]
user=work
# environment=
command=/data/work/user-service/bin/user-service -p 8080 -c /data/work/user-service/conf/config-test.yaml -l /data/logs/user-service
autostart=true
autorestart=true
stdout_logfile=/data/logs/user-service/supervisor_std.log
startsecs = 2
startretries = 2
stdout_logfile_maxbytes=10MB
stdout_logfile_backups=10
stderr_logfile=/data/logs/user-service/supervisor_err.log
stderr_logfile_maxbytes=10MB
stderr_logfile_backups=10
```

3. 启动和管理服务

```bash
# 重新加载
sudo supervisorctl reread   # 重新读取配置文件，检查更改
sudo supervisorctl update   # 应用新的配置，启动或停止相应的程序

# 启动服务
sudo supervisorctl start user-service

# 查看状态
sudo supervisorctl status user-service
```

## Dockerfile

`Dockerfile` 文件位于项目根目录，主要用于构建项目镜像

## docker-compose

`docker-compose` 编排文件位于项目 `deploy/docker-compose` 目录下  
本地环境可以直接运行，其他环境可以 copy 并调整后运行

```bash
docker-compose -f deploy/docker-compose
```

## Kubernetes

`docker-compose` 编排文件位于项目 `deploy/kubernetes` 目录下  

`Kubernetes` 方式基于 `helm`, 部署前可以将 `values.yaml` 拷贝为生产环境的 `values.prod.yaml`， 

例如 `cp values.yaml values.prod.yaml`  

执行部署:

```bash
kubectl apply -Rf deploy/kubernetes
```
