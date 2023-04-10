---
title: "Sync"
date: 2022-04-14T09:12:16+08:00
---


Go语言的sync包提供了常见的并发编程控制锁;


##### sync.Mutex

Mutex 互斥锁实现了2个方法
```
func (m *Mutex) Lock()
func (m *Mutex) Unlock()
```


Mutex类型互斥锁原理

>* 平时所说的锁定，其实就是去锁定互斥锁，而不是说去锁定一段代码;
>* 这和其他编程语言有所区别,例如java 中我们会用同步锁锁定一段代码,确保多线程并发时只有一个线程可以控制运行此代码段,知道释放同步锁;
>* 而go语言是在 goroutine 中锁定互斥锁 ,其他 goroutine 执行到有锁的地方时，它获取不到互斥锁的锁定，会阻塞在那里等待，从而达到控制同步的目的.



* * *

##### sync.RWMutex

RWMutex 读写锁 基于 Mutex 实现

读写锁的特点 :它是针对读写操作的互斥锁，读写锁与互斥锁最大的不同就是可以分别对 读、写 进行锁定。一般用在大量读操作、少量写操作的情况.

>* 同时只能有一个 goroutine 能够获得写锁定
>* 同时可以有任意多个 gorouinte 获得读锁定
>* 同时只能存在写锁定或读锁定（读和写互斥）

* 当有一个 goroutine 获得写锁定，其它无论是读锁定还是写锁定都将阻塞直到写解锁；
* 当有一个 goroutine 获得读锁定，其它读锁定任然可以继续；
* 当有一个或任意多个读锁定，写锁定将等待所有读锁定解锁之后才能够进行写锁定;
* 所以说这里的读锁定（RLock）目的其实是告诉写锁定：有很多人正在读取数据，你需要排队等待;


实现的方法:
```
func (rw *RWMutex) Lock()
func (rw *RWMutex) Unlock()

func (rw *RWMutex) RLock()
func (rw *RWMutex) RUnlock()
```


* * *


##### sync.WaitGroup

它的使用场景是在一个goroutine等待一组goroutine执行完成.

* WaitGroup拥有一个内部计数器;
* 当计数器等于0时，则Wait()方法会立即返回;
* 否则它将阻塞执行Wait()方法的goroutine直到计数器等于0时为止;增加计数器，使用Add(int)方法。
* 减少计数器，我们可以使用Done()（将计数器减1），
* 也可以传递负数给Add方法把计数器减少指定大小，Done()方法底层就是通过Add(-1)实现的.

```

func main() { 
    var wg sync.WaitGroup 
    for i := 0; i < 5; i++ { 
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
```