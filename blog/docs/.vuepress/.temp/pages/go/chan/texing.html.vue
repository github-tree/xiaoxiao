<template><div><ul>
<li>给一个 nil channel 发送数据，造成永远阻塞</li>
<li>从一个 nil channel 接收数据，造成永远阻塞</li>
<li>给一个已经关闭的 channel 发送数据，引起 panic</li>
<li>从一个已经关闭的 channel 接收数据，如果缓冲区中为空，则返回一个零值</li>
<li>无缓冲的channel是同步的，而有缓冲的channel是非同步的</li>
</ul>
<p><strong>CHAN 原理</strong></p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>	type hchan struct {
		qcount   uint  			    // 队列中的总元素个数
		dataqsiz uint  			    // 环形队列大小，即可存放元素的个数
		buf      unsafe.Pointer            // 环形队列指针
		elemsize uint16  		    // 每个元素的大小
		closed   uint32  		    // 标识关闭状态
		elemtype *_type 		    // 元素类型
		sendx    uint   		            // 发送索引，元素写入时存放到队列中的位置
		recvx    uint   		            // 接收索引，元素从队列的该位置读出
		recvq    waitq  		            // 等待读消息的goroutine队列
		sendq    waitq  		    // 等待写消息的goroutine队列
		lock mutex  			    // 互斥锁，chan不允许并发读写
	}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


