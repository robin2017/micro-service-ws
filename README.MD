## 基于vue&Web Component的微前端解决方案
> 适用以下场景：
> + 单页面有很多独立的业务模块组成，通过布局组合成完整页面
> + 独立模块是由第三方业务接入  

##### 本方案提供不同的子应用脚手架，实现各个子模块的独立开发和部署，通过打包脚本的动态加载来实现模块加载和渲染，从而将整个系统彻底解耦。
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
+ 3、模块通过组合拼接成专题，可视化操作，所见即所得。
+ 4、脚手架基于官方脚手架改造，不增加任何学习成本，易上手。

## 安装
为了让开发者快速看到展示效果,可以执行以下脚本：
```
npm i
npm run do.all
```
会自动完成各个演示模块的依赖安装，构建和部署。打开页面 ： http://localhost:3000/index.html

## 脚手架配置
> 脚手架工程中package.json中有两个属性是和模块相关，其中"micro-service-modules"为需要发布的模块，"micro-service-templates"为专题的布局，具体如下：
```$xslt
   // 信息块(模块)配置
  "micro-service-modules": [
    {
      "name": "ele-hello", //模块名称
      "module": "HelloDemo", //模块路径文件夹
      "entry": "Index.vue", //模块入口文件
      "version": "0.0.1", //版本
      "description": "测试模块"  //描述
    }
  ]
```
```$xslt
  // 专题配置
  "micro-service-templates": [
    {
      "bizName": "ui业务", // 业务名称
      "templateName": "element组件专题", //专题名称
      "configs": [ //具体配置，参见vue-grid-layout参数
        {
          "x": 0,
          "y": 12,
          "w": 12,
          "h": 9,
          "i": "6",
          "content": "ele-transfer"
        },
        {
          "x": 7,
          "y": 0,
          "w": 5,
          "h": 6,
          "i": 888,
          "content": "ele-tree"
        }
      ]
    }
  ]
```

## 常见问题
#### 1、实现方案
框架应用使用vue+element，子应用开发提供了vue+element/vue+antd两个脚手架；开发者在脚手架指定目录中开发自己的业务模块，通过自带的构建指令将vue文件构建web component，形成打包后的js文件，然后部署在子应用自己的服务中；在框架应用中，通过动态script获取到不同模块的js文件，再在页面中完成渲染。
#### 2、css模块化
在web component规范中有一个很重要的技术：shadowDom，它的一个主要特性就是隔离css，保证shadowRoot内外的样式独立，可以避免页面中的样式污染，很好的完成了css的模块化。既然shadowRoot外的样式没法影响组件里面的样式，因此对于ui组件库的样式，必须置入shadowRoot内部，这个操作脚手架很好的完成了，它通过自动化修改库文件提升了vue-webcomponent-wrapper的能力，可以在shadowRoot内部通过style标签引入ui组件库的样式。
#### 2、为什么不提供react脚手架
微前端有很多实现方案，而web component方案最大的优点就是跨技术栈，因此想充分体现优势就应该提供两套不同的技术栈。但由于精力有限，且对react官方脚手架具体配置熟悉不够，因此暂不提供。
#### 3、和iframe方案区别
iframe方案作为微前端众多方案中较易实现的一种，本身存在的最大问题就是性能问题。由于各个信息块都在独立的iframe中进行渲染，因此浏览器要独立加载不同的源码，而源码中比重较大的就是框架runtime，意味着不同模块的框架runtime都重复下载了，造成很大的加载时延和流量浪费。而web component方案可以将框架runtime和一些常见的第三方库提取出来，在框架应用中进行加载，避免下载冗余文件。
#### 4、和阿里飞冰区别
本方案的信息(模)块-专题设计借鉴了icework的物料系统，信息块就是组件，专题就是区块，只是称谓不同。而icework适用于单个复杂子应用的整合，本方案适用于多个简单子应用的整合，可以快速将多个模块通过拖拽或者配置文件方式构建成一个丰富的信息展示页面。这也是本方案所适用的场景。
 
## 参考资料
+ 1、阿里飞冰微前端:https://ice.work/docs/icestark/about
+ 2、sing-spa:https://single-spa.js.org/ 
+ 3、微前端如何落地?:https://juejin.im/post/5d1d8d426fb9a07efe2dda40
+ 4、前端微服务化解决方案:https://alili.tech/archive/ea599f7c/
+ 5、黄勇《前端架构：从入门到微前端》