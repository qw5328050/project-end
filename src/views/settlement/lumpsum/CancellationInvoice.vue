<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="60%"
    append-to-body
    :show-close="true"
    :before-close="handleClose"
    @selection-change="handleSelectionChange"
  >
    <div class="cancellationText">
      您将作废月度结算单{{ totalNo }}：请选择需要调量的收货单：
    </div>
    <el-table
      ref="multipleTable"
      v-loading="loading"
      :data="list"
      element-loading-text="Loading"
      height="385"
      border
      stripe
      highlight-current-row
      style="margin-top: 26px"
      :header-row-class-name="() => 'headerClass'"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="center" />
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="月度结算编号" prop="orderNo" />
      <el-table-column label="结算类型" prop="type">
        <template slot-scope="{ row }">
          {{ getDictionaryLabel(row.type, 'type') }}
        </template>
      </el-table-column>
      <el-table-column label="数量" prop="supplyQuantity" />
      <el-table-column label="结算金额" prop="settlementAmtTax" />
    </el-table>
    <div class="footer">
      <div class="selectBox">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
        >已选{{ length }}项</el-checkbox>
        <el-button
          type="text"
          style="margin-left: 4px"
          @click="cancelButtons"
        >取消</el-button>
      </div>
      <div class="actionButtons">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="actionButtons">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { listSelectOrderByReopen } from '@/api/lumpsum/test'
export default {
  name: '',
  props: {
    title: {
      type: String,
      require: true,
      default: null
    },
    visible: {
      type: Boolean,
      require: true
    },
    totalOrderId: {
      type: Number,
      require: true,
      default: null
    },
    totalNo: {
      type: String,
      require: true,
      default: null
    }
  },
  data() {
    return {
      list: [], // 表格数据
      isIndeterminate: false, // 底部选择的状态
      checkAll: false, // 全选的状态
      date: '',
      loading: false,
      labelPosition: 'right',
      queryParams: {},
      length: 0,
      ids: []
    }
  },
  watch: {
    visible: {
      handler() {
        if (this.totalOrderId) {
          this.listSelectOrderByReopen()
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 取消
    cancelButtons() {
      this.$refs.multipleTable.clearSelection()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.length = selection.length
    },
    // 总结算作费重开选择月度列表
    listSelectOrderByReopen() {
      this.loading = true
      listSelectOrderByReopen({ totalOrderId: this.totalOrderId }).then(
        (res) => {
          if (res.status === 200) {
            this.list = res.data
            this.loading = false
          }
        }
      )
    },
    // 确定
    actionButtons() {
      var that = this
      if(this.ids.length == 0 ){
          that.$message.warning("请选择一条收货单~")
          return
      }
      that
        .$confirm('生成收料单列表', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(function() {
          if (that.ids.length > 0) {
            that.$router.push({
              path: '/settlement/cancellation',
              query: {
                id: that.ids,
                totalOrderId: that.totalOrderId,
                totalNo: that.totalNo
              }
            })
          }
        })
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped>
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
}
.footer {
  width: 100%;
  margin-top: 16px;
  /* padding-left: 40px; */
  padding-right: 24px;
  box-sizing: border-box;
  height: 64px;
  justify-content: space-between;
  /* background: #ffffff;
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08); */
  display: flex;
  align-items: center;
}
.cancellationText {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #262626;
  line-height: 22px;
}
</style>
