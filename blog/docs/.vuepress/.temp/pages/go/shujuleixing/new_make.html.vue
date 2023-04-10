<template><div><blockquote>
<ul>
<li>new 可分配任意类型的数据，根据传入的类型申请一块内存，返回指向这块内存的指针，即类型 *Type。 new 分配的空间被清零</li>
<li>make 仅用来分配及初始化类型为 slice、map、chan 的数据。make 返回引用，即 Type ， make 分配空间后，会进行初始。</li>
</ul>
</blockquote>
</div></template>


