<template>
    <div>
        <module-header content="element的transfer组件"></module-header>
        <el-transfer v-model="value" :data="data" style="margin-left:10px;margin-top:10px;"></el-transfer>
    </div>
</template>
<script>
    import ModuleHeader from "../../common/ModuleHeader";
    export default {
        data() {
            const generateData = _ => {
                const data = [];
                for (let i = 1; i <= 15; i++) {
                    data.push({
                        key: i,
                        label: `备选项 ${ i }`,
                        disabled: i % 4 === 0
                    });
                }
                return data;
            };
            return {
                data: generateData(),
                value: [1, 4]
            };
        },
        components:{
            ModuleHeader
        }
    };
</script>