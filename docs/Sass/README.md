# sass入门
## sass变量
使用 `$` 符号来标识变量
### 变量声明
sass变量的声明和css属性的声明很像
```scss
$highlight-color: #F90;
```

::: tip [提示]
- 任何可以用作css属性值的赋值都 可以用作sass的变量值
- 以空格分割的多个属性值，如$basic-border: 1px solid black;
- 以逗号分割的多个属性值;
- 变量可以在css规则块定义之外存在。当变量定义在css规则块内，那么该变量只能在此规则块内使用。
- 引用变量变量才生效
::: 

```scss
$nav-color: #F90; /*全局使用*/
nav {
  $width: 100px;   /*该width变量仅仅在该作用域内使用*/
  width: $width;
  color: $nav-color;
}
/* 编译后 */
nav {
  width: 100px;
  color: #F90;
}
```

### 变量引用
**凡是css属性的标准值可存在的地方，变量就可以使用**
```scss
$highlight-color: #F90;
.selected {
  border: 1px solid $highlight-color;
}
//编译后
.selected {
  border: 1px solid #F90;
}
```

**变量值也可以引用其他变量**
```scss
$highlight-color: #F90;
$highlight-border: 1px solid $highlight-color;
.selected {
  border: $highlight-border;
}
//编译后
.selected {
  border: 1px solid #F90;
}
```
### 变量名
- sass的变量名可以与css中的属性名和选择器名称相同，包括中划线和下划线。
- 用中划线声明的变量可以使用下划线的方式引用 反之亦然。
```scss
$link-color: red;
a {
  color: $link_color;
}
//编译后
a {
  color: red;
}
```
::: tip
- 上例 $link-color和$link_color其实指向的是同一个变量
- 在sass的大 多数地方，中划线命名的内容和下划线命名的内容是互通的
- 除了变量，也包括对混合器和Sass函数的命名
- 但是在sass中纯css部分不互通，比如类名、ID或属性名。
:::

## sass嵌套
### 简单嵌套
- 在Sass中，你可以像俄罗斯套娃那样在规则块中嵌套规则块。
- sass在输出css时会帮你把这些嵌套规则处理好，避免重复书写。
```scss
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}
 /* 编译后 */
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content aside { background-color: #EEE }
```

::: danger [注意]
大多数情况下简单的嵌套都没问题，但是有些场景下不行，比如要在嵌套的选择器 里边立刻应用一个类似于 :hover的伪类。为了解决这种以及其他情况, sass提供了一个特殊结构 `&`。
:::

### 父选择器的标识符&
::: tip [提示]
- 父级选择器中需要注意，只能在嵌套内部使用父级选择器，否则SCSS找不到父级元素会直接报错。 
- 在各种伪类选择器中，父级选择器是十分常用的。
:::

代码示例
```scss
article a {
  color: blue;
  &:hover { color: red }
}
// 编译后
article a { color: blue }
article a:hover { color: red }
```

### 群组选择器的嵌套
```scss
.container {
  h1, h2, h3 {margin-bottom: .8em}
}
nav, aside {
  a {color: blue}
}
// 编译后
.container h1, .container h2, .container h3 { margin-bottom: .8em }
nav a, aside a {color: blue}
```

### 嵌套组合选择器
**子组合选择器和同层组合选择器 `>`、 `+` 和 `~`**
::: danger [注意]
这三个组合选择器必须和其他选择器配合使用，以指定浏览器仅选择某种特定上下文中的元素。
:::

#### 子组合选择器 >
子组合选择器 `>` 选择一个元素的直接子元素
```scss
article section { margin: 5px }
// 会选择article下的所有命中section选择器的元素

article > section { border: 1px solid #ccc }
// 只会选择article下紧跟着的子元素中命中section选择器的元素
```
#### 相邻组合选择器 +
同层[兄弟元素]相邻组合选择器`+`选择**header元素后紧跟的**`p`元素
```scss
header + p { font-size: 1.1em }
```
#### 同层全体组合选择器 ~
同层全体组合选择器`~`,选择所有跟在article后的同层article元素,不管它们之间隔了多少其他元素。
::: tip [提示]
可以把它们放在外层选择器后边,或里层选择器前边。
::: 
```scss
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}
// 编译后
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```

### 嵌套属性
嵌套属性的规则: 把属性名从中划线`-`的地方断开,在根属性后边添加一个冒号`:`，紧跟一个`{ }`块，
把子属性部分写在这个{ }块中。
```scss
nav {
  border: {
    style: solid;
    width: 1px;
    color: #ccc;
  }
}

nav {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}
```

## 导入SASS文件
- `css`有一个特别不常用的特性,即`@import`规则，它允许在一个css文件中导入其他css文件。
::: danger [提示]
只有执行到`@import`时,浏览器才会去下载其他css文件,这导致页面加载起来特别慢。
::: 
- `sass`的`@import`规则：在生成css文件时就把相关文件导入进来。这意味着所有相关的样式被归纳到了同一个css文件中，而**无需发起额外的下载请求**。
- 使用`sass`的`@import`规则并不需要指明被导入文件的全名。可以省略.sass或.scss文件后缀


### 默认变量值
**一般情况下，反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值。**
```scss
$link-color: blue;
$link-color: red;
a {
    color: $link-color;
}
```
**如果这个变量被声明赋值了，那就用它声明的值，否则就用这个默认值。**
::: danger [注意]
`!default`只能使用与变量中
:::
```scss
/*App1.scss*/
$border-color:#aaa; //声明变量
@import App2.scss; 
.container {
    border:1px solid $border-color; //使用变量
}
/*App2.scss*/
$border-color:#ccc; //声明变量

/*编译后的结果*/
.container {
    border:1px solid #ccc; 
}
// -----------------------------------------
/*App1.scss*/
$border-color:#aaa; //声明变量
@import App2.scss;  
.container {
    border:1px solid $border-color; 
}
/*App2.scss*/
$border-color:#ccc !default; //声明变量

/*编译后的结果*/
.container {
    border:1px solid #aaa;
}
```
### 嵌套导入
```scss
// _blue-theme.scss
aside {
  background: blue;
  color: white;
}
```

```scss
.blue-theme {@import "blue-theme"}
// 编译后
.blue-theme {
  aside {
    background: blue;
    color: #fff;
  }
}
```
### 原生的CSS导入
- sass兼容原生的css
- 支持原生的CSS@import
- 因为sass的语法完全兼容css，所以你可以把原始的css文件改名为`.scss`后缀，即可直接导入了。

::: danger [注意]
下列三种情况下会生成原生的CSS@import
:::

- 被导入文件的名字以.css结尾；
- 被导入文件的名字是一个URL地址(比如http://www.jc-sir.github.io/css/style.css)
- 被导入文件的名字是CSS的url()值。

### Sass注释
**SCSS中的注释有两种**
- /*注释*/ :这种注释会被保留到编译后的css文件中。
- //注释   :这种注释不会被保留到编译后生成的css文件中。

## 混合器（函数）    
**有重复的代码片段都可以考虑使用混合器将他们提取出来复用。**
```scss
// 不传参数
// 添加跨浏览器的圆角边框。
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
// 使用
h1{
  @include rounded-corners;
}
```
### 给混合器传参
**混合器并不一定总得生成相同的样式。可以通过在@include混合器时给混合器传参**
```scss
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
// 使用
a {
  @include link-colors(blue, red, green);
}
// 编译后
a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```
sass允许通过语法`$name: value`的形式指定每个参数的值。不用管参数顺序，不能漏参

```scss
a {
    @include link-colors(
      $normal: blue,
      $visited: green,
      $hover: red
  );
}
```
### 默认参数值
```scss
@mixin set-border-radius($border-radius:5px,$color:red){
    border-radius: $border-radius;
    color:$color;
}
// 调用：
@include set-border-radius(3px) 
```
::: tip
混合器中可以写一切scss代码。
:::

## sass继承
一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。通常会在 HTML 中给元素定义两个 class，一个通用样式，一个特殊样式。
