<template>
  <div class="approvalRecords">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>审批记录</span>
      </div>
      <div class="card-content">
        <ApprovalTable :list="list" />
      </div>
    </el-card>
  </div>
</template>

<script>
import ApprovalTable from './tables/approvalTable.vue'
export default {
  name: 'ApprovalRecords',
  components: { ApprovalTable },
  props: {
    list: {
      type: Array,
      require: false,
      default: () => []
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-card {
  .el-card__header {
    padding: 18px 24px;
    font-size: 16px;
    font-weight: 500;
    color: #262626;
  }
  .el-card__body {
    padding: 0;
  }
}
.approvalRecords {
  width: 100%;
  .box-card {
    margin-bottom: 16px;
    .card-content {
      padding: 24px;
      box-sizing: border-box;
    }
  }
}
</style>
