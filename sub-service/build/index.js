/**
 * 将模块构建成ws组件
 * */
const path = require('path');
const child_process = require('child_process')

//获取package.json中信息
const msModules = require(path.resolve(__dirname, '../package.json'))['micro-service-modules'];
if (!msModules instanceof Array) {
    console.log('请填写[micro-service-modules]属性');
    return;
}
msModules.forEach(item => {
    const {module, name} = item;
    if (!module || !name) {
        console.log('模块中必须有module&name属性');
        return
    }

    const cmd = `vue-cli-service build --dest packages/${module} --target wc --name ms-${name} src/modules/${module}/Index.vue`;
    console.log(cmd);
    child_process.exec(cmd, function (err) {
        if (err) console.error(err);
        console.log(`模块[${module}]构建成功！`)
    });
});