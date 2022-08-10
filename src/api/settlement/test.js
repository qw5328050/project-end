import request from '@/utils/request'

// 月度结算单列表
export function listPage(params) {
  return request({
    url: 'settlement-service/settlementOrder/listPage',
    method: 'post',
    data: params
  })
}
// 查询已锁定的待结算收料单
export function listReceiptPage(params) {
  return request({
    url: 'settlement-service/settlementOrder/listReceiptPage',
    method: 'post',
    data: params
  })
}
// 获取月度结算单详情
export function getInfo(params) {
  return request({
    url: 'settlement-service/settlementOrder/getInfo/' + params,
    method: 'get'
  })
}
// 删除月度结算单
export function deleteList(params) {
  return request({
    url: 'settlement-service/settlementOrder/delete/' + params,
    method: 'DELETE'
  })
}
// 月度结算打印次数
export function updatePrintQuantity(params) {
  return request({
    url: 'settlement-service/settlementOrder/updatePrintQuantity',
    method: 'get',
    params
  })
}
// 总结算打印次数
export function totalUpdatePrintQuantity(params) {
  return request({
    url: 'settlement-service/totalSettlementOrder/updatePrintQuantity',
    method: 'get',
    params
  })
}
// 打印次数
export function uploadFile(data) {
  return request({
    url: 'settlement-service/totalSettlementOrder/uploadFile',
    method: 'post',
    data
  })
}
// 新增月度结算单
export function save(data) {
  return request({
    url: 'settlement-service/settlementOrder/save',
    method: 'post',
    data
  })
}
// 保存拆单数据
export function saveSplitOrderSubsidiary(params) {
  return request({
    url:
      'settlement-service/settlementOrderSubsidiary/saveSplitOrderSubsidiary/' +
      params,
    method: 'get'
  })
}
// 获取累计结算金额
export function getCumulativeSettlementAmount(data) {
  return request({
    url: 'settlement-service/settlementOrder/getCumulativeSettlementAmount',
    method: 'post',
    data
  })
}
// 搜索导出待结算验收单
export function exportReceiptData(data) {
  return request({
    url: 'settlement-service/settlementOrder/exportReceiptData',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 搜索导出月度结算单
export function exportSearchData(data) {
  return request({
    url: 'settlement-service/settlementOrder/exportSearchData',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 取消拆单
export function cancelSplitting(params) {
  return request({
    url:
      'settlement-service/settlementOrderSubsidiary/cancelSplitting/' + params,
    method: 'DELETE'
  })
}
// 编辑月度结算单
export function update(data) {
  return request({
    url: 'settlement-service/settlementOrder/update',
    method: 'PUT',
    data
  })
}
// 提交
export function commitAndLock(params) {
  return request({
    url: 'settlement-service/settlementOrder/commitAndLock/' + params,
    method: 'PUT'
  })
} // 获取折叠的月度结算单副单
export function getCollapsedAuxiliaryOrder(params) {
  return request({
    url:
      'settlement-service/settlementOrderSubsidiary/getCollapsedAuxiliaryOrder/' +
      params,
    method: 'GET'
  })
}

// 获取审批信息审批人
export function getApprovalInfo(data) {
  return request({
    url: `settlement-service/totalSettlementOrder/getApprovalInfo?settlementOrderId=${data.id}&type=${data.type}`,
    method: 'get'
  })
}

// 获取审批信息记录
export function getFlowRecord(data) {
  return request({
    url: `bpm-service/flowable/task/flowRecord?processInstanceId=${data.id}`,
    method: 'get'
  })
}
// 根据合同编号获取获取发票抬头与税号
export function getInvoiceTitleAndTaxNo(params) {
  return request({
    url: '/purchase-service/prucContract/getInvoiceTitleAndTaxNo',
    method: 'get',
    params
  })
}
