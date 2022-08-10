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
      <el-table-column prop="usePosition" label="使用部位" />
      <el-table-column prop="materialName" label="物资名称" />
      <el-table-column prop="meteringUnits" align="center" label="计量单位" />
      <el-table-column prop="specification" label="规格型号(工料机描述)" />
      <el-table-column prop="remarks" align="center" label="工料机补充描述" />
      <el-table-column
        v-if="!isChange"
        prop="totalQuantity"
        align="center"
        label="数量"
      >
        <template slot-scope="{ row }">
          {{ row.totalQuantity.toLocaleString('en-US') }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="isChange"
        prop="totalQuantity"
        align="center"
        label="变更前"
      >
        <template slot-scope="{ row }">
          {{ row.totalQuantity.toLocaleString('en-US') }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="isChange"
        prop="totalQuantityAfter"
        align="center"
        label="变更后"
      >
        <template slot-scope="{ row }">
          <span style="color: red">{{
            row.totalQuantityAfter.toLocaleString('en-US')
          }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    isChange: {
      type: Boolean,
      require: false,
      default: false
    }
  }
}
</script>

<style></style>
