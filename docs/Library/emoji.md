# 如何在你的项目中引入emoji😀

最近在做我们学校的[表白墙网站](https://hubingliang.github.io/Confession-wall/dist/)，在做到评论功能的时候自然而然就想到了emoji-😏。
于是就去搜了一些这方面的资料，发现了比较好的三个emoji库：

- [emojione](https://github.com/emojione/emojione)（第一个开源且完整的emoji网站，编码方面100%免费，且与项目有非常好的整合性）
- [Twemoji](https://github.com/twitter/twemoji) (完全免费，简单小巧，API相比emojione较少。)
- [Twemoji Awesome](http://ellekasai.github.io/twemoji-awesome/) (Twemoji社区的项目，纯css显示emoji)

综合考虑最后选择了emojione来实现，因为API比较多而且文档十分友好。

## 引入emojione

- 通过外链
```html
<script src="https://cdn.jsdelivr.net/npm/emojione@3.1.2/lib/js/emojione.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/emojione@3.1.2/extras/css/emojione.min.css"/>
```
- NPM
```
> npm install emojione
```

## 生成emoji选择界面
![](http://upload-images.jianshu.io/upload_images/4337988-ef3ae78893a558c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

首先我们需要这些emoji的图片，随即我就去[emojione](https://www.emojione.com/developers/download)官网下载了32×32px的PNG图片，可是之后我发现图片太多不可能让我一个一个引入吧！

![](http://upload-images.jianshu.io/upload_images/4337988-21d1a6f7e13a2288.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

转变思路，去看emojione的[文档](https://github.com/emojione/emojione)，发现了一个提供API演示功能的[emojione实验室](https://demos.emojione.com/latest/index.html## extras)。

实验室中有一个API可以把HTML中的unicode 转换为图片：[.unicodeToImage(str)](https://demos.emojione.com/latest/jsunicodetoimage.html)

![](http://upload-images.jianshu.io/upload_images/4337988-baca09028eec4ae2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

于是我用JS Bin 做了一个小[demo](http://js.jirengu.com/vupel/2/edit)测试了一下,发现没有什么问题。

![](http://upload-images.jianshu.io/upload_images/4337988-2650383b4132fa9d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

OK，那么我们就可以通过这个API批量生成emoji的图片了，可是emoji的Unicode码去哪找呢？
官方提供了一个Unicode复制粘贴的网站：[emojiCOPY](https://www.emojicopy.com/)

![](http://upload-images.jianshu.io/upload_images/4337988-a391a9796b5010fd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

选中想要的emoji，之后点击COPY就可以复制下来，然后再粘贴到刚才的JS Bin之中就可以批量生成图片了：

![](http://upload-images.jianshu.io/upload_images/4337988-9f47be5f280a88f1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

之后把这些图片的HTML直接复制到我们的项目之中：

![](http://upload-images.jianshu.io/upload_images/4337988-45fb81e4f83df1d4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

让人惊喜的是这些生成的img的alt是Unicode，这让input显示和用户点击同步也变得简单了。

![](http://upload-images.jianshu.io/upload_images/4337988-19fd42f9cf8aa49b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接下来只需要写很简单的JS就可以实现了：
```js
$('.emoji').children().click((emoji)=> {
    comment = comment + ' ' + emoji.target.alt　+　' '
})
```

![](http://upload-images.jianshu.io/upload_images/4337988-c0ae294af0d711b5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![](http://upload-images.jianshu.io/upload_images/4337988-64fbd4090a322e38.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




