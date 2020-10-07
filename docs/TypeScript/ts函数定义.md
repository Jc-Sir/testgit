# ts函数定义
## 普通函数
**为函数定义类型**
```ts
function 函数名称(参数名称:参数类型,...):函数返回值类型{}
```
```ts
function add(x: number, y: number): number {
    return x + y;
}
```
```ts
let myAdd = function(x: number, y: number): number { return x + y; };
```

## 无返回值
```ts
function viodFun():Void{
    console.log('void')
}
voidFun()
```

## 可选参数
es5 方法的实参和形参个数可以不一样，ts中必须一样，如果不一样就需要配置可选参数

::: danger 注意
配置的可选参数必须配置在【非可选参数】的后面
:::

**在指定参数类型的冒号前面加‘?’代表该参数可选**
```ts
function getUserInfo(name:string,age?:number):string{
    if(age){
        console.log(`${name}已经${age}了`)
        return `${name}已经${age}了`
    }else{
        console.log(`${name}的年龄保密`)
        return `${name}的年龄保密`
    }
}
getUserInfo('小王',15)
getUserInfo('小王')
```

## 默认参数
es5没法设置默认参数，es6和ts都可以设置默认参数
```ts
function getUserInfo(name:string,age:number=20):string{
    console.log(`${name}已经${age}了`)
    return `${name}已经${age}了`
}
```

## 剩余参数
```ts
// function add(...params:number[]):number{  // 两种定义数组的方式
function add(...params:Array<number>):number{
    return params.reduce((total,cur)=>{
        return total = total+cur;
    },0)
}
add(1,2,3,4)  // 10
```
其它小细节参考JavaScript函数章节的剩余参数

## 函数重载
- java中的方法重载 ：指的是两个或两个以上的同名函数，但是他们的参数不一样，这时候会出现重载的情况
- ts中的重载 ：通过为同一个函数提供多个函数定义来实现多种功能的目的

es5中后定义的方法会覆盖先前定义的方法

**ts的重载**

```ts
function getUserInfo(param:any):any{
    if(typeof(param) == 'string'){
        return `我是${param}`
    }else{
        return `年龄${param}`
    }
}
getUserInfo(18)        
getUserInfo("zs") 
```