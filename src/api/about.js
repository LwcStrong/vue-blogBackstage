import request from '@/utils/request'

// 关于我相关请求

export function getAboutUrl() {
    return request({
        url: '/api/about',
        method: 'get',
    })
}

// 设置关于我链接
export function setAboutUrl(data) {
    return request({
        url: '/api/about',
        method: 'post',
        data
    })
}