---
title: "分布式Id方案"
date: 2022-04-14T08:08:20+08:00
---

1. Redis分布式id
   原理就是利用redis的 incr命令实现ID的原子性自增

>注意：用redis实现需要注意一点，要考虑到redis持久化的问题。redis有两种持久化方式RDB和AOF
>RDB会定时打一个快照进行持久化，假如连续自增但redis没及时持久化，而这会Redis挂掉了，重启Redis后会出现ID重复的情况。
>AOF会对每条写命令进行持久化，即使Redis挂掉了也不会出现ID重复的情况，但由于incr命令的特殊性，会导致Redis重启恢复的数据时间过长。
2. twitter公司雪花算法（SnowFlake）
3. 百度 （Uidgenerator）
   基于Snowflake算法实现的,与原始的snowflake算法不同在于，uid-generator支持自定义时间戳、工作机器ID和 序列号 等各部分的位数，而且uid-generator中采用用户自定义workId的生成策略。
4. 美团（Leaf）
5. 滴滴出品（TinyID）