# MacOS Vscode调试C/C++文件

> ## 机器机型：
>
> - M1 Pro 2021 14英寸

## 1、环境配置

- gcc
- gdb
- g++

## 2、Vscode 工作区

`launch.json`文件

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "C: Launch",
            "type": "cppdbg",
            "request": "launch",
            "program": "${workspaceFolder}/bin/app.out",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${workspaceFolder}",
            "environment": [],
            "externalConsole": true,
            "MIMode": "lldb",
            "preLaunchTask": "build",
            "setupCommands": [
                {
                    "description": "Enable pretty-printing for gdb",
                    "text": "-enable-pretty-printing",
                    "ignoreFailures": true
                }
            ]
        }
    ]
}

```

**重点说明**：

- `"program": "${workspaceFolder}/bin/app.out"` => 可执行文件位置：当前目录下`/bin/app.out`

`tasks.json`文件

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "build",
            "type": "shell",
            "command": "gcc -Wall -g -o bin/app.out $(find ./test_work_space2/ -name '*.c')",
            "group": {
                "kind": "build",
                "isDefault": true
            }
        }
    ]
}

```

**重点说明**

- `"gcc -Wall -g -o bin/app.out $(find ./test_work_space2/ -name '*.c')"` => 要编译的C文件，每次执行前需要先确定好要调试的文件位置，修改`./test_work_space2/`

<font color="red">**注意**：</font>按照上述的配置需要工作区有`bin`目录存在，如果需要让编译器自动创建`bin`目录，可以加上`mkdir -p`参数，这个命令会首先检查bin目录是否存在。如果存在，它会跳过创建，否则会创建bin目录。然后，它将执行你的编译命令并将输出保存到`bin/app.out`文件中。

```sh
mkdir -p bin && gcc -Wall -g -o bin/app.out $(find ./test_work_space/ -name '*.c')
```

=> 修改后的`tasks.json`中的`command`命令

```json
"command": "mkdir -p bin && gcc -Wall -g -o bin/app.out $(find ./test_work_space2/ -name '*.c')"
```

> TIPS：可以根据自己的需要客制化命令，上述配置支持多文件编译



## 3、调试

在需要调试的地方打断点，按下`F5`启动调试即可