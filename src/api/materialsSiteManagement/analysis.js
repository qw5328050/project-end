import request from '@/utils/request'
import qs from 'qs'

// 整改列表
export function getList(data) {
  return request({
    url: 'material-service/inventory/pageOfInventoryAnalyze',
    method: 'post',
    data
  })
}
// 整改详情
export function getDetails(data) {
  return request({
    url: 'material-service/inventory/inventoryAnalyzeDetail',
    method: 'post',
    data: qs.stringify(data)
  })
}
// 新增/编辑整改内容
export function saveDetails(data) {
  return request({
    url: 'material-service/inventory/saveOrUpdateInventoryPlant',
    method: 'post',
    data
  })
}
