# 搞懂Z-index的所有细节
![用Z-index来改变堆叠顺序](http://upload-images.jianshu.io/upload_images/4337988-72fc3279283f3d96.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

[Z-index测试网站](http://www.cssmojo.com/extras/everything_you_always_wanted_to_know_about_z-index_but_were_afraid_to_ask/)
## z-index 在什么情况下才生效？
Z-index的运用是需要条件的,与其相关的属性就是position属性。我们以三个div来举例子。

- position: static;

当三个div的position都为static时,我们把div(A)的Z-index设置为15, 把div(B)的Z-index设置为10,把div(C)的Z-index设置为5。

![](http://upload-images.jianshu.io/upload_images/4337988-dc45d7a26386344b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**发现div(B)依然把div(A)的一部分挡住了,所以当position为static时,Z-index起不到任何改变堆叠的作用。**

- position: relative/absolute/fixed;

当三个div的position都为relative/absolute/fixed时,发现Z-index生效。
![](http://upload-images.jianshu.io/upload_images/4337988-b3b78915180bd5e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

**总结: 只有position的值为relative/absolute/fixed中的一个,Z-index才会生效。**

## z-index值越大元素越靠前，对吗？
我们现在div(A)和div(B)中再分别创建一个小的div(c)和div(d)

![这一张图就是一个特例](http://upload-images.jianshu.io/upload_images/4337988-8330fa3e640fe19e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我们观察到,div(a)的Z-index为20 可是为什么还会被Z-index仅仅为10的div(B)遮挡住呢?
难道是因为Z-index继承给他的子元素了吗?不Z-index可是不继承给它的子元素的。
我们试试把biv(A)的Z-index设置成auto

![](http://upload-images.jianshu.io/upload_images/4337988-e92ccbadb3ad1561.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

div(a)成功的遮挡住了Z-index比他小的元素。

再试试只把div(a)设置为auto

![Paste_Image.png](http://upload-images.jianshu.io/upload_images/4337988-e4724db7e354c034.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 总结: 
1. 当Z-index的值设置为auto时,不建立新的堆叠上下文,当前堆叠上下文中生成的div的堆叠级别与其父项的框相同。
2. 当Z-index的值设置为一个整数时,该整数是当前堆叠上下文中生成的div的堆栈级别。该框还建立了其堆栈级别的本地堆叠上下文。这意味着后代的z-index不与此元素之外的元素的z-index进行比较。

ps: 通俗讲就是,当一个div的Z-index为整数时,它的子元素和外界元素进行比较时,采用父元素的Z-index进行比较, 和兄弟元素比较采用自身的Z-index。当一个div的Z-index为auto时,如果它和它的兄弟进行比较,采用它父元素的Z-index。

## z-index 不设置和设置为0有什么区别?

如果不设置Z-index那么默认值为auto,则不建立层叠上下文。设置为0则会脱离文档流,建立层叠上下文。
![文档流Z轴](http://upload-images.jianshu.io/upload_images/4337988-da32ea3f63d9b3c2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)