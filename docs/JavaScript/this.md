# 搞懂this指向
::: danger 💢
🚵**This is a big mountain**🏆
:::
## 绑定机制
### 默认绑定
**全局环境中，this默认绑定到window**
```js
console.log(this === window); // true
```
**函数独立调用时，this默认绑定到window**
```js
function fn(){
    console.log(this === window);
}
fn(); // true
```
**被嵌套的函数独立调用时，this默认绑定到window**
```js
// 虽然 innerFn() 函数被嵌套在obj.foo()函数中，但 innerFn() 函数是独立调用，
// 而不是方法调用。所以this默认绑定到window
var x = 0;
var obj = {
          x : 2,
          foo:function(){
                function innerFn(){
                    console.log(this.x);
                }
                innerFn();
            }
}
obj.foo(); // 0
```
**`IIFE`立即执行函数实际上是函数声明后直接调用执行**
```js
var a = 0;
function foo(){
    (function test(){
        console.log(this.a);
    })()
    // 改用箭头函数 输出为2
    // (() => {
    //     console.log(this.a);
    // })()
};
var obj = {
    a : 2,
    foo:foo
}
obj.foo(); // 0 
```

```js
//等价于上例
var a = 0;
var obj = {
    a : 2,
    foo:function(){
            function test(){
                console.log(this.a);
            }
            test();
    }
}
obj.foo(); // 0
```
**闭包**

test()函数是独立调用，而不是方法调用，所以this默认绑定到window

[👏来看看函数调用🤳](./javascript函数.md#函数调用)

::: tip 🛑
由于闭包的this默认绑定到window对象，但又常常需要访问嵌套函数的this，
所以常常在嵌套函数中使用`var that = this`，然后在闭包中使用`that替代this`，
使用作用域查找的方法来找到嵌套函数的this值 
:::
```js
var a = 0;
function foo(){
    var that = this;  // 如果没有该语句 test 打印this.a的值为0
    function test(){
        console.log(that.a);
    }
    return test;
};
var obj = {
    a : 2,
    foo:foo
}
obj.foo()();//2
```

### 隐式绑定
**一般地，被直接对象所包含的函数调用时，也称为方法调用，this隐式绑定到该直接对象**


![举个例子](../.vuepress/public/example.jpg)

```js
function foo(){
    console.log(this.a);
};
var obj1 = {
    a:1,
    foo:foo,
    obj2:{
        a:2,
        foo:foo
    }
}
//foo()函数的直接对象是obj1，this隐式绑定到obj1
obj1.foo(); // 1

//foo()函数的直接对象是obj2，this隐式绑定到obj2
obj1.obj2.foo(); // 2
```

### 隐式丢失🍒
**隐式丢失是指被隐式绑定的函数丢失绑定对象，从而默认绑定到window。**
::: danger [👣留心]
这种情况容易出错却又常见
:::

#### 函数别名
```js
var a = 0;
function foo(){
    console.log(this.a);
};
var obj = {
    a : 2,
    foo:foo
}
// 把obj.foo赋予别名bar，造成了隐式丢失，
// 因为只是把foo()函数赋给了bar，而bar与obj对象则毫无关系
var bar = obj.foo;
bar(); // 0
```
**这种情况等价于下面示例**
```js
//等价于
var a = 0;
var bar = function foo(){
    console.log(this.a);
}
bar(); // 0
```

#### 参数传递
```js
var a = 0;
function foo(){
    console.log(this.a);
};
function bar(fn){
    fn();
}
var obj = {
    a : 2,
    foo:foo
}
// 把obj.foo当作参数传递给bar函数时，有隐式的函数赋值fn=obj.foo。
// 与上例函数别名类似，只是把foo函数赋给了fn，而fn与obj对象则毫无关系
bar(obj.foo); // 0
```
```js
//等价于
var a = 0;
function bar(fn){
    fn();
}
bar(function foo(){
    console.log(this.a);
});
```
#### 内置函数
内置函数与上例类似，也会造成隐式丢失
```js
var a = 0;
function foo(){
    console.log(this.a);
};
var obj = {
    a : 2,
    foo:foo
}
setTimeout(obj.foo,100); // 0

//等价于
var a = 0;
setTimeout(function foo(){
    console.log(this.a);
},100); // 0
```
#### 间接引用
函数的"间接引用"一般都在无意间创建，最容易在赋值时发生，会造成隐式丢失

```js
function foo() {
    console.log( this.a );
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
// 将o.foo函数赋值给p.foo函数，然后立即执行。
// 相当于仅仅是foo()函数的立即执行
(p.foo = o.foo)(); // 2
```
```js
function foo() {
    console.log( this.a );
}
var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };
o.foo(); // 3
// 将o.foo函数赋值给p.foo函数，之后p.foo函数再执行
// 属于p对象的foo函数的执行
p.foo = o.foo;
p.foo();//4
```

### 显式绑定
- 通过call()、apply()、bind()方法把对象绑定到this上，叫做显式绑定。
- 对于被调用的函数来说，叫做间接调用
```js
var a = 0;
function foo(x,y){
    console.log(`${this.a}+${x}+${y}=${this.a+x+y}`);
}
var obj = {
    a:2
};
foo(3,4);   // 0+3+4 = 7 !函数独立调用时，this默认绑定到window
foo.call(obj,3,4);  // 2+3+4=9
```
::: danger [注意]
- **普通的显式绑定无法解决隐式丢失问题**
- 🐥硬绑定是显式绑定的一个变种，使this不能再被修改
- javascript中新增了许多内置函数，具有显式绑定的功能，如数组的5个迭代方法：map()、forEach()、filter()、some()、every()
:::
```js
var a = 0;
function foo(){
    console.log(this.a);
}
var obj = {
    a:2
};
var bar= function(){
    foo.call(obj);
}
// 在bar函数内部手动调用foo.call(obj)。
// 因此，无论之后如何调用函数bar，它总会手动在obj上调用foo
bar();//2
setTimeout(bar,100);//2
bar.call(window);//2
```



### new绑定
**如果函数或者方法调用之前带有关键字new，它就构成构造函数调用。对于this绑定来说，称为new绑定**
- 构造函数通常不使用return关键字，它们通常初始化新对象，当构造函数的函数体执行完毕时，它会显式返回。在这种情况下，构造函数调用表达式的计算结果就是这个新对象的值

```js
function fn(){
    this.a = 2;
}
var test = new fn();
console.log(test); // {a:2}
```

- 如果构造函数使用return语句但没有指定返回值，或者返回一个原始值，那么这时将忽略返回值，同时使用这个新对象作为调用结果
```js
function fn(){
    this.a = 2;
    return;
}
var test = new fn();
console.log(test); // {a:2}
```
- 如果构造函数显式地使用return语句返回一个对象，那么调用表达式的值就是这个对象
```js
var obj = {a:1};
function fn(){
    this.a = 2;
    return obj;
}
var test = new fn();
console.log(test); // {a:1}
```

::: danger [👣注意]
尽管有时候构造函数看起来像一个方法调用，它依然会使用这个新对象作为this。
也就是说，在表达式new o.m()中，this并不是 o
:::
```js
var o = {
    m: function(){
        return this;
    }
}
var obj = new o.m();
console.log(obj,obj === o);             // {} false
console.log(obj.constructor === o.m);   // true
``` 

### 严格模式下
- **严格模式下，独立调用的函数的this指向undefined**
```js
function fn(){
    'use strict';
    console.log(this);//undefined
}
fn();

function fn(){
    console.log(this);//window
}
fn();
```
- **在非严格模式下，使用函数的call()或apply()方法时，null或undefined值会被转换为全局对象。而在严格模式下，函数的this值始终是指定的值**

```js
var ball = '🏀';
function showBall(){
    console.log(this.ball);
}
showBall.call(null); // 🏀

var ball = '🏀';
function showBall(){
    'use strict';
    console.log(this.ball);
}
showBall.call(null); // TypeError: Cannot read property 'ball' of null
```

::: tip [提示]
- this的四种绑定规则: **【默认绑定、隐式绑定、显式绑定、new绑定】**
- 对应的函数调用方式: **【独立调用、方法调用、间接调用、构造函数调用】**。
:::

## this绑定优先级
如果在函数的调用位置上同时存在两种以上的绑定规则,那就得考虑优先级得问题了。

### 显式绑定🆚隐式绑定
**显式绑定优先级更高** 
```js
function foo() {
    console.log( this.a );
}
var obj1 = {
    a: 2,
    foo: foo
};
var obj2 = {
    a: 3,
    foo: foo
};
obj1.foo(); // 2
obj2.foo(); // 3 

// 在下面语句中，显式绑定call(obj2)和隐式绑定obj1.foo同时出现
// 最终结果为3，说明被绑定到了obj2中
obj1.foo.call( obj2 ); // 3  this指向obj2

obj2.foo.call( obj1 ); // 2  this指向obj1
```

### new绑定🆚隐式绑定
**new绑定优先**
```js
function foo(something) {
    this.a = something;
}
var obj1 = {foo: foo};
var obj2 = {};
obj1.foo( 2 );
console.log( obj1.a ); // 2

obj1.foo.call(obj2,3);
console.log( obj2.a ); // 3

// 在下列代码中，隐式绑定obj1.foo和new绑定同时出现。
// 最终obj1.a结果是2，而bar.a结果是4，说明this被绑定在bar上
var bar = new obj1.foo( 4 );
console.log( obj1.a ); // 2
console.log( bar.a );  // 4
```

### new绑定🆚显式绑定
```js
function foo(something) {
    this.a = something;
}
var obj1 = {};
//先将obj1绑定到foo函数中，此时this值为obj1
var bar = foo.bind( obj1 );
bar( 2 );
console.log(obj1.a); // 2

//通过new绑定，此时this值为baz
var baz = new bar( 3 );
console.log( obj1.a ); // 2
//说明使用new绑定时，在bar函数内，无论this指向obj1有没有生效，最终this都指向新创建的对象baz
console.log( baz.a ); // 3
```

### 判断顺序
- 1、是否是new绑定？如果是，this绑定的是新创建的对象
```js
var bar = new foo();
```
- 2、是否是显式绑定？如果是，this绑定的是指定的对象
```js
var bar = foo.call(obj2);
```
- 3、是否是隐式绑定？如果是，this绑定的是属于的对象
```js
var bar = obj1.foo(); 
```
- 4、如果都不是，则使用默认绑定
```js
var bar = foo();
```

### 箭头函数下的this
箭头函数下的this有些特殊，函数体内的this对象就是定义时的所在的对象，而不是使用时所在的对象。

例子：
```js
function Timer(){
    this.s1 = 0;
    this.s2 = 0;
    setInterval(()=> this.s1++,1000)
    setInterval(function(){
        this.s2 ++
    },1000)
}

let timer = new Timer()
setTimeout(() => console.log(timer.s1),3100) //  3
setTimeout(() => console.log(timer.s2),3100) //  0
```

 Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数，箭头函数的this指向函数定义时所在的作用域(即Timer函数)，普通函数的this指向调用时所在的作用于（即全局对象window）。所以，3100ms之后，timer.s1加到了3，而timer.s2一次都没有更新。