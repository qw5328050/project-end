import request from '@/utils/request'
// 查询个人中心用户信息
export function personalInformation() {
  return request({
    url: `admin-service/ssoUser/findUserInfo`,
    method: 'get'
  })
}
// 个人中心修改密码
export function changePassword(data) {
  return request({
    url: `admin-service/ssoUser/updatePassword`,
    method: 'post',
    data
  })
}
// 个人中心登录日志
export function personalJournal(data) {
  return request({
    url: `admin-service/ssoLoginLog/pageList`,
    method: 'post',
    data
  })
}
