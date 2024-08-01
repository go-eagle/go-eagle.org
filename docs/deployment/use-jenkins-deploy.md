

将一个 Go 项目使用 Jenkins 部署到指定的机器上或k8s是一个多步骤的过程，包括配置 Jenkins、编写 shell 或 Jenkinsfile、设置远程机器的环境等。

分别从部署到ECS和k8s, 以下是具体的步骤：

## 部署到ECS

### 前提条件

1. Jenkins 已安装并运行。
2. Jenkins 机器上安装 ansible
3. 目标机器（要部署的机器）配置了 SSH，并能从 Jenkins 服务器上通过 SSH 访问。
4. Go 已安装在 Jenkins 机器上，供编译使用。
5. systemd (通常已经安装在大多数 Linux 发行版中)
6. 目标机器上需要安装 Python

### 步骤0 ：copy 公钥到目标机器

#### 生成ssh key
```bash
ssh-keygen -t rsa -b 4096
```

生成后一般默认在 `~/.ssh/id_rsa` 和 `~/.ssh/id_rsa.pub`

#### copy 公钥到目标机器

方式一:

找到公钥 `~/.ssh/id_rsa.pub`, 将内容添加到目标机器的文件中: `~/.ssh/authorized_keys`

```bash
vim ~/.ssh/authorized_keys
```

方式二:

使用 `ssh-copy-id`, 此方式更快捷。

```bash
ssh-copy-id user@remote_host
```

执行该命令后，系统会提示你输入远程服务器的密码，然后自动将本地公钥添加到远程服务器的 authorized_keys 文件中。

然后就可以使用命令测试了

```bash
ssh user@remote_host
```

如果正常就可以成功登录目标服务器了。

### 步骤 1：在 Jenkins 上安装必要的插件

安装以下 Jenkins 插件：

- SSH Agent Plugin
- Ansible Plugin
- Go Plugin

### 步骤 2：配置 Jenkins 凭据

在 Jenkins 中添加 SSH 凭据（SSH Username with Private Key）：

1. 在 Jenkins 管理页面，选择 “Credentials”。
2. 选择合适的域，点击 “Add Credentials”。
3. 选择 “SSH Username with private key”，并填写相关信息（用户名、私钥等）。

### 步骤 3：安装和配置 Ansible

需要确保 Ansible 已安装在 Jenkins 主机上，并且配置了 Ansible 的 inventory 文件来管理目标机器。

`sudo yum install python3 ansible -y`

### 步骤 4: 配置 Freestyle 项目

#### 1. 创建新的 Freestyle 项目

在 Jenkins 主页面，点击 “新建任务”，选择 “Freestyle project”，然后点击 “OK”。

#### 2. 配置源码管理

在 “源码管理” 部分，配置您的代码仓库（例如，使用 Git）, 同时添加git的账号、密码，如果是使用ssh 需要配置对应的public key.

#### 3. 添加构建步骤

在 “构建” 部分，点击 “添加构建步骤”，选择 “Execute shell”。

添加具体要执行的命令，比如

```bash
# 开启调试模式
set -x

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
ansible-playbook -i /data/deploy/ansible/hosts /data/deploy/ansible/roles/go-playbook.yaml \
-e 'service_name=user-web-service service_port=8080 env=prod build_work=/data/jenkins_home/workspace/ops-deploy-go-service' -vv
```

也可以使用命令直接进行测试，为了方便看出错误信息，可以开启debug模式

```bash
ANSIBLE_DEBUG=True ansible-playbook -i /data/deploy/ansible/hosts /data/deploy/ansible/roles/go-playbook.yaml
```

#### 4. 配置 Ansible

配置 `ansible.cfg`, 内容如下

```yaml
[defaults]
# Jenkins 上的 hosts
# -i 不指定时默认去读这里指定的
# inventory = /home/deploy/ansible/hosts
remote_user = root

[privilege_escalation]
become = True
become_method = sudo
become_user = root

[inventory:vars]
ansible_python_interpreter=/usr/bin/python3
```

#### 5. 编写 Ansible Playbook

主要目的：使用 Ansible 将编译好的二进制文件和配置文件分发到目标机器，并配置 systemd 服务文件。

ansible 推荐都是以role模板格式作为playbook来实现非常强大的功能, 模板推荐：https://galaxy.ansible.com/

> ansible 官方文档：https://docs.ansible.com/ansible/latest/index.html

`go-playbook.yaml` 内容如下：

```yaml
---
- name: Distribute and run Go binary
  # 要操作的机器组，在文件 /etc/ansible/hosts 进行配置
  hosts: dev
  become: yes
  vars:
    directories:
      - /data/work/user-service/bin
      - /data/work/user-service/conf

  tasks:
    - name: Ping test
      ping:

    - name: Create remote dir
      become: true
      file:
        path: "{{ item }}"
        state: directory
        mode: '0755'
        owner: work
        group: work
      with_items: "{{ directories }}"

    - name: Copy Go binary to target machines
      copy:
        src: /home/work/user-service/build/user-service
        dest: /data/work/user-service/bin/
        mode: '0755'

    - name: Copy config file to target machines
      copy:
        src: /home/work/user-service/config/config-test.yaml
        dest: /data/work/user-service/conf/
        mode: '0644'

    # systemd 的 user-service.service 可以手动添加好配置或者使用下面的task
    - name: Setup systemd service
      copy:
        src: /home/work/user-service/deploy/systemd/user-service.service
        dest: /etc/systemd/system/user-service.service
        mode: '0644'
        owner: root
        group: root

    - name: Reload systemd
      systemd:
        name: user-service
        state: restarted
      
```

#### 6. 配置 Ansible inventory 文件

在 Jenkins 主机上创建一个 Ansible inventory 文件（例如 /path/to/inventory），其中包含目标机器的信息，例如：

Ansible inventory 即 hosts， 配置如下，默认的 Inventory：/etc/ansible/hosts

> Inventory文件格式: 最常见的格式是 INI 和 YAML 格式, 常用的是 INI

`hosts` 配置如下:

```ini
[dev]
10.10.1.1 ansible_user=root ansible_python_interpreter=/usr/bin/python3
10.10.1.2 ansible_user=root ansible_python_interpreter=/usr/bin/python3
```

> 注意：这里的 `ansible_python_interpreter` 指的是目标服务器上的python


#### 7. 需要在目标服务器上安装python3

如果是上面

```bash
sudo yum install python39 -y
sudo ln -sf /usr/bin/python3.9 /usr/bin/python3
```

#### 8. 保存并构建项目

点击 “保存” 按钮保存 Jenkins 项目的配置，然后点击 “立即构建” 以启动构建过程。

如果构建结束后是绿色的对钩，恭喜，构建成功。

如果是需要将应用部署到 k8s, 请继续往下看。

## 部署到 k8s

### 前提条件

1. 找一台机器安装好 Jenkins
2. 在 Jenkins 机器上 安装 Go
3. 在 Jenkins 机器上安装 Git: `yum install git -y`
4. Jenkins 上安装 docker, 以便可以打镜像
5. Jenkins 上安装 kubectl

> 安装docker: yum install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

### 步骤 0：在 Jenkins 上安装必要的插件

安装以下 Jenkins 插件：

- Git Parameter Plugin（用于选择 Git 标签）
- Pipeline: GitHub Plugin（用于从 GitHub 拉取标签）
- Git Plugin
- Go Plugin

### 步骤1 ：在 Jenkins 上的 新建任务

- 输入一个任务名，比如: deploy-user-service
- 选择任务类型：pipeline
- 点击确定，进入到 General 里进行配置

### 步骤 2：编写 Jenkinsfile

在 Go 项目的根目录下创建一个 Jenkinsfile，定义 Jenkins Pipeline。以下是一个示例：

```groovy
pipeline {
    agent any

    tools {
       go 'go-1.21.3'
    }

    environment {
        GIT_URL="your-project-repo-git"
        REGISTRY = 'registry.cn-hangzhou.aliyuncs.com'
        IMAGE_NAME = 'myapp'
        NAMESPACE = 'your-docker-namespace'
    }

    // 预留可忽略
    parameters {
    //    string(name: 'branch', defaultValue: 'master', description: '请输入将要构建的代码分支')
    //    choice(name: 'mode', choices: ['deploy','rollback'], description: '请选择发布或者回滚？')
    //    choice(name: 'remote_ip', choices: ['all','10.10.9.9','10.10.9.10'], description: '选择要发布的主机')
    //    choice(name: 'GIT_TAG', choices: getGitTags(), description: 'Select the Git tag to deploy')
          gitParameter (
              branch:'',
              branchFilter: '.*',
              defaultValue: '',
              description: '选择将要构建的tag',
              name: 'GIT_TAG',
              quickFilterEnabled: true,
              selectedValue: 'TOP',
              sortMode: 'DESCENDING_SMART',
              tagFilter: '*',
              type: 'PT_TAG',
              useRepository: env.GIT_URL,
              listSize: 15
        )
    }

    stages {
        stage('Checkout') {
            steps {
                // 检出代码
                checkout scm:([
                    $class: 'GitSCM',
                    branches: [[name: "${GIT_TAG}"]],
                    userRemoteConfigs: [[
                        url: "${GIT_URL}"
                    ]]
                ])
            }
        }

        stage('Unit Test') {
            steps {
                sh 'make test'
            }
        }

        stage('Coverage Report') {
            steps {
                sh 'make cover'
                sh 'make view-cover'
            }
        }

        stage('Build') {
            steps {
                // 在本地构建 Go 项目
                sh 'make build'
            }
        }

        stage('Build Docker Image') {
            steps {
                // 在本地构建 Go 项目
                def tag = "${GIT_TAG}"
                sh 'make docker'
                sh "docker build -t ${REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${tag} ."
            }
        }

        stage('Push Docker Image') {
           steps {
               script {
                   withCredentials([usernamePassword(credentialsId: 'DOCKER_REGISTRY_CREDENTIALS_ID', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                       def tag = "${GIT_TAG}"
                       sh """
                           echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin ${REGISTRY}
                           docker push ${REGISTRY}/${NAMESPACE}/${IMAGE_NAME}:${tag}
                       """
                   }
               }
           }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Ensure kubectl is configured with the proper KUBECONFIG
                    withCredentials([file(credentialsId: 'KUBECONFIG_CREDENTIALS_ID', variable: 'KUBECONFIG')]) {
                        sh 'kubectl apply -f deploy/k8s/go-deployment.yaml'
                        sh "kubectl set image deployment/myapp myapp=${REGISTRY}/${IMAGE_NAME}:${env.BUILD_NUMBER}"
                        // or
                        sh "sed -i 's/<IMG_NAME>/${img_name}:${build_tag}/' deploy/k8s/go-deployment.yaml"
                        sh "sed -i 's/<BRANCH_NAME>/${env.BRANCH_NAME}/' deploy/k8s/go-deployment.yaml"
                        sh "/data/opt/kubernetes/client/bin/kubectl apply -f ${WORKSPACE}/deploy/k8s/go-deployment.yaml --record"
                    }
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

// Function to get Git tags
def getGitTags() {
    def gitTags = []
    def gitUrl = 'your-project-repo-git'

    withCredentials([usernamePassword(credentialsId: 'GIT_CREDENTIALS_ID', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
        def tags = sh(
            script: "git ls-remote --tags ${gitUrl} | awk '{print \$2}' | grep -o 'refs/tags/.*' | sed 's/refs\\/tags\\///g' | grep -v '^{}' | tail -n 20",
            returnStdout: true
        ).trim().split('\n')
        gitTags.addAll(tags)
    }
    return gitTags
}
```

> pipeline文档：https://www.jenkins.io/doc/book/pipeline/
> Jenkinsfile语法：https://www.jenkins.io/doc/book/pipeline/syntax/

### 步骤 3：配置 Jenkins 凭证

1. 进入 Jenkins 管理界面:

打开你的 Jenkins 服务器的管理界面。

2. 管理 Jenkins 凭证:
   
- 选择 "Manage Jenkins"（管理 Jenkins）。
- 选择 "Manage Credentials"（管理凭证）。

3. 添加新的凭证:

- 选择适当的凭证存储域（通常是全局域）。
- 点击 "Add Credentials"（添加凭证）。
- 添加密码或者 private key 的都可以
  
4. 添加 Docker Registry 凭证:

- Kind（类型）：选择 "Username with password"。
- Scope（范围）：选择 "Global"（全局）。
- Username（用户名）：输入你的 Docker Registry 用户名。
- Password（密码）：输入你的 Docker Registry 密码。
- ID：输入 DOCKER_REGISTRY_CREDENTIALS_ID，这是你在 pipeline 中引用的凭证 ID。
- Description（描述）：输入描述信息，例如 "Docker Registry Credentials"。
- 点击 "OK" 以保存凭证。

### 步骤 4：配置 Kubernetes 凭证

如果你需要在 Jenkins 中使用 Kubernetes 凭证，可以按照以下步骤操作：

1. 获取 Kubeconfig 文件:

从你的 Kubernetes 集群中获取 Kubeconfig 文件，这个文件通常位于 ~/.kube/config。

2. 在 Jenkins 中配置 Kubeconfig 凭证:

- 按照上述步骤进入 Jenkins 的 "Manage Credentials" 界面。
- 添加新的凭证，选择 "Secret file"（秘密文件）。
- Scope（范围）：选择 "Global"（全局）。
- File（文件）：上传你的 Kubeconfig 文件。
- ID：输入 KUBECONFIG_CREDENTIALS_ID，这是你在 pipeline 中引用的凭证 ID。
- Description（描述）：输入描述信息，例如 "Kubeconfig for Kubernetes Cluster"。
- 点击 "OK" 以保存凭证。

### 步骤 5：创建流水线

0. 在 General 中选择 Git Parameter(参数化构建过程) 的名称中填入 `GIT_TAG`, 参数类型为: 标签，或者在在 Jenkinsfile 配置 gitParameter.GIT_TAG，二选一即可
1. 在流水线的定义中选择：Pipeline script from SCM
2. 在 SCM 选择 Git
3. 填入仓库地址， Repository URL
4. 选择访问仓库时的凭证 Credentials
5. 填写要构建的分支或tag，比如选择master分支, 则填入 "*/master"，如果是tag,则填入 "${GIT_TAG}"
6. 指定脚本路径，主要是指 `Jenkinsfile` 的路径，如果在项目根目录下，直接填入 `Jenkinsfile` 即可。
7. 一定要把 “轻量级检出” 的勾选去掉，否则会报类似错误： `fatal: couldn't find remote ref refs/heads/v1.xx`
8. 保存并构建项目。

### 步骤 5：构建并运行 Pipeline

- 如果是分支构建：点击 “立即构建” 开始构建项目
- 如果是tag构建，点击 “Build with Parameters”， 然后选择对应的构建tag 开始构建。

## References

- https://blog.wangriyu.wang/2018/08-Jenkins.html
- https://desistdaydream.github.io/docs/9.%E8%BF%90%E7%BB%B4/Ansible/Inventory-%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E8%AF%A6%E8%A7%A3/
- https://www.youtube.com/watch?v=Bgv4C0buCsU
- https://github.com/webmagicinformatica/hello-webapp-golang/blob/master/Jenkinsfile

