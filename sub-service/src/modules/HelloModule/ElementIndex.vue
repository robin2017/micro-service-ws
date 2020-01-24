<template>
    <section class="Index">
        <h1>Hello,MicroService</h1>
        <el-button type="primary">按钮</el-button>
    </section>
</template>

<script>
    // import Vue from 'vue';
    // import ElementUI from 'element-ui';
    // import 'element-ui/lib/theme-chalk/index.css';
    // Vue.use(ElementUI);

    export default {
        name: "Index",
        props: {},
        data: function () {
            return {}
        },
        computed: {},
        watch: {},
        methods: {},
        mounted() {
            console.log('mounted')
        }
    }
</script>

<style>
    .Index h1 {
     color:red;
    }
</style>


