<template>
  <div>
    <el-table
      :data="list"
      :header-cell-style="{ background: '#FAFAFA' }"
      max-height="590"
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
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style></style>
