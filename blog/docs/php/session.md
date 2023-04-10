---
title: "SESSION 与 COOKIE"
date: 2022-04-14T07:28:15+08:00
---
##### SESSION 与 COOKIE的区别是什么，请从协议，产生的原因与作用说明?

>* http无状态协议，不能区分用户是否是从同一个网站上来的，同一个用户请求不同的页面不能看做是同一个用户。
>* session存储在服务器端，cookie保存在客户端。
>* session比较安全，cookie用某些手段可以修改，不安全。
>* session依赖于cookie进行传递。禁用cookie后，session不能正常使用。
>* session的缺点：保存在服务器端，每次读取都从服务器进行读取，对服务器有资源消耗。session保存在服务器端的文件或数据库中，默认保存在文件中，文件路径由php配置文件的session.save_path指定。session文件是公有的


* * *


##### 如何修改SESSION的生存时间
>方法1:将`php.ini`中的 `session.gc_maxlifetime`设置为9999重启apache
>
>方法2:
>```
>$savePath = "./session_save_dir/";
>$lifeTime = 小时 * 秒;
>session_save_path($savePath);
>session_set_cookie_params($lifeTime);
>session_start();
>```
>
>方法3:`setcookie() and session_set_cookie_params($lifeTime);`