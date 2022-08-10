import request from '@/utils/request'

// 合同执行列表
export function getExecuteContractList(data) {
    return request({
      url: 'purchase-service/prucContract/getExecuteContractList',
      method: 'post',
      data
    })
  }
// 项目结算金额
export function projectSettlementAmount(contractId) {
  return request({
    url: 'purchase-service/prucContract/projectSettlementAmount',
    method: 'GET',
    params: {
      contractId: contractId
    }
  })
}
  