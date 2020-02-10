import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        moduleList: [],
        moduleGroup:[],
        templateList:[]
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
        },
        setTemplateList(state,list){
            console.log('store-mutations-setTemplateList:',list)
            state.templateList = list
        }
    },
    //异步方法
    actions: {},
    modules: {}
})
