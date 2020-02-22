<template>
    <section class="Index">
        <module-header content="antd的hello组件"></module-header>
        <div style="margin-left:10px;">
            <h1>Hello,Ant-Design</h1>
            <h4>欢迎各位：</h4>
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
                infoList: []
            }
        },
        components:{
            ModuleHeader
        },
        methods: {
            btnClick(){
                console.log('btn click')
            },
            getInfo() {
                httpUtil.getPersonList().then(data => {
                    console.log(data);
                    this.infoList = data;
                })
            }
        },
        mounted() {
            console.log('mounted');
            this.getInfo()
        }
    }
</script>
<style>
    .Index h1 {
     color:#2f53ea;
    }
</style>


