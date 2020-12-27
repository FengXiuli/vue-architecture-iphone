<template>
  <div class="y-container">
      <div class="row1">
      	<span class="portrait">
      		<el-upload
			  class="avatar-uploader"
			  action="https://jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
      	</span>
      	<span class="log" @click="log=true">登录/注册</span>
      	 <div class="m-navbar" v-if="log" @click="nav=false"> </div>
    
    <transition name="log">
        <!-- <nav :parentnav="nav"></nav> -->
        <div class="m-logba" v-if="log">

            <dl>
                 <dt>
                    <span class="el-icon-arrow-left" @click="log=false"></span>
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
     </transition>

      <transition name="log">
        <div class="m-register" v-if="register">
            <span class="el-icon-arrow-left r-icon" @click="register=false"></span>
           <login-register/>
        </div>
     </transition>
      	<span class="sign">签名：</span>
      </div>
  </div>
</template>

<script>
	import LoginRegister from './register.vue'
export default {
	components: {
	 		LoginRegister,
	 	},
	 data() {
      return {
        imageUrl: '',
        log: false,
        register: false,
        problem: false
      };
    },
    methods: {
      // 上传头像
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }

</script>

<style scoped lang="scss">
	.y-container {
		width: 100%;
		height: 500px;
		.row1 {
			width: 100%;
			height: 200px;
			position: relative;
			// background: green;
			box-sizing: border-box;		
			.portrait {
				display: block;
				width: 120px;
				height: 120px;
				border-radius: 100%;
				margin-left: 60px;
				margin-top: 30px;
				border: 1px dashed #ccc;

				.avatar-uploader .el-upload {
				   border: 1px dashed #ccc;
				   border-radius: 6px;
				   cursor: pointer;
				   position: relative;
				   overflow: hidden;
				 }
				 .avatar-uploader .el-upload:hover {
				   border-color: #409EFF;
				 }
				 .avatar-uploader-icon {
				   font-size: 28px;
				   color: #8c939d;
				   width: 120px;
				   height: 120px;
				   line-height: 120px;
				   text-align: center;
				 }
				 .avatar {
				   width: 120px;
				   height: 120px;
				   border-radius: 100%;
				   display: block;
				   // border: 1px solid #ccc;

				 }
			}
			.log {
				position: absolute;
				left: 230px;
				top: 5px;
				font-weight: 700;
				background: rgba(228, 221, 218, 0.68);
				padding: 10px;
				border-radius: 20px;
			}
			.sign {
				position: absolute;
				left: 230px;
				top: 80px;
				font-size: 20px;
				color: #ccc;
			}
			.m-logba {
			    position: fixed;
   				left: 0;
   				right: 0;
   				top: 0;
   				bottom: 0;
   				background-color: #eef0f1;
   				z-index: 2;
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
			.m-register {
			    position: fixed;
   				left: 0;
   				right: 0;
   				top: 0;
   				bottom: 0;
   				background-color: #eef0f1;
   				z-index: 3;
          .r-icon {
            position: absolute;
            top: 30px;
            left: 20px;
          }
   			}
   			.m-problem {
			    position: fixed;
   				left: 0;
   				right: 0;
   				top: 0;
   				bottom: 0;
   				background-color: #eef0f1;
   				z-index: 3;
   			}
		}

	}


.log-leave {
  /* 定义 出场动画的 起始状态 */
  /* 只停留一帧 */
  transform: translateX(0px);
}
.log-leave-active {
  /* 定义 出场动画 过程 */
  transition: all .4s ease;
}
.log-leave-to {
  /* 定义 出场动画 结束状态（即：该动画要达到的目标状态） */
  transform: translateX(600px);
}
/* 定义  入场动画 */
.log-enter {
  /* 定义 入场动画 的起始状态 */
  transform: translateX(600px);

}
.log-enter-active {
  /* 定义 入场动画 过程 */
  transition: all .4s ease;
}
.log-enter-to {
  /* 定义 入场动画 过程 */
  /* 只停留一帧 */
  transform: translateX(0px);
}
</style>