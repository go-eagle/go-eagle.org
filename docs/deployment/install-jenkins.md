
本文主要讲解如何安装 一台可以部署Go服务的 Jenkins 服务器

主要包含 Jenkins 上用到的一些插件和Jenkins 服务器上用到的必要命令。

## 安装 Jenkins

### Linux 上安装

#### 硬件安装要求

最小化硬件要求:

- 256 MB of RAM
- 1 GB of drive space (although 10 GB is a recommended minimum if running Jenkins as a Docker container)

推荐配置:

- 4 GB+ of RAM
- 50 GB+ of drive space

#### 软件安装要求

- Java

#### 安装 Jenkins

```bash
# 安装 java
sudo wget -O /etc/yum.repos.d/jenkins.repo \
    https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
sudo yum upgrade
# Add required dependencies for the jenkins package
sudo yum install fontconfig java-17-openjdk
sudo yum install jenkins
sudo systemctl daemon-reload

# 配置启动项
# 配置开机启动
sudo systemctl enable jenkins
# 启动 Jenkins 服务
sudo systemctl start jenkins
# 查看状态
sudo systemctl start jenkins
```

如果配置正确，会看到如下信息

```bash
Loaded: loaded (/lib/systemd/system/jenkins.service; enabled; vendor preset: enabled)
Active: active (running) since Tue 2023-06-22 16:19:01 +03; 4min 57s ago
...
```

#### 访问 Jenkins

访问地址：`http://localhost:8080`

查看初始密码：`sudo cat /var/lib/jenkins/secrets/initialAdminPassword`

首次登录以后需要创建第一个管理员账号。

### macOS 上安装

```bash

```



## 安装 Jenkins 插件

- Go
- Git
- Ansible
- SSH

## 安装相关命令

### 安装 git

```bash
sudo yum install git -y
```


### 安装 ansible

```bash
sudo yum install ansible -y
```

## Reference

- https://www.jenkins.io/doc/book/installing/
