<template><div><ol>
<li>命令 EXPLAIN 查看是否使用索引。</li>
<li>查询表 mysql.innodb_index_stats 查看每个索引的大致情况。</li>
<li>查询表 sys.schema_unused_indexes 查看有哪些索引一直未被使用过，可以被废弃。</li>
</ol>
</div></template>


