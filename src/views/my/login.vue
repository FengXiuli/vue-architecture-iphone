<template>
	<div class="l">
         <dl>
                 <dt>
                    <span>登录</span>
                </dt>
                <dd>
                    <input type="text" placeholder="账号">
                </dd>
                <dd>
                    <input type="text" placeholder="密码">
                </dd>
                
                <dd class="logi">
                    <div class="login">登录</div>
                </dd>
                <dd class="logi">
                    <router-link to="#">
                        <span @click="register=true">立即注册</span>
                    </router-link>  
                    <router-link to="#">
                        <span @click="problem=true">登录遇到问题？</span>
                    </router-link>  
                </dd>
             </dl> 
             <div class="otherlog">
                <div>
                    <router-link to="/home">
                        <span class="mui-icon mui-icon-home"></span>
                    <span class="otherlog1">回到首页</span>
                    </router-link>
                    
                </div>
                <div>
                    <router-link to="#">
                    <span class="mui-icon mui-icon-qq"></span>
                    <span class="otherlog2">QQ登录</span>
                    </router-link>
                    
                </div>
                <div>
                    <router-link to="#">
                    <span class="mui-icon mui-icon-weixin"></span>
                    <span class="otherlog3">微信登录</span>
                    </router-link>
                    
                </div>
             </div>
             <router-link to="#">
                <span class="user">用户信息保护及隐私政策</span>
             </router-link>     
	</div>
	
</template>

<script>

</script>

<style scoped lang="scss">
.l {
    dt {
        height: 80px;
        border-bottom: 1px solid #eef0f1;
        line-height: 80px;
        background: white;
        margin-top: -24px;
        margin-bottom: 20px;
        span:first-child {
            margin-left: 20px;
        }
        span:last-child {
            margin-left: 210px;
        }
    }
    .picture {
        background: #eef0f1;
    }
    dd {
        height: 80px;
        border-bottom: 1px solid #eef0f1;
        line-height: 80px;
        background: white;
        margin-left: 0px;
        font-size: 40px;
        
        input:focus {
        outline: none;
        }
        input {
            height: 56px;
            border: none;
            margin-left: 20px;
            width: 80%;
        }
        
        .login {
            background: rgba(150, 146, 144, 0.68);
            color: white;
            border-radius: 10px;
            width: 80%;
            margin: 20px auto;
            text-align: center;
        }
        
    }
    .logi {
            background: #eef0f1;
            position: relative;
            a {
                font-size: 20px;
                position: absolute;
                text-decoration: none;                      
            }
            a:first-child {
                left: 66px;
                color: rgba(20, 83, 244, 0.68);
            }
            a:nth-child(2) {
                right: 56px;
                color: rgba(150, 146, 144, 0.68);
            }
    }
    .otherlog {
        margin-top: 300px;
        display: flex;
        justify-content: space-between;
        div {
            width: 210px;
            // background: red;
            height: 200px;
            text-align: center;
            position: relative;
            .mui-icon {
                font-size: 50px;
                width: 100px;
                height: 100px;
                border: 1px solid #ccc;
                border-radius: 100%;
                line-height: 100px;
                color: #9BB9D9;
            }
            .otherlog1{
                position: absolute;
                top: 120px;
                left: 60px;
                color: #ccc;

            }
            .otherlog2{
                position: absolute;
                top: 120px;
                left: 60px;
                color: #ccc;


            }
            .otherlog3{
                position: absolute;
                top: 120px;
                left: 60px;
                color: #ccc;


            }
        }
    }
    .user {
        position: absolute;
        bottom: 20px;
        left: 30%;
    }
    &:after {
        content: '';
        position: absolute;
        width: 90%;
        height: 1px;
        background: #ccc;
        top: 580px;
        left: 5%;
    }
}
</style>