<template>
  <div class="concreteBasicInformation">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <div class="card-content">
        <el-row>
          <el-col :span="8">方量计算式: {{ dataAll.volumeCalWay }}</el-col>
        </el-row>
        <el-table
          :data="list"
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
          <el-table-column prop="markNum" label="标号(工料机描述)" width="250" />
          <el-table-column prop="unit" label="单位">
            <template slot-scope="{ row }">{{ row.unit }}</template>
          </el-table-column>
          <el-table-column prop="planVolume" label="计划方量" />
          <el-table-column prop="collapseDegree" label="塌落度" />
          <el-table-column prop="usePosition" label="浇筑部位" />
          <el-table-column prop="useTime" label="浇筑时间" />
          <el-table-column prop="unloadingWay" label="卸料方式" />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ConcreteBasicInformation',
  props: {
    dataAll: {
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
  }
}
</script>

<style lang="scss" scoped>
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
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
.concreteBasicInformation {
  width: 100%;
  .box-card {
    .card-content {
      padding: 24px;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.85);
    }
  }
}
</style>
