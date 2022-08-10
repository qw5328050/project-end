<template>
  <table class="table table-bordered">
    <tbody>
      <tr class="text-c">
        <td colspan="3" rowspan="3">
          <img src="@/assets/table-log.png" style="widht: 40px">
        </td>
        <td colspan="18" style="font-size: 24px">中国建筑项目管理表格</td>
      </tr>
      <tr class="text-c header_col">
        <td rowspan="2" colspan="10" style="font-size: 24px">
          租赁类材料结算单
        </td>
        <td colspan="8">表格编号</td>
      </tr>
      <tr class="text-c header_col">
        <td colspan="8">CSCEC8BNF-MM-B10131</td>
      </tr>
      <tr class="text-c">
        <td colspan="2">项目名称</td>
        <td colspan="8">{{ printData.projectInfo || '' }}</td>
        <td colspan="2">日期</td>
        <td colspan="8">{{ printData.createTime || '' }}</td>
        <td colspan="2">单位：元</td>
      </tr>
      <tr class="text-c">
        <td colspan="2">供应商</td>
        <td colspan="9">{{ printData.supplierName || '' }}</td>
        <td colspan="2">合同编号</td>
        <td colspan="9">{{ printData.contractNo || '' }}</td>
      </tr>
      <tr class="text-c">
        <td colspan="2">结算编号</td>
        <td colspan="19">{{ printData.orderNo || '' }}</td>
      </tr>
      <tr class="text-c">
        <td colspan="1" rowspan="2">序号</td>
        <td colspan="1" rowspan="2">供货开始日期</td>
        <td colspan="1" rowspan="2">供货结束日期</td>
        <td colspan="1" rowspan="2">物资名称</td>
        <td colspan="1" rowspan="2">规格型号</td>
        <td colspan="1" rowspan="2">计量单位</td>
        <td colspan="1" rowspan="2">含税附加费</td>
        <td colspan="1">数量</td>
        <td colspan="1">税前单价</td>
        <td colspan="1">税率</td>
        <td colspan="1">单价税金</td>
        <td colspan="1">含税单价</td>
        <td colspan="1">租赁周期</td>
        <td colspan="1">丢失损坏量</td>
        <td colspan="1">赔偿单价</td>
        <td colspan="1">清理维修费</td>
        <td colspan="1">税前结算价款</td>
        <td colspan="1">结算价款税</td>
        <td colspan="1">含税结算价</td>
        <td colspan="1">月度结算费用</td>
        <td colspan="1" rowspan="2">备注</td>
      </tr>
      <tr class="text-c">
        <td colspan="1">①</td>
        <td colspan="1">②</td>
        <td colspan="1">③</td>
        <td colspan="1">④=②*③</td>
        <td colspan="1">⑤=②+④</td>
        <td colspan="1">⑨</td>
        <td colspan="1">⑩</td>
        <td colspan="1">⑪</td>
        <td colspan="1">⑫</td>
        <td colspan="1">⑥=①*②</td>
        <td colspan="1">⑦=①*②*③</td>
        <td colspan="1">⑧=⑥+⑦</td>
        <td colspan="1">⑬=⑧+⑩*⑪+⑫</td>
      </tr>
      <tr v-for="(item, index) in printData.list" :key="index" class="text-c">
        <td colspan="1">{{ item_index + 1 }}</td>
        <td colspan="1">{{ item.rentStartDate || '' }}</td>
        <td colspan="1">{{ item.rentEndDate || '' }}</td>
        <td colspan="1">{{ item.materialName || '' }}</td>
        <td colspan="1">{{ item.standards || '' }}</td>
        <td colspan="1">{{ item.unit || '' }}</td>
        <td colspan="1">{{ item.includeTaxExtraPrice || '0' }}</td>
        <td colspan="1">{{ item.amount || '0' }}</td>
        <td colspan="1">{{ item.taxReduceUnitPrice || '0' }}</td>
        <td colspan="1">{{ item.taxRate || '0' }}%</td>
        <td colspan="1">{{ item.taxes || '0' }}</td>
        <td colspan="1">{{ item.taxIncludeUnitPrice || '0' }}</td>
        <td colspan="1">{{ item.rentPeriod || '0' }}</td>
        <td colspan="1">{{ item.lostDamage || '0' }}</td>
        <td colspan="1">{{ item.compensationUnitPrice || '0' }}</td>
        <td colspan="1">{{ item.otherExpenses || '0' }}</td>
        <td colspan="1">{{ item.taxReduceUnitTotalPrice || '0' }}</td>
        <td colspan="1">{{ item.totalTaxes || '0' }}</td>
        <td colspan="1">{{ item.taxIncludeUnitTotalPrice || '0' }}</td>
        <td colspan="1">{{ item.monthlySettlementExpenses || '0' }}</td>
        <td colspan="1">{{ item.remark || '' }}</td>
      </tr>
      <tr class="text-c">
        <td colspan="2" class="text-c">本次结算其他金额</td>
        <td colspan="14" />
        <td colspan="1">{{ printData.totalOtherAmountsNoTax || '0' }}</td>
        <td colspan="1">{{ printData.totalOtherTax || '0' }}</td>
        <td colspan="1">{{ printData.totalOtherAmounts || '0' }}</td>
        <td colspan="1" />
        <td colspan="1" />
      </tr>
      <tr class="text-c">
        <td colspan="2" class="text-c">合计</td>
        <td colspan="5" />
        <td colspan="1">{{ printData.supplyQuantity || '0' }}</td>
        <td colspan="8" />
        <td colspan="1">{{ printData.taxReduceUnitTotalPrice || '0' }}</td>
        <td colspan="1">{{ printData.settlementTax || '0' }}</td>
        <td colspan="1">{{ printData.taxIncludeUnitTotalPrice || '0' }}</td>
        <td colspan="1">{{ printData.settlementAmtTax || '0' }}</td>
        <td colspan="1" />
      </tr>
      <tr class="text-c">
        <td colspan="2" class="text-c">本次合计（不含税）</td>
        <td colspan="9">{{ printData.settlementAmtNoTax || '0' }}</td>
        <td colspan="1">人民币大写:</td>
        <td colspan="9">{{ printData.settlementAmtNoTaxWords || '' }}</td>
      </tr>
      <tr class="text-c">
        <td colspan="2" class="text-c">本次合计（含税）</td>
        <td colspan="9">{{ printData.settlementAmtTax || '0' }}</td>
        <td colspan="1">人民币大写:</td>
        <td colspan="9">
          {{ printData.printData.settlementAmtTaxWords || '' }}
        </td>
      </tr>
      <tr class="text-c">
        <td colspan="2" class="text-c">累计发生（不含税）</td>
        <td colspan="9">{{ printData.cumSettlementAmtNoTax || '0' }}</td>
        <td colspan="1">人民币大写:</td>
        <td colspan="9">{{ printData.cumSettlementAmtNoTaxWords || '' }}</td>
      </tr>
      <tr class="text-c">
        <td colspan="2" class="text-c">累计发生（含税）</td>
        <td colspan="9">{{ printData.cumSettlementAmtTax || '0' }}</td>
        <td colspan="1">人民币大写:</td>
        <td colspan="9">{{ printData.cumSettlementAmtTaxWords || '' }}</td>
      </tr>
      <tr>
        <td colspan="21" class="content">
          以上结算内容为供应商自 {{ printData.startTime || '' }} 至
          {{ printData.endTime || '' }} 期间与本项目发生的所有业务，
          已按照合同（合同编号：{{
            printData.contractNo || ''
          }}）约定方式按月度进行结算。 累计发生收料单
          {{ printData.receiptQuantity || '0' }} 张，共计金额为
          {{ printData.settlementAmtTax || '0' }} 元。
        </td>
      </tr>
      <tr>
        <td colspan="9" rowspan="5">
          <div class="officialSeal">
            <div class="seal">供货单位（盖章）:</div>
            <div class="agent">
              法人代表或授权委托人:{{ printData.supplierOperator || '' }}
            </div>
            <div class="data">{{ printData.supplierConfirmTime || '' }}</div>
          </div>
        </td>
        <td colspan="4" class="text-c">审批人</td>
        <td colspan="4" class="text-c">审签栏</td>
        <td colspan="4" class="text-c">日期</td>
      </tr>
      <tr class="text-c">
        <td colspan="4">项目物资经办人</td>
        <td colspan="4">{{ printData.materialEngineerName || '' }}</td>
        <td colspan="4">
          {{ printData.materialEngineerTime || '' }}
        </td>
      </tr>
      <tr class="text-c">
        <td colspan="4">商务经理</td>
        <td colspan="4">{{ printData.businessManagerName || '' }}</td>
        <td colspan="4">
          {{ printData.businessManagerTime || '' }}
        </td>
      </tr>
      <tr class="text-c">
        <td colspan="4">项目经理</td>
        <td colspan="4">{{ printData.projectManagerName || '' }}</td>
        <td colspan="4">
          {{ printData.projectManagerTime || '' }}
        </td>
      </tr>
      <tr class="text-c">
        <td colspan="4">分公司物资管理部</td>
        <td colspan="4">{{ printData.filialematerialDeptName || '' }}</td>
        <td colspan="4">
          {{ printData.filialematerialDeptTime || '' }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'LeaseClassCopy',
  props: {
    printData: {
      type: Object,
      require: true,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.officialSeal {
  padding: 0 20px;
  box-sizing: border-box;
  text-align: left;
}

.officialSeal .seal {
  height: 150px;
}

.officialSeal .agent {
  height: 30px;
}

.officialSeal .data {
  /* margin-left: 16px; */
}
.content {
  padding: 0 20px;
  height: 50px;
  box-sizing: border-box;
}
</style>
