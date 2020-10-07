# webpack打包Html
```js
// 目录结构
src
  --index.html
  --index.js
webpack.config.js
```
```js {6,22}
/**
 * loader  1、下载    2、使用（配置loader）
 * plugins 1、下载    2、引入  3、使用
 */
const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    entry: './src/index.js',  // 入口文件
    output: {
        filename: 'app.js',
        path: resolve(__dirname, 'dist')
    },
    module: {},
    plugins: [
        // 插件配置
        // html-webpack-plugin
        // 功能：默认复制一个空的html 自动引入打包输出的所有资源（js/css）
        // 需求：需要有结构的html

        // 复制 './src/index.html'  并自动引入打包输出的所有资源
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ]
};

module.exports = config;
```