---
title: Linux 基础入门
copyright: true
date: 2018-02-07 16:08:23
tags: Linux
categories: Linux
---



# Linux 基础入门

## 目录操作

### 创建目录

使用 mkdir 命令创建目录

```bash
mkdir $HOME/testFolder
```

### 切换目录

使用 cd 命令切换目录

```bash
cd $HOME/testFolder
```

使用 cd ../ 命令切换到上一级目录

```bash
cd ../
```

### 移动目录

使用 mv 命令移动目录

```bash
mv $HOME/testFolder /var/tmp
```

### 删除目录

使用 rm -rf 命令删除目录

```bash
rm -rf /var/tmp/testFolder
```

### 查看目录下的文件

使用 ls 命令查看 [[/etc](about:blank#stage-1-step-5-etc)] 目录下所有文件和文件夹

```bash
ls /etc
```

> /etc 目录默认是 *nix 系统的软件配置文件存放位置

## 文件操作

> 任务时间：5min ~ 10min

### 创建文件

使用 touch 命令创建文件

```bash
touch ~/testFile
```

执行 `ls` 命令, 可以看到刚才新建的 testFile 文件

```bash
ls ~
```

### 复制文件

使用 cp 命令复制文件

```bash
cp ~/testFile ~/testNewFile
```

### 删除文件

使用 rm 命令删除文件, 输入 `y` 后回车确认删除

```bash
rm ~/testFile
```

### 查看文件内容

使用 cat 命令查看 .bash_history 文件内容

```bash
cat ~/.bash_history
```

## 过滤, 管道与重定向

> 任务时间：5min ~ 10min

### 过滤

过滤出 /etc/passwd 文件中包含 `root` 的记录

```bash
grep 'root' /etc/passwd
```

递归地过滤出 /var/log/ 目录中包含 `linux` 的记录

```bash
grep -r 'linux' /var/log/
```

### 管道

简单来说, Linux 中管道的作用是将上一个命令的输出作为下一个命令的输入, 像 pipe 一样将各个命令串联起来执行, 管道的操作符是 |

比如, 我们可以将 cat 和 grep 两个命令用管道组合在一起

```bash
cat /etc/passwd | grep 'root'
```

过滤出 /etc 目录中名字包含 `ssh` 的目录(不包括子目录)

```bash
ls /etc | grep 'ssh'
```

### 重定向

可以使用 > 或 < 将命令的输出重定向到一个文件中

```bash
echo 'Hello World' > ~/test.txt
```

## 运维常用命令

> 任务时间：5min ~ 10min

### ping 命令

对 cloud.tencent.com 发送 4 个 ping 包, 检查与其是否联通

```bash
ping -c 4 cloud.tencent.com
```

### netstat 命令

netstat 命令用于显示各种网络相关信息，如网络连接, 路由表, 接口状态等等

列出所有处于监听状态的tcp端口

```bash
netstat -lt
```

查看所有的端口信息, 包括 PID 和进程名称

```bash
netstat -tulpn
```

### ps 命令

过滤得到当前系统中的 ssh 进程信息

```bash
ps -aux | grep 'ssh'
```