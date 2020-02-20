<template>
    <section class="Index">
        <h4>Basic</h4>
        <a-button-group>
            <a-button>Cancel</a-button>
            <a-button type="primary">OK</a-button>
        </a-button-group>
    </section>
</template>
<script>

    export default {
        name: "Index",
        mounted() {
            console.log('mounted');
        }
    }
</script>
<style>
    .Index h4 {
     color:red;
    }
</style>


