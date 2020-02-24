## 基于vue&Web Component的微前端解决方案
> 适用以下场景：
> + 单页面有很多独立的业务模块组成，多人协作成本高，开发/构建时间长，依赖升级回归成本高
> + 独立模块是由第三方业务接入  
#####本方案提供不同的子应用脚手架，实现各个子模块的独立开发和部署，通过打包脚本的动态加载来实现模块加载和渲染，从而将整个系统彻底解耦。
## Demo
![image](http://68.168.137.218:3000/demo/demo.gif)

## Live Demo
http://68.168.137.218:3000/index.html

# 架构设计
![image](http://68.168.137.218:3000/demo/design.png)

## 流程结构
![image](http://68.168.137.218:3000/demo/flu.png)

## 特性
+ 1、子应用可支持不同框架，目前只提供vue的脚手架。
+ 2、子应用只需发布前端模块资源bundle即可，框架应用通过模块bundle渲染页面。
+ 3、模块通过组合拼接成页面，可以通过拖拽方式完成。可视化操作，所见即所得。
+ 4、脚手架基于官方脚手架改造，不增加任何学习成本，易上手。

## 安装
为了让开发者快速看到展示效果,可以执行以下脚本：
```
npm i
npm run do.all
```
会自动完成各个演示模块的依赖安装，构建和部署。打开页面 ： http://localhost:3000/index.html


 


## 参考资料
+ 1、阿里飞冰微前端:https://ice.work/docs/icestark/about
+ 2、sing-spa:https://single-spa.js.org/ 
+ 3、微前端如何落地?:https://juejin.im/post/5d1d8d426fb9a07efe2dda40
+ 4、前端微服务化解决方案:https://alili.tech/archive/ea599f7c/
+ 5、黄勇《前端架构：从入门到微前端》