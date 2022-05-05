import request from '@/utils/request'
// 个人设置请求

export function setPersonalSetting(data) {
    return request({
        url: `/api/setting`,
        method: 'put',
        data
    })
}

export function getPersonalSetting() {
    return request({
        url: `/api/setting`,
        method: 'get',
    })
}