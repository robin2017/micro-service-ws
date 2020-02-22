const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const staticCache = require('koa-static-cache');
const router = require('koa-router');
const cors = require('koa2-cors');
const PORT = 12808;
const app = new Koa();
const staticPath = './public';
const backendRouter = new router();
//url为  http://localhost:12808/rest/testController/serviceList
backendRouter.get('/rest/testController/serviceList', async (ctx) => {
    ctx.body = fs.readFileSync(path.resolve(__dirname, './data/serviceIpPort.json'), 'utf-8');
});
app.use(cors());
app.use(staticCache(path.join(__dirname, staticPath), {
    prefix: '/',
    maxAge: 365 * 24 * 60 * 60
}));
app.use(backendRouter.routes()).use(backendRouter.allowedMethods())
app.listen(PORT, () => {
    console.log('koa服务器开启，地址为：http://localhost:' + PORT)
});