<template><div><p>三色标记法</p>
<ul>
<li>初始状态下所有对象都是白色的。</li>
<li>从根节点开始遍历所有对象，把遍历到的对象变成灰色对象</li>
<li>遍历灰色对象，将灰色对象引用的对象也变成灰色对象，然后将遍历过的灰色对象变成黑色对象。</li>
<li>循环步骤 3，直到灰色对象全部变黑色。</li>
<li>通过写屏障(write-barrier)检测对象有变化，重复以上操作</li>
<li>收集所有白色对象（垃圾）。</li>
</ul>
</div></template>


