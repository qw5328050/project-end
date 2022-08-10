import request from '@/utils/request'

// 导出
export function xxxxxxx(params) {
  return request({
    responseType: 'blob',
    url: 'xxxxxxx',
    method: 'GET',
    params
  })
}

// 请求授权
export function empower(params) {
  return request({
    url: 'admin-service/oauth/access_token',
    method: 'GET',
    params
  })
}

// 新增发货单
export function addDeliver(params) {
  return request({
    url: 'admin-service/user/selectById?userId=2',
    method: 'GET',
    params
  })
}

// 用户授权控制器
export function getUserInfo(params) {
  return request({
    url: 'admin-service/user/selectById?userId=2',
    method: 'GET',
    params
  })
}
