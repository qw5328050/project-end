<template>
  <div class="basicInformation">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="card-content">
        <el-row>
          <el-col
            :span="8"
          >项目编号: {{ tableForm.projectCode || '-' }}</el-col>
          <el-col
            :span="8"
          >项目名称: {{ tableForm.projectName || '-' }}</el-col>
          <el-col :span="8" />
        </el-row>
        <el-row>
          <el-col
            :span="8"
          >月度计划编号: {{ tableForm.monthPlanCode || '-' }}</el-col>
          <el-col :span="8">月度计划名称: {{ tableForm.monthPlanName }}</el-col>
          <el-col
            :span="8"
          >月度计划时间: {{ tableForm.planYear }}-{{
            tableForm.planMonth
          }}</el-col>
        </el-row>
        <el-row>
          <el-col
            :span="8"
          >提交人: {{ tableForm.createUserName || '-' }}</el-col>
          <el-col :span="8">提交时间: {{ tableForm.createTime || '-' }}</el-col>
        </el-row>
        <el-table
          :data="tableForm.planMaterials"
          max-height="590"
          :header-row-class-name="() => 'headerClass'"
          style="width: 100%; margin-top: 14px"
        >
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="materialName" label="物资名称" />
          <el-table-column prop="specification" label="规格型号(工料机描述)" />
          <el-table-column prop="unit" label="计量单位" />
          <el-table-column prop="estimateNum" label="预算数量">
            <template slot-scope="{ row }">
              {{ row.estimateNum.toLocaleString('en-US') }}
            </template>
          </el-table-column>
          <el-table-column prop="planProgress" label="计划施工进度/使用部位" />
          <el-table-column prop="estimateInTime" label="预估初次进场时间" />
          <el-table-column prop="remark" label="备注" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BasicInformation',
  props: {
    tableForm: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  data() {
    return {
      list: []
    }
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
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
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
