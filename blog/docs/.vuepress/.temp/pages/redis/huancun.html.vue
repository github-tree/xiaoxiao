<template><div><ul>
<li>方案一：只更缓存，不更MySQL，MySQL由缓存异步的更新</li>
<li>方案二：先删缓存，再更新数据库</li>
</ul>
<blockquote>
<p>延迟双删，双删就是在更新完数据库后再删一次。</p>
</blockquote>
<ul>
<li>方案三：先写数据库，再删缓存</li>
</ul>
<blockquote>
<p>1.更新缓存的操作不是必须的。可能缓存里的数据并没有被读到，就会被下一次更新MySQL操作带来Redis更新操作覆盖，那么本次更新操作就是无意义的。
2.更新缓存代价大。如果缓存里的数据不是把MySQL里的数据直接存下来，而是需要经过某种复杂的运算，那么这种不必要的更新会带来更大的浪费。
3.每个写MySQL线程写完后延时一定时间在去删Redis中的缓存。</p>
</blockquote>
</div></template>


