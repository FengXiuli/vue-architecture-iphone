<template>
    <mt-tabbar fixed class="m-tabbar">
  <div>
    
    <router-link to="/robot/" class="tab">
      <i class="el-icon-user"></i>
      <p>机器人</p>
    </router-link>
  </div>
  <div>
    <router-link to="/sensar/" class="tab">
      <i class="el-icon-user"></i>
      <p>楼宇</p>
    </router-link>
  </div>
  <div>
    <router-link to="/electricMeter/" class="tab">
      <i class="el-icon-user"></i>
      <p>电表</p>
    </router-link>
  </div>
  <div>
    <router-link to="/switch/" class="tab">
      <i class="el-icon-user"></i>
      <p>路灯</p>
    </router-link>
  </div>
  <div>
    <router-link to="/my/" class="tab">
      <i class="el-icon-user"></i>
      <p>我的</p>
    </router-link>
  </div>
</mt-tabbar>
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

<style scoped lang="scss">
.m-tabbar {
  height: 78px;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
  background: #26a2ff;
  .tab {
    text-decoration: none;
  }
  i {
    color: white;
  }
  p {
    margin-top: -5px;
    font-size: 28px;
    color: white;
  }
  .nav {
   font-size: 36px; 
  }
}
</style>