 # Webpack打包样式资源
## 入口文件引入样式
```js
// 路径就自己看着引
import './index.css'
import './index.less'
import './index.scss'
```
## webpack配置文件
```js
// webpack.config.js
/*
    webpack.config.js webpack的配置文件
       作用：指示webpack干什么。运行webpack指令时，会加载里面的配置
       所有构建工具都是基于node.js平台运行的，模块化默认采用commonjs

     package.json依赖
     "devDependencies": {
        "css-loader": "^4.2.0",
        "less-loader": "^6.2.0",
        "node-sass": "^4.14.1",
        "sass-loader": "^9.0.3",
        "style-loader": "^1.2.1",
        "webpack": "^4.44.1",
        "webpack-cli": "^3.3.12"
    }
*/

const { resolve } = require('path');

module.exports = {
    // 模式
    mode: 'development', // 或 production
    // 入口起点
    entry: './src/index.js',
    // 输出
    output: {
        // 输出文件名
        filename: 'app.js',
        // __dirname nodejs变量，代表当前文件的目录绝对路径
        path: resolve(__dirname, 'dist')
    },
    // Loader的配置
    module: {
        rules: [
            // 详细Loader的配置
            // 不同文件必须使用不同的Loader来处理
            {
                test: /\.css$/,
                // use数组中的loader执行顺序是：从数组末尾到数组头 依次执行。
                use: [
                    // 创建<style> 标签 将js中的样式资源插入进行，添加到head中生效
                    'style-loader',

                    // 将css 文件变成commonjs模块加载到js中，内容是样式字符串
                    'css-loader'
                ]
            }, {
                test: /\.less/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 将less文件编译成css文件
                    'less-loader'
                ]
            },
            // sass
            // npm install sass-loader node-sass webpack --save-dev
            // 失败则 npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                }, {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                }, {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            }

        ]
    },
    plugins: [
        // 详细插件配置
    ]
}
```

## 运行webpack指令
> 终端输入 webpack

## 建个html文件
::: tip 查看是否成功🐃
将打包后的出口js文件在该html文件中引入，查看样式是否生效
:::