# Html锚点

## 概念
- `<a>`元素 (或HTML锚元素, Anchor Element)通常用来表示一个锚点/链接。
- 但严格来说，`<a>`元素不是一个链接，而是超文本锚点，可以链接到一个新文件、用id属性指向任何元素。
- 如果没有`<a>`元素没有href属性的话，可以作为原本链接位置的占位符，常用于home链接
- [注意]任何文档流内容都可以被嵌套，只要不是交互内容类别(如按钮、链接等)

## 属性
### href
::: danger [注意]
href属性一定不要留空，若暂时不需要写地址，则写 `#` 或`javascript:;`。若href留空，会刷新页面
:::

href属性表示地址，共包括以下3种

- 链接地址
```html
<a href="http://www.baidu.com">百度</a>
```
- 下载地址
```html
<a href="test.zip">🌂download🐷</a>
```
- 锚点
> href:#id名

[示例代码地址🐤](https://gitee.com/jc-sir/public/blob/master/www/href.html)

<iframe 
    width="100%"
    scrolling="no"
    src="https://jc-sir.gitee.io/public/href.html" 
    frameborder=0 
    allowfullscreen>
</iframe>

> href:页面地址#id名

[🐟去HTML锚点🦌](https://juncaihe.com/Html/HTML锚点.html#href)
```html
<a href="https://juncaihe.com/Html/HTML锚点.html#href">HTML锚点</a>
```

- 拨打手机号
在移动端，使用`<a href="tel:185****6197>185****6197</a>`可以唤出手机拨号盘

## href VS src
::: tip 提示
- href(hypertext reference)指超文本引用，表示当前页面引用了别处的内容
- src(source)表示来源地址，表示把别处的内容引入到当前页面

**所以`<img>`、`<script>`、`<iframe>`等应该使用src，而`<a>`和`<map>`应该使用 `href`**
:::


## target
target属性表示链接打开方式
- _self    当前窗口（默认）
- _blank    新窗口
- _parent 父框架集
- _top 整个窗口
- _framename 指定框架

[查看效果](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/target)


::: danger [注意]
- `<a>`标签的文本颜色只能自身进行设置，从父级继承不到
- `<a>`标签的下划线颜色跟随文本颜色进行变化
- `<a>`标签不可嵌套`<a>`标签
:::

```html
<div style="color: red;">
    <a href="#">从父级继承不到红色字体</a>
    <br>
    <a href="#" style="color: green">下划线颜色与文本同色</a>
    <br>
    <a href="#">前面<a href="#">a标签不可嵌套</a></a>
</div>
```