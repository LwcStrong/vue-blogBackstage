import request from '@/utils/request'

// 管理员信息更新
export function setAdminMessage(data) {
    return request({
        url: '/api/admin',
        method: 'put',
        data
    })
}
// 获取管理员信息
export function getAdminMessage() {
    return request({
        url: 'api/admin/whoami',
        method: 'get'
    })
}