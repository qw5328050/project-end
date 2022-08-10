<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="50%"
    append-to-body
    :before-close="handleClose"
  >
    <div style="font-size: 14px; font-weight: 600; color: #262626">
      <span>合同编号：</span>
      <span>{{ hTMC }}</span>
    </div>
    <el-table
      v-loading="loading"
      :data="form"
      height="385"
      style="margin-top: 26px"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="收货项目" prop="projectName" />
      <el-table-column label="项目状态" prop="projectStatus">
        <template slot-scope="{ row }">
          <span>{{
            getDictionaryLabel(row.projectStatus, 'projectStatus')
          }}</span>
        </template>
      </el-table-column>
      <!--      <el-table-column label="操作人" prop="createUserName" />-->
      <!-- <el-table-column label="收货时间" prop="receiptTime" /> -->
    </el-table>
    <Pagination
      v-if="total > 0"
      :background="false"
      small
      style="margin-left: 85%; margin-top: 8px"
      layout="prev, pager, next"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
  </el-dialog>
</template>

<script>
import { selectProjectsByContractId } from '@/api/contractManagement/table'
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
      type: String | Number,
      require: true,
      default: ''
    },
    hTMC: {
      type: String,
      require: true,
      default: ''
    }
  },
  data() {
    return {
      total: 0,
      // interviewId:'',
      contract: 'ZJBJNF-2021-048',
      form: [],
      queryParams: {
        pageNum: 1,
        pageSize: 20
      },
      loading: false, // 表格加载
      list: [
        { type: '测试数据', date: '2022-05-20 05:20' },
        { type: '测试数据', date: '2022-05-20 05:20' }
      ] // 表格数据
    }
  },
  watch: {
    visible: {
      handler() {
        if (this.interviewId) {
          // this.queryParams.interviewId = this.interviewId
          this.getList()
        }
      },
      immediate: true
    }
  },
  created() {},
  methods: {
    // 获取数据
    getList() {
      const interviewId = this.interviewId
      this.loading = true
      selectProjectsByContractId({ contractId: interviewId, ...this.queryParams }).then((res) => {
        this.form = res.data.list
        this.total = res.data.total
        this.loading = false
      })
    },
    // 关闭
    handleClose() {
      this.form = []
      this.$emit('update:visible', false)
    }
    // 提交
    // submitForm() {
    //   this.$emit('submitForm', this.form)
    //   this.handleClose()
    // }
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
