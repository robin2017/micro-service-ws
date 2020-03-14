<template>
    <section class="Index">
        <module-header content="element的global组件"></module-header>
        <div style="margin-left:10px;">
            <div style="margin:10px;">
                <el-button type="primary" @click="openDialog">对话框</el-button>
            </div>
            <div style="margin:10px;">
                <el-button type="primary" @click="sendMsg">消息提示</el-button>
            </div>
            <div style="margin:10px;">
                <el-button type="primary" @click="sendEventBus">消息总线</el-button>
            </div>
            <el-dialog
                    :append-to-body="true"
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                <span>这是子应用打开的全局对话框</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </section>
</template>
<script>
    import ModuleHeader from "../../common/ModuleHeader";
    import httpUtil from '@http'

    export default {
        name: "Index",
        data() {
            return {
                dialogVisible: false
            }
        },
        components: {
            ModuleHeader
        },
        methods: {
            openDialog() {
                this.dialogVisible = true
            },
            sendMsg() {
                this.$message.warn('这是子应用弹出的全局消息提示')
            },
            sendEventBus() {
                window.eventBus.$emit('hello', 'global组件发来问候')
            }
        }
    }
</script>
<style>
    .Index h1 {
        color: #409eff;
    }


</style>


