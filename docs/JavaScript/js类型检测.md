# Javascript 类型检查
- 值类型(基本类型)：String、Number、Boolean、Null、Undefined、Symbol(Es6新增)。
- 引用数据类型：Object、Array、Function。

## typeof
Typeof 可能是最多人所熟知的判断类型的方法，但是它并不完美，在有些情况下它的判断是有偏差的.

代码示例：

```js {5}
// 首先判断基本类型
typeof 1                // number
typeof 'Hellow world !' // string
typeof true             // boolean
typeof null             // object
typeof undefined        // undefined

let s = Symbol()
typeof s                // symbol
```
::: danger 👾
null 的判断出了错误
:::

```js
const _obj = Object.create(null)
function foo() {}
const _arr = []
const _set = new Set()
const _weakset = new WeakSet()
const _map = new Map()
const _weakmap = new WeakMap()

typeof _obj      // object
typeof foo       // function
typeof _arr      // object
typeof _set      // object
typeof _weakset  // object
typeof _map      // object
typeof _weakmap  // object
```
以上示例 typeof 在判断引用类型的时候并不能区分除了 function 以外其他类型的区别。这就要了解下面的原理啦！！！↩️

### typeof 原理
::: tip 小提示💁
先看看js如何存储数据类型的。
:::

JavaScript 在底层储存变量时出于性能考虑会把数据的类型用前三位表示，**typeof 就是通过前三位来判断类型**：
- 000: 对象
- 001: 整数
- 010: 浮点数
- 100: 字符串
- 110: 布尔

两个特殊类型：

- undefined: -2^30
- null: 全是 0

**因为 `null` 的机器码是全 `0`，它的类型标签自然就是 `000`，所以 `typeof null` 返回`object`。**

## instanceof
`instanceof` 是有局限性的，它要求判断的目标必须是一个对象，与此同时 `instanceof` 的原理是判断只要右边的 `prototype`出现在左边的原型链上就返回 true。所以说 instanceof 是**判断一个实例是否是其父类型或者祖先类型的实例**更为恰当。

代码的基本实现：
```js
function instance_of(L, R) {    // L 表示左表达式，R 表示右表达式
 var O = R.prototype;           // 取 R 的显示原型
 L = L.__proto__;               // 取 L 的隐式原型
 while (true) { 
   if (L === null) 
     return false; 
   if (O === L)                 // 当 O 严格等于 L 时，返回 true 
     return true; 
   L = L.__proto__; 
 } 
}
```
代码示例🎊
```js
const obj1 = Object.create(null)
const obj2 = {}

obj1 instanceof Object   // false
obj2 instanceof Object   // true
```

obj1 是通过`Object.create(null)`来创建的，它原型链上什么都没有：

而直接通过`{}`赋值生成的对象它的`_proto_`是指向 Object 的：
```js
const obj = {}
// 等同于下面
const obj = Object.create(Object.prototype)
```

## Object.prototype.toString.call()
目前比较全面的类型判断方法

```js
Object.prototype.toString.call(null)              // "[object Null]"
Object.prototype.toString.call(undefined)         // "[object Undefined]"
Object.prototype.toString.call(123)               // "[object Number]"
Object.prototype.toString.call(true)              // "[object Boolean]"
Object.prototype.toString.call('Hellow world !')  // "[object String]"
Object.prototype.toString.call({ a: 123 })        // "[object Object]"
Object.prototype.toString.call(Symbol())          // "[object Symbol]"
Object.prototype.toString.call([1, 2, 3])         // "[object Array]"
Object.prototype.toString.call(function a() {})   // "[object Function]"
Object.prototype.toString.call(new Date())        // "[object Date]"
Object.prototype.toString.call(Math)              // "[object Math]"
Object.prototype.toString.call(new Set())         // "[object Set]"
Object.prototype.toString.call(new WeakSet())     // "[object WeakSet]"
Object.prototype.toString.call(new Map())         // "[object Map]"
Object.prototype.toString.call(new WeakMap())     // "[object WeakMap]"
```

**封装方法**
```js
function getClass (a) {
  const str = Object.prototype.toString.call(a)
  return /^\[object (.*)\]$/.exec(str)[1]
}
```
原理参考[谈谈 Object.prototype.toString](https://segmentfault.com/a/1190000009407558)