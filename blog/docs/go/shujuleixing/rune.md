---
title: "什么是 rune 类型"
date: 2022-04-14T08:24:54+08:00
---

Go 语言的字符有以下两种：

>* uint8 类型：或者叫 byte 型，代表了 ASCII 码的一个字符。
>* rune 类型：代表一个 UTF-8 字符，当需要处理中文、日文或者其他复合字符时，则需要用到 rune 类型。rune 类型等价于 int32 类型。

golang中string底层是通过byte数组实现的。中文字符在unicode下占2个字节，在utf-8编码下占3个字节，而golang默认编码正好是utf-8。

```
//以下两种都可以得到str的字符串长度

//golang中的unicode/utf8包提供了用utf-8获取长度的方法
fmt.Println("RuneCountInString:", utf8.RuneCountInString(str))

//通过rune类型处理unicode字符
fmt.Println("rune:", len([]rune(str)))
```