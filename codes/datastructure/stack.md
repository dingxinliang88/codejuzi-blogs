# 实验二 栈操作
1. 实验目的
掌握握单栈的基本操作：进栈、出栈、栈空、栈满等运算。
2. 实验任务（选做）
栈的高级应用：迷宫问题求解

## 一、单栈

[GitHub链接](https://github.com/dingxinliang88/hhu-iot-code-sophomore/tree/master/data_structure/common_stack)

**stack.h**
```c
#ifndef _STACK_H_
#define _STACK_H_

#include <limits.h>

#define COLOR(a, b) "\033[" #b "m" a "\033[0m"
#define RED(a) COLOR(a, 31)
#define GREEN(a) COLOR(a, 32)

#define ElementType int
#define Status int
#define OK 1
#define ERROR 0

typedef struct Stack
{
    ElementType *data;
    // init: top = -1(栈顶指针)
    int capacity, top;
} Stack;

/// @brief 初始化栈
/// @param _capacity 栈初始大小
Stack *init(int _capacity);

/// @brief 返回栈顶元素，为空则返回返回 INT_MIN
/// @return 栈顶元素 || INT_MIN
ElementType top(Stack *s);

/// @brief 判断栈是否是空
/// @return 1(true) => 栈空
int empty(Stack *s);

/// @brief 判断栈是否已满
/// @return 1(true) => 栈满
int full(Stack *s);

/// @brief val元素压栈
/// @return OK => 压栈成功， ERROR => 压栈失败
Status push(Stack *s, ElementType val);

/// @brief 栈顶元素弹栈
/// @return OK => 弹栈成功， ERROR => 弹栈失败
Status pop(Stack *s);

/// @brief 扩展栈，最大扩展为原来的两倍，元素相对位置不变
/// @return OK => 扩展栈成功
Status expand(Stack *s);

/// @brief 输出栈信息
void output(Stack *s);

/// @brief free space
void clear(Stack *s);

#endif
```

**stack.c**

```c
/***********************************************************
 * File Name: stack.c
 * Author: codejuzi
 * Date Created: 2023-04-23
 * Description: 栈实现文件
 ************************************************************/
#include "stack.h"
#include <stdio.h>
#include <stdlib.h>

Stack *init(int _capacity)
{
    Stack *s = (Stack *)malloc(sizeof(Stack));
    s->data = (ElementType *)malloc(sizeof(ElementType) * _capacity);
    s->capacity = _capacity;
    s->top = -1;
    return s;
}

ElementType top(Stack *s)
{
    return empty(s) ? INT_MIN : s->data[s->top];
}

Status push(Stack *s, ElementType val)
{
    // validation
    if (!s)
        return ERROR;
    if (full(s))
    {
        // expand
        if (!expand(s))
            return ERROR;
        printf(GREEN("expand successfully! stack->capacity = (%d)\n"), s->capacity);
    }
    s->data[++(s->top)] = val;
    return OK;
}

Status pop(Stack *s)
{
    if (!s)
        return ERROR;
    if (empty(s))
    {
        printf(RED("Stack is empty!!!\n"));
        return ERROR;
    }
    s->top -= 1;
    return OK;
}

int empty(Stack *s)
{
    return s->top == -1;
}

int full(Stack *s)
{
    return s->top == s->capacity - 1;
}

Status expand(Stack *s)
{
    int exerSize = s->capacity;
    int *p;
    while (exerSize)
    {
        p = (int *)realloc(s->data, sizeof(int) * (s->capacity + exerSize));
        // 申请成功
        if (p)
            break;
        // 申请失败，折半后重新申请
        exerSize >>= 1;
    }
    if (!p)
        return ERROR;
    s->data = p;
    s->capacity += exerSize;
    return OK;
}

void output(Stack *s)
{
    if (!s)
        return;
    printf("[");
    for (int i = 0; i <= s->top; i++)
    {
        i &&printf(", ");
        printf("%d", s->data[i]);
    }
    printf("]\n");
}

void clear(Stack *s)
{
    if (!s)
        return;
    free(s->data);
    free(s);
}

```

**app.c**
```c
/***********************************************************
 * File Name: app.c
 * Author: codejuzi
 * Date Created: 2023-04-23
 * Description: 测试文件
 ************************************************************/
#include "stack.h"
#include <stdio.h>

const int INIT_SIZE = 3;

int main(int argc, char const *argv[])
{
    Stack *s = init(INIT_SIZE);
    pop(s); // stack is empty
    push(s, 0);
    push(s, 1);
    push(s, 2);
    push(s, 3); // expand the stack ==> s->size = 6
    output(s);  // [0, 1, 2, 3]
    printf("top = %d\n", top(s)); // top = 3
    pop(s);                       // 3
    output(s);                    // [0, 1, 2]
    clear(s);
    return 0;
}

```


## 二、迷宫问题

[GitHub链接](https://github.com/dingxinliang88/hhu-iot-code-sophomore/tree/master/data_structure/maze_solve)

**mazeApp.c**
```c
#include <stdio.h>

#define COLOR(a, b) "\033[" #b "m" a "\033[0m"
#define GREEN(a) COLOR(a, 32)
#define RED(a) COLOR(a, 31)

#define MAX_MAZE_SIZE 100

typedef struct
{
    int x, y; // 格子坐标
} Position;

Position stack[MAX_MAZE_SIZE * MAX_MAZE_SIZE];
int top = -1;

// 迷宫地图
int maze[MAX_MAZE_SIZE][MAX_MAZE_SIZE];

// 标记数组，用于记录哪些格子已经访问过
int visited[MAX_MAZE_SIZE][MAX_MAZE_SIZE];

/// @brief 入栈
void push(int x, int y)
{
    top++;
    stack[top].x = x;
    stack[top].y = y;
}

/// @brief 出栈
void pop()
{
    top--;
}

/// @brief 返回栈顶元素
Position peek()
{
    return stack[top];
}

/// @brief 判断当前位置是否是终点
int isEndPosition(int x, int y, int n, int m)
{
    return (x == n - 1) && (y == m - 1);
}

/// @brief 校验坐标(x, y)是否可行
///         坐标在可行范围内 && 无障碍 && 没有被访问过
int checkValid(int x, int y, int n, int m)
{
    return x >= 0 && x < n && y >= 0 && y < m && !maze[x][y] && !visited[x][y];
}

/// @brief 深度优先搜索迷宫，从起点开始，依次遍历相邻的通道，直到找到终点或者无路可走。
///        如果找到了终点，则将路径上的位置信息存储在栈中。
int dfs(int startX, int startY, int n, int m)
{
    // 将起点入栈，并标记为已经访问过
    push(startX, startY);
    visited[startX][startY] = 1;

    // 取出栈顶元素，作为当前位置
    Position current = peek();
    if (isEndPosition(current.x, current.y, n, m))
        return 1;

    // 枚举四个方向 (枚举策略：下->右->上->左)
    int dx[4] = {1, 0, -1, 0};
    int dy[4] = {0, 1, 0, -1};
    for (int i = 0; i < 4; i++)
    {
        int newX = current.x + dx[i];
        int newY = current.y + dy[i];

        // 如果该方向可以走，则将新位置入栈，并标记为已经访问过
        if (checkValid(newX, newY, n, m))
        {
            push(newX, newY);
            visited[newX][newY] = 1;
            // 递归
            if (dfs(newX, newY, n, m))
                return 1;
            // 回溯
            pop();
            visited[newX][newY] = 0;
        }
    }
    // 四个方向皆不可行
    return 0;
}

void printPath(int n, int m)
{
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            if (visited[i][j])
            {
                printf(GREEN("%d "), maze[i][j]);
                continue;
            }
            printf("%d ", maze[i][j]);
        }
        printf("\n");
    }
}

/*
【测试数据1：能找到路径】
10 10
0 1 0 0 0 1 0 1 0 0
0 0 0 1 0 0 0 1 0 1
0 1 0 1 0 1 0 0 0 0
0 0 0 0 1 0 1 0 1 0
0 1 0 1 0 0 0 0 0 1
0 0 0 0 0 1 0 1 0 0
0 1 0 1 0 0 0 0 1 0
0 1 0 0 0 1 0 0 0 1
1 0 0 1 0 1 0 0 0 0
1 1 0 0 0 0 0 1 1 0

【测试数据2：不能找到路径】
10 10
0 1 0 0 0 1 0 1 0 0
0 0 0 1 0 0 0 1 0 1
0 1 0 1 0 1 0 0 0 0
0 0 0 0 1 0 1 0 1 0
0 1 0 1 0 0 0 0 0 1
0 0 0 0 0 1 0 1 0 0
0 1 0 1 0 0 0 0 1 0
0 1 0 0 0 1 0 0 0 1
1 0 0 1 0 1 0 0 0 1
1 1 0 0 0 0 0 1 1 0
*/
int main(int argc, char const *argv[])
{
    // 输入迷宫地图
    int n, m;
    scanf("%d %d", &n, &m);
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < m; j++)
        {
            scanf("%d", &maze[i][j]);
        }
    }

    // 求解迷宫问题
    int startX = 0, startY = 0;
    int result = dfs(startX, startY, n, m);
    if (!result)
    {
        printf(RED("无法找到终点!\n"));
        return 1;
    }
    // 输出路径
    printf(GREEN("找到终点!\n"));
    printPath(n, m);
    return 0;
}
```