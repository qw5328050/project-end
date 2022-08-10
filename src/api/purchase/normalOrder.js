import request from '@/utils/request'

// 采购列表
export function getNormalOrderList(data) {
  return request({
    url: 'purchase-service/prucNormalOrder/getList',
    method: 'post',
    data: data
  })
}
// 待选择供应商列表页
export function getChooseSupplierList(data) {
  return request({
    url: 'purchase-service/prucNormalOrder/getChooseSupplierList',
    method: 'post',
    data: data
  })
}
// 导出采购列表
export function exportPrucNormalOrderItemList(data) {
  return request({
    url:
      'purchase-service/prucNormalOrder/exportPrucNormalOrderItemList?idList=' +
      data,
    method: 'get',
    responseType: 'blob'
  })
}
// 导出采购列表（项目段）
export function exportPrucNormalOrderItemListByProject(data) {
  return request({
    url:
      'purchase-service/prucNormalOrder/exportPrucNormalOrderItemListByProject',
    method: 'post',
    data:data,
    responseType: 'blob'
  })
}
// 下单
export function placeOrder(data) {
  return request({
    url: 'purchase-service/prucNormalOrder/placeOrder',
    method: 'post',
    data: data
  })
}
// 下单物资校验
export function placeOrderItemsCheck(data) {
  return request({
    url: 'purchase-service/prucNormalOrder/placeOrderItemsCheck',
    method: 'post',
    data: data
  })
}
// 下单物资
export function projectManagerCheckOrder(data) {
  return request({
    url: 'purchase-service/prucNormalOrder/projectManagerCheckOrder',
    method: 'post',
    data: data
  })
}
// 生产经理驳回
export function projectManagerReject(data) {
  return request({
    url: 'purchase-service/prucNormalOrder/projectManagerReject',
    method: 'post',
    data: data
  })
}
// 编辑下单物资校验
export function editPrucNormalOrderItemsCheck(data) {
  return request({
    url: 'purchase-service/prucNormalOrder/editPrucNormalOrderItemsCheck',
    method: 'post',
    data: data
  })
}
// 删除采购订单
export function delPrucNormalOrder(data) {
  return request({
    url: 'purchase-service/prucNormalOrder?idList=' + data,
    method: 'delete'
  })
}

// 获取订单详情
export function getOrderDetail(data) {
  return request({
    url: 'purchase-service/prucNormalOrder/getDetail/' + data,
    method: 'get'
  })
}
// 获取订单编辑详情
export function editOrderDetail(data) {
  return request({
    url: 'purchase-service/prucNormalOrder/editOrderDetail/' + data,
    method: 'get'
  })
}
// 编辑订单
export function editPrucNormalOrder(data) {
  return request({
    url: 'purchase-service/prucNormalOrder/editPrucNormalOrder',
    method: 'post',
    data: data
  })
}
// 获取采购订单打印列表
export function getOrderStampList(data) {
  return request({
    url: '/purchase-service/prucNormalOrder/getOrderStampList',
    method: 'post',
    data: data
  })
}
