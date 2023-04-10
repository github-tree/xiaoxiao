<template><div><h5 id="语句include和require的区别是什么-为避免多次包含同一文件-可用-语句代替它们" tabindex="-1"><a class="header-anchor" href="#语句include和require的区别是什么-为避免多次包含同一文件-可用-语句代替它们" aria-hidden="true">#</a> 语句include和require的区别是什么?为避免多次包含同一文件，可用(?)语句代替它们?</h5>
<blockquote>
<p>require-&gt;require是无条件包含也就是如果一个流程里加入require,无论条件成立与否都会先执行require
include-&gt;include有返回值，而require没有(可能因为如此require的速度比include快)
注意:包含文件不存在或者语法错误的时候require是致命的,include不是</p>
</blockquote>
<hr>
<h5 id="php中常用的数组函数" tabindex="-1"><a class="header-anchor" href="#php中常用的数组函数" aria-hidden="true">#</a> PHP中常用的数组函数</h5>
<blockquote>
<p>in_array：检查数组中是否存在某个值
array_search：在数组中搜索给定的值，如果成功则返回首个相应的键名
array_key_exists：检查数组里是否有指定的键名或索引
array_values：返回数组中所有的值
array_column：返回数组中指定的一列
array_merge：合并一个或多个数组
array_pop：弹出数组最后一个单元（出栈）
list：把数组中的值赋给一组变量
ksort：对数组按照键名排序</p>
</blockquote>
<hr>
<h5 id="在php中error-reporting这个函数有什么作用" tabindex="-1"><a class="header-anchor" href="#在php中error-reporting这个函数有什么作用" aria-hidden="true">#</a> 在PHP中error_reporting这个函数有什么作用?</h5>
<blockquote>
<p>设置错误级别与错误信息回报</p>
</blockquote>
<hr>
<h5 id="简述如何得到当前执行脚本路径-包括所得到参数。" tabindex="-1"><a class="header-anchor" href="#简述如何得到当前执行脚本路径-包括所得到参数。" aria-hidden="true">#</a> 简述如何得到当前执行脚本路径，包括所得到参数。</h5>
<blockquote>
<p><code v-pre>$script_name = basename(__file__); print_r($script_name);</code></p>
</blockquote>
</div></template>


