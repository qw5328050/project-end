<template>
  <div class="approvalRecords">
    <el-card class="box-card" shadow="never">
      <div class="card-content">
        <el-table
          :data="list"
          :header-cell-style="{ background: '#FAFAFA' }"
          border
          stripe
          style="width: 100%"
        >
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="assigneeName" label="审批人" width="200" />
          <el-table-column prop="type" label="审批结果" width="200">
            <template slot-scope="{ row }">
              {{ getDictionaryLabel(row.type, 'approvalResults') }}
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="审批时间" width="300" />
          <el-table-column prop="comment" label="审批意见" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ApprovalRecords',
  data() {
    return {
      list:[]
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
