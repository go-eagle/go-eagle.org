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