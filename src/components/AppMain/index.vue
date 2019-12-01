<template>
  <div class="main">
      <!-- 导入面包屑子组件 -->
      <!-- 获取导航名称使用$route.meta.title,路由地址使用$route.path -->
      <!--v-show当路由为/home不显示-->
      <app-link v-show="$route.path!=='/home'"/>
    <!-- 子路由渲染出口 -->
      <router-view></router-view>
  </div>
</template>

<script>
import AppLink from './Link.vue'//此处直接写'./Link'也是可以的
export default {
    components: {
        AppLink
    }
}
</script>

<style scoped>

</style>