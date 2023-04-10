<template><div><p>对于 性别 或 表示状态的字段，推荐使用 CHECK 约束功能。</p>
<ul>
<li>MySQL 8.0.16 版本开始，数据库原生提供 CHECK 约束功能。</li>
<li>避免了使用 tinyint 类型产生的表达不清（值代表实际意义不明确）、脏数据（可能会存入其他值）的产生。</li>
<li></li>
<li>如下，约束定义列 sex 的取值范围，只能是 M 或者 F。同时，当插入非法数据时，MySQL 会显式地抛出违法约束的提示（<code v-pre>Check constraint 'user_chk_1' is violated</code>.）。</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>
CREATE TABLE User (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    sex CHAR(1) NOT NULL,
    password VARCHAR(1024) NOT NULL,
    CHECK (sex = 'M' OR sex = 'F'),
    PRIMARY KEY(id)
);

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


