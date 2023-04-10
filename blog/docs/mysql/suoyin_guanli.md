---
title: "B+ 树索引的管理"
date: 2022-04-14T11:09:21+08:00
---

1. 命令 EXPLAIN 查看是否使用索引。
2. 查询表 mysql.innodb_index_stats 查看每个索引的大致情况。
3. 查询表 sys.schema_unused_indexes 查看有哪些索引一直未被使用过，可以被废弃。