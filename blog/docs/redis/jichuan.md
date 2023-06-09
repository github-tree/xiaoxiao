---
title: "缓存击穿"
date: 2022-04-13T20:00:09+08:00
---

当某一key失效时，造成大量请求到db层，击垮存储层。

* 方案一：使用互斥锁，当缓存数据失效时，保证一个请求能够访问到数据库，并更新缓存，其他线程等待并重试；

* 方案二：缓存数据“永远不过期”，如果缓存数据不设置失效时间的话，就不会存在热点key过期造成了大量请求到数据库。但是，缓存数据就变成“静态数据”，因此当缓存数据快要过期时，采用异步线程的方式提前进行更新缓存数据。
