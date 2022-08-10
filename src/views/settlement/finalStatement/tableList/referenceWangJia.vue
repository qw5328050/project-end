<template>
  <div>
    <el-table
      v-loading="loading"
      :data="itemVoList"
      element-loading-text="Loading"
      highlight-current-row
      :header-row-class-name="() => 'headerClass'"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="供货时间" prop="receiptDate" />
      <el-table-column label="物资名称" prop="materialName" />
      <el-table-column label="规格型号" prop="standards" />
      <el-table-column label="计量单位" prop="unit" />
      <el-table-column label="供货数量" prop="amount" />
      <el-table-column label="含税单价(元)" prop="taxIncludeUnitPrice" />
      <el-table-column label="除税单价" prop="taxReduceUnitPrice" />
      <el-table-column label="税率（%）" prop="taxRate" />
      <el-table-column label="税金" prop="taxes" />
      <el-table-column label="合同浮动比例（%）"  prop='floatingScale'  />
      <el-table-column
        label="合同约定含税浮动价"
        prop="includeTaxContractAppointmentPrice"
      />
      <el-table-column label="含税附加费（元）" prop="includeTaxExtraPrice" />
      <el-table-column label="备注" prop="type">
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
    calculate() {
      if (this.type === 1) {
        this.itemVoList = this.list.netPriceItemVoList
        this.show = true // 不能编辑
      }
      if (this.type === 2) {
        this.itemVoList = this.list.netPriceVoList
        this.show = true // 不能编辑
      }
      if (this.type === 3) {
        this.itemVoList = this.list.netPriceVoList
        this.show = true // 不能编辑
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
</style>
