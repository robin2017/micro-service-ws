<template>
    <div>
        <el-table
                :data="moduleList"
                style="width: 100%">
            <el-table-column
                    prop="bizName"
                    label="业务名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="moduleName"
                    label="模块名称"
                    width="80">
            </el-table-column>
            <el-table-column
                    prop="moduleUrl"
                    label="模块资源">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="openUrl(scope.row.moduleUrl)" type="primary">打开</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        computed: {
            ...mapState({
                moduleList: 'moduleList'
            })
        },
        watch: {
            moduleList(val) {
                console.log('moduleList change：', val)
            }
        },
        methods: {
            ...mapMutations({
                setModuleList: 'setModuleList'
            }),
            openUrl(url) {
                console.log(url);
                window.open(url);
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
