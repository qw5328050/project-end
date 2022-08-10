import request from '@/utils/request'

// 消息列表
export function messageList(data) {
  return request({
    url: `/message-service/message/page?${data}`,
    method: 'get'
  })
}

// 业务列表
export function businessList(data) {
  return request({
    url: `/message-service/msgTemplate/page?${data}`,
    method: 'get'
  })
}

// 消息详情
export function messageDetail(data) {
  return request({
    url: `/message-service/message/get`,
    method: 'get',
    params: data
  })
}

// 消息已读
export function messageRead(data) {
  return request({
    url: `/message-service/message/update`,
    method: 'PATCH',
    params: data
  })
}
