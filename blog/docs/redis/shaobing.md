---
title: "哨兵机制"
date: 2022-04-13T19:59:09+08:00
---

Redis 主从集群中，哨兵机制是实现主从库自动切换的关键机制，它有效地解决了主从复制模式下故障转移的这三个问题。

>1.  主库真的挂了吗？
>2.  该选择哪个从库作为主库？
>3.  怎么把新主库的相关信息通知给从库和客户端呢？

监控是指哨兵进程在运行时，周期性地给所有的主从库发送 PING 命令，检测它们是否仍然在线运行

* 如果从库没有在规定时间内响应哨兵的 PING 命令，哨兵就会把它标记为“下线状态”；
* 如果主库也没有在规定时间内响应哨兵的 PING 命令，哨兵就会判定主库下线，然后开始自动切换主库的流程。

然后，哨兵会执行最后一个任务通知，在执行通知任务时，哨兵会把新主库的连接信息发给其他从库，让它们执行 replicaof 命令，和新主库建立连接，并进行数据复制。同时，哨兵会把新主库的连接信息通知给客户端，让它们把请求操作发到新主库上。
