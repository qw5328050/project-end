<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <div style="font-weight: 600">发货单编号：{{ form.deliveryNo }}</div>
      <div class="project">
        <div class="name">项目名称：{{ form.projectName }}</div>
        <!-- <div class="switch-svg"><svg-icon icon-class="switch" /></div> -->
      </div>
    </div>
    <div class="app-container">
      <el-card class="box-card" style="box-shadow: none">
        <!-- <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div> -->
        <div class="title" style="font-weight: 600">
          <span>变更信息</span>
        </div>
        <el-table
          :data="form.prucReceiptModifyLogVOList"
          style="width: 100%"
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column prop="itemName" label="物资名称" />
          <el-table-column prop="modifyType" label="变更项" />
          <el-table-column prop="formerDesc" label="变更前" />
          <el-table-column prop="latterDesc" label="变更后" />
          <el-table-column prop="createUserName" label="操作人" />
          <el-table-column prop="createTime" label="操作时间" />
          <el-table-column prop="remark" label="备注" />
        </el-table>
        <div class="title" style="font-weight: 600">
          <span>签字记录表</span>
        </div>
        <el-table
          :data="form.prucReceiptSignVOList"
          style="width: 100%"
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column prop="operatorType" label="人员类型" />
          <el-table-column prop="operator" label="操作人" />
          <el-table-column prop="createTime" label="操作时间" />
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { modifyInfo } from '@/api/contractManagement/material'
export default {
  name: 'CheckAlterationAssets',
  data() {
    return {
      orderNumber: 'FH92973878214',
      projectName: '深圳市宝安区鸿昌花园幼儿园',
      loading: false,
      form: {},
      tableData: [
        { name: '测试', date: '2022-05-19' },
        { name: '测试', date: '2022-05-19' },
        { name: '测试', date: '2022-05-19' },
        { name: '测试', date: '2022-05-19' }
      ]
    }
  },
  created() {
    this.modifyInfo()
  },
  mounted() {},
  methods: {
    // 详情
    modifyInfo() {
      modifyInfo(this.$route.query.id).then((res) => {
        this.form = { ...res.data }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.totalPlan-container {
  .totalPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 75px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    .project {
      font-size: 14px;
      font-weight: 400;
      color: #595959;
      padding: 16px 0;
      display: flex;
      align-items: center;
      .switch-svg {
        margin-left: 8px;
        font-size: 24px;
      }
    }
  }
}
::v-deep .el-card__body {
  padding: 0 20px 20px 20px;
}
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.title {
  margin-top: 24px;
  margin-bottom: 16px;
}
.tableTH {
  text-align: right;
  padding-right: 16px;
  width: 100px;
  height: 45px;
  font-size: 14px;
  font-weight: bold;
  color: #555f73;
  background-color: #f8f8f9;
}
.tableTD {
  text-align: left;
  padding-left: 16px;
  width: 240px;
  color: #606266;
  font-size: 14px;
}
</style>
