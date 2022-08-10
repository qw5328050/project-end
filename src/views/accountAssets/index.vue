<template>
  <div>
    <div class="totalPlanTop">
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="baseInfo" key="baseInfo"/>
          <el-tab-pane label="审批记录" name="approval" key="approval"/>
        </el-tabs>
      </div>
    </div>
    <div class="app-container">
      <baseInfo v-if="activeName == 'baseInfo'" />
      <approval v-if="activeName == 'approval'" />
    </div>
  </div>
</template>

<script>
import baseInfo from './baseInfo.vue'
import approval from './approval.vue'
export default {
  components: {
    baseInfo,
    approval
  },
  data() {
    return {
      activeName: 'baseInfo'
    }
  },
  methods: {
    // tab切换
    handleClick(tab, event) {
      // switch (tab.name) {
      //   case 'todo':
      //     this.tableName = '已办'
      //     break
      //   case 'done':
      //     this.tableName = '待办'
      //     break
      //   case 'submitted':
      //     this.tableName = '我提交的'
      //     break
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.totalPlanTop {
  background: #fff;
  padding-left: 32px;
  box-sizing: border-box;
  width: 100%;
  // height: 110px;
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  // .project {
  //   font-size: 14px;
  //   font-weight: 400;
  //   color: #595959;
  //   padding: 16px 0;
  //   display: flex;
  //   align-items: center;
  //   .switch-svg {
  //     margin-left: 8px;
  //     font-size: 24px;
  //   }
  // }
}
::v-deep .el-tabs__header {
  margin-bottom: 0;
}
</style>
