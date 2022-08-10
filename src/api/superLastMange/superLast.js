import request from '@/utils/request'



// 调拨列表
export function allocationList(data) {
    return request({
      url: 'material-service/transfers/pageOfTransfersApply',
      method: 'post',
      data: data
    })
}


// 调拨申请add
export function allocationAdd(data) {
  return request({
    url: 'material-service/transfers/saveOrUpdateTransfersApply',
    method: 'post',
    data: data
  })
}


//调拨申请详情
export function allocationDetail(data) {
  return request({
    url: 'material-service/transfers/transfersApplyDetail',
    method: 'post',
     data
  })
}

// 选择项目
export function checkProjectList(data) {
  return request({
    url: 'mdm-service/project/list',
    method: 'post',
    data: data
  })
}



//调拨录入Add
export function allocationAskAdd(data) {
  return request({
    url: 'material-service/transfers/saveOrUpdateTransfersEntry',
    method: 'post',
    data: data
  })
}

//调拨申请详情
export function allocationAskDetail(data) {
  return request({
    url: 'material-service/transfers/transfersApplyDetail',
    method: 'post',
     data
  })
}



//调拨录入详情
export function allocationInputDetail(data) {
  return request({
    url: 'material-service/transfers/transfersEntryDetail',
    method: 'post',
     data
  })
}


//调拨导出
export function inputListExport(data) {
  return request({
    url: `material-service/transfers/transfersExport?transfersId=${data}`,
    method: 'get',
    
  })
}
