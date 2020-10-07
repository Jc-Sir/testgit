# Web Storage

::: tip [提示]
- Web Storage的目的是克服由cookie带来的一些限制，当数据需要被严格控制在客户端上时，无须持续地将数据发回服务器。
- Web Storage的两个主要目标是：提供一种在cookie之外存储会话数据的途径以及提供一种存储大量可以跨会话存在的数据的机制
:::

## Web Storage分类
::: warning [注意]
- 除了保存期限的长短不同，以下这两个对象的属性和方法完全一样
- 它们很像cookie机制的强化版，能够动用大得多的存储空间。
- 目前，每个域名的存储上限视浏览器而定，Chrome是2.5MB，Firefox和Opera是5MB，IE是10MB。
- 其中，Firefox的存储空间由一级域名决定，而其他浏览器没有这个限制。也就是说，在Firefox中，a.example.com和b.example.com共享5MB的存储空间。
- **另外，与Cookie一样，它们也受同域限制。某个网页存入的数据，只有同域下的网页才能读取**
- 通过检查window对象是否包含sessionStorage和localStorage属性，可以确定浏览器是否支持这两个对象
- [注意]IE浏览器不支持在本地使用storage
:::

### sessionStorage
sessionStorage保存的数据用于浏览器的一次会话，当会话结束(通常是该窗口关闭)，数据被清空；


### localStorage
localStorage保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。


## 存取数据
sessionStorage和localStorage保存的数据，都以**键对**的形式存在。也就是说，每一项数据都有一个键名和对应的值。所有的数据都是以**文本格式保存**

::: danger [注意]
Storage类型只能存储字符串。非字符串的数据在存储之前会被转换成字符串
:::

### setItem()存
- 存入数据使用setItem方法。它接受两个参数，第一个是键名，第二个是保存的数据

[注意]不同的浏览器存入的Storage位置不一样，不能通用


### getItem()取
读取数据使用getItem方法。它只有一个参数，就是键名

```j
var sessionValue = sessionStorage.getItem("key");
var localvalue = localStorage.getItem("key");
```

**除了使用setItem()和getItem()方法之外，还可以使用属性来存取数据**
```js
localStorage.setItem("key1","value1");
localStorage.testkey = 'testvalue';
console.log(localStorage.getItem('testkey')); // 'testvalue'
console.log(localStorage.key1);               // 'value1'
```

## 清除数据

### removeItem()
- 用于清除某个键名对应的数据
- **[注意]**清除不存在的键名不会报错，只会静默失败
```js
sessionStorage.removeItem('key');
localStorage.removeItem('key');
```
### delete操作
- 使用delete操作来清除数据
- **[注意]**IE7-浏览器不支持delete操作符来清除storage数据

```js 
localStorage.setItem("key1","value1");
delete localStorage.key1;
console.log(localStorage.key1);            // undefined
console.log(localStorage.getItem('key1')); // null
```

### clear()
clear方法用于清除所有保存的数据

```js
sessionStorage.clear();
localStorage.clear(); 
```

## 存储事件
- 该事件只发生在window对象上，在document对象上触发无效，且使用DOM0级、DOM2级事件处理函数都可以
- 无论对sessionStorage还是localStorage进行操作，都会触发storage事件。
- 当通过属性或setItem()方法保存数据，使用delete操作符或removeItem()删除数据，或者调用clear()方法时，都会发生该事件

::: tip [提示]
- 只有当存储**数据真正发生改变**的时候才会触发存储事件。像给已经存在的存储项设置一个一模一样的值，抑或是删除一个本来就不存在的存储项都是不会触发存储事件的。
- 通过getItem()方法获取数据也不会触发该事件

一般地，storage事件不在导致数据变化的当前页面触发。如果浏览器同时打开一个域名下面的多个页面，当其中的一个页面改变sessionStorage或localStorage的数据时，其他所有页面的storage事件会被触发，而原始页面并不触发storage事件。可以通过这种机制，实现多个窗口之间的通信
:::

::: danger [注意]
[注意]IE8-浏览器不支持storage事件，IE9+浏览器与其他标准浏览器有所不同，无论数据真实值是否变化，只要对数据进行设置或删除，都会触发该事件，且原始页面和同一域名下的其他页面都会触发
:::

**事件的event对象属性**
```js
url:触发事件的链接地址
key:设置或者删除的键名
newvalue:如果是设置值，则是新值；如果是删除键，则是null
oldValue:键被更改之前的值
storageArea:返回触发事件的对象
```

### 监听storage事件
```
window.addEventListener('storage',function(e){
    console.log('key='+e.key+',oldValue='+e.oldValue+',newValue='+e.newValue);
})
```



