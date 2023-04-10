<template><div><h4 id="_1-内存优化" tabindex="-1"><a class="header-anchor" href="#_1-内存优化" aria-hidden="true">#</a> 1.内存优化：</h4>
<ul>
<li><strong>1.1 小对象合并成结构体一次分配，减少内存分配次数</strong></li>
</ul>
<p>建议：小对象合并成结构体一次分配，示意如下：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> for k, v := range m {
            k, v := k, v // copy for capturing by the goroutine
            go func() {
                // using k &amp; v
            }()
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>替换为：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>for k, v := range m {
            x := struct {k , v string} {k, v} // copy for capturing by the goroutine
            go func() {
                // using x.k &amp; x.v
            }()
        }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>1.2 缓存区内容一次分配足够大小空间，并适当复用</strong></li>
</ul>
<p>在协议编解码时，需要频繁地操作<code v-pre>[]byte</code>，可以使用<code v-pre>bytes.Buffer</code>或其它byte缓存区对象。
建议：</p>
<ul>
<li>
<pre><code>    `bytes.Buffert`等通过预先分配足够大的内存，避免当Grow时动态申请内存，这样可以减少内存分配次数。同时对于byte缓存区对象考虑适当地复用。
</code></pre>
</li>
<li>
<p><strong>1.3 slice和map采make创建时，预估大小指定容量</strong></p>
</li>
</ul>
<p>slice和map与数组不一样，不存在固定空间大小，可以根据增加元素来动态扩容。
slice初始会指定一个数组，当对slice进行append等操作时，当容量不够时，会自动扩容：</p>
<blockquote>
<ul>
<li>
<pre><code>    如果新的大小是当前大小2倍以上，则容量增涨为新的大小；
</code></pre>
</li>
<li>
<pre><code>    否而循环以下操作：如果当前容量小于1024，按2倍增加；否则每次按当前容量1/4增涨，直到增涨的容量超过或等新大小。
</code></pre>
</li>
</ul>
</blockquote>
<p>map的扩容比较复杂，每次扩容会增加到上次容量的2倍。它的结构体中有一个buckets和oldbuckets，用于实现增量扩容：</p>
<blockquote>
<ul>
<li>
<pre><code>    正常情况下，直接使用buckets，oldbuckets为空；
</code></pre>
</li>
<li>
<pre><code>    如果正在扩容，则oldbuckets不为空，buckets是oldbuckets的2倍
</code></pre>
</li>
</ul>
</blockquote>
<ul>
<li>
<p><strong>1.4 长调用栈避免申请较多的临时对象</strong></p>
<p>goroutine的调用栈默认大小是4K（1.7修改为2K），它采用连续栈机制，当栈空间不够时，Go runtime会不动扩容：</p>
</li>
</ul>
<blockquote>
<ul>
<li>
<pre><code>    当栈空间不够时，按2倍增加，原有栈的变量崆直接copy到新的栈空间，变量指针指向新的空间地址；
</code></pre>
</li>
<li>
<pre><code>    退栈会释放栈空间的占用，GC时发现栈空间占用不到1/4时，则栈空间减少一半。
</code></pre>
</li>
<li>
<pre><code>    比如栈的最终大小2M，则极端情况下，就会有10次的扩栈操作，这会带来性能下降。
</code></pre>
</li>
</ul>
</blockquote>
<p>建议：</p>
<blockquote>
<ul>
<li>
<pre><code>    控制调用栈和函数的复杂度，不要在一个goroutine做完所有逻辑；
</code></pre>
</li>
<li>
<pre><code>    如查的确需要长调用栈，而考虑goroutine池化，避免频繁创建goroutine带来栈空间的变化。
</code></pre>
</li>
</ul>
</blockquote>
<ul>
<li><strong>1.5 避免频繁创建临时对象</strong></li>
</ul>
<p>Go在GC时会引发stop the world即整个情况暂停。
虽1.7版本已大幅优化GC性能，1.8甚至量坏情况下GC为100us。但暂停时间还是取决于临时对象的个数，临时对象数量越多，暂停时间可能越长，并消耗CPU。
建议：</p>
<blockquote>
<ul>
<li>GC优化方式是尽可能地减少临时对象的个数：</li>
<li>尽量使用局部变量</li>
<li>所多个局部变量合并一个大的结构体或数组，减少扫描对象的次数，一次回尽可能多的内存。</li>
</ul>
</blockquote>
<hr>
<h4 id="_2-并发优化" tabindex="-1"><a class="header-anchor" href="#_2-并发优化" aria-hidden="true">#</a> 2.并发优化</h4>
<ul>
<li><strong>2.1 高并发的任务处理使用goroutine池</strong></li>
</ul>
<p>goroutine虽轻量，但对于高并发的轻量任务处理，频繁来创建goroutine来执行，执行效率并不会太高效：
过多的goroutine创建，会影响go runtime对goroutine调度，以及GC消耗；
高并时若出现调用异常阻塞积压，大量的goroutine短时间积压可能导致程序崩溃。</p>
<ul>
<li><strong>2.2 避免高并发调用同步系统接口</strong></li>
</ul>
<p>goroutine的实现，是通过同步来模拟异步操作。在如下操作操作不会阻塞go runtime的线程调度：</p>
<ul>
<li>
<pre><code>网络IO
</code></pre>
</li>
<li>
<pre><code>锁
</code></pre>
</li>
<li>
<pre><code>channel
</code></pre>
</li>
<li>
<pre><code>time.sleep
</code></pre>
</li>
<li>
<pre><code>基于底层系统异步调用的Syscall
</code></pre>
</li>
</ul>
<p>下面阻塞会创建新的调度线程：</p>
<ul>
<li>
<pre><code>本地IO调用
</code></pre>
</li>
<li>
<pre><code>基于底层系统同步调用的Syscall
</code></pre>
</li>
<li>
<pre><code>CGo方式调用C语言动态库中的调用IO或其它阻塞
</code></pre>
</li>
</ul>
<p>网络IO可以基于epoll的异步机制（或kqueue等异步机制），但对于一些系统函数并没有提供异步机制。例如常见的posix api中，对文件的操作就是同步操作。虽有开源的fileepoll来模拟异步文件操作。但Go的Syscall还是依赖底层的操作系统的API。系统API没有异步，Go也做不了异步化处理。
<strong>建议：把涉及到同步调用的goroutine，隔离到可控的goroutine中，而不是直接高并的goroutine调用。</strong></p>
<ul>
<li><strong>2.3 高并发时避免共享对象互斥</strong></li>
</ul>
<p>传统多线程编程时，当并发冲突在4~8线程时，性能可能会出现拐点。Go中的推荐是不要通过共享内存来通讯，Go创建goroutine非常容易，当大量goroutine共享同一互斥对象时，也会在某一数量的goroutine出在拐点。
<strong>建议：goroutine尽量独立，无冲突地执行；若goroutine间存在冲突，则可以采分区来控制goroutine的并发个数，减少同一互斥对象冲突并发数。</strong></p>
<hr>
<h4 id="_3-其它优化" tabindex="-1"><a class="header-anchor" href="#_3-其它优化" aria-hidden="true">#</a> 3.其它优化</h4>
<ul>
<li><strong>3.1 避免使用CGO或者减少CGO调用次数</strong></li>
</ul>
<p>GO可以调用C库函数，但Go带有垃圾收集器且Go的栈动态增涨，但这些无法与C无缝地对接。Go的环境转入C代码执行前，必须为C创建一个新的调用栈，把栈变量赋值给C调用栈，调用结束现拷贝回来。而这个调用开销也非常大，需要维护Go与C的调用上下文，两者调用栈的映射。相比直接的GO调用栈，单纯的调用栈可能有2个甚至3个数量级以上。
建议：尽量避免使用CGO，无法避免时，要减少跨CGO的调用次数。</p>
<ul>
<li><strong>3.2 减少[]byte与string之间转换，尽量采用[]byte来字符串处理</strong></li>
</ul>
<p>GO里面的<code v-pre>string</code>类型是一个不可变类型，不像c++中<code v-pre>std:string</code>，可以直接<code v-pre>char*</code>取值转化，指向同一地址内容；而GO中<code v-pre>[]byte</code>与<code v-pre>string</code>底层两个不同的结构，他们之间的转换存在实实在在的值对象拷贝，所以尽量减少这种不必要的转化
<strong>建议：存在字符串拼接等处理，尽量采用<code v-pre>[]byte</code>，</strong>
例如：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code> func Prefix(b []byte) []byte {
        return append([]byte("hello", b...))
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><strong>3.3 字符串的拼接优先考虑bytes.Buffer</strong></li>
</ul>
<p>由于string类型是一个不可变类型，但拼接会创建新的string。GO中字符串拼接常见有如下几种方式：</p>
<ul>
<li>
<pre><code>string + 操作 ：导致多次对象的分配与值拷贝
</code></pre>
</li>
<li>
<pre><code>fmt.Sprintf ：会动态解析参数，效率好不哪去
</code></pre>
</li>
<li>
<pre><code>strings.Join ：内部是[]byte的append
</code></pre>
</li>
<li>
<pre><code>bytes.Buffer ：可以预先分配大小，减少对象分配与拷贝
</code></pre>
</li>
</ul>
<p><strong>建议：对于高性能要求，优先考虑bytes.Buffer，预先分配大小。非关键路径，视简洁使用。fmt.Sprintf可以简化不同类型转换与拼接。</strong></p>
</div></template>


