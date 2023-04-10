<template><div><h3 id="myisam-与-innodb-的区别" tabindex="-1"><a class="header-anchor" href="#myisam-与-innodb-的区别" aria-hidden="true">#</a> MyISAM 与 InnoDB 的区别：</h3>
<ul>
<li>
<p>InnoDB支持事务，MyISAM不支持，这一点是非常之重要。事务是一种高级的处理方式，如在一些列增删改中只要哪个出错还可以回滚还原，而MyISAM就不可以了。</p>
</li>
<li>
<p>MyISAM适合查询以及插入为主的应用，InnoDB适合频繁修改以及涉及到安全性较高的应用</p>
</li>
<li>
<p>InnoDB支持外键，MyISAM不支持</p>
</li>
<li>
<p>MyISAM是默认引擎，InnoDB需要指定</p>
</li>
<li>
<p>InnoDB不支持FULLTEXT类型的索引</p>
</li>
<li>
<p>InnoDB中不保存表的行数，如<code v-pre>select count(*) from table</code>时，InnoDB需要扫描一遍整个表来计算有多少行，但是MyISAM只要简单的读出保存好的行数即可。注意的是，当<code v-pre>count(*)</code>语句包含where条件时MyISAM也需要扫描整个表</p>
</li>
<li>
<p>对于自增长的字段，InnoDB中必须包含只有该字段的索引，但是在MyISAM表中可以和其他字段一起建立联合索引</p>
</li>
<li>
<p>清空整个表时，InnoDB是一行一行的删除，效率非常慢。MyISAM则会重建表</p>
</li>
<li>
<p>InnoDB支持行锁（某些情况下还是锁整表，如<code v-pre> update table set a=1 where user like '%lee%'</code></p>
</li>
</ul>
<h3 id="关于myisam与innodb选择使用" tabindex="-1"><a class="header-anchor" href="#关于myisam与innodb选择使用" aria-hidden="true">#</a> 关于MyISAM与InnoDB选择使用：</h3>
<p>INNODB会支持一些关系数据库的高级功能，如事务功能和行级锁，MYISAM不支持。
MYISAM的性能更优，占用的存储空间少。
<strong>所以，选择何种存储引擎，视具体应用而定</strong></p>
<ul>
<li>如果你的应用程序一定要使用事务，毫无疑问你要选择INNODB引擎。</li>
</ul>
<p>但要注意，INNODB的行级锁是有条件的。在where条件没有使用主键时，照样会锁全表。比如DELETE FROM mytable这样的删除语句。</p>
<ul>
<li>如果你的应用程序对查询性能要求较高，就要使用MYISAM了。</li>
</ul>
<p>MYISAM索引和数据是分开的，而且其索引是压缩的，可以更好地利用内存。所以它的查询性能明显优于INNODB。压缩后的索引也能节约一些磁盘空间。MYISAM拥有全文索引的功能，这可以极大地优化LIKE查询的效率。有人说MYISAM只能用于小型应用，其实这只是一种偏见。如果数据量比较大，这是需要通过升级架构来解决，比如分表分库，而不是单纯地依赖存储引擎。</p>
<ul>
<li>现在一般都是选用innodb了</li>
</ul>
<p>主要是myisam的全表锁，读写串行问题，并发效率锁表，效率低
myisam对于读写密集型应用一般是不会去选用的。</p>
</div></template>


