# 实验二 队列操作
1. 实验目的
掌握队列的基本操作：进队、出队、判队空、判队满等运算。
2. 实验任务
完成循环队列的基本操作


## 一、队列

**queue.h**
```c
#ifndef _QUEUE_H_
#define _QUEUE_H_

#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

#define ElementType int
#define Status int
#define OK 1
#define ERROR 0

#define COLOR(a, b) "\033[" #b "m" a "\033[0m"
#define GREEN(a) COLOR(a, 32)
#define RED(a) COLOR(a, 31)

typedef struct Queue
{
    ElementType *data;
    int head, tail;
    int capacity; // 队列容量
} Queue;

/// @brief 队列初始化
/// @param _capacity 初始化队列容量
/// @return 指向队列的pointer
Queue *initQueue(int _capacity);

/// @brief 返回队列是否为空
/// @return EMPTY(1) ==> 队列为空，否则不为空
int empty(Queue *q);

/// @brief 返回队列是否已满
/// @return 1 ==> 队列满
int full(Queue *q);

/// @brief push val到队列
/// @return OK => 添加成功，ERROR => 添加失败
Status enqueue(Queue *q, ElementType val);

/// @brief 弹出队列头的元素
/// @return OK => 弹出成功， ERROR => 弹出失败
Status dequeue(Queue *q);

/// @brief 返回队列头的元素，如果队列为空，返回INT_MIN
/// @return 队列头元素 || INT_MIN
ElementType peek(Queue *q);

/// @brief 扩展队列，最大扩展为原来的两倍，元素相对位置不变
/// @return OK => 扩展队列成功
Status expand(Queue *q);

/// @brief 输出队列
void output(Queue *q);

/// @brief 清空队列
void clear(Queue *q);

#endif
```

**queue.c**
```c
/***********************************************************
 * File Name: queue.c
 * Author: codejuzi
 * Date Created: 2023-04-15
 * Description: queue.c => 实现 queue.h
 ************************************************************/
#include "queue.h"

Queue *initQueue(int _capacity)
{
    Queue *q = (Queue *)malloc(sizeof(Queue));
    q->data = (ElementType *)malloc(sizeof(ElementType) * _capacity);
    q->capacity = _capacity;
    // tail指向最后一个元素的下一个地址
    q->head = q->tail = 0;
    return q;
}

int empty(Queue *q)
{
    return q->head == q->tail;
}

int full(Queue *q)
{
    return q->tail == q->capacity;
}

Status enqueue(Queue *q, ElementType val)
{
    if (full(q))
    {
        // expand
        if (!expand(q))
            return ERROR;
        printf(GREEN("expand successfully! queue->capacity = (%d)\n"), q->capacity);
    }
    q->data[q->tail++] = val;
    return OK;
}

Status dequeue(Queue *q)
{
    if (empty(q))
    {
        printf(RED("queue is empty!!!\n"));
        return ERROR;
    }
    q->head++;
    return OK;
}

ElementType peek(Queue *q)
{
    if (empty(q))
    {
        printf(RED("queue is empty!!!\n"));
        return INT_MIN;
    }
    return q->data[q->head];
}

Status expand(Queue *q)
{
    int exerSize = q->capacity;
    int *p;
    while (exerSize)
    {
        p = (int *)reallocf(q->data, q->capacity + exerSize);
        if (p)
            break;
        // reallocf failed
        exerSize >>= 1;
    }
    if (!p)
        return ERROR;
    q->data = p;
    q->capacity += exerSize;
    return OK;
}

void output(Queue *q)
{
    if (!q)
        return;
    printf("Queue : [");
    for (int i = q->head, j = 0; i < q->tail; i++, j++)
    {
        j &&printf(", "); // 打印逗号和空格
        printf("%d", q->data[i]);
    }
    printf("]\n");
    return;
}

void clear(Queue *q)
{
    if (!q)
        return;
    free(q->data);
    free(q);
    return;
}

```

**app.c**
```c
/***********************************************************
 * File Name: app.c
 * Author: codejuzi
 * Date Created: 2023-04-15
 * Description: 测试文件
 ************************************************************/
#include "queue.h"
#include <stdio.h>

const int QUEUE_CAPACITY = 3;

int main(int argc, char const *argv[])
{

    Queue *q = initQueue(QUEUE_CAPACITY);
    printf("peek = %d\n", peek(q)); // INT_MIN
    enqueue(q, 0);
    enqueue(q, 1);
    enqueue(q, 2);
    output(q);                      // [0, 1, 2]
    printf("peek = %d\n", peek(q)); // peek = 0
    enqueue(q, 3);                  // expand
    dequeue(q);
    dequeue(q);
    output(q);                      // [2]
    printf("peek = %d\n", peek(q)); // peek = 2
    dequeue(q);
    dequeue(q);
    output(q);  // []
    dequeue(q); // q is empty
    clear(q);
    return 0;
}

```



## 二、循环队列

**queue.h**

```c
#ifndef _QUEUE_H_
#define _QUEUE_H_

#include <limits.h>

#define COLOR(a, b) "\033[" #b "m" a "\033[0m"
#define RED(a) COLOR(a, 31)
#define GREEN(a) COLOR(a, 32)

#define ElementType int
#define Status int
#define OK 1
#define ERROR 0

typedef struct Cycle_Queue
{
    ElementType *data;
    int front, rear; // 指向队头、队尾指针
    int capacity;
} CQueue;

/// @brief 初始化循环队列
/// @param _capacity 循环队列初始化容量
/// @return Queue *
CQueue *init(int _capacity);

/// @brief val入队
/// @return OK => 入队成功， ERROR => 入队失败
Status enqueue(CQueue *cq, ElementType val);

/// @brief 队头元素出队
/// @return OK => 出队成功， ERROR => 出队失败
Status dequeue(CQueue *cq);

/// @brief 返回队头元素，如果队列为空，返回 INT_MIN
/// @return 队头元素 || INT_MIN
ElementType peekFirst(CQueue *cq);

/// @brief 返回队尾元素，如果队列为空，返回 INT_MIN
/// @return 队尾元素 || INT_MIN
ElementType peekLast(CQueue *cq);

/// @brief 返回队列中元素个数
int size(CQueue *cq);

/// @brief 判断队列是否已满
/// @return 1(true) => 队列已满
int full(CQueue *cq);

/// @brief 判断队列是否为空
/// @return 1(true) => 队列为空
int empty(CQueue *cq);

/// @brief 扩展队列容量，扩展至原有容量的两倍
/// @return OK => 扩容成功
Status expand(CQueue *cq);

/// @brief 输出队列
void output(CQueue *cq);

/// @brief 释放队列
void clear(CQueue *cq);

#endif
```


**queue.c**

```c
/***********************************************************
 * File Name: queue.c
 * Author: codejuzi
 * Date Created: 2023-04-24
 * Description: 循环队列实现
 ************************************************************/
#include "queue.h"
#include <stdio.h>
#include <stdlib.h>

CQueue *init(int _capacity)
{
    CQueue *cq = (CQueue *)malloc(sizeof(CQueue));
    cq->data = (ElementType *)malloc(sizeof(ElementType) * _capacity);
    // rear指向最后一个元素的下一个地址
    cq->front = cq->rear = 0;
    cq->capacity = _capacity;
    return cq;
}

Status enqueue(CQueue *cq, ElementType val)
{
    if (full(cq))
    {
        if (!expand(cq))
            return ERROR;
        printf(GREEN("expand successfully! cycle_queue->capacity = (%d)\n"), cq->capacity);
    }
    cq->data[cq->rear] = val;
    cq->rear = (cq->rear + 1) % cq->capacity;
    return OK;
}

Status dequeue(CQueue *cq)
{
    if (empty(cq))
    {
        printf(RED("cycle_queue is empty!!!\n"));
        return ERROR;
    }
    cq->front = (cq->front + 1) % cq->capacity;
    return OK;
}

ElementType peekFirst(CQueue *cq)
{
    return empty(cq) ? INT_MIN : cq->data[cq->front];
}

ElementType peekLast(CQueue *cq)
{
    return empty(cq) ? INT_MIN : cq->data[(cq->rear - 1 + cq->capacity) % cq->capacity];
}

int size(CQueue *cq)
{
    return (cq->rear - cq->front + cq->capacity) % cq->capacity;
}

int full(CQueue *cq)
{
    return (cq->rear + 1) % cq->capacity == cq->front;
}

int empty(CQueue *cq)
{
    return cq->front == cq->rear;
}

Status expand(CQueue *cq)
{
    int newCapacity = cq->capacity << 1;
    ElementType *newData = (ElementType *)malloc(sizeof(ElementType) * newCapacity);
    if (!newData)
        return ERROR;
    // 将原来的队列中的元素全部复制到新队列中
    for (int i = 0; i < cq->capacity - 1; i++)
    {
        newData[i] = cq->data[(cq->front + i) % cq->capacity];
    }

    cq->front = 0;
    cq->rear = cq->capacity - 1;
    cq->capacity = newCapacity;
    free(cq->data);
    cq->data = newData;
    return OK;
}

void output(CQueue *cq)
{
    printf("Cycle queue: [");
    for (int i = cq->front; i != cq->rear; i = (i + 1) % cq->capacity)
    {
        printf("%d", cq->data[i]);
        if ((i + 1) % cq->capacity != cq->rear)
        {
            printf(",");
        }
    }
    printf("]\n");
}

void clear(CQueue *cq)
{
    if (!cq)
        return;
    free(cq->data);
    free(cq);
}

```


**app.c**

```c
/***********************************************************
 * File Name: app.c
 * Author: codejuzi
 * Date Created: 2023-04-24
 * Description: 循环队列测试
 ************************************************************/
#include <stdio.h>
#include "queue.h"

const int INIT_QUEUE_SIZE = 3;
int main(int argc, char const *argv[])
{
    CQueue *cq = init(INIT_QUEUE_SIZE);
    dequeue(cq); // queue is empty
    enqueue(cq, 0);
    enqueue(cq, 1);
    enqueue(cq, 2);
    output(cq);
    enqueue(cq, 3);                                // expand
    output(cq);                                    // [0, 1, 2, 3]
    printf("peekFirst(cq) = %d\n", peekFirst(cq)); // 0
    printf("peekLast(cq) = %d\n", peekLast(cq));   // 3
    dequeue(cq);
    printf("peekFirst(cq) = %d\n", peekFirst(cq)); // 1
    enqueue(cq, 4);
    enqueue(cq, 5);
    enqueue(cq, 6);
    printf("peekFirst(cq) = %d\n", peekFirst(cq)); // 1
    printf("peekLast(cq) = %d\n", peekLast(cq));   // 6
    output(cq);                                    // [1, 2, 3, 4, 5, 6]
    clear(cq);
    return 0;
}

```
