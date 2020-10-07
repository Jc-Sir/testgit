# Number
什么是number数据类型?

> 有效数字（正数、负数、0）NaN(not a number)可以理解为非有效数字

## 声明定义

使用 ``new`` 关键字

```js
let num = new Number(5);
console.log(num+5); // 10

new Number(value); 
var a = new Number('123');  // a === 123 is false
var b = Number('123');      // b === 123 is true
a instanceof Number;        // is true
b instanceof Number;        // is false
```

**参数**

被创建对象的数字值。

**描述**

- 如果参数无法被转换为数字，则返回 NaN。
- 在非构造器上下文中 (如：没有 new 操作符)，Number 能被用来执行类型转换。

## 基本方法

### isNaN()
确定传递的值是否是 NaN。
```js
console.log(Number("houdunren")); //NaN
console.log(2 / 'houdunren'); //NaN
```
### isInteger()
确定传递的值类型是 ``Number``，且是整数。
```js
console.log(Number.isInteger(1.2));  // false
```
###  toFixed()
指定返回的小数位数可以四舍五入 

使用 toFixed 可对数值舍入操作，参数指定保存的小数位
```js
console.log((18.756).toFixed(2)); // 18.76
console.log(1.55236.toFixed(4));  // 1.5524
```
### isFinite()
确定传递的值类型及本身是否是有限数。

### isSafeInteger()
确定传递的值是否为安全整数 ( -(`2^53` - 1) 至 `2^53` - 1之间)。

### parseFloat()
和全局对象 parseFloat() 一样

转换字符串为浮点数，忽略字符串前面空白字符。
```js
console.log(parseInt('  99jc'));	//99
console.log(parseInt('18.55'));	//18.55
```

### parseInt()
和全局对象 parseInt() 一样。

提取字符串开始去除空白后的数字转为整数。
```js
console.log(parseInt('  99jc'));	//99
console.log(parseInt('18.55'));	//18
```


## 类型转换
使用Number函数基本上可以转换所有类型

```js
console.log(Number('testString')); //NaN
console.log(Number(true));	//1
console.log(Number(false));	//0
console.log(Number('9'));	//9
console.log(Number([]));	//0
console.log(Number([5]));	//5
console.log(Number([5, 2]));	//NaN
console.log(Number({}));	//NaN
```

## 浮点精度问题
大部分编程语言在浮点数计算时都会有精度误差问题

```js
let num = 0.1 + 0.2
console.log(num)// 结果：0.30000000000000004
```

因为计算机以二进制处理数值类型，上面的0.1与0.2转为二进制后是无穷的

```js
console.log((0.1).toString(2)) //0.0001100110011001100110011001100110011001100110011001101
console.log((0.2).toString(2)) //0.001100110011001100110011001100110011001100110011001101
```

### 处理方式

一种方式使用toFixed 方法进行小数截取

```js
console.log((0.1 + 0.2).toFixed(2)) //0.3
console.log(1.0 - 0.9) //0.09999999999999998
console.log((1.0 - 0.9).toFixed(2)) //0.10
```
将小数转为整数进行计算后，再转为小数也可以解决精度问题

```js
Number.prototype.add = function (num) {
	//取两个数值中小数位最大的
  let n1 = this.toString().split('.')[1].length
  let n2 = num.toString().split('.')[1].length
  //得到10的N次幂
  let m = Math.pow(10, Math.max(n1, n2))
  return (this * m + num * m) / m
}
console.log((0.1).add(0.2))
```

### 推荐做法

市面上已经存在很多针对数学计算的库 mathjs 、decimal.js 等，我们就不需要自己构建了。下面使用 decimal.js 进行浮点计算。

```
<script src="https://cdn.bootcss.com/decimal.js/10.2.0/decimal.min.js"></script>

<script>
	console.log(Decimal.add(0.1, 0.2).valueOf())
</script>
```
