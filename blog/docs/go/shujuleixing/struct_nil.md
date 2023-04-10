---
title: "空 struct{} 占用空间么"
date: 2022-04-14T08:41:44+08:00
---

空结构体 `struct{}` 实例不占据任何的内存空间。
可以使用 `unsafe.Sizeof` 计算出一个数据类型实例需要占用的字节数:

```
func main() {
      fmt.Println(unsafe.Sizeof(struct{}{}))  //0
    }
```
