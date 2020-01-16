const path = require('path');
const projectConf = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('现在环境：', process.env.NODE_ENV);
console.log('现在目标:', process.env.TARGET);
module.exports = {
    configureWebpack: config => {
        if (projectConf.target === 'wc'||projectConf.target==='lib') {
            let htmlWebpackPlugin = config.plugins.find(item => {
                return item instanceof HtmlWebpackPlugin
            });
            if (htmlWebpackPlugin) {
                htmlWebpackPlugin.options.template = path.resolve(__dirname, `./public/index-${projectConf.target}.html`)
            }
        }
    }
};







