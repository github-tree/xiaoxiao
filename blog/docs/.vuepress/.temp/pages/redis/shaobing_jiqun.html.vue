<template><div><h4 id="一、架构不同" tabindex="-1"><a class="header-anchor" href="#一、架构不同" aria-hidden="true">#</a> 一、架构不同</h4>
<p>redis主从：一主多从；</p>
<p>redis集群：多主多从；</p>
<hr>
<h4 id="二、存储不同" tabindex="-1"><a class="header-anchor" href="#二、存储不同" aria-hidden="true">#</a> 二、存储不同</h4>
<p>redis主从：主节点和从节点都是存储所有数据；</p>
<p>redis集群：数据的存储是通过hash计算16384的槽位，算出要将数据存储的节点，然后进行存储；</p>
<hr>
<h4 id="三、选举不同" tabindex="-1"><a class="header-anchor" href="#三、选举不同" aria-hidden="true">#</a> 三、选举不同</h4>
<p>redis主从：通过启动redis自带的哨兵（sentinel）集群进行选举，也可以是一个哨兵</p>
<p>选举流程：</p>
<blockquote>
<p>先发现主节点fail的哨兵，将成为哨兵中的leader，之后的主节点选举将通过这个leader进行故障转移操作，从存活的slave中选举新的master，新的master选举同集群的master节点选举类似；</p>
</blockquote>
<p>redis集群：集群可以自己进行选举</p>
<p>选举流程：</p>
<blockquote>
<ol>
<li>当主节点挂掉，从节点就会广播该主节点fail；</li>
<li>延迟时间后进行选举（延迟的时间算法为：延迟时间+随机数+rank*1000，从节点数据越多，rank越小，因为主从数据复制是异步进行的，所以所有的从节点的数据可能会不同），延迟的原因是等待主节点fail广播到所有存活的主节点，否则主节点会拒绝参加选举；</li>
<li>参加选举的从节点向所有的存活的节点发送ack请求，但只有主节点会回复它，并且主节点只会回复第一个到达参加选举的从节点，一半以上的主节点回复，该节点就会成为主节点，广播告诉其他节点该节点成为主节点。</li>
</ol>
</blockquote>
<hr>
<h4 id="四、节点扩容不同" tabindex="-1"><a class="header-anchor" href="#四、节点扩容不同" aria-hidden="true">#</a> 四、节点扩容不同</h4>
<p>redis主从：只能扩容从节点，无法对主节点进行扩容；</p>
<p>redis集群：可以扩容整个主从节点，但是扩容后需要进行槽位的分片，否则无法进行数据写入
命令为：</p>
<p></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>/usr/local/redis-5.0.3/src/redis-cli -a zhuge --cluster reshard 192.168.0.61:8001
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>其中的192.168.0.61:8001为新加入的主从节点；</p>
</div></template>


