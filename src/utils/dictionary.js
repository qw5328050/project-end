const dictionaryData = {
  // 调拨状态
  superStatus: [
    { label: '草稿', value: 1 },
    { label: '审批中', value: 2 },
    { label: '驳回', value: 3 },
    { label: '审批通过', value: 4 }
  ],
  // 租赁状态
  leaseStatus: [
    { label: '租赁中', value: 1 },
    { label: '已报停', value: 2 },
    { label: '已退料', value: 3 },
    { label: '部分报停', value: 4 },
    { label: '全部报停', value: 5 }
  ],
  leaseStopStatus: [
    { label: '未退料', value: 1 },
    { label: '退料中', value: 2 },
    { label: '已退料', value: 3 }
  ],
  // 计划类型
  planType: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '物资需用总计划',
      value: 1
    },
    {
      label: '钢筋需用总计划',
      value: 2
    },
    {
      label: '混凝土需用总计划',
      value: 3
    },
    {
      label: '周转料需用总计划',
      value: 4
    }
  ],
  // 变更状态
  changeStatus: [
    { label: '变更中', value: 1 },
    { label: '变更成功', value: 2 },
    { label: '变更失败', value: 3 }
  ],
  // 总计划状态
  planStatus: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '草稿',
      value: 1
    },
    {
      label: '审批中',
      value: 2
    },
    {
      label: '正常',
      value: 3
    },
    {
      label: '驳回',
      value: 4
    },
    {
      label: '已撤回',
      value: 6
    }
  ],
  // 总计划状态
  totalPlanStatus: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '草稿',
      value: 1
    },
    {
      label: '审批中',
      value: 2
    },
    {
      label: '正常',
      value: 3
    },
    {
      label: '驳回',
      value: 4
    },
    {
      label: '驳回',
      value: 5
    },
    {
      label: '已撤回',
      value: 6
    },
    {
      label: '已撤回',
      value: 7
    }
  ],
  purchaseStatus: [
    {
      label: '待采购',
      value: 1
    },
    {
      label: '采购中',
      value: 2
    },
    {
      label: '采购完成',
      value: 3
    }
  ],
  // 发货状态
  deliveryStatus: [
    { value: 1, label: '待发货' },
    { value: 2, label: '部分发货' },
    { value: 3, label: '全部发货' },
  ],
  // 结算方式
  clearingList: [
    { value: 1, label: '每天' },
    { value: 2, label: '每月' }
  ],
  // 合同价类型
  contractAmountType: [
    { value: 1, label: '固定价' },
    { value: 2, label: '有定价浮动' },
    { value: 3, label: '无定价浮动' }
  ],
  // 合同价类型搜索
  contractAmountTypeAll: [
    { value: '', label: '全部' },
    { value: 1, label: '固定价' },
    { value: 2, label: '浮动价' }
  ],
  contractType: [
    { value: 1, label: '采购合同' },
    { value: 2, label: '租赁合同' }
  ],
  // 是否关联订单
  isRefOrder: [
    { value: 0, label: '否' },
    { value: 1, label: '是' }
  ],
  // 项目状态
  projectStatus: [
    { value: 1, label: '在建' },
    { value: 2, label: '已结束' },
    { value: 3, label: '暂停' }
  ],
  // 待采购列表里的状态
  purchaseStatusS: [
    { value: 1, label: '待采购' },
    { value: 2, label: '采购中' },
    { value: 3, label: '已完成' }
  ],
  // 采购列表订单状态
  orderStatusS: [
    { value: 1, label: '草稿' },
    { value: 2, label: '审批中' },
    { value: 3, label: '审批通过' },
    { value: 4, label: '审批驳回' },
    { value: 5, label: '审批撤回' },
  ],
  // 采购列表采购类型
  purchaseType: [
    { value: 1, label: '物资采购' },
    { value: 2, label: '资产采购' }
  ],
  // 采购列表发货状态
  deliveryStatusS: [
    { value: 1, label: '待发货' },
    { value: 2, label: '部分发货' },
    { value: 3, label: '全部发货' },
  ],
  // 采购列表验收状态
  checkStatus: [
    { value: 0, label: '待验收' },
    { value: 1, label: '已验收' }
  ],
  // 录入状态
  editStatus: [
    { value: 0, label: '未完成' },
    { value: 1, label: '已完成' }
  ],
  // 验收状态
  receiveStatus: [
    { value: 0, label: '未完成' },
    { value: 1, label: '已完成' }
  ],
  // 供应商确认
  supplierCheckStatus: [
    { value: 0, label: '未确认' },
    { value: 1, label: '已确认' }
  ],
  // 状态
  lockStatus: [
    { value: 0, label: '未锁定' },
    { value: 1, label: '已锁定' }
  ],
  // 收料单解锁审批状态
  approval_status: [
    { value: 1, label: '-' },
    { value: 2, label: '审批中' },
    { value: 3, label: '审批通过' },
    { value: 4, label: '审批驳回' },
    { value: 5, label: '审批撤回' }
  ],
  // 退换货列表状态
  ReturnStatus: [
    { value: 1, label: '草稿' },
    { value: 2, label: '待确认' },
    { value: 3, label: '待修改' },
    { value: 4, label: '已锁定' }
  ],
  // 合同列表状态
  useStatus: [
    {
      label: '正常',
      value: 1
    },
    {
      label: '禁用',
      value: 2
    },
    {
      label: '终止',
      value: 3
    },
    {
      label: '超限',
      value: 4
    },
    {
      label: '暂存',
      value: 5
    }
  ],
  // 合同列表状态搜索
  useStatusAll: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '正常',
      value: 1
    },
    {
      label: '禁用',
      value: 2
    },
    {
      label: '终止',
      value: 3
    },
    {
      label: '超限',
      value: 4
    },
    {
      label: '暂存',
      value: 5
    }
  ],
  // 总结算状态
  settlementStatus: [
    { value: 0, label: '正常' },
    { value: 1, label: '锁定' }
  ],
  // 结算周期类型
  periodType: [
    { value: 1, label: '自然月结' },
    { value: 2, label: '跨月结算' }
  ],
  // 价格类型
  isExclude: [
    { value: 1, label: '含税' },
    { value: 2, label: '不含税' }
  ],
  // 结算类型
  settlementTypeId: [
    {
      label: '钢筋结算',
      value: 1
    },
    {
      label: '一般材料结算',
      value: 2
    },
    {
      label: '按信息价除税下浮结算',
      value: 3
    },
    {
      label: '参考网价结算',
      value: 4
    },
    {
      label: '混凝土结算',
      value: 5
    },
    {
      label: '租赁类材料结算',
      value: 6
    }
  ],
  // 钢筋类别
  steelType: [
    { label: '一级钢', value: 1 },
    { label: '三级钢', value: 3 },
    { label: '四级钢', value: 4 }
  ],
  // 需用计划类型
  needPlanType: [
    { label: '全部', value: null },
    { label: '需用物资', value: 1 },
    { label: '混凝土', value: 2 },
    { label: '零星材料', value: 3 },
    { label: '临时设施', value: 4 },
    { label: '安全措施材料', value: 5 },
    { label: '临时运输费', value: 6 }
  ],
  // 月度计划状态
  monthlyPlanStatus: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '草稿',
      value: 1
    },
    {
      label: '审批中',
      value: 2
    },
    {
      label: '正常',
      value: 3
    },
    {
      label: '驳回',
      value: 4
    }
  ],
  // 总结算
  type: [
    // 结算类型
    { value: 1, label: '钢筋' },
    { value: 2, label: '一般材料' },
    { value: 3, label: '一般材料按信息价除税下浮' },
    { value: 4, label: '参考网价' },
    { value: 5, label: '混凝土' },
    { value: 6, label: '租赁类材料' }
  ],
  // 总结算
  orderStatus: [
    // 结算单状态
    { value: 1, label: '草稿' },
    { value: 2, label: '待供应商确认' },
    { value: 3, label: '审批中' },
    { value: 4, label: '待签章' },
    { value: 5, label: '待开票' },
    { value: 6, label: '已开票' },
    { value: 7, label: '作废调整中' },
    { value: 8, label: '已作废' }
  ],
  monthlyPlanType: [
    {
      label: '全部',
      value: ''
    },
    {
      label: '物资需用总计划',
      value: 1
    },
    {
      label: '钢筋需用总计划',
      value: 2
    },
    {
      label: '混凝土需用总计划',
      value: 3
    },
    {
      label: '周转料需用总计划',
      value: 4
    }
  ],
  approvalResults: [
    { label: '正常', value: 1 },
    { label: '退回', value: 2 },
    { label: '驳回', value: 3 },
    { label: '委派', value: 4 },
    { label: '转办', value: 5 }
  ],
  // 结算单类型
  receiptFlag: [
    { label: '退货单', value: 1 },
    { label: '换货单', value: 2 },
    { label: '收料单', value: 3 }
  ],
  // 特殊结算类型
  spSettlementTy: [
    { label: '保理利息', value: 1 },
    { label: '调差金额 ', value: 2 },
    { label: '费用', value: 3 }
  ],
  // 退回状态
  returnStatus: [
    { value: 1, label: '部分退回' },
    { value: 2, label: '全部退回' },
  ],
  // 基准类型
  benchmarkType: [
    { value: 1, label: '网价' },
    { value: 2, label: '信息价' },
  ],
  // 结算方式
  settlementMethod: [
    { value: 1, label: '日结' },
    { value: 2, label: '月结' },
  ],
  businessStyle: [
    { value: 'process_xa2gg3vg,Process_1653649890649', label: '总计划' },
    { value: 'Process_month_plan', label: '月度计划' },
    { value: 'Process_need_plan', label: '需用计划' },
    { value: 'processSettlementTotal', label: '总结算' },
    { value: 'processSettlementMonthly', label: '月度结算' },
    { value: 'purchaseOrderPlacing', label: '采购' },
    { value: 'unlockReceiving', label: '收料单解锁' },
    // { value: 7, label: '收料' },
    // { value: 8, label: '退换货' },
    // { value: 9, label: '退料' },
  ],
  approvalStatus: [
    { value: '1', label: '正常' },
    { value: '3', label: '驳回' },
    { value: '7', label: '撤回' },
  ],
  // 供应商确认状态
  confirm_status: [
    { value: '1', label: '待确认' },
    { value: '2', label: '已确认' },
    { value: '3', label: '已拒绝' },
  ],
  abarbeitungType: [
    { value: 1, label: '质量' },
    { value: 2, label: '环境' },
    { value: 3, label: '职业健康安全' },
    { value: 4, label: '物资' },
    { value: 5, label: '其他' }
  ],
  abarbeitungBillsStatus: [
    { value: 1, label: '草稿' },
    { value: 2, label: '已下发' },
    { value: 3, label: '已自检' },
    { value: 4, label: '已关闭' },
    { value: 5, label: '转索赔' }
  ],
  acceptCompanyType: [
    { value: 1, label: '分包商' },
    { value: 2, label: '供应商' }
  ],
  compensationType: [
    { value: 1, label: '未发起' },
    { value: 2, label: '审批中' },
    { value: 3, label: '审批通过' },
    { value: 4, label: '已撤回' },
    { value: 5, label: '驳回' }
  ],
  //计量方式
  measurementMethods: [
    { value: '1', label: '场内过磅' },
    { value: '2', label: '场外过磅' },
    { value: '3', label: '检尺' }
  ],

  // 物资调拨状态
  lastStatus: [
      { label: '未申请', value: 0 },
      { label: '申请审批中', value: 1 },
      { label: '已申请', value: 2 },
      { label: '未调拨', value: 3 },
      { label: '调拨审批中', value: 4 },
      { label: '已调拨', value: 5 }
  ],
  ifDelay: [
    { value: 0, label: '否' },
    { value: 1, label: '是' }
  ],
  ifEmergency: [
    { value: 0, label: '否' },
    { value: 1, label: '是' }
  ],
  ifVerify: [
    { value: 0, label: '否' },
    { value: 1, label: '是' }
  ],
  // 记录物资类型
  materialType: [
    { value: 1, label: '原材' },
    { value: 2, label: '半成品' }
  ],
  //废旧物资处理类型
  wasteType: [
    { value: 0, label: '钢筋' },
    { value: 1, label: '模板' },
    { value: 2, label: '其他' }
  ],
  //废旧物资处理状态  记录
  rubbishStatus: [
    { label: '未申请', value: 0 },
    { label: '申请审批中', value: 1 },
    { label: '已申请', value: 2 },
    { label: '未调拨', value: 3 },
    { label: '处理审批中', value: 4 },
    { label: '已处理', value: 5 },
    { label: '未立卷', value: 6 },
    { label: '立卷审批中', value: 7 },
    { label: '已立卷', value: 8 }

  ],

}

// key: 要判断的值
// type: dictionaryData对应属性名,字典数组
export function getDictionaryLabel(key, type) {
  if (key === null) {
    return '-'
  }
  let label = '-'
  if (dictionaryData[type] && dictionaryData[type].length > 0) {
    dictionaryData[type].forEach((item) => {
      if (Number(item.value) === Number(key)) {
        label = item.label
      }
    })
  }
  return label
}
// 返回字典值的数据
export function getDictionaryValue(type) {
  if (dictionaryData[type] && dictionaryData[type].length > 0) {
    return dictionaryData[type]
  } else {
    return []
  }
}
