# js模块化设计

## 模块设计
项目变大时需要把不同的业务分割成多个文件，这就是模块的思想。模块是比对象与函数更大的单元，使用模块组织程序便于维护与扩展。

- 模块就是一个独立的文件，里面是函数或者类库
- 虽然JS没有命名空间的概念，使用模块可以解决全局变量冲突
- 模块需要隐藏内部实现，只对外开发接口
- 模块可以避免滥用全局变量，造成代码不可控
- 模块可以被不同的应用使用，提高编码效率


ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。


```
// CommonJS模块
下面的这种加载称为"运行时加载"，因为只有运行时才能得到这个对象，导致完全没办法在编译时做"静态优化"。
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;
```



==ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。==

```
// ES6模块
该种方式属于"编译时加载"(静态加载),即是在编译的时候就完成模块的加载。效率比CommonJs高。
import { stat, exists, readFile } from 'fs';
```


## 基础知识
### 标签使用
在html文件中导入模块，需要定义属性 **type="module"**

### 模块路径
在浏览器中引用模块必须添加路径如./ ，但在打包工具如webpack中则不需要，因为他们有自己的存放方式。

test.js 模块如下
```
export let test = {
  name: "this is a test module"
};
```

在html里面引入并使用
```
<script type="module">
  import { test } from "./test.js";
  console.log(test.name) // this is a test module
</script>
```
### 延迟解析
模块总是会在所有html解析后才执行

建议为用户提供加载动画提示，当模块运行时再去掉动画

### 严格模式
模块默认运行在严格模式

变量必须先声明才使用


### 作用域
==模块都有独立的顶级作用域，下面的模块不能互相访问==

<script type="module">
  let mo1 = "module1";
</script>

<script type="module">
// console.log(mo1)
</script>

==单独文件作用域也是独立的==

### 预解析
模块在导入时只执行一次解析，之后的导入不会再执行模块代码，而使用第一次解析结果，并共享数据。

- 可以在首次导入时完成一些初始化工作
- 如果模块内有后台请求，也只执行一次即可

## 模块的导入导出
- 使用export 将开发的接口导出
- 使用import 导入模块接口
- 使用``*``可以导入全部模块接口
- 导出是以引用方式导出，无论是标量还是对象，即模块内部变量发生变化将影响已经导入的变量

### 导出模块
使用 **export** 导出模块接口，没有导出的变量都是模块私有的。


> jc.js模块 分别导出 常量,方法,类
```
const host = "www.baidu.com";

function sum(a,b){
  return a+b;
}

class User {
  show() {
    console.log("user.show function");
  }
}

export {host,sum, User};
[具名导出]
```

### 别名导出
模块可以对导出给外部的功能起别名

```
export {host as Host, sum as Add, User};
// 使用别名导入
<script type="module">
  import { Host, Add, User } from "./jc.js";
  action();
</script>
```

### 默认导出
很多时候模块只是一个类，也就是说只需要导入个内容,这里可以使用默认导出。

==使用default 定义默认导出的接口，导入时不需要使用 {}==

- 可以为默认导出自定义别名
- 只能有一个默认导出
- 默认导出可以没有命名


```
export { User as default };

// 导入使用 [ 默认导出不需要{} import ]
import User from "./hd.js";
let user = new User()   
console.log(user.show() )
```

### 混合导出
模块可以存在默认导出与命名导出。
使用export default 导出默认接口，使用 export {} 导出普通接口


```
const site = "www.jc-sir.github.io";
const func = function() {
  console.log("this function in jc.module");
};
export default class {
  static show() {
    console.log("user.show");
  }
}
export { site, func };

// 也可以如下导出
const site = "www.jc-sir.github.io";
const func = function() {
  console.log("this function in jc.module");
};
 class User{
  static show() {
    console.log("user.show");
  }
}
export { site, func ,User as default};

// 导入默认接口时不需要使用 {} ，普通接口还用 {} 导入

<script type="module">
	//可以将 jc 替换为任何变量
  import jc from "./jc.js";  // jc指向默认导出
  import { site } from "./jc.js";
  console.log(site);
  jc.show();
</script>
```

可以使用一条语句导入默认接口与常规接口

```
import jc, { site } from "./jc.js";
```

也可以使用别名导入默认导出

```
import { site ,default as jc } from "./jc.js";
console.log(site);
jc.show();
```

如果是批量导入时，使用 default 获得默认导出


```
<script type="module">
  import * as api from "./jc.js";
  console.log(api.site);
  api.default.show();
</script>
```

### 使用建议
对于默认导出和命名导出有以下建议
- 不建议使用默认导出，会让开发者导入时随意命名
- 如果使用默认导入最好以模块的文件名有关联，会使用代码更易阅读


### 具名导入
在html 里面导入并使用  
```
<script type="module">
// [具名导入]
    import  {host,sum, User}  from "./jc.js";
    console.log(host);
    console.log(sum(5,10));
    let user = new User();
    user.show();
</script>
```

### 别名导入
可以为导入的模块重新命名

- 有些导出的模块命名过长，起别名可以理简洁
- 本模块与导入模块重名时，可以通过起别名防止错误
```
<script type="module">
// [导入别名]
    import { host as Host, sum as Add, User } from "./jc.js";
    console.log(Host);
    console.log(Add(5, 10));
    let user = new User();
    user.show();
</script>
```

### 批量导入
如果要导入的内容比较多，可以使用``*`` 来批量导入。

```
<script type="module">
    import * as api from "./jc.js";
    console.log(api.host);
    console.log(api.sum(5, 10));
    let user = new api.User();
    user.show();
</script>
```

### 导入建议
更建议使用明确导入方式

- 使用webpack 构建工具时，没有导入的功能会删除节省文件大小
- 可以更清晰知道都使用了其他模块的哪些功能
- 模块默认是在顶层静态导入，这是为了分析使用的模块方便打包


## 总结

| 表达式                                    | 说明         |
|-------------------------------------------|--------------|
| export var name="J_xiaozuo"               | 导出变量     |
| export function show(){}                  | 导出函数     |
| export class user{}                       | 导出类       |
| export {name as jc_name}                  | 别名导出     |
|                                           |
| import defaultVar from 'jc.js'            | 导入默认导出 |
| import {name,show} from 'jc.js'           | 导入命名导出 |
| import {name as jcName,show} from 'jc.js' | 别名导入     |
| import * as api from 'jc.js'              | 导入全部接口 |

