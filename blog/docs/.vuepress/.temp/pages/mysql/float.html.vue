<template><div><ol>
<li>从 MySQL 8.0.17 版本开始，MySQL 将不建议使用浮点类型 Float 或 Double，高精度 DECIMAL 类型可以使用。</li>
<li>在海量并发的互联网业务中使用，金额字段的我们并不推荐使用 DECIMAL 类型，推荐使用整型类型。</li>
</ol>
<ul>
<li>资金以分单位代替元单位存储类型</li>
<li>DECIMAL 是通过二进制实现的一种编码方式，计算效率远不如整型来的高效。因此，推荐使用 BIG INT 来存储金额相关的字段。</li>
</ul>
</div></template>


