import request from '@/utils/request'

// 总结算-待结算验收列表
export function listPage(params) {
  return request({
    url: 'settlement-service/totalSettlementOrder/listPage',
    method: 'post',
    data: params
  })
}
// 总结算列表
export function listTotalOrderPage(params) {
  return request({
    url: 'settlement-service/totalSettlementOrder/listTotalOrderPage',
    method: 'post',
    data: params
  })
}
// 总结算详情
export function getTotalOrderDetails(params) {
  return request({
    url: 'settlement-service/totalSettlementOrder/getTotalOrderDetails',
    method: 'get',
    params
  })
}
// 生成总结算单信息
export function save(params) {
  return request({
    url: 'settlement-service/totalSettlementOrder/save',
    method: 'post',
    data: params
  })
}
// 总结算-选择月度结算单
export function listSelectData(params) {
  return request({
    url: 'settlement-service/totalSettlementOrder/listSelectData',
    method: 'post',
    data: params
  })
}
// 获取供应商列表
export function listSelectSupplier() {
  return request({
    url: 'mdm-service/supplier/listSelectSupplier',
    method: 'get'
  })
}
// 根据供应商id查询合同列表
export function selectContractsBySupplierId(data) {
  return request({
    url: 'purchase-service/prucContract/selectContractsBySupplierId',
    method: 'get',
    params:data
  })
}
// 根据合同id查询项目编号项目名称
export function listProjectByContractId(id) {
  return request({
    url: 'purchase-service/mdmProject/listProjectByContractId',
    method: 'get',
    params: {
      contractId: id
    }
  })
}
// 总结算-导出
export function exportOrder(data) {
  return request({
    url: 'settlement-service/totalSettlementOrder/export',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 总结算/月度结算-下载发票
export function downloadInvoice(id) {
  return request({
    url: '/multi-service/supplier/invoice/download',
    method: 'get',
    responseType: 'blob',
    params: {
      orderNo: id
    }
  })
}
// 总结算-未锁定状态的结算单删除
export function deleteOrder(params) {
  return request({
    url: 'settlement-service/totalSettlementOrder/deleteOrder',
    method: 'get',
    params
  })
}
// 保存/编辑总结算单信息
export function update(data) {
  return request({
    url: 'settlement-service/totalSettlementOrder/update',
    method: 'post',
    data
  })
}
// 总结算作费重开选择月度列表
export function listSelectOrderByReopen(params) {
  return request({
    url: 'settlement-service/totalSettlementOrder/listSelectOrderByReopen',
    method: 'get',
    params
  })
}
// 月度结算-作废重开
export function saveReopenSettlementOrder(data) {
  return request({
    url: 'settlement-service/settlementOrder/saveReopenSettlementOrder',
    method: 'post',
    data
  })
}
// 总结算作废重开-物资调量列表
export function listAdjustmentByTotalOrder(params) {
  return request({
    url: 'settlement-service/totalSettlementOrder/listAdjustmentPageByTotalOrder',
    method: 'post',
    params
  })
}
// 作废重开-保存
export function saveReopenOrder(params) {
  return request({
    url: 'settlement-service/totalSettlementOrder/saveReopenOrder',
    method: 'post',
    data: params
  })
}
// 总结算-提交
export function submitStatus(params) {
  return request({
    url: 'settlement-service/totalSettlementOrder/submitStatus',
    method: 'get',
    params
  })
}
// 开发票
export function multiUpload(data) {
  return request({
    url: 'multi-service/supplier/invoice/add',
    method: 'POST',
    data
  })
}
// 根据结算单编号获取开票金额
export function getAmountByOrderNo(orderNo) {
  return request({
    url: 'settlement-service/settlementOrder/getAmountByOrderNo',
    method: 'get',
    params: {
      orderNo: orderNo
    }
  })
}
// 待总结算单-导出
export function waitSettlementExportData(data) {
  return request({
    url: 'settlement-service/totalSettlementOrder/waitSettlementExportData',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
// 下载电子签章
export function downLoadElecSignature(params) {
  return request({
    url: 'settlement-service/qiYueSuo/downLoadElecSignature',
    method: 'post',
    params,
    responseType: 'blob'
  })
}
// 电子签章
export function stamp(params) {
  return request({
    url: 'settlement-service/qiYueSuo/stamp',
    method: 'get',
    params
  })
}