# 背景处理

- background-color  设置元素的背景颜色
- background-image  设置元素的背景颜色
- background-size
- background-origin
- background-clip
- background-position  设置元素的背景图片的起始位置
- background-attachment 设置元素的背景图片的显示方式  scroll | fixed
- background-repeat 设置元素的背景图片的重复方式
- background  简写属性，作用是将背景属性设置在一个声明中。

## 背景样式

### 背景颜色
背景颜色可以使用 rga | rgba | 十六进制 等颜色格式

```css
div{
    background-color: red;
    background-color: rgb(150,155,120);
    background-color: rgba(150,155,120,0.2);
}
```

### 背景图片
可以使用 png| gif |jpeg 等图片做为背景使用

```
background-image: url(xxx.jpg);
```

### 背景裁切
选项 | 说明
---|---
border-box | 包括边框
padding-box | 不含边框，包括内边距
content-box | 内容区域

```
background-clip: border-box;
```

### 背景重复
用于设置背景重复的规则

选项 | 说明
---|---
repeat | 水平、垂直重复
repeat-x | 水平重复
repeat-y | 垂直重复
no-repeat | 不重复
space | 背景图片对称均匀分布
round | 随着允许的空间在尺寸上的增长, 被重复的图像将会伸展(没有空隙)


单值语法是完整的双值语法的简写:

单值 | 等价于双值
---|---
repeat-x | repeat no-repeat
repeat-y | no-repeat repeat
repeat | repeat repeat
space | space space
round | round round
no-repeat	no-repeat no-repeat

```
background-repeat: repeat-y
```

### 背景滚动

用于设置在页面滚动时的图片处理方式

选项 | 说明
---|---
scroll | 背景滚动
fixed | 背景固定
local | 背景相对于元素的内容固定

```css
div{
    background-attachment: fixed;
}
```

### 背景位置
用于设置背景图片的水平、垂直定位。

选项 | 说明
---|---
left | 左对齐
right | 右对齐
center | 居中对齐
top | 顶端对齐
bottom | 底部对齐

**背景局中**
```css
background-position: center;
/*或*/
background-position: 50% 50%;
```

**水平居右，垂直居中**
```css
background-position: right center;
/*或*/
background-position: 100% 50%;
```

**使用具体数值定义**
```css
background-position: 100px 100px;
/*也支持使用负值*/
background-position: -200px 100px;
```

### 背景尺寸
选项 | 说明
---|---
cover | 背景完全覆盖，可能会有背景溢出
contain | 图片不溢出的放在容器中，可能会漏出部分区域

指定数值定义宽高尺寸 (百分比或者具体数值)

```css
background-size: 50% 100%;
/*或*/
background-size: 200px 200px;
```

宽度固定高度自动
```
background-size: 50% auto;
```

### 多个背景
**后定义的背景置于底层**

```
background-image: url(a.png), url(b.png);
background-repeat: no-repeat;
background-position: top left, right bottom;
```

**可以一次定义多个背景图片。**
```
background: url(a.png) left 50% no-repeat,
            url(b.png) right 100% no-repeat red;
```

### box-shadow

box-shadow:
参数 | 参数说明|参数描述
---|---|---
h-shadow  |水平阴影的位置 | 正右负左
v-shadow  |垂直阴影的位置 | 正下负上
blur      |阴影模糊半径 | 只能>=0
spread    |阴影扩散半径 | 可取正负
color     |阴影的颜色 | rgb/rgba/16进制/颜色字符串（red...）
insert    |阴影开始方向|默认是从里往外，设置inset就是从外往里;

              
水平阴影   垂直阴影   模糊   阴影尺寸  颜色  阴影转到内阴影 

[Box-shadow 生成器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Box-shadow_generator)


## CSS渐变
CSS3 渐变（gradients）可以让你在两个或多个指定的颜色之间显示平稳的过渡。
### 线性渐变
**渐变一般用在背景颜色中使用**
```
background: linear-gradient(red, green);
```

**渐变角度**
```
background: linear-gradient(30deg, red, green);
```

**向右渐变**

```
background: linear-gradient(to right, red, green);

background: linear-gradient(90deg, red, green);
```


**向左渐变**

```
background: linear-gradient(to left, red, green);

background: linear-gradient(-90deg, red, green);
```

**右下到左上渐变**
```
background: linear-gradient(to top left, red, green);

background: linear-gradient(45deg, red, green);
```

**左上到右下渐变**
```
background: linear-gradient(to right bottom, red, green);

background: linear-gradient(135deg, red, green);
```
**设置多个渐变颜色**
```
background: linear-gradient(red, rgb(0, 0, 200), green, rgba(122, 211, 100, 0));
```

### 径向渐变

**radial-gradient**

语法
```
background-image: radial-gradient(shape size at position, start-color, ..., last-color);
```

**设置渐变宽度与高度**
```
background: radial-gradient(100px 200px, red, blue, green);
```
**左下渐变**
```
background: radial-gradient(at bottom left, red, blue);
```
**右下渐变**
```
background: radial-gradient(at bottom right, red, blue);
```
**左侧向中心渐变**
```
background: radial-gradient(at center left, red, blue);
```
**底部向中心渐变**
```
background: radial-gradient(at 50% 100%, red, blue);
```

### 标识位
颜色未指定标识时，颜色会平均分布。

```css
#gradient {
  background-image: radial-gradient(red, yellow, green);
}
```
径向标识位绘制小太阳
```
width: 150px;
height: 150px;
background: radial-gradient(red 0, yellow 30%, black 60%, black 100%);
```
标识位通过在两个颜色间中间点定义过渡位置

```
background: linear-gradient(45deg, red, 50%, blue);
```

### 线性渐变重复
```
background: repeating-linear-gradient(90deg, blue, 25px, yellow 25px, 25px, red 50px);
```

### 径变重复

```
background: repeating-radial-gradient(100px 100px, red 0%, yellow 40%, black 60%, black 200%);
```
