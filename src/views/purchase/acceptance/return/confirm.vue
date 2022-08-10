<template>
  <div class="details-container">
    <Panel title="基本信息" :divider="false">
      <el-radio-group v-model="form.returnType">
        <el-radio :label="1">换货</el-radio>
        <el-radio :label="2">退货</el-radio>
      </el-radio-group>
      <el-row class="mt16">
        <el-col
          v-for="(v, i) in basicColumns"
          :key="i"
          :span="12"
          class="info-row"
        >
          <el-row>
            <el-col class="label" :span="8" align="right">{{ v.label }}</el-col>
            <el-col class="text" :span="16" align="left">
              {{ form[v.key] }}
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </Panel>
    <Panel title="收货方信息" :divider="false">
      <el-row>
        <el-col
          v-for="(v, i) in reciveColumns"
          :key="i"
          :span="12"
          class="info-row recive-info"
        >
          <el-row>
            <el-col
              class="label"
              :class="{ white: !v.key }"
              :span="8"
              align="right"
            >{{ v.label }}</el-col>
            <el-col class="text" :span="16" align="left">
              {{ form[v.key] }}
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <br>
      <br>
    </Panel>
    <Panel title="需用物资列表">
      <!-- 表格 -->
      <el-table :data="form.data" style="width: 100%">
        <el-table-column prop="materialName" width="90" label="物资名称" />
        <el-table-column prop="standards" width="90" label="规格/型号" />
        <el-table-column prop="returnNum" label="退货数量" />
        <el-table-column prop="unit" width="90" label="单位" />
        <el-table-column prop="taxIncludeUnitPrice" label="含税单价（元）" />
        <el-table-column
          prop="taxReduceUnitPrice"
          width="90"
          label="除税单价(元)"
        />
        <el-table-column prop="taxRate" width="90" label="税率(%)" />
        <el-table-column prop="taxes" width="90" label="税金(元)" />
        <el-table-column prop="certificate" label="合格证号" />
        <el-table-column prop="brand" label="品牌" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column prop="actions" label="操作">
          <template>
            <a>删除</a>
          </template>
        </el-table-column>
      </el-table>
    </Panel>
  </div>
</template>
<script>
import {
  supplierQueryReturnOrChangeDetail,
  supplierCheckReturnOrChange
} from '@/api/supplier/ship/return'
const basicColumns = [
  { label: '退货单编号', key: 'returnCode' },
  { label: '收料单编号', key: 'receiptCode' },
  { label: '供应商/厂家', key: 'supplierName' },
  { label: '发货车牌号', key: 'plateNumber' },
  { label: '送货人姓名', key: 'returnContact' },
  { label: '送货人联系电话', key: 'deliverTel' },
  { label: '发货日期', key: 'deliveryDate' },
  { label: '备注', key: 'remark' }
]
const reciveColumns = [
  { label: '供应商/厂家', key: 'supplierName' },
  { label: '联系人', key: 'returnContact' },
  { label: '联系电话', key: 'deliverTel' },
  { label: '', key: '', value: '' }
]
export default {
  components: {
    Panel: () => import('@/components/Panel')
  },
  props: {},
  data() {
    return {
      basicColumns: Object.freeze(basicColumns),
      reciveColumns: Object.freeze(reciveColumns),
      form: { data: [] }
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  watch: {},
  created() {
    this.initData()
  },
  mounted() {},
  methods: {
    async initData() {
      const params = new URLSearchParams()
      params.append('returnId', this.id)
      const res = await supplierQueryReturnOrChangeDetail(params)
      this.form = Object.assign({}, this.form, {
        ...res.data,
        date: '',
        data: res.data.returnItemList
      })
      console.log(this.form)
      delete this.form.returnItemList
    },
    handleOk() {
      const params = new URLSearchParams()
      params.append('returnId', this.id)
      params.append('returnType', this.form.returnType)
      this.loading = true
      supplierCheckReturnOrChange(params)
        .then(() => {
          this.$message.success('操作成功！')
          this.handleCancel()
        })
        .finally(() => {
          this.loading = false
        })
    },
    handleCancel() {
      this.$router.push('/ship/info_confirm')
    }
  }
}
</script>
<style lang="scss" scoped>
.details-container {
  // padding-top: 68px;
  #details-nav {
    margin: -16px;
    margin-bottom: 16px;
    padding-left: 32px;
    padding-bottom: 16px;
    background: white;
    h4 {
      font-size: 20px;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.85);
      margin: 0;
      font-weight: bold;
      color: #262626;
      margin-bottom: 8px;
      span {
        vertical-align: middle;
      }
    }
    > span {
      font-size: 14px;
      color: #595959;
    }
  }
  .info-row {
    font-size: 14px;
    .el-row {
      border: 1px solid #ebebeb;
      border-bottom: none;
      > div {
        padding: 0px 17px;
        height: 30px;
        line-height: 30px;
      }
      .label {
        background: #f7f7f7;
        border-right: 1px solid #ebebeb;
        &.white {
          background: transparent;
        }
      }
    }
    &:nth-child(2n) .el-row {
      border-left: none;
    }
    &:nth-child(n + 7) .el-row {
      border-bottom: 1px solid #ebebeb;
    }
    &.recive-info:nth-child(n + 3) .el-row {
      border-bottom: 1px solid #ebebeb;
    }
    &.recive-info:nth-child(n + 4) .el-row {
      .label {
        border-right: none;
      }
    }
    &.recive-info:nth-last-child(2) .el-row {
      border-right: none;
    }
  }
}
</style>
<style lang="scss" scoped>
// #details-nav {
//   z-index: 1000;
//   width: 100%;
//   position: fixed;
//   top: 104px;
//   right: 0;
//   background: white;
//   padding: 0px 32px 17px;
//   padding-left: 208px + 32px;
//   transition: padding-left 0.28s;
// }
</style>
