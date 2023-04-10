---
title: "CHECK 约束功能"
date: 2022-04-14T11:01:16+08:00
---



对于 性别 或 表示状态的字段，推荐使用 CHECK 约束功能。

* MySQL 8.0.16 版本开始，数据库原生提供 CHECK 约束功能。
* 避免了使用 tinyint 类型产生的表达不清（值代表实际意义不明确）、脏数据（可能会存入其他值）的产生。
*
* 如下，约束定义列 sex 的取值范围，只能是 M 或者 F。同时，当插入非法数据时，MySQL 会显式地抛出违法约束的提示（`Check constraint 'user_chk_1' is violated`.）。

```

CREATE TABLE User (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    sex CHAR(1) NOT NULL,
    password VARCHAR(1024) NOT NULL,
    CHECK (sex = 'M' OR sex = 'F'),
    PRIMARY KEY(id)
);

```









