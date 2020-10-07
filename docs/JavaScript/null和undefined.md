# null和undefined

- null是一个**表示无的对象**，转为数值时为 `0`；
- undefined是一个**表示无的原始值**，转为数值时为NaN

::: danger
目前null和undefined基本是同义的，都是原始类型，且只有一些细微的差别
:::

## undefined

Undefined类型只有一个值，就是undefined。当声明的变量未初始化时，该变量的默认值是undefined。所以一般地，undefined表示变量没有初始化

```js
var a;      //undefined
console.log(a == undefined);  //true
```
【出现场景】

### 【1】已声明未赋值的变量
```js
var i;
console.log(i); // undefined
```
### 【2】获取对象不存在的属性
```js
var o = {};
console.log(o.p); // undefined
```
### 【3】无返回值的函数的执行结果
```js
function f(){};
console.log(f()); // undefined
```
### 【4】函数的参数没有传入
```js
function f(x){return x;}
console.log(f()); // undefined
```
### 【5】void(expression)
```js
console.log(void(0)); // undefined
```

### undefined类型转换
```js
Boolean(undefined):　 false
Number(undefined):　  NaN
String(undefined):　　'undefined'  
```

### undefined类型鉴别
**鉴别undefined类型，使用typeof运算符即**
```js
console.log(typeof undefined);   // 'undefined'
console.log(typeof 'undefined'); // 'string'
```

::: tip
**[注意]**由于`undefined`并不是一个关键字，其在IE8-浏览器中会被重写，在高版本函数作用域中也会被重写；所以可以用`void 0` 来替换`undefined`
:::

```js
var undefined = 10;
console.log(undefined); // IE8-浏览器下为10，高版本浏览器下为undefined
```
```js
function t(){
    var undefined = 10;
    console.log(undefined);
}
console.log(t());//所有浏览器下都是10
```
## null
Null类型只有一个值，就是`null`。`null`是javascript语言的关键字，它表示`一个特殊值`，常用来描述 **空值**

> 逻辑角度看，null值表示一个空对象指针
```js
console.log(document.getElementById('jc')); // null
```
::: danger
[注意] **null** 是空对象指针，而 **[]** 是空数组，**{}** 是空对象，三者不相同
:::

```js
console.log(typeof null);//'object'
```
不同的对象在底层都表示为二进制，在javascript中二进制前三位都为0会被判断为object类型，null的二进制表示是全0，所以执行typeof时返回'object'

尽管null和undefined是不同的，但它们都表示"值的空缺"，null表示"空值"，undefined表示"未定义"。两者往往可以互换。判断相等运算符==认为两者是相等的

```js
console.log(null == undefined);//true
```
::: tip
实际上，因为undefined和null不是构造器类型，所以它们没有任何的属性和方法，使用.和[]来存取这两个值的成员或方法都会产生一个类型错误
:::

### null类型转换
```js
Boolean(null): 　　false
Number(null):　　  0
String(null): 　　 'null'
```
### 类型鉴别
::: tip
鉴别null类型，使用typeof运算符不可行，因为该运算符会返回'object'，null被认为是空对象指针

判断一个值是否为null类型的最佳方法是直接和null进行恒等比较
:::
```js
console.log(typeof null);//'object'
console.log(null === null);//true
console.log(undefined === null);//false
console.log('null' === null);//false
```
















