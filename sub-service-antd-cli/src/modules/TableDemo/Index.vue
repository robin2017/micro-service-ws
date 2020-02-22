<template>
    <div>
        <module-header content="antd的table组件"></module-header>
        <div style="margin:10px;">
            <span>数据来源：</span>
            <span style="text-decoration: underline;color:blue;cursor:pointer"
                  @click="openUrl">{{dataUrl}}</span>
        </div>
        <a-table :columns="columns" :dataSource="tableData" bordered>
            <template slot="name" slot-scope="text">
                <a href="javascript:;">{{text}}</a>
            </template>
        </a-table>
    </div>

</template>
<script>
    // In the fifth row, other columns are merged into first column
    // by setting it's colSpan to be 0
    const renderContent = (value, row, index) => {
        const obj = {
            children: value,
            attrs: {},
        };
        if (index === 4) {
            obj.attrs.colSpan = 0;
        }
        return obj;
    };


    import ModuleHeader from "../../common/ModuleHeader";
    import httpUtil from '@http'
    import {getRuntimeBaseUrl} from '@http/utils'
    import host from '@http/host'

    export default {
        data() {
            const columns = [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    customRender:renderContent,
                },
                {
                    title: 'Age',
                    dataIndex: 'age',
                    customRender: renderContent,
                },
                {
                    title: 'Home phone',
                    colSpan: 2,
                    dataIndex: 'tel',
                    customRender: (value, row, index) => {
                        const obj = {
                            children: value,
                            attrs: {},
                        };
                        if (index === 2) {
                            obj.attrs.rowSpan = 2;
                        }
                        // These two are merged into above cell
                        if (index === 3) {
                            obj.attrs.rowSpan = 0;
                        }
                        if (index === 4) {
                            obj.attrs.colSpan = 0;
                        }
                        return obj;
                    },
                },
                {
                    title: 'Phone',
                    colSpan: 0,
                    dataIndex: 'phone',
                    customRender: renderContent,
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                    customRender: renderContent,
                },
            ];
            return {
                tableData: [],
                columns,
            };
        },
        computed: {
            dataUrl() {
                return getRuntimeBaseUrl() + process.env.VUE_APP_BASE_API + host.tableList
            }
        },
        methods: {
            openUrl() {
                window.open(this.dataUrl)
            },
        },
        components: {
            ModuleHeader
        },
        mounted() {
            httpUtil.getTableList().then(data => {
                console.log(data);
                this.tableData = data;
            })
        }
    };
</script>