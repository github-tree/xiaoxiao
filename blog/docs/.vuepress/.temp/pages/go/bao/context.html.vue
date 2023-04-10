<template><div><h5 id="context包的用途" tabindex="-1"><a class="header-anchor" href="#context包的用途" aria-hidden="true">#</a> context包的用途</h5>
<blockquote>
<ul>
<li>Context（上下文）是 Golang 应用开发常用的并发控制技术 ，它可以控制一组呈树状结构的 goroutine，每个 goroutine 拥有相同的上下文。</li>
<li>Context 是并发安全的，主要是用于控制多个协程之间的协作、取消操作。</li>
</ul>
</blockquote>
<p>在web程序中，每个Request都需要开启一个goroutine做一些事情，
这些goroutine又可能会开启其他的goroutine去访问后端资源,比如数据库、RPC服务等,
它们需要访问一些共享的资源，
比如用户身份信息、认证token、请求截止时间等 这时候可以通过Context，来跟踪这些goroutine，并且通过Context来控制它们，
这就是Go语言为我们提供的Context，中文可以称之为“上下文”。</p>
<ul>
<li>可以用来用来设置截止日期、同步信号，传递请求相关值的结构体</li>
</ul>
<h5 id="context数据结构" tabindex="-1"><a class="header-anchor" href="#context数据结构" aria-hidden="true">#</a> context数据结构</h5>
<p>Context 只定义了接口，凡是实现该接口的类都可称为是一种 context。</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>type Context interface {
   Deadline() (deadline time.Time, ok bool)			
   Done() &lt;-chan struct{}
   Err() error
   Value(key interface{}) interface{}
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<ul>
<li>「Deadline」 方法：可以获取设置的截止时间，返回值 deadline 是截止时间，到了这个时间，Context 会自动发起取消请求，返回值 ok 表示是否设置了截止时间。</li>
<li>「Done」 方法：返回一个只读的 channel ，类型为 struct{}。如果这个 chan 可以读取，说明已经发出了取消信号，可以做清理操作，然后退出协程，释放资源。</li>
<li>「Err」 方法：返回 Context 被取消的原因。</li>
<li>「Value」 方法：获取 Context 上绑定的值，是一个键值对，通过 key 来获取对应的值。</li>
</ul>
</blockquote>
</div></template>


