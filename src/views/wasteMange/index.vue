<template>
  <div>
    <div class="totalPlanTop">
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="废旧物资处理列表" name="WasteList" />
          <el-tab-pane label="废旧钢筋处理" name="SteelList" />
          <el-tab-pane label="废旧模板处理" name="TemplateList" />
          <el-tab-pane label="其他" name="OtherList" />
        </el-tabs>
      </div>
    </div>
    <component :is="activeName" />
  </div>
</template>

<script>
import WasteList from './WasteList.vue'
import SteelList from './SteelList.vue'
import TemplateList from './TemplateList.vue'
import OtherList from './OtherList.vue'

export default {
  name:'wasteMange',
  components: {
    WasteList,
    SteelList,
    TemplateList,
    OtherList
  },
  data() {
    return {
      activeName: 'WasteList'
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
