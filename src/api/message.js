import request from '@/utils/request'

// 删除留言
export function delMessage(id) {
    return request({
        url: `/api/message/${id}`,
        method: 'delete',
    })
}

// 分页获取留言
export function getMessage(page = 1, limit = 10) {
    return request({
        url: '/api/message',
        method: 'get',
        params: {
            page,
            limit
        }
    })
}