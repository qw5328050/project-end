import request from '@/utils/request'

// 请求授权
export function empower(params) {
  return request({
    url: 'admin-service/oauth/access_token',
    method: 'GET',
    params
  })
}
// 获取权限
export function getAuths(params) {
  return request({
    url: 'admin-service/sysAuthority/getAuths',
    method: 'GET',
    params
  })
}
// 用户退出
export function logout(params) {
  console.log(process.env.VUE_APP_BASE_API)
  return request({
    url: process.env.VUE_APP_LOGOUT_API + '/logout',
    method: 'GET',
    params
  })
}


//公共组件 选择物资 含库存
export function checkMaterialNum(data) {
  return request({
    url: 'material-service/components/pageOfItemByProdoct',
    method: 'post',
    data: data
  })
}





