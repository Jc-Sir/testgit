# JavaScript函数

## 基本概念
- 由**事件驱动**的或者当它**被调用时执行**的可重复使用的代码块。
- 通过函数可以封装任意多条语句，而且可以在任何地方、任何时候调用执行。在javascript里，函数即对象，程序可以随意操控它们。

## 声明定义
### 标准语法
**使用function关键字，后跟一组参数以及函数体**
一个函数定义(也称为函数声明,或函数语句)由一系列的function关键字组成,依次为:
- 函数的名称
- 函数参数列表，包围在括号中,参数之间使用逗号分隔
- 定义函数的 JavaScript 语句，用大括号{}括起来

```js
function funcname([arg1 [,arg2 [...,argn]]]){
    statement;    
}
```
::: danger [注意]
function语句里的花括号是必需的，这和while循环和其他一些语句所使用的语句块是不同的，即使函数体内只包含一条语句，仍然必须使用花括号将其括起来
:::

#### 函数优先级
- 标准声明的函数优先级更高，解析器会优先提取函数并放在代码树顶端
- 所以标准声明函数``位置不限制``，所以下面的代码可以正常执行。

```js
console.log(sum(3)); // 4
function sum(num) {
	return ++num;
};
```

#### 标准声明优先级高于赋值声明
```js
console.log(sum(3)); //4

function sum(num) {
  return ++num;
}

var sum = function(num) {
  return `sum = ${num}`;
};
// 由于函数重复声明会覆盖之前的声明
console.log(sum(3)); // sum = 3
```

#### 函数重复申明
变量的重复声明是无用的，但函数的重复声明会覆盖前面的声明(无论是变量还是函数声明)

```js
//变量的重复声明无用
var a = 1;
var a;
console.log(a);//1
```
```js
//由于函数声明提升优先于变量声明提升，所以变量的声明无作用
var a;
function a(){
    console.log(1);
}
a();//1
```
```js
//后面的函数声明会覆盖前面的函数声明
a();//2
function a(){
    console.log(1);
}
function a(){
    console.log(2);
}
```
::: danger [注意]
应该避免在同一作用域中重复声明
:::

#### 函数删除
**和变量声明一样，函数声明语句创建的变量无法删除**
```js
function delFun(){
    console.log(1);
}
delete delFun;         // false
console.log(delFun()); // 1
```

### 函数表达式
以表达式方式定义的函数,**函数的名称是可选的**
```js
var functionName = function([arg1 [,arg2 [...,argn]]]){
    statement;
}
// 函数的名称是可选的
var functionName = function funcName([arg1 [,arg2 [...,argn]]]){
    statement;
}
```
**一个函数定义表达式包含名称，函数的局部作用域将会包含一个绑定到函数对象的名称。实际上，函数的名称将成为函数内部的一个局部变量**
```js
var test = function fn(){
   return fn;
}
console.log(test);      // fn(){return fn;}
console.log(test());    // fn(){return fn;}
console.log(test()());  // fn(){return fn;}
```
**对于具名的函数表达式来说，函数名称相当于函数对象的形参，只能在函数内部使用；而变量名称相当于函数对象的实参，在函数内部和函数外部都可以使用**
```js
var test = function fn(){
   return fn === test;
}
console.log(test());      // true
console.log(test === fn); // ReferenceError: fn is not defined
```

**函数定义了一个非标准的name属性，通过这个属性可以访问到给定函数指定的名字，这个属性的值永远等于跟在function关键字后面的标识符，匿名函数的name属性为空**

```js
//IE11-浏览器无效，均输出undefined
//chrome在处理匿名函数的name属性时有问题，会显示函数表达式的名字
function fn(){};
console.log(fn.name);      //'fn'
var fn = function(){};
console.log(fn.name);      //''，在chrome浏览器中会显示'fn'
var fn = function abc(){};
console.log(fn.name);      //'abc'
```
#### 匿名函数
- 匿名函数也叫拉姆达函数，是 `function`关键字后面没有标识符的函数。
- 通常而言,以表达式方式定义函数时都不需要名称,这会让定义它们的代码更加紧凑。
- 函数定义表达式特别适合用来定义那些``只会使用一次``的函数
- 函数是对象所以可以通过赋值来指向到函数对象的指针，
- 当然指针也可以传递给其他变量，注意后面要以 ``;`` 结束。

下面使用函数表达式将  ``匿名函数`` 赋值给变量

```js
var anonymousFun = function(num) {
  return ++num;
};
console.log(anonymousFun instanceof Object);  //true
let test = anonymousFun;
console.log(test === anonymousFun);           // true 引用类型传址
```


### Function构造函数
Function构造函数接受任意数量的参数,但最后一个参数始终被看做是函数体,而前面的参数则枚举了新函数的参数。

::: danger [注意]
Function构造函数无法指定函数名称，它创建的是一个匿名函数

从技术上讲,这是一个函数表达式。但**不推荐使用**,因为这种语法会导致解析两次代码。
:::

- 第一次是解析常规javascript代码
- 第二次解析传入构造函数中的字符串，影响性能

```js
var sum = new Function("num1","num2",'return num1 + num2');
sum(1,2); // 3

//等价于
var sum = function(num1,num2){
    return num1+num2;
}
```

## 函数调用
**只有函数被调用时，才会执行**
::: tip 提示
javascript一共有4种调用模式：函数调用模式、方法调用模式、构造器调用模式和间接调用模式
:::

### 函数调用模式
- 当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用的。对于普通的函数调用来说，函数的返回值就是调用表达式的值
```js
function add(x,y){
    return x+y;
}
var sum = add(1,2);
console.log(sum)    // 3
```
- 使用函数调用模式调用函数时,非严格模式下,this被绑定到全局对象;在严格模式下,this是undefined
```js
function add(x,y){
    console.log(this);  // window
}    
add();
```
```js
function add(x,y){
    'use strict';
    console.log(this);  // undefined
}    
add(); // window
```
- 因此，`this`可以用来判断当前是否是严格模式
```js{1}
var strict = (function(){return !this;}());
```
#### 重写
因为函数调用模式的函数中的this绑定到全局对象，所以会发生全局属性被重写的现象
```js
var num = 0;
function fn(){
  this.num = 1;
}
fn();
console.log(this,this.num,num);//window 1 1
```
### 方法调用模式
**一个方法无非是个保存在一个对象的属性里的函数**
- 当一个函数被保存为对象的一个属性时，我们称它为一个方法。
- 当一个方法被调用时，this被绑定到该对象。如果调用表达式包含一个提取属性的动作，那么它就是被当做一个方法来调用
```js
var obj = {
  m: function(){
    console.log(1);
  }
};
obj.m();      //1
```
::: tip [提示]
方法可以使用this访问自己所属的对象，所以它能从对象中取值或对对象进行修改。this到对象的绑定发生在调用的时候。通过this可取得它们所属对象的上下文的方法称为公共方法
:::

```js
var obj = {
    a: 1,
    m: function(){
        return this;
    },
    n: function(){
        this.a = 2;
    }
};
console.log(obj.m().a);//1
obj.n();
console.log(obj.m().a);//2
```

任何函数只要作为方法调用实际上都会传入一个隐式的实参——这个实参是一个对象，方法调用的母体就是这个对象，通常来讲，基于那个对象的方法可以执行多种操作，方法调用的语法已经很清晰地表明了函数将基于一个对象进行操作。
```js
rect.setSize(width,height);
setRectSize(rect,width,height);
```
假设上面两行代码的功能完全一样，它们都作用于一个假定的对象rect。可以看出，第一行的方法调用语法非常清晰地表明这个函数执行的载体是rect对象，函数中的所有操作都将基于这个对象

和变量不同，关键字this没有作用域的限制，嵌套的函数不会从调用它的函数中继承this。如果嵌套函数作为方法调用，其this的值指向调用它的对象。如果嵌套函数作为函数调用，其this值不是全局对象(非严格模式下)就是undefined(严格模式下)

```js
var o = {
    m: function(){
       function n(){
         return this;
        }
    return n();
  }
}
console.log(o.m());//window
```
```js
var o = {
    m: function() {
        function n() {
            'use strict';
            return this;
        }
        return n();
    }
}
console.log(o.m()); // undefined
```
如果想访问这个外部函数的this值，需要将this的值保存在一个变量里，这个变量和内部函数都同在一个作用域内。通常使用变量self或that来保存this
```js
var o = {
    m: function() {
        var self = this;
        console.log(this === o); //true
        function n() {
            console.log(this === o); //false
            console.log(self === o); //true
            return self;
        }
        return n();
    }
}
console.log(o.m() === o); // true
```

### 构造函数调用模式
- 如果函数或者方法调用之前带有关键字new，它就构成构造函数调用
```js
function fn(){
    this.a = 1;
};
var obj = new fn();
console.log(obj.a);//1
```
- 如果构造函数调用在圆括号内包含一组实参列表，先计算这些实参表达式，然后传入函数内
```js
function fn(x){
    this.a = x;
};
var obj = new fn(2);
console.log(obj.a);//2
```
- 如果构造函数没有形参，javascript构造函数调用的语法是允许省略实参列表和圆括号的。凡是没有形参的构造函数调用都可以省略圆括号

```js
var o = new Object();
//等价于
var o = new Object;
```

::: danger [注意]
尽管构造函数看起来像一个方法调用，它依然会使用这个新对象作为调用上下文。也就是说，在表达式new o.m()中，调用上下文并不是o
:::

```js
var o = {
    m: function(){
        return this;
    }
}
var obj = new o.m();
console.log(obj,obj === o);            // {} false
console.log(obj.constructor === o.m);  // true
```
- 构造函数通常不使用return关键字，它们通常初始化新对象，当构造函数的函数体执行完毕时，它会显式返回。在这种情况下，构造函数调用表达式的计算结果就是这个新对象的值
```js
function fn(){
    this.a = 2;
}
var test = new fn();
console.log(test);//{a:2}
```
- 如果构造函数使用return语句但没有指定返回值，或者返回一个原始值，那么这时将忽略返回值，同时使用这个新对象作为调用结果

```js
function fn(){
    this.a = 2;
    return;
}
var test = new fn();
console.log(test);//{a:2}
```
- 如果构造函数显式地使用return语句返回一个对象，那么调用表达式的值就是这个对象
```js
var obj = {a:1};
function fn(){
    this.a = 2;
    return obj;
}
var test = new fn();
console.log(test);//{a:1}
```

### 间接调用模式
- javascript中函数也是对象，函数对象也可以包含方法。
- call()和apply()方法可以用来间接地调用函数
- 这两个方法都允许显式指定调用所需的this值，也就是说，任何函数可以作为任何对象的方法来调用，哪怕这个函数不是那个对象的方法。两个方法都可以指定调用的实参。
- call()方法使用它自有的实参列表作为函数的实参。
- apply()方法则要求**以数组的形式传入参数**
```js
var obj = {};
function sum(x,y){
    return x+y;
}
console.log(sum.call(obj,1,2));    //3
console.log(sum.apply(obj,[1,2])); //3
```
## 函数参数
javascript函数的参数与大多数其他语言的函数的参数有所不同。函数不介意传递进来多少个参数，也不在乎传进来的参数是什么数据类型，甚至可以不传参数。

### arguments
- javascript中的函数定义并未指定函数形参的类型，函数调用也未对传入的实参值做任何类型检查。
- 实际上，javascript函数调用甚至不检查传入形参的个数
- javascript中的参数在内部用一个数组表示。函数接收到的始终都是这个数组，而不关心数组中包含哪些参数。
- 在函数体内可以通过arguments对象来访问这个参数数组，从而获取传递给函数的每一个参数。arguments对象并不是Array的实例，它是一个**类数组对象**，可以使用方括号语法访问它的每一个元素
- 它不能用数组的一些方法，例如push，pop，slice等。
```js
function add(x){
    console.log(arguments[0],arguments[1],arguments[2])//1 2 3
    return x+1;
}
add(1,2,3);
```
**arguments 是函数获得到所有参数集合**
```js
function sum() {
  return [...arguments].reduce((total, num) => {
    return (total += num);
  }, 0);
}
console.log(sum(2, 3, 4, 2, 6)); //17
```
**arguments对象的length属性显示实参的个数，函数的length属性显示形参的个数**
```js
function add(x,y){
    console.log(arguments.length) // 3
    return x+1;
}
add(1,2,3);
console.log(add.length);          // 2
```
**形参只是提供便利，但不是必需的**
```js
function add(){
    return arguments[0] + arguments[1];
}
console.log(add(1,2));//3
```

### 同名形参
在**非严格模式**下，函数中可以出现同名形参，且只能访问最后出现的该名称的形参
```js
function add(x,x,x){
    return x;
}
console.log(add(1,2,3));//3
```
而在严格模式下，出现同名形参会抛出语法错误
```js
function add(x,x,x){
    'use strict';
    return x;
}
console.log(add(1,2,3));
//SyntaxError: Duplicate parameter name not allowed in this context
```

### 形参实参
- **形参**是在函数声明时设置的参数，**实参**指在调用函数时传递的值。
- 形参数量大于实参时，没有传参的形参值为 undefined
- 实参数量大于形参时，多于的实参将忽略并不会报错

```js
// n1,n2 为形参
function sum(n1, n2) {
	return n1+n2;
}
// 参数 2,3 为实参
console.log(sum(2, 3)); //5
```

**当没传递参数时值为undefined**

```js
function sum(n1, n2) {
  return n1 + n2;
}
console.log(sum(2)); //NaN
```

### 默认参数
- 在ES6之前，不能直接为函数的参数指定默认值，只能采用变通的方法。
- 下面通过计算年平均销售额来体验以往默认参数的处理方式
::: tip [ES6👽]
ES6函数扩展
::: 
**常常使用逻辑或运算符给省略的参数设置一个合理的默认值**
```js
function log(x, y) {
  y = y || 'World';
  console.log(x, y);
}
log('Hello')            // Hello World
log('Hello', 'China')   // Hello China
log('Hello', '')        // Hello World
```
::: danger [注意]
实际上，使用`y || 'World'`是不严谨的，显式地设置假值(undefined、null、false、0、-0、''、NaN)也会得到相同的结果。所以应该根据实际场景进行合理设置
:::

为了避免这个问题，通常需要先判断一下参数y是否被赋值，如果没有，再等于默认值。

```js
if (typeof y === 'undefined') {
    y = 'World';
}
```

- 使用新版本[ES6]默认参数方式如下
```js
//total:总价 year:年数
function avg(total, year = 1) {
  return Math.round(total / year);
}
console.log(avg(2000, 3));
```

- 体验默认参数实现排序
```js
// 不传递 type 参数时使用默认值 asc。
function sortArray(arr, type = 'asc') {
	return arr.sort((a, b) => type == 'asc' ? a - b : b - a);
}
console.log(sortArray([1, 3, 2, 6], 'desc')); // [6, 3, 2, 1]
console.log(sortArray([1, 3, 2, 6]));  // [1, 2, 3, 6]
```
- **默认参数要放在最后面(尾参数)**

::: danger [小贴示]
通常情况下，定义了默认值的参数，应该是函数的尾参数。因为这样比较容易看出来，到底省略了哪些参数。如果非尾部的参数设置默认值，实际上这个参数是没法省略的
:::
```js
function f(x = 1, y) {
  return [x, y];
}
f()             // [1, undefined]
f(2)            // [2, undefined])
f(, 1)          // 报错  参数x不可省略
f(undefined, 1) // [1, 1]
```
如果传入undefined，将触发该参数等于默认值，null则没有这个效果
```js
function test(x = 5, y = 6) {
  console.log(x, y);
}
test(undefined, null)// 5 null
```

```js
//total:价格,discount:折扣,dis:折后折
function sum(total, discount = 0, dis = 0) {
  return total * (1 - discount) * (1 - dis);
}
console.log(sum(2000, undefined, 0.3));
```
**作用域**
- 如果参数默认值是一个变量，则该变量所处的作用域，与其他变量的作用域规则是一样的，即**先是当前函数的作用域，然后才是全局作用域**
```js
var x = 1;
function f(x, y = x) {
  console.log(y);
}
f(2) // 2
```
- 如果函数调用时,函数作用域内部的变量x没有生成，则x指向全局变量
```js
var x = 1;
function f(y = x) {
  var x = 2;
  console.log(y);
}
f() // 1
```
**默认参数应用**
利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误
```js
function throwIfMissing() {
  throw new Error('Missing parameter');
}
// 设定mustBeProvided 是一个必选参数
function foo(x,mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}
foo(1)  // Error: Missing parameter
```
将参数默认值设为undefined，表明这个参数可以省略
```js
function foo(optional = undefined) {
    // dosomething
}
```

### 对象参数
- 通过**键/值对**的形式来传入参数，参数的顺序就无关紧要了。
- 定义函数的时候，传入的实参都写入一个单独的对象之中，在调用的时候传入一个对象，对象中的名/值对是真正需要的实参数据

```js
function easycopy(args){
    arraycopy(args.from,args.from_start || 0,args.to,args.to_start || 0, args.length);
}
var a = [1,2,3,4],b =[];
easycopy({from:a,to:b,length:4});
```

### rest参数
::: tip [ES6👽]
ES6函数扩展
:::
- ES6引入rest参数(形式为"...变量名")，用于**获取函数的多余参数**，这样就不需要使用arguments对象了。
- rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中
```js
function add(...arglist) {
  var sum = 0;
  for (var val of arglist) {
    sum += val;
  }
  return sum;
}
add(2, 5, 3)     //10

function sum(...args) {
  return args.reduce((total, num) => {
    return (total += num);
  }, 0);
}
console.log(sum(2, 3, 4, 2, 6)); //17
```
**利用rest参数改写数组push方法的例子**
```js
function pushArr(arr,...args){
	args.forEach(i=>{
		arr.push(i);
	})
	return arr;
}
pushArr([1,2,3],4,5,6) // [1, 2, 3, 4, 5, 6]
```
::: danger [👣注意]
函数的length属性不包括rest参数
:::
```js
(function(a) {}).length         // 1
(function(...a) {}).length      // 0
(function(a, ...b) {}).length   // 1
```
::: danger [👣注意]
rest参数之后不能再有其他参数
:::
```js
//Uncaught SyntaxError: Rest parameter must be last formal parameter
function f(a, ...b, c) {
  //dosomething
}
```
### 扩展运算符
::: tip [ES6👽]
ES6函数扩展
:::
- 扩展运算符(spread)是三个点(`...`)。
- 它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列。
```js
console.log(...[1, 2, 3])// 1 2 3
console.log(1, ...[2, 3, 4], 5)// 1 2 3 4 5
```
**该运算符主要用于函数调用**
```js
function add(x, y) {
  return x + y;
}
var numbers = [1, 2];
add(...numbers)     // 3
// => add(1,2) 
```
**Math.max方法简化**
```js
// ES5
Math.max.apply(null, [55, 11, 77])
// ES6
Math.max(...[55, 11, 77])
//等同于
Math.max(14, 3, 77)
```
**push方法简化**
```js
// ES5
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);
// ES6
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
arr1.push(...arr2);
```
**扩展运算符可以将字符串转为真正的数组**
```js
[...'hello']// [ "h", "e", "l", "l", "o" ]
```

### 同步
::: tip [提示]
当形参与实参的个数相同时，arguments对象的值和对应形参的值保持同步
:::
**代码说明**
```js
function argFun(num1,num2){
    console.log(num1,arguments[0]);  // 1 1
    arguments[0] = 2;                // 改变arguments对象的第一个值
    console.log(num1,arguments[0]);  // 2 2
    num1 = 10;                       // 改变形参值
    console.log(num1,arguments[0]);  // 10 10
}
argFun(1);
```

::: danger [注意]
- 虽然**命名参数**和**对应arguments对象的值**相同，但并不是相同的命名空间。
- 它们的**命名空间是独立的，但值是同步的**
- 在严格模式下，arguments对象的值和形参的值是独立的
:::

```js
function argFun(num1,num2){
    'use strict';
    console.log(num1,arguments[0]);  // 1 1
    arguments[0] = 2;
    console.log(num1,arguments[0]);  // 1 2
    num1 = 10;
    console.log(num1,arguments[0]);  // 10 2
}
argFun(1);
```

**当形参并没有对应的实参时，arguments对象的值与形参的值并不对应**
```js
function argFun(num1,num2){
    console.log(num1,arguments[0]);  // undefined,undefined
    num1 = 10;
    arguments[0] = 5;
    console.log(num1,arguments[0]);  // 10,5
}
argFun();
```

### 内部属性
#### callee
- arguments对象有一个名为callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数
- arguments的callee属性可以调用函数本身，当函数正在执行时才可调用，可以实现方法的递归调用。

```js
function argTest(a,b,c){
	var e = arguments.callee.toString();
	console.log(e);
}
argTest();  //打印出函数本身
```

**实现递归**

```js
// 示例代码
// 实现阶乘
function factorial(num){
    if(num <=1){
        return 1;
    }else{        
        // 函数的执行与函数名紧紧耦合在了一起。
        // return num* factorial(num-1);     // 方法1

        // 使用arguments.callee可以消除函数解耦
        // 但在严格模式下，访问这个属性会抛出TypeError错误
        return num* arguments.callee(num-1); // 方法2
    }
}    
console.log(factorial(5)); // 120
```
#### caller
**函数的caller**
函数的caller属性保存着调用当前函数的函数的引用，如果是在全局作用域中调用当前函数，它的值是null

```js
function outer(){
    inner();
}
function inner(){
    console.log(inner.caller); // outer(){inner();}
}
outer();
```

```js
function inner(){
    console.log(inner.caller); // null
}
inner();
```

::: danger
在严格模式下，访问这个属性`[caller]`抛出TypeError错误
:::
```js
function inner(){
    'use strict';
    //TypeError: 'caller' and 'arguments' are restricted function properties and cannot be accessed in this context
    console.log(inner.caller);
}
inner();
```

**arguments对象的caller**
该属性始终是undefined，定义这个属性是为了分清arguments.caller和函数的caller属性
```js
function inner(x){
    console.log(arguments.caller); // undefined
}
inner(1);
```
在严格模式下，访问这个属性会抛出TypeError错误
```js
function inner(x){
    'use strict';
    //TypeError: 'caller' and 'arguments' are restricted function properties and cannot be accessed in this context
    console.log(arguments.caller);
}
inner(1);
```

## Arguments作用
### 方法重载
::: tip [定义]
方法重载是指在一个类中定义多个同名的方法，但要求每个方法具有不同的参数的类型或参数的个数。
Javascript并没有重载函数的功能，但是Arguments对象能够模拟重载。
:::

```js
// 普通方法实现重载
function addFunc(a,b,c){
	if(a && b && c){
		console.log(a + b + c);
	}else if(a && b){
		console.log(a + b);
	}else{
		console.log(a);
	}
}
addFunc();           //undefined
addFunc(11,12);      //23
addFunc(11,12,13)    //36
```
```js
// Arguments对象实现方法重载
function addFun(){
	var sum = 0;
	for(var i=0;i<arguments.length;i++){
		sum += arguments[i];
	}
	console.log(sum);
}
addFun();          //0
addFun(11,12);     //23
addFun(11,12,13);  //36
```

```js
// ES6实现方法重载
function test(...nums){
	var sum = 0;
	for(var i=0;i<nums.length;i++){
		sum += nums[i];
	}
	console.log(sum);
}
test();          //0
test(11,12);     //23
test(11,12,13);  //36
```
### 递归调用
[🌿点我点我哟🐈](#callee)
### 不定参问题
[💐客官这里请🌷](#arguments)

## 函数属性和方法
::: tip [提示]
函数是javascript中特殊的对象，可以拥有属性和方法，就像普通的对象拥有属性和方法一样。甚至可以用Function()构造函数来创建新的函数对象。
:::

### length属性
arguments对象的length属性表示实参个数，而函数的length属性则表示形参个数
[☀️这里有个例子哟✨来看我吧](#arguments)

::: danger [注意]
- 指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数
- 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了
:::
示例代码
```js
(function (a) {}).length            // 1
(function (a = 5) {}).length        // 0
(function (a, b, c = 5) {}).length  // 2
```
```js
(function (a = 0, b, c) {}).length  // 0
(function (a, b = 1, c) {}).length  // 1
```


### name属性
- 函数定义了一个非标准的name属性，通过这个属性可以访问到给定函数指定的名字
- 这个属性的值永远等于跟在function关键字后面的标识符
- 匿名函数的name属性为空

```js
//IE11-浏览器无效，均输出undefined
//chrome在处理匿名函数的name属性时有问题，会显示函数表达式的名字
function fn(){};
console.log(fn.name);       //'fn'
var fn = function(){};
console.log(fn.name);       //''，在chrome浏览器中会显示'fn'
var fn = function abc(){};
console.log(fn.name);       //'abc' 
```

**ES6对这个属性的行为做出了一些修改。如果将一个匿名函数赋值给一个变量，ES5的name属性，会返回空字符串，而ES6的name属性会返回实际的函数名**
```js
var func1 = function () {};
func1.name       //ES5:  ""
func1.name       //ES6: "func1"
```
**如果将一个具名函数赋值给一个变量，则ES5和ES6的name属性都返回这个具名函数原本的名字**
```js
var bar = function baz() {};
bar.name        //ES5: "baz"
bar.name        //ES6: "baz"
```
**Function构造函数返回的函数实例，name属性的值为“anonymous”**
```js
(new Function).name     // "anonymous"
```

**bind返回的函数，name属性值会加上"bound"前缀**
```js
function foo() {};
foo.bind({}).name            // "bound foo"
(function(){}).bind({}).name // "bound "
```

### prototype属性
- 每一个函数都有一个prototype属性，这个属性指向一个对象的引用，这个对象称做原型对象(prototype object)。
- 每一个函数都包含不同的原型对象。
- 将函数用做构造函数时，新创建的对象会从原型对象上继承属性
```js
function fn(){};
var obj = new fn;
fn.prototype.a = 1;
console.log(obj.a); // 1
```
### apply()🥝call()
::: tip  🍆
每个函数都包含两个非继承而来的方法：apply()和call()。这两个方法的用途都是**在特定的作用域中调用函数**，实际上等于函数体内this对象的值
:::

- 以对象`obj`(示例对象)的方法来调用函数`f()`(示例函数)，可以这样使用call()和apply()
```js
f.call(obj);
f.apply(obj);
```
- 假设o中不存在m方法，则等价于:
```js
obj.m = f;        //将f存储为obj的临时方法
obj.m();          //调用它，不传入参数
delete obj.m;     //将临时方法删除
```
**代码示例**
```js
window.emoji = "⚽️";
var obj = {emoji: "🏀"};
function printEmoji(){
    console.log(this.emoji);
}
printEmoji();            // ⚽️
printEmoji.call(this);   // ⚽️
printEmoji.call(window); // ⚽️

printEmoji.call(obj);    // 🏀 
//  => 等价于以下
//  obj.printEmoji = printEmoji;
//  obj.printEmoji();
//  delete obj.printEmoji()
```

#### apply()
- 参数1：一个是在其中运行函数的作用域(或者可以说成是要调用函数的母对象，它是调用上下文，在函数体内通过this来获得对它的引用)。
- 参数2：可以是Array的实例，也可以是arguments对象
```js
function sum(num1, num2){
    return num1 + num2;
}
//因为运行函数的作用域是全局作用域，所以this代表的是window对象
function callSum1(num1, num2){
    return sum.apply(this, arguments);
}
function callSum2(num1, num2){
    return sum.apply(this, [num1, num2]);
}
console.log(callSum1(10,10)); //20
console.log(callSum2(10,10)); //20
```
#### call(📞)
- 参数1：同apply()的参数1
- 参数2：传递给函数的参数必须逐个列举出来
```js
function sum(num1, num2){
    return num1 + num2;
}
function callSum(num1, num2){
    return sum.call(this, num1, num2);
    // es6
    // return sum.call(this, ...arguments);
}
console.log(callSum(10,10));   //20
```

::: tip  [小贴士]
- 至于是使用apply()还是call()，完全取决于采取哪种函数传递参数的方式最方便。如果打算直接传入arguments对象，或者包含函数中先接收到的也是一个数组，那么使用apply()肯定更方便；否则，选择call()可能更合适
- 在非严格模式下，使用函数的call()或apply()方法时，null或undefined值会被转换为全局对象。而在严格模式下，函数的this值始终是指定的值
:::
**代码说明**
```js
var color = 'red';
function displayColor(){
    console.log(this.color);
}
displayColor.call(null);       //  red  被转换为全局对象
displayColor.call(undefined);  //  red 
```
```js
// 使用严格模式
var color = 'red';
function displayColor(){
    'use strict';
    console.log(this.color);
}
displayColor.call(null);      // TypeError: Cannot read property 'color' of null
displayColor.call(undefined); // TypeError: Cannot read property 'color' of null
```
### 应用示例
**【1】、调用对象的原生方法**
```js
var obj = {};
obj.hasOwnProperty('toString');     // false
// 定义自有方法 hasOwnProperty
obj.hasOwnProperty = function (){
  return true;
};
obj.hasOwnProperty('toString');     // true  不论参数是什么都返回true
Object.prototype.hasOwnProperty.call(obj, 'toString');  // false
```
**【2】、找出数组最大或最小元素**
javascript不提供找出数组最大元素的函数。
结合使用apply方法和Math.max方法，就可以返回数组的最大元素
```js
var arr = [10, 2, 4, 15, 9];
Math.max.apply(null, arr); // 15
Math.min.call(null,...arr) // 2
```
**【3】、将类数组对象转换成真正的数组**
```js
Array.prototype.slice.apply({0:1,1:2,length:2}); // [1,2]
[].prototype.slice.apply({0:1,length:1});        //[1]
```
**【4】、将一个数组的值push到另一个数组中**
```js
var arr = [];
Array.prototype.push.apply(arr,[1,2,3]);
console.log(arr);         //[1,2,3]
Array.prototype.push.apply(arr,[2,3,4]);
console.log(arr);         //[1,2,3,2,3,4]
```
**【5】、绑定回调函数的对象**
由于apply方法（或者call方法）不仅绑定函数执行时所在的对象，还会立即执行函数，因此不得不把绑定语句写在一个函数体内。
```js
var obj = {};
obj.f = function () {
  console.log(this === obj);
}
var f = function (){
  obj.f.apply(obj);
};
```
### bind()🍺
- 第一个参数[对象]作为 `this` 并在调用新函数时提供一个给定的参数序列。这个方法将返回一个新的函数。
- 第二个以及以后的参数，加上绑定函数运行时本身的参数，按照顺序作为原函数的参数来调用原函数
- bind 方法与 call 方法类似，主要区别在于 bind 返回一个新函数，

> function.bind(this,arg1,arg2,arg3,...)

::: danger [👣留心哟]
IE8-浏览器不支持
:::

```js
function f(y){
    return this.x + y;  //这个是待绑定的函数
}
var o = {x:1};          //将要绑定的对象
var g = f.bind(o);      //通过调用g(x)来调用o.f(x)
g(2);//3
```
**兼容代码**
```js
Function.prototype.bind = function(context){
  var self = this;
  return function(){
    return self.apply(context,arguments);
  }
}
```
**通常，会把它实现得稍微复杂一点，使得可以填入一些参数**
```js
Function.prototype.bind = function(context){
  var self = this,
      context = [].shift.call(arguments),   // 取第一个参数
      args = [].slice.call(arguments);      // 剩余参数
  return function(){
    return self.apply(context,[].concat.call(args,[].slice.call(arguments)));
  }
}
```
::: tip [小贴士🏹]
bind()方法不仅是将函数绑定到一个对象，它还附带一些其他应用：除了第一个实参之外，传入bind()的实参也会绑定到this，这个附带的应用是一种常见的函数式编程技术，有时也被称为'柯里化'(currying)
:::
```js
var sum = function(x,y){
    return x+y;
}
var succ = sum.bind(null,1);
succ(2);    // 3，x绑定到1，并传入2作为实参y
```
```js
function f(y,z){
    return this.x + y + z;
}
var g = f.bind({x:1},2);
g(3);     // 6， this.x绑定到1，y绑定到2，z绑定到3
```
**使用bind()方法实现柯里化可以对函数参数进行拆分**
```js
function getConfig(colors,size,otherOptions){
    console.log(colors,size,otherOptions);
}
var defaultConfig = getConfig.bind(null,'#c00','1024*768');
defaultConfig('123'); // '#c00 1024*768 123'
defaultConfig('456'); // '#c00 1024*768 456'
```
### toString()
函数的toString()实例方法返回函数代码的字符串，而静态toString()方法返回一个类似'[native code]'的字符串作为函数体
```js
function test(){
    console.log('toString方法') // test
}
test.toString();
/*"function test(){
    console.log('toString方法')//test
}"*/
Function.toString(); // "function Function() { [native code] }"
```
### toLocaleString()
函数的toLocaleString()方法和toString()方法返回的结果相同
### valueOf()
函数的valueOf()方法返回函数本身

## 函数防抖和节流💛
### 前言
::: tip
javascript中的函数大多数情况下都是由用户主动调用触发的，除非是函数本身的实现不合理，否则一般不会遇到跟性能相关的问题。
但在一些少数情况下，函数的触发不是由用户直接控制的。在这些场景下，函数有可能被非常频繁地调用，而造成大的性能问题。
解决性能问题的处理办法就是函数节流和函数防抖。
:::
**下面是函数被频繁调用的常见的几个场景**

- 1、mousemove事件。如果要实现一个拖拽功能，需要一路监听 mousemove 事件，在回调中获取元素当前位置，然后重置 dom 的位置来进行样式改变。
如果不加以控制，每移动一定像素而触发的回调数量非常惊人，回调中又伴随着 DOM 操作，继而引发浏览器的重排与重绘，性能差的浏览器可能就会直接假死。
- 2、window.onresize事件。为window对象绑定了resize事件，当浏览器窗口大小被拖动而改变的时候，这个事件触发的频率非常之高。如果在window.onresize事件函数里有一些跟DOM节点相关的操作，而跟DOM节点相关的操作往往是非常消耗性能的，这时候浏览器可能就会吃不消而造成卡顿现象
- 3、射击游戏的 mousedown/keydown 事件（单位时间只能发射一颗子弹）
- 4、搜索联想（keyup事件）
- 5、监听滚动事件判断是否到页面底部自动加载更多（scroll事件)
::: danger ⚠️
对于这些情况的解决方案就是函数节流（throttle）或函数去抖（debounce），核心其实就是**限制某一个方法的频繁触发**
::: 

#### 定时器管理
定时器管理有两种机制：
- 第一种是只要当前函数没有执行完成，任何新触发的函数都会被忽略，可以实现在持续触发事件的情况下，一段时间内只执行一次事件的效果，即**函数节流** 
```js
function fn(method, context) {
  //忽略新函数
  if(method.tId){
    return false;
  }
  method.tId = setTimeout(function() {
    method.call(context);
  }, 1000);
}
``` 

-　第二种是只要有新触发的函数，就立即停止执行当前函数，转而执行新函数，可以实现在持续触发事件的情况下，一定在事件触发n秒后执行，如果n秒内又触发了这个事件，则以新的事件的时间为准，还是n秒后执行，即**函数防抖**

```js
function fn(method, context) {
 //停止当前函数
  clearTimeout(method.tId);
  method.tId = setTimeout(function() {
    method.call(context);
  }, 1000);
}
```
### 函数防抖
函数防抖，字面上来说，是利用函数来防止抖动。在执行触发事件的情况下，元素的位置或尺寸属性快速地发生变化，造成页面回流，出现元素抖动的现象。通过函数防抖，**使得元素的位置或尺寸属性延迟变化，从而减少页面回流**
::: tip ♻️回流与重绘
**回流**
- 当`render tree`中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(简单来说重新布局)。
- 每个页面至少需要一次回流，就是在页面第一次加载的时候。
**重绘**
-  当`render tree`中的一些元素需要更新属性，而这些属性**只是影响元素的外观，风格，而不会影响布局的**，比如`background-color`。则就叫称为重绘。

**回流必将引起重绘，而重绘不一定会引起回流。**
:::

当指针设备( 通常指鼠标 )在元素上移动时, mousemove 事件被触发。
```js
const debounce = (fn, wait=30) =>{
  return function() {
    clearTimeout(fn.timer)
    fn.timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}
```

### 函数节流
函数节流，即限制函数的执行频率，在持续触发事件的情况下，间断地执行函数；实现方法对应定时器管理的第一种策略，只要当前函数没有执行完成，任何新触发的函数都会被忽略
```js
const throttle = (fn, wait=100) =>{
  return function() {
    if(fn.timer) return
    fn.timer = setTimeout(() => {
      fn.apply(this, arguments)
      fn.timer = null
    }, wait)
  }
}
```

## 立即执行函数
- 立即执行函数指函数定义时立即执行
- 可以用来定义私有作用域防止污染全局作用域

```js
"use strict";
(function () {
    var web = 'jc-sir.github.io';
})();
console.log(web);        //web is not defined
```

使用 let/const 有块作用域特性，所以使用以下方式也可以产生私有作用域
```js
{
    let web = "jc-sir.github.io";
}
console.log(web) //web is not defined
```
## 函数提升
**函数也会提升到前面，函数名称和函数体都提升，优先级大于 `var` 变量提高**

```js
console.log(web()); //jc-sir.github.io
function web() {
	return 'jc-sir.github.io';
}
```

**函数表达式/变量声明的函数不会被提升**
```js
console.log(sum(3)); //4
function sum(num) {
  return ++num;
}

var sum = function(num) {
  return `sum = ${num}`;
};
```

## 参数为函数
函数可以做为参数传递
```js
function filterFun(item) {
	return item <= 3;
}
let test = [1, 2, 3, 4, 5].filter(filterFun);
console.log(test); //[1,2,3]
```

## 箭头函数
- 箭头函数是函数声明的简写形式，在使用递归调用、构造函数、事件处理器时不建议使用箭头函数。

基本格式
```js
//最简单的箭头函数
 () => {} 

// 使用函数表达式
let fn1 = () => {
    console.log('这是箭头函数')
}
// 等同 
let fn1 = function {
    console.log('这是箭头函数')
}
fn1()  // 函数调用
```

- 只有一个参数时可以省略括号
- 没有参数或者多余一个参数时 () 不可省略
```js
let test = num =>{ console.log(num) } 
test(1); // 1
```

- 多参数传递与普通声明函数一样使用逗号分隔
- 单一表达式 ``return`` 可以省略
```js
let sum = (num1,num2) => num1+num2;
sum(1,4); // 5
```
- 如果多于一条语句，或者是返回值是一个字面量对象 {}，那么函数的{}就不能省略了

```js
// let fn6 = (x,y) => {a:x,b:y}  //这样是错误的 这里的{}是函数的{}

// 正确示例
var fn6 = (x,y) => {return {a:x,b:y}}
fn6(1,3)  // {a: 1, b: 3}

let fn5 = (x,y) =>{
    return {
        x,     
        y
    }
}
console.log(fn5(1,2))  //{x: 1, y: 2}
```

## 回调函数
回调是作为参数传递给另一个函数并在其父函数完成后执行的函数。

```js
let add = ([1, 2, 3]).map(item => item + 10);
console.log(add) // [11, 12, 13]
```

举一个别人举过的例子:约会结束后你送你女朋友回家,离别时,你肯定会说:"到家了给我发条信息,我很担心你。" 对不,然后你女朋友回家以后还真给你发了条信息。小伙子,你有戏了。其实这就是一个回调的过程。你留了个参数函数（要求女朋友给你发条信息）给你女朋友,然后你女朋友回家,女朋友回家的动作是主函数。她必须先回到家以后,主函数执行完了,再执行传进去的函数,然后你就收到一条信息了。

```js
function funcA(callback){
	callback();
	console.log('我是主函数执行的语句！');
};
function funcB(){
	setTimeout("console.log('我是回调函数')", 3000);//模仿耗时操作
}
 funcA(funcB);

// 我是主函数执行的语句！
// undefined
// 我是回调函数
```

定义主函数的时候,我们让代码先去执行callback()回调函数,但输出结果却是``后输出回调函数``的内容。

这就说明了主函数不用等待回调函数执行完,可以接着执行自己的代码。

所以一般回调函数都用在耗时操作上面。比如ajax请求,比如处理文件等。


## 递归调用
递归指函数内部调用自身的方式。

递归实现阶乘或求和

```js
// 阶乘
function recursion(num){
    return num==1?1:num*recursion(--num);
}
console.log(recursion(5))  //120

// 数字求和1-n
function recursion(num){
    return num==1?1:num+recursion(--num);
}
console.log(recursion(100))  //5050

// 数组求和
var arr = [1,2,3,4,5,5];
function recursion(...arr){
    if(arr.length == 0){
        return 0;
    }
   return arr.pop()+recursion(...arr)
}
console.log(recursion(...arr))  //20
// 简化后
function recursion(...arr){
   return arr.length == 0?0:arr.pop()+recursion(...arr)
}
```
