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
/data/www/user-service/bin/user-service -p 8080 -c /data/www/user-service/conf/config-test.yaml -l /data/logs/user-service
```

## 二进制文件部署

可以使用 scp、rsync 或者 Jenkins 部署到目标服务器。但为了防止进程意外退出，可以使用 `systemd` 或 `Supervisord` 进行进程守护。

### 使用 systemd

1. 创建 systemd 服务单元文件

```bash
sudo touch /etc/systemd/system/user-service.service
```

2. 配置服务单元文件

添加如下内容:

```bash
[Unit]
Description=User service
After=network.target

[Service]
User=www
Group=www
ExecStart=/data/www/user-service/bin/user-service -p 8080 -c /data/www/user-service/conf/config-test.yaml -l /data/logs/user-service
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
```

### 使用 Supervisord

> 这里日志目录设定为 /data/logs 如果安装了 Supervisord

在配置文件 `/etc/supervisor/supervisord.conf` 中加入以下配置

```ini
[program:eagle]
# environment=
directory=/home/go/eagle
command=/home/go/eagle/bin_eagle
autostart=true
autorestart=true
user=root
stdout_logfile=/data/logs/eagle_std.log
startsecs = 2
startretries = 2
stdout_logfile_maxbytes=10MB
stdout_logfile_backups=10
stderr_logfile=/data/logs/eagle_err.log
stderr_logfile_maxbytes=10MB
stderr_logfile_backups=10
```

重启 Supervisord

```bash
supervisorctl restart eagle
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
