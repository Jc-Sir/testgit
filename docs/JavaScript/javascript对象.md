# JavaScript对象

## 基本概念
对象是包括属性与方法的数据类型。

**面向过程编程**

```js
let name = "Js小白";
let grade = [
  { lesson: "js", score: 99 },
  { lesson: "mysql", score: 85 },
  { lesson: "css", score: 80 },
  { lesson: "Html", score: 96 }
];
function average(grade, name) {
  const total = grade.reduce((t, a) => t + a.score, 0);
  return name + ":" + total / grade.length + "分";
}
console.log(average(grade, name));
```

**面向对象编程**
```js
let user = {
    name : "Js小白",
    grade : [
      { lesson: "js", score: 99 },
      { lesson: "mysql", score: 85 },
      { lesson: "css", score: 80 },
      { lesson: "Html", score: 96 }
    ],
    average(grade, name) {
      const total = this.grade.reduce((t, a) => t + a.score, 0);
      return this.name + ":" + total / this.grade.length + "分";
    }
}
console.log(user.average());
```

### OOP面向对象
- 对象是属性和方法的集合即封装
- 将复杂功能隐藏在内部，只开放给外部少量方法，更改- 对象内部的复杂逻辑不会对外部调用造成影响即抽象
- 继承是通过代码复用减少冗余代码
- 根据不同形态的对象产生不同结果即多态


### 对象的组成
对象是属性和方法的无序集合，由``键名``和``属性值``组成

**【键名/属性名】**

对象的所有键名都是字符串，所以加不加引号都可以，如果不是字符串也会自动转换成字符串

**【注意】**

- 1、如果键名不符合标识符命名规则，则必须加上引号，否则会报错


```js
//错误示例
/*var o = {
    1p: 123
}*/  

//正确示例
var o = {
    '1p': 123
}
```
- 2、属性的 key 是一个唯一的字符串

    【后面与前面重名的会将前面的覆盖】

- 3、访问一个不存在的属性不会抛出错误，但是会返回 undefined。
- 4、当使用括号表示法，属性的 key 不要求是有效的标识符 —— 可以是任意值。

 
**【属性值】**
- 1、属性值可以是任何类型的表达式，最终表达式的结果就是属性值的结果

```js
var o ={
    a: 1+2
}
console.log(o.a);//3
```
- 2、如果属性值为函数，则通常把这个属性称为"方法"

```js
var o = {
  p: function (x) {
    return 2 * x;
  }
};![image](https://note.youdao.com/favicon.ico)
o.p(1);  //2
```

- 3、由于对象的方法就是函数，因此也有name属性。方法的name属性返回紧跟在function关键字后面的函数名。如果是匿名函数,ES5环境会返回undefined，ES6环境会返回方法名
```js
var obj = {
  m1: function f() {},
  m2: function () {}
};
obj.m1.name // "f"
obj.m2.name //ES5： undefined
obj.m2.name //ES6： "m2"

var obj1 = {
    name:"zhangsan",
    age:30,
    show(){
    console.log('我是对象中的方法')
    } 
}
obj1.show(); //我是对象中的方法
 ```

### 引用特性
对象和函数、数组一样是引用类型，即复制只会复制引用地址。

- 1、如果不同的变量名指向同一个对象，那么他们都是这个对象的引用，也就是说他们指向同一个内存地址，修改其中一个变量，会影响到其他所有变量。

```js
var o1 = {};
var o2 = o1;
o1.a = 1;  //向o1对象添加a属性，值为1
console.log(o2.a);// 1
o2.b = 2;  //o2对象实际上是对o1的引用，改变o2的属性实际上也是改变o1的属性
console.log(o1.b);// 2

// 对多的比较是对内存地址的比较所以使用 == 或 === 一样

let obj1 = {};
let obj2 = obj1;
let obj3 = {};
console.log(obj1 == obj2);   //true
console.log(obj1 === obj2);  //true
console.log(obj1 === obj3);  //false
```

- 2、如果取消某一个变量对于原对象的引用，不会影响到另一个变量

```js
var o1 = {};
var o2 = o1;
o1 = 1;
console.log(o2);//{}
```
- 对象做为函数参数使用时也不会产生完全赋值，内外共用一个对象
```js
let user = { age: 22 };
function addTen(user) {
  user.age += 10;
}
addTen(user);
console.log(user.age); //32
```

### 创建对象
#### 1、对象字面量
JavaScript提供了叫做字面量的快捷方式，用于创建大多数原生对象值，使用字面量只是隐藏了与使用new操作符相同的基本过程，于是也叫做语法糖。

```js
var obj = {}; //等价于 var obj = new Object();
var person = {
    name: 'Bob',
    age: 20,
    tags: ['js', 'web', 'mobile'],
};
```
::: danger [👣注意]
- 使用对象字面量的方式创建的对象，属性名会自动转换成字符串。
- 一般对象字面量最后一个属性后的逗号将忽略，但是在IE7-浏览器中导致错误
:::

#### 2、使用new构造函数
使用new操作符后跟Object构造函数用以初始化一个新创建的对象
```js
var person  = new Object();
// 如果不给构造函数传递参数可以不加括号 
// var person = new Object;
    person.name = 'Tom';
    person.age = '20';
    person.job = 'software Enginner';
    person.sayName = function(){
        console.log(this.name)
    }   
console.log(person)
```
创建无属性的空对象
```js
var obj1 = new Object();
var obj2 = new Object(undefined);
var obj3 = new Object(null);
var obj4 = new Object;
```

如果括号里面的参数是一个对象，则之间返回这个对象

```js
var o1 = {a:1};
var o2 = new Object(o1);
console.log(o2)   // {a: 1}
console.log(o1 === o2);// true
```

如果括号里面的参数是一个函数对象，则之间返回这个函数对象
```js
var f1 = function(){};
var f2 = new Object(f1);
console.log(f1 === f2);// true
```
#### 3、Object.create()

ES5定义了一个名为Object.create()的方法，它创建了一个新对象，第一个参数就是这个对象的原型，第二个可选参数用以对对象的属性进行进一步的描述。


####  4、使用对象构造器

```js
// 使用函数来构造对象
function person(firstname,lastname,age,eyecolor) 
{
    this.firstname=firstname; 
    this.lastname=lastname; 
    this.age=age; 
    this.eyecolor=eyecolor; 
}
```
### 操作属性
- 使用点语法获取

```js
let user = {
    name: "jc-sir"
};
console.log(user.name);
```

- 使用[] 获取

```js
console.log(user["name"]);
```

- 如果属性名不是合法变量名就必须使用扩号的形式了

```js
let user = {};
user["my-age"] = 28;
console.log(user["my-age"]);
```

- 对象和方法的属性可以动态的添加或删除。

```js
const user = {
  name: "李思晓"
};
user.age = "10";
user.show = function() {
  return `${this.name}已经${this.age}岁了`;
};
console.log(user.show());
console.log(user);

delete user.show;
delete user.age;

console.log(user);
console.log(user.age); //undefined
```

### this

``this`` 指当前对象的引用，始终建议在代码内部使用``this`` 而不要使用对象名，不同对象的``this``只指向当前对象。

下例是不使用 this 时发生的错误场景
- 删除了user变量，但在函数体内还在使用user变量造成错误
- 使用 this 后始终指向到引用地址，就不会有这个问题

```js
let user = {
  name: "小左",
  show() {
    return user.name;
  }
};
let user1 = user;
user = null;
console.log(user1.show()); //Error

```
改用this 后一切正常
```js
let user = {
  name: "小左",
  show() {
    return this.name;
  }
};
let user1 = user;
user = null;
console.log(user1.show()); //Error

```
## 对象属性管理
### 添加属性
```js
let obj = {};
obj.name = "ObjName";
obj.creater = "Jc-sir"
```
### 删除属性
```js
let obj = {name:"张三"};
delete obj.name;
cosole.log(obj.name) // undefined
// 如果在对象中未找到属性则返回undefined
```
### 检测属性

#### in运算符
> 左侧是属性名（字符串），右侧是对象。如果对象的``自有属性``或者``继承属性``中包含这个属性则返回`true`

```js
var obj = { name: 'Tom',age:18};
"name" in obj;      // true  name是obj的自有属性
"sex" in obj;       // flase sex不是obj的属性
// 以下是两个继承属性
"toString" in obj;       // true  
"hasOwnProperty" in obj; // true 
```
#### !==
> 使用!==判断属性是否为undefined 。

```js
var obj = { x:1 };
obj.x ！== undefined   // true  obj 拥有x属性
obj.y ! == undefined   // false obj 没有y属性
obj.toString ! == undefined   // true obj继承了该属性
```

::: danger
对于值为undefined的属性 不能通过 !== 判断。
:::

```js
var obj = { x:undefined }          // 属性被显示赋值 undefined
obj.x !== undefined                // false  属性存在但是值为undefined
obj.y !== undefined                // false  此时是因为属性不存在

// 使用 in
"x" in obj    // true
"y" in onj    // false
```

#### hasOwnProperty()
> 检测对象自身是否包含指定的属性(自有属性 非继承属性)，**不检测原型链上继承的属性**。

```js
let obj = { name: 'jc-sir'};
console.log(obj.hasOwnProperty('name'));     //true
console.log(obj.hasOwnProperty('sex'));      //false
console.log(obj.hasOwnProperty('toString')); //false  原型上的属性将返回false
```

#### propertyIsEmumerable()
::: warning
propertyIsEmumerable() 是 hasOwnProperty()的增强版，只有检测到 `自有属性` 且该属性的可枚举性为`true` 时才返回 `true` 。某些内置属性是不可枚举的。
:::

```js
var o = {x:1}
var obj = Object.create(o);    // 不是 assign
obj.z = 2;
obj.propertyIsEnumerable("x")  // false
obj.propertyIsEnumerable("z")  // true
```
可枚举性决定了这个属性能否被for…in查找遍历到。

### 枚举属性
> 对象的属性分为可枚举和不可枚举之分，它们是由属性的`enumerable`值决定的。可枚举性决定了这个属性能否被`for…in`查找遍历到。

属性的枚举性会影响以下四个函数的结果：
- for…in
- Object.keys()
- Object.values()
- JSON.stringify

**代码示例**
``` js
var obj = new Object();
obj.x = 1;
obj.y = 2;
obj.z = 3;

Object.defineProperty(obj,"z",{
    enumerable:false
})

for(let i in obj){
    console.log(obj[i]);
}
// 1,2   不会打印3 因为z属性是不可枚举的

console.log(Object.keys(obj))       // ["x", "y"]

console.log(Object.values(obj))     // [1, 2]

console.log(JSON.stringify(obj));   // {"x":1,"y":2}
```

### assign
可以使用 ``Object.assign`` 静态方法
从一个或多个对象复制属性

```js
"use strict";
let obj = { a: 1, b: 2 };
obj = Object.assign(obj, { f: 1 }, { m: 9 });
console.log(obj); //{a: 1, b: 2, f: 1, m: 9}
```

## 对象实例方法
### valueOf()
该方法返回当前对象

```js
var obj = {
  str: "jc-sir",
  num: 1, 
};
obj.valueOf();   //{str: "jc-sir", num: 1}
```
### toString()
该方法返回当前对象的字符串形式

```js
var o1 = new Object();
o1.toString() // "[object Object]"

var o2 = {a:1};
o2.toString() // "[object Object]"
```

### toLocaleString()
toLocaleString()方法并不做任何本地化自身的操作，它仅调用toString()方法并返回对应值

```js
var o = {a:1};
o.toLocaleString() // "[object Object]"
```

## 对象的解构赋值
### 基本用法
```js
var user = {
    name:"xiaozuo",
    sex:'男'
}
let {name:n,sex:s} = user;
console.log(n,s);
// xiaozuo 男

//如果属性名与变量相同可以省略属性定义
let {name,sex} = user;
```

函数返回值直接解构到变量

```js
function userFun() {
  return {
    name: '小左',
    age: 18
  };
}
let {name : n, age : a} = userFun();
console.log(n); // 小左
```

函数传参
```js
"use strict";
function people({ name, age }) {
  console.log(name, age); // 张三   18
}
people({ name: "张三", age: 18 });

```

### 严格模式
非严格模式可以不使用声明指令，严格模式下必须使用声明。所以建议使用 let 等声明。
```js
// "use strict";
({name,sex} = {name:'张三',sex:'女'});
console.log(name, sex);

 "use strict";
let {name,sex} = {name:'张三',sex:'女'};
console.log(name, sex);
```

### 嵌套解构
可以操作多层复杂数据结构
```js
const people = {
  name:'',
  skills:{
    title:'JS'
  }
}
const {name,skills:{title}}  = people;
console.log(name,title); 
```
### 默认值
为变量设置默认值
```js
let [name, site = 'jc-sir.github.io'] = ['juncai'];
console.log(site); // jc-sir.github.io
```
使用默认值特性可以方便的对参数预设

```js
function createElement(options) {
  let {
    width = '200px',
    height = '100px',
    backgroundColor = 'red'
  } = options;
  
  const h2 = document.createElement('h2');
  h2.style.width = width;
  h2.style.height = height;
  h2.style.backgroundColor = backgroundColor;
  document.body.appendChild(h2);
}
createElement({
	backgroundColor: 'green'
});
```
## 属性特征
JS中可以对属性的访问特性进行控制。

### 查看特征
使用 Object.getOwnPropertyDescriptor查看对象属性的描述。

```js
"use strict";
const user = {
  name: "jc-sir",
  age: 18
};
let desc = Object.getOwnPropertyDescriptor(user, "name");
console.log(JSON.stringify(desc, null, 2));
// {
//   "value": "jc-sir",
//   "writable": true,
//   "enumerable": true,
//   "configurable": true
}
```
使用`` Object.getOwnPropertyDescriptors``查看对象所有属性的描述

```js
"use strict";
const user = {
  name: "jc-sir",
  age: 18
};
let desc = Object.getOwnPropertyDescriptors(user);
console.log(JSON.stringify(desc, null, 2));
```
数据属性包括以下四种特性

| 特性         | 说明                                                   | 默认值    |
|--------------|--------------------------------------------------------|-----------|
| configurable | 能否使用delete、能否需改属性特性、或能否修改访问器属性 | true      |
| enumerable   | 对象属性是否可通过for-in循环，或Object.keys() 读取     | true      |
| writable     | 对象属性是否可修改                                     | true      |
| value        | 对象属性的默认值                                       | undefined |

存取器属性包括以下属性

| 特性         | 说明                                                   | 默认值    |
|--------------|--------------------------------------------------------|-----------|
| configurable | 能否使用delete、能否需改属性特性、或能否修改访问器属性 | true      |
| enumerable   | 对象属性是否可通过for-in循环，或Object.keys() 读取     | true      |
| get     🤡   | 获取存取器属性                                         | undefined |
| set    🤠    | 定义存取器属性                                         | undefined |
代码示例
```js
var obj = {
    name:"jc-sir",
    num:18,
    get age(){
        return ++this.num;
    }
}
Object.getOwnPropertyDescriptor(obj,"age");
// {
//   configurable: true
//   enumerable: true
//   get: ƒ age()
//   set: undefined
// }
```
::: warning
Object.getOwnPropertyDescriptor() 只能得到自有属性的描述符
要想获得继承属性的特性，需要遍历原型链 Object.getPrototypeOf()
:::
### 设置特征
使用Object.defineProperty 方法修改属性特性，通过下面的设置属性name将不能被遍历、删除、修改。

```js
"use strict";
const user = {
  name: "jc"
};
Object.defineProperty(user, "name", {
  value: "jc-sir",
  writable: false,
  enumerable: false,
  configurable: false
});
```
通过执行以下代码对上面配置进行测试，| 分别打开注释进行测试
```js
// 不允许修改
// user.name = "Tom"; //Error

// 不能遍历
// console.log(Object.keys(user));

//不允许删除
// delete user.name;
// console.log(user);

//不允许配置
// Object.defineProperty(user, "name", {
//   value: "小左先生",
//   writable: true,
//   enumerable: false,
//   configurable: false
// });
```
### 设置/修改多个属性
> 如果要同时创建或修改多个属性 使用 `Object.defineProperties()` 第一个参数是要修改的对象，第二个参数是一个映射表

代码示例
```js
var o = {name:"o"}
var p = Object.defineProperties(o,{
  x:{value:3,writeable:true,enumerable:true,configurable:true},
  y:{value:4,writeable:true,enumerable:true,configurable:true},
  z:{
    get:function(){return Math.sqrt(this.x*this.x+this.y*2)},
    enumerable:true,
    configurable:true
  }
})
// {
//   name: "o"
//   x: 3
//   y: 4
//   z: 4.123105625617661
// }
```
### 禁止添加属性
``Object.preventExtensions``禁止向对象添加属性

```js
"use strict";
const user = {
  name: "jc-sir"
};
Object.preventExtensions(user);
user.age = 18; //Error  在严格模式下报错
```

``Object.isExtensible`` 判断是否能向对象中添加属性

```js
"use strict";
const user = {
  name: "jc-sir"
};
Object.preventExtensions(user);
console.log(Object.isExtensible(user)); //false
```
###封闭对象
``Object.seal()``方法封闭一个对象，阻止添加新属性并将所有现有属性标记为 configurable: false

```js
"use strict";
const user = {
  name: "jc",
  age: 18
};

Object.seal(user);
console.log(
  JSON.stringify(Object.getOwnPropertyDescriptors(user), null, 2)
);

Object.seal(user);
console.log(Object.isSealed(user));
delete user.name; //Error
```

**Object.isSealed** 如果对象是密封的则返回 true，属性都具有 ``configurable: false``

```js
"use strict";
const user = {
  name: "jc-sir"
};
Object.seal(user);
console.log(Object.isSealed(user)); //true
```

### 冻结对象
**Object.freeze** 冻结对象后不允许添加、删除、修改属性，writable、configurable都标记为**false**

```js
"use strict";
const lesson = {
  name: "html"
};
Object.freeze(lesson);
lesson.name = "javascript"; //Error
```

**Object.isFrozen()**方法判断一个对象是否被冻结

```js
"use strict";
const lesson = {
  name: "html"
};
Object.freeze(lesson);
console.log(Object.isFrozen(lesson)); // true
```

## 属性访问器
**getter方法**用于获得属性值，**setter方法**用于设置属性，这是JS提供的存取器特性即使用函数来管理属性。

- 用于避免错误的赋值
- 需要动态监测值的改变
- **属性只能在访问器(存取器属性)和普通属性(数据属性)任选其一，不能共同存在**

### getter/setter
```js
// 为obj创建一个伪属性latest，它会返回log数组的最后一个元素。
"use strict";
var obj = {
    data: {
        name: 'jc-sir',
        age: null
    },
    log: ['example', 'test'],
    get latest() {
        if (this.log.length == 0) return undefined;
        return this.log[this.log.length - 1];
    },
    set age(value) {
        if (typeof value != "number" || value > 100 || value < 10) {
            throw new Error("年龄格式错误");
        }
        this.data.age = value;
    },
    get age() {
        return `年龄是: ${this.data.age}`;
    }
}
console.log(obj.latest);      // "test"
// 如果一个属性同时拥有getter和setter方法，那么这个属性是可读可写的如 age 
// 如果只要getter方法，那么该属性只是可读属性，如latest
// 如果资源setter方法，那么该属性只是可写属性。读取只写属性总是反回undefined
obj.latest = "修改后的latest" // 并不会被修改 没有setter方法
obj.age = 101 //Error
```

### 删除getter

使用delete操作符删除 getter

```js
delete obj.latest;
```
### 定义getter
1、创建对象时定义

2、在原有对象添加


**要随时将 getter 添加到现有对象，使用 Object.defineProperty()**

```js
var o = { a:0 }

Object.defineProperty(o, "b", { get: function () { return this.a + 1; } });

console.log(o.b)
```

### 定义 setter
1. 在对象初始化时定义 setter

```js
var language = {
  set current(name) {
    this.log.push(name);
  },
  log: []
}

language.current = 'EN';
console.log(language.log); // ['EN']

language.current = 'FA';
console.log(language.log); // ['EN', 'FA']

// current属性是未定义的，访问它时将会返回 undefined。
```

2. 使用 defineProperty 为当前对象定义 setter

```js
var o = { a:0 };

Object.defineProperty(o, "b", { set: function (x) { this.a = x / 2; } });

o.b = 10; 
console.log(o.a) // 5
```

### 删除setter
用 delete 操作符移除一个 setter

```js
delete language.current;
```