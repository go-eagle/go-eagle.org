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

- 1、选择类型： AWS service
- 2、选择 use case: EKS
- 3、选择你的 use case: EKS - Cluster
- 4、添加policy：AmazonEKSClusterPolicy
- 5、添加tags， 可选
- 6、预览，输入角色名: AWSEKSClusterRole, 以及描述

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

- 1、选择类型： AWS service
- 2、选择 use case: EC2
- 3、添加policy：AmazonEKS_CNI_Policy、AmazonEKSWorkerNodePolicy、AmazonEC2ContainerRegistryReadOnly
- 4、添加tags， 可选
- 5、预览，输入角色名: AWSEKSNodeRole, 以及描述

#### 配置机器及扩容信息

- 选择 AMI 类型：默认选择第一个
- 选择容量类型：按需还是spot
- 选择实例类型：t3.small
- 磁盘容量：10G（默认为20G）
- 扩容配置：min node: 1, max node: 2, desired node: 1
- 最大不可达：选择按数量，也有按百分比的，数量选为1

> 注意：不通的node类型支持的pod数量不通，如果是选择t3.micro机器，默认是4个，系统相关pod已经占用了4个，所以应用的pod会无法启动。
> 可以使用k9s在配置里进行查看。
> 具体可以查看此链接：https://github.com/awslabs/amazon-eks-ami/blob/master/files/eni-max-pods.txt

#### 指定网络

关闭远程访问，其他默认。

## 本地操作eks

### 给用户添加策略

IAM -> user -> usergroup -> deployment(之前自己定义的名称) -> 添加policy:

- Service: EKS
- Actions: All EKS Actions
- Resources: All resources
- Name: EKSFullAccess

### 更新配置到本地

```bash
aws eks update-kubeconfig --name microservice --region us-east-1
# Output
Added new context arn:aws:eks:us-east-1:xxxxxxxx:cluster/microservice to ~/.kube/config
```

### 切换到指定集群

```bash
kubectl config use-context arn:aws:eks:us-east-1:xxxxxxxx:cluster/microservice
```

### 查看集群信息

```bash
kubectl cluster-info

# Output
Kubernetes control plane is running at https://D5420D4721F9178A5090C1DDFD451415.gr7.ap-southeast-1.eks.amazonaws.com
CoreDNS is running at https://D5420D78A5090C451415.gr7.us-east-1.eks.amazonaws.com/api/v1/namespaces/kube-system/services/kube-dns:dns/proxy

To further debug and diagnose cluster problems, use 'kubectl cluster-info dump'.
```

此时如果报错：`error: You must be logged to the server (Unauthorized)`  
查看配置：`aws sts get-caller-identity`

```bash
{
  "UserId": "xxxxxx",
  "Account": "yyyyyy",
  "Arn": "arn:aws:iam:yyyyyy:user/github-ci"
}
```

原因是：不是集群的root用户或者owner用户，所以无法操作。
解决方法：配置 `KeyID` 和 `SecretKey`

- 查看现有的key: `cat ~/.aws/config`

```bash
# Output
[default]
aws_access_key_id = xxxxxx
aws_secret_access_key = yyyyyyyyy
```

- 在根用户下新建key

查看根用户的 security_credentials: https://us-east-1.console.aws.amazon.com/iam/home?region=us-west-1#security_credential
在 `Access keys` Section 里新建key

- 添加到 `~/.aws/credentials`

添加后的样子

```bash
# 新创建的放到default里
[default]
aws_access_key_id = new-xxxxxx
aws_secret_access_key = new-yyyyyyyyy

# 原来的 default 改为了 gtihub
[github]
aws_access_key_id = xxxxxx
aws_secret_access_key = yyyyyyyyy
```

> 通过使用 `export AWS_PROFILE=default` 可以切换使用哪个section

- 验证权限是否正常

```bash
kubectl cluster-info
# 或
kubectl get pods
# 会输出对应的pod 或者 No resources found in default namespace.
```

## 添加机器

### 添加node

在 `Clusters` 下的 `Configuration` 里，找到 Compute 选项卡，在下面有一个 `Node Groups`, 点击添加 `Add Node Group`.  
填写 GroupName。

### 配置node

点击 上面配置好的 `Group name`, 进入 `Node Group Configuration`, 在 Details 找到 `Autoscaling group name`, 点击进入
配置EC2的期望数量、最小数量和最大数量。

## 部署应用到EKS

这里主要是Github Actions来进行部署。

### 创建aws认证

```yaml
# aws-auth.yaml
apiVersion: v1 
kind: ConfigMap 
metadata: 
  name: aws-auth 
  namespace: kube-system 
data: 
  mapUsers: | 
    - userarn: arn:aws:iam::111222333:user/github-ci
      username: github-ci
      groups:
        - system:masters
```

> username 和 userarn 需要改为自己的

```bash
kubectl apply -f aws-auth.yaml
```

### 部署deploy和service

配置如下

```yaml
# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: microservice-api-deployment
  labels:
    app: microservice-api
spec:
  replicas: 2
  selector:
    matchLabels:
      app: microservice-api
  template:
    metadata:
      labels:
        app: microservice-api
    spec:
      containers:
      - name: microservice-api
        image: xxxxx.dkr.ecr.eu-west-1.amazonaws.com/microservice:latest
        imagePullPolicy: Always
        ports:
        - containerPort: 8080

# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: microservice-api-service
spec:
  selector:
    app: microservice-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: ClusterIP
```

> 执行时先切换为`export AWS_PROFILE=default`，再切换回 `export AWS_PROFILE=github`
> 再执行 `kubectl cluster-info` 没有报错即可

如果 Service 中的 `spec.type` 为 `LoadBalancer`, 则会为其分配一个 `External-IP`, 这样外部就可以直接访问。具体可以在k9s里进行查看。

可以通过 nslookup 进行查看:

```bash
nslookup xxxxxx-yyyyy.us-east-1.elb.amazonaws.com
```

会发现找不到指定的域名。这时需要等待一会即可。这时就可以使用该域名访问我们的服务了。  
但是这个域名太长不好记忆，我们需要申请一个域名来进行访问。

### 申请域名

这里以申请 `api.go-eagle.org` 为例

在 Route53里申请即可，这里不详细叙述了。但我们需要在 `Route53` -> `Hosted zones` 里添加一条A记录.

- Record name: api
- Record type: A record
- Value: 这个很关键，我们在这里打开 `alias`，此时该选项会变为：`Route traffic to`, 并选择 `Alias to Network Load Balancer` 及对应的大区，然后把上面的 `xxxxxx-yyyyy.us-east-1.elb.amazonaws.com` 填入 `Network Load Balancer` 即可。

恭喜，此时我们就可以通过域名 `api.go-eagle.org` 访问我们的服务了。

### 部署ingress

大家有没有发现上面的问题？如果是访问多个 Service 怎么办？ 申请多个域名？
其实k8s为我们提供了一种方式，那就是 `ingress`, 它可以帮我们根据一定的规则路由到不同的 service 里。

```yaml
# ingress.yaml

```

此时我们的 service 类型需要修改为 `ClusterIP`。

```yaml
# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: microservice-api-service
spec:
  selector:
    app: microservice-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: ClusterIP # 从 LoadBalancer 改为 ClusterIP
```

但是仅仅有 `ingress` 还不会生效，必须搭配 `ingress controller`(可以查看：[ingress 先决条件](https://kubernetes.io/docs/concepts/services-networking/ingress/#prerequisites)), 全部配置如下:

### 安装 ingress controller

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.7.1/deploy/static/provider/aws/deploy.yaml
```

安装完后，可以查看pod, 此时应该会看到：

```bash
NAMESPACE       NAME
ingress-nginx   ingress-nginx-controller-xxxxxxx-yyyy
```

查看ingress

```bash
NAMESPACE    NAME                       CLASS   ADDRESS
default      microservice-api-ingress   NONE    # 这里给自动分配了一个NLB
```

注意这里的NLB地址与之前添加的A记录的地址不同，所以我们需要将之前的A记录的value改为这里新生成的。

> 参考自：https://kubernetes.github.io/ingress-nginx/deploy/#aws

## k9s使用

我们可以使用官方提供的 `kubectl` 命令进行各种操作。不过可能需要记住各种参数，这里推荐一个小工具：k9s

### 安装 k9s

k9s官网：https://k9scli.io/
github: https://github.com/derailed/k9s

```bash
# for macOS
brew install derailed/k9s/k9s
```

### k9s的使用

安装后， 直接执行 `k9s` 直接进入图片话界面进行操作，非常方便。

## Reference

- https://repost.aws/zh-Hans/knowledge-center/amazon-eks-cluster-access
- https://www.youtube.com/watch?v=hwMevai3_wQ
- https://kubernetes.io/docs/
- k8s官方 ingress controller: https://github.com/kubernetes/ingress-nginx
- https://kubernetes.github.io/ingress-nginx/deploy/
