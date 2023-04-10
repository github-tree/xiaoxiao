<template><div><h5 id="_1-基于数据库的实现方式" tabindex="-1"><a class="header-anchor" href="#_1-基于数据库的实现方式" aria-hidden="true">#</a> 1. 基于数据库的实现方式</h5>
<p>核心思想是：</p>
<blockquote>
<p>在数据库中创建一个表，表中包含方法名等字段，并在方法名字段上创建唯一索引，想要执行某个方法，就使用这个方法名向表中插入数据，成功插入则获取锁，执行完成后删除对应的行数据释放锁。</p>
</blockquote>
<p><strong>注意：这只是使用基于数据库的一种方法，使用数据库实现分布式锁还有很多其他的玩法！</strong></p>
<p>使用基于数据库的这种实现方式很简单，但是对于分布式锁应该具备的条件来说，它有一些问题需要解决及优化：</p>
<blockquote>
<ol>
<li>因为是基于数据库实现的，数据库的可用性和性能将直接影响分布式锁的可用性及性能，所以，数据库需要双机部署、数据同步、主备切换；</li>
<li>不具备可重入的特性，因为同一个线程在释放锁之前，行数据一直存在，无法再次成功插入数据，所以，需要在表中新增一列，用于记录当前获取到锁的机器和线程信息，在再次获取锁的时候，先查询表中机器和线程信息是否和当前机器和线程相同，若相同则直接获取锁；</li>
<li>没有锁失效机制，因为有可能出现成功插入数据后，服务器宕机了，对应的数据没有被删除，当服务恢复后一直获取不到锁，所以，需要在表中新增一列，用于记录失效时间，并且需要有定时任务清除这些失效的数据；</li>
<li>不具备阻塞锁特性，获取不到锁直接返回失败，所以需要优化获取逻辑，循环多次去获取。</li>
<li>在实施的过程中会遇到各种不同的问题，为了解决这些问题，实现方式将会越来越复杂；依赖数据库需要一定的资源开销，性能问题需要考虑。</li>
</ol>
</blockquote>
<hr>
<h5 id="_2-基于redis的实现方式" tabindex="-1"><a class="header-anchor" href="#_2-基于redis的实现方式" aria-hidden="true">#</a> 2.基于Redis的实现方式</h5>
<h6 id="选用redis实现分布式锁原因" tabindex="-1"><a class="header-anchor" href="#选用redis实现分布式锁原因" aria-hidden="true">#</a> 选用Redis实现分布式锁原因：</h6>
<blockquote>
<p>Redis有很高的性能；
Redis命令对此支持较好，实现起来比较方便</p>
</blockquote>
<h6 id="使用命令介绍" tabindex="-1"><a class="header-anchor" href="#使用命令介绍" aria-hidden="true">#</a> 使用命令介绍：</h6>
<blockquote>
<ol>
<li>SETNX key val：当且仅当key不存在时，set一个key为val的字符串，返回1；若key存在，则什么都不做，返回0。</li>
<li>expire key timeout：为key设置一个超时时间，单位为second，超过这个时间锁会自动释放，避免死锁。</li>
<li>delete key：删除key；在使用Redis实现分布式锁的时候，主要就会使用到这三个命令。</li>
</ol>
</blockquote>
<h6 id="实现思想" tabindex="-1"><a class="header-anchor" href="#实现思想" aria-hidden="true">#</a> 实现思想：</h6>
<ol>
<li>获取锁的时候，使用setnx加锁，并使用expire命令为锁添加一个超时时间，超过该时间则自动释放锁，锁的value值为一个随机生成的UUID，通过此在释放锁的时候进行判断。</li>
<li>获取锁的时候还设置一个获取的超时时间，若超过这个时间则放弃获取锁。</li>
<li>释放锁的时候，通过UUID判断是不是该锁，若是该锁，则执行delete进行锁释放。</li>
</ol>
<hr>
<h5 id="_3-基于zookeeper的实现方式" tabindex="-1"><a class="header-anchor" href="#_3-基于zookeeper的实现方式" aria-hidden="true">#</a> 3.基于ZooKeeper的实现方式</h5>
<p>ZooKeeper是一个为分布式应用提供一致性服务的开源组件，它内部是一个分层的文件系统目录树结构，规定同一个目录下只能有一个唯一文件名。</p>
<p>基于ZooKeeper实现分布式锁的步骤如下：</p>
<blockquote>
<ol>
<li>创建一个目录mylock</li>
<li>线程A想获取锁就在mylock目录下创建临时顺序节点</li>
<li>获取mylock目录下所有的子节点，然后获取比自己小的兄弟节点，如果不存在，则说明当前线程顺序号最小，获得锁</li>
<li>线程B获取所有节点，判断自己不是最小节点，设置监听比自己次小的节点</li>
<li>线程A处理完，删除自己的节点，线程B监听到变更事件，判断自己是不是最小的节点，如果是则获得锁。</li>
</ol>
</blockquote>
<p>这里推荐一个Apache的开源库Curator，它是一个ZooKeeper客户端，Curator提供的InterProcessMutex是分布式锁的实现，acquire方法用于获取锁，release方法用于释放锁。</p>
<ul>
<li>优点：具备高可用、可重入、阻塞锁特性，可解决失效死锁问题。</li>
<li>缺点：因为需要频繁的创建和删除节点，性能上不如Redis方式。</li>
</ul>
</div></template>


