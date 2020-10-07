# 基础知识

CSS 主要是对页面元素【结构】的美化、依赖于Html.

大部分HTML元素都有系统提供的样式，但有以下问题

- 不同浏览器显示样式不一致
- 样式过于简单，显示效果不美观
- 很难按照设计稿完全呈现显示效果

## 样式申明 :sunglasses:

### 外部样式
使用 link 标签引入外部样式文件，需要注意以下几点。

- link 标签放在 head 标签内部
- 样式文件要以 .css 为扩展名
- 一个页面往往需要引入多个样式文件

属性  |	说明
---|---
rel  |	定义当前文档与被链接文档之间的关系
href |	外部样式文件【路径】
type |  文档类型

```html
<link rel="stylesheet" href="style.css" type="text/css">
```
### 内嵌样式

使用`` style ``标签在文档内部定义样式规则。

```html
<style>
	body {
		background: red;
	}
</style>
```

### 内联样式
可以为某个标签单独设置样式。

```html
<h1 style="color:green;">jc-sir.github.io</h1>
```

### 导入样式
使用`` @import``可以在原样式规则中导入其他样式表，可以在外部样式、``style标签``中使用。

**导入样式要放在样式规则前面定义。**

```html
<style>
	@import url("style.css");
	body {
		background: red;
	}
</style>
```

## 其他

### 空白
在样式规则中可以随意使用空白，空白只是看不见但同样占用空间，所以可以结合其他工具如`` webpack ``等将 ``css`` 压缩为一行。

### 注释

```html
...
body {
	/* 这是注释的使用 */
	background: red;
}
...
```

### 错误

样式规则如果存在错误，解析器会选择忽略，并不会影响其他样式规则。

以下代码的test:red 是无效样式但不影响后面的 font-size:100px; 规则使用。


```css
h1 {
    /*test属性不存在*/
    test: red; 
    font-size: 100px;
}
```
