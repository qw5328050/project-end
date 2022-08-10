import request from '@/utils/request'

// 根据订单号获取发货单列表
export function queryDeliveryOrderList(data) {
  return request({
    url: 'multi-service/supplier/deliver/queryDeliveryDetails',
    method: 'post',
    data: data
  })
}
// 获取发货单详情
export function queryDeliveryOrderById(data) {
  return request({
    url: 'multi-service/supplier/deliver/findById?deliveryId=' + data,
    method: 'post'
  })
}
