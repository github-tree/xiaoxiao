---
title: "map 如何实现顺序读取"
date: 2022-04-14T08:25:20+08:00
---

>* 方案一： 可以先把 map 中的 key，通过 sort 包排序。
>* 方案二： 使用slice，将slice中排序，再通过slice的顺序去读取。