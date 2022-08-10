<template>
  <div>
    <el-table
      v-loading="loading"
      :data="itemVoList"
      element-loading-text="Loading"
      highlight-current-row
      :header-row-class-name="() => 'headerClass'"
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="单据编号" prop="receiptOrReturnCode" />
      <el-table-column
        label="租赁开始日期"
        prop="rentStartDate"
        width="100px"
      />
      <el-table-column label="租赁结束日期" prop="rentEndDate" width="100px" />
      <el-table-column label="物资名称" prop="materialName" />
      <el-table-column label="规格型号" prop="standards" />
      <el-table-column label="计量单位" prop="unit" />
      <el-table-column label="租货数量" prop="amount" />
      <el-table-column label="含税单价(元)" prop="taxIncludeUnitPrice" />
      <el-table-column label="除税单价" prop="taxReduceUnitPrice" />
      <el-table-column label="除税基准价" prop="excludeTaxBasePrice" />
      <el-table-column label="含税基准价" prop="includeTaxBasePrice" />
      <el-table-column label="税率（%）" prop="taxRate" />
      <el-table-column label="税金" prop="taxes" />
      <el-table-column label="附含税附加费（元）" prop="includeTaxExtraPrice" />
      <el-table-column label="结算方式" prop="settlementMode">
        <template slot-scope="{ row }">
          {{ getDictionaryLabel(row.settlementMode, 'settlementMethod') }}
        </template>
      </el-table-column>
      <el-table-column
        label="清理维修费等其他费用"
        prop="otherExpenses"
        width="200px"
      >
        <template slot-scope="{ row }">
          <el-input
            v-if="!show"
            v-model="row.otherExpenses"
            type="number"
            placeholder="请输入"
            @blur="calculation(row)"
          />
          <div v-if="show">{{ row.otherExpenses || 0 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="丢失损坏量" prop="lostDamage" width="200px">
        <template slot-scope="{ row }">
          <el-input
            v-if="!show"
            v-model="row.lostDamage"
            type="number"
            placeholder="请输入"
            @blur="calculation(row)"
          />
          <div v-if="show">{{ row.lostDamage || 0 }}</div>
        </template>
      </el-table-column>
      <el-table-column
        label="赔偿单价"
        prop="compensationUnitPrice"
        width="200px"
      >
        <template slot-scope="{ row }">
          <el-input
            v-if="!show"
            v-model="row.compensationUnitPrice"
            type="number"
            placeholder="请输入"
            @blur="calculation(row)"
          />
          <div v-if="show">{{ row.compensationUnitPrice || 0 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="含税金额" prop="taxIncludeUnitTotalPrice" />
      <el-table-column label="增税金额" prop="totalTaxes" />
      <el-table-column label="除税金额" prop="taxReduceUnitTotalPrice" />
      <el-table-column
        label="赔偿金额"
        prop="compensationExpenses"
        width="100px"
      />
      <el-table-column
        label="月度结算费用"
        prop="monthlySettlementExpenses"
        width="100px"
      />
      <el-table-column label="备注" prop="remark" width="200px">
        <template slot-scope="{ row }">
          <el-input
            v-if="!show"
            v-model="row.remark"
            placeholder="请输入内容"
            @blur="save"
          />
          <div v-if="show">{{ row.remark }}</div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Object,
      require: true,
      default: null
    },
    type: {
      type: Number,
      require: true,
      default: null
    }
  },
  data() {
    return {
      itemVoList: [],
      input: '',
      show: false,
      loading: false
    }
  },
  watch: {
    type: {
      handler() {
        this.calculate()
      },
      immediate: true
    }
  },
  mounted() {},
  methods: {
    // 修改备注
    save() {
      this.$emit('submitForm', this.list)
    },
    // 限制只能在输入框中输入小数点后两位
    inputnum() {
      this.list.amount = this.list.amount.replace(
        /^(\-)*(\d+)\.(\d\d).*$/,
        '$1$2.$3'
      )
    },
    // 计算
    calculation(row) {
      row.otherExpenses = Number(row.otherExpenses)
      if (row.lostDamage && row.compensationUnitPrice) {
        this.$emit('submitForm', this.list)
      }
    },
    calculate() {
      if (this.type === 1) {
        this.itemVoList = this.list.rentalItemVoList
        this.show = false // 能编辑
        this.$emit('submitForm', this.list)
      }
      if (this.type === 2) {
        this.show = true // 不能编辑
        this.itemVoList = this.list.rentalVoList
      }
      if (this.type === 3) {
        this.show = true // 不能编辑
        this.itemVoList = this.list.rentalVoList
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
}
.cardText {
  margin-top: 16px;
  background-color: #fafafa;
}

.inputText {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #262626;
  margin-left: -100px;
  height: 32px;
  line-height: 32px;
}
.questionBox {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  padding: 12px 6px 6px 6px;
}
</style>
