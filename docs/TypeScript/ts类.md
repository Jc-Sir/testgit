# typescript中的类
## 类的定义
```ts
class Person{
    name:string,               // 类中的属性 前面省略了public关键字
    constructor(name:string){  // 构造函数   实例化类的时候触发的方法
        this.name = name;
    }
    getName():void{
        console.log(this.name)
    }
    setName(name:string):void{
        this.name = name
    }
}

var p = new Person('张某某')
p.getName()   // 张某某

p.setName('李四') 
p.getName();  // 李四
```



## ts中实现继承
### 最基本的继承
示例来自官网
```ts
class Animal {
    move(distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters}m.`);
    }
}

// extends关键字实现继承  
class Dog extends Animal {
    bark() {
        console.log('Woof! Woof!');
    }
}

const dog = new Dog();
dog.bark();     // Woof! Woof!
dog.move(10);   // Animal moved 10m
```

### 稍复杂点的继承
```ts
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    eat(food:string = '粮食'):void{
        console.log(`${this.name}吃${food}`)
    }
}

class Dog extends Animal {
    constructor(name: string) { super(name); }
    eat(food) {
        super.eat(food);
    }
}

class Cat extends Animal {
    constructor(name: string) { super(name); }
    eat(food) {
        super.eat(food);
    }
}

let dog = new Dog("小黄");
let cat: Animal = new Cat("英短");

dog.eat('狗粮');  // 小黄吃狗粮
cat.eat('猫粮');  // 英短吃猫粮
```
::: tip 提示
- 与前一个例子的不同点是，派生类包含了一个构造函数，它**必须调用 super()**，它会执行基类的构造函数。
- 在构造函数里访问 this的属性之前，我们 一定要调用 super()。 
- 这个是TypeScript强制执行的一条重要规则。
:::


## 类中的修饰符
| 类型      | 类型说明 |                               可访问性 |
|-----------|:--------:|---------------------------------------:|
| public    | 公有类型 |         在类里面、子类、类外面都以访问 |
| protected | 保护类型 | 在类里面、子类可以访问  类外部无法访问 |
| private   | 私有类型 |                       在类里面可以访问 |

**不指定类型默认为public**
```ts
class Person{
    public name:string;
    protected sex:string = '男';
    private age:number = 19;
    constructor(name:string){
        this.name = name;
    }
    getPrototype():void{
        console.log(`${this.name}-${this.sex}-${this.age}`)
    }    
}

class Man extends Person{
    constructor(name:string){
        super(name)
    }
    testType():void{
        console.log(`${this.name}`)
        console.log(`${this.sex}`)
        console.log(`${this.age}`)
        // Property 'age' is private and only accessible within class 'Person'.
    }
}

var p = new Person('小王');
p.getPrototype()           // 小王-男-19
console.log(p.name)        // 小王

// protected 无法在外部访问
console.log(p.sex)    
// Property 'sex' is protected and only accessible within class 'Person' and its subclasses.

// 类的外部无法访问私有属性
console.log(p.age)
// Property 'age' is private and only accessible within class 'Person'.

var man = new Man('小李');
man.getPrototype()    // 小李-男-19
console.log(man.name) // 小李
```
 
 ## 静态属性与静态方法
 **创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。**
 ```ts
 class AnimalClass{
    name:string;
    sex:string='男'
    static staticProperty:string ='静态属性'
    constructor(name:string){
        this.name=name;
    }
    run(){
        console.log('实例方法')
    }
    // 静态方法  static修饰
    static staticFun(params:string):void{
        console.log(params);
        // 静态方法里面无法直接调用类里面的属性
        console.log(`${params}--${this.sex}`); // 我是静态方法--undefined
        
        console.log(`${params}--${this.staticProperty}`);
    }
}

// 静态方法 
AnimalClass.eat = function():void{
    console.log('eat Function')
}

// 静态方法调用 类名+方法名
AnimalClass.eat();
AnimalClass.staticFun('我是静态方法');

// 获取静态属性
console.log(AnimalClass.staticProperty);
 ```

## 多态
父类被子类初始化的不同表现 【属于继承】
```ts
class Animal{
    name:string;
    constructor(name:string){
        this.name = name;
    }
    eat(){}    
}
class Dog extends Animal{
    constructor(name:string){
        super(name)
    }
    eat(){
        return  this.name + '吃狗粮'
    }
}
class Cat extends Animal{
    constructor(name:string){
        super(name)
    }
    eat(){
        return  this.name + '吃猫粮'
    }
}
```

## 抽象方法
- **抽象类做为其它派生类的基类使用。不能直接被实例化**
- **用abstract关键字定义抽象类和抽象方法**
- **抽象类中的抽象方法不包含具体实现并且必须在派生类【子类】中实现**
- **abstract抽象方法只能在抽象类里**
- **抽象类和抽象方法用来定义标准**

 
