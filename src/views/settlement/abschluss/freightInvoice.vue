<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="60%"
    append-to-body
    :show-close="true"
    :before-close="handleClose"
  >
    <el-form
      ref="queryForm"
      :label-position="labelPosition"
      :model="queryParams"
      label-width="90px"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="供应商名称:" prop="type">
            钢筋结算单
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="合同:" prop="type">
            <el-select
              v-model="queryParams.type"
              placeholder="请选择"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供应商:" prop="type">
            <el-select
              v-model="queryParams.type"
              placeholder="请选择"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="search-btn">
            <el-button @click="handerReset">重置</el-button>
            <el-button type="primary">查询</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item label="收货时间:" prop="type">
            <el-date-picker
              v-model="date"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      key="结算"
      v-loading="loading"
      :data="list"
      element-loading-text="Loading"
      height="385"
      :header-row-class-name="() => 'headerClass'"
      highlight-current-row
      style="margin-top: 8px"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="收货单编号" prop="type" />
      <el-table-column label="项目名称" prop="type" />
      <el-table-column label="供应商名称" prop="type" />
      <el-table-column label="合同编号" prop="type" />
      <el-table-column label="含税金额（元）" prop="type" />
      <el-table-column label="收料日期" prop="type" />
    </el-table>
    <div class="footer">
      <div class="selectBox">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
        >已选4项</el-checkbox>
        <el-button type="text" style="margin-left: 4px">取消</el-button>
      </div>
      <div class="actionButtons">
        <el-button>取消</el-button>
        <el-button type="primary" @click="actionButtons">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  name: '',
  props: {
    title: {
      type: String,
      require: true,
      default: ''
    },
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list: [
        { type: '测试数据' }
      ], // 表格数据
      isIndeterminate: false, // 底部选择的状态
      checkAll: false, // 全选的状态
      date: '',
      loading: false,
      labelPosition: 'right',
      queryParams: {}
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    actionButtons() {
      var that = this
      that
        .$confirm('是否确认生成月度结算单?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(function() {
          that.$router.push({
            path: '/settlement/finalStatementEdit',
            query: { setid: 1 }
          })
          that.handleClose()
        })
    },
    handerReset() {},
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
</style>
