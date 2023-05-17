# 实验三 构建二叉树及其遍历

```
          A
        /   \
       B     H
      / \   
     C   D 
        / \
       E   F
        \
         G       
```
 
要求：
1. 根据读入的字符序列创建如上图的二叉树，读入的字符序列为：`ABC##DE#G##F##H##`
2. 在1的基础上，用三种遍历方式输出遍历字符序列。


[GitHub链接](https://github.com/dingxinliang88/hhu-iot-code-sophomore/tree/master/data_structure/binary_tree)

**tree.h**
```c
#ifndef _TREE_H_
#define _TREE_H_

#include <stdio.h>
#include <stdlib.h>

#define ElementType char

typedef struct TreeNode
{
    ElementType val;
    struct TreeNode *left;
    struct TreeNode *right;
} TreeNode;

/// @brief 创建二叉树
/// @param data 二叉树数据数组地址
/// @return 二叉树根节点
TreeNode *createTree(ElementType **data);

// 遍历API
void preTraversal(TreeNode *root);
void inTraversal(TreeNode *root);
void postTraversal(TreeNode *root);

/// @brief GC
void clearTree(TreeNode *root);
#endif
```

**tree.c**

```c
#include "tree.h"

TreeNode *createTree(ElementType **data)
{
    // validation
    if (**data == '#' || **data == '\0')
    {
        (*data)++;
        return NULL;
    }
    // create root node
    TreeNode *root = (TreeNode *)malloc(sizeof(TreeNode));
    root->val = **data;
    (*data)++;
    root->left = createTree(data);
    root->right = createTree(data);
    return root;
}

void preTraversal(TreeNode *root)
{
    if (root == NULL)
        return;
    printf("%c\t", root->val);
    preTraversal(root->left);
    preTraversal(root->right);
}

void inTraversal(TreeNode *root)
{
    if (root == NULL)
        return;
    inTraversal(root->left);
    printf("%c\t", root->val);
    inTraversal(root->right);
}

void postTraversal(TreeNode *root)
{
    if (root == NULL)
        return;
    postTraversal(root->left);
    postTraversal(root->right);
    printf("%c\t", root->val);
}

void clearTree(TreeNode *root)
{
    if (root->left)
        clearTree(root->left);
    if (root->right)
        clearTree(root->right);

    free(root);
}

```


**app.c**

```c
#include "tree.h"
#include <stdio.h>

int main(int argc, char const *argv[])
{
    ElementType *data = "ABC##DE#G##F##H##";
    TreeNode *root = createTree(&data);

    printf("===> preorder traversal: \n");
    preTraversal(root);
    printf("\n<=== \n");

    printf("===> inorder traversal: \n");
    inTraversal(root);
    printf("\n<=== \n");

    printf("===> postorder traversal: \n");
    postTraversal(root);
    printf("\n<=== \n");

    clearTree(root);
    return 0;
}

```