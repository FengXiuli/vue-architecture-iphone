<template>
    <div class="navbar">
    <!--:router开启路由功能,则index指定路由地址
   default-active默认选中哪个菜单,选中为黄色,
   v-bind:default-active才可以指定表达式-->
        <el-menu
        :router="true" 
        :default-active="$route.path" 
        class="el-menu-vertical-demo" 
        background-color="#545c64"
        text-color="#fff" 
        active-text-color="#ffd04b"
        :collapse="isCollapse">
            <el-menu-item index="/home">
                <i class="el-icon-s-home"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/robot/">
                <i class="el-icon-user"></i>
                <span slot="title">机器人</span>
            </el-menu-item>
            <el-menu-item index="/sensar/">
                <i class="el-icon-attract"></i>
                <span slot="title">传感器</span>
            </el-menu-item>
            <el-menu-item index="/electricMeter/">
                <i class="el-icon-watch"></i>
                <span slot="title">智慧电表</span>
            </el-menu-item>
            <el-menu-item index="/switch/">
                <i class="el-icon-s-opportunity"></i>
                <span slot="title">开关</span>
            </el-menu-item>
            <el-menu-item index="/meteorological/">
                <i class="el-icon-lightning"></i>
                <span slot="title">气象站</span>
            </el-menu-item>
            <el-menu-item index="/transceiver/">
                <i class="el-icon-user"></i>
                <span slot="title">电台</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               isCollapse: true, 
            }
        }
    }
</script>

<style scoped>
.el-menu {
    border-right: none;
}
</style>