import Vue from "vue"
import Router from "vue-router"
// 会默认自动导入./views/login目录下的index.vue，如果没有index.vue,则不会默认导入
import Login from "./views/login"
// 页面布局组件
import Layout from "./components/Layout"
import Home from './views/home'
import Robot from './views/robot'
import Sensar from './views/sensar'
import ElectricMeter from './views/electricMeter'
import Switch from './views/switch'
import Transceiver from './views/transceiver'
import My from './views/my'





Vue.use(Router);

export default new Router({
  routes:[
    {
      //登录页
      path: '/login',
      name: 'login',//路由名称
      component: Login//组件对象
    },
    {
      //基础布局
      path: '/',
      name: 'layout',//路由名称
      component: Layout,//组件对象
      redirect: '/home',//重定到向子路由,也就是说当url地址栏输入为 / 时，页面会自动跳转到 Home组件
      children: [
        {
          //当匹配到/home请求时，
          //组件Home会被渲染在Layout组件中的<router-view>中
          path: '/home',
          component: Home,
          meta: {title: '首页'}
        }
      ]
    },
    {
      //机器人后台管理系统(当地址栏输入 /robot 时，把 Layout 渲染出来，当输入/robot/ 时，将Robot渲染到Layout的留坑的区域)
      path: '/robot',
      component: Layout,
      children: [
        {
          path: '/',//此处是简写的形式，表示的是上面的/member拼接上/,如果写全称便是 /member/，下面同理
          component: Robot,
          meta: {title: '机器人后台管理系统'}
        }
      ]
    },
    {
      //传感器
      path: '/sensar',
      component: Layout,
      children: [
        {
          path: '/',
          component: Sensar,
          meta: {title: '传感器'}
        }
      ]
    },
    {
      //智慧电表
      path: '/electricMeter',
      component: Layout,
      children: [
        {
          path: '/',
          component: ElectricMeter,
          meta: {title: '智慧电表'}
        }
      ]
    },
    {
      //开关
      path: '/switch',
      component: Layout,
      children: [
        {
          path: '/',
          component: Switch,
          meta: {title: '开关'}
        }
      ]
    },
    {
      //气象站
      path: '/my',
      component: Layout,
      children: [
        {
          path: '/',
          component: My,
          meta: {title: '气象站'}
        }
      ]
    },
    {
      //电台
      path: '/transceiver',
      component: Layout,
      children: [
        {
          path: '/',
          component: Transceiver,
          meta: {title: '电台'}
        }
      ]
    },
    
  ],
});
