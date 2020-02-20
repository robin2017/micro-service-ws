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
    }
}
