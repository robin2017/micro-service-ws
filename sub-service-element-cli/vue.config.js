const path = require('path');
const projectConf = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyOutputWebpackPlugin = require('copy-output-webpack-plugin');
const resolve = dir => path.join(__dirname, dir);
console.log('现在环境：', process.env.NODE_ENV);
console.log('现在目标:', process.env.TARGET);
const vueConf = {
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
            .set("@m", resolve("src/modules"))
    },
    configureWebpack: config => {
        config.externals = {
            'vue': 'Vue',
            "element-ui": "ELEMENT",
            axios: "axios"
        };
        if (projectConf.target === 'wc' || projectConf.target === 'lib') {
            config.plugins.push(new CopyWebpackPlugin([{
                from: path.resolve(__dirname, './public/lib'),
                to: path.resolve(__dirname, projectConf.packageName, './lib')
            }]));
            let htmlWebpackPlugin = config.plugins.find(item => {
                return item instanceof HtmlWebpackPlugin
            });
            if (htmlWebpackPlugin) {
                htmlWebpackPlugin.options.template = path.resolve(__dirname,
                    `./public/index-${projectConf.target}.html`);
                htmlWebpackPlugin.options.filename = "index.html"
            }
            if (process.env.NODE_ENV === 'production'
                && process.env.DEPLOY === 'true'
                && projectConf.CopyToBackend.need) {
                config.plugins.push(new CopyOutputWebpackPlugin({
                    from: path.resolve(__dirname, './packages_wc'),
                    to: path.join(__dirname, projectConf.CopyToBackend.path),
                    deleteBeforeCopyList: ["./static", "./index.html", "./favicon.ico"]
                }))
            }
        }
    }
};
console.log('vueConf:', vueConf);
module.exports = vueConf;






