<template>
  <div class="totalPlanDetails">
    <div class="totalPlanTop">
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="1" />
          <el-tab-pane v-if="changeArr.length > 0" label="变更记录" name="2" />
          <el-tab-pane v-if="processInstanceId" label="审批记录" name="3" />
        </el-tabs>
      </div>
    </div>
    <div class="box_content">
      <BasicInformation
        v-if="activeName === '1'"
        v-loading="detailLoading"
        :type="type"
        :all-data="allData"
        :list="list"
      />
      <ChangeRecord
        v-if="activeName === '2' && changeArr.length > 0"
        :type="type"
        :list="changeArr"
      />
      <ApprovalRecords
        v-if="activeName === '3' && processInstanceId"
        v-loading="approvalRecordsLoading"
        :list="approvalRecordsList"
      />
    </div>
  </div>
</template>

<script>
import BasicInformation from './basicInformation.vue'
import ChangeRecord from './changeRecord.vue'
import ApprovalRecords from './approvalRecords.vue'
import { getDetailPlan, changeList } from '@/api/plan/totalPlan'
import { flowRecordList } from '@/api/plan/mad'
export default {
  name: 'TotalPlanDetails',
  components: { BasicInformation, ChangeRecord, ApprovalRecords },
  data() {
    return {
      headerTitle: '',
      activeName: '1',
      change: null,
      id: null,
      type: null,
      createUserName: null,
      createTime: null,
      approvalRecordsLoading: false,
      processInstanceId: null,
      list: [],
      allData: null,
      changeArr: [],
      approvalRecordsList: [],
      detailLoading: false,
      changeLoading: false
    }
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '总计划详情'
    this.id = this.$route.query ? Number(this.$route.query.id) : null
    this.change = this.$route.query ? Number(this.$route.query.change) : null
    this.processInstanceId = this.$route.query
      ? this.$route.query.processInstanceId
      : ''
    if (this.change) {
      this.activeName = '2'
    }
    if (this.id) {
      this.getPlanDetail(this.id)
      this.getChangeList(this.id)
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
    // 获取详情数据
    getPlanDetail(id) {
      this.detailLoading = true
      getDetailPlan({ planId: id })
        .then((res) => {
          const data = res.data
          this.allData = data
          this.type = data.planType
          this.list = data.materialList
          this.detailLoading = false
        })
        .catch(() => {
          this.detailLoading = false
        })
    },
    getChangeList(id) {
      this.changeLoading = true
      changeList({ planId: id })
        .then((res) => {
          this.changeLoading = false
          this.changeArr = res.data
          if (this.changeArr.length === 0) {
            this.activeName = '1'
          }
        })
        .catch(() => {
          this.changeLoading = false
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
.totalPlanDetails {
  .totalPlanTop {
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
