<template><div><h5 id="session-与-cookie的区别是什么-请从协议-产生的原因与作用说明" tabindex="-1"><a class="header-anchor" href="#session-与-cookie的区别是什么-请从协议-产生的原因与作用说明" aria-hidden="true">#</a> SESSION 与 COOKIE的区别是什么，请从协议，产生的原因与作用说明?</h5>
<blockquote>
<ul>
<li>http无状态协议，不能区分用户是否是从同一个网站上来的，同一个用户请求不同的页面不能看做是同一个用户。</li>
<li>session存储在服务器端，cookie保存在客户端。</li>
<li>session比较安全，cookie用某些手段可以修改，不安全。</li>
<li>session依赖于cookie进行传递。禁用cookie后，session不能正常使用。</li>
<li>session的缺点：保存在服务器端，每次读取都从服务器进行读取，对服务器有资源消耗。session保存在服务器端的文件或数据库中，默认保存在文件中，文件路径由php配置文件的session.save_path指定。session文件是公有的</li>
</ul>
</blockquote>
<hr>
<h5 id="如何修改session的生存时间" tabindex="-1"><a class="header-anchor" href="#如何修改session的生存时间" aria-hidden="true">#</a> 如何修改SESSION的生存时间</h5>
<blockquote>
<p>方法1:将<code v-pre>php.ini</code>中的 <code v-pre>session.gc_maxlifetime</code>设置为9999重启apache</p>
<p>方法2:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$savePath = "./session_save_dir/";
$lifeTime = 小时 * 秒;
session_save_path($savePath);
session_set_cookie_params($lifeTime);
session_start();
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>方法3:<code v-pre>setcookie() and session_set_cookie_params($lifeTime);</code></p>
</blockquote>
</div></template>


