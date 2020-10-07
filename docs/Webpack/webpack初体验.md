# webpack初体验
## 安装
### 新建文件夹
```js
// webpack_first 是文件夹名 手动/命令创建看心情
mkdir webpack_first   
// cd 到 webpack_first文件夹
cd webpack_first
// npm 初始化
npm init -y
// 安装webpack-cli
npm install webpack webpack-cli --save-dev
```

### 新建src文件夹及其他文件
> 项目目录如下
```js
 webpack_first
  |- node_modules
  |- package.json
  |- /src
    |- index.js   // 入口文件
    |- data.json  // 测试json文件
    |- index.css  // 样式资源
```

### 入口文件
index.js
```js
// import './index.css'
import data from './data.json'
console.log(data);
function add(x, y) {
    return x + y;
}
console.log(add(8, 2))
```
## 结论
```js
1、运行指令
    开发环境：webpack ./src/index.js -o ./build/app.js --mode=development
        1.1、以./src/index.js为入口文件
        1.2、输出到 ./build/app.js
        1.3、打包环境 开发环境
    生产环境：webpack ./src/index.js -o ./build/app.js --mode=production
            较开发环境而言：输出文件会被压缩
2、结论:
    2.1、webpack能处理js/json,不能直接处理css/image等其它资源
    2.2、生产环境和开发环境能将ES6模块化编译成浏览器能识别的模块化
    2.3、生产环境比开发环境多一个压缩js代码
```
