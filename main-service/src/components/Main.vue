<template>
    <div>
        <h1>获取微服务注册列表</h1>
        <el-table
                :data="microServiceList"
                style="width: 100%">
            <el-table-column
                    prop="serviceName"
                    label="服务名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="microServiceName"
                    label="微服务名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="微服务地址">
                <template slot-scope="scope">
                    <a :href="scope.row.microServiceURL">{{scope.row.microServiceURL}}</a>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import httpUtil from '@http'
    import {get} from '@http/api'

    export default {
        name: "Main",
        data() {
            return {
                serviceList: [],
                microService: {},
                microServiceList: [{
                    serviceName: 'service',
                    microServiceName: 'service',
                    microServiceURL: 'dddd'
                }]
            }
        },
        methods: {
            async getMicroService() {
                for (let i = 0; i < this.serviceList.length; i++) {
                    let item = this.serviceList[i];
                    let pkgUrl = `http://${item.ipPort}/${item.path}/package.json`;
                    console.log(pkgUrl);
                    await get(pkgUrl).then(serve => {
                        let name = serve.name;
                        let microService = {
                            url: `http://${item.ipPort}/${item.path}`,
                            modules: serve['micro-service-modules']
                        };
                        this.microService[name] = microService
                    })
                }
            },
            getMicroServiceList() {
                console.log('getMicroServiceList====:', this.microService);
                let list = [];
                for (let key in this.microService) {
                    let baseUrl = this.microService[key].url;
                    let modules = this.microService[key].modules;
                    for (let i = 0; i < modules.length; i++) {
                        let module = modules[i];
                        let name = module.name;
                        let url = `${baseUrl}/${module.module}/ms-wc-${name}.js`;
                        list.push({
                            serviceName: key,
                            microServiceName: name,
                            microServiceURL: url
                        });
                    }
                }
                console.log('计算结果：', list);
                this.microServiceList = list;
            }
        },
        mounted() {
            httpUtil.getServiceList().then(async data => {
                this.serviceList = data;
                await this.getMicroService();
                this.getMicroServiceList()
            });
        }
    }
</script>

<style scoped>

</style>