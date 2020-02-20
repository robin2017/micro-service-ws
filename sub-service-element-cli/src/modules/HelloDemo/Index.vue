<template>
    <section class="Index">
        <h1>Hello,MicroService</h1>
<!--        <el-button type="primary" @click="btnClick">按钮</el-button>-->
        <h2>从后台获取信息：</h2>
        <ul>
            <li v-for="(info,index) in infoList" :key="index">
                {{info.name}}
            </li>
        </ul>
    </section>
</template>
<script>
    import httpUtil from '@http'
    export default {
        name: "Index",
        data() {
            return {
                infoList: []
            }
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
     color:red;
    }
</style>


