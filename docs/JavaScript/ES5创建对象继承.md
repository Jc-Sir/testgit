# ES5创建对象继承
## es5里面的类
### 最简单的类
```js
function Person(){
    this.name = '张三',
    this.age = 18
}
var p = new Person()
console.log(p.name)  // 张三
```

### 构造函数和原型链添加方法
**es5中类的属性和方法既可以在构造函数中定义也可以在原型链上添加**
```js
function Person(){
    this.name = '张三',  // 属性
    this.age = 18        // 属性
    this.run = function(){
        console.log(`${this.name}在疯狂的奔跑`)
    }
}
// 原型链上的属性会被多个实例共享，构造函数不会
Person.prototype.skin = '黄'   // 在原型链上添加属性
Person.prototype.eat = function(){
    console.log(`${this.name}在吃饭！！！`)
}
var p = new Person();
p.run()             // 张三在疯狂的奔跑
console.log(p.skin) // 黄
p.eat()             // 张三在吃饭
```
### 类里面的静态方法
```js
function Person(){
    this.name = '张三',  
    this.run = function(){   // 实例方法必须在new 出的实例中调用
        console.log(`${this.name}在疯狂的奔跑`)
    }
}
// 创建静态方法
Person.getName = function(){
    console.log('我是类中的静态方法')
}
var p = new Person()
p.run()          // 调用实例方法
Person.getName() // 调用静态方法 
```
### es5中的继承
```js
function Person(){
    this.name = '张三',  
    this.run = function(){
        console.log(`${this.name}在疯狂的奔跑`)
    }
}
Person.prototype.eat = function(){
    console.log(`${this.name}在吃饭！！！`)
}
 function inheritClass(){
     Person.call(this)  // 对象冒充继承
 }
 var inhert = new inheritClass()
 console.log(inhert.name)
 inhert.run()
//  对象冒充继承可以继承构造函数里面的属性和方法  不能继承原型链上的属性和方法
 inhert.eat() // 报错
```
### 原型链实现继承
```js
function Person(){
    this.name = '张三',  
    this.run = function(){
        console.log(`${this.name}在疯狂的奔跑`)
    }
}
Person.prototype.eat = function(){
    console.log(`${this.name}在吃饭！！！`)
}
 function proInheritClass(){
     proInheritClass.prototype = new Person()
     Person.call(this)  // 对象冒充继承
 }
 // 原型链继承 构造函数和原型链上的属性和方法都可以被继承

 var pro = new proInheritClass()
 console.log(pro.name)
 pro.run()
 // 调用继承自原型链上的方法
 pro.eat()
```
### 原型链继承的问题
::: danger 提示
原型链能继承父类的构造函数的属性和方法，也能继承原型链上的属性和方法。

但是实例化子类的时候没法给父类传参
:::

### 原型链+构造函数组合继承模式
```js
function Person(name){
    this.name = name,  
    this.run = function(){
        console.log(`${this.name}在疯狂的奔跑`)
    }
}
Person.prototype.eat = function(){
    console.log(`${this.name}在吃饭！！！`)
}
 function proInheritClass(name){
     Person.call(this,name)  // 对象冒充继承 实例化子类可以给父类传参
 }
 proInheritClass.prototype = new Person()  //另一种写法 proInheritClass.prototype = Person.prototype

 var pro = new proInheritClass('赵云')
 
 console.log(pro.name)
 pro.run()  // 赵云在疯狂的奔跑

 // 调用继承自原型链上的方法
 pro.eat()  // 赵云在吃饭！！！
```

## 