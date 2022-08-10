import request from '@/utils/request'

// 总计划列表查询
export function getList(params) {
  return request({
    url: 'plan-service/overallPlan/page',
    method: 'get',
    params
  })
}
// 删除
export function deletePlan(params) {
  return request({
    url: 'plan-service/overallPlan/delete',
    method: 'delete',
    params
  })
}
// 物资列表查询
export function getSuppliesList(data) {
  return request({
    url: 'admin-service/mdmItem/selectItems',
    method: 'post',
    data
  })
}
// 根据月度计划id查询物资列表查询
export function selectByMonthPlanId(data) {
  return request({
    url: 'plan-service/monthPlan/selectByMonthPlanId',
    method: 'get',
    params: data
  })
}
// 根据总计划id查询物资列表查询
export function selectByplanId(data) {
  return request({
    url: 'plan-service/overallPlan/selectByplanId',
    method: 'get',
    params: data
  })
}
// 物资类别查询
export function getItemTypes(params) {
  return request({
    url: 'admin-service/mdmItemType/getItemTypes',
    method: 'get',
    params
  })
}
export function getChildrenItemType(params) {
  return request({
    url: 'admin-service/mdmItemType/getChildrenItemType',
    method: 'get',
    params
  })
}
// 获取总计划详情
export function getDetailPlan(params) {
  return request({
    url: 'plan-service/overallPlan/detailPlan',
    method: 'get',
    params
  })
}
// 提交物资需用总总计划
export function submitOverallPlanMaterial(data) {
  return request({
    url: 'plan-service/overallPlanMaterial/submitOverallPlanMaterial',
    method: 'post',
    data
  })
}
// 保存物资需用总总计划
export function doSaveOrUpdate(data) {
  return request({
    url: 'plan-service/overallPlan/doSaveOrUpdate',
    method: 'post',
    data
  })
}
// 编辑总计划
export function updatePlan(data) {
  return request({
    url: 'plan-service/overallPlan/updatePlan',
    method: 'post',
    data
  })
}
// 总计划
export function draftTurnoverPlan(data) {
  return request({
    url: 'plan-service/overallPlanTurnover/draftTurnoverPlan',
    method: 'post',
    data
  })
}
// 提交总计划
export function submitPlan(data) {
  return request({
    url: 'plan-service/overallPlan/submitPlan',
    method: 'post',
    data
  })
}
// 变更总计划
export function changePlan(data) {
  return request({
    url: 'plan-service/overallPlan/changePlan',
    method: 'post',
    data
  })
}

// 总计划变更记录
export function changeList(params) {
  return request({
    url: 'plan-service/overallPlan/changeList',
    method: 'get',
    params
  })
}
// 导出
export function exportTotalPlan(data) {
  return request({
    url: 'plan-service/overallPlan/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 导出物资
export function exportMaterial(data) {
  return request({
    url: 'plan-service/overallPlan/exportMaterial',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 导出模板
export function exportPlanTemplate(data) {
  return request({
    url: 'plan-service/overallPlan/exportPlanTemplate',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 打印
export function selectPrintData(data) {
  return request({
    url: 'plan-service/overallPlan/selectPrintData',
    method: 'post',
    data
  })
}
