<template>
    <div class="header">
        <!-- 头部左侧logo和标题 -->
        <a href="#/">
            <img class="logo" src="@/assets/header.jpg" width="25px">
            <span class="company">329项目管理系统</span>
        </a>
        <!-- 头部右侧下拉菜单 -->
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                admin<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">修改密码</el-dropdown-item>
                <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>

<script>
import {logout} from '@/api/login'

    export default {
        methods: {
            handleCommand(command) {
                switch (command) {
                    case 'a':
                        this.$message('修改密码')
                        break
                    case 'b':
                        // 退出系统
                        //此处的 localStorage.getItem('mgx-msm-token') 是AppHeader中index.vue中登录时保存在localStorage中的token
                        logout(localStorage.getItem('mxg-msm-token')).then(response => {
                            // console.log(response)
                            const resp = response.data
                            if (resp.flag) {
                                //退出系统
                                //清除本地缓存
                                localStorage.removeItem('mxg-msm-token')
                                localStorage.removeItem('mxg-msm-user')
                                //回到登录页面
                                this.$router.push('/login')
                            } else {
                                this.$message({
                                    message: resp.message,
                                    type: 'warning',
                                    duration: 500//弹出退出时间为500秒
                                  });
                            }
                        })
                }
                
            }
        }
    }
</script>

<style scoped>
/* 左侧图标和标题 */
.logo {
    vertical-align: middle;
    padding: 0 10px 0 40px;
}
.company {
    position: absolute;
    color: white;
}
/* 下拉菜单 */
.el-dropdown {
    float: right;
    margin-right: 40px;
}
.el-dropdown-link {
    cursor: pointer;
    color: #fff;
}
</style>