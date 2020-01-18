const path = require('path');
const projectConf = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('现在环境：', process.env.NODE_ENV);
console.log('现在目标:', process.env.TARGET);
const vueConf = {
    configureWebpack: config => {
        if (projectConf.target === 'wc' || projectConf.target === 'lib') {
            let htmlWebpackPlugin = config.plugins.find(item => {
                return item instanceof HtmlWebpackPlugin
            });
            if (htmlWebpackPlugin) {
                htmlWebpackPlugin.options.template = path.resolve(__dirname,
                    `./public/index-${projectConf.target}.html`)
            }
            // config.externals={
            //     'vue':{
            //         commonjs:'vue',
            //         commonjs2:'vue',
            //         umd:'vue',
            //         root:'Vue'
            //     }
            // }
            // config.optimization = {
            //     splitChunks: {
            //         cacheGroups: {
            //             vue: {
            //                 name: "chunk-vue",
            //                 test: /[\\/]node_modules[\\/]vue[\\/]/,
            //                 chunks: "initial",
            //                 priority: 3,
            //                 reuseExistingChunk: true,
            //                 enforce: true
            //             }
            //         }
            //     }
            // }
        }
    }
};
console.log('vueConf:', vueConf);
module.exports = vueConf;






