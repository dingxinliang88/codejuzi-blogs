# 实验一 单链表的创建和查询

1. 结点定义：
data:数据域，如int,char
next:指针域

2. 用链式存储结构创建单链表（带头结点与不带头结点两种方式）

对以上创建好的链表。输入值x，查找值为x的结点，并输出


## 一、带头节点

**structure.h**
```c
#include <stdio.h>
#include <stdlib.h>

#pragma region Color

#define COLOR(a, b) "\033[" #b "m" a "\033[0m"
#define GREEN(a) COLOR(a, 32)

#pragma endregion

#pragma region Constant

#define OK 0
#define ERROR 1
#define Status int

#pragma endregion

#pragma region LNode

/// @brief 节点
typedef struct LNode
{
    int data;

    struct LNode *next;
} LNode;

#pragma endregion

#pragma region LList

/// @brief 链表
typedef struct LList
{
    LNode *head;

    int length;
} LList;

#pragma endregion

/// @brief 创建节点
/// @param data
/// @return 指向新节点的指针
LNode *createLNode(int data);

/// @brief 初始化链表
/// @return 指向链表头的指针
LList *createLList();

/// @brief 插入节点（头插法）
/// @param l 链表
/// @param data 待插入的数据
/// @return OK => 插入成功， ERROR => 插入失败
Status insertLNode(LList *l, int data);

/// @brief 在链表的index位置插入节点
/// @param l 链表
/// @param index index索引位置
/// @param data 待插入数据
/// @return OK => 插入成功， ERROR => 插入失败
Status insertLNodeByIndex(LList *l, int index, int data);

/// @brief 输出链表
/// @param l 链表
void outputLList(LList *l);

/// @brief 释放链表
/// @param l 链表
void clearLList(LList *l);

/// @brief 根据val查询，并输出
/// @param l 链表
/// @param val 待查找的数据
/// @return OK => 查找到， ERROR => 链表为空 || 查询无果
Status searchElement(LList *l, int val);

```

**structure.c**

```c
/***********************************************************
 * File Name: structure.c
 * Author: codejuzi
 * Date Created: 2023-04-12
 * Description: 方法实现文件 => "structure.c"
 ************************************************************/
#include "structure.h"

LNode *createLNode(int data)
{
    LNode *node = (LNode *)malloc(sizeof(LNode));
    node->data = data;
    node->next = NULL;
    return node;
}

LList *createLList()
{
    LList *l = (LList *)malloc(sizeof(LList));
    l->head = (LNode *)malloc(sizeof(LNode));
    l->head->next = NULL;
    l->length = 0;
    return l;
}

Status insertLNode(LList *l, int data)
{
    LNode *node = createLNode(data);
    node->next = l->head->next;
    l->head->next = node;
    l->length++;
    return OK;
}

Status insertLNodeByIndex(LList *l, int index, int data)
{
    // validation
    if (index <= 0 || index > l->length)
    {
        printf(GREEN("index不合法!\n"));
        return ERROR;
    }
    LNode *p = l->head;
    // index - 1：index = 1 => 插入在第一个位置（索引从1开始，而不是0）
    for (int i = 0; i < index - 1; i++)
    {
        p = p->next;
    }
    // insert
    LNode *newNode = createLNode(data);
    newNode->next = p->next;
    p->next = newNode;
    return OK;
}

void outputLList(LList *l)
{
    // validation
    if (!l)
        return;
    printf("LinkedList(%d) = [", l->length);
    for (LNode *p = l->head->next; p; p = p->next)
    {
        printf("%d->", p->data);
    }
    printf("NULL]\n");
}

void clearLList(LList *l)
{
    LNode *p = l->head;
    for (; p;)
    {
        LNode *tmp = p->next;
        free(p);
        p = tmp;
    }
    free(l);
}

Status searchElement(LList *l, int val)
{

    if (!l->head->next)
    {
        printf(GREEN("链表为空！\n"));
        return ERROR;
    }
    int count = 1;
    LNode *p = l->head->next;
    while (p && p->data != val)
    {
        p = p->next;
        ++count;
    }
    if (!p)
    {
        printf(GREEN("查询无果！\n"));
        return ERROR;
    }
    printf("找到值p->data = %d,在链表中是第%d位\n", val, count);
    return OK;
}

```

**app.c**

```c
/***********************************************************
* File Name: app.c
* Author: codejuzi
* Date Created: 2023-04-12
* Description: 测试类（带头节点）
************************************************************/

#include "structure.h"

int main(int argc, char const *argv[])
{
    LList *l = createLList();
    searchElement(l, 0); // l is empty
    insertLNode(l, 0);
    insertLNode(l, 1);
    insertLNode(l, 2);
    insertLNode(l, 3);
    insertLNode(l, 4);
    outputLList(l); // 4 -> 3 -> 2 -> 1 -> 0
    insertLNodeByIndex(l, 2, 5);
    outputLList(l); // 4 -> 5 -> 3 -> 2 -> 1 -> 0
    searchElement(l, 2); // count = 4
    searchElement(l, 6); // not found
    clearLList(l);
    return 0;
}

```

## 二、不带头节点

**structure.h**
```c
#include <stdio.h>
#include <stdlib.h>

#pragma region Color

#define COLOR(a, b) "\033[" #b "m" a "\033[0m"
#define GREEN(a) COLOR(a, 32)

#pragma endregion

#pragma region Constant

#define OK 0
#define ERROR 1
#define Status int

#pragma endregion

#pragma region LNode

/// @brief 节点
typedef struct LNode
{
    int data;

    struct LNode *next;
} LNode;

#pragma endregion

#pragma region LList

/// @brief 链表
typedef struct LList
{
    LNode *head;

    int length;
} LList;

#pragma endregion

/// @brief 创建节点
/// @param data
/// @return 指向新节点的指针
LNode *createLNode(int data);

/// @brief 初始化链表
/// @return 指向链表头的指针
LList *createLList();

/// @brief 插入节点（头插法）
/// @param l 链表
/// @param data 待插入的数据
/// @return OK => 插入成功， ERROR => 插入失败
Status insertLNode(LList *l, int data);

/// @brief 在链表的index位置插入节点
/// @param l 链表
/// @param index index索引位置
/// @param data 待插入数据
/// @return OK => 插入成功， ERROR => 插入失败
Status insertLNodeByIndex(LList *l, int index, int data);

/// @brief 输出链表
/// @param l 链表
void outputLList(LList *l);

/// @brief 释放链表
/// @param l 链表
void clearLList(LList *l);

/// @brief 根据val查询，并输出
/// @param l 链表
/// @param val 待查找的数据
/// @return OK => 查找到， ERROR => 链表为空 || 查询无果
Status searchElement(LList *l, int val);

```

**structure.c**
```c
/***********************************************************
* File Name: structure.c
* Author: codejuzi
* Date Created: 2023-04-12
* Description: 方法实现文件 => "structure.c"
************************************************************/
#include "structure.h"

/// @brief
/// @param data
/// @return
LNode *createLNode(int data)
{
    LNode *node = (LNode *)malloc(sizeof(LNode));
    node->data = data;
    node->next = NULL;
    return node;
}

LList *createLList()
{
    LList *l = (LList *)malloc(sizeof(LList));
    l->length = 0;
    return l;
}

Status insertLNode(LList *l, int data)
{
    LNode *node = createLNode(data);
    l->length++;
    node->next = l->head;
    l->head = node;
    return OK;
}

Status insertLNodeByIndex(LList *l, int index, int data)
{
    // validation
    if (index <= 0 || index > l->length)
    {
        printf(GREEN("index不合法!\n"));
        return ERROR;
    }
    LNode *p = l->head;
    // 1 ~ index - 1：不带头节点， index=2,只需要移动一位，以此类推
    for (int i = 1; i < index - 1; i++)
    {
        p = p->next;
    }
    LNode *newNode = createLNode(data);
    newNode->next = p->next;
    p->next = newNode;
    return OK;
}

void outputLList(LList *l)
{
    // validation
    if (!l)
        return;
    printf("LinkedList(%d) = [", l->length);
    for (LNode *p = l->head; p; p = p->next)
    {
        printf("%d->", p->data);
    }
    printf("NULL]\n");
}

void clearLList(LList *l)
{
    LNode *p = l->head;
    if (!p)
    {
        free(l);
        return;
    }
    for (; p;)
    {
        LNode *tmp = p->next;
        free(p);
        p = tmp;
    }
    free(l);
}

Status searchElement(LList *l, int val)
{
    if (!l->head)
    {
        printf(GREEN("链表为空！\n"));
        return ERROR;
    }
    int count = 1;
    LNode *p = l->head;
    while (p && p->data != val)
    {
        p = p->next;
        ++count;
    }
    if (!p)
    {
        printf(GREEN("查询无果！\n"));
        return ERROR;
    }
    printf("找到值p->data = %d,在链表中是第%d位\n", val, count);
    return OK;
}
```

**app.c**
```c
/***********************************************************
 * File Name: app.c
 * Author: codejuzi
 * Date Created: 2023-04-12
 * Description: 测试类（不带头节点）
 ************************************************************/
#include "structure.h"

int main(int argc, char const *argv[])
{
    LList *l = createLList();
    searchElement(l, 0); // l is empty
    insertLNode(l, 0);
    insertLNode(l, 1);
    insertLNode(l, 2);
    insertLNode(l, 3);
    insertLNode(l, 4);
    outputLList(l); // 4 -> 3 -> 2 -> 1 -> 0
    insertLNodeByIndex(l, 1, 5);
    outputLList(l); // 5 -> 4 -> 3 -> 2 -> 1 -> 0
    insertLNodeByIndex(l, 2, 6);
    outputLList(l); //  5 -> 6 -> 4 -> 3 -> 2 -> 1 -> 0
    searchElement(l, 4); // count = 3;
    searchElement(l, 0); // count = 7;
    searchElement(l, 8); // not found;
    clearLList(l);
    return 0;
}

```