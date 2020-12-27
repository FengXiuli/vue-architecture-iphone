<template>
  <el-container>
    <app-header></app-header>
    <app-main></app-main>
    <p class="ok">2</p>
    <app-navbar></app-navbar>
  </el-container>
</template>
<script>
import AppHeader from './AppHeader'
import AppMain from './AppMain'
import AppNavbar from './AppNavbar'
export default {
    components: {
        AppHeader, AppMain, AppNavbar
    },
}
</script>

<style lang="scss">

</style>
