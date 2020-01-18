const path = require('path');
const projectConf = require('./config')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
console.log('现在环境：', process.env.NODE_ENV);
console.log('现在目标:', process.env.TARGET);
const vueConf = {
    configureWebpack: config => {
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
                    `./public/index-${projectConf.target}.html`)
            }
            config.externals = {
                'vue': {
                    commonjs: 'vue',
                    commonjs2: 'vue',
                    umd: 'vue',
                    root: 'Vue'
                }
            }
            config.optimization = {
                splitChunks: {
                    cacheGroups: {
                        vue: {
                            name: "chunk-vue",
                            test: /[\\/]node_modules[\\/]vue[\\/]/,
                            chunks: "initial",
                            priority: 3,
                            reuseExistingChunk: true,
                            enforce: true
                        },
                        // elementUi: {
                        //     name: "chunk-element-ui",
                        //     test: /[\\/]node_modules[\\/]element-ui[\\/]/,
                        //     chunks: "initial",
                        //     priority: 3,
                        //     reuseExistingChunk: true,
                        //     enforce: true
                        // }
                    }
                }
            }
        }
    }
};
console.log('vueConf:', vueConf);
module.exports = vueConf;






