import request from '@/utils/request'

// 审批进度
export function approvalProgress(data) {
  return request({
    url: '/bpm-service/flowable/definition/approvalProgress',
    method: 'get',
    params: data
  })
}

