import request from '@/utils/request'
/**
 * 登录方法
 * @param {*} data 
 * @returns 
 */
export function loginApi(data) {
  return request({
    url: '/api/admin/login',
    method: 'post',
    data
  })
}
/**
 * 恢复登录
 * @param {*} token 
 * @returns 
 */
export function getInfo() {
  return request({
    url: '/api/admin/whoami',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
