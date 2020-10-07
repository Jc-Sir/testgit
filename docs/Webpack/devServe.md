# devServe
**开发服务器devServer ：用来自动化（自动编译、自动打开浏览器、自动刷新浏览器）**

**只会在内存中编译打包，不会有任何输出**
```js
module.exports = {
    // 启动devServe的指令：npx webpack-dev-serve [需下载]；
    devServer: {
        // 项目构建后的路径
        contentBase: resolve(__dirname, 'dist'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    }
}
```