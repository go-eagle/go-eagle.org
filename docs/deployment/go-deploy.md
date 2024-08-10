---
id: go-deploy
title: 搭建Go开发环境
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /deployment/go-deploy
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Go 环境安装

官方下载地址：

- https://go.dev/dl/
- https://golang.google.cn/dl/

<Tabs>
  <TabItem value="macOS(x86-64)" label="macOS(x86-64)" default>

  macOS 10.15 or later, Intel 64-bit processor

    ```bash
    $ wget https://go.dev/dl/go1.22.3.darwin-amd64.tar.gz
    ```
    解压并安装

    ```bash
    $ tar -xvzf go1.22.3.darwin-amd64.tar.gz -C /usr/local

    # 查看安装目录
    $ ll /usr/local/go

    # 查看安装的版本
    $ go version
    go version go1.22.3 darwin/amd64
    ```
  </TabItem>
  <TabItem value="macOS(ARM64)" label="macOS(ARM64)">

  macOS 11 or later, Apple 64-bit processor

    ```bash
    $ wget https://go.dev/dl/go1.22.3.darwin-arm64.tar.gz
    ```
    解压并安装

    ```bash
    $ tar -xvzf go1.22.3.darwin-arm64.tar.gz -C /usr/local

    # 查看安装目录
    $ ll /usr/local/go

    # 查看安装的版本
    $ go version
    go version go1.22.3 darwin/arm64
    ```
  </TabItem>
  <TabItem value="Linux" label="Linux">

  Linux 2.6.32 or later, Intel 64-bit processor

    ```bash
    $ wget https://go.dev/dl/go1.22.3.linux-amd64.tar.gz
    ```
    解压并安装

    ```bash
    $ tar -xvzf go1.22.3.linux-amd64.tar.gz -C /usr/local

    # 查看安装目录
    $ ll /usr/local/go

    # 查看安装的版本
    $ go version
    go version go1.22.3 linux/amd64
    ```
  </TabItem>
  <TabItem value="Windows" label="Windows">

  Windows 10 or later, Intel 64-bit processor

    ```bash
    $ wget https://go.dev/dl/go1.22.3.windows-amd64.msi
    ```

  默认情况下 `.msi` 文件会安装在 `C:\Go` 目录下，可选择自定义路径进行安装

    ```bash
    # 查看安装的版本
    $ go version
    # Output
    go version go1.22.3 windows/amd64
    ```
  </TabItem>
</Tabs>

## 环境变量配置

vim $HOME/.bashrc

> /.bashrc可以替换为 .zshrc, 配置文件以自己使用的为准

```bash

tee -a $HOME/.bashrc <<'EOF'
# go env
export GOROOT="/usr/local/go"             # GOROOT 设置
export GOPATH=$HOME/go                    # GOPATH 设置
export PATH=$GOROOT/bin:$GOPATH/bin:$PATH # 加入到 PATH 路径
export GO111MODULE="on"                   # 开启 Go moudles
export GOPROXY=https://goproxy.cn,direct  # 代理服务器设置
export GOSUMDB=off                        # 关闭校验 Go 依赖包的哈希值
EOF
```

## ProtoBuf 环境安装

### 安装 protoc 编译器

```bash
$ PB_REL="https://github.com/protocolbuffers/protobuf/releases"
# 如果是macOS 可以改为 osx
$ OS="linux"
$ VERSION="3.18.1"
$ curl -LO $PB_REL/download/v$VERSION/protoc-$VERSION-$OS-x86_64.zip

$ unzip protoc-$VERSION-$OS-x86_64.zip -d /usr/local

$ export PATH="$PATH:/usr/local/bin"
```

查看版本

```bash
protoc --version
libprotoc 3.18.1
```

### 安装 protoc-gen-go 插件

该插件的主要作用是生成 `*.pb.go` 代码，包含消息序列化代码，对应的是参数 `--go_out=xx`

运行：

```shell script
# 安装
go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.27.1

# 更新到指定版本
go get -u google.golang.org/protobuf/cmd/protoc-gen-go@vX.X.X
```

编译后会安装 `protoc-gen-go` 到 `$GOBIN` 目录, 默认在 `$GOPATH/bin`.  
该目录必须在系统的环境变量 `$PATH中`，这样在编译 `.proto` 文件时 `protocol` 编译器才能找到插件。

### 安装 protoc-gen-go-grpc 插件

该插件的主要作用是生成 `*._grpc.pb.go` 代码， 主要生成 `gRPC` 代码，对应的是参数 `--go-grpc_out=xx`

安装

```shell script
# 安装
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.1.0

# 更新到指定版本
go get -u google.golang.org/grpc/cmd/protoc-gen-go-grpc@vX.X.X
```

> 这种参数方式 `--go_out=plugins=grpc` 是比较老的方式，新的都是按上面的方式使用的  
> 参考：[Differences between protoc-gen-go and protoc-gen-go-grpc](https://stackoverflow.com/questions/64828054/differences-between-protoc-gen-go-and-protoc-gen-go-grpc)

### 编译安装 protoc

如果需要，也可以进行编译安装

```bash
# 安装依赖工具
$ sudo yum -y install make autoconf automake cmake perl-CPAN libcurl-devel libtool gcc gcc-c++ glibc-headers zlib-devel git-lfs telnet ctags lrzsz jq expat-devel openssl-devel

# 编译安装 protoc

# 第一步：安装 protobuf
$ cd /tmp/
$ git clone --depth=1 https://github.com/protocolbuffers/protobuf
$ cd protobuf
$ ./autogen.sh
$ ./configure
$ make
$ sudo make install
$ protoc --version # 查看 protoc 版本，成功输出版本号，说明安装成功
libprotoc 3.15.6

# 第二步：安装 protoc-gen-go
$ go get -u github.com/golang/protobuf/protoc-gen-go

```

📢 注意事项

`protoc` 和 `protoc-gen-xxx` 插件 和 `grpc` 和 `protobuf` 在选择哪个版本组合使用时，有没有推荐组合的版本号？

这里推荐：

protoc v3.18.1  
protoc-gen-go v1.27.1  
protoc-gen-go-grpc v1.1.0  
grpc v1.43.0  
protobuf v1.33.0 

如果有新组合，欢迎告知，感谢~


## Go 开发 IDE 安装和配置

主流的有三种

- Goland
- VSCode
- Vim(NeoVim)

可以根据个人爱好来进行选择。

### 安装vim

这里以 NeoVim 为例进行安装

```bash
# Linux
$ sudo pip3 install pynvim
$ sudo yum -y install neovim

# macOS
brew install neovim
python3 -m pip install pynvim
```

### 配置bashrc

```bash
tee -a $HOME/.bashrc <<'EOF'
# Configure for nvim
export EDITOR=nvim # 默认的编辑器
alias vim="nvim"
EOF
```

### 检查 nvim 是否安装成功

```bash
$ bash
$ vi --version # 输出 NVIM v0.3.8 说明安装成功
NVIM v0.3.8
Build type: RelWithDebInfo
...
```

### 配置 neovim

#### 安装 plug 插件

```bash
# see: see: https://github.com/junegunn/vim-plug#toc1
sh -c 'curl -fLo ~/.config/nvim/autoload/plug.vim --create-dirs \
       https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim'
```

#### 配置 init.vim

```bash
# vim ~/.config/nvim/init.vim
let mapleader = ","
# find python3: which python3
let g:python3_host_prog = '/usr/local/bin/python3'

filetype on
filetype indent on
filetype plugin on

set encoding=UTF-8

syntax on
set nocompatible
set hlsearch
set number relativenumber
set laststatus=2
set vb
set ruler
set spelllang=en_us
set autoindent
set colorcolumn=80
set mouse=a
set clipboard=unnamed
set noscrollbind
set wildmenu
set autochdir

hi Search cterm=NONE ctermfg=black ctermbg=red

" No more Arrow Keys, deal with it
noremap <Up> <NOP>
noremap <Down> <NOP>
noremap <Left> <NOP>
noremap <Right> <NOP>

" netrw

nnoremap - :Explore<CR>
let g:netrw_banner = 0
let g:netrw_liststyle = 3
let g:netrw_bufsettings = 'noma nomod nu nobl nowrap ro'
autocmd FileType netrw setl bufhidden=delete

"-- netrw END

" plug 
call plug#begin()
"> Must Have
Plug 'vim-airline/vim-airline' " https://github.com/vim-airline/vim-airline
Plug 'ctrlpvim/ctrlp.vim'      " https://github.com/ctrlpvim/ctrlp.vim
Plug 'ryanoasis/vim-devicons'  " https://github.com/ryanoasis/vim-devicons + https://github.com/ryanoasis/nerd-fonts/
Plug 'tpope/vim-commentary'    " https://github.com/tpope/vim-commentary
Plug 'airblade/vim-gitgutter'  " https://github.com/airblade/vim-gitgutter
Plug 'mkitt/tabline.vim'       " https://github.com/mkitt/tabline.vim
Plug 'github/copilot.vim'      " https://github.com/github/copilot.vim

"> Go
Plug 'fatih/vim-go', { 'do': ':GoInstallBinaries' } " https://github.com/fatih/vim-go
Plug 'neoclide/coc.nvim', {'branch': 'release'}     " https://github.com/neoclide/coc.nvim
Plug 'SirVer/ultisnips'                             " https://github.com/sirver/UltiSnips

"> Theme
Plug 'NLKNguyen/papercolor-theme' " https://github.com/NLKNguyen/papercolor-theme
call plug#end()

"-- plug END

" ctrlp
set runtimepath^=~/.vim/bundle/ctrlp.vim
let g:ctrlp_user_command = ['.git', 'cd %s && git ls-files -co --exclude-standard']

" vim-gitgutter

set updatetime=500

"-- vim-gitgutter END

" papercolor-theme

set termguicolors
set background=dark
colorscheme PaperColor

"-- papercolor-theme END
```

#### 安装插件

使用 vim 打开任一文件，执行以下命令来安装依赖包：

```bash
:PlugInstall
```

> 插件默认安装在 `~/.config/nvim/plugged` 目录下

#### 执行健康检查

```bash
:checkhealth
```

#### 配置插件 go.vim

创建目录 `mkdir -p ~/.config/nvim/ftdetect`

新建文件并加入以下内容： `~/.config/nvim/ftdetect/go.vim`

```bash
# vim ~/.config/nvim/ftdetect/go.vim
"-- vim-go specific configuration

" run :GoBuild or :GoTestCompile based on the go file
function! s:build_go_files()
  let l:file = expand('%')
  if l:file =~# '^\f\+_test\.go$'
    call go#test#Test(0, 1)
  elseif l:file =~# '^\f\+\.go$'
    call go#cmd#Build(0)
  endif
endfunction

autocmd FileType go nmap <leader>b :<C-u>call <SID>build_go_files()<CR>
autocmd FileType go nmap <Leader>c <Plug>(go-coverage-toggle)
autocmd FileType go nmap <leader>t <Plug>(go-test)

autocmd Filetype go command! -bang A call go#alternate#Switch(<bang>0, 'edit')
autocmd Filetype go command! -bang AV call go#alternate#Switch(<bang>0, 'vsplit')
autocmd Filetype go command! -bang AS call go#alternate#Switch(<bang>0, 'split')
autocmd Filetype go command! -bang AT call go#alternate#Switch(<bang>0, 'tabe')

autocmd FileType go setlocal foldmethod=expr foldexpr=getline(v:lnum)=~'^\s*'.&commentstring[0]

let g:go_list_type = "quickfix"    " error lists are of type quickfix
let g:go_fmt_command = "goimports" " automatically format and rewrite imports
let g:go_auto_sameids = 1          " highlight matching identifiers

"-- highlight config
let g:go_highlight_types = 1
let g:go_highlight_fields = 1
let g:go_highlight_functions = 1
let g:go_highlight_function_calls = 1
let g:go_highlight_extra_types = 1
let g:go_highlight_generate_tags = 1

"-- vim-go specific configuration (END)

"-- coc.nvim specific configuration
"-- see: https://github.com/neoclide/coc.nvim#example-vim-configuration
"-- see: https://unpkg.com/coc.nvim@0.0.77/doc/coc.cnx

set hidden
set cmdheight=2
set updatetime=300
set shortmess+=c
if has("patch-8.1.1564")
  set signcolumn=number
else
  set signcolumn=yes
endif

nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gr <Plug>(coc-references)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> rn <Plug>(coc-rename)

nnoremap <silent> K :call <SID>show_documentation()<CR>
function! s:show_documentation()
  if (index(['vim','help'], &filetype) >= 0)
    execute 'h '.expand('<cword>')
  else
    call CocAction('doHover')
  endif
endfunction

"-- coc.nvim specific configuration (END)
```

#### 配置go补全

新建文件，如果没有

```bash
vim ~/.config/nvim/coc-settings.json
```

加入以下内容

```javascript
{
    "languageserver": {
        "golang": {
            "command": "gopls",
            "rootPatterns": [
                "go.mod"
            ],
            "filetypes": [
                "go"
            ]
        }
    },
    "suggest.noselect": false,
    "coc.preferences.diagnostic.displayByAle": true,
    "suggest.floatEnable": true
}
```

安装扩展

> 注意： 需要安装 node，否则安装无效

```bash
:CocInstall coc-json coc-tsserver

:CocInstall coc-python
```


## Reference

- init配置：[https://gist.github.com/MarioCarrion/836dc17e15096b6c2414ce9b0acd93a4](https://gist.github.com/MarioCarrion/836dc17e15096b6c2414ce9b0acd93a4)
- go.vim: [https://gist.github.com/MarioCarrion/99f6a6110796cff5df118822472a0bc9](https://gist.github.com/MarioCarrion/99f6a6110796cff5df118822472a0bc9)
- 字体安装：[https://github.com/ryanoasis/nerd-fonts/](https://github.com/ryanoasis/nerd-fonts/)
- [https://github.com/rafi/vim-config](https://github.com/rafi/vim-config)
- [https://ctrlpvim.github.io/ctrlp.vim/](https://ctrlpvim.github.io/ctrlp.vim/)
- [https://github.com/ctrlpvim/ctrlp.vim](https://github.com/ctrlpvim/ctrlp.vim)
- [https://wklken.me/posts/2015/06/07/vim-plugin-ctrlp.html](https://wklken.me/posts/2015/06/07/vim-plugin-ctrlp.html)
