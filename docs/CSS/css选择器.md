# 选择器

样式是做用在元素标签上的，通过选择器将可以随意查找元素来应用样式。 :stuck_out_tongue_winking_eye:

## 基本选择器

选择器	| 示例	| 描述
---|---|---
.class | .intro | 选择 class="intro" 的所有元素
#id | #firstname|选择 id="firstname" 的所有元素
* | * |选择所有元素
element| p |选择所有元素
element,element | div,p | 选择所有``div``元素和所有``p``元素
element element	| div p | 选择``div``元素内部的所有``p``元素
element>element	| div>p	| 选择父元素为``div``元素的所有``p``元素
element+element	| div+p	| 选择紧接在``div``元素之后的所有``p``元素

### 标签选择器
根据标签为元素设置样式

```css
h1 {
	color: red;
}
```

### 类选择器
类选择器是为一类状态声明样式规则，下面是把文本居中定义为类样式。
```css
.text-center {
    text-align: center;
}
...

<h1 class="text-center">jc-sir.github.io</h1>
<h2 class="text-center">www.github.com</h2>
```

将类选择器指定为具体标签
```css
.help-block {
    background: red;
}

span.help-block {
    font-size: 12px;
    color: #aaa;
    background: none;
}

...
<span class="help-block">感谢访问jc-sir</span>
```

### ID选择器
为有 id 属性的元素设置样式
```css
#container {
    background: red;
}
...
<h1 id="container">jc-sir.github.io</h1>
```

> 文档中ID应该是唯一的，虽然为多个元素设置同一个ID也可以产生样式效果，但这是不符合规范的。
建议优先使用类选择器

## 结构选择器

### 后代选择器
HTML中元素是以父子级、兄弟关系存在的。后代选择器指元素后的元素（不只是子元素，是后代元素）。

```html
main article h2,main h1 {
    color: green;
}
...

<main>
	<article>
		<h2>jc-sir.github.io</h2>  <!-- green -->
		<aside>
			<h2>jc-sir.github.io</h2>
		</aside>
	</article>
	<h2>jc-sir.github.io</h2>
	<h1>jc-sir</h1>  /*green*/
</main>
```
### 子选择器 :clown_face:
子元素选择器中选择子元素，不包括孙级及以下元素。

```html
main article>h2 {
    color: green;
}
...

<main>
	<article>
		<h2>jc-sir.github.io</h2>  <!-- green -->
		<aside>
			<h2>jc-sir.github.io</h2>
		</aside>
	</article>
	<h2>jc-sir.github.io</h2>
	<h1>jc-sir</h1> 
</main>
```

### 紧邻兄弟元素

用于选择紧挨着的同级兄弟元素。

```html
main article+h2 {
    color: green;
}
...

<main>
	<article>
		<h2>jc-sir.github.io</h2>  
		<aside>
			<h2>jc-sir.github.io</h2>
		</aside>
	</article>
	<h2>jc-sir.github.io</h2>  <!-- green -->
	<h1>jc-sir</h1> 
	<h2>jc-sir.github.io</h2>  <!-- 非紧邻 -->
</main>
```

### 后面兄弟元素
用于选择后面的所有兄弟元素。

```html
main article~* {
    color: green;
}
...

<main>
	<article>
		<h2>jc-sir.github.io</h2>
		<aside>
			<h2>jc-sir.github.io</h2>
		</aside>
	</article>
	<h2>jc-sir.github.io</h2>  <!-- green -->
	<h1>jc-sir</h1>   <!-- green -->
</main>
```

## 属性选择器
根据属性来为元素设置样式

选择器 | 示例 | 描述
---|---|---
[attribute] | [target] | 选择带有 target 属性所有元素
[attribute=value] | [target=_blank]	| 选择 title 属性包含单词 "flower" 的所有元素
[attribute~=value] | [title~=flower] | 选择 title 属性包含单词 "flower" 的所有元素
[attribute\|=value] | [lang\|=en] | 选择 lang 属性值以 "en" 开头的所有元素。
[attribute*=value] | a[src*="abc"] | 选择其 src 属性中包含 "abc" 子串的每个 元素
[attribute^=value] | a[src^="https"] | 选择其 src 属性值以 "https" 开头的每个 元素
[attribute$=value] | a[src$=".pdf"] | 选择其 src 属性以 ".pdf" 结尾的所有 元素


 为具有 class 属性的h1标签设置样式 h1[class] { color: red; } ...
```html
<h1 class="container">jc-sir.github.io</h1>
h1[class] { color: red}
```
约束多个属性 

```html
<h1 class="container" id>jc-sir.github.io</h1>

h1[class][id] { color: red; }
```

具体属性值设置样式

```html
<a href="https://www.jc-sir.github.io">jc-sir</a>
<a href="">百度</a>
a[href="https://jc-sir.github.io"] { color: green; } 
```

``^`` 以指定值开头的元素

```html
h2[name^="baidu"] {
    color: red;
}
...

<h2 name="jc-sir">jc-sir.github.io</h2>
<h2 name="baidu.com">baidu.com</h2>
```

$ 以指定值结尾的元素

```html
<h2 name="baidu">baidu.com</h2>
<h2 name="baidu.com">baidu.com</h2>
...

h2[name$="com"] {
    color: red;
}
```

``*``属性内部任何位置出现值的元素

只要在属性中找到对应的字符串都能起作用

```html
h2[name*="baidu"] {
    color: red;
}
...
<!--都会变红-->
<h2 name="baidu">baidu.com</h2>
<h2 name="baidu.com">jc-sir.com</h2>
<h2 name="js-baidu.com">jc-sir.com</h2>
```

``~`` 属性值中包含指定词汇的元素

```html
h2[name~="baidu"] {
    color: red;
}
...
<h2 name="baidu">百度.com</h2>
<h2 name="baidu web">baidu.com</h2>
<h2 name="baidu1 web">baidu.com</h2> <!--不变-->
```


``|`` 以指定值开头或以属性连接破折号的元素

```html
h2[name|="baidu"] {
    color: red;
}
...
<!--都变-->
<h2 name="baidu">baidu.com</h2>
<h2 name="baidu-web">baidu.com</h2>
```

## 伪类选择器

为元素的不同状态或不确定存在的元素设置样式规则。
状态|	示例|	说明
--- |---|---
:link|	a:link|	选择所有未被访问的链接
:visited|	a:visited|	选择所有已被访问的链接
:hover|	a:hover|	鼠标移动到元素上时
:active|	a:active|	点击正在发生时
:focus	|input::focus|	选择获得焦点的 input 元素
:root	|:root|	选择文档的根元素即html。
:empty|	p:empty	|选择没有子元素的每个元素（包括文本节点）。
:first-child	|p:first-child	|选择属于父元素的第一个子元素的每个元素
:last-child|	p:last-child|	选择属于其父元素最后一个子元素每个元素。
:first-of-type	|p:first-of-type|	选择属于其父元素的首个元素的每个元素
:last-of-type|	p:last-of-type|	选择属于其父元素的最后元素的每个元素。
:only-of-type|	p:only-of-type|	选择属于其父元素唯一的元素的每个元素。
:only-child|	p:only-child|	选择属于其父元素的唯一子元素的每个元素。
:nth-child(n)|	p:nth-child(2)	|选择属于其父元素的第二个子元素的每个元素。
:nth-child(odd)|	p:nth-child(odd)|	选择属于其父元素的奇数元素。
:nth-child(even)|	p:nth-child(even)	|选择属于其父元素的偶数元素。
:nth-of-type(n)|	p:nth-of-type(2)|	选择属于其父元素第二个元素的每个元素。
:nth-last-child(n)	|p:nth-last-child(2)|	同上，从最后一个子元素开始计数。
:nth-last-of-type(n)|	p:nth-last-of-type(2)	|同上，但是从最后一个子元素开始计。
:not(selector)	|:not(p)|	选择非元素的每个元素

### 超链接伪类

```html
<a href="jc-sirgithub.io">jc-sir</a>
```
```css
a:link {
    color: red
}

a:visited {
    color: green
}

a:hover {
    color: blue
}

a:active {
    color: yellow
}
```

### :target

用于控制具有锚点目标元素的样式

```html
<a href="#baidu">baidu</a>
<div></div>
<div id="baidu">
	百度搜索
</div>
```
```css
div {
	height: 900px;
}

div:target {
	color: red;
}
```

### :root
根元素选择伪类即选择html


```css
:root {
    font-size: 100px;
}
/*=>等同*/
html{
    font-size: 100px;
}
```

### :empty
没有内容和空白的元素。下面第一个p标签会产生样式，第二个不会因为有空白内容

```html
:empty {
    border: solid 2px red;
}
...

<p></p>
<p> </p>
```

## 结构伪类

### :first-child
选择元素中``span ``标签并且 **是第一个元素**
```html
<article>
    <span>jc-sir,github.io</span> <!--red-->
    <aside>
        <span>baidu.com</span>  <!--red-->
        <span>sina.com</span>  
        <div>
            <span>alibaba.com</span>  <!--red-->
            <span>test.com</span> 
        </div>
    </aside>
</article>
```
```css
article span:first-child {
    color: red;
}
```

### :first-of-type
选择类型是 ``span`` 的第一个元素

```html
<article>
	<span>jc-sir.github.io</span>
	<aside>
		<strong>baidu.com</strong>
		<span>jc-sir.github.io</span>
	</aside>
</article>
```
```css
article span:first-of-type {
    color: red;
}
```

### :last-child
选择元素中/标签并且是最后一个。

用法和first-child相同
### :last-of-type
选择类型为【某选择器/标签】的最后一个元素

用法和first-of-type相同


### :only-child
```html
<article>
    <span>jc-sir.github.io</span>
    <aside>
        <span>baidu.com</span>
        <!--green-->
    </aside>
</article>
```
```css
 article span:only-child {
    color: green;
}
```
### :only-of-type
选择 ``同级中`` 类型是 [某选择器/元素] 的唯一子元素

选择同级中类型是span 的唯一子元素

```html
<article>
    <span>baidu.com</span>
    <!-- red -->
    <aside>
        <span>jc-sir.github.io</span>
        <span>baidu.com</span>
    </aside>
</article>
```

```css
article span:only-of-type {
    color: red;
}
```

### :nth-child(n)
示例：选择第2个元素并且是span标签的
```html
<article>
    <span>sina.com</span>
    <aside>
        <span>baidu.com</span>
        <span>biyin.com</span>  <!-- red -->            
    </aside>
    <span>jc-sir.github.io</span>
</article>
```

```css
article span:nth-child(2) {
    color: red;
}
```

### :nth-last-child(n)
从最后开始选择

用法同上

### :nth-of-type(n)
选择同级元素的第n个 ``某`` 元素  不论中间有哪些元素
```html
<article>
    <span>tencent.com</span>
    <aside>
        <span>jc-sir.github.io</span>
        <span>sina.com</span>  <!-- red -->
    </aside>
    <span>baidu.com</span>  <!-- red -->
</article>
```

```css
article span:nth-of-child(2) {
    color: red;
}
```

### :nth-of-type(n)

从最后开选择

用法同上

### 计算选择数量 :heart_eyes:
```html
<table border="1">
    <tr>
        <td>第一列😍</td>
        <td>第二列😗</td>
        <td>第三列😋</td>
        <td>第四列🤑</td>
        <td>第五列🤓</td>
    </tr>
    <tr>
        <td>第一列</td>
        <td>第二列</td>
        <td>第三列</td>
        <td>第四列</td>
        <td>第五列</td>
    </tr>
    <tr>
        <td>第一列😍</td>
        <td>第二列😗</td>
        <td>第三列😋</td>
        <td>第四列🤑</td>
        <td>第五列🤓</td>
    </tr>
</table>
```
n为0/1/2/3... ，下面是隔列变色/隔行变色
```css
table tr>td:nth-child(2n+1) {
    background: green;
    color: white;
}

table tr:nth-child(2n+1) {
    background: yellow;
    color: green;
}
```
从第三个开始设置样式
```css
table tr:nth-child(n+3) {
    background: rgb(128, 35, 2);
    color: white;
}
```

设置前三个元素 

示例：前三列
```css
table tr>td:nth-child(-n+3) {
    background: rgb(128, 35, 2);
    color: white;
}
```

### 奇数元素 (odd)

设置基数行样式  等同于 2n+1
```css
table tr:nth-child(odd) {
    background: green;
    color: white;
}
```

### 偶数元素 (even)
even

设置偶数行样式  等同于 2n
```css
table tr>td:nth-child(even) {
    background: green;
    color: white;
}
```

### :not(selector)
不选择某个元素

示例：排除第一个li元素
```html
<ul>
  <li>baidu.com</li>
  <li>jc-sir.github.io</li>
  <li>jc-sir</li>
</ul>
```
```css
ul li:not(:nth-child(1)) {
    background: red;
}

<!--等同-->

ul li:nth-child(n+2) {
    background: red;
}
```
## 字符伪类

### 首字符大写
```html
<p>Replace the stars and rivers in the body with unlimited methods for the future.</p>
```

```css
p::first-letter{
    font-size:30px
}
```

### 段落首行处理

```css
p::first-line{
    color:red;
    font-size:25px;
}
```
### ::before & ::after

:smirk:

```css
span::before {
    content: '⇰';
    color: red;
}
span::after {
    content: '⟲';
    color: green;
}
```
### 添加属性中的内容
```html
<h2 title="博客地址:">jc-sir.githuhb.io</h2>
```

```css
h2::before {
	content: attr(title);
}
<!--显示为 博客地址:jc-sir.githuhb.io-->
```

## 权重问题

元素会被多个样式一层层作用，这就是层叠样式表的来源。如果多个样式做用在元素上就会产生优先级权重问题

- 相同权重的规则应用最后出现的 [覆盖]
- 可以使用`` !important ``强制提升某个规则的权限

优先级逐级增加的选择器列表：

1、通用选择器

2、元素（类型）选择器

3、类选择器

4、属性选择器

5、伪类

6、ID 选择器

7、内联样式

### 强制优先级

有时在规则冲突时，为了让某个规则强制有效可以使用 ``!important``。

```css
  h2 {
 	 color: red !important;
  }
  h2 {
 	 color: green;
  }

<h2>jc-sir</h2>
```

两条规则权限一样，默认应用第二个规则，但第一个规则使用了!important 提升了权限，所以被应用