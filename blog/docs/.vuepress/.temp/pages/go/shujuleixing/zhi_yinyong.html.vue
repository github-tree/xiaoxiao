<template><div><blockquote>
<ul>
<li>值类型：int，float，bool，string，struct和数组 （数组要特别注意，别搞混了）</li>
</ul>
<p>变量直接存储值，分配栈区的内存空间，这些变量所占据的空间在函数被调用完后会自动释放。</p>
<ul>
<li>引用类型：slice，map，chan和值类型对应的指针，接口（interface）</li>
</ul>
<p>变量存储的是一个地址（或者理解为指针），指针指向内存中真正存储数据的首地址。内存通常在堆上分配，通过GC回收。</p>
</blockquote>
</div></template>


