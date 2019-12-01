import request from '@/utils/request'

export default {
    //获取会员列表
    getList() {
        return request({
            url: '/member/list',
            method: 'get'
        })
    },
    //分页查询,
    //page当前页码,size每页显示条数,searchMap条件
    //后台要通过page和size统计本次请求响应的数据 
    search(page, size, searchMap) {
        return request({
            url: `/member/list/search/${page}/${size}`,//当有要传递的参数时要用反斜杠和$来进行拼接
            method: 'post',//post要加上单引号
            data: searchMap
        })
    },
    add(pojo) {
        return request({
            url: '/member',
            method: 'post',
            data: pojo
        })
    },
    //查询
    getById(id) {
        return request({
            url: `/member/${id}`,
            method: 'get'
        })
    },
    //更新
    update(pojo) {
        return request({
            url: `/member/${pojo.id}`,
            method: 'put',
            data: pojo
        })
    },
    deleteById(id) {
        return request({
            url: `/member/${id}`,
            method: 'delete' //delete方式提交
        })
    }

}