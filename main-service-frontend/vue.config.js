const path = require('path');
const CopyOutputWebpackPlugin = require('copy-output-webpack-plugin');
const resolve = dir => path.join(__dirname, dir);
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
    },
    configureWebpack: config => {
        config.externals = {
            'vue': 'Vue',
        };
        config.plugins.push(new CopyOutputWebpackPlugin({
                from: path.resolve(__dirname, './dist'),
                to: path.join(__dirname, '../main-service-backend/public'),
                deleteBeforeCopyList: ["./static", "./index.html", "./favicon.ico"]
            })
        )
    }
}
// vueConf.configureWebpack(config => {
//     config.plugins = [
//         new CopyOutputWebpackPlugin({
//             from: path.resolve(__dirname, './dist'),
//             to: path.join(__dirname, '../main-service-backend/public'),
//             deleteBeforeCopyList: ["./static", "./index.html", "./favicon.ico"]
//         })
//     ]
// })
module.exports = vueConf;