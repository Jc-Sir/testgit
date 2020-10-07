# 浮动布局
- float 属性定义元素在哪个方向浮动。
- 以往这个属性总应用于图像，使文本围绕在图像周围，不过在 CSS 中，任何元素都可以浮动。
- 浮动元素会生成一个块级框，而不论它本身是何种元素。

## 浮动布局
### float
使用浮动可以控制相邻元素间的排列关系。

| 选项  | 说明     |
|-------|----------|
| left  | 向左浮动 |
| right | 向右浮动 |
| none  | 不浮动   |

没有设置浮动的块元素是独占一行的

**浮动是对后面元素的影响**

### 丢失空间
如果只给第一个元素设置浮动，第二个元素不设置，后面的元素会占用第一个元素空间。

两个元素都设置浮动后，会并排显示

为第二个元素设置右浮动时将移动到右边
```css
div:first-of-type {
    float: left;
    border: solid 2px red;
}

div:last-of-type {
    float: right;
    background: green;
}
```

### 浮动边界
浮动元素边界不能超过父元素的padding

### 浮动转块
元素浮动后会变为块元素包括行元素如 ``span``，所以浮动后的元素可以设置宽高

```css
a {
    float: left;
    width: 300px;
}
```

## 清除浮动
不希望元素受浮动元素影响时，可以清除浮动。

### clear

CSS提供了 clear 规则用于清除元素浮动影响。

| 选项  | 说明             |
|-------|------------------|
| left  | 左边远离浮动元素 |
| right | 右连远离浮动元素 |
both	左右都远离浮动元素

### 添加空元素

```html
<div>
    <div style="float:left;width:45%;"></div>
    <div style="float:right;width:45%;"></div>
    <div style="clear:both;"></div>
</div>
```

原理是父容器现在必须考虑非浮动子元素的位置，而后者肯定出现在浮动元素下方，所以显示出来，父容器就把所有子元素都包括进去了。

**缺点**

在页面中增加冗余标签，违背了语义网的原则

### 父容器浮动
```html
<div style="float:left;">
    <div style="float:left;width:45%;"></div>
    <div style="float:right;width:45%;"></div>
</div>
```
**缺点**

在于父容器变成浮动以后会影响到后面元素的定位，而且有时候，父容器是定位死的，无法变成浮动。

### overflow
让父容器变得可以自动"清理"（clearing）子元素的浮动，从而能够识别出浮动子元素的位置，不会出现显示上的差错。

只要为父容器加上一条"overflow: hidden"

```html
<div style="overflow: hidden;">
    <div style="float:left;width:45%;"></div>
    <div style="float:right;width:45%;"></div>
</div>
```
**缺点**
- 一个是IE6不支持，
- 另一个是一旦子元素的大小超过父容器的大小，就会出显示问题。

### :after伪选择符
```css
.clearfix:after {
    content: "\0020";
    display: block;
    height: 0;
    clear: both;
}
.clearfix {
    zoom: 1;
}
``` 
