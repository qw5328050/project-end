import request from '@/utils/request'

// 根据条件分页查询收料单
export function getLists(params) {
  return request({
    url: 'purchase-service/prucReceipt/pageList',
    method: 'post',
    data: params
  })
}
// 详情
export function detail(receiptId, deliveryId) {
  return request({
    url: 'purchase-service/prucReceipt/detail',
    method: 'GET',
    params: {
      receiptId,
      deliveryId
    }
  })
}
// 项目端更新收料信息
export function update(params) {
  return request({
    url: 'purchase-service/prucReceipt/update',
    method: 'put',
    data: params
  })
}
// 项目端获取收料变更详情
export function modifyInfo(id) {
  return request({
    url: 'purchase-service/prucReceipt/modifyInfo',
    method: 'get',
    params: {
      receiptId: id
    }
  })
}
// 退货列表
export function returnOrChangeList(data) {
  return request({
    url: 'purchase-service/prucReceiptReturn/returnOrChangeList',
    method: 'post',
    data
  })
}
// 进入填写退货/换货单页面所需数据
export function intoReturnPage(id) {
  return request({
    url: 'purchase-service/prucReceiptReturn/intoReturnPage',
    method: 'get',
    params: {
      receiptId: id
    }
  })
}
// 点击退换货单编辑按钮进入详情页
export function intoReturnPageInfo(id) {
  return request({
    url: '/purchase-service/prucReceiptReturn/edit/'+id,
    method: 'get'
  })
}
// 保存
export function saveOrCommit(data) {
  return request({
    url: 'purchase-service/prucReceiptReturn/saveOrCommit',
    method: 'POST',
    data
  })
}
// 获取收料单里面的所有物资
export function getAllReceiptItem(id) {
  return request({
    url: 'purchase-service/prucReceiptReturn/getAllReceiptItem',
    method: 'get',
    params: {
      receiptId: id
    }
  })
}

// 解锁
export function unlockReceipt  (data) {
  return request({
    url: 'purchase-service/prucReceipt/unlockReceipt?receiptId='+data.receiptId,
    method: 'post'
  })
}
// 收料单解锁审批
export function unlockReceiptToApproval  (data) {
  return request({
    url: 'purchase-service/prucReceipt/unlockReceiptToApproval',
    method: 'post',
    data
  })
}
// 根据退换货单编号查询退货详情
export function queryByReturnCode  (data) {
  return request({
    url: 'purchase-service/prucReceiptReturn/queryByReturnCode?returnCode='+data.returnCode,
    method: 'get'
  })
}
// 退换货导出
export function returnOrChangeListExport(data) {
  return request({
    url:
      'purchase-service/prucReceiptReturn/returnOrChangeListExport',
    method: 'post',
    data:data,
    responseType: 'blob'
  })
}
// 收料导出
export function exportReceiptList(data) {
  return request({
    url:
      'purchase-service/prucReceipt/exportReceiptList',
    method: 'post',
    data:data,
    responseType: 'blob'
  })
}
// 获取收料单打印列表
export function printReceipt(data) {
  return request({
    url: '/purchase-service/prucReceipt/printReceipt',
    method: 'post',
    data: data
  })
}
