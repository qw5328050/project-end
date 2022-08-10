<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="物资盘点计划" name="Plan" />
          <el-tab-pane label="物资盘点记录" name="Record" />
          <el-tab-pane label="物资盘点分析" name="Analysis" />
        </el-tabs>
      </div>
    </div>
    <component :is="activeName" />
  </div>
</template>
<script>
import Plan from "../plan";
import Record from "../record";
import Analysis from "../analysis";
export default {
  name: "",
  components: {
    Plan,
    Record,
    Analysis,
  },
  data() {
    return {
      activeName: "Plan",
    };
  },
  created() {},
  methods: {
    // tab切换
    handleClick(tab) {
      // this.tabName = tab.name
    },
  },
  beforeRouteLeave(to, from, next) {
    if (to.name.includes("物资盘点")) {
      sessionStorage.setItem("wzActiveName", this.activeName);
    }
    next();
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name.includes("物资盘点") && sessionStorage.getItem("wzActiveName")) {
        vm.activeName = sessionStorage.getItem("wzActiveName")
        sessionStorage.removeItem("wzActiveName");
      }
    });
  },
};
</script>

<style lang="scss" scoped>
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
}
.totalPlan-container {
  .totalPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
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
  .search-content {
    background: #ffffff;
    margin: 16px;
    padding-top: 20px;
    box-sizing: border-box;
    height: 80px;
    overflow: hidden;
    .search-btn {
      padding-right: 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: end;
    }
  }
  .show-height {
    height: auto;
  }
  .table-box {
    height: 550px;
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    .table-content {
      width: 100%;
      height: 100%;
      padding: 16px 24px 0 24px;
      box-sizing: border-box;
      background: #fff;
      position: relative;
      .table-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .table-title {
          font-size: 16px;
          font-weight: 400;
          color: #000000;
        }
      }
      .pagination {
        width: 97%;
        height: 64px;
        display: flex;
        position: absolute;
        bottom: 0;
        align-items: center;
        justify-content: space-between;
        .pageNumberRecord {
          font-size: 14px;
          font-weight: 400;
          color: rgba(0, 0, 0, 0.6);
        }
      }
    }
  }
}
</style>
