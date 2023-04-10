<template><div><h2 id="函数索引" tabindex="-1"><a class="header-anchor" href="#函数索引" aria-hidden="true">#</a> 函数索引</h2>
<p>从 MySQL 5.7 版本开始，MySQL 开始支持创建函数索引 （即索引键是一个函数表达式）。 函数索引有两大用处：</p>
<ol>
<li>优化业务 SQL 性能：
假如我们有一个注册日期字段 register_date，并对其创建了索引，现在有如下条件查询 where DATE_FORMAT(register_date,'%Y-%m') = '2021-10'，那么能不能命中索引呢？答案是不能，索引只对 register_date 的数据排序，并没有对 DATE_FORMAT(register_date) 排序，因此不能使用到此索引。我们可以使用函数索引解决这个问题， 创建一个 DATE_FORMAT(register_date) 的索引。</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
ALTER TABLE Testtable
ADD INDEX 
idx_func_register_date((DATE_FORMAT(register_date,'%Y-%m')));

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>配合虚拟列（Generated Column）。例如有如下表：</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
CREATE TABLE User (
    userId BIGINT,
    userInfo JSON,
    mobile VARCHAR(255) AS (userInfo->>"$.mobile"),
    PRIMARY KEY(userId),
    UNIQUE KEY idx_mobile(mobile)
);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mobile 列就是一个虚拟列，由后面的函数表达式计算而成，本身这个列不占用任何的存储空间，而索引 idx_mobile 实质是一个函数索引。这样做的好处是在写 SQL 时可以直接使用这个虚拟列，而不用写冗长的函数：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>

-- 不用虚拟列
SELECT  *  FROM User
WHERE userInfo->>"$.mobile" = '15088888888'

-- 使用虚拟列
SELECT  *  FROM User 
WHERE mobile = '15088888888'

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h2 id="最左前缀原则" tabindex="-1"><a class="header-anchor" href="#最左前缀原则" aria-hidden="true">#</a> 最左前缀原则</h2>
<p>B+ 树这种索引结构，可以利用索引的“最左前缀”，来定位记录。</p>
<p>例如我们有字段 a 和 b，都为高频字段，为了减少回表，我们可以建立联合索引 (a,b)，这时不需要单独在 a 上建立索引了。</p>
<p>但是如果查询条件里面只有 b 的语句，是无法使用 (a,b) 这个联合索引的，这时候你不得不维护另外一个索引， 如果 a 字段比 b 字段大可以创建 (a,b)、(b) 这两个索引，反之创建 (b,a)、(a) 这两个索引。</p>
<hr>
<h2 id="普通索引与唯一索引的选择" tabindex="-1"><a class="header-anchor" href="#普通索引与唯一索引的选择" aria-hidden="true">#</a> 普通索引与唯一索引的选择</h2>
<p>业务代码已经保证不会写入重复数据”的情况下，建议尽量选择普通索引。</p>
<p><strong>查询时：</strong></p>
<ul>
<li>普通索引，查找到满足条件的第一个记录后，还需要查找下一个记录，直到碰到第一个不满足条件的记录。</li>
<li>唯一索引，由于索引定义了唯一性，查找到第一个满足条件的记录后，就会停止继续检索。</li>
</ul>
<p>上面的不同之处在性能差距上微乎其微。因为对于数据的读取不仅仅将需要读取的某一条数据从磁盘上读取出来，Innodb 的数据是按照页为单位来进行读写的，每页的默认大小为 16KB，所以对于普通索引来说，只是多做一次“查找和判断下一条记录”的操作，只需要一次指针寻找和一次计算，操作成本对于现在的 CPU 来说可以忽略不计。</p>
<p><strong>更新时：</strong></p>
<ul>
<li>普通索引，则是将更新记录在 change buffer，语句执行就结束了。</li>
<li>唯一索引，需要将数据页读入内存，判断到没有冲突，插入这个值，语句执行结束。</li>
</ul>
<p><strong>唯一索引的更新不能使用 change buffer，普通索引可以使用到</strong></p>
<p>什么是 change buffer？</p>
<blockquote>
<ol>
<li>当对数据页进行更新时，如果数据页在内存中则直接更新，如果不在 Innodb 会将更新操作记录在 change buffer 中，免去了去磁盘中读取数据页的过程，下次查询的时候，再将数据页读入内存，结合 change buffer 记录来返回数据，同时进行 merge 操作（将 change buffer 中的操作应用到原数据页）。</li>
<li>change buffer 在内存中有拷贝，也会被写入到磁盘上,它是可以持久化的数据的。</li>
</ol>
</blockquote>
<p>对于唯一索引，更新时需要将数据页读取到内存中来判断是否违反了唯一性约束，数据页既然都已经读到内存中了，自然也就不需要 change buffer 了；而普通索引，则是将更新记录在 change buffer。由于磁盘 IO 成本较高，不如使用 change buffer 对性能更加友好。</p>
<hr>
<h2 id="组合索引" tabindex="-1"><a class="header-anchor" href="#组合索引" aria-hidden="true">#</a> 组合索引</h2>
<p>组合索引（Compound Index）是指由多个列所组合而成的 B+树索引。</p>
<ol>
<li>对组合索引（a，b），因为其对列 a、b 做了排序，所以此索引可以优化的的 SQL 有：</li>
</ol>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
WHERE a = ?
WHERE a = ? AND b = ?
WHERE b = ? AND a = ?
WHERE a = ? ORDER BY b DESC

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>索引（a，b）排序不能得出（b，a）排序，所以下面 SQL 不能被优化：</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
WHERE b = ?
WHERE b = ？ ORDER BY a DESC

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li>使用 组合索引 进行 索引覆盖</li>
</ol>
<p>若查询的字段在二级索引的叶子节点中，则可直接返回结果，无需回表。这种通过组合索引避免回表的优化技术也称为索引覆盖（Covering Index）。利用组合索引包含多个列的特性，可以实现索引覆盖技术，提升 SQL 的查询性能。</p>
</div></template>


