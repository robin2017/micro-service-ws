<template>
    <div>
        <module-header content="element的table组件"></module-header>
        <div style="margin:10px;">
            <span>数据来源：</span>
            <span style="text-decoration: underline;color:blue;cursor:pointer"
                  @click="openUrl">{{dataUrl}}</span>
        </div>
        <el-table
                :data="tableData"
                style="width: 100%;">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>
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
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },
                    {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    },
                    {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }
                ]
            }
        },
        computed: {
            dataUrl() {
                return getRuntimeBaseUrl() + process.env.VUE_APP_BASE_API + host.tableList
            }
        },
        components: {
            ModuleHeader
        },
        methods: {
            openUrl() {
                window.open(this.dataUrl)
            },
        },
        mounted() {

            httpUtil.getTableList().then(data => {
                console.log(data);
                this.tableData = data;
            })
        }
    }
</script>
