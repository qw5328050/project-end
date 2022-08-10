<template>
  <el-card>
    <div class="base-info">
      <AllTable
          style="margin-top: 26px"
          :isIndex="true"
          :tableData="tableData"
          :bindData="bindData"
        />
    </div>
  </el-card>
</template>
<script>
import { tellStopList, exportStopsList } from '@/api/borrowSys/prucReportStop'
import AllTable from '@/components/AllTable'
export default {
  name: 'Done',
  data() {
    return {
      form: {},
      tableData: [],
      bindData: {
        a: '审批人',
        a1: '审批结果',
        a2: '审批意见',
        a3: '审批时间'
      },
      pageType: 'allot',
    }
  },
  components: {
    AllTable
  },
  created() {
    this.getList()
  },
  mounted() {},
  methods: {
    sureBatchExam() {
      if (this.ids.length <= 0) {
        this.$message.error('请勾选退料')
        return
      }
      const statusList = this.ids.map(v => {
        return v.status
      })
      if (statusList.indexOf(3) !== -1 || statusList.indexOf(2) !== -1) {
        this.$message.error('已退料不可重复选择')
        return
      }
      this.$router.push({ path: '/borrowSys/returnTable', query: {
        reportStopId: this.ids.map(row => { return row.reportStopId }),
        id: this.ids.map(row => { return row.id }),
        pageType: 'stop'
      }})
    },
    changePageSize(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    // 多选
    handleSelectionChange(data) {
      this.ids = data
    },
    // 导出
    exportData() {
      exportStopsList({ ...this.queryParams, page: this.page, rows: this.rows }).then((res) => {})
    },
    async getList() {
      // 请求数据列表
      var dealList = await tellStopList({
        ...this.queryParams,
        page: this.page,
        rows: this.rows
      })
      this.list = dealList.data.data
      this.pageTotal = dealList.data.total
    },
    // 重置
    handerReset() {
      this.queryParams = {}
      this.renderList()
    },
  }
}
</script>

