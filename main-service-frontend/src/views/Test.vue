<template>
    <div class="hello-world">
        <div class="part-left">
            <h3>模块列表</h3>
            <draggable v-model="sourceArray"
                       class="drag-source"
                       group="people"
                       @start="drag=true"
                       @end="drag=false">
                <div v-for="element in sourceArray"
                     :key="element.i"
                     class="drag-item">
                    {{element.content}}
                </div>
            </draggable>
        </div>
        <div class="part-mid">
            <h3>模版预览</h3>
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
        </div>
        <div class="part-right">
            <h3>模版配置</h3>
            <pre class="conf-display">[]</pre>
        </div>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'
    import VueGridLayout from 'vue-grid-layout';

    export default {
        data() {
            return {
                //item.i,:key必须都是item.i，不要改属性名了！！！
                sourceArray: [
                    {"x": 0, "y": 0, "w": 3, "h": 2, "i": "1", "content": "模块111"},
                    {"x": 0, "y": 0, "w": 3, "h": 2, "i": "2", "content": "模块222"},
                    {"x": 0, "y": 0, "w": 3, "h": 2, "i": "3", "content": "模块333"},
                    {"x": 0, "y": 0, "w": 3, "h": 2, "i": "4", "content": "模块444"},
                    {"x": 0, "y": 0, "w": 3, "h": 2, "i": "5", "content": "模块555"},
                    {"x": 0, "y": 0, "w": 3, "h": 2, "i": "6", "content": "模块666"},
                    {"x": 0, "y": 0, "w": 3, "h": 2, "i": "7", "content": "模块777"}
                ],
                targetArray: [],
                layout: [],
                showDom: null,
            }
        },
        watch: {
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
                    this.showDom.innerHTML = JSON.stringify(val, null, 2)
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
                //不要干蠢事，进行赋值操作！！！
                const target = this.targetArray.find(item => item.i === i);
                this.targetArray = this.targetArray.filter(item => item.i !== i);
                this.sourceArray.push(target);
            }
        },
        mounted() {
            this.showDom = document.querySelector('.conf-display');
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .hello-world {
        margin: 0 10px;
        height: calc(100% - 45px);
        display: flex;

        h3 {
            padding-top: 10px;
            padding-left: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid gray;
        }

        .part-left {
            width: 120px;
            border: 1px solid blue;
            height: 100%;
            background-color: lightcoral;

            .drag-source {
                .drag-item:hover .drag-delete {
                    display: inline-block;
                }

                .drag-item {
                    cursor: pointer;
                    background-color: #298dff;
                    margin: 20px;

                    .drag-delete {
                        display: none;
                    }
                }
            }
        }

        .part-mid {
            flex: 1;
            border: 1px solid gray;
            margin: 0 10px;
            height: 100%;
            display: flex;
            flex-direction: column;

            .drag-target {
                flex: 1;

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

        .part-right {
            width: 200px;
            border: 1px solid blue;
            display: flex;
            flex-direction: column;
            background-color: lightgrey;

            .conf-display {
                flex: 1;
                height: 100%;
                overflow: auto;
            }
        }
    }
</style>
