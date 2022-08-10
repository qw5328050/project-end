import request from '@/utils/request'

// 月度计划列表查询
export function getList(data) {
  return request({
    url: 'plan-service/monthPlan/pageList',
    method: 'post',
    data
  })
}
// 暂存月度计划
export function saveMonthPlan(data) {
  return request({
    url: 'plan-service/monthPlan/saveMonthPlan',
    method: 'post',
    data
  })
}
// 提交月度计划
export function submitMonthPlan(data) {
  return request({
    url: 'plan-service/monthPlan/submitMonthPlan',
    method: 'post',
    data
  })
}
// 根据id获取月度计划的数据
export function selectById(data) {
  return request({
    url: 'plan-service/monthPlan/selectById',
    method: 'get',
    params: data
  })
}
// 删除月度计划
export function deleteById(data) {
  return request({
    url: 'plan-service/monthPlan/deleteById',
    method: 'get',
    params: data
  })
}
// 导出月度计划
export function exportMonthlyPlan(data) {
  return request({
    url: 'plan-service/monthPlan/export',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
export function exportMaterials(data) {
  return request({
    url: 'plan-service/monthPlan/exportMaterials',
    method: 'post',
    data: data,
    responseType: 'blob'
  })
}
// 打印计划
export function selectPrintData(data) {
  return request({
    url: 'plan-service/monthPlan/selectPrintData',
    method: 'post',
    data: data
  })
}
