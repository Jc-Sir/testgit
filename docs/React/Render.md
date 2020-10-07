# ReactDOM.render()
React的最基本方法用于将模板转为HTML语言，并插入指定的DOM节点。

ReactDOM.render(template,targetDOM),该方法接收两个参数：
- 第一个是创建的模板，多个dom元素外层需使用一个标签进行包裹，如`<div>`;
- 第二个参数是插入该模板的目标位置。若要为创建的某个元素增加class属性，不能直接定义 `class` 而要用`className`，因为class是javascript中的保留字。例如给input添加className并更改样式：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="../build/react.development.js"></script>
    <script src="../build/react-dom.development.js"></script>
    <script src="../build/babel.min.js"></script>
    <style>
      .userName{
        font-size: 50px;
      }
    </style>
  </head>
  <body>
    <div id="user"></div>
    <script type="text/babel">
      var names = ['Tom', 'JiMi', 'Jhon'];
      ReactDOM.render(
        <div className="userName">
        {
          names.map( (name, index) => {
            return <div key={index}>Hello, {name}!</div>
          })
        }
        </div>,
        document.getElementById('user')
      );
    </script>
  </body>
</html>
```

## 定义行内样式

将所有的样式包裹在一个对象中,以类似变量的形式给style属性赋值,注意样式属性要用驼峰命名法表示.

如: `backgroundColor`而不是`background-color`; `fongSize`而不是`font-size`

## 将样式赋值给一个变量

```js
 let sty = {
    color:"yellow",
    border:"3px solid"
  }
  ReactDOM.render(
    <div style={ sty }>
    {
      names.map( (name, index) => {
        return <div key={index}>Hello, {name}!</div>
      })
    }
    </div>,
    document.getElementById('user')
  );
```
