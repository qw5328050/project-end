<template>
  <div>
    <div class="totalPlanTop">
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="InputBase" />
          <el-tab-pane label="审批记录" name="InputRecord" />
        </el-tabs>
      </div>
    </div>
    <component :is="activeName" />
  </div>
</template>

<script>
import InputBase from './components/InputBase.vue'
import InputRecord from './components/InputRecord.vue'
export default {
  components: {
    InputBase,
    InputRecord
  },
  data() {
    return {
      activeName: 'InputBase'
    }
  },
  methods: {
    // tab切换
    handleClick(tab, event) {
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
