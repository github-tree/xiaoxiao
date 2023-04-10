<template><div><p>首先 Go 的 JSON 标准库对 nil slice 和 空 slice 的处理是不一致。</p>
<p>通常错误的用法，会报数组越界的错误，因为只是声明了slice，却没有给实例化的对象。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> var slice []int
    slice[1] = 0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>此时slice的值是<code v-pre>nil</code>，这种情况可以用于需要返回slice的函数，当函数出现异常的时候，保证函数依然会有nil的返回值。</p>
<p>empty slice 是指slice不为<code v-pre>nil</code>，但是slice没有值，slice的底层的空间是空的，此时的定义如下</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>slice := make([]int,0）
    slice := []int{} 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


