

将一个 Go 项目使用 Jenkins 部署到指定的机器上或k8s是一个多步骤的过程，包括配置 Jenkins、编写 shell 或 Jenkinsfile、设置远程机器的环境等。

分别从部署到ECS和k8s, 以下是具体的步骤：

## 部署到ECS

### 前提条件

1. Jenkins 已安装并运行。
2. Jenkins 机器上安装 ansible
3. 目标机器（要部署的机器）配置了 SSH，并能从 Jenkins 服务器上通过 SSH 访问。
4. Go 已安装在目标机器上，供编译使用。
5. systemd (通常已经安装在大多数 Linux 发行版中)

### 步骤 1：在 Jenkins 上安装必要的插件

安装以下 Jenkins 插件：

- SSH Agent Plugin
- Ansible Plugin

### 步骤 2：配置 Jenkins 凭据

在 Jenkins 中添加 SSH 凭据（SSH Username with Private Key）：

1. 在 Jenkins 管理页面，选择 “Credentials”。
2. 选择合适的域，点击 “Add Credentials”。
3. 选择 “SSH Username with private key”，并填写相关信息（用户名、私钥等）。

### 步骤 3：安装和配置 Ansible

需要确保 Ansible 已安装在 Jenkins 主机上，并且配置了 Ansible 的 inventory 文件来管理目标机器。

`sudo apt install python ansible -y`

同时添加一个 ansible 的专属用户

```bash
sudo useradd ansible-admin
sudo passwd ansible-admin
sudo visudo
```

将 Add “ansible-admin ALL=(ALL) ALL” to this sudoers file.

### 步骤 4: 配置 Freestyle 项目

#### 1. 创建新的 Freestyle 项目

在 Jenkins 主页面，点击 “新建任务”，选择 “Freestyle project”，然后点击 “OK”。

#### 2. 配置源码管理

在 “源码管理” 部分，配置您的代码仓库（例如，使用 Git）, 同时添加git的账号、密码，如果是使用ssh 需要配置对应的public key.

#### 3. 添加构建步骤

在 “构建” 部分，点击 “添加构建步骤”，选择 “Execute shell”。

添加具体要执行的命令，比如

```bash
# 设置 Go 环境变量
export GOPATH=$HOME/go
export PATH=$PATH:/usr/local/go/bin:$GOPATH/bin

# 设置项目路径
PROJECT_DIR=$WORKSPACE
BINARY_NAME=my_go_website
BUILD_DIR=$PROJECT_DIR/build
CONFIG_FILE=$PROJECT_DIR/config/config.yaml

# 编译 Go 项目
echo "Building Go project..."
cd $PROJECT_DIR
make build

# 分发到相应机器上
ansible-playbook -i /etc/ansible/hosts /etc/ansible/roles/deploy-go-service/deploy-go-service.yaml \
-e 'service_name=user-web-service service_port=8080 env=prod build_work=/data/jenkins_home/workspace/ops-deploy-go-service' -uroot -vv
```

#### 4. 继续添加构建操作

点击 “添加构建操作”，选择 “Ansible Playbook”。

在 Ansible Playbook 配置中：

- Path to Playbook：填写您的 Ansible Playbook 文件路径，例如 /path/to/playbook.yml。
- Inventory：填写您的 Ansible inventory 文件路径，例如 /path/to/inventory。
- Credentials：选择之前配置的 SSH 凭据。

#### 5. 编写 Ansible Playbook

主要目的：使用 Ansible 将编译好的二进制文件和配置文件分发到目标机器，并配置 systemd 服务文件。

ansible 推荐都是以role模板格式作为playbook来实现非常强大的功能, 模板推荐：https://galaxy.ansible.com/

> ansible 官方文档：https://docs.ansible.com/ansible/latest/index.html

```yaml
# /etc/ansible/roles/deploy-go-service/deploy-go-service.yml
---
- name: Distribute and run Go binary
  # 要操作的机器组，在文件 /etc/ansible/hosts 进行配置
  hosts: all
  tasks:
    - name: Copy Go binary to target machines
      copy:
        src: /path/to/compiled/binary/my_go_project
        dest: /path/to/destination/my_go_project
        mode: '0755'

    - name: Copy configuration file to target machines
      copy:
        src: /path/to/config/config.yaml
        dest: /path/to/destination/config.yaml
        mode: '0644'

    - name: Setup systemd service for the Go application
      command: systemctl start my_go_service

    - name: Reload systemd and restart Go application service
      command: systemctl restart my_go_service
      
```

#### 6. 配置 Ansible inventory 文件

在 Jenkins 主机上创建一个 Ansible inventory 文件（例如 /path/to/inventory），其中包含目标机器的信息，例如：

Ansible inventory 即 hosts， 配置如下，默认的 Inventory：/etc/ansible/hosts

> Inventory文件格式: 最常见的格式是 INI 和 YAML 格式, 常用的是 INI

```ini
# /etc/ansible/hosts
[dev] // 组名
10.9.X.A ansible_connection=ssh ansible_ssh_user=work

[prod]
10.42.X.B ansible_connection=ssh ansible_ssh_user=work
10.42.X.C ansible_connection=ssh ansible_ssh_user=work
```

或

```ini
[all]
server1 ansible_host=192.168.1.1 ansible_user=user
server2 ansible_host=192.168.1.2 ansible_user=user

```

#### 7. 保存并构建项目

点击 “保存” 按钮保存 Jenkins 项目的配置，然后点击 “立即构建” 以启动构建过程。

如果构建结束后是绿色的对钩，恭喜，构建成功。

如果是需要将应用部署到 k8s, 请继续往下看。

## 部署到 k8s

### 前提条件

1. Jenkins 已安装并运行。
2. 目标机器（要部署的机器）配置了 SSH，并能从 Jenkins 服务器上通过 SSH 访问。
3. Go 已安装在目标机器上。(非必须)

### 步骤 1：在 Jenkins 上安装必要的插件

安装以下 Jenkins 插件：

- SSH Agent Plugin
- Pipeline Plugin (用于 Jenkinsfile 支持)

### 步骤 2：配置 Jenkins 凭据

在 Jenkins 中添加 SSH 凭据（SSH Username with Private Key）：

1. 在 Jenkins 管理页面，选择 “Credentials”。
2. 选择合适的域，点击 “Add Credentials”。
3. 选择 “SSH Username with private key”，并填写相关信息（用户名、私钥等）。

### 步骤 3：编写 Jenkinsfile

在 Go 项目的根目录下创建一个 Jenkinsfile，定义 Jenkins Pipeline。以下是一个示例：

```groovy
pipeline {
    agent any

    environment {
        // 配置目标机器的 SSH 凭据 ID
        REMOTE_HOST = 'user@your-remote-host'
        CREDENTIALS_ID = 'your-credentials-id'
        GO_PROJECT_DIR = '/path/to/go/project/on/remote'
    }

    stages {
        stage('Checkout') {
            steps {
                // 检出代码
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // 在本地构建 Go 项目
                sh 'go mod tidy'
                sh 'go build -o my_go_project'
            }
        }

        stage('Deploy') {
            steps {
                // 使用 SSH 将构建的二进制文件传输到远程机器
                sshagent(credentials: [env.CREDENTIALS_ID]) {
                    sh """
                        scp -o StrictHostKeyChecking=no my_go_project ${env.REMOTE_HOST}:${env.GO_PROJECT_DIR}
                        ssh -o StrictHostKeyChecking=no ${env.REMOTE_HOST} "chmod +x ${env.GO_PROJECT_DIR}/my_go_project"
                    """
                }
            }
        }

        stage('Run') {
            steps {
                // 运行远程机器上的 Go 项目
                sshagent(credentials: [env.CREDENTIALS_ID]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${env.REMOTE_HOST} "nohup ${env.GO_PROJECT_DIR}/my_go_project > /dev/null 2>&1 &"
                    """
                }
            }
        }
    }

    post {
        always {
            // 清理工作（可选）
            cleanWs()
        }
    }
}
```

### 步骤 4：配置目标机器

确保目标机器上具备以下条件：

1. 安装了 Go 语言环境。
2. Jenkins 服务器能够通过 SSH 访问目标机器。
3. 设置好项目目录并给予相应的权限。

### 步骤 5：在 Jenkins 上创建并运行 Pipeline

1. 在 Jenkins 上创建一个新的 Pipeline 项目。
2. 在项目配置中，将 Pipeline script from SCM 选项设置为 Jenkinsfile。
3. 保存并构建项目。

## References

- https://blog.wangriyu.wang/2018/08-Jenkins.html
- https://desistdaydream.github.io/docs/9.%E8%BF%90%E7%BB%B4/Ansible/Inventory-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%AF%A6%E8%A7%A3/

