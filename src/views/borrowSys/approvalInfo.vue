<template>
  <div class="approval-info">
    <el-card class="pm">
      <div slot="header" class="clearfix">
        <span style="font-weight: bold;">审批信息</span>
      </div>
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          color="#1791FF"
        >
          {{ activity.assigneeName }}
          <span class="approval-time">{{ activity.createTime }}</span>
          <div class="time-details">
            <div class="title">{{ activity.comment }}</div>
            <div class="content">{{ activity.activityName }}</div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-card>
  </div>
</template>
<script>
import { flowRecord } from '@/api/borrowSys/prucReportStop'
export default {
  name: '',
  components: {
  },
  data() {
    return {
      reverse: true,
      activities: [{
        content: '活动按期开始',
        timestamp: '2018-04-15'
      }, {
        content: '通过审核',
        timestamp: '2018-04-13'
      }, {
        content: '创建成功',
        timestamp: '2018-04-11'
      }]
    }
  },
  mounted() {
  },
  created() {
    this.flowRecord()
  },
  methods: {
    async flowRecord() {
      console.log(this.$route.query.processInstanceId)
      const res = await flowRecord({ processInstanceId: this.$route.query.processInstanceId })
      if (res && res.status === 200) {
        this.activities = res.data
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.approval-info{
    ::v-deep .el-timeline-item__tail {
        border-color: #1791FF;
    }
    .approval-time {
        color: rgba(0,0,0,0.4);
        padding-left: 16px;
    }
    .time-details {
        width: 630px;
        min-height: 40px;
        background: #F4F6FA;
        font-size: 14px;
        color: #0AC76F;
        line-height: 22px;
        padding: 10px 24px;
        margin-top: 8px;
        .title {
            color: #0AC76F;
        }
        .content{
            color: #5a5a5a;
        }
    }
}
</style>
