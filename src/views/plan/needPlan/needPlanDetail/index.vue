<template>
  <div class="needPlanDetails">
    <div class="needPlanTop">
      <div class="project">需用计划编号: {{ needPlanCode }}</div>
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="1" />
          <el-tab-pane v-if="processInstanceId" label="审批记录" name="2" />
        </el-tabs>
      </div>
    </div>
    <div class="box_content">
      <div v-if="activeName === '1'">
        <ConcreteBasicInformation
          v-if="monthPlanType === 3"
          v-loading="loading"
          :data-all="dataAll"
          :list="list"
        />
        <BasicInformation v-else v-loading="loading" :data-all="dataAll" :list="list" />
      </div>
      <ApprovalRecords
        v-if="activeName === '2' && processInstanceId"
        v-loading="approvalRecordsLoading"
        :list="approvalRecordsList"
      />
    </div>
  </div>
</template>

<script>
import { flowRecordList } from '@/api/plan/mad'
import { selectById } from '@/api/plan/needPlan'
import BasicInformation from './basicInformation.vue'
import ApprovalRecords from './approvalRecords.vue'
import ConcreteBasicInformation from './concreteBasicInformation.vue'
export default {
  name: 'NeedPlanDetails',
  components: { BasicInformation, ConcreteBasicInformation, ApprovalRecords },
  data() {
    return {
      headerTitle: '',
      processInstanceId: null,
      approvalRecordsLoading: false,
      approvalRecordsList: [],
      activeName: '1',
      monthPlanType: null,
      needPlanCode: null,
      id: null,
      list: [],
      dataAll: {},
      loading: false
    }
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '总计划详情'
    const query = this.$route.query
    this.id = query.id
    this.processInstanceId = this.$route.query
      ? this.$route.query.processInstanceId
      : ''
    if (this.id) {
      this.getDetail()
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
    getDetail() {
      this.loading = true
      selectById({ id: this.id }).then((res) => {
        const data = res.data
        this.dataAll = res.data
        this.monthPlanType = data.monthPlanType
        this.needPlanCode = data.needPlanCode
        if (this.monthPlanType === 3) {
          this.list = data.planConcretes
          this.loading = false
        } else {
          this.list = data.planMaterials
          this.loading = false
        }
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
.needPlanDetails {
  .needPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 64px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    .project {
      font-size: 14px;
      font-weight: 400;
      color: #595959;
      padding-bottom: 8px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
    }
  }
  .box_content {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
  }
}
</style>
