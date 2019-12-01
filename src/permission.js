/*权限校验：
 通过router路由前置钩子函数 beforeEach() ， 
 在跳转路由前进行拦截判断是否已经登录， 
 如果已登录，则进行路由跳转，如果没有则回到登录页
*/
import router from './router'
import {getUserInfo} from './api/login'
/*前置路由钩子函数 to ：即将要进入的目标路由对象 
from ：当前导航正要离开的路由对象 
next : 调用该方法，进入目标路由
*/
/*
1. 获取token
    1.1 如果没有获取到
        若要访问非登录页面，则不让访问，让你回到登陆页面
        若要访问登录页面，直接去吧
    1.2 如果获取到
        若要访问登录页面，直接去吧
        若要访问非登录页面，则通过token去获取用户信息，
            若获取到用户信息，可以去非登录页面了
            若没有获取到用户信息，则继续回到登录页面

*/
router.beforeEach((to, from, next) => {
    //获取token
    const token = localStorage.getItem('mxg-msm-token')
    //若没有token
    if (!token) {
        //不允许访问其他路由，直接跳转到登录页
        if (to.path !== '/login') {
            next({path: '/login'})
        } else {
            next()//若不写参数，则默认会获取到目标路由
        }
    } else {
        //若有token
        if (to.path === '/login') {
            next()
        } else {
            //如若目标路由不是'/login'，看下是否有用户信息 
            const userInfo = localStorage.getItem('mxg-msm-user')
            if (userInfo) {
                //有用户信息，进入目标路由
                next()
            } else {
                //没有用户信息,通过token获取用户信息
                getUserInfo(token).then(response => {
                    const resp = response.data
                    if (resp.flag) {
                        //获取到用户信息，保存数据到本地
                        localStorage.setItem('mxg-msm-user', JSON.stringify(resp.data))//转换为JSON字符串
                        //本地有了token和目标路由，则可以去跳转任何想去的路由
                        next()
                    } else {
                        // 没有获取到用户信息，重新登录
                        next({path: '/login'})
                    }
                })

            }
        }
    }
})