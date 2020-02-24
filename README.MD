## 基于Vue&Web Components的微前端解决方案
> 适用以下场景：
> + 单页面有很多独立的业务模块组成，通过布局组合成完整页面
> + 独立模块是由第三方业务接入  

##### 本方案提供不同的子应用脚手架，实现各个子模块的独立开发和部署，通过bundle文件的动态加载来实现模块的渲染，从而将整个系统彻底解耦。
## Demo
![image](http://68.168.137.218:3000/demo/demo.gif)

## Live Demo
http://68.168.137.218:3000/index.html

# 架构设计
![image](http://68.168.137.218:3000/demo/design.png)

## 流程结构
![image](http://68.168.137.218:3000/demo/flu.png)

## 特性
+ 1、子应用可由不同框架开发，目前只提供Vue脚手架。
+ 2、子应用只需发布模块bundle即可，框架应用通过模块bundle渲染页面。
+ 3、模块通过组合拼接成专题，配置或拖拽完成可视化操作，所见即所得。
+ 4、脚手架基于官方脚手架改造，不增加任何学习成本，易上手。

## 安装
为了让开发者快速看到展示效果,可以执行以下脚本：
```
npm i
npm run do.all
```
脚本自动完成各个演示模块的安装、构建和部署。然后打开页面查看效果 ： http://localhost:3000/index.html

## 脚手架配置
> 脚手架配置package.json中有两个属性是和模块/专题相关，其中"micro-service-modules"为需要发布的模块信息，"micro-service-templates"为专题的布局配置，具体如下：
```$xslt
   // 模块配置
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
框架应用开发基于Vue+Element，子应用开发提供Vue+Element/vue+AntD两个脚手架；开发者在脚手架指定目录中开发业务模块，通过Cli的指令将Vue文件构建成Web Components，形成bundle文件，然后部署在子应用服务中；框架应用中，由动态script获取到不同模块的js文件，然后在页面中完成渲染。
#### 2、css模块化
在Web Components规范中有一个很重要的技术：ShadowDom，它的主要特性就是隔离css，保证ShadowRoot内外的样式独立，避免页面中样式污染，很好的完成了css的模块化。既然ShadowRoot外的样式没法影响组件内的样式，因此对于ui组件库的样式文件，必须置入ShadowRoot内部，这个操作脚手架可以很好的完成，它通过自动修改第三方库文件，提升了vue-webcomponent-wrapper的能力，在ShadowRoot内部通过style标签引入ui组件库的样式文件。
#### 2、为什么不提供React脚手架
微前端有很多实现方案，其中Web Components方案最大的优点就是跨技术栈，因此想充分体现优势则应提供两套不同的框架。但由于精力有限，且对React官方脚手架具体配置熟悉不够，因此暂不提供。
#### 3、和Iframe方案区别
Iframe方案作为微前端众多方案中较易实现的一种，本身存在的最大问题就是性能。由于各个模块都在独立的Iframe中进行渲染，因此浏览器要独立加载不同的源码，而源码中比重较大的就是框架runtime，意味着不同模块的框架runtime都重复请求，造成很大的加载时延和流量浪费。而Web Components方案可以将框架runtime和一些常见的第三方库提取出来，在框架应用中进行统一加载，避免冗余下载。
#### 4、和阿里飞冰区别
本方案的模块-专题设计借鉴了icework的物料系统，模块就是组件，专题就是区块，只是称谓不同。而icework适用于单个复杂子应用的整合，本方案适用于多个简单子应用的整合，可以快速将多个模块通过拖拽或者配置文件方式构建成一个丰富的信息展示页面。这也是本方案所适用的场景。
 
## 参考资料
+ 1、阿里飞冰微前端:https://ice.work/docs/icestark/about
+ 2、sing-spa:https://single-spa.js.org/ 
+ 3、微前端如何落地?:https://juejin.im/post/5d1d8d426fb9a07efe2dda40
+ 4、前端微服务化解决方案:https://alili.tech/archive/ea599f7c/
+ 5、黄勇《前端架构：从入门到微前端》