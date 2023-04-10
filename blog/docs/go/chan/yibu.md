---
title: "Channel 是同步的还是异步的？"
date: 2022-04-14T10:10:46+08:00
---

Channel 是异步进行的, channel 存在 3 种状态：

>1. nil，未初始化的状态，只进行了声明，或者手动赋值为 nil
>2. active，正常的 channel，可读或者可写
>3. .closed，已关闭，千万不要误认为关闭 channel 后，channel 的值是 nil