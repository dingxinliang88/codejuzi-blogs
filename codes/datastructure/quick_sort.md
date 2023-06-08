# 实验四：实现快速排序
要求：
1. 针对一无序序列（自定义），采用快速排序算法，实现排序

**quick_sort.h**

[GitHub链接](https://github.com/dingxinliang88/hhu-iot-code-sophomore/blob/master/data_structure/sort/quicksort.h)

```c
#ifndef _QUICK_SORT_H_
#define _QUICK_SORT_H_

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

/// @brief 在指定区间内进行划分，将比pivot小的元素放在pivot左边，比pivot大的元素放在右边。
/// @param arr 待排序数组
/// @param left 区间左端点
/// @param right 区间右端点
/// @return 划分出的pivot的下标
int partition(int *arr, int left, int right);

/// @brief 对指定区间进行快速排序
/// @param arr 待排序数组
/// @param left 排序区间左端点
/// @param right 排序区间右端点
void quick_sort(int *arr, int left, int right);

/// @brief 生成指定长度的随机整数数组
/// @param arr 要生成的随机数组
/// @param len 数组长度
void random_array(int *arr, int len);

#endif

```

**quick_sort.c**

[GitHub链接](https://github.com/dingxinliang88/hhu-iot-code-sophomore/blob/master/data_structure/sort/quicksort.c)

```c
#include "quicksort.h"

int partition(int *arr, int left, int right)
{
    // 随机选择一个元素作为pivot
    int pivot_index = rand() % (right - left + 1) + left;
    int pivot = arr[pivot_index];
    // 将pivot交换到序列的最右端
    int tmp = arr[pivot_index];
    arr[pivot_index] = arr[right];
    arr[right] = tmp;
    int i = left, j = right - 1;
    while (i <= j)
    {
        while (arr[i] < pivot)
            i++;
        while (j >= left && arr[j] > pivot)
            j--;
        if (i < j)
        {
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i++;
            j--;
        }
        else
            break;
    }
    // 将pivot交换到序列中间
    tmp = arr[i];
    arr[i] = arr[right];
    arr[right] = tmp;
    return i;
}

void quick_sort(int *arr, int left, int right)
{
    if (left < right)
    {
        int pivot_index = partition(arr, left, right);
        quick_sort(arr, left, pivot_index - 1);
        quick_sort(arr, pivot_index + 1, right);
    }
}

void random_array(int *arr, int len)
{
    srand(time(NULL));
    for (int i = 0; i < len; i++)
    {
        arr[i] = rand() % 100;
    }
}

```

**app.c**

[GitHub链接](https://github.com/dingxinliang88/hhu-iot-code-sophomore/blob/master/data_structure/sort/app.c)

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include "quicksort.h"

#define TEST_TIMES 10
#define ARRAY_LEN 20

void print_array(int arr[], int len)
{
    printf("[ ");
    for (int i = 0; i < len; i++)
    {
        printf("%d ", arr[i]);
    }
    printf("]\n");
}

int main(int argc, char const *argv[])
{
    srand(time(NULL));

    for (int i = 1; i <= TEST_TIMES; i++)
    {
        printf("Test %d:\n", i);

        int arr[ARRAY_LEN];
        for (int j = 0; j < ARRAY_LEN; j++)
        {
            arr[j] = rand() % 100;
        }

        printf("Original Array: ");
        print_array(arr, ARRAY_LEN);

        quick_sort(arr, 0, ARRAY_LEN - 1);

        printf("Sorted Array:   ");
        print_array(arr, ARRAY_LEN);

        printf("\n");
    }

    return 0;
}

```