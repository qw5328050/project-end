import request from '@/utils/request'

// 废旧物资列表
export function wasteList(data) {
    return request({
      url: 'material-service/waste/pageOfWasteApply',
      method: 'post',
      data: data
    })
}

// 废旧申请 Add
export function wasteAdd(data) {
    return request({
      url: 'material-service/waste/saveOrUpdateWasteApply',
      method: 'post',
      data: data
    })
}


//废旧申请查看详情
export function wasteDetail(data) {
  return request({
    url: 'material-service/waste/WasteApplyDetail',
    method: 'post',
    data: data
  })
}


//废旧列表导出
export function wasteListExport(data) {
  return request({
    url: 'material-service/waste/wasteExport',
    method: 'post',
    data: data
  })
}



// 废旧记录 Add
export function recordAdd(data) {
  return request({
    url: 'material-service/waste/saveOrUpdateWasteRecord',
    method: 'post',
    data: data
  })
}




// 废旧立卷 Add
export function steelAdd(data) {
  return request({
    url: 'material-service/waste/saveOrUpdateWasteFiling',
    method: 'post',
    data: data
  })
}


//废旧立卷详情
export function steelDetail(data) {
  return request({
    url: 'material-service/waste/wasteFilingDetail',
    method: 'post',
    data: data
  })
}



//废旧记录详情
export function recordDetail(data) {
  return request({
    url: 'material-service/waste/wasteRecordDetail',
    method: 'post',
    data: data
  })
}
