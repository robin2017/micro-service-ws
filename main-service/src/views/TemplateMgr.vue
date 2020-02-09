<template>
    <div class="template-mgr">
        <el-card class="box-card left-card">
            <div slot="header" class="clearfix">
                <h4>模版列表</h4>
                <i class="icon-right el-icon-circle-plus-outline"></i>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
        <el-card class="box-card middle-card">
            <div slot="header" class="clearfix">
                <h4>模版预览</h4>
                <i class="icon-right el-icon-circle-check"></i>
            </div>
            <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
            </div>
        </el-card>
        <el-card class="box-card right-card">
            <div slot="header" class="clearfix">
                <h4>模块列表</h4>
            </div>
            <el-collapse v-model="activeNames" accordion>
                <el-collapse-item v-for="(group,index) in moduleGroup"
                                  :title="group.bizName"
                                  :key="index"
                                  :name="index+1">
                    <ul>
                        <li v-for="(module ,ind) in group.groupList" :key="ind"> {{module.moduleName}}</li>
                    </ul>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "templateMgr",
        data() {
            return {
                activeNames: 1,
            }
        },
        computed: {
            ...mapState({
                moduleGroup: 'moduleGroup'
            })
        },
        watch: {
            moduleGroup(val) {
                console.log('moduleGroup change:', val)
            }
        },
        mounted() {
            console.log('moduleGroup val:', this.moduleGroup)
        }
    }
</script>

<style scoped lang="less">
    .template-mgr {
        display: flex;
        padding: 10px;
        box-sizing: border-box;
        height: 100%;
        background-color: lightgrey;

        .left-card {
            width: 200px;
        }

        .middle-card {
            flex: 1;
            margin: 0 10px;
        }

        .right-card {
            width: 200px;
        }
    }
</style>
<style lang="less">
    .template-mgr {
        .el-card {
            .el-card__header {
                padding: 8px 20px;

                h4 {
                    display: inline;
                }

                .icon-right {
                    float: right;
                    padding: 3px 0;
                    cursor: pointer
                }
            }
        }
    }
</style>