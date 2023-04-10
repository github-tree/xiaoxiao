<template><div><h5 id="分布式事务的实现主要有以下-5-种方案" tabindex="-1"><a class="header-anchor" href="#分布式事务的实现主要有以下-5-种方案" aria-hidden="true">#</a> 分布式事务的实现主要有以下 5 种方案：</h5>
<h6 id="_1-两阶段提交方案-xa方案" tabindex="-1"><a class="header-anchor" href="#_1-两阶段提交方案-xa方案" aria-hidden="true">#</a> 1. 两阶段提交方案/XA方案</h6>
<blockquote>
<ul>
<li>有一个事务管理器的概念，负责协调多个数据库（资源管理器）的事务，</li>
<li>事务管理器先问问各个数据库你准备好了吗？</li>
<li>如果每个数据库都回复 ok，那么就正式提交事务，在各个数据库上执行操作；</li>
<li>如果任何其中一个数据库回答不 ok，那么就回滚事务。</li>
</ul>
</blockquote>
<h6 id="_2-tcc-方案" tabindex="-1"><a class="header-anchor" href="#_2-tcc-方案" aria-hidden="true">#</a> 2. TCC 方案</h6>
<blockquote>
<ul>
<li>Try 阶段：这个阶段说的是对各个服务的资源做检测以及对资源进行锁定或者预留。</li>
<li>Confirm 阶段：这个阶段说的是在各个服务中执行实际的操作。</li>
<li>Cancel 阶段：如果任何一个服务的业务方法执行出错，那么这里就需要进行补偿，就是执行已经执行成功的业务逻辑的回滚操作。（把那些执行成功的回滚）</li>
</ul>
</blockquote>
<h6 id="_3-本地消息表" tabindex="-1"><a class="header-anchor" href="#_3-本地消息表" aria-hidden="true">#</a> 3. 本地消息表</h6>
<h6 id="_4-可靠消息最终一致性方案" tabindex="-1"><a class="header-anchor" href="#_4-可靠消息最终一致性方案" aria-hidden="true">#</a> 4. 可靠消息最终一致性方案</h6>
<blockquote>
<ul>
<li>基于 MQ 来实现事务。比如阿里的 RocketMQ 就支持消息事务</li>
</ul>
</blockquote>
<h6 id="_5-最大努力通知方案" tabindex="-1"><a class="header-anchor" href="#_5-最大努力通知方案" aria-hidden="true">#</a> 5. 最大努力通知方案</h6>
<blockquote>
<ul>
<li>系统 A 本地事务执行完之后，发送个消息到 MQ；</li>
<li>这里会有个专门消费 MQ 的最大努力通知服务，这个服务会消费 MQ 然后写入数据库中记录下来，或者是放入个内存队列也可以，接着调用系统 B 的接口；</li>
<li>要是系统 B 执行成功就 ok 了；要是系统 B 执行失败了，那么最大努力通知服务就定时尝试重新调用系统 B，反复 N 次，最后还是不行就放弃。</li>
</ul>
</blockquote>
</div></template>


