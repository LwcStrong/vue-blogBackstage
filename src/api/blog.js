import request from '@/utils/request'

// 文章相关请求
export function findBlog(page = 1, limit = 10) {
    return request({
        url: '/api/blog',
        method: 'get',
        params: {
            page,
            limit
        }
    })
}
// 删除文章
export function deleteOneBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'delete',
    })
}

// 编辑文章
export function addBlog(data) {
    return request({
        url: '/api/blog',
        method: 'post',
        data
    })
}
// 新增文章
export function editBlog(data) {
    return request({
        url: `/api/blog/${data.id}`,
        method: 'put',
        data
    })
}
export function findOneBlog(id) {
    return request({
        url: `/api/blog/${id}`,
        method: 'get',
    })
}