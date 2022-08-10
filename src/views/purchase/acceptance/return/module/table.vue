<template>
  <div class="table-container">
    <!-- 表格导航栏 -->
    <el-row
      type="flex"
      align="middle"
      justify="space-between"
      class="flex-box table-header"
    >
      <el-col>退换货列表</el-col>
      <el-col>
        <el-button
          :loading="buttonLoading.export"
          @click="handleClick({ key: '7' })"
        >导出</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      v-loading="loading"
      v-bind="tableProps"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="50" />
      <el-table-column type="returnType" label="类型" width="50">
        <template slot-scope="{ row }">
          {{ ['退货', '换货'][row.returnType + 1] }}
        </template>
      </el-table-column>
      <el-table-column prop="returnCode" label="退换单编号" width="140">
        <template slot-scope="{ row }">
          <a @click="handleClick({ key: '4', record: row })">
            {{ row.returnCode }}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="receiptCode" label="原收料单编号" width="140">
        <template slot-scope="{ row }">
          <a @click="handleClick({ key: '5', record: row })">
            {{ row.receiptCode }}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="deliveryNo" label="原发货单编号" width="140">
        <template slot-scope="{ row }">
          <a @click="handleClick({ key: '6', record: row })">
            {{ row.deliveryNo }}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="returnOperator" label="送货人姓名" width="140" />
      <el-table-column
        prop="returnOperatorPhone"
        label="联系方式"
        width="140"
      />
      <el-table-column prop="itemTypeNum" label="物资种类数" width="140" />
      <el-table-column prop="returnStatus" label="状态" width="140">
        <template slot-scope="{ row }">
          {{
            (
              returnStatusOptions.find((i) => i.value === row.returnStatus) || {
                label: '--'
              }
            ).label
          }}
        </template>
      </el-table-column>
      <el-table-column prop="returnDate" label="退/换货日期" width="140" />
      <el-table-column prop="isSettlement" label="是否结算" width="140">
        <template slot-scope="{ row }">
          {{ ['否', '是'][row.isSettlement] }}
        </template>
      </el-table-column>
      <el-table-column prop="actions" label="操作" width="140" fixed="right">
        <template slot-scope="{ row }">
          <a @click="handleClick({ key: '1', record: row })">确认</a>
          <el-divider direction="vertical" />
          <a @click="handleClick({ key: '2', record: row })">退回</a>
          <br>
          <a @click="handleClick({ key: '3', record: row })">新增发货单</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { deliveryOptions, checkOptions, returnStatusOptions } from '../data'
export default {
  components: {},
  props: {
    dataSource: {
      type: Array,
      default: () => []
    },
    loading: Boolean
  },
  data() {
    return {
      rowKey: 'id',
      selectedRowKeys: [],
      buttonLoading: { export: false },
      returnStatusOptions: Object.freeze(returnStatusOptions),
      deliveryOptions: Object.freeze(deliveryOptions),
      checkOptions: Object.freeze(checkOptions)
    }
  },
  computed: {
    tableProps() {
      return {
        ref: 'table',
        rowKey: this.rowKey,
        data: this.dataSource,
        'header-cell-class-name': 'header-row-cell-border'
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    handleClick({ key, record = {}}) {
      record = Object.assign({}, record, {
        selectedRowKeys: this.selectedRowKeys
      })
      this.$emit('onclick', { key, record })
    },
    clearSelection() {
      this.$refs.table.clearSelection()
    },
    setLoading(key, loading = false) {
      this.buttonLoading[key] = loading
    },
    handleSelectionChange(val) {
      this.selectedRowKeys = val.map((i) => i[this.rowKey])
    }
  }
}
</script>
<style lang="scss" scoped>
.table-container {
  .table-header {
    padding: 16px 0;
  }
  .flex-box {
    flex-flow: row nowrap;
    > div {
      width: inherit;
    }
  }
  ::v-deep .header-row-cell-border {
    .cell {
      border-right: 1px solid #d9d9d9;
    }
    &:nth-last-of-type(1) {
      .cell {
        border: none;
      }
    }
  }
}
a {
  color: #1791ff;
  cursor: pointer;
}
</style>
