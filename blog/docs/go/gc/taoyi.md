---
title: "逃逸分析"
date: 2022-04-14T10:15:29+08:00
---

**逃逸分析**
「逃逸分析」就是程序运行时内存的分配位置(栈或堆)，是由编译器来确定的。堆适合不可预知大小的内存分配。但是为此付出的代价是分配速度较慢，而且会形成内存碎片。
逃逸场景：

*     指针逃逸
*     栈空间不足逃逸
*     动态类型逃逸
*     闭包引用对象逃逸