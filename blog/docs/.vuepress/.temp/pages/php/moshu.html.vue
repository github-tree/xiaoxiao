<template><div><blockquote>
<ol>
<li>__construct 具有构造函数的类会在每次创建新对象时先调用此方法;初始化工作执行。</li>
<li>__desstruct 对象的所有引用都被删除或者当对象被显式销毁时执行。</li>
<li>__call()在对象中调用一个不可访问方法时，__call() 会被调用。</li>
<li>__callStatic()在静态上下文中调用一个不可访问方法时，__callStatic() 会被调用。</li>
<li>__set() 在给不可访问的属性赋值时调用</li>
<li>__get() 读取不可访问的属性值是自动调用</li>
<li>__isset() 当对不可访问的私有属性使用isset或empty时自动调用</li>
<li>__unset() 当对不可访问的私有属性使用unset时；自动调用</li>
<li>__toString()当一个类的实例对象；被当成一个字符串输出时调用</li>
</ol>
</blockquote>
</div></template>


