import request from '@/utils/request'

// 博客分类请求

export function getBlogType() {
    return request.get('/api/blogtype')
}
// 添加分类
export function addBlogType(data) {
    return request({
        url: '/api/blogtype',
        method: 'post',
        data
    })

}
// 编辑分类
export function updateOneBlogType(data) {
    return request({
        url: `/api/blogtype/${data.id}`,
        method: 'put',
        data
    })
}

// 删除分类
export function delBlogType(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: 'delete',
    })
}
// 查询分类
export function findOneBlogType(id) {
    return request({
        url: `/api/blogtype/${id}`,
        method: 'get',
    })

}