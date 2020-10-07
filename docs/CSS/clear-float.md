# CSS清除浮动的三种方法

## 先上一个简单的例子

![简单的例子](http://upload-images.jianshu.io/upload_images/4337988-6a161d22dcba3ef4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**如图所示,图片被添加了float:left属性,实现了文字环绕效果.但是再给div加了border之后,我们发现图片并没有被包起来,也就是图片浮上来了一层,那么怎么解决这种情况,包住图片呢?**

下面将介绍三种清除浮动的方法：

[跟着试一试?](http://js.jirengu.com/rino/4/edit?html,output)

## 给空div加clear

在div元素的最后,加一个空div,并且加上clear属性,和绿色border(border大法好!).
`<div style="clear: left; border: 4px solid green"></div>`

![空div](http://upload-images.jianshu.io/upload_images/4337988-f792d7ba9501d188.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们发现绿色的空div把红色div的下边压到了图片以下,达到了我们清除浮动的效果.
clear: left在这里的意思是:有此样式的元素盒的左边不可以有浮动的元素.

[clear元素不明白点这里](http://www.ayqy.net/doc/css2-1/visuren.html## propdef-clear)

## 使用伪类
和第一种方法的原理是一样的,只不过这次不需要每次清除浮动的时候都写一遍代码.
用伪类声明一个css属性,需要清除浮动的元素,加上就可以实现了,绿色环保.
在css中写入：
```css
  .clearfix::after{
    content:'';
    border: 4px solid green;
    clear: both;
    display: block;
  }
```
然后在最外层div上加上clearfix类就可以实现了

![伪类实现](http://upload-images.jianshu.io/upload_images/4337988-5cf4dd72227ec268.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## overflow: hidden清除浮动
给父元素加上overflow: hidden属性.

![overflow: hidden](http://upload-images.jianshu.io/upload_images/4337988-94db81bb9b3333ae.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

overflow: hidden 的意思是超出的部分要裁切隐藏掉,那么为什么会有清除浮动的效果呢?因为父元素没有声明高度,所以要把父元素中所有的元素高度计算出来,才能根据所计算的高度,超出高度的将被裁掉.
我们试试给父元素加一个100px的高度:

![图片就被剪裁了](http://upload-images.jianshu.io/upload_images/4337988-978a6893d3ea0615.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**所以此方法是有适用范围的,父元素的高度必须是auto,否则将不生效!**

