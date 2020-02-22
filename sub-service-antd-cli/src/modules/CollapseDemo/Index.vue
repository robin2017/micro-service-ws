<template>
    <div>
        <module-header content="antd的collapse组件"></module-header>
        <a-collapse v-model="activeKey">
            <a-collapse-panel header="This is panel header 1" key="1">
                <p>{{text}}</p>
            </a-collapse-panel>
            <a-collapse-panel header="This is panel header 2" key="2" :disabled="false">
                <p>{{text}}</p>
            </a-collapse-panel>
            <a-collapse-panel header="This is panel header 3" key="3" disabled>
                <p>{{text}}</p>
            </a-collapse-panel>
        </a-collapse>
    </div>
</template>
<script>
    import ModuleHeader from "../../common/ModuleHeader";
    export default {
        data() {
            return {
                text: `A dog is a type of domesticated animal.Known for its loyalty and faithfulness,it can be found as a welcome guest in many households across the world.`,
                activeKey: ['1'],
            };
        },
        components:{
            ModuleHeader
        },
        watch: {
            activeKey(key) {
                console.log(key);
            },
        },
    };
</script>