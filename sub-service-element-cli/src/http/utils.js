const ipPortReg = /http:\/\/(.*?)\//;

export function getRuntimeBaseUrl() {
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

export function ConcurrentMrg(max) {
    this.cnt = 0;
    this.available = max;
    this.taskQueue = [];
    this.resRejObj = []
}

ConcurrentMrg.prototype.runTask = function () {
    let id = `id-${this.cnt++}`;
    let args = [...arguments];
    let fn = args.shift();
    this.taskQueue.push({id, fn, args});
    this.runQueue();
    return new Promise((resolve, reject) => {
        this.resRejObj[id] = {resolve, reject}
    })
};
ConcurrentMrg.prototype.runQueue = function () {
    let canRunLength = Math.min(this.taskQueue.length, this.available);
    for (let i = 0; i < canRunLength; i++) {
        let {id, fn, args} = this.taskQueue.shift();
        this.available--;
        fn.apply(this, args)
            .then(res => {
                this.resRejObj[id]['resolve'](res)
            })
            .catch(err => {
                this.resRejObj[id]['reject'](err)
            })
            .finally(() => {
                delete this.resRejObj[id];
                this.available++;
                this.runQueue();
            })
    }
};

