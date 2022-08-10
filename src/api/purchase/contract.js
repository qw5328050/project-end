import request from '@/utils/request'

// 获取合同列表
export function getContractList(data) {
  return request({
    url: 'purchase-service/prucContract/list',
    method: 'get',
    params: data
  })
}

// 根据合同id获取物资列表
export function selectItemsByContractId(data) {
  return request({
    url:
      'purchase-service/prucContractItem/selectItemsByContractId?contractId=' +
      data,
    method: 'get'
  })
}

// 获取合同列表
export function purchaseList(data) {
  return request({
    url: 'purchase-service/prucContract/purchaseList',
    method: 'get',
    params: data
  })
}
