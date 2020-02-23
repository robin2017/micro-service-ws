const ipPortReg = /http:\/\/(.*?)\//;

export function getRuntimeBaseUrl() {
    //第二次就是null
    const currentScript = window.document.currentScript;
    let baseUrl = "";
    if (currentScript && currentScript.src) {
        const ret = ipPortReg.exec(currentScript.src);
        if (ret) {
            baseUrl = `http://${ret[1]}`
        }
    }
    return baseUrl;
}