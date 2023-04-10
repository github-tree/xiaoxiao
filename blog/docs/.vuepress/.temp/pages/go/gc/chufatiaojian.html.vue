<template><div><ul>
<li>
<p>主动触发(手动触发)，通过调用 runtime.GC 来触发 GC，此调用阻塞式地等待当前 GC 运行完毕。</p>
</li>
<li>
<p>被动触发，分为两种方式：</p>
</li>
</ul>
<ol>
<li>
<pre><code>使用系统监控，当超过两分钟没有产生任何 GC 时，强制触发 GC。
</code></pre>
</li>
<li>
<pre><code>使用步调（Pacing）算法，其核心思想是控制内存增长的比例,每次内存分配时检查当前内存分配量是否已达到阈值（环境变量 GOGC）：默认 100%，即当内存扩大一倍时启用 GC。
</code></pre>
</li>
</ol>
</div></template>


