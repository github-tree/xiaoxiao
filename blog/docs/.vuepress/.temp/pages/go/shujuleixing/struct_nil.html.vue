<template><div><p>空结构体 <code v-pre>struct{}</code> 实例不占据任何的内存空间。
可以使用 <code v-pre>unsafe.Sizeof</code> 计算出一个数据类型实例需要占用的字节数:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>func main() {
      fmt.Println(unsafe.Sizeof(struct{}{}))  //0
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


