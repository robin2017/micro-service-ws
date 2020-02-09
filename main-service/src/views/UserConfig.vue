<template>
    <div class="user-config">
        <section class="header">
            <img src="../assets/u304.svg">
            <h2>信息墙管理服务</h2>
            <el-menu :default-active="activeIndex"
                     router
                     class="el-menu-demo"
                     mode="horizontal"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b">
                <el-menu-item index="/userConfig/moduleMgr">
                    <i class="el-icon-suitcase"></i>
                    <span slot="title">模块管理</span>
                </el-menu-item>
                <el-menu-item index="/userConfig/templateMgr">
                    <i class="el-icon-suitcase-1"></i>
                    <span slot="title">模版管理</span>
                </el-menu-item>
                <el-menu-item index="/userConfig/userMgr" disabled>
                    <i class="el-icon-user"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
            </el-menu>
        </section>
        <section class="menu-body">
            <router-view></router-view>
        </section>
    </div>
</template>
<script>
    import httpUtils from '@http'
    import {mapState, mapMutations} from 'vuex'

    export default {
        data() {
            return {
                //默认子页面
                activeIndex: '/userConfig/moduleMgr'
            };
        },
        computed: {
            ...mapState({
                moduleList: 'moduleList'
            })
        },
        methods: {
            ...mapMutations({
                setModuleList: 'setModuleList',
                setModuleGroup: 'setModuleGroup'
            }),
            async getModuleList() {
                const serviceList = await httpUtils.getServiceList();
                console.log('子服务地址为：', serviceList);
                let pkgs = [];
                let moduleList = [];
                let moduleGroup = [];
                for (let i = 0; i < serviceList.length; i++) {
                    let pkg = await httpUtils.getServiceInfo(serviceList[i]).catch(err => {
                        console.log('获取子服务信息失败：', err);
                        return "error"
                    });
                    pkgs.push(pkg);

                    if (typeof pkg !== 'string') {
                        let bizName = pkg.name;
                        let groupList = [];
                        for (let j = 0; j < pkg['micro-service-modules'].length; j++) {
                            let moduleName = pkg['micro-service-modules'][j].name;
                            let moduleVersion = pkg['micro-service-modules'][j].version;
                            let folderName = pkg['micro-service-modules'][j].module;
                            let moduleUrl = `http://${serviceList[i]}/packages_wc/${folderName}/ms-wc-${moduleName}.js`;
                            moduleList.push({bizName, moduleName, moduleUrl, moduleVersion});
                            groupList.push({moduleName, moduleUrl, moduleVersion})
                        }
                        moduleGroup.push({bizName, groupList})
                    }
                }
                console.log('获取所有的pkgs：', pkgs);
                console.log('获取所有的moduleList:', moduleList);
                console.log('获取所有的moduleGroup:', moduleGroup);
                this.setModuleList(moduleList);
                this.setModuleGroup(moduleGroup);
            }
        },
        created() {
            this.getModuleList();
        },
        mounted() {
            //模拟vue-router中redirect效果
            this.$router.push({path: this.activeIndex}).catch(err => {
                console.log('输出报错：', err)
            });

        }
    }
</script>
<style scoped lang="less">
    .user-config {
        height:100%;
        display: flex;
        flex-direction: column;
        & > .header {
            min-width: 650px;
            background-color: #545c64;
            height: 48px;
            display: flex;
            align-items: center;

            img {
                margin-left: 10px;
            }

            h2 {
                color: white;
                display: inline;
                margin-left: 10px;
                margin-right: 20px;
            }

            .el-menu {
                display: inline-block;

            }
        }
        & > .menu-body{
            flex:1;
        }
    }
</style>
<style lang="less">
    .user-config {
        .el-menu--horizontal > .el-menu-item {
            height: 48px;
            line-height: 48px;
        }
    }
</style>

