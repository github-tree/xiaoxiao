<template><div><h5 id="选用redis实现分布式锁原因" tabindex="-1"><a class="header-anchor" href="#选用redis实现分布式锁原因" aria-hidden="true">#</a> 选用Redis实现分布式锁原因：</h5>
<blockquote>
<p>Redis有很高的性能；
Redis命令对此支持较好，实现起来比较方便</p>
</blockquote>
<h5 id="使用命令介绍" tabindex="-1"><a class="header-anchor" href="#使用命令介绍" aria-hidden="true">#</a> 使用命令介绍：</h5>
<blockquote>
<ol>
<li>SETNX key val：当且仅当key不存在时，set一个key为val的字符串，返回1；若key存在，则什么都不做，返回0。</li>
<li>expire key timeout：为key设置一个超时时间，单位为second，超过这个时间锁会自动释放，避免死锁。</li>
<li>delete key：删除key；在使用Redis实现分布式锁的时候，主要就会使用到这三个命令。</li>
</ol>
</blockquote>
<h5 id="实现思想" tabindex="-1"><a class="header-anchor" href="#实现思想" aria-hidden="true">#</a> 实现思想：</h5>
<ol>
<li>获取锁的时候，使用setnx加锁，并使用expire命令为锁添加一个超时时间，超过该时间则自动释放锁，锁的value值为一个随机生成的UUID，通过此在释放锁的时候进行判断。</li>
<li>获取锁的时候还设置一个获取的超时时间，若超过这个时间则放弃获取锁。</li>
<li>释放锁的时候，通过UUID判断是不是该锁，若是该锁，则执行delete进行锁释放。</li>
</ol>
</div></template>


