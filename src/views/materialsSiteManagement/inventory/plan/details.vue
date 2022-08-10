<template>
  <div>
    <div class="totalPlanTop">
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="Base" />
          <el-tab-pane label="审批记录" name="Record" />
        </el-tabs>
      </div>
    </div>
    <component :is="activeName" />
  </div>
</template>

<script>
import Base from './components/Base.vue'
import Record from './components/Record.vue'
export default {
  components: {
    Base,
    Record
  },
  data() {
    return {
      activeName: 'Base'
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
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
::v-deep .el-tabs__header {
  margin-bottom: 0;
}
</style>
