import host from './host';
import {get, post} from './api'

export default {
    getPersonList: function () {
        return get(host.personList)
    },
    getTableList: function () {
        return get(host.tableList)
    },
    getTreeList: function () {
        return get(host.treeList)
    },
    getCon1: function () {
        return get(host.conTest1)
    },
    getCon2: function () {
        return get(host.conTest2)
    },
    getCon3: function () {
        return get(host.conTest3)
    },
    getCon4: function () {
        return get(host.conTest4)
    }
}
