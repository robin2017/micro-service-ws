import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        moduleList: [],
        moduleGroup:[],
    },
    //同步方法
    mutations: {
        setModuleList(state, list) {
            console.log('store-mutations-setModuleList:',list)
            state.moduleList = list;
        },
        setModuleGroup(state,group){
            console.log('store-mutations-setModuleGroup:',group)
            state.moduleGroup = group
        }
    },
    //异步方法
    actions: {},
    modules: {}
})
