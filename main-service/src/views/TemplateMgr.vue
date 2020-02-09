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
            <draggable v-model="targetArray"
                       class="drag-target"
                       group="people"
                       @start="drag=true"
                       @end="drag=false">
                <grid-layout
                        :layout.sync="layout"
                        :col-num="12"
                        :row-height="30"
                        :is-draggable="true"
                        :is-resizable="true"
                        :is-mirrored="false"
                        :vertical-compact="true"
                        :margin="[10, 10]"
                        :use-css-transforms="true">
                    <grid-item v-for="item in layout"
                               class="drag-grid-item"
                               :x="item.x"
                               :y="item.y"
                               :w="item.w"
                               :h="item.h"
                               :i="item.i"
                               :key="item.i">
                        {{item.content}}
                        <i class="el-icon-delete" @click="deleteItem(item.i)"></i>
                    </grid-item>
                </grid-layout>
            </draggable>
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
                    <draggable v-model="sourceArrayObject[group.bizName]"
                               class="drag-source"
                               group="people"
                               @start="drag=true"
                               @end="drag=false">
                        <div v-for="element in sourceArrayObject[group.bizName]"
                             :key="element.i"
                             class="drag-item">
                            {{element.content}}
                        </div>
                        <!--                        <div v-for="(module ,ind) in group.groupList"-->
                        <!--                             :key="ind"-->
                        <!--                             class="module-item">-->
                        <!--                            {{module.moduleName}}-->
                        <!--                        </div>-->
                    </draggable>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import VueGridLayout from 'vue-grid-layout';
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "templateMgr",
        data() {
            return {
                activeNames: 1,
                sourceArrayObject: {},

                targetArray: [],
                layout: [],
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
            },
            sourceArray(val) {
                console.log('sourceArray:', JSON.stringify(val))
            },
            targetArray(val) {
                console.log('targetArray:', JSON.stringify(val));
                this.layout = val;
            },
            layout: {
                deep: true,
                handler(val) {
                    console.log('layout change:', JSON.stringify(val))
                    //  this.showDom.innerHTML = JSON.stringify(val, null, 2)
                }
            }
        },
        components: {
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
            draggable,
        },
        methods: {
            deleteItem(i) {
                const target = this.targetArray.find(item => item.i === i);
                this.targetArray = this.targetArray.filter(item => item.i !== i);
                this.sourceArrayObject[target.bizName].push(target);
            },
            genSourceArrayObject() {
                let retList = {};
                let ind = 0;
                for (let i = 0; i < this.moduleGroup.length; i++) {
                    let group = this.moduleGroup[i];
                    let list = [];
                    for (let j = 0; j < group.groupList.length; j++) {
                        let item = group.groupList[j];
                        ind++;
                        list.push({
                            "x": 0, "y": 0, "w": 3, "h": 2,
                            "i": ind + "", "content": item.moduleName, "url": item.moduleUrl, "bizName": group.bizName
                        },)
                    }
                    retList[group.bizName] = list;
                }
                console.log('生成结果：', retList);
                this.sourceArrayObject = retList
            }
        },
        mounted() {
            console.log('moduleGroup val:', this.moduleGroup);
            this.genSourceArrayObject();
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

            .drag-target {
                height: 100%;
                border: 1px solid gray;
                overflow: auto;

                .drag-grid-item:hover {
                    background-color: rgba(100, 100, 100, 0.4);

                    .el-icon-delete {
                        cursor: pointer;
                        display: inline-block;
                    }
                }

                .drag-grid-item {
                    border: 1px solid red;
                    position: relative;

                    .el-icon-delete {
                        display: none;
                        position: absolute;
                        top: 5px;
                        right: 5px;
                    }
                }
            }
        }

        .right-card {
            width: 200px;

            .module-item {
                background-color: lightgrey;
                cursor: pointer;
                margin: 3px;
            }
        }
    }
</style>
<style lang="less">
    .template-mgr {
        .el-card {
            display: flex;
            flex-direction: column;

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

            .el-card__body {
                flex: 1;
            }
        }
    }
</style>