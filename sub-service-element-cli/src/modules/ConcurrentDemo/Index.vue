<template>
    <div>
        <el-button type="primary" @click="sendMsg">同时发送多个http请求</el-button>
    </div>
</template>

<script>
    import httpUtil from '@http'

    export default {
        name: "Index",
        methods: {
            sendMsg() {
                httpUtil.getCon1().then(data => {
                    console.log('获取data1数据：' + data);
                });
                httpUtil.getCon2().then(data => {
                    console.log('获取data2数据：' + data);
                });
                httpUtil.getCon3().then(data => {
                    console.log('获取data3数据：' + data);
                });
                httpUtil.getCon4().then(data => {
                    console.log('获取data4数据：' + data);
                });
            }
        }
    }
</script>

<style scoped>

</style>