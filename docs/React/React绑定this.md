# React this绑定
React可以使用 `React.createClass`、`ES6 classes`、`纯函数` 3种方式构建组件。

使用 `React.createClass` 会自动绑定每个方法的this到当前组件，但使用ES6 classes或纯函数时，就要靠手动绑定this了。

## bind()

Function.prototype.bind(thisArg [, arg1 [, arg2, …]])是ES5新增的函数扩展方法，bind()返回一个新的函数对象，该函数的this被绑定到thisArg上，并向事件处理器中传入参数。

```js
import React, {Component} from 'react'

class Test extends React.Component {
    constructor (props) {
        super(props)
        this.state = {message: 'hello!'}
    }

    handleClick (name, e) {
        console.log(this.state.message + name)
    }

    render () {
        return (
            <div>
                <button onClick={ this.handleClick.bind(this, 'Tom') }>Say Hello</button>
            </div>
        )
    }
}
```

## 构造函数内部绑定

在构造函数constructor内绑定this，好处是仅需要绑定一次，避免每次渲染时都要重新绑定，函数在别处复用时也无需再次绑定

```js
import React, {Component} from 'react'

class Test extends React.Component {
    constructor (props) {
        super(props)
        this.state = {message: 'hello!'}
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick (e) {
        console.log(this.state.message)
    }
    render () {
        return (
            <div>
                <button onClick={ this.handleClick }>Say Hello</button>
            </div>
        )
    }
}
```

## 箭头函数

箭头函数则会捕获其所在上下文的this值，作为自己的 this值，使用箭头函数就不用担心函数内的this不是指向组件内部了。
```js
class Test extends React.Component {
    constructor (props) {
        super(props)
        this.state = {message: 'hello!'}
    }
    handleClick (e) {
        console.log(this.state.message)
    }
    render () {
        return (
            <div>
                <button onClick={ ()=>{ this.handleClick() } }>Say Hello</button>
            </div>
        )
    }
}
```

因为箭头函数总是匿名的，如果你打算移除监听事件，可以改用以下方式:

```js
class Test extends React.Component {
    constructor (props) {
        super(props)
        this.state = {message: 'hello!'}
    }
    handleClick = (e) => {
        console.log(this.state.message)
    }
    render () {
        return (
            <div>
                <button onClick={ this.handleClick }>Say Hello</button>
            </div>
        )
    }
}
```

**如果使用ES6和React 16以上的版本，最佳实践是使用第三种方法来绑定this**

https://www.jb51.net/article/141524.htm

