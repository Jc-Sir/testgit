# console

## console.log()  
输出普通信息

## console.info()
输出提示信息

## console.error()
输出错误板信息【可展开详情】

## console.warn()
输出提示板信息【可展开详情】

## console.dir()
显示对象所有的属性和方法

## console.table()
传入对象/数组 以表格的形式输出 其中括号里面的参数是对象名称/数组名

## 运行时间
### console.time()
### console.timeEnd() 
可以将成对的console.time()和console.timeEnd() 之间代码的运行时间输出到控制台上
```
console.time('计时器');
for (var i = 0; i < 1000; i++) {
  for (var j = 0; j < 1000; j++) {}
}
console.timeEnd('计时器');
//  计时器: 3.794921875ms
```
注意:如果两个方法都不传参数  则输出  default: 4.063232421875ms
    
    要么不传参,要么给一样的参数,否则错误。
## 分组
### console.group()
### console.groupEnd()
在 Web控制台上创建一个新的分组.随后输出到控制台上的内容都会被添加一个缩进,表示该内容属于当前分组,直到调用console.groupEnd()之后,当前分组结束.

console.group() 默认为展开状态

console.groupCollapsed() 默认问收起状态
```
console.group('第一层');
  console.log('第一层里面');
console.group('第二层');
  console.log('第二层里面');
console.groupEnd();
console.groupEnd();

 第一层
    第一层里面
    第二层
        第二层里面
```
## console.trace()
> 用来跟踪函数的调用轨迹，在大型的项目中是很有用的

```
function add(a, b) {
    console.trace("Add function");
    return a + b;
}

function add3(a, b) {
    return add2(a, b);
}

function add2(a, b) {
    return add1(a, b);
}

function add1(a, b) {
    return add(a, b);
}

var x = add3(1, 1);

函数调用的轨迹如下

VM677:3 Add function
add @ VM677:3
add1 @ VM677:16
add2 @ VM677:12
add3 @ VM677:8
(anonymous) @ VM677:19  //匿名函数

```

## console.count()
输出执行次数

```
(function() {
  for (var i = 0; i < 5; i++) {
    console.count('count');
  }
})();
count: 1
count: 2
count: 3
count: 4
count: 5

```

## console.log 的高级玩法
占位符

- %s 格式化成字符串输出
- %d or %i 格式化成整数输出
- %f 格式化成浮点数输出
- %o 转化成展开的DOM元素输出
- %O 转化成JavaScript对象输出
- %c 字符串增加样式输出

```
var arr = ["小明","小红"];
var obj1 = {
	name:"lisa"
}
console.log("欢迎%s和%s两位新同学",arr[0],arr[1]);
console.log("圆周率的整数部分:%d,带小数部分:%f",3.14159,3.14159);
console.log("%O",obj1);
//欢迎小明和小红两位新同学
//圆周率的整数部分:3,带小数部分:3.14159
//Object
```