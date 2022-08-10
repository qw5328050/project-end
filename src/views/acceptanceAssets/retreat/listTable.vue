<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="60%"
    append-to-body
    :show-close="true"
    :before-close="handleClose"
  >
    <el-table
      ref="dataTable"
      v-loading="loading"
      :data="options"
      element-loading-text="Loading"
      height="385"
      :header-row-class-name="() => 'headerClass'"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" align="left" />
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="materialName" label="物资名称" />
      <el-table-column prop="standards" label="规格型号" />
      <el-table-column prop="amount" label="收货数量">
        <!--        <template slot-scope="scope">-->
        <!--          <span v-if="scope.row.amount === null || scope.row.amount===''"></span>-->
        <!--          <span v-else>{{scope.row.amount}}</span>-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column prop="unit" label="单位" />
      <el-table-column prop="includeTaxPrice" label="含税单价(元)" />
      <el-table-column prop="excludeTaxPrice" label="除税单价(元)" />
      <el-table-column prop="taxRate" label="税率(%)" />
      <el-table-column prop="taxes" label="税金(元)" />
    </el-table>
    <div class="footer">
      <div class="selectBox">
        <el-checkbox
          v-model="checkAll"
          @change="changeAll"
        >已选{{ length || 0 }}项</el-checkbox>
        <!--        <el-button-->
        <!--          type="text"-->
        <!--          style="margin-left: 4px"-->
        <!--          @click="cancel"-->
        <!--        >取消</el-button>-->
      </div>
      <div class="actionButtons">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="actionButtons">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: 'RetreatListTableAssets',
  props: {
    title: {
      type: String,
      require: true,
      default: ''
    },
    visible: {
      type: Boolean,
      require: true
    },
    options: {
      type: Array,
      default: () => []
    },
    listIds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      length: '', // 选中的数量
      checkAll: false, // 全选的状态
      loading: false,
      multipleSelection: [], // 选择的数据
      changeAlls: false
    }
  },
  watch: {
    visible: {
      handler() {
        if (this.listIds.length !== 0) {
          this.$nextTick(() => {
            this.selectId()
          })
        } else {
          this.length = this.listIds.length
        }
      },
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    changeAll() {
      this.changeAlls = !this.changeAlls
      if (this.changeAlls) {
        this.multipleSelection = this.options.map((item) => item)
        this.multipleSelection.forEach((row) => {
          this.$refs.dataTable.toggleRowSelection(row, true)
        })
        this.length = this.multipleSelection.length
      } else {
        this.multipleSelection = this.options.map((item) => item)
        this.multipleSelection.forEach((row) => {
          this.$refs.dataTable.toggleRowSelection(row, false)
        })
        this.length = 0
      }
    },
    // 回显选中
    selectId() {
      if (this.listIds) {
        this.options.forEach((row) => {
          if (this.listIds.indexOf(row.materialName) >= 0) {
            this.$refs.dataTable.toggleRowSelection(row, true)
          }
        })
      } else {
        this.$refs.dataTable.clearSelection()
      }
    },
    // 选中的数据
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.length = this.multipleSelection.length
    },
    actionButtons() {
      this.$emit('submitForm', this.multipleSelection)
    },
    // 取消
    cancel() {
      this.multipleSelection = []
      this.length = this.multipleSelection.length
    },
    // 关闭
    handleClose() {
      this.$emit('submitForm', false)
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
</style>
