<template>
    <div class="user-config">
        <section class="header">
            <img src="../assets/u304.svg">
            <h2>信息墙管理服务</h2>
            <el-menu :default-active="activeIndex"
                     router
                     class="el-menu-demo"
                     mode="horizontal"
                     background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b">
                <el-menu-item index="/userConfig/moduleMgr">
                    <i class="el-icon-suitcase"></i>
                    <span slot="title">模块管理</span>
                </el-menu-item>
                <el-menu-item index="/userConfig/templateMgr">
                    <i class="el-icon-suitcase-1"></i>
                    <span slot="title">模版管理</span>
                </el-menu-item>
                <el-menu-item index="/userConfig/userMgr" disabled>
                    <i class="el-icon-user"></i>
                    <span slot="title">用户管理</span>
                </el-menu-item>
            </el-menu>
        </section>
        <section>
            <router-view></router-view>
        </section>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                //默认子页面
                activeIndex: '/userConfig/moduleMgr'
            };
        },
        mounted() {
            //模拟vue-router中redirect效果
            this.$router.push({path: this.activeIndex})
        }
    }
</script>
<style scoped lang="less">
    .user-config {
        & > .header {
            min-width: 550px;
            background-color: #545c64;
            height: 48px;
            display: flex;
            align-items: center;

            img {
                margin-left: 10px;
            }

            h2 {
                color: white;
                display: inline;
                margin-left: 10px;
                margin-right: 20px;
            }

            .el-menu {
                display: inline-block;

            }
        }
    }
</style>
<style lang="less">
    .user-config {
        .el-menu--horizontal > .el-menu-item {
            height: 48px;
            line-height: 48px;
        }
    }
</style>

