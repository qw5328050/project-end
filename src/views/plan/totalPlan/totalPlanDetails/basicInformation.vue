<template>
  <div class="basicInformation">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div v-if="allData" class="card-content">
        <el-row>
          <el-col
            :span="12"
          >项目编号: {{ allData.projectCode || '-' }}</el-col>
          <el-col
            :span="12"
          >项目名称: {{ allData.projectName || '-' }}</el-col>
          <el-col :span="12">总计划编号: {{ allData.planCode || '-' }}</el-col>
          <el-col
            :span="12"
          >总计划类型: {{ getDictionaryLabel(type, 'planType') }}</el-col>
          <el-col :span="12">提交人: {{ allData.createUserName || '-' }}</el-col>
          <el-col :span="12">提交时间: {{ allData.createTime || '-' }}</el-col>
        </el-row>
        <TableComponents
          v-if="type === 1 || type === 4 || type === 3"
          :list="list"
          style="margin-top: 14px"
        />
        <ReinforcedTable
          v-if="type === 2"
          :list="list"
          style="margin-top: 14px"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TableComponents from './tables/ordinaryTable.vue'
import ReinforcedTable from './tables/reinforcedTable.vue'
export default {
  name: 'BasicInformation',
  components: { TableComponents, ReinforcedTable },
  props: {
    type: {
      type: Number,
      require: false,
      default: null
    },
    allData: {
      type: Object,
      require: true,
      default: () => {}
    },
    list: {
      type: Array,
      require: true,
      default: () => []
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['projectInformation'])
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-col {
  margin: 10px 0;
}
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
.basicInformation {
  width: 100%;
  .box-card {
    .card-content {
      padding: 14px 24px 24px 24px;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
