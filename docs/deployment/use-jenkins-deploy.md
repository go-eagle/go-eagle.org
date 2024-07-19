

将一个 Go 项目使用 Jenkins 部署到指定的机器上是一个多步骤的过程，包括配置 Jenkins、编写 Jenkinsfile、设置远程机器的环境等。以下是一个完整的方案：

## 部署到ECS

### 前提条件

1. Jenkins 已安装并运行。
2. 目标机器（要部署的机器）配置了 SSH，并能从 Jenkins 服务器上通过 SSH 访问。
3. Go 已安装在目标机器上。

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

## 部署到 k8s



