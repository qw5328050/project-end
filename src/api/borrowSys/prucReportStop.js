import request from '@/utils/request'

// 报停列表
export function prucReportStopList(data) {
    return request({
      url: 'purchase-service/prucReportStop/list',
      method: 'get',
      params: data
    })
  }
  // 退料列表
  export function prucReturnList(data) {
    return request({
      url: 'purchase-service/prucReturn/list',
      method: 'get',
      params: data
    })
  }
// 报停详情
export function prucReportStopDetail(data) {
  return request({
    url: 'purchase-service/prucReportStop/detail',
    method: 'get',
    params: data
  })
}

// 退料详情
export function prucReturnDetail(data) {
  return request({
    url: 'purchase-service/prucReturn/detail',
    method: 'get',
    params: data
  })
}

// 报停且退料退料详情
export function toReturnDetail(data) {
  return request({
    url: 'purchase-service/prucReportStopReturn/toReturnDetail',
    method: 'POST',
    data: data
  })
}

// 退料
export function toPrucReturn(data) {
  return request({
    url: 'purchase-service/prucReturn/toPrucReturn',
    method: 'post',
    data: data
  })
}

// 根据报停且退料单退料
export function toPrucReturnByReportStopType(data) {
  return request({
    url: 'purchase-service/prucReturn/toPrucReturnByReportStopType',
    method: 'post',
    data: data
  })
}


//租赁物资列表
export function leaseList(params) {
  return request({
      url: 'purchase-service/prucLeaseParameter/paging',
      method: 'post',
      data:params
  })
}

//报停退料列表分页
export function tellStopList(params) {
  return request({
      url: 'purchase-service/prucReportStopReturn/paging',
      method: 'post',
      data:params
  })
}

//报停详情
export function stopDetail(params) {
  return request({
      url: 'purchase-service/prucReportStop/toReportStopDetail',
      method: 'post',
      data:params
  })
}


//报停新增add
export function stopAdd(params) {
  return request({
      url: 'purchase-service/prucReportStop/toReportStop',
      method: 'post',
      data:params
  })
}


// 租聘台账导出
export function exportTalentList(data) {
  return request({
    url:'purchase-service/prucLeaseParameter/listToExcel',
    method: 'post',
    data:data,
    responseType: 'blob'
  })
}

// 报停退料列表导出
export function exportStopsList(data) {
  return request({
    url:'purchase-service/prucReportStopReturn/listToExcel',
    method: 'post',
    data:data,
    responseType: 'blob'
  })
}
// 流程历史流转记录
export function flowRecord(data) {
  return request({
    url: 'bpm-service/flowable/task/flowRecord',
    method: 'get',
    params: data
  })
}

// 编辑退料单
export function editPrucReturn(data) {
  return request({
    url:'purchase-service/prucReturn/editPrucReturn',
    method: 'post',
    data:data,
  })
}

// 编辑报停且退料退料单
export function editPrucReturnByReportStopType(data) {
  return request({
    url:'purchase-service/prucReturn/editPrucReturnByReportStopType',
    method: 'post',
    data:data,
  })
}

export function editReportStop(data) {
  return request({
    url:'purchase-service/prucReportStop/editReportStop',
    method: 'post',
    data:data,
  })
}

export function listSettlementOrdersByReceiptCode(data) {
  return request({
    url:'settlement-service/settlementOrder/listSettlementOrdersByReceiptCode',
    method: 'get',
    params:data,
  })
}

// 材料工程师
export function selectUsersByRole(params = {}) {
  return request({
    url: `/mdm-service/project/queryProjectUserListById`,
    method: 'get',
    params: Object.assign({}, params, { roleName: '材料工程师' })
  })
}
