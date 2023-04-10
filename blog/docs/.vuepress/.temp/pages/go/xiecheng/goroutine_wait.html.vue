<template><div><p>使用<code v-pre> sync.WaitGroup</code>。，就是用来等待一组操作完成的。</p>
<ul>
<li>WaitGroup 内部实现了一个计数器，用来记录未完成的操作个数。</li>
<li>Add()用来添加计数；</li>
<li>Done()用来在操作结束时调用，使计数减一；</li>
<li>Wait()用来等待所有的操作结束，即计数变为 0，该函数会在计数不为 0 时等待，在计数为 0 时立即返回。</li>
</ul>
</div></template>


