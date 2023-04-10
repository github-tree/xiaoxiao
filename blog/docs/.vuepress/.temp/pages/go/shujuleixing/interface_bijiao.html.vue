<template><div><p>判断类型是否一样</p>
<blockquote>
<p><code v-pre>reflect.TypeOf(a).Kind() == reflect.TypeOf(b).Kind()</code></p>
</blockquote>
<p>判断两个 interface{}是否相等</p>
<blockquote>
<p><code v-pre>reflect.DeepEqual(a, b interface{})</code></p>
</blockquote>
<p>将一个 interface{}赋值给另一个 interface{}</p>
<blockquote>
<p><code v-pre>reflect.ValueOf(a).Elem().Set(reflect.ValueOf(b))</code></p>
</blockquote>
</div></template>


