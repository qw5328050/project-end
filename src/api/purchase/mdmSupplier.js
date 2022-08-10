import request from '@/utils/request'

// 根据名称或者物资类别查找供应商
export function selectSupplierByNameOrItemType(data) {
  return request({
    url: 'mdm-service/supplier/list',
    method: 'post',
    data: data
  })
}
// 根据项目id查询供应商列表
export function getSupplierListByProjectId(data) {
  return request({
    url: 'purchase-service/mdmSupplier/getSupplierListByProjectId',
    method: 'post',
    data:data
  })
}


