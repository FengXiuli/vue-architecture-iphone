<template>
  <div>
      <!-- 头部区域 -->
      <app-header/>  <!--导入的组件的名称为AppHeader，将其放入页面中则写成app-header,将大写变小写，两个大写的之间加连字符，具体为什么我还是不太清楚 -->
      <!-- 左侧导航栏区域 -->
      <app-navbar/>
      <!-- 右侧主体区域 -->
      <app-main/>
  </div>
</template>

<script>
import AppHeader from './AppHeader'
import AppMain from './AppMain'
import AppNavbar from './AppNavbar'
export default {
    components: {
        AppHeader, AppMain, AppNavbar
    }
}
</script>

<style scoped>
/* 头部区域 */
.header {
    position: absolute;
    line-height: 50px;
    padding: 0px;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #2980b9;
}
/* 左侧导航栏 */
.navbar {
    position: absolute;
    width: 64px;
    top: 50px;
    left: 0px;
    bottom: 0px;
    overflow-y: auto;
    background-color: #545c64;
}
/* 右侧主题区域 */
.main {
    position: absolute;
    top: 50px;
    left: 54px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    overflow-y: auto;
}
</style>
