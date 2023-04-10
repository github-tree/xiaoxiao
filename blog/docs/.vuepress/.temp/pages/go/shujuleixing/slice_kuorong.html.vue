<template><div><p>在使用 append 向 slice 追加元素时，若 slice 空间不足则会发生扩容，扩容会重新分配一块更大的内存，将原 slice 拷贝到新 slice ，然后返回新 slice。扩容后再将数据追加进去。</p>
<p>扩容操作只对容量，扩容后的 slice 长度不变，容量变化规则如下：</p>
<blockquote>
<ul>
<li>若 slice 容量小于 1024 个元素，那么扩容的时候 slice 的 cap 就翻番，乘以 2；一旦元素个数超过 1024 个元素，增长因子就变成 1.25，即每次增加原来容量的四分之一。</li>
<li>若 slice 容量够用，则将新元素追加进去，slice.len++，返回原 slice</li>
<li>若 slice 容量不够用，将 slice 先扩容，扩容得到新 slice，将新元素追加进新 slice，slice.len++，返回新 slice。</li>
</ul>
</blockquote>
</div></template>


