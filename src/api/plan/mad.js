import request from '@/utils/request'

// 查询组织树
export function getTree(params) {
  return request({
    url: 'mdm-service/org/search',
    method: 'get',
    params
  })
}
// 获取节点数据
export function flowNodeList(params) {
  return request({
    url: 'bpm-service/flowable/definition/flowNodeList',
    method: 'get',
    params
  })
}

// 根绝节点id 查询用户数据
export function getList(data) {
  return request({
    url: 'mdm-service/org/queryUserListByOrgId',
    method: 'post',
    data
  })
}
// 审批记录
export function flowRecordList(data) {
  return request({
    url: 'bpm-service/flowable/task/flowRecord',
    method: 'get',
    params: data
  })
}
// 审批进度
export function approvalProgress(data) {
  return request({
    url: 'bpm-service/flowable/task/flowRecord',
    method: 'get',
    params: data
  })
}
// 采购订单列表
export function getPurchaseList(data) {
  return request({
    url: 'purchase-service/prucNormalOrder/getList',
    method: 'post',
    data
  })
}
// 采购订单列表
export function getWatermark() {
  return request({
    url: 'admin-service/sysConfig/getWatermark',
    method: 'get'
  })
}
// 根据当前登录人获取项目
export function getUserProjects() {
  return request({
    url: 'admin-service/mdmProject/getUserProjects',
    method: 'get'
  })
}

export function queryOrgListByUserId(params) {
  return request({
    url: 'mdm-service/org/queryOrgListByUserId',
    method: 'get',
    params: params
  })
}

// 审批进度详情dong
export function readXml(deployId) {
  return request({
    url: `bpm-service/flowable/definition/readXml/${deployId}`,
    method: 'get'
  })
}

// 审批进度详情dong
export function readNode(procInsId) {
  return request({
    url: `bpm-service/flowable/task/flowViewer/${procInsId}`,
    method: 'get'
  })
}

// 获取字典
export function selectDictDatas(type) {
  return request({
    url: `admin-service/sysDictionaryData/selectDictDatas?dictCode=${type}`,
    method: 'get'
  })
}
// 查询用户下的组织树
export function getUserOrgTrees() {
  return request({
    url: `/admin-service/org/getUserOrgTrees`,
    method: 'get'
  })
}
