import request from '@/utils/request'

//注意：导出的是普通成员函数 
//登录 
export function login(username, password) {
    return request({
        url: '/user/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}

//获取用户信息
export function getUserInfo(token) {
    return request({
        url:`/user/info/${token}`,//反单引号，字符串的拼接
        method: 'get'
    })
}

//退出系统
export function logout(token) {
    return request({
        url: 'user/logout',
        method: 'post',
        data: {
            token//token:token
        }
    })
}