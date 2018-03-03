##  基于react 的移动书城开发
##  运行环境
```
  开发环境
  
  npm start

  生产环境

  npm build
```

## 技术栈：
####   react + axios + logoAnt Design Mobile ui + pubsub-js + babel-plugin-import
## 结构组成

````
  |——src
      |——images          -----------------图片资源
      |——components         ---------------------组件
          |——home                         //首页
          |——category                     //小说分类
          |——top                          //排行
          |——user                         //用户
          |——subcomponent                //功能子组件
          |——reader                      //阅读器 
      |——app.css        ---------------------入口样式
      |——app.js        ---------------------入口函数
      |——index.css      ---------------------根组件样式
      |——index.js      ---------------------根组件js文件
  |——public         ------------------公共资源    
  |——————.babelrc      --------------转es6文件,配置插件
  |————package.json  ---------------------配置文件
  |————README.md    ---------------------说明文档

````