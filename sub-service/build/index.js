/**
 * 将模块构建成ws组件
 * */
const path = require('path');
const child_process = require('child_process');
const rimraf = require('rimraf');
const fs = require('fs');
const projectConf = require('../config')
//获取package.json中信息
const msModules = require(path.resolve(__dirname, '../package.json'))['micro-service-modules'];
if (!msModules instanceof Array) {
    console.log('请填写[micro-service-modules]属性');
    return;
}
// 删除当前目录下的packages目录
rimraf(path.resolve(__dirname, '../packages'), async function (err) {
    if (err) {
        console.log(err);
        return;
    }
    for (let i = 0; i < msModules.length; i++) {
        let item = msModules[i];
        console.log(`正在构建第${i + 1}个模块...`);
        const {module, name} = item;
        if (!module || !name) {
            console.log('模块中必须有module&name属性');
            return
        }
        const entry = `src/modules/${module}/` + (item.entry || 'Index.vue');
        console.log('模块入口:', entry);
        if (!fs.existsSync(path.resolve(__dirname, '../', entry))) {
            console.error('不存在入口文件：', entry);
            return;
        }
        const cmd = `vue-cli-service build --dest ${projectConf.packageName}/${module} --target ${projectConf.target} --name ${projectConf.target==='wc'?'ms-wc-':'ms_lib_'}${name} src/modules/${module}/Index.vue`;
        console.log('构建:', cmd);
        let err = await childProcessSync(cmd);
        if (err) console.error(err);
        console.log(`模块[${module}]构建成功！`)
    }
    console.log('全部模块构建完成!!!')
});

function childProcessSync(cmd) {
    return new Promise((resolve) => {
        child_process.exec(cmd, function (err,data) {
            if (err) {
                return resolve(err);
            }
            console.log(data)
            resolve()
        });
    })
}
