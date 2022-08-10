<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="60%"
    append-to-body
    :before-close="handleClose"
  >
    <el-form ref="form" label-width="90px">
      <el-row>
        <el-col :span="18">
          <el-form-item label="项目名称:">
            <el-input
              v-model="form.jobIntention"
              placeholder="请输入"
              clearable
              style="width: 35%"
            >
              <!-- <el-option
                v-for="(item, index) in intentionOptions"
                :key="index"
                :label="item.dictLabel"
                :value="item.dictValue"
              /> -->
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- <el-form-item> -->
          <el-button @click="resetQuery">重置</el-button>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <!-- </el-form-item> -->
        </el-col>
      </el-row>
    </el-form>
    <el-table
      v-loading="loading"
      :data="form"
      height="385"
      style="margin-top: 16px"
      :header-row-class-name="() => 'headerClass'"
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" prop="projectName" />
      <el-table-column label="已结算金额(元)" prop="alreadySettlementAmount">
        <template slot-scope="{ row }">
          <el-input v-model="row.alreadySettlementAmount" clearable style="width: 80%" />
        </template>
      </el-table-column>
      <el-table-column label="是否最终结算" prop="endSettlement">
        <template slot-scope="{ row }">
          <el-radio-group v-model="form.endSettlement">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </template>
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submitForm">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { projectSettlementAmount } from '@/api/contractManagement/execute'
export default {
  name: 'IndexDialog',
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
    interviewId: {
      type: Number | String,
      require: true,
    }
  },
  data() {
    return {
      form: [],
      loading: false, // 表格加载
      list: [
        { type: '测试数据' },
        { type: '测试数据' },
        { type: '测试数据' },
        { type: '测试数据' }
      ] // 表格数据
    }
  },
  watch: {
    visible: {
      handler() {
        if (this.interviewId) {
          this.getList()
        }
      },
      immediate: true
    }
  },
  methods: {
    // 获取数据
    getList() {
      this.loading = true
      projectSettlementAmount(this.interviewId).then((res) => {
        this.form = res.data
        this.loading = false
      })
    },
    // 关闭
    handleClose() {
      this.form = []
      this.$emit('update:visible', false)
    },
    // 查询
    handleQuery() {},
    // 重置
    resetQuery() {},
    // 提交
    submitForm() {
      this.$emit('submitForm', this.form)
      this.handleClose()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
::v-deep .el-dialog__title {
  line-height: 24px;
  font-size: 14px;
  font-weight: 600;
  color: #262626;
}
.footer {
  // position: absolute;
  width: 100%;
  margin-top: 16px;
  padding-left: 40px;
  padding-right: 24px;
  box-sizing: border-box;
  height: 64px;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
}
</style>
