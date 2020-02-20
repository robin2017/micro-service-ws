import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import ModuleMgr from '../views/ModuleMgr'
import TemplateMgr from "../views/TemplateMgr";
import UserDisplay from "../views/UserDisplay";
import UserConfig from "../views/UserConfig";
import Test from '../views/Test'

Vue.use(VueRouter)

export const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index
    },

    {
        path: '/userDisplay',
        name: 'UserDisplay',
        component: UserDisplay,
        label: '用户展示'
    },
    {
        path: '/test',
        name: 'Test',
        component: Test,
        label: '测试页面'
    },
    {
        path: '/userConfig',
        name: 'UserConfig',
        component: UserConfig,
        label: '用户配置',
        children: [
            {
                path: 'moduleMgr',
                name: 'ModuleMgr',
                component: ModuleMgr,
                label: '模块管理'
            },
            {
                path: 'templateMgr',
                name: 'TemplateMgr',
                component: TemplateMgr,
                label: '模版管理'
            },
        ]
    }
]

const router = new VueRouter({
    routes
})

export default router
