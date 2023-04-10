<template><div><p><strong>Go 中两个 Nil 可能不相等。</strong>
接口(interface) 是对非接口值(例如指针，struct 等)的封装，内部实现包含 2 个字段，类型 T 和 值 V。</p>
<p>一个接口等于 nil，当且仅当 T 和 V 处于 unset 状态（T=nil，V is unset）。</p>
<ul>
<li>两个接口值比较时，会先比较 T，再比较 V。</li>
<li>接口值与非接口值比较时，会先将非接口值尝试转换为接口值，再比较。</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>func main() {
  var p *int = nil
  var i interface{} = p
  fmt.Println(i == p) // true
  fmt.Println(p == nil) // true
  fmt.Println(i == nil) // false
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子中，将一个 nil 非接口值 p 赋值给接口 i，此时,i 的内部字段为(T=*int, V=nil)，i 与 p 作比较时，将 p 转换为接口后再比较，因此 i == p，p 与 nil 比较，直接比较值，所以 p == nil。
但是当 i 与 nil 比较时，会将 nil 转换为接口(T=nil, V=nil),与 i(T=*int, V=nil)不相等，因此 i != nil。因此 V 为 nil ，但 T 不为 nil 的接口不等于 nil。</p>
</div></template>


