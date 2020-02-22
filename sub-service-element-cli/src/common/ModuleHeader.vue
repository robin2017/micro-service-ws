<template>
    <div class="module-header"><span>{{content}}</span></div>
</template>

<script>
    export default {
        name: "moduleHeader",
        props: {
            content: {
                require: true,
                type: String
            }
        }
    }
</script>

<style scoped>
    .module-header {
        border-bottom: 1px solid lightgray;
        align-items: center;
        display: flex;
        height: 40px;
        font-weight: bold;
        padding-left: 20px;

    }

    /*antd主色调#2f53ea，ele主色调#409eff*/
    .module-header span {
        border-left: 4px solid #409eff;
        padding-left: 10px;
    }
</style>