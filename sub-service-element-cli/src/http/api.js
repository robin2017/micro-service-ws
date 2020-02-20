import axios from 'axios';
import {getRuntimeBaseUrl} from './utils'

const env = process.env.NODE_ENV;
const baseUrl = (env === 'production' ? getRuntimeBaseUrl() : "") + process.env.VUE_APP_BASE_API;

axios.defaults.baseURL = baseUrl;
console.log(`现在环境为:${env},`
    + `axios基本路径：${baseUrl}`);

export function get(url) {
    return axios.get(url)
        .then(response => response.data)
}

export function post(url, data) {
    return axios.post(url, data)
        .then(response => response.data)
}
