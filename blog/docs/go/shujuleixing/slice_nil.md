---
title: "对 nil 的 Slice 和空 Slice 的处理是一致的吗"
date: 2022-04-14T08:38:31+08:00
---

首先 Go 的 JSON 标准库对 nil slice 和 空 slice 的处理是不一致。

通常错误的用法，会报数组越界的错误，因为只是声明了slice，却没有给实例化的对象。

```
 var slice []int
    slice[1] = 0
```
此时slice的值是`nil`，这种情况可以用于需要返回slice的函数，当函数出现异常的时候，保证函数依然会有nil的返回值。

empty slice 是指slice不为`nil`，但是slice没有值，slice的底层的空间是空的，此时的定义如下

```
slice := make([]int,0）
    slice := []int{} 
```