<template>
  <div class="monthlyPlanDetails">
    <div class="monthlyPlanTop">
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="1" />
          <el-tab-pane v-if="processInstanceId" label="审批记录" name="2" />
        </el-tabs>
      </div>
    </div>
    <div class="box_content">
      <BasicInformation
        v-if="activeName === '1'"
        v-loading="loading"
        :table-form="tableForm"
      />
      <ApprovalRecords
        v-if="activeName === '2' && processInstanceId"
        v-loading="approvalRecordsLoading"
        :list="approvalRecordsList"
      />
    </div>
  </div>
</template>

<script>
import { selectById } from '@/api/plan/monthlyPlan'
import { flowRecordList } from '@/api/plan/mad'
import BasicInformation from './basicInformation.vue'
import ApprovalRecords from './approvalRecords.vue'
export default {
  name: 'MonthlyPlanDetails',
  components: { BasicInformation, ApprovalRecords },
  data() {
    return {
      headerTitle: '',
      activeName: '1',
      tableForm: {},
      id: '',
      loading: false,
      processInstanceId: '',
      approvalRecordsLoading: false,
      approvalRecordsList: []
    }
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '总计划详情'
    this.id = this.$route.query ? this.$route.query.id : ''
    this.processInstanceId = this.$route.query
      ? this.$route.query.processInstanceId
      : ''
    if (this.id) {
      this.getMonthlyDetail(this.id)
    }
    if (this.processInstanceId) {
      this.getFlowRecordList(this.processInstanceId)
    }
  },
  methods: {
    // 获取审批记录
    getFlowRecordList(id) {
      this.approvalRecordsLoading = true
      flowRecordList({ processInstanceId: id })
        .then((res) => {
          this.approvalRecordsList = res.data
          this.approvalRecordsLoading = false
        })
        .catch(() => {
          this.approvalRecordsLoading = false
        })
    },
    // 获取详情
    getMonthlyDetail(id) {
      this.loading = true
      selectById({ id })
        .then((res) => {
          const data = res.data
          this.tableForm = { ...data }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // tab切换
    handleClick(tab, event) {
      console.log(tab, event)
      this.table = !this.table
      if (!this.table) {
        this.tableName = '月度结算列表'
      } else {
        this.tableName = '待结算验收单'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__nav-wrap {
  &::after {
    display: none;
  }
}
.monthlyPlanDetails {
  .monthlyPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .box_content {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
  }
}
</style>
