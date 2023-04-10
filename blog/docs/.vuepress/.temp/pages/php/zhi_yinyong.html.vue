<template><div><h5 id="区别" tabindex="-1"><a class="header-anchor" href="#区别" aria-hidden="true">#</a> 区别：</h5>
<ul>
<li>按值传递：函数范围内对值的任何改变在函数外部都会被忽略</li>
<li>按引用传递：函数范围内对值的任何改变在函数外部也能反映出这些修改</li>
</ul>
<h5 id="优缺点" tabindex="-1"><a class="header-anchor" href="#优缺点" aria-hidden="true">#</a> 优缺点：</h5>
<ul>
<li>按值传递时，php必须复制值。特别是对于大型的字符串和对象来说，这将会是一个代价很大的操作。</li>
<li>按引用传递则不需要复制值，对于性能提高很有好处。</li>
</ul>
</div></template>


