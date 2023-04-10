<template><div><h4 id="数据库中设置sql慢查询" tabindex="-1"><a class="header-anchor" href="#数据库中设置sql慢查询" aria-hidden="true">#</a> 数据库中设置SQL慢查询</h4>
<p>1.开启“慢查询”记录功能</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>set global slow_query_log=ON;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>2.设置“慢查询”的时间定义</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>set long_query_time=0.0001;
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="使用explain分析慢查询sql" tabindex="-1"><a class="header-anchor" href="#使用explain分析慢查询sql" aria-hidden="true">#</a> 使用explain分析慢查询sql</h4>
<p>例如：执行 <code v-pre>EXPLAIN SELECT * FROM res_user ORDER BYmodifiedtime LIMIT 0,1000</code></p>
<p>explain参数：</p>
<ul>
<li>select_type:表示SELECT的类型，常见的取值有：</li>
</ul>
<blockquote>
<ol>
<li>SIMPLE	简单表，不使用表连接或子查询</li>
<li>PRIMARY	主查询，即外层的查询</li>
<li>UNION	UNION中的第二个或者后面的查询语句</li>
<li>SUBQUERY	子查询中的第一个</li>
</ol>
</blockquote>
<ul>
<li>table:输出结果集的表（表别名）</li>
<li>type:表示MySQL在表中找到所需行的方式，或者叫访问类型。常见访问类型如下，从上到下，性能由差到最好：</li>
</ul>
<blockquote>
<ol>
<li>ALL		全表扫描</li>
<li>index	索引全扫描</li>
<li>range	索引范围扫描</li>
<li>ref		非唯一索引扫描</li>
<li>eq_ref	唯一索引扫描</li>
<li>const,system	单表最多有一个匹配行</li>
<li>NULL	不用扫描表或索引</li>
</ol>
</blockquote>
<ul>
<li>possible_keys: 表示查询可能使用的索引</li>
<li>key: 实际使用的索引</li>
<li>key_len: 使用索引字段的长度</li>
<li>ref: 使用哪个列或常数与key一起从表中选择行。</li>
<li>rows: 扫描行的数量</li>
<li>filtered: 存储引擎返回的数据在server层过滤后，剩下多少满足查询的记录数量的比例(百分比)</li>
<li>Extra: 执行情况的说明和描述，包含不适合在其他列中显示但是对执行计划非常重要的额外信息</li>
</ul>
<blockquote>
<ol>
<li>Using Index	表示索引覆盖，不会回表查询</li>
<li>Using Where	表示进行了回表查询</li>
<li>Using Index Condition	表示进行了ICP优化</li>
<li>Using Flesort	表示MySQL需额外排序操作, 不能通过索引顺序达到排序效果</li>
</ol>
</blockquote>
</div></template>


