---
title: "go 中除了加 Mutex 锁以外还有哪些方式安全读写共享变量？"
date: 2022-04-14T10:09:36+08:00
---

Go 中 Goroutine 可以通过 Channel 进行安全读写共享变量。