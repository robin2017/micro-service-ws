<template>
    <div>
        <module-header content="antd的tree组件"></module-header>
        <div style="margin:10px;">
            <span>数据来源：</span>
            <span style="text-decoration: underline;color:blue;cursor:pointer"
                  @click="openUrl">{{dataUrl}}</span>
        </div>
        <a-tree
                checkable
                @expand="onExpand"
                :expandedKeys="expandedKeys"
                :autoExpandParent="autoExpandParent"
                v-model="checkedKeys"
                @select="onSelect"
                :selectedKeys="selectedKeys"
                :treeData="treeData"
        />
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
                expandedKeys: ['0-0-0', '0-0-1'],
                autoExpandParent: true,
                checkedKeys: ['0-0-0'],
                selectedKeys: [],
                treeData:[]
            };
        },
        computed: {
            dataUrl() {
                return getRuntimeBaseUrl() + process.env.VUE_APP_BASE_API + host.treeList
            }
        },
        components: {
            ModuleHeader
        },
        watch: {
            checkedKeys(val) {
                console.log('onCheck', val);
            },
        },
        methods: {
            openUrl() {
                window.open(this.dataUrl)
            },
            onExpand(expandedKeys) {
                console.log('onExpand', expandedKeys);
                // if not set autoExpandParent to false, if children expanded, parent can not collapse.
                // or, you can remove all expanded children keys.
                this.expandedKeys = expandedKeys;
                this.autoExpandParent = false;
            },
            onCheck(checkedKeys) {
                console.log('onCheck', checkedKeys);
                this.checkedKeys = checkedKeys;
            },
            onSelect(selectedKeys, info) {
                console.log('onSelect', info);
                this.selectedKeys = selectedKeys;
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