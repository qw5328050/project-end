<template>
  <el-dialog
    title="审批进度"
    :visible.sync="visible"
    width="30%"
    :before-close="handleClose"
  >
    <div
      v-if="activities.length > 0"
      v-loading="loading"
      style="padding-right: 20px"
    >
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :class="{ line: activity.status <= 1, hollow: activity.status === 2 }"
        >
          <div class="content">
            <div class="top">
              <div class="name">
                <div class="nodeName">{{ activity.nodeName }}</div>
                <div class="userName">{{ activity.userName }}</div>
              </div>
              <div class="time">{{ activity.createTime }}</div>
            </div>
            <div class="bottom">
              <div class="normal" :class="{ successful: activity.status <= 1 }">
                {{ activity.comment || '审批中' }}
              </div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div v-else v-loading="loading">暂无审批进度</div>
  </el-dialog>
</template>

<script>
import { approvalProgress } from '@/api/plan/mad'
export default {
  props: {
    visible: {
      type: Boolean,
      require: true,
      default: false
    },
    processdata: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      activities: [],
      loading: false
    }
  },
  watch: {
    processdata: {
      handler() {
        if (
          this.processdata.processInstanceId &&
          this.processdata.processDefinitionId
        ) {
          this.getProgressList()
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getProgressList() {
      this.loading = true
      approvalProgress({ ...this.processdata })
        .then((res) => {
          this.activities = res.data
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleClose() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog__header {
  border-bottom: 1px solid #f0f0f0;
}
::v-deep .line {
  .el-timeline-item__tail {
    border-left: 1px solid #1791ff !important;
  }
  .el-timeline-item__node {
    background: #1791ff;
  }
}
::v-deep .hollow {
  .el-timeline-item__node {
    border: 1px solid #1791ff !important;
    background: #fff;
  }
}
::v-deep .el-timeline-item {
  .el-timeline-item__node {
    width: 10px;
    height: 10px;
  }
  .el-timeline-item__tail {
    position: absolute;
    left: 4px;
    top: 15%;
    height: 75%;
    border-left: 1px solid #f0f0f0;
  }
}
.content {
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .name {
      display: flex;
      align-items: center;
      .userName {
        margin-left: 16px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.9);
      }
      .nodeName {
        font-size: 14px;
        font-weight: 400;
        color: #1791ff;
      }
    }

    .time {
      margin-left: 16px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
    }
  }
  .bottom {
    height: 40px;
    background: #f4f6fa;
    margin: 10px 0;
    line-height: 40px;
    padding-left: 24px;
    box-sizing: border-box;
    .successful {
      color: #0ac76f !important;
    }
    .normal {
      font-size: 14px;
      font-weight: 400;
      color: #595959;
    }
  }
}
</style>
