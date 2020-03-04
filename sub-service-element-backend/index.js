const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const staticCache = require('koa-static-cache');
const router = require('koa-router');
const cors = require('koa2-cors');
const PORT = 3001;
const app = new Koa();

const staticPath = './public';
const backendRouter = new router();
backendRouter.get('/ZHTEST/rest/testController/ele_personList', async (ctx) => {
    ctx.body = fs.readFileSync(path.resolve(__dirname, './data/people.json'), 'utf-8');
});
backendRouter.get('/ZHTEST/rest/testController/ele_treeList', async (ctx) => {
    ctx.body = fs.readFileSync(path.resolve(__dirname, './data/tree.json'), 'utf-8');
});
backendRouter.get('/ZHTEST/rest/testController/ele_tableList', async (ctx) => {
    ctx.body = fs.readFileSync(path.resolve(__dirname, './data/table.json'), 'utf-8');
});
//http://localhost:3001/ZHTEST/rest/testController/con1
backendRouter.get('/ZHTEST/rest/testController/con1', async (ctx) => {
    ctx.body = fs.readFileSync(path.resolve(__dirname, './data/concurrentData.json'), 'utf-8');
});
backendRouter.get('/ZHTEST/rest/testController/con2', async (ctx) => {
    ctx.body = fs.readFileSync(path.resolve(__dirname, './data/concurrentData.json'), 'utf-8');
});
backendRouter.get('/ZHTEST/rest/testController/con3', async (ctx) => {
    ctx.body = fs.readFileSync(path.resolve(__dirname, './data/concurrentData.json'), 'utf-8');
});
backendRouter.get('/ZHTEST/rest/testController/con4', async (ctx) => {
    ctx.body = fs.readFileSync(path.resolve(__dirname, './data/concurrentData.json'), 'utf-8');
});

app.use(cors());
app.use(staticCache(path.join(__dirname, staticPath), {
    prefix: '/packages_wc',
    maxAge: 365 * 24 * 60 * 60
}));
app.use(backendRouter.routes()).use(backendRouter.allowedMethods())
app.listen(PORT, () => {
    console.log('koa服务器开启，地址为：http://localhost:' + PORT)
});