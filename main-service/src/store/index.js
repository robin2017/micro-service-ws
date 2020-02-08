import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        moduleList: []
    },
    //同步方法
    mutations: {
        setModuleList(state, list) {
            console.log('store-mutations-setModuleList:',list)
            state.moduleList = list;
        }
    },
    //异步方法
    actions: {},
    modules: {}
})
