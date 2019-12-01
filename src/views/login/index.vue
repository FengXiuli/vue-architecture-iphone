<template>
    <div class="login-container">
        <!-- 路由组件渲染出口 -->
        <!-- ref相当于id，:model相当于表单数据对象， label-width表单域标签的宽度 --> 
        <el-form :rules="rules" ref="form" :model="form" label-width="80px" class="login-form">
            <h2 class="login-title">329成员管理系统</h2>
            <el-form-item label="账号" prop="username">
                <el-input v-model="form.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <!-- @click="SubmitForm(form)调用的是上面的ref="form"中的ref值 （ref相当于id）-->
                <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
import {login, getUserInfo} from '@/api/login'

    export default {
    data() {
      return {
        form: {
        },
        //表单验证
        rules: {
            username: [//对应的el-form-item的prop值
                //不要将required写成require
                {required: true, message: "请输入有效账号", trigger: "blur"}//trigger: "blur"表示失去焦点时显示“请输入有效账号”
            ],
            password: [
                {required: true, meaasge: "请输入有效密码", trigger: "blur"}
            ]
        }
      }
    },
    methods: {
        
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
            //如果想要查看valid是什么，直接console.log(valid)即可
          if (valid) {
            //提交表单到后台，验证是否成功
            login(this.form.username, this.form.password).then(response => {
                const resp =response.data
                if(resp.flag) {
                    //验证通过，通过token获取用户信息，进行异步请求
                    getUserInfo(resp.data.token).then(response => {
                        //获取到了用户的数据
                        const respUser = response.data
                        // 如果获取信息成功
                        if(respUser.flag) {
                            //将获取到的信息保存到浏览器的localStorage中
                            // 要保存两个信息 1. token 2. 用户信息
                            localStorage.setItem('mxg-msm-user', JSON.stringify(respUser.data))
                            localStorage.setItem('mxg-msm-token', JSON.stringify(resp.data.token))
                            //前往首页
                            this.$router.push("/")
                        }else {
                            // 若获取信息失败，则弹出警告
                            //此代码在Element-ui中的message中可以找到，直接复制过来
                             this.$message({
                                message: respUser.message,
                                type: 'warning'
                            });
                        } 
                        
                    })
                }
            })
          } else {
            //   如果用户名和密码没有通过，弹出警告
            this.$message({
                message: resp.message,
                type: 'warning'
            });
          }
        });
      }
    }
  }
</script>

<style scoped>
.login-form {
    width: 350px;
    /* 上下间隙160px,左右自适应 */
    margin: 160px auto;
    /* 背景颜色透明 */
    background-color: rgb(225,225,225,0.8);
    padding: 30px;
    /* 圆角 */
    border-radius: 20px;

}
.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background:url('../../assets/login.jpg');
    overflow: hidden;
}
.login-title {
    text-align: center;
    color: #303133;
}
</style>