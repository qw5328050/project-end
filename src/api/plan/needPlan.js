import request from '@/utils/request'

// 需用计划列表查询
export function getList(params) {
  return request({
    url: 'plan-service/needPlan/pageList',
    method: 'post',
    data: params
  })
}
// 选择月度计划
export function selectMonthPlans(data) {
  return request({
    url: 'plan-service/monthPlan/selectMonthPlans',
    method: 'post',
    data
  })
}
// 暂存需用计划
export function saveNeedPlan(data) {
  return request({
    url: 'plan-service/needPlan/saveNeedPlan',
    method: 'post',
    data
  })
}
// 提交需用计划
export function submitNeedPlan(data) {
  return request({
    url: 'plan-service/needPlan/submitNeedPlan',
    method: 'post',
    data
  })
}
// 选择月度计划
export function selectById(params) {
  return request({
    url: 'plan-service/needPlan/selectById',
    method: 'get',
    params
  })
}
// 需用计划删除
export function deleteData(params) {
  return request({
    url: 'plan-service/needPlan/deletePlanId',
    method: 'delete',
    params
  })
}
// 导出
export function exportNeedData(data) {
  return request({
    url: 'plan-service/needPlan/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 导出物资
export function exportMaterials(data) {
  return request({
    url: 'plan-service/needPlan/exportMaterials',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 下载模板
export function downloadTemplate(data) {
  return request({
    url: 'plan-service/needPlan/downloadTemplate',
    method: 'post',
    responseType: 'blob'
  })
}
// 打印
export function selectPrintData(data) {
  return request({
    url: 'plan-service/needPlan/selectPrintData',
    method: 'post',
    data
  })
}
