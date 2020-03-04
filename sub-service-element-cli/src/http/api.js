import axios from 'axios';
import {getRuntimeBaseUrl, ConcurrentMrg} from './utils'

const concurrentMrg = new ConcurrentMrg(2);
const env = process.env.NODE_ENV;
const baseUrl = (env === 'production' ? getRuntimeBaseUrl() : "") + process.env.VUE_APP_BASE_API;

axios.defaults.baseURL = baseUrl;
console.log(`现在环境为:${env},`
    + `axios基本路径：${baseUrl}`);

// export function get(url) {
//     return axios.get(url)
//         .then(response => response.data)
// }

export function get(url) {
    return concurrentMrg.runTask(u => {
        return axios.get(u)
            .then(response => response.data)
    }, url)
}

export function post(url, data) {
    return axios.post(url, data)
        .then(response => response.data)
}
