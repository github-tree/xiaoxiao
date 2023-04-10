<template><div><h4 id="gmp-调度" tabindex="-1"><a class="header-anchor" href="#gmp-调度" aria-hidden="true">#</a> GMP 调度</h4>
<blockquote>
<ul>
<li>G（Goroutine）： 即 Go 协程，每个 go 关键字都会创建一个协程。</li>
<li>M（Machine）：工作线程，在 Go 中称为 Machine，数量对应真实的 CPU 数（真正干活的对象）。</li>
<li>P（Processor）： 处理器（Go 中定义的一个摡念，非 CPU），包含运行 Go 代码的必要资源，用来调度 G 和 M 之间的关联关系，其数量可通过 GOMAXPROCS() 来设置，默认为核心数。</li>
</ul>
</blockquote>
<h4 id="调度策略" tabindex="-1"><a class="header-anchor" href="#调度策略" aria-hidden="true">#</a> 调度策略</h4>
<blockquote>
<ol>
<li>队列轮转：P 会周期性的将 G 调度到 M 中执行，执行一段时间后，保存上下文，将 G 放到队列尾部，然后从队列中再取出一个 G 进行调度。除此之外，P 还会周期性的查看全局队列是否有 G 等待调度到 M 中执行。</li>
<li>系统调用：当 G0 即将进入系统调用时，M0 将释放 P，进而某个空闲的 M1 获取 P，继续执行 P 队列中剩下的 G。M1 的来源有可能是 M 的缓存池，也可能是新建的。</li>
<li>当 G0 系统调用结束后，如果有空闲的 P，则获取一个 P，继续执行 G0。如果没有，则将 G0 放入全局队列，等待被其他的 P 调度。然后 M0 将进入缓存池睡眠。</li>
</ol>
</blockquote>
</div></template>


