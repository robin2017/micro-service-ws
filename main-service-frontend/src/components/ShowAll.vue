<template>
    <div class="show-all">
        <h1>微服务展示</h1>
        <div class="part-sub">
            <ms-wc-table></ms-wc-table>
        </div>
        <div class="part-sub">
            <ms-wc-tree></ms-wc-tree>
        </div>
        <div class="part-sub">
            <ms-wc-collapse></ms-wc-collapse>
        </div>
        <div class="part-sub">
            <ms-wc-hello></ms-wc-hello>
        </div>
    </div>
</template>

<style scoped>
    .show-all .part-sub {
        margin:5px;
        display:inline-block;
        height: 200px;
        width: 600px;
        border: 1px solid red;
        overflow: auto
    }
</style>