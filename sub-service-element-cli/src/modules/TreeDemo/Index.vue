<template>
    <div>
        <module-header content="element的tree组件"></module-header>
        <div style="margin:10px;">
            <span>数据来源：</span>
            <span style="text-decoration: underline;color:blue;cursor:pointer"
                  @click="openUrl">{{dataUrl}}</span>
        </div>
        <el-tree
                :data="treeData"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                :props="defaultProps">
        </el-tree>
    </div>
</template>
<script>
    import ModuleHeader from "../../common/ModuleHeader";
    import httpUtil from '@http'
    import {getRuntimeBaseUrl} from '@http/utils'
    import host from '@http/host'
    export default {
        data() {
            return {
                treeData: [
                    {
                        id: 1,
                        label: '一级 1',
                        children: [{
                            id: 4,
                            label: '二级 1-1',
                            children: [{
                                id: 9,
                                label: '三级 1-1-1'
                            }, {
                                id: 10,
                                label: '三级 1-1-2'
                            }]
                        }]
                    },
                    {
                        id: 2,
                        label: '一级 2',
                        children: [{
                            id: 5,
                            label: '二级 2-1'
                        },
                            {
                                id: 6,
                                label: '二级 2-2'
                            }]
                    },
                    {
                        id: 3,
                        label: '一级 3',
                        children: [{
                            id: 7,
                            label: '二级 3-1'
                        }, {
                            id: 8,
                            label: '二级 3-2'
                        }]
                    }
                ],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        computed: {
            dataUrl() {
                let url = getRuntimeBaseUrl() + process.env.VUE_APP_BASE_API + host.treeList
                const KEY = 'ele_tree'
                const localUrl = window.localStorage.getItem(KEY);
                if (localUrl) {
                    url = localUrl
                }else{
                    window.localStorage.setItem(KEY,url)
                }
                return url;
            }
        },
        components:{
            ModuleHeader
        },
        methods: {
            openUrl() {
                window.open(this.dataUrl)
            },
        },
        mounted() {
            httpUtil.getTreeList().then(data => {
                console.log(data);
                this.treeData = data;
            })
        }
    };
</script>