<template><div><p><strong>事务</strong>（transaction）是作为一个单元的一组有序的数据库操作。如果组中的所有操作都成功，则认为事务成功，即使只有一个操作失败，事务也不成功。如果所有操作完成，事务则提交，其修改将作用于所有其他数据库进程。如果一个操作失败，则事务将回滚，该事务所有操作的影响都将取消。</p>
<h5 id="事务具有4个特征" tabindex="-1"><a class="header-anchor" href="#事务具有4个特征" aria-hidden="true">#</a> 事务具有4个特征</h5>
<p>分别是原子性、一致性、隔离性和持久性，简称事务的ACID特性；</p>
<ul>
<li>一、原子性（atomicity)一个事务要么全部提交成功，要么全部失败回滚，不能只执行其中的一部分操作，这就是事务的原子性</li>
<li>二、一致性（consistency)事务的执行不能破坏数据库数据的完整性和一致性，一个事务在执行之前和执行之后，数据库都必须处于一致性状态。如果数据库系统在运行过程中发生故障，有些事务尚未完成就被迫中断，这些未完成的事务对数据库所作的修改有一部分已写入物理数据库，这是数据库就处于一种不正确的状态，也就是不一致的状态</li>
<li>三、隔离性（isolation）事务的隔离性是指在并发环境中，并发的事务时相互隔离的，一个事务的执行不能不被其他事务干扰。不同的事务并发操作相同的数据时，每个事务都有各自完成的数据空间，即一个事务内部的操作及使用的数据对其他并发事务时隔离的，并发执行的各个事务之间不能相互干扰。</li>
<li>四、持久性（durability）一旦事务提交，那么它对数据库中的对应数据的状态的变更就会永久保存到数据库中。--即使发生系统崩溃或机器宕机等故障，只要数据库能够重新启动，那么一定能够将其恢复到事务成功结束的状态</li>
</ul>
<h5 id="mysql-包括的事务隔离级别如下" tabindex="-1"><a class="header-anchor" href="#mysql-包括的事务隔离级别如下" aria-hidden="true">#</a> MySQL 包括的事务隔离级别如下：</h5>
<ul>
<li>读未提交（READ UNCOMITTED）</li>
<li>读提交（READ COMMITTED）</li>
<li>可重复读（REPEATABLE READ）</li>
<li>串行化（SERIALIZABLE）</li>
</ul>
<table>
<thead>
<tr>
<th>隔离级别</th>
<th>脏读</th>
<th>不可重复读</th>
<th>幻读</th>
</tr>
</thead>
<tbody>
<tr>
<td>读未提交（READ UNCOMITTED）</td>
<td>√</td>
<td>√</td>
<td>√</td>
</tr>
<tr>
<td>读提交（READ COMMITTED）</td>
<td>×</td>
<td>√</td>
<td>√</td>
</tr>
<tr>
<td>可重复读（REPEATABLE READ）</td>
<td>×</td>
<td>×</td>
<td>√</td>
</tr>
<tr>
<td>串行化（SERIALIZABLE）</td>
<td>×</td>
<td>×</td>
<td>×</td>
</tr>
</tbody>
</table>
</div></template>


