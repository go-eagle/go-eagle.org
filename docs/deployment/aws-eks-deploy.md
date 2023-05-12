---
id: aws-eks-deploy
title: 部署应用到aws eks集群
description: 部署到aws的eks集群
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /deployment/aws-eks-deploy
---

## 创建EKS集群

### 配置集群基本信息

- 名称
- 选择版本号
- 集群服务角色(创建完角色后，回来刷新即可看到：AWSEKSClusterRole)

#### 创建集群服务角色

具体步骤：
1、选择类型： AWS service
2、选择 use case: EKS
3、选择你的 use case: EKS - Cluster
4、添加policy：AmazonEKSClusterPolicy
5、添加tags， 可选
6、预览，输入角色名: AWSEKSClusterRole, 以及描述

#### 网络配置

- 网络：选择默认的vpc，其他不用配置。
- 安全组：默认不用指定
- 集群endpoint访问：Public and private
- VPC-CNI: 选最新版
- CoreDNS: 选最新
- kube-proxy: 选最新

#### 日志配置

默认都禁用即可，也可以根据自己的需要开启对应的选项。

### 添加 node group

- 填写group名称
- 填写Node IAM Role(创建完角色后，回来刷新即可看到：AWSEKSNodeRole)

#### 创建Node IAM角色

具体步骤：
1、选择类型： AWS service
2、选择 use case: EC2
3、添加policy：AmazonEKS_CNI_Policy、AmazonEKSWorkerNodePolicy、AmazonEC2ContainerRegistryReadOnly
4、添加tags， 可选
5、预览，输入角色名: AWSEKSNodeRole, 以及描述

#### 配置机器及扩容信息

- 选择 AMI 类型：默认选择第一个
- 选择容量类型：按需还是spot
- 选择实例类型：t3.micro
- 扩容配置：min node: 1, max node: 2, desired node: 1
- 最大不可达：选择按数量，也有按百分比的，数量选为1

#### 指定网络

关闭远程访问，其他默认。

## 部署应用到EKS

这里主要是Github Actions来进行部署。