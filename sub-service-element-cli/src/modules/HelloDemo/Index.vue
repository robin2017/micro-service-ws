<template>
    <section class="Index">
        <module-header content="element的hello组件"></module-header>
        <div style="margin-left:10px;">
            <h1>Hello,ElementUI</h1>
            <h4 style="display:inline">欢迎各位：</h4>
            <h4 style="display:inline">{{receiveMsg}}</h4>
            <ul>
                <li v-for="(info,index) in infoList" :key="index">
                    hello,{{info.name}}
                </li>
            </ul>
        </div>
    </section>
</template>
<script>
    import ModuleHeader from "../../common/ModuleHeader";
    import httpUtil from '@http'

    export default {
        name: "Index",
        data() {
            return {
                infoList: [],
                receiveMsg: ''
            }
        },
        components: {
            ModuleHeader
        },
        methods: {
            getInfo() {
                httpUtil.getPersonList().then(data => {
                    console.log(data);
                    this.infoList = data;
                })
            }
        },
        mounted() {
            window.eventBus.$on('hello', (msg) => {
                this.receiveMsg = msg
            })
            this.getInfo()
        }
    }
</script>
<style>
    .Index h1 {
        color: #409eff;
    }
</style>


