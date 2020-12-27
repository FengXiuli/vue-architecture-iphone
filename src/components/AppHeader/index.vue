<template>
    <div class="m-top">
        <mt-header fixed title="后台管理系统" class="m-header">
     <el-button icon="el-icon-s-operation" slot="left" class="m-icon" @click="nav=true"></el-button>
     <el-button icon="el-icon-setting" slot="right" class="m-icon" @click="display=true"></el-button> 
  </mt-header>
    <div class="m-navbar" v-if="nav" @click="nav=false"> </div>
    
    <transition name="nav">
        <!-- <nav :parentnav="nav"></nav> -->
        <div class="m-navba" v-if="nav">
            <dl>
                <dt><span>后台管理系统</span><i class="el-icon-arrow-left" @click="nav=false"></i></dt>
                <dd>
                    <router-link to="/robot/" >
                        <i class="el-icon-user" @click="nav=false"></i>
                        <span @click="nav=false">机器人</span>
                    </router-link>
                </dd>
                <dd>
                    <router-link to="/sensar/">
                        <i class="el-icon-user" @click="nav=false"></i>
                        <span @click="nav=false">楼宇</span>
                    </router-link>
                </dd>
                <dd>
                    <router-link to="/electricMeter/">
                        <i class="el-icon-user" @click="nav=false"></i>
                        <span @click="nav=false">电表</span>
                    </router-link>
                </dd>
                <dd>
                    <router-link to="/switch/">
                        <i class="el-icon-user" @click="nav=false"></i>
                        <span @click="nav=false">路灯</span>
                    </router-link>
                </dd>
                <dd>
                    <router-link to="/home/">
                        <i class="el-icon-user" @click="nav=false"></i>
                        <span @click="nav=false">首页</span>
                    </router-link>
                </dd>
            </dl>            
        </div>
     </transition>
     <transition name="display">
        <div class="m-displaybar" v-if="display">
            <ul class="m-setting">
                <li>
                    <span class="el-icon-back" @click="display=false"></span>
                    <span class="setting">设置</span>
                </li>
                <li>
                    <span>修改手机号</span>
                    <span class="el-icon-arrow-right" @click="iphone=true"></span>
                </li>
                <li>
                    <span>修改邮箱</span>
                    <span class="el-icon-arrow-right" @click="email=true"></span>
                </li>
                <li>
                    <span>修改密码</span>
                    <span class="el-icon-arrow-right" @click="pwd=true"></span>
                </li>
                <li>
                    <span>意见反馈</span>
                    <span class="el-icon-arrow-right" @click="suggestion=true"></span>
                </li>
                <li>
                    <span>关于我们</span>
                    <span class="el-icon-arrow-right" @click="about=true"></span>
                </li>
                <li class="logout">
                    <div @click="logout">退出登录</div>
                </li>
            </ul>
        </div>
     </transition>
     <transition name="display">
        <div v-if="iphone" class="iphone">
            <dl>
                 <dt>
                    <span class="el-icon-arrow-left" @click="iphone=false"></span>
                    <span>手机号修改</span>
                </dt>
                <dd>
                    <input type="text" placeholder="原手机号">
                </dd>
                <dd>
                    <input type="text" placeholder="新手机号">
                </dd>
                <dd>
                    <input type="text" placeholder="确认手机号">
                </dd>
                <dd>
                    <div @click="iphone1">修改手机号</div>
                </dd>
             </dl> 
        </div>
     </transition>
    <transition name="display">
        <div v-if="email" class="email"> 
             <dl>
                 <dt>
                    <span class="el-icon-arrow-left" @click="email=false"></span>
                    <span>邮箱修改</span>
                </dt>
                <dd>
                    <input type="text" placeholder="原邮箱号">
                </dd>
                <dd>
                    <input type="text" placeholder="新邮箱号">
                </dd>
                <dd>
                    <input type="text" placeholder="确认邮箱号">
                </dd>
                <dd>
                    <div @click="email1">修改邮箱号</div>
                </dd>
             </dl> 
        </div>
     </transition>
     <transition name="display">
        <div v-if="pwd" class="pwd"> 
            <dl>
                 <dt>
                    <span class="el-icon-arrow-left" @click="pwd=false"></span>
                    <span>密码修改</span>
                </dt>
                <dd>
                    <input type="text" placeholder="原始密码">
                </dd>
                <dd>
                    <input type="text" placeholder="新密码">
                </dd>
                <dd>
                    <input type="text" placeholder="确认密码">
                </dd>
                <dd>
                    <div @click="pw1d">修改密码</div>
                </dd>
             </dl> 
        </div>
     </transition>
     <transition name="display">
        <div v-if="suggestion" class="suggestion"> 
        </div>
     </transition>
     <transition name="display">
        <div v-if="about" class="about"> 
            <about></about>
        </div>
     </transition>
    </div>
</template>

<script>
    import About from './about.vue'
    import { MessageBox } from 'mint-ui'
 export default {
    components: {
        About,
    },
    data() {
        return {
            nav: false,
            display: false,
            iphone: false,
            email: false,
            pwd: false,
            suggestion: false,
            about: false
        }
    },
    created() {
        
    },
     methods: {
       pw1d() {
        MessageBox({
          title: '提示',
          message: '确定执行此操作?',
          showCancelButton: true
        });
       },
       email1() {
        MessageBox({
          title: '提示',
          message: '确定执行此操作?',
          showCancelButton: true
        });
       },
       iphone1() {
        MessageBox({
          title: '提示',
          message: '确定执行此操作?',
          showCancelButton: true
        });
       },
       logout() {
        MessageBox({
          title: '提示',
          message: '确定执行此操作?',
          showCancelButton: true
        });
       }
     }
 }
</script>

<style scoped lang="scss">

.m-header {
    height: 86px;
    font-size: 36px;
    .m-icon {
      background: #26a2ff;
      border: #26a2ff;
      font-size: 43px;
      color: white;
    }
    
}

.m-navbar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: #000;
    opacity: 0.5;
    z-index: 2;
}
.m-navba {
    position: absolute;
    left: 0;
    right: 134px;
    top: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 2;
    dl {
        color: black;
        dt {
            font-size: 40px;
            background: #D2E4F7;
            height: 120px;
            line-height: 120px;
            font-size: 45px;
            margin-top: -26px;
            span {
                margin-left: 20px;
            }
            i {
                margin-left: 160px;
            }

        }
        dd {
            height: 90px;
            line-height: 90px;
            font-size: 30px;
            margin-left: 20px;
            margin-right: 20px;
            margin-top: 10px;
            border-radius:16px;
            a {
                text-decoration: none;
                i {
                    margin-left: 20px;
                }
                span {
                    color: #08185E;
                    margin-left: 30px;
                }
            }
        }
        dd:nth-child(2n) {
            background: #EFF3F7;
            // opacity: 0.3;
            border: 2px solid #EFF3F7;
        }
        dd:nth-child(2n+1) {
            background: #EFF3F7;
            // opacity: 0.5;
            border: 2px solid #EFF3F7;
        }
    }
}

.m-displaybar {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #eef0f1;
    z-index: 2;
    .m-setting {
        position: relative;
        margin-top: 0;
        background: #eef0f1;
        .logout {
            margin-top: 20px;
            text-align: center;
        }
        li {
            list-style: none;
            background: white;
            margin-left: -80px;
            height: 80px;
            border-bottom: 1px solid #eef0f1;
            line-height: 80px;
            span:first-child {
                margin-left: 30px;
            }
            span:last-child {
                position: absolute;
                right: 30px;
                margin-top: 26px;
            }
            .setting {
                margin-top: 0px !important;

            }
        }
        li:first-child {
            margin-bottom: 20px;
            &:after {
                content: '';
                box-sizing: border-box;
                width: 1px;
                height: 20px;
                position: absolute;
                left:60px;
                top: 30px;
                background: #ccc;

            }
            .setting {
                position: absolute;
                left: 70px;
            }

        }
    }
   
}

.m-top {
    .iphone {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #eef0f1;
        z-index: 3;
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

            div {
                background: #863adf;
                color: white;
                border-radius: 10px;
                width: 80%;
                margin: 20px auto;
                text-align: center;
            }
            
        }
        dd:last-child {
                background: #eef0f1;
            }
        
    }
    .email {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #eef0f1;
        z-index: 3;
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

            div {
                background: #863adf;
                color: white;
                border-radius: 10px;
                width: 80%;
                margin: 20px auto;
                text-align: center;
            }
            
        }
        dd:last-child {
                background: #eef0f1;
            }
    }
    .pwd {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #eef0f1;
        z-index: 3;
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

            div {
                background: #863adf;
                color: white;
                border-radius: 10px;
                width: 80%;
                margin: 20px auto;
                text-align: center;
            }
            
        }
        dd:last-child {
                background: #eef0f1;
            }
    }
    .suggestion {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #eef0f1;
        z-index: 3;
    }
    .about {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: #eef0f1;
        z-index: 3;
    }
}

.nav-leave {
  /* 定义 出场动画的 起始状态 */
  /* 只停留一帧 */
  transform: translateX(0px);
}
.nav-leave-active {
  /* 定义 出场动画 过程 */
  transition: all .4s ease;
}
.nav-leave-to {
  /* 定义 出场动画 结束状态（即：该动画要达到的目标状态） */
  transform: translateX(-600px);
}
/* 定义  入场动画 */
.nav-enter {
  /* 定义 入场动画 的起始状态 */
  transform: translateX(-600px);

}
.nav-enter-active {
  /* 定义 入场动画 过程 */
  transition: all .4s ease;
}
.nav-enter-to {
  /* 定义 入场动画 过程 */
  /* 只停留一帧 */
  transform: translateX(0px);
}

.display-leave {
  /* 定义 出场动画的 起始状态 */
  /* 只停留一帧 */
  transform: translateX(0px);
}
.display-leave-active {
  /* 定义 出场动画 过程 */
  transition: all .4s ease;
}
.display-leave-to {
  /* 定义 出场动画 结束状态（即：该动画要达到的目标状态） */
  transform: translateX(600px);
}
/* 定义  入场动画 */
.display-enter {
  /* 定义 入场动画 的起始状态 */
  transform: translateX(600px);

}
.display-enter-active {
  /* 定义 入场动画 过程 */
  transition: all .4s ease;
}
.display-enter-to {
  /* 定义 入场动画 过程 */
  /* 只停留一帧 */
  transform: translateX(0px);
}
</style>