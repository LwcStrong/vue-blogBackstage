import request from '@/utils/request'

// 删除评论
export function delComment(id) {
    return request({
        url: `/api/comment/${id}`,
        method: 'delete',
    })
}

// 分页获取评论
export function getComment(page = 1, limit = 10) {
    return request({
        url: '/api/comment',
        method: 'get',
        params: {
            page,
            limit
        }
    })
}