# Hexo已经看腻了，来试试VuePress搭建个人博客

![](https://user-gold-cdn.xitu.io/2018/4/23/162f21a0e09d9fd3?w=600&h=600&f=png&s=160672)

## VuePress
先简单介绍一下VuePress，这是尤大在2018年4月份发布的一个新轮子。

![](https://user-gold-cdn.xitu.io/2018/4/23/162f21add3603e86?w=751&h=418&f=png&s=63447)

一个基于 Vue SSR 的静态站生成器，本来的目的是爽爽的写文档，但是我发现用来撸一个人博客也非常不错。

**[这是VuePress的官方文档](https://vuepress.vuejs.org/)**
**[这是VuePress的中文文档](https://vuepress.docschina.org/)**
## 上手搭建
你可以跟着文档上的例子自己玩一玩，不过由于VuePress的文档也是用VuePress来实现的，所以我取巧直接拿[VuePress仓库](https://github.com/vuejs/vuepress)中的**docs**目录拿来玩耍。
1. 首先安装VuePress到全局
```bash
npm install -g vuepress
```
2. 然后把VuePress仓库克隆到你的电脑
```bash
git clone git@github.com:docschina/vuepress.git
```
3. 在docs文件中执行（请确保你的 Node.js 版本 >= 8）
```bash
cd vuepress
cd docs
vuepress dev
```
当你看到这一行就说明已经成功了：
```
 VuePress dev server listening at http://localhost:8080/
```
下面我们打开[http://localhost:8080/](http://localhost:8080/)
发现真的打开了vuepress文档：
![](https://user-gold-cdn.xitu.io/2018/4/23/162f21a0e0944215?w=1240&h=520&f=png&s=69295)

下面的工作就是数据的替换了，但我们应该先看一下docs的目录结构：
```
├─.vuepress
│  ├─components
│  └─public
│      └─icons
│   └─config.js // 配置文件
├─config // Vuepress文档的配置参考内容
├─default-theme-config // Vuepress文档的默认主题配置内容
├─guide // Vuepress文档的指南内容
└─zh // 中文文档目录
    ├─config
    ├─default-theme-config
    └─guide
└─README.md // 首页配置文件
```
文档分成了两部分，中文文档在/zh/目录下，英文文档在根目录下。

其实目录里面的东西都挺好看懂的，首先guide 、default-theme-config、config 这三个目录中的都是Vuepress文档的主要内容，从中文文档里也可以看到只有这三个目录被替换了。
## 首页配置
默认主题提供了一个主页布局，要使用它，需要在你的根目录 `README.md` 的 [YAML front matter](https://vuepress.docschina.org/guide/markdown.html#yaml-front-matter) 中指定 `home：true`，并加上一些其他的元数据。

我们先看看根目录下的README,md：
```
home: true // 是否使用Vuepress默认主题
heroImage: /hero.png // 首页的图片
actionText: Get Started →  // 按钮的文字
actionLink: /guide/ // 按钮跳转的目录
features: // 首页三个特性
- title: Simplicity First
  details: Minimal setup with markdown-centered project structure helps you focus on writing.
- title: Vue-Powered
  details: Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.
- title: Performant
  details: VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.
footer: MIT Licensed | Copyright © 2018-present Evan You // 页尾
```
实在看不懂，[官网](https://vuepress.docschina.org/default-theme-config/)有比我更详细的配置说明。
## 导航配置
导航配置文件在`.vuepress/config.js`中


在导航配置文件中nav是控制导航栏链接的，你可以把它改成自己的博客目录。
```js
nav: [
    {
        text: 'Guide',
        link: '/guide/',
    },
    {
        text: 'Config Reference',
        link: '/config/'
    },
    {
        text: 'Default Theme Config',
        link: '/default-theme-config/'
    }
]
```
剩下的默认主题配置官方文档都有很详细的文档说明这里就不在啰嗦了。
## 更改默认主题色
你可以在`.vuepress/`目录下创建一个`override.styl`文件。
vuepress提供四个可更改的颜色：
```
$accentColor = #3eaf7c // 主题色
$textColor = #2c3e50 // 文字颜色
$borderColor = #eaecef // 边框颜色
$codeBgColor = #282c34 // 代码背景颜色
```

我把它改成了这样：
![](https://user-gold-cdn.xitu.io/2018/4/23/162f21a0e07ec947?w=1240&h=698&f=png&s=138334)
## 侧边栏的实现
由于评论区里问的人较多，所以在这里更新一下，其实我就算在这里写的再详细也不如大家去看官方文档。
侧边栏的配置也在`.vuepress/config.js`中：
```
sidebar: [
  {
    title: 'JavaScript', // 侧边栏名称
    collapsable: true, // 可折叠
    children: [
      '/blog/JavaScript/学会了ES6，就不会写出那样的代码', // 你的md文件地址
    ]
  },
  {
    title: 'CSS', 
    collapsable: true,
    children: [
      '/blog/CSS/搞懂Z-index的所有细节',
    ]
  },
  {
    title: 'HTTP',
    collapsable: true,
    children: [
      '/blog/HTTP/认识HTTP-Cookie和Session篇',
    ]
  },
]
```
对应的文档结构：
```
├─blog // docs目录下新建一个博客目录
│  ├─CSS
│  ├─HTTP
│  └─JavaScript
```
我的博客：[brownhu](http://brownhu.site/)

## 部署
在配置好你博客之后，命令行执行：
```bash
Vuepress build
```
当你看到这一行就说明成功了：
```
Success! Generated static files in vuepress.
```
将打包好的vuepress目录上传到你的github仓库，和github page配合，就可以配置好你的博客网站了。