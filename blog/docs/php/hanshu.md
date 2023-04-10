---
title: "函数相关问题"
date: 2022-04-14T07:46:04+08:00
---

##### 语句include和require的区别是什么?为避免多次包含同一文件，可用(?)语句代替它们?
>require->require是无条件包含也就是如果一个流程里加入require,无论条件成立与否都会先执行require
>include->include有返回值，而require没有(可能因为如此require的速度比include快)
>注意:包含文件不存在或者语法错误的时候require是致命的,include不是


* * *


##### PHP中常用的数组函数
>in_array：检查数组中是否存在某个值
>array_search：在数组中搜索给定的值，如果成功则返回首个相应的键名
>array_key_exists：检查数组里是否有指定的键名或索引
>array_values：返回数组中所有的值
>array_column：返回数组中指定的一列
>array_merge：合并一个或多个数组
>array_pop：弹出数组最后一个单元（出栈）
>list：把数组中的值赋给一组变量
>ksort：对数组按照键名排序


* * *
##### 在PHP中error_reporting这个函数有什么作用?
>设置错误级别与错误信息回报


* * *

##### 简述如何得到当前执行脚本路径，包括所得到参数。
>`$script_name = basename(__file__); print_r($script_name);`