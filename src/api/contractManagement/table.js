import request from '@/utils/request'


// 合同列表
export function getLists(data) {
  return request({
    url: 'purchase-service/prucContract/list',
    method: 'GET',
    params:data
  })
}
// 合同详情
export function selectContractById(contractId) {
  return request({
    url: 'purchase-service/prucContract/selectContractById',
    method: 'GET',
    params: {
      contractId: contractId
    }
  })
}
// 新增合同
export function save(data) {
  return request({
    url: 'purchase-service/prucContract/saveOrUpdate',
    method: 'post',
    data: data
  })
}
// 编辑合同
export function Update(data) {
  return request({
    url: 'purchase-service/prucContract/saveOrUpdate',
    method: 'post',
    data: data
  })
}
// 选择供应商
export function selectSupplierByNameOrItemType(params) {
  return request({
    url: 'purchase-service/mdmSupplier/selectSupplierByNameOrItemType',
    method: 'GET',
    params
  })
}
// 合同甲方
export function getAllOrganization() {
  return request({
    url: 'purchase-service/mdmOrganization/getAllOrganization',
    method: 'GET'
  })
}
// 物资列表查询
export function getSuppliesList(data) {
  return request({
    url: 'admin-service/mdmItem/selectItems',
    method: 'post',
    data
  })
}
// 物资类别查询
export function getItemTypes(params) {
  return request({
    url: 'admin-service/mdmItemType/getItemTypes',
    method: 'get',
    params
  })
}
export function getChildrenItemType(params) {
  return request({
    url: 'admin-service/mdmItemType/getChildrenItemType',
    method: 'get',
    params
  })
}
// 导出
export function exportContracts(data) {
  return request({
    url: 'purchase-service/prucContract/exportContracts?'+data,
    method: 'get',
    responseType: 'blob'
  })
}
// 合同执行导出
export function exportContractsImplement(data) {
  return request({
    url: 'purchase-service/prucContract/exportContractsImplement',
    method: 'post',
    responseType: 'blob',
    data

  })
}
// 合同状态 1解禁 2禁用 3终止 6恢复
export function changeStatus(data) {
  return request({
    url: 'purchase-service/prucContract/changeStatus/2',
    method: 'post',
    data
  })
}
export function changeStatusJJ(data) {
  return request({
    url: 'purchase-service/prucContract/changeStatus/1',
    method: 'post',
    data
  })
}
export function changeStatusZZ(data) {
  return request({
    url: 'purchase-service/prucContract/changeStatus/3',
    method: 'post',
    data
  })
}
export function changeStatusHF(data) {
  return request({
    url: 'purchase-service/prucContract/changeStatus/6',
    method: 'post',
    data
  })
}
// 合同变更
export function modify(data) {
  return request({
    url: 'purchase-service/prucContract/modify',
    method: 'post',
    data: data
  })
}
// 合同变更详情
export function showModifyInfo(contractId) {
  return request({
    url: 'purchase-service/prucContract/showModifyInfo',
    method: 'GET',
    params: {
      contractId: contractId
    }
  })
}
// 关联项目
export function associateProject(data) {
  return request({
    url: 'purchase-service/prucContract/associateProject',
    method: 'post',
    data
  })
}
// 查找合同已关联项目
export function associatedProject(contractId) {
  return request({
    url: 'purchase-service/prucContract/associatedProject',
    method: 'GET',
    params: {
      contractId: contractId
    }
  })
}
// 查找合同未关联项目
export function noAssociatedProject(data) {
  return request({
    url: 'purchase-service/prucContract/noAssociatedProject',
    method: 'GET',
    params: data
  })
}
// 删除关联项目
export function conDelete(data) {
  return request({
    url: 'purchase-service/prucContractProject/delete?contractId='+data.contractId+'&projectId='+data.projectId,
    method: 'post',
  })
}
// 解锁关联项目
export function unlockProject(contractProjectId) {
  return request({
    url: 'purchase-service/prucContractProject/unlockProject',
    method: 'GET',
    params: {
      contractProjectId: contractProjectId
    }
  })
}
// 查看收货项目
export function selectProjectsByContractId(data) {
  return request({
    url: 'purchase-service/prucContractProject/selectProjectsByContractId',
    method: 'GET',
    params: data
  })
}
// 选择项目查询接口
export function listProjectByContractId(contractId) {
  return request({
    url: 'purchase-service/mdmProject/listProjectByContractId',
    method: 'GET',
    params: {
      contractId: contractId
    }
  })
}

// 分公司列表
export function getBranchCom(data) {
  return request({
    url: 'purchase-service/mdmOrganization/getBranchCom',
    method: 'post',
    data
  })
}
// 下载模板
export function getTemplateFile(type) {
  return request({
    url: 'purchase-service/file/getTemplateFile/'+ type,
    method: 'GET',
    responseType: 'blob'
  })
}
// 合同编号校验
export function contractCodeAgain(data) {
  return request({
    url: 'purchase-service/prucContract/contractCodeAgain',
    method: 'GET',
    params: data
  })
}
