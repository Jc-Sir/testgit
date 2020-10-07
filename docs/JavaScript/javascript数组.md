# JavaScript数组

## 什么是数组？
**数组对象是使用单独的变量名字来存储一系列的值。值的有序集合**

## 创建数组

### 显式构造方法
以下是三种调用构造函数Array()的三种方式

#### 调用时没有参数
**该方式相当于创建一个没有任何元素的空数组。**

代码示例
```js {1}
var myCars=new Array();  //空数组   =>  等同于 var myCars = []; 
myCars[0]="Saab";        //向空数组里面添加元素
myCars[1]="Volvo";
myCars[2]="BMW";
```

#### 调用时有一个参数
> 该方式用于创建指定长度的数组，用于预分配一个数组空间，注意的是数组没有存储

::: warning
该方式的数组并没有存储值，甚至连数组的索引属性  "0","1"等还为定义
:::
```js
var arr = new Array(10)
// [empty × 10]
```

#### 调用时两个或多个参数
> 两个或多个参数时，构造函数的参数会成为新数组的元素。

```js
var myCars=new Array("Saab","Volvo","BMW");
// ["Saab","Volvo","BMW"]
```
### 隐式数组构造方法 
> 使用数组直接量是创建数组的最简单的方法，在方括号中将数组元素用逗号隔开即可
```js
var myCars=["Saab","Volvo","BMW"];
// ["Saab","Volvo","BMW"]
```
数组元素可以是任意表达式/对象直接量/数组直接量
```js
var a = 1;
var b = [a,a+1,a+2,{x:1,y:2},[4,5]];
// 0: 1
// 1: 2
// 2: 3
// 3: {x: 1, y: 2}
// 4: (2) [4, 5]
```

### ES6的一些方法
 #### Array.of()
> 返回由所有参数组成的数组，不考虑参数的数量或类型，如果没有参数就返回一个空数组

```js
// of() 可以解决上述构造器因参数个数不同，
// 导致的行为有差异的问题(参数只有一个数值时，构造函数会把它当成数组的长度)。

Array.of(1,2,3); // [1,2,3]
Array.of(1,{a:1},null,undefined) // [1, {a:1}, null, undefined]

// 只有一个数值参数时
let B = new Array(3);   // (3) [empty × 3]
let C = Array.of(3);    // [3]
```

#### Array.from()
> 从一个类数组或可迭代对象中创建一个新的数组

参数：
- 第一个参数：想要转换成数组的类数组或可迭代对象
- 第二个参数（可选）：回调函数，类似数组的map方法，对每个元素进行处理，将处理后的值放入返回的数组。
- 第三个参数（可选）：绑定回调函数的this对象 

```js
// 有length属性的类数组
Array.from({length：5},(v,i) => i)     //[0, 1, 2, 3, 4]

// 部署了Iterator接口的数据结构 比如:字符串、Set、NodeList对象
Array.from('hello')    // ['h','e','l','l','o']
Array.from(new Set(['a','b']))   // ['a','b']

// 传入一个数组生成的是一个新的数组，引用不同，修改新数组不会改变原数组
let arr1 = [1,2,3]
let arr2 = Array.from(arr);
arr2[1] = 4;
console.log(arr1,arr2)
//[1, 2, 3] [1, 4, 3]
```

**数组合并后去重**
```js
//数组合并去重
function combine(){
    let arr = [].concat.apply([], arguments);  
    //没有去重复的新数组，之后用Set数据结构的特性来去重
    return Array.from(new Set(arr));
}

var m = [1, 2, 2], n = [2,3,3];
console.log(combine(m,n));
```
## 数组元素的读写
**使用 `[]` 操作符访问数组元素**

::: tip
方括号中是一个返回非负整数值的任意表达式

数组是对象的特殊形式

当值无未查到返回 `undefined`
:::

```js
var arr = [1];
    arr[0];      //读取第一个元素
    arr[1] = 2;  // 写入第二个元素
    arr[2] = 3;  // 写入第三个元素
    let  i = 1;
    arr[i+1];    // 3
// arr [1, 2, 3]
```
## 稀疏数组
> 包含从0开始的不连续索引的数组。

::: tip
通常数组的length属性值代表数组元素的个数

稀疏数组的length属性值❗️大于❗元素的个数️
:::

### 构建稀疏数组的方法
- Array()构造函数
```js
let arr  = new Array(5);  // 数组没有元素，length 为5

a = [];      // 创建一个空数组
a[100] = 0;  // 赋值添加一个元素，设置的length为101 
```
- delete 操作符产生稀疏数组

::: warning
当在数组直接量中省略值时是不会产生稀疏数组的

缺省的值在数组中是存在的，值为undefined
:::

**压缩稀疏数组的空缺**
```js
// sparse 待压缩的稀疏数组
var dense = sparse.filter((currentValue)=>{ return true; });
```

**压缩稀疏数组的空缺，并且删除 undefined 和 null 元素**
```js
var dense = sparse.filter((currentValue) => { 
	return currentValue !== undefined && currentValue!= null;
})
```
## 数组检测方式
### typeof() [x]
使用最常用的类型检测工具——typeof运算符
```js
var arr = [1,2,3];
console.log(typeof arr); // 'object'
```
::: danger [注意]
- 数组的本质是一种特殊的对象，所以返回'object'。
- typeof运算符**只能用来区分原始类型和对象类型**，对于更具体的对象类型是无法鉴别出来的
:::

### instanceof 
- instanceof运算符用来判断一个对象是否是特定构造函数的实例
- instanceof操作符只能用于简单数组检测的情形

```js
var arr = [1,2,3];
console.log(arr instanceof Array);//true

var str = '123';
console.log(str instanceof Array);//false
```

### toString()
过引用Object的toString()方法来检查对象的类属性，对数组而言该属性的值总是"Array"
```js
var arr = [1,2,3];
console.log(Object.prototype.toString.call(arr) === '[object Array]');//true
// 定义识别函数
function type(obj){
    return Object.prototype.toString.call(obj).slice(8,-1).toLowerCase();
}
var arr = [1,2,3];
console.log(type(arr));//'array'
```

### isArray()
用于确定传递的值是否是一个 Array。

**语法 Array.isArray(obj)**
```js
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
Array.isArray(new Array('a', 'b', 'c', 'd'))
// 鲜为人知的事实：其实 Array.prototype 也是一个数组。
Array.isArray(Array.prototype); 

// 下面的函数调用都返回 false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray(new Uint8Array(32))
Array.isArray({ __proto__: Array.prototype });
```

## 对象继承方法
### toString()
**返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串**
::: warning [注意]
该方法的返回值与不使用任何参数调用join()方法返回的字符串相同
:::

```js
[1,2,3].toString();       //'1,2,3'
['a','b','c'].toString(); //'a,b,c'
[1,[2,'c']].toString();   //'1,2,c'
```
### toLocaleString()
- toLocaleString()是toString()方法的本地化版本，经常返回与toString()方法相同的值，但也不总如此

- 如果数组中的某一项的值是`null`或者`undefined`，则该值在toLocaleString()和toString()方法返回的结果中以空字符串表示
```js
var colors = [1,undefined,2,null,3];
console.log(colors.toString());       //'1,,2,,3'
console.log(colors.toLocaleString()); //'1,,2,,3'
```

### valueOf()
**valueOf()方法返回数组对象本身**
```js
var arr = [1, 2, 3];
console.log(arr.valueOf());                   // [1, 2, 3]
console.log(arr.valueOf() instanceof Array);  // true
console.log(arr.valueOf() === arr);           // true
```

## 数组转换方法

### join()
- Array.join()方法是String.split()方法的逆向操作，后者`【split()】`是将字符串分割成若干块来创建一个数组
- 数组继承的toLocaleString()和toString()方法，在默认情况下都会以逗号分隔的字符形式返回数组项；
- join()方法可以使用不同的分隔符来构建这个字符串，join()方法只接收一个参数，用作分隔符的字符串
- **返回包含所有数组项的字符串**

::: danger 注意
如果不给join()方法传入任何值，则使用逗号作为分隔符
:::

```js
var a = [1,2,3];
console.log(a.join());      //'1,2,3'
console.log(a.join(' '));   //'1 2 3'
console.log(a.join(''));    //'123'

var b = new Array(10);
b.join('-');//'---------'，9个连字符组成的字符串
```
**若join()方法的参数是undefined，标准浏览器以逗号为分隔符返回字符串，而IE7-浏览器以'undefined'为分隔符返回字符串**

```js
//标准浏览器为'1,2,3';IE7-浏览器为'1undefined2undefined3'
var a = [1,2,3];
console.log(a.join(undefined));
```

**如果数组中的某一项的值是null或者undefined，则该值在join()方法返回的结果中以空字符串表示**
```js
var colors = [1,undefined,2,null,3];
console.log(colors.join());         //'1,,2,,3'
```

**该方法也可以用于类数组对象上**
```js
console.log(Array.prototype.join.call('hello', '-'));   // "h-e-l-l-o"
var obj = { 0: 'a', 1: 'b', length: 2 };
console.log(Array.prototype.join.call(obj, '-'));       // 'a-b'
```
::: danger [注意]
若对象没有length属性，就不是类数组，也就不能调用数组的方法
:::

```js
var obj = { 0: 'a', 1: 'b' };
console.log(Array.prototype.join.call(obj, '-'));       //''
```

**使用join()方法可以创建重复某些字符N次的函数,同Es6中字符串repeat(n)方法**
```js
function repeatString(str,n){
    return new Array(n+1).join(str);
}
console.log(repeatString('a',3));   //'aaa'
console.log(repeatString('ha',3));  //'hahaha'
```

### split()
::: danger 超级警告
🙅 准确的说这是字符串的方法 ⚠️
:::
> 将字符串分割成数组，类似join方法的反函数。
```js
let price = "I,Love,Js";
console.log(price.split(",")); //["I", "Love", "Js"]
```


## 栈和队列方法
- 栈是一种LIFO(Last-In-First-Out，后进先出)的数据结构，也就是最新添加的项最早被移除。而栈中项的插入(叫做推入)和移除(叫做弹出)，只发生在一个位置——栈的顶部。javascript为数组专门提供了push()和pop()方法，以便实现类似栈的行为

- 队列数据结构的访问规则是FIFO(First-In-First-Out，先进先出)。队列在列表的末端添加项，从列表的前端移除项。结合使用shift()和push()方法，可以像使用队列一样使用数组


### push()
- push()方法可以接收任意数量的参数，把它们逐个添加到数组末尾。
- **返回修改后数组的长度。**
- **会改变原数组**
::: tip
只要一个参数时该方法等同与给arr[arr.length]赋值
:::
```js
//  示例代码
let arr = [1,2,3];
let length = arr.push('末尾1','末尾2'); // 返回数组长度
console.log(arr,length)                 // [1, 2, 3, "末尾1", "末尾2"]  5
```

**如果需要合并两个数组，可以使用apply方法**
```js
var a = [1, 2, 3];
var b = [4, 5, 6];
console.log(a,Array.prototype.push.apply(a, b)); // [1,2,3,4,5,6] 6
```
::: danger [注意]
如果使用call方法，则会把数组b整体看成一个参数。
:::
```js {1}
console.log(a,Array.prototype.push.call(a, b)); // [1,2,3,[4,5,6]] 4
```

**push()方法也可以向对象中添加元素，添加后的对象变成类数组对象，即新加入元素的键对应数组的索引，并且对象有一个length属性**

```js
var obj = {a: 1};
console.log(obj,[].push.call(obj, 2));    // {a:1, 0:2, length: 1}
console.log(obj,[].push.call(obj, [3]));  // {a:1, 0:2, 1:[3], length: 2}
```

### pop()
- 从数组末尾移除最后一项，减少数组的length值
- 然后**返回移除的项**
- **会改变原数组**

参数：无
```js
//组合使用push()和pop()能够用JavaScript数组实现先进后出的栈
let stack = [];
stack.push(1,2) // 返回长度2，    这时stack的值是[1,2]
stack.pop()     // 返回删除的值2，这时stack的值是[1]
```
::: tip
删除数组末尾元素也可通过设置数组长度【length】属性
达到一样的效果
:::

```js {2}
var arr = [1,2,3,4,5];
arr.length = arr.length-1;
arr;  // [1,2,3,4]
```
**对空数组使用pop()方法，不会报错，而是返回undefined**
```js
var a = [];
console.log(a,a.pop());   // [] undefined
```

### shift()
- 删除数组的第一个元素并将其返回，同时数组的长度减1,然后把所有随后的元素下移一个位置来填补数组头部的空缺，
- 💛返回值是删除的元素,如果数组为空则返回undefined💚
- **会改变原数组**
- 参数 ： 无
```js
let arr = [1,2,3];
let item = arr.shift(); // 返回删除的值1
console.log(arr, item)  // [2, 3] 1
```

### unshift()
- 在数组的头部添加一个或多个元素，并将已存在的元素移动到更高索引的位置来获得足够的空间
- 最后📐**返回数组新的数组长度**✒️。
- **会改变原数组**

::: tip
- 当使用多个参数调用unshift()时，参数是一次性插入的而非一次一个地插入。
- 这意味着最终的数组中插入的元素的顺序和它们在参数列表中的顺序一致
:::

```js
let arr = [3,4,5];
let length = arr.unshift(1,2);  // 返回长度是5
console.log(arr, length)        // [1, 2, 3, 4, 5] 5

```
::: danger [注意]
在IE7-浏览器中，unshift()方法返回的总是undefined
:::

```js
//标准浏览器下，返回[1] 1；而IE7-浏览器下，返回[1] undefined
var a = [];
console.log(a,a.unshift(1));
```

## 数组排序方法
数组中存在两个可以直接用来重排序的方法: reverse()和sort() 

### reverse()
- 用于反转数组的顺序
- **返回经过排序之后的数组**
- 参数 ：无
- **会改变原数组**

```js
let arr = [1,2,3];
arr.reverse()   // arr是[3,2,1]，返回值是[3,2,1]
```


### sort()
- 默认情况下，sort()方法按字符串升序排列数组项，sort方法会调用每个数组项的toString()方法，比较它们的UTF-16代码单元值序列时构建的顺序
- **返回经过排序之后的数组**
- **会改变原数组**

::: danger [注意]
取决于具体实现，因此无法保证排序的时间和空间复杂性。
:::

#### 如果数组包含undefined元素，它们会被排到数组的尾部
```js
var array = ['3',3,undefined,2,'2'];
console.log(array,array.sort()); 
//["2", 2, "3", 3, undefined] ["2", 2, "3", 3, undefined]
```

#### 带参数的sort
- sort()方法可以接受一个比较函数作为参数，以便指定哪个值在哪个值的前面。
- 比较函数接收两个参数  `arr.sort([compareFunction])`
- 如果第一个参数应该位于第二个参数之前则返回一个负数
- 如果两个参数相等则返回0，
- 如果第一个参数应该位于第二个参数之后则返回一个正数

::: tip [提示]
- compareFunction 可选
- 用来**指定按某种顺序**进行排列的函数。
- 如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
:::

返回值：**排序后的数组。请注意，数组已原地排序，并且不进行复制。**

```js
// 比较函数格式
function compare(a, b) {
  if (a < b ) {  // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
  if (a > b ) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
```
**要比较数字而非字符串，比较函数可以简单的以 `a` 减 `b`，如下的函数将会将数组升序排列**

```js
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);   // [1, 2, 3, 4, 5]
// 也可以写成：
var numbers = [4, 2, 5, 1, 3]; 
numbers.sort((a, b) => a - b); 
console.log(numbers);   // [1, 2, 3, 4, 5]
```

**数组对象根据某个属性进行排序**
```js
var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 }
];
// sort by value
items.sort((a, b)=> {
  return (a.value - b.value)
});
// sort by name
items.sort((a, b)=> {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0; // names must be equal
});
```
**使用sort()方法创建一个随机数组**
```js
function compare(){
    return Math.random() - 0.5;
}
var array = [1,2,3,4,5];
console.log(array.sort(compare));
```
## 数组拼接方法
### concat()
- concat()方法基于当前数组中的所有项创建一个新数组，先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，
- **返回新构建的数组。**
- 🎶不改变原数组➰

```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2).concat([1,2,3]);

console.log(array3);
//  ["a", "b", "c", "d", "e", "f", 1, 2, 3]
```

#### 不提供参数
- 复制当前的数组
- 返回当前数组的一个浅拷贝
::: tip  [注释]
所谓🔵**浅拷贝**🔴,指的是如果数组成员包括复合类型的值（比如对象），则新数组拷贝的是该值的引用
:::
示例说明
```js
//该方法实际只复制了数组的第一维，数组第一维存放的是第二维的引用，而第二维才是实际存放他们的内容
var numbers = [1,2];
var newNumbers = numbers.concat();
console.log(numbers,newNumbers);  // [1,2] [1,2]
numbers[0] = 0;
console.log(numbers,newNumbers);  // [0,2] [1,2]

var numbers = [[1,2]];
var newNumbers = numbers.concat();
console.log(numbers,newNumbers);  // [[1,2]] [[1,2]]
numbers[0][0] = 0;
console.log(numbers,newNumbers);  // [[0,2]] [[0,2]]
```

```js
  var numbers = [1,2];
  numbers.concat();                 // [1,2]
  numbers.concat() === numbers;     // false
```

### 一个或多个参数
- 参数可以是具体的值
- 参数可以是数组对象

**concat()方法也可以用于将对象合并为数组，但是必须借助`call()`方法**
```js
var newArray = Array.prototype.concat.call({ a: 1 }, { b: 2 })
console.log(newArray);      // [{ a: 1 }, { b: 2 }]
console.log(newArray[0].a); //1
```

## 创建子数组
### slice()
- 选择的数组的一部分浅拷贝到一个新数组对象。
- **返回一个从开始到结束⚠️不包括结束⚠️被提取元素** 的新数组
- **不改变原数组**

**语法：arr.slice([begin[, end]])**

#### 参数begin [可选]

- 如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取，slice(-2) 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。
- 如果省略 begin，则 slice 从索引 `0` 开始。
- 如果 `begin` 大于原数组的长度，则会**返回空数组**。

#### 参数end [可选]
- slice 会提取原数组中索引从 begin 到 end 的所有元素（包含 begin，但不包含 end）。
- 如果该参数为负数， 则它表示在原数组中的倒数第几个元素结束抽取。 slice(-2,-1) 表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。
- 如果 end 被省略，则 slice 会一直提取到原数组末尾。
- 如果 end 大于数组的长度，slice 也会一直提取到原数组末尾。
```js
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
var citrus = fruits.slice(1, 3);

// fruits contains ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango']
// citrus contains ['Orange','Lemon']
```
**可以使用slice()方法将类数组对象变成真正的数组**
```js
var arr = Array.prototype.slice.call(arrayLike);
Array.prototype.slice.call({ 0: 'a', 1: 'b', length: 2 })    // ['a', 'b']
Array.prototype.slice.call(document.querySelectorAll("div"));
Array.prototype.slice.call(arguments);
```

## 数组删改方法
### splice()
- 在数组中插入或删除元素的通用方法
- **返回一个由删除元素组成的数组，或者如果没有删除元素就返回一个空数组**
- **会改变原数组**

**语法 array.splice(start[, deleteCount[, item1[, item2[, ...]]]])**

参数说明：

#### start
- 指定修改的开始位置（从0计数）。
- 如果超出了数组的长度，则从数组末尾开始添加内容；
- 如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于array.length-n）；
- 如果负数的绝对值大于数组的长度，则表示开始位置为第0位。

#### deleteCount 可选
- 整数，表示要移除的数组元素的个数。
- 如果 **deleteCount 大于 start 之后的元素的总数**，则从 start 后面的元素都将被删除(含第 start 位)。
- 如果 **deleteCount被省略**了，或者它的值大于等于array.length - start(也就是说，如果它大于或者等于start之后的所有元素的数量)，那么start之后数组的所有元素都会被删除。
- 如果 deleteCount 是 `0` 或者`负数`，则不移除元素。这种情况下，至少应添加一个新元素。

- **返回值：由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组。**

示例代码：

示例一、

**从第 2 位开始删除 0 个元素，插入"drum"**
```js
var myFish = ["angel", "clown", "mandarin", "sturgeon"];
var removed = myFish.splice(2, 0, "drum"); // 第二个参数deleteCount为0
// 运算后的 myFish: ["angel", "clown", "drum", "mandarin", "sturgeon"]
```

示例二、

**从第 2 位开始删除 0 个元素，插入"drum" 和 "guitar"**

```js
// 被删除的元素: [], 没有元素被删除
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2, 0, 'drum', 'guitar');

// 运算后的 myFish: ["angel", "clown", "drum", "guitar", "mandarin", "sturgeon"]
// 被删除的元素: [], 没有元素被删除
```

示例三、

**从第 3 位开始删除 1 个元素**
```js
var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = myFish.splice(3, 1);

// 运算后的 myFish: ["angel", "clown", "drum", "sturgeon"]
// 被删除的元素: ["mandarin"]
```

示例四、

**从第 2 位开始删除 1 个元素，插入"trumpet"**

```js
var myFish = ['angel', 'clown', 'drum', 'sturgeon'];
var removed = myFish.splice(2, 1, "trumpet");

// 运算后的 myFish: ["angel", "clown", "trumpet", "sturgeon"]
// 被删除的元素: ["drum"]
```

示例五、

**从第 0 位开始删除 2 个元素，插入"parrot"、"anemone"和"blue"**

```js
var myFish = ['angel', 'clown', 'trumpet', 'sturgeon'];
var removed = myFish.splice(0, 2, 'parrot', 'anemone', 'blue');

// 运算后的 myFish: ["parrot", "anemone", "blue", "trumpet", "sturgeon"]
// 被删除的元素: ["angel", "clown"]
```

示例六、

**从第 2 位开始删除 2 个元素**

```js
var myFish = ['parrot', 'anemone', 'blue', 'trumpet', 'sturgeon'];
var removed = myFish.splice(myFish.length - 3, 2);

// 运算后的 myFish: ["parrot", "anemone", "sturgeon"]
// 被删除的元素: ["blue", "trumpet"]
```

示例七、
    
** 从倒数第 2 位开始删除 1 个元素**
```js
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(-2, 1);

// 运算后的 myFish: ["angel", "clown", "sturgeon"]
// 被删除的元素: ["mandarin"]
```
示例八、

**从第 2 位开始删除所有元素**
```js
var myFish = ['angel', 'clown', 'mandarin', 'sturgeon'];
var removed = myFish.splice(2);

// 运算后的 myFish: ["angel", "clown"]
// 被删除的元素: ["mandarin", "sturgeon"]
```
## 数组位置

### indexOf()
返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回`-1`。

**返回值: 首个被找到的元素在数组中的索引位置; 若没有找到则返回💢 -1 ⚠️**

```js
var num = [1,2,3,4,3,5,6,7];
console.log(num.indexOf("3")) // -1
console.log(num.indexOf(3))   //  2
```
#### 使用indexOf()对数组去重
```js
// 使用数组的indexOf /lastIndexOf方法去重
// 思路
// 1、	新建一个空数组
// 2、	利用数组的indexOf()方法
// 3、	循环遍历需要去重的数组
// 4、	判断新建的空数组里面是否存在需要去重的数组里面的元素
// 5、	如果使用indexOf()方法返回的是-1则将元素push到空数组里面

var arr = [1,2,3,4,5,3,4,2];
var newArr = [];
for(let i = 0; i<arr.length;i++){
	if(newArr.indexOf(arr[i])==-1){   //或者使用lastIndexOf()效果是一样的只是循环次数可能会多点
	newArr.push(arr[i]);
	}
}
console.log(newArr);
```

### lastIndexOf()
- 对数组元素的查找是从数组的末尾(索引默认为array.length-1)的位置开始向前查找。
- 返回要查找的项在数组中的最后一次出现的位置，或者在没找到的情况下返回`-1`。
## 循环遍历
### for
**根据数组长度结合for 循环来遍历数组**
```js
let web = [
	{title: '媒体查询响应式布局',category: 'css'},
  {title: 'FLEX 弹性盒模型',category: 'css'},
	{title: 'MYSQL多表查询随意操作',category: 'mysql'}
];
for (let i = 0; i < web.length; i++) {
 console.log(web[i].title)
}
```
### forEach()
- 从头到尾遍历数组，为每个元素调用指定的函数
```js
var carlist = ['兰博','奔驰','宝马'];
    carlist.forEach((item,index,arr) => {
    console.log('数组元素',item,"数组索引",index,"数组本身",arr)
})
```
### for/in 
- 一般会使用`for-in`来遍历对象的属性的,不过属性需要 `enumerable`,才能被读取到.
- for-in 循环只遍历可枚举属性。

**遍历时的 key 值为数组的索引**
```js
let jsArr = [
    {title:"String",category:"基本数据类型"},
    {title:"Object",category:"引用类型"},
    {title:"undefined",category:"基本数据类型"},
    {title:"var",category:"变量"},
    {title:"const",category:"常量"}
]
for(const key in jsArr){
  console.log(jsArr[key].title);
}
```
### for/of (ES6)
- for-of语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句。
- 只要是一个iterable的对象,就可以通过for-of来迭代。

**与 `for/in` 不同的是`for/of`每次循环取其中的值而不是索引**
```js
let jsArr = [
    {title:"String",category:"基本数据类型"},
    {title:"Object",category:"引用类型"},
    {title:"undefined",category:"基本数据类型"},
    {title:"var",category:"变量"},
    {title:"const",category:"常量"}
]
for(const key of jsArr){
    console.log(item.title);
}
```

::: danger [参数顺序]
参数的顺序是('数组元素'，'数组索引'，'数组对象本身')
:::

## 映射
### map()
**注意： map() 返回的是新数组，它不修改调用的数组【原数组】。如果是稀疏数组，返回的也是相同方式的稀疏数组：它具有相同的长度，相同索引的缺失元素(因为空值不会调用函数)**

**返回值：一个新数组，每个元素都是回调函数的结果**
```js
let number = [1,2,3];
let doubles = number.map((value)=>{
  return value * 2;
})
console.log(number, doubles) // [1,2,3] [2,4,6]
```
::: danger [注意]
- 不要用 map 代替 forEach,map 会创建一个新的数组，占用内存。
- 如果你不用 map 的返回值，那你就应当使用 forEach
:::

## 数组过滤方法
### filter()
- 返回的数组元素是调用的数组的一个子集。传入的函数时用来逻辑判定的，该函数返回 `true` 或 `false`,如果返回值为true或能转化为true的值，那么传递给判断函数的元素就是这个子集的成员，它将被添加倒一个作为返回值的数组中。

```js
var ArrObject = [
    {id:1,name:'苹果',type:'fruit'},
    {id:2,name:'白菜',type:'vegetable'},
    {id:3,name:'香蕉',type:'fruit'},
    {id:4,name:'冬瓜',type:'vegetable'},
];
// 需求1 将蔬菜和水果分开  (蔬菜方式相同)
var fruitArr = ArrObject.filter(item=>{
return item.type == 'fruit';
})
console.log(fruitArr)
 // {id: 1, name: "苹果", type: "fruit"}
 // {id: 3, name: "香蕉", type: "fruit"}

// 需求2 删除指定的香蕉这个对象
var delBanana = ArrObject.filter((item,key,index)=>{
return item.name == '香蕉'?false:true;
})
// 返回删除后的数组对象  
console.log(delBanana )

如果是return item.name == '香蕉'?true:false;
//返回的则是被删除的对象
```
#### 数组去重
```js
function removeRepeatArray(arr) {
  return arr.filter((item, index, self) => {
      return self.indexOf(item) === index;
  });
}
```
**返回值：一个新的通过测试的元素的集合的数组，如果没有通过测试则返回空数组**
## 数组检测
###  every()
> 测试数组的所有元素是否都通过了指定函数的测试。当且仅当针对数组中的所有元素调用判定函数都返回true，它才返回true

示例代码
```js
// 判断数组中的元素是否都大于40  如果全>40 返回true 否则false
function isBelowThreshold(currentValue) {
  return currentValue < 40;
}
var array1 = [1, 30, 39, 29, 10, 13];
console.log(array1.every(isBelowThreshold));
// expected output: true

// 或者
array1.every(item=>{
    return item<40;
})
// true
```
### some()
- 测试数组中的**某些元素**是否通过由提供的函数实现的测试。
- 当数组中至少有一个元素调用判定函数返回true，它就返回true， **并不会全部遍历，不做多余的活（性能优良）**
- 当且仅当数组中的**所有元素**调用判定函数都返回false，它才返回false。

**返回值:只要数组中的任意一个元素在回调函数中返回的是真值，就返回true，否则为false**

```js
var arr = [1,2,5,8,7,45];
arr.some(item=>{ return item>10}) // true
```
## 查找
### find
**🐠返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。🐇**
> 语法：arr.find(callback[, thisArg])
> callback函数带有3个参数：当前元素的值、当前元素的索引，以及数组本身。
```js
const arr = [5, 12, 8,17];
const found = item.find(item => item > 10);
console.log(found); // 12
```
### findIndex
**🥝它返回数组中找到的元素的索引🧀**

如果需要找到一个元素的位置或者一个元素是否存在于数组中，使用[💐Array.prototype.indexOf()🌷](#indexof) 或 [🎭Array.prototype.includes()🎨](#includes)。

### includes()
**用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。**
> 语法：arr.includes(valueToFind[, fromIndex])

- valueToFind => 需要查找的元素值
- fromIndex(可选) => 从fromIndex 索引处开始查找 valueToFind。如果为负值，则按升序从 array.length + fromIndex 的索引开始搜 （即使从末尾开始往前跳 fromIndex 的绝对值个索引，然后往后搜寻）。默认为 0。

```js
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true
```
::: danger [注意]
- 使用 includes()比较字符串和字符时是区分大小写的。
- 如果 fromIndex 大于等于数组的长度，则会返回 false，且该数组不会被搜索。
:::

## 数组归并
### reduce
- 使用 reduce 与 reduceRight 函数可以迭代数组的所有元素，reduce 从前开始 reduceRight 从后面开始。第一个参数是执行函数，第二个参数为初始值

- 传入第二个参数时将所有元素循环一遍
- 不传第二个参数时从第二个元素开始循环

函数参数说明如下

| 参数  | 参数说明                   |
|-------|----------------------------|
| pre   | 上次调用回调函数返回的结果 |
| cur   | 当前的元素值               |
| index | 当前的索引                 |
| array | 原数组                     |

统计元素在数组中出现的次数

```js
function countArrayELem(array, elem) {
  return array.reduce((total, cur) => (total += cur == elem ? 1 : 0), 0);
}

let numbers = [1, 2, 3, 1, 5];
console.log(countArrayELem(numbers, 1)); //2
```
取出数组中最大值

```js
function arrayMax(array) {
  return array.reduce(
  	(max, elem) => (max > elem ? max : elem), array[0]
  );
}
console.log(arrayMax([1, 3, 2, 9]));
```
## 数组拷贝
- 数组是一种特殊的对象
- 浅拷贝只复制一层对象的属性，并不会进行递归复制，而javascript存储对象都是存地址的，所以浅拷贝会导致对象中的子对象指向同一块内存地址；
- 而深拷贝则不同，它不仅将原对象的各个属性逐个复制出去，而且将原对象各个属性所包含的对象也依次采用深拷贝的方法递归复制到新对象上，拷贝了所有层级。
### 数组浅拷贝

```js
var arr1 = [1,2,3,4];
var arr2 = arr1;  
console.log(arr1===arr2)  // true 
arr2[0] = 10;  // 改变arr2影响了arr1  数组是用堆去保存的
arr1;          // [10,2,3,4]
```
####  数组遍历赋值
代码示例 
```js
var arr1 = [1,2,3];
var arr2  = arr1.forEach((value,index) =>{
    arr2[index] = value;
}) 
console.log(arr2); [1,2,3]  // 此刻arr2和arr1并不指向同一地址
// 改造成一个方法
function copyArray(arr){
  if(!Array.isArray(arr)){
    throw "参数不是数组类型"
  }else{
    let result = [];
    arr.forEach((value,index) => {
        result[index] = value;
        // 或者使用push入栈
        // result.push(value)
    }) ;
    // -----写法2------
    // for(var i = 0;i<arr.length;i++){
    //     result[i] = arr[i]
    // }
    return result;
  }  
}
var argarr = [1,2,3,{age:4,name:"Timi"}];
let resarr = copyArray(argarr); // [1,2,3,{age:4,name:"Timi"}]
argarr[3].age = 5;   // 此时argarr 和 resarr 中索引为3的age值都变为了5
```
#### 使用返回新数组的方法
##### slice()截取数组
**slice(0)指的是从0开始到末尾截取数组，然后返回一个新的数组，这样就不会影响到原来的数组了。**

```js
var arr1 = [1,2,3];
var arr2 = arr1.slice(0);
console.log(arr2); // [1,2,3]
```
##### map()
```js
 var arr1 = [1,2,3];
  var arr2 = arr1.map((value)=>{
    return value;  
  })
  console.log(arr2); // [1,2,3]
```
##### concat()
连接数组，如果连接的是一个空，那么也是返回了新的本身的数组
```js
var arr1 = [3,4,5];
var arr2 = arr1.concat();
console.log(arr2);   //[3,4,5]
  ```

::: danger [注意]
以上方法实现的仅是数组的浅拷贝，如果要实现数组的深拷贝，需要使用递归方法.
:::

### 数组深拷贝
#### 使用递归
```js
function deepClone(source){
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for(let keys in source){ // 遍历目标
    if(source.hasOwnProperty(keys)){
      if(source[keys] && typeof source[keys] === 'object'){ // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      }else{ // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}
```
