---
title: "竞态"
date: 2022-04-14T10:15:07+08:00
---


**竞态**
资源竞争，就是在程序中，同一块内存同时被多个 goroutine 访问。
我们使用 go build、go run、go test 命令时，添加 -race 标识可以检查代码中是否存在资源竞争。
解决：

* 		我们可以给资源进行加锁，让其在同一时刻只能被一个协程来操作。
* 		sync.Mutex
* 		sync.RWMutex