<template><div><p><strong>逃逸分析</strong>
「逃逸分析」就是程序运行时内存的分配位置(栈或堆)，是由编译器来确定的。堆适合不可预知大小的内存分配。但是为此付出的代价是分配速度较慢，而且会形成内存碎片。
逃逸场景：</p>
<ul>
<li>
<pre><code>指针逃逸
</code></pre>
</li>
<li>
<pre><code>栈空间不足逃逸
</code></pre>
</li>
<li>
<pre><code>动态类型逃逸
</code></pre>
</li>
<li>
<pre><code>闭包引用对象逃逸
</code></pre>
</li>
</ul>
</div></template>


