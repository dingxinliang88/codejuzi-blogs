# 安装git (MacOS)

## 通过 Homebrew 安装 Git

1. 如果没有安装 Homebrew，先打开终端（Terminal），并执行以下命令进行安装：

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

2. 安装完成后，在终端中执行以下命令来安装 Git：

```sh
brew install git
```

3. 安装完成后，通过以下命令检查 Git 是否安装成功：

```sh
git --version
```

## 通过官网下载安装包安装 Git

1. 打开 Git 官网（https://git-scm.com/downloads）并下载对应的 macOS 安装包。
2. 下载完成后，双击 dmg 文件打开安装程序，按照指示进行安装即可。
3. 安装完成后，通过以下命令检查 Git 是否安装成功：

```sh
git --version
```

安装成功后，你就可以在终端中使用 Git 命令了。



# 安装Git (Windows)

## 通过官网下载安装包安装 Git

1. 下载 Git 官方安装程序。可以从以下地址下载：https://git-scm.com/downloads。
2. 运行下载的安装程序。在安装过程中，可以按照默认设置进行安装。
3. 在安装过程中，可以选择 Git 的默认编辑器和终端模拟器。
4. 安装完成后，在开始菜单中找到 Git 并打开 Git Bash，这是 Git 在 Windows 上的命令行终端。在 Git Bash 中可以执行各种 Git 命令。

## 使用 Chocolatey 包管理器安装 Git

1. 安装 Chocolatey 包管理器。在 Windows 上打开 PowerShell 窗口，输入以下命令并运行：

   ```sh
   Set-ExecutionPolicy AllSigned; 
   iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
   ```

2. 安装 Git。在 PowerShell 窗口中输入以下命令并运行：

   ```sh
   choco install git
   ```

3. 等待 Git 安装完成。

4. 打开 Git Bash，测试 Git 是否安装成功。在 Git Bash 中输入以下命令并运行：

   ```sh
   git --version
   ```

   如果 Git 安装成功，将输出 Git 的版本信息。



# Git的必要配置

安装好 Git 之后，需要进行一些必要的配置，包括用户名、邮箱、编辑器、SSH 等配置。具体步骤如下：

1. 设置用户名和邮箱

打开终端，输入以下命令，将自己的用户名和邮箱配置到 Git 中。

```sh
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
```

2. 配置编辑器

在 Git 中，需要设置一个默认的文本编辑器，用来编辑提交信息。

比如，设置 Sublime Text 为默认编辑器，命令如下：

```sh
git config --global core.editor "subl -n -w"
```

其中，`-n` 表示新建一个文件，`-w` 表示等待文件关闭后再执行下一步操作。

3. 配置 SSH

在 Git 中，SSH 协议用于远程登录和安全传输数据。在使用 Git 进行代码提交等操作时，通常需要用到 SSH。

首先需要检查本机是否已经有 SSH 密钥对，可以在终端输入以下命令：

```sh
ls -al ~/.ssh
```

如果已经有 SSH 密钥对，则会显示出来，否则会提示没有该文件或目录。

如果没有 SSH 密钥对，则需要创建一个。具体步骤可以参考 GitHub 的帮助文档：[Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)。

创建好 SSH 密钥对后，需要将公钥添加到自己的 GitHub 账户中。可以参考 GitHub 的帮助文档：[Adding a new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)。

4. 配置 Git 命令别名（可选）

可以为 Git 命令设置一些别名，使得命令更加简短、易于记忆。比如，设置 `git st` 为查看文件状态的命令别名，命令如下：

```sh
git config --global alias.st status
```

这样，以后就可以用 `git st` 来代替 `git status` 了。

5. 查看配置信息

可以使用 `git config --list` 命令查看当前 Git 的全部配置信息。如果只想查看全局配置信息，可以加上 `--global` 参数，如下所示：

```sh
git config --global --list
```

至此，Git 的必要配置就完成了。