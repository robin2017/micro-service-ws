const path = require('path');

const resolve = dir => path.join(__dirname, dir);
module.exports = {
    publicPath: './',
    devServer: {
        open: true, // 是否打开浏览器
        host: "0.0.0.0",
        proxy: {
            "/rest": {
                target: "http://localhost:12808/ZHTEST", // 目标代理接口地址
                secure: false,
                changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
            }
        }
    },

    chainWebpack: config => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@http", resolve("src/http"))
    },
    configureWebpack: config => {
        config.externals = {
            'vue': 'Vue',
            "element-ui": "ELEMENT",
            axios: "axios"
        };
    }
}