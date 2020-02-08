import host from './host';
import {get, post} from './api'

const mockServiceList = require('../mock/subServices')
export default {
    /**
     * 得到子服务列表,这个从自己的后端服务获取
     * */
    getServiceList() {
        return Promise.resolve(mockServiceList)
    },

    getServiceInfo(ipPort) {
        const url = `http://${ipPort}/packages_wc/package.json`;
        return get(url)
    }
}
