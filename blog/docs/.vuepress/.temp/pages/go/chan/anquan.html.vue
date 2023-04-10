<template><div><ul>
<li>Channel 可以理解是一个先进先出的队列，通过管道进行通信,发送一个数据到Channel和从Channel接收一个数据都是原子性的。</li>
<li>不要通过共享内存来通信，而是通过通信来共享内存，前者就是传统的加锁，后者就是 Channel。</li>
<li>设计 Channel 的主要目的就是在多任务间传递数据的，本身就是安全的。</li>
</ul>
</div></template>


