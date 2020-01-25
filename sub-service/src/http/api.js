import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
console.log(`现在环境为:${process.env.NODE_ENV},`
    + `axios基本路径：${process.env.VUE_APP_BASE_API}`);

export function get(url) {
    return axios.get(url)
        .then(response => response.data)
}

export function post(url, data) {
    return axios.post(url, data)
        .then(response => response.data)
}
