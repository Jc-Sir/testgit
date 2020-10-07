# css文本控制

## 基础设置
### 字体设置
可以定义多个字体，系统会依次查找。要使用通用字体

### 自定义字体
可以声明自定义字段，如果客户端不存在将下载该字体，使用方式也是通过 font-family 引入。

```html
<style>
  @font-face {
  	font-family: "textfont";
  	src:url("SourceHanSansSC-Light.otf") format("opentype"),
  		url("SourceHanSansSC-Heavy.otf") format("opentype");
  }
  
  span {
  	font-family: 'textfont';
  }
</style>
```
| 字体  | 格式              |
|-------|-------------------|
| .otf  | opentype          |
| .woff | woff              |
| .ttf  | truetype          |
| .eot  | Embedded-opentype |


不建议使用中文字体，因为文件太大且大部分是商业字体

### 字重定义
字重指字的粗细定义。取值范围 normal | bold | bolder | lighter | 100 ~900。

400对应 ``normal`` , 700对应 ``bold`` ，一般情况下使用 ``bold`` 或 ``normal`` 较多。

```css
span{
    font-weight:normal
    <!--等同于 font-weight:400-->
}
p{
    font-weight:bold  
    <!--等同于 font-weight:700-->
}
```

### 文本字号 font-size
字号用于控制字符的显示大小，包括 xx-small | x-small | small | meidum | large | x-large | xx-large。

百分数

百分数是子元素``相对于父元素``的大小，如父元素是20px，子元素设置为 200%即为你元素的两倍大小。

```html
<style>
  /* 设定段落文字大小为非常大 */
  p { font-size: xx-large }
  article {
  	font-size: 20px;
  }
  /* 2.5 */
  span {
  	font-size: 250%;  
  }
</style>
...

<article>
	<span>jc-sir.github.io</span>  
	<!--font-size:40px-->
    <p>超级大的字体哟</p>
</article>
```

em

em单位等同于百分数单位。

```
em = 希望得到的像素大小 / 父元素字体像素大小

em可以自动适应用户的字体
```

假设body的文字大小设为1em，且浏览器默认1em = 16px。
如果你想得到12px，那你就可设定0.75em (because 12/16 = 0.75)。
同样的，如果你想设定文字大小为10px，那就定义0.625em (10/16 = 0.625);
若想要22px就定义1.375em (22/16=1.375).

一个流行的技巧是设置body元素的字体大小为62.5% (即默认大小16px的62.5%)，等于10px。现在你可以通过计算基准大小10px的倍数，在任何元素上方便的使用em单位。
这样有6px = 0.6em, 8px = 0.8em, 12px = 1.2em, 14px = 1.4em, 16px = 1.6em。

例如：

```css
body {
  font-size: 62.5%; /* font-size 1em = 10px */
}
p {
  font-size: 1.6em; /* 1.6em = 16px */
}
```


备注：

font-size属性的em和ex单位值相对于父元素的字体大小(不像其他属性,它们指的是相对当前元素的字体大小)。这意味对于font-size属性来说，em单位和百分比单位的作用是一样的。

### 文本颜色 color

**字符串颜色** 

可以使用如 red | green 等字符颜色声明

```css
color:red;
```

**使用十六进制网页颜色**
```css
color:#eeeeee
/*简写：color：#eee*/
```
如果颜色字符相同如 #dddddd 可以简写为 #ddd

**使用RGB颜色**
```css
color:rgb(38, 149, 162);
```

**透明颜色**

透明色从 0~1 间，表示透明到不透明

```css
color:rgba(38, 149, 162,.2);
```

### 行高定义
```css
div {
	line-height: 2em;
}
```

### 倾斜风格
```html
<style>
  span {
  	font-style: italic;  /*倾斜*/
  }
  em {
  	font-style: normal; /*正常*/
  }
</style>
...

<span>jc-sir.github.io</span>
<hr>
<em>baidu.com</em>
```

### 组合定义 font属性

font 属性可以用来作为 font-style, font-variant, font-weight, font-size, line-height 和 font-family 属性的简写，或将元素的字体设置为系统字体。

```css
p{font: 1.2em "Fira Sans", sans-serif;}
```

如果 font 字体相关的属性的简写：

- 必须包含以下值：
- <font-size>
- <font-family>
- 可以选择性包含以下值：
- <font-style> 
- <font-variant>
- <font-weight>
- <line-height>
- font-style, font-variant 和 font-weight 必须在 font-size 之前
- 在 CSS 2.1 中 font-variant 只可以是 normal 和 small-caps
- line-height 必须跟在 font-size 后面，由 "/" 分隔，例如 "16px/3"
- font-family 必须最后指定


## 文本样式

### 大小转换
1、大号小写字母

```html
<span>jc-sir.github.io</span>
```
```css
span {
	font-variant: small-caps;
}
```

2、字母大小写转换
```html
<style>
h2 {
  /* 首字母大小 */
  text-transform: capitalize;

  /* 全部大小 */
  text-transform: uppercase;

  /* 全部小写 */
  text-transform: lowercase;
  }
</style>
```

### 文本线条 text-decoration

```html
<a href="">jc-sir.github.io</a>
<hr>
<span class="underline">下划线</span>
<hr>
<span class="through">删除线</span>
<hr>
<span class="overline">上划线</span>
```

```css
a {
	text-decoration: none;
}
span.underline {
	text-decoration: underline;
}
span.through {
	text-decoration: line-through;
}
span.overline {
	text-decoration: overline;
}
```

### 文本阴影 text-shadow
参数顺序为：颜色，水平偏移，垂直偏移，模糊度。

```html
<style>
  h2 {
  	text-shadow: rgba(13, 6, 89, 0.8) 3px 3px 5px;
  }
</style>
<!------->
<h2>js-sir.github.io</h2>
```

### 文本空白处理
使用 ``white-space`` 控制文本空白显示。

| 选项     | 说明                                    |
|----------|-----------------------------------------|
| pre      | 保留文本中的所有空白，类似使用 pre 标签 |
| nowrap   | 禁止文本换行                            |
| pre-wrap | 保留空白，且保留换行符                  |
| pre-line | 空白合并，且保留换行符                  |

```html
h2 {
	white-space: pre;
	width: 100px;
	border: solid 1px #ddd;
}

<h2>jc-sir  .github       .io</h2>
```

### 文本溢出
1、溢出文本容器后换行处理

```css
h2 {
    width: 100px;
    overflow-wrap: break-word;
    border: solid 1px #ddd;
}
```

2、溢出添加 ``...`` ，需要将overflow 设置在 text-overflow 前面。

```css
h2 {
  width: 100px;
  border: solid 1px #ddd;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

## 段落控制 text-indent

### 文本缩进
```css
 p {
	  text-indent: 2em;
  }
```

### 水平对齐
使用 ``left|right|center`` 对文本进行对齐操作
 ```css
p {
   text-align:center;
}
 ```
 
 ### 垂直对其
 
 使用 vertical-align 用于定义内容的垂直对齐风格，包括``middle | baseline | sub | super ``等。
 
 ```css
 img {
	height: 50px;
	width: 50px;
	vertical-align: middle;
}
p{
    height: 100px;
    display: table-cell;
    vertical-align: middle;
    /*vertical-align: -20px;*/
}
```

### 字符间隔 letter-spacing

单词与字符间距

使用 ``word-spacing`` 与 ``letter-spacing`` 控制单词与字符间距。

```css
h2 {
	word-spacing: 2em;
	letter-spacing: 3em;
}
```

### 排版模式 writing-mode

| 模式          | 说明                                     |
|---------------|------------------------------------------|
| horizontal-tb | 水平方向自上而下的书写方式               |
| vertical-rl   | 垂直方向自右而左的书写方式               |
| vertical-lr   | 垂直方向内内容从上到下，水平方向从左到右 |


```css
div {
  height: 200px;
  border: solid 1px #ddd;
  writing-mode: vertical-rl;  
  /* 垂直方向自右而左的书写方式 */
}
```

