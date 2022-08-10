const deliveryOptions = [
  { label: '待审批', value: 0 },
  { label: '待发货', value: 1 },
  { label: '已发货', value: 2 },
  { label: '部分退回', value: 3 },
  { label: '全部退回', value: 4 }
]
const checkOptions = [
  { label: '待验收', value: 0 },
  { label: '已验收', value: 1 }
]
const returnStatusOptions = [
  { label: '草稿', value: 1 },
  { label: '待确认', value: 2 },
  { label: '待修改', value: 3 },
  { label: '已锁定', value: 4 }
]
module.exports = {
  returnStatusOptions,
  deliveryOptions,
  checkOptions
}
