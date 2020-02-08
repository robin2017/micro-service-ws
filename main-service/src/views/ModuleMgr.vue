<template>
    <div>
    模块管理
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

</style>