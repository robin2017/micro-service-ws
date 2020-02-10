<template>
    <div class="template-mgr">
        <el-card class="box-card left-card">
            <div slot="header" class="clearfix">
                <h4>模版列表</h4>
                <i class="icon-right el-icon-circle-plus-outline"></i>
            </div>
            <el-collapse v-model="templateBizs">
                <el-collapse-item v-for="(biz,index) in templateList"
                                  :title="biz.bizName"
                                  :name="index+1"
                                  :key="index">
                    <div v-for="(temp,ind) in biz.templates"
                         class="template-item "
                         :class="{'selected-temp':selectedTemp===(biz.bizName+'_'+temp.tempName)}"
                         @click="templateClick(biz.bizName,temp.tempName)"
                         :key="ind">
                        <h4>{{temp.tempName}}</h4>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
        <el-card class="box-card middle-card">
            <div slot="header" class="clearfix">
                <h4>模版预览</h4>
                <el-button type="primary" class="icon-right-btn" v-if="!previewEdit">编辑</el-button>
                <el-button type="primary" class="icon-right-btn" v-if="previewEdit" @click="savePreview">保存</el-button>
            </div>
            <draggable v-model="targetArray"
                       class="drag-target"
                       group="modulelItem"
                       @start="drag=true"
                       @add="targetAdd"
                       @end="targetEnd">
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
                               style="overflow:auto"
                               :x="item.x"
                               :y="item.y"
                               :w="item.w"
                               :h="item.h"
                               :i="item.i"
                               :key="item.i">
                        <component :is="item.compName"></component>
                        <i class="el-icon-delete" @click="deleteItem(item.i)"></i>
                    </grid-item>
                </grid-layout>
            </draggable>
        </el-card>
        <el-card class="box-card right-card">
            <div slot="header" class="clearfix">
                <h4>模块列表</h4>
            </div>
            <el-collapse v-model="moduleBiz" accordion>
                <el-collapse-item v-for="(group,index) in moduleGroup"
                                  :title="group.bizName"
                                  :key="index"
                                  :name="index+1">
                    <draggable v-model="sourceArrayObject[group.bizName]"
                               class="drag-source"
                               group="modulelItem"
                               @start="sourceDrag"
                               @end="drag=false">
                        <div v-for="element in sourceArrayObject[group.bizName]"
                             :key="element.i"
                             class="drag-item">
                            {{element.content}}
                        </div>
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
                templateBizs: ['1'],
                selectedTemp: null,
                moduleBiz: 1,
                sourceArrayObject: {},
                targetArray: [],
                layout: [],
                mountedDom: null,
                installedUrl: [],
                previewEdit: true
            }
        },
        computed: {
            ...mapState({
                moduleGroup: 'moduleGroup',
                templateList: 'templateList'
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
                this.addScripts(val);
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
            templateClick(biz, temp) {
                this.selectedTemp = biz + "_" + temp;
                console.log('====:', this.selectedTemp);
                const configs = this.templateList.find(item => item.bizName === biz)
                    .templates.find(item => item.tempName === temp).configs;
                console.log('=======', configs);
                this.targetArray = configs;
            },
            addScripts(list) {
                console.log('根据列表添加脚本:', list)
                let fragment = new DocumentFragment();
                const urls = list.map(item => {
                    if (!this.installedUrl.includes(item.url)) {
                        let script = document.createElement('script');
                        script.src = item.url;
                        fragment.appendChild(script);
                        this.installedUrl.push(item.url)
                    }
                    return item.url
                });
                console.log('资源URL：', urls);
                console.log('代码片段:', fragment)
                document.body.appendChild(fragment);
            },
            savePreview() {
                console.log('保存预览：', JSON.stringify(this.layout))
            },
            sourceDrag() {
                //console.log('source drag:=======>',arguments)
            },
            targetAdd(evt) {
                // console.log('target add:=======>',evt)
            },
            targetEnd() {
                // console.log('target end:=======>',arguments)
            },
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
                            "i": ind + "", "content": item.moduleName, "url": item.moduleUrl, "bizName": group.bizName,
                            "compName": "ms-wc-" + item.moduleName
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
            this.mountedDom = document.querySelector('#dyn-source');
            console.log('动态挂载节点：', this.mountedDom)

            console.log('templateList=========:', this.templateList)
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

            .template-item {
                background-color: lightgrey;
                margin: 5px;
                padding-left: 10px;
                cursor: pointer;
            }

            .selected-temp {
                background-color: lightcoral;
            }
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

            .drag-item {
                background-color: lightgrey;
                padding-left: 10px;
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

                .icon-right-btn {
                    float: right;
                    padding: 3px 6px;
                }
            }

            .el-card__body {
                flex: 1;
            }
        }
    }
</style>