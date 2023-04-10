<template><div><p>Channel 是异步进行的, channel 存在 3 种状态：</p>
<blockquote>
<ol>
<li>nil，未初始化的状态，只进行了声明，或者手动赋值为 nil</li>
<li>active，正常的 channel，可读或者可写</li>
<li>.closed，已关闭，千万不要误认为关闭 channel 后，channel 的值是 nil</li>
</ol>
</blockquote>
</div></template>


