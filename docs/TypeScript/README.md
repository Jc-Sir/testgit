# TypeScript
## 安装
```js
npm install -g typescript  // 必须先安装node.js
或者
// npm install -g cnpm --registry=https://registry.npm.taobao.org
cnpm install -g typescript // 必须先安装cnpm 
或者
// npm install -g yarn 或者 cnpm install -g yarn
yarn global add typescript // 必须先安装yarn 
```

## 查看版本
控制台输入下面语句后出现版本号则安装成功
```js
tsc -v
```

## vscode配置
新增tsconfig.json文件
```json
{
    "compilerOptions":{
        "target":"ES5",
        "module": "commonjs",
        "outDir": "./js"
    }
}
```
在终端=>运行任务=>typescript=>tsc:watch

这样就可以将ts快速的编译成es5，无需运行后编译。保存即是编译
