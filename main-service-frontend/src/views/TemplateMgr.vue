<template>
    <div class="template-mgr">
        <el-card class="box-card left-card">
            <div slot="header" class="clearfix">
                <h4>信息专题列表</h4>
                <i class="icon-right el-icon-circle-plus-outline" @click="addTemplate"></i>
            </div>
            <el-collapse v-model="templateBizs">
                <el-collapse-item v-for="(biz,index) in templateList"
                                  :title="biz.bizName"
                                  :name="index+1"
                                  :key="index">
                    <div v-for="(temp,ind) in biz.templates"
                         class="template-item "
                         :class="{'selected-temp':selectedItem.bizName===biz.bizName&&selectedItem.tempName===temp.tempName}"
                         @click="templateClick(biz.bizName,temp.tempName)"
                         :key="ind">
                        <h4>{{temp.tempName}}</h4>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </el-card>
        <el-card class="box-card middle-card">
            <div slot="header" class="clearfix">
                <h4>专题预览</h4>
                <label class="icon-right-btn" style="font-size:12px;color:lightblue"
                       v-if="previewState===0">请选择左侧一个专题</label>
                <el-button type="primary" class="icon-right-btn" v-if="previewState===1" @click="previewEditClick">编辑
                </el-button>
                <el-button type="primary" class="icon-right-btn" v-if="previewState===2" @click="previewSaveClick">保存
                </el-button>
            </div>
            <draggable v-model="targetArray"
                       :disabled="!previewEdit"
                       class="drag-target"
                       :class="{'drag-target-no-edit':!previewEdit,'drag-target-is-edit':previewEdit}"
                       group="modulelItem"
                       @start="targetDragStart"
                       @add="targetAdd"
                       @end="targetEnd">
                <grid-layout
                        :layout.sync="layout"
                        :col-num="12"
                        :row-height="30"
                        :is-draggable="previewEdit"
                        :is-resizable="previewEdit"
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
                <h4>信息块列表</h4>
            </div>
            <el-collapse v-model="moduleBiz" accordion>
                <el-collapse-item v-for="(group,index) in moduleGroup"
                                  :title="group.bizName"
                                  :key="index"
                                  :name="index+1">
                    <draggable v-model="sourceArrayObject[group.bizName]"
                               class="drag-source"
                               group="modulelItem"
                               @start="sourceStart"
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
        <el-dialog
                title="提示"
                :visible.sync="addTemplateVisible"
                width="30%">
            <el-form :model="tempForm" :rules="tempRule" ref="tempForm" label-width="80px">
                <el-form-item label="业务名称" prop="bizName">
                    <el-input v-model="tempForm.bizName"></el-input>
                </el-form-item>
                <el-form-item label="模版名称" prop="tempName">
                    <el-input v-model="tempForm.tempName"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addTemplateVisible = false">取 消</el-button>
                <el-button type="primary" @click="formConfirm">确 定</el-button>
            </span>
        </el-dialog>
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
                selectedItem: {
                    bizName: null,
                    tempName: null
                },
                moduleBiz: 1,
                sourceArrayObject: {},
                targetArray: [],
                layout: [],
                installedUrl: [],
                previewState: 0,//0，请选择模版；1，编辑；2，保存
                addTemplateVisible: false,
                tempForm: {
                    bizName: '',
                    tempName: ''
                },
                tempRule: {
                    bizName: [
                        {required: true, message: '请输入业务名称', trigger: 'blur'},
                        {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                    ],
                    tempName: [
                        {required: true, message: '请选择模版名称', trigger: 'change'},
                        {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        computed: {
            previewEdit() {
                return this.previewState === 2;
            },
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
                }
            },
            templateList(val){
                console.log('---------templateList  change ------:',val)
            }
        },
        components: {
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
            draggable,
        },
        methods: {
            targetAdd(evt) {
                debugger
                console.log('00000010:', evt)
            },
            targetEnd(evt) {
                console.log('00000200:', evt)
            },
            targetDragStart(evt) {
                console.log('0000000:', evt)
            },
            sourceStart(evt) {
                console.log('ddddddd:', evt)
            },
            previewEditClick() {
                this.previewState = 2;
            },
            previewSaveClick() {
                this.previewState = 1;
                console.log('保存预览：', JSON.stringify(this.layout));
                console.log(this.selectedItem)
                let curTemp = this.templateList.find(item => item.bizName === this.selectedItem.bizName)
                    .templates.find(item => item.tempName === this.selectedItem.tempName);
                curTemp.configs = this.layout;
                console.log('=======>', this.templateList)
            },
            formConfirm() {
                this.$refs['tempForm'].validate((valid) => {
                    console.log('valid:', valid);
                    if (valid) {
                        console.log(this.tempForm)
                        let bizItem = this.templateList.find(item => item.bizName === this.tempForm.bizName);
                        if (bizItem) {
                            const tempItem = bizItem.templates.find(item => item.tempName === this.tempForm.tempName)
                            if (tempItem) {
                                this.$message('已存在该模版，请重新输入!!!');
                                return false;
                            }
                        }
                        if (!bizItem) {//不存在业务
                            bizItem = {
                                bizName: this.tempForm.bizName,
                                templates: [{tempName: this.tempForm.tempName, configs: []}]
                            };
                            //这样不合适，应该调用vuex的接口
                            this.templateList.push(bizItem)
                        } else {//存在业务，不存在模版
                            bizItem.templates.push({tempName: this.tempForm.tempName, configs: []})
                        }
                        this.$message({type: 'success', message: '保存成功'});
                        //同时更新后端服务
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                // this.addTemplateVisible = false
            },
            addTemplate() {
                console.log('添加模版');
                //清空
                for (let key in this.tempForm) {
                    this.tempForm[key] = ""
                }
                this.addTemplateVisible = true;

            },
            templateClick(biz, temp) {
                this.selectedItem = {bizName: biz, tempName: temp}
                console.log('====:', this.selectedItem);
                const configs = this.templateList.find(item => item.bizName === biz)
                    .templates.find(item => item.tempName === temp).configs;
                console.log('=======', configs);
                this.targetArray = configs;
                this.previewState = 1;
            },
            addScripts(list) {
                console.log('根据列表添加脚本:', list)
                let fragment = document.createDocumentFragment()
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
                document.querySelector('#wcMounted').appendChild(fragment)
                //document.head.appendChild(fragment);
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
                overflow: auto;

                .drag-grid-item {
                    border: 1px solid gray;
                    position: relative;

                    .el-icon-delete {
                        display: none;
                        position: absolute;
                        top: 5px;
                        right: 5px;
                    }
                }
            }

            .drag-target-is-edit {
                border: 1px solid gray;

                .drag-grid-item:hover {
                    background-color: rgba(100, 100, 100, 0.4);

                    .el-icon-delete {
                        cursor: pointer;
                        display: inline-block;
                    }
                }

                .drag-grid-item {
                    border: 1px solid red;
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