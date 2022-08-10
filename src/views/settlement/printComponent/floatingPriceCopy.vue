<template>
  <table class="table table-bordered" style="page-break-after: always;">
    <tbody>
      <tr class="text-c">
        <td colspan="3" rowspan="3">
          <img src="@/assets/table-log.png" style="widht: 40px">
        </td>
        <td colspan="15" style="font-size: 24px">中国建筑项目管理表格</td>
      </tr>
      <tr class="text-c header_col">
        <td rowspan="2" colspan="9" style="font-size: 24px">
          {{ getLable(printData.type, printCopyData.category) || '' }}
        </td>
        <td colspan="6">表格编号</td>
      </tr>
      <tr class="text-c header_col">
        <td v-if="printData.type === 1" colspan="6">CSCEC8BNF-MM-B10131</td>
        <td v-if="printData.type === 3" colspan="6">CSCEC8BNF-MM-B10132</td>
        <td v-if="printData.type === 4" colspan="6">CSCEC8B-PS-B30903</td>
        <td v-if="printData.type === 5" colspan="6">CSCEC8B-PS-B309021</td>
      </tr>
      <tr class="text-c">
        <td colspan="2">项目名称</td>
        <td colspan="6">{{ printData.projectName || '' }}</td>
        <td colspan="2">日期</td>
        <td colspan="6">{{ printData.settlementDate || '' }}</td>
        <td colspan="2">单位：元</td>
      </tr>
      <tr class="text-c">
        <td colspan="2">供应商</td>
        <td colspan="7">{{ printData.supplierName || '' }}</td>
        <td colspan="2">合同编号</td>
        <td colspan="7">{{ printData.contractCode || '' }}</td>
      </tr>
      <tr class="text-c">
        <td colspan="2">结算编号</td>
        <td colspan="16">{{ printCopyData.orderNo || '' }}</td>
      </tr>
      <tr class="text-c">
        <td colspan="1" rowspan="2">序号</td>
        <td colspan="1" rowspan="2">收料日期</td>
        <td colspan="1" rowspan="2">收料编号</td>
        <td colspan="1" rowspan="2">物资名称</td>
        <td colspan="1" rowspan="2">规格型号</td>
        <td colspan="1" rowspan="2">单位</td>
        <td colspan="1" rowspan="2">浮动比例</td>
        <td colspan="1" rowspan="2">合同约定浮动价</td>
        <td colspan="1" rowspan="2">含税附加费</td>
        <td colspan="1">数量</td>
        <td colspan="1">税前单价</td>
        <td colspan="1">税率</td>
        <td colspan="1">单价税金</td>
        <td colspan="1">含税单价</td>
        <td colspan="1">税前结算价款</td>
        <td colspan="1">结算价款税</td>
        <td colspan="1">含税结算价</td>
        <td colspan="1" rowspan="2">备注</td>
      </tr>
      <tr class="text-c">
        <td colspan="1">①</td>
        <td colspan="1">②</td>
        <td colspan="1">③</td>
        <td colspan="1">④=②*③</td>
        <td colspan="1">⑤=②+④</td>
        <td colspan="1">⑥=①*②</td>
        <td colspan="1">⑦=①*②*③</td>
        <td colspan="1">⑧=⑥+⑦</td>
      </tr>
      <template v-if="printData.type === 1">
        <tr
          v-for="(item, index) in printCopyData.rebarVoList"
          :key="index"
          class="text-c"
        >
          <td colspan="1">{{ index + 1 }}</td>
          <td colspan="1">{{ item.receiptDate || '' }}</td>
          <td colspan="1">{{ item.receiptOrReturnCode || '' }}</td>
          <td colspan="1">{{ item.materialName || '' }}</td>
          <td colspan="1">{{ item.standards || '' }}</td>
          <td colspan="1">{{ item.unit || '' }}</td>
          <td colspan="1">{{ item.floatingScale || '0' }}%</td>
          <td colspan="1">
            {{ item.includeTaxContractAppointmentPrice || '0' }}
          </td>
          <td colspan="1">{{ item.includeTaxExtraPrice || '0' }}</td>
          <td colspan="1">{{ item.amount || '0' }}</td>
          <td colspan="1">{{ item.taxReduceUnitPrice || '0' }}</td>
          <td colspan="1">{{ item.taxRate || '0' }}%</td>
          <td colspan="1">{{ item.taxes || '0' }}</td>
          <td colspan="1">{{ item.taxIncludeUnitPrice || '0' }}</td>
          <td colspan="1">{{ item.taxReduceUnitTotalPrice || '0' }}</td>
          <td colspan="1">{{ item.totalTaxes || '0' }}</td>
          <td colspan="1">{{ item.taxIncludeUnitTotalPrice || '0' }}</td>
          <td colspan="1">{{ item.remark || '' }}</td>
        </tr>
      </template>
      <template v-if="printData.type === 3">
        <tr
          v-for="(item, index) in printCopyData.floatingVoList"
          :key="index"
          class="text-c"
        >
          <td colspan="1">{{ index + 1 }}</td>
          <td colspan="1">{{ item.receiptDate || '' }}</td>
          <td colspan="1">{{ item.receiptOrReturnCode || '' }}</td>
          <td colspan="1">{{ item.materialName || '' }}</td>
          <td colspan="1">{{ item.standards || '' }}</td>
          <td colspan="1">{{ item.unit || '' }}</td>
          <td colspan="1">{{ item.floatingScale || '0' }}%</td>
          <td colspan="1">
            {{ item.includeTaxContractAppointmentPrice || '0' }}
          </td>
          <td colspan="1">{{ item.includeTaxExtraPrice || '0' }}</td>
          <td colspan="1">{{ item.amount || '0' }}</td>
          <td colspan="1">{{ item.taxReduceUnitPrice || '0' }}</td>
          <td colspan="1">{{ item.taxRate || '0' }}%</td>
          <td colspan="1">{{ item.taxes || '0' }}</td>
          <td colspan="1">{{ item.taxIncludeUnitPrice || '0' }}</td>
          <td colspan="1">{{ item.taxReduceUnitTotalPrice || '0' }}</td>
          <td colspan="1">{{ item.totalTaxes || '0' }}</td>
          <td colspan="1">{{ item.taxIncludeUnitTotalPrice || '0' }}</td>
          <td colspan="1">{{ item.remark || '' }}</td>
        </tr>
      </template>
      <template v-if="printData.type === 4">
        <tr
          v-for="(item, index) in printCopyData.netPriceVoList"
          :key="index"
          class="text-c"
        >
          <td colspan="1">{{ index + 1 }}</td>
          <td colspan="1">{{ item.receiptDate || '' }}</td>
          <td colspan="1">{{ item.receiptOrReturnCode || '' }}</td>
          <td colspan="1">{{ item.materialName || '' }}</td>
          <td colspan="1">{{ item.standards || '' }}</td>
          <td colspan="1">{{ item.unit || '' }}</td>
          <td colspan="1">{{ item.floatingScale || '0' }}%</td>
          <td colspan="1">
            {{ item.includeTaxContractAppointmentPrice || '0' }}
          </td>
          <td colspan="1">{{ item.includeTaxExtraPrice || '0' }}</td>
          <td colspan="1">{{ item.amount || '0' }}</td>
          <td colspan="1">{{ item.taxReduceUnitPrice || '0' }}</td>
          <td colspan="1">{{ item.taxRate || '0' }}%</td>
          <td colspan="1">{{ item.taxes || '0' }}</td>
          <td colspan="1">{{ item.taxIncludeUnitPrice || '0' }}</td>
          <td colspan="1">{{ item.taxReduceUnitTotalPrice || '0' }}</td>
          <td colspan="1">{{ item.totalTaxes || '0' }}</td>
          <td colspan="1">{{ item.taxIncludeUnitTotalPrice || '0' }}</td>
          <td colspan="1">{{ item.remark || '' }}</td>
        </tr>
      </template>
      <template v-if="printData.type === 5">
        <tr
          v-for="(item, index) in printCopyData.concreteVoList"
          :key="index"
          class="text-c"
        >
          <td colspan="1">{{ index + 1 }}</td>
          <td colspan="1">{{ item.receiptDate || '' }}</td>
          <td colspan="1">{{ item.receiptOrReturnCode || '' }}</td>
          <td colspan="1">{{ item.materialName || '' }}</td>
          <td colspan="1">{{ item.standards || '' }}</td>
          <td colspan="1">{{ item.unit || '' }}</td>
          <td colspan="1">{{ item.floatingScale || '0' }}%</td>
          <td colspan="1">
            {{ item.includeTaxContractAppointmentPrice || '0' }}
          </td>
          <td colspan="1">{{ item.includeTaxExtraPrice || '0' }}</td>
          <td colspan="1">{{ item.amount || '0' }}</td>
          <td colspan="1">{{ item.taxReduceUnitPrice || '0' }}</td>
          <td colspan="1">{{ item.taxRate || '0' }}%</td>
          <td colspan="1">{{ item.taxes || '0' }}</td>
          <td colspan="1">{{ item.taxIncludeUnitPrice || '0' }}</td>
          <td colspan="1">{{ item.taxReduceUnitTotalPrice || '0' }}</td>
          <td colspan="1">{{ item.totalTaxes || '0' }}</td>
          <td colspan="1">{{ item.taxIncludeUnitTotalPrice || '0' }}</td>
          <td colspan="1">{{ item.remark || '' }}</td>
        </tr>
      </template>

      <tr class="text-c">
        <td colspan="2" class="text-c">本次结算其他金额</td>
        <td colspan="12" />
        <td colspan="1">{{ printCopyData.totalOtherAmountsNoTax || '0' }}</td>
        <td colspan="1">
          {{
            printCopyData.totalOtherAmounts -
              printCopyData.totalOtherAmountsNoTax || '0'
          }}
        </td>
        <td colspan="1">{{ printCopyData.totalOtherAmounts || '0' }}</td>
        <td colspan="1" />
      </tr>
      <tr class="text-c">
        <td colspan="2" class="text-c">合计</td>
        <td colspan="7" />
        <td colspan="1">{{ printCopyData.supplyQuantity || '0' }}</td>
        <td colspan="4" />
        <td colspan="1">{{ printCopyData.settlementAmtNoTax || '0' }}</td>
        <td colspan="1">{{ printCopyData.settlementTax || '0' }}</td>
        <td colspan="1">{{ printCopyData.settlementAmtTax || '0' }}</td>
        <td colspan="1" />
      </tr>
      <tr class="text-c">
        <td colspan="2" class="text-c">本次合计（不含税）</td>
        <td colspan="8">{{ printCopyData.settlementAmtNoTax || '0' }}</td>
        <td colspan="1">人民币大写:</td>
        <td colspan="7">{{ chineSize(printCopyData.settlementAmtNoTax) || '' }}</td>
      </tr>
      <tr class="text-c">
        <td colspan="2" class="text-c">本次合计（含税）</td>
        <td colspan="8">{{ printCopyData.settlementAmtTax || '0' }}</td>
        <td colspan="1">人民币大写:</td>
        <td colspan="7">{{ chineSize(printCopyData.settlementAmtTax) || '' }}</td>
      </tr>
      <tr class="text-c">
        <td colspan="2" class="text-c">累计发生（不含税）</td>
        <td colspan="8">{{ printCopyData.cumSettlementAmtNoTax || '0' }}</td>
        <td colspan="1">人民币大写:</td>
        <td colspan="7">
          {{ chineSize(printCopyData.cumSettlementAmtNoTax) || '' }}
        </td>
      </tr>
      <tr class="text-c">
        <td colspan="2" class="text-c">累计发生（含税）</td>
        <td colspan="8">{{ printCopyData.cumSettlementAmtTax || '0' }}</td>
        <td colspan="1">人民币大写:</td>
        <td colspan="7">{{ chineSize(printCopyData.cumSettlementAmtTax) || '' }}</td>
      </tr>
      <tr class="text-c">
        <td colspan="18" class="content">
          以上结算内容为供应商自 {{ printData.settlementBeginDate || '' }} 至
          {{ printData.settlementEndDate || '' }} 期间与本项目发生的所有业务，
          已按照合同（合同编号：{{
            printData.contractCode || ''
          }}约定方式按月度进行结算。 累计发生收料单
          {{ printData.receiptQuantity || '0' }} 张，共计金额为
          {{ printCopyData.settlementAmtTax || '0' }} 元。
        </td>
      </tr>
      <tr class="text-c">
        <td colspan="6" rowspan="5">
          <div class="officialSeal">
            <div class="seal">供货单位（盖章）:</div>
            <div class="agent">
              法人代表或授权委托人:{{ printData.supplierOperator || '' }}
            </div>
            <div class="data">
              {{ printData.supplierConfirmTime || '' }}
            </div>
          </div>
        </td>
        <td colspan="4" class="text-c">审批人</td>
        <td colspan="4" class="text-c">审签栏</td>
        <td colspan="4" class="text-c">日期</td>
      </tr>
      <tr class="text-c">
        <td colspan="4">项目物资经办人</td>
        <td colspan="4">{{ printData.materialEngineerName || '' }}</td>
        <td colspan="4">{{ printData.materialEngineerTime || '' }}</td>
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
import { chineseNumber } from '@/utils/validate'
export default {
  name: 'FloatingPriceCopy',
  props: {
    printData: {
      type: Object,
      require: true,
      default: () => {}
    },
    printCopyData: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      chineSize: chineseNumber
    }
  },
  methods: {
    getLable(type, category) {
      let label = ''
      if (type === 1) {
        label = '钢筋结算单-副单' + category
      } else if (type === 3) {
        label = '一般材料按信息价除税下浮结算单-副单' + category
      } else if (type === 4) {
        label = '参考网价结算单-副单' + category
      } else if (type === 5) {
        label = '混凝土结算单-副单' + category
      }
      return label
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
