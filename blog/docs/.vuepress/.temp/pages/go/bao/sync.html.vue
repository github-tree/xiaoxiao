<template><div><p>Go语言的sync包提供了常见的并发编程控制锁;</p>
<h5 id="sync-mutex" tabindex="-1"><a class="header-anchor" href="#sync-mutex" aria-hidden="true">#</a> sync.Mutex</h5>
<p>Mutex 互斥锁实现了2个方法</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>func (m *Mutex) Lock()
func (m *Mutex) Unlock()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Mutex类型互斥锁原理</p>
<blockquote>
<ul>
<li>平时所说的锁定，其实就是去锁定互斥锁，而不是说去锁定一段代码;</li>
<li>这和其他编程语言有所区别,例如java 中我们会用同步锁锁定一段代码,确保多线程并发时只有一个线程可以控制运行此代码段,知道释放同步锁;</li>
<li>而go语言是在 goroutine 中锁定互斥锁 ,其他 goroutine 执行到有锁的地方时，它获取不到互斥锁的锁定，会阻塞在那里等待，从而达到控制同步的目的.</li>
</ul>
</blockquote>
<hr>
<h5 id="sync-rwmutex" tabindex="-1"><a class="header-anchor" href="#sync-rwmutex" aria-hidden="true">#</a> sync.RWMutex</h5>
<p>RWMutex 读写锁 基于 Mutex 实现</p>
<p>读写锁的特点 :它是针对读写操作的互斥锁，读写锁与互斥锁最大的不同就是可以分别对 读、写 进行锁定。一般用在大量读操作、少量写操作的情况.</p>
<blockquote>
<ul>
<li>同时只能有一个 goroutine 能够获得写锁定</li>
<li>同时可以有任意多个 gorouinte 获得读锁定</li>
<li>同时只能存在写锁定或读锁定（读和写互斥）</li>
</ul>
</blockquote>
<ul>
<li>当有一个 goroutine 获得写锁定，其它无论是读锁定还是写锁定都将阻塞直到写解锁；</li>
<li>当有一个 goroutine 获得读锁定，其它读锁定任然可以继续；</li>
<li>当有一个或任意多个读锁定，写锁定将等待所有读锁定解锁之后才能够进行写锁定;</li>
<li>所以说这里的读锁定（RLock）目的其实是告诉写锁定：有很多人正在读取数据，你需要排队等待;</li>
</ul>
<p>实现的方法:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>func (rw *RWMutex) Lock()
func (rw *RWMutex) Unlock()

func (rw *RWMutex) RLock()
func (rw *RWMutex) RUnlock()
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h5 id="sync-waitgroup" tabindex="-1"><a class="header-anchor" href="#sync-waitgroup" aria-hidden="true">#</a> sync.WaitGroup</h5>
<p>它的使用场景是在一个goroutine等待一组goroutine执行完成.</p>
<ul>
<li>WaitGroup拥有一个内部计数器;</li>
<li>当计数器等于0时，则Wait()方法会立即返回;</li>
<li>否则它将阻塞执行Wait()方法的goroutine直到计数器等于0时为止;增加计数器，使用Add(int)方法。</li>
<li>减少计数器，我们可以使用Done()（将计数器减1），</li>
<li>也可以传递负数给Add方法把计数器减少指定大小，Done()方法底层就是通过Add(-1)实现的.</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
func main() { 
    var wg sync.WaitGroup 
    for i := 0; i &lt; 5; i++ { 
        // 计数加 1 
        wg.Add(1) 
        go func(i int) { 
            // 计数减 1 
            defer wg.Done() 
            time.Sleep(time.Second * time.Duration(i)) 
            fmt.Printf("goroutine%d 结束\n", i) 
        }(i) 
    } 
        
    // 等待执行结束 
    wg.Wait() 
    fmt.Println("所有 goroutine 执行结束") 
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


