import request from '@/utils/request'

// 验证码请求
export function getCaptcha() {
    return request({
        url: '/res/captcha',
        method: 'get'
    })
}