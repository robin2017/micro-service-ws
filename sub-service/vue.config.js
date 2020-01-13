const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('现在环境：', process.env.NODE_ENV);
console.log('现在目标:', process.env.TARGET);
module.exports = {
    configureWebpack: config => {
        if (process.env.TARGET === 'wc') {
            let htmlPlugins = config.plugins.filter(item => {
                return item instanceof HtmlWebpackPlugin
            });
            if (htmlPlugins.length !== 0) {
                htmlPlugins[0].options.template = path.resolve(__dirname, './public/demo.html')
            }
        }
    }
}

