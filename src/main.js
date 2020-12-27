import Vue from "vue";
import ElementUI from 'element-ui';//组件库
import 'element-ui/lib/theme-chalk/index.css';//样式
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import App from "./App.vue";
import router from "./router";
import store from './store'
import echarts from 'echarts'  //引入Echarts，
import 'lib-flexible'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './lib/mui/css/mui.min.css'
import '@/lib/mui/css/feedback.css'
 // import mui from '@/lib/mui/js/mui.js'
 //  Vue.prototype.mui = mui

// import viewport from '../viewport.js'

Vue.prototype.$echarts = echarts 

//使用ElementUI
Vue.use(ElementUI);
Vue.use(MintUI)
Vue.use(VueAwesomeSwiper)

//拦截权限
import './permission'
// 消息提示的环境配置，是否为生产环境：
// false 开发环境：Vue会提供很多警告来方便调试代码。
// true 生产环境：警告却没有用，反而会增加应用的体积
Vue.config.productionTip = false;
console.log(process.env.VUE_APP_BASE_API)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
