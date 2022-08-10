<template>
  <div>
    <el-dialog
      title="选择合同"
      :visible.sync="visible"
      :before-close="handleClose"
      @selection-change="handleSelectionChange"
    >
      <div style="height: 2px;width: 100%;background-color: #ccc9c9;margin-bottom: 2%" />
      <div style="margin-bottom: 3%;font-size: 17px">供应商名称：{{ supplierName }}</div>
      <div>
        <el-form :inline="true" :model="params" class="demo-form-inline">
          <el-form-item label="合同编号">
            <el-input v-model="params.contractCode" placeholder="请输入合同编号" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div style="height: 350px;overflow-y: auto">
        <el-table border :data="data">
          <el-table-column
            label="选择"
            width="55"
          >
            <template slot-scope="scope">
              <el-radio v-model="selData" :disabled="(scope.row.contractAmount===null || scope.row.contractAmount<=0)" :label="scope.row.id">
                {{ '' }}
              </el-radio>
            </template>
          </el-table-column>
          <el-table-column property="contractCode" label="合同编号" />
          <el-table-column property="contractAmount" label="合同总金额（元）" />
          <el-table-column property="contractRestAmount" label="合同余额（元）" />
        </el-table>
      </div>
      <div slot="footer" class="footer">
        <div class="actionButtons">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="actionButtons">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ContractDialog',
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    data: {
      type: Array,
      require: true,
      default: () => []
    },
    defaultData: {
      type: Number,
      require: true,
      default: 0
    },
    supplierName: {
      type: String,
      require: true,
      default: ''
    }
  },
  data() {
    return {
      selData: null,
      params: {}
    }
  },
  watch: {
    defaultData: {
      handler: function(val, old) {
        this.selData = val
      },
      deep: true	// 对象内部的属性监听，也叫深度监听
    }
  },

  methods: {
    // 关闭
    handleClose() {
      this.selData = this.defaultData
      this.$emit('handleClose')
    },
    // 确定
    actionButtons() {
      if (!this.selData || this.selData === null) {
        this.$message.warning('请先选择一个合同')
        return
      }
      this.$emit('handleSuccess', this.selData)
    },
    handleSelectionChange(val) {
      this.selData = val
    },
    onSubmit() {
      this.$emit('submitContractParams', this.params)
    }
  }
}
</script>

<style scoped>
/deep/ .el-dialog__body {
  padding: 5px 30px 20px 20px;
  color: #606266;
  font-size: 14px;
  word-break: break-all;
}
</style>
