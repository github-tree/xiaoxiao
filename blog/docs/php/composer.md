---
title: "Composer"
date: 2022-04-14T07:27:36+08:00
---


Composer是PHP中用来管理依赖（dependency）关系的工具。你可以在自己的项目中声明所依赖的外部工具库（libraries），Composer会帮你安装这些依赖的库文件。


##### Composer的执行原理
>执行Composer Install时,
>Composer会读取当前目录下的composer.json脚本
> 并解析json格式的数据,
> 获取require里的软件安装列表,
> 去对应的软件库中下载指定的项目代码.
