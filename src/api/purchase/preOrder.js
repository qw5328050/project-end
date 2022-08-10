import request from '@/utils/request'

// 待采购列表
export function getPreOrderList(data) {
  return request({
    url: 'purchase-service/prucPreOrder/getList',
    method: 'post',
    data: data
  })
}
// 导出待采购台账
export function exportPrucPreOrderItemList(data) {
  return request({
    url:
      'purchase-service/prucPreOrder/exportPrucPreOrderItemList?idList=' + data,
    method: 'get',
    responseType: 'blob'
  })
}

// 导出待采购台账(项目段)
export function exportPrucPreOrderItemListByProject(data) {
  return request({
    url:
      'purchase-service/prucPreOrder/exportPrucPreOrderItemListByProject',
    method: 'post',
    data:data,
    responseType: 'blob'
  })
}

// 待采购下单详情
export function placeDetail(data) {
  return request({
    url: 'purchase-service/prucPreOrder/placeDetail/' + data,
    method: 'get'
  })
}
