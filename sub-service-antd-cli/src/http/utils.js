const ipPortReg = /http:\/\/(.*?)\//;

export function getRuntimeBaseUrl() {
    const currentScript = window.document.currentScript;
    let baseUrl = "";
    //这里经常报错，现在排查下
    console.log('antd===getRuntimeBaseUrl===:currentScript',currentScript,currentScript.src)
    if (currentScript && currentScript.src) {
        const ret = ipPortReg.exec(currentScript.src);
        if (ret) {
            baseUrl = `http://${ret[1]}`
        }
    }
    return baseUrl;
}