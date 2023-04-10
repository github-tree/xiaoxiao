---
title: "两个 interface 可以比较吗"
date: 2022-04-14T08:41:21+08:00
---

判断类型是否一样
>`reflect.TypeOf(a).Kind() == reflect.TypeOf(b).Kind()`

判断两个 interface{}是否相等
>`reflect.DeepEqual(a, b interface{})`

将一个 interface{}赋值给另一个 interface{}
>`reflect.ValueOf(a).Elem().Set(reflect.ValueOf(b))`