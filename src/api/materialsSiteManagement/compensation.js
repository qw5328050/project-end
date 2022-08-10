import request from '@/utils/request'
import qs from 'qs'

// 整改列表
export function getList(data) {
  return request({
    url: 'material-service/Inspection/pageOfClaimant',
    method: 'post',
    data
  })
}
// 整改详情
export function getDetails(data) {
  return request({
    url: 'material-service/Inspection/claimantDetail',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 新增/编辑整改内容
export function saveDetails(data) {
  return request({
    url: 'material-service/Inspection/saveOrUpdateClaimant',
    method: 'post',
    data
  })
}
// 查询分包商主列表
export function subcontractorsList(data) {
  return request({
    url: `admin-service/mdmSubContractor/pageList`,
    method: 'post',
    data
  })
}
