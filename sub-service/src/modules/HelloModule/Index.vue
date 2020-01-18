<template>
    <section class="Index">
        <h1>Hello,MicroService</h1>
    </section>
</template>

<script>
    import Vue from 'vue'
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
            Vue.$nextTick(()=>{
                console.log('test')
            })
        }
    }
</script>

<style>
    .Index {
    }
</style>


