---
title: "select机制"
date: 2022-04-14T09:09:29+08:00
---

* select机制用来处理异步IO问题

* select机制最大的一条限制就是每个case语句里必须是一个IO操作

* golang在语言级别支持select关键字
