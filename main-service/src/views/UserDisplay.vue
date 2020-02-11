<template>
    <div class="user-display">

        <h4>用户页面展示:业务:{{bizName}},模版:{{tempName}}</h4>
        <div v-if="moduleConfigs.length===0" style="color:lightgrey;display: flex;justify-content: center;">未配置该模版
        </div>
        <grid-layout
                :layout.sync="moduleConfigs"
                :col-num="12"
                :row-height="30"
                :is-draggable="false"
                :is-resizable="false"
                :is-mirrored="false"
                :vertical-compact="true"
                :margin="[10, 10]"
                :use-css-transforms="true">
            <grid-item v-for="item in moduleConfigs"
                       class="drag-grid-item"
                       style="overflow:auto"
                       :x="item.x"
                       :y="item.y"
                       :w="item.w"
                       :h="item.h"
                       :i="item.i"
                       :key="item.i">
                <component :is="item.compName"></component>

            </grid-item>
        </grid-layout>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import VueGridLayout from "vue-grid-layout";


    export default {
        name: "UserDisplay",
        data() {
            return {
                moduleConfigs: []
            }
        },
        computed: {

            ...mapState({
                templateList: 'templateList'
            }),
            bizName() {
                return this.$route.query.bizName
            },
            tempName() {
                return this.$route.query.tempName
            }
        },
        components: {
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,

        },
        methods: {
            addScripts(list) {
                console.log('根据列表添加脚本:', list)
                let fragment = new DocumentFragment();
                const urls = list.map(item => {
                    let script = document.createElement('script');
                    script.src = item.url;
                    fragment.appendChild(script);
                    return item.url
                });
                console.log('资源URL：', urls);
                console.log('代码片段:', fragment)
                document.body.appendChild(fragment);
            },
            getConfigByBizTemp(bizName, tempName) {
                console.log('templateList:', this.templateList);
                let configs = []
                try {
                    configs = this.templateList.find(item => item.bizName === bizName)
                        .templates.find(item => item.tempName === tempName).configs;
                } catch (e) {
                    console.error('没找到模版')
                }
                console.log('页面模块配置：', configs);
                this.moduleConfigs = configs;
                this.addScripts(configs)
            }
        },
        mounted() {
            console.log('bizName,tempName:', this.bizName, this.tempName)
            this.getConfigByBizTemp(this.bizName, this.tempName)
        }
    }
</script>

<style lang="less">
    .user-display {
        h4 {
            margin: 10px;
        }

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
</style>