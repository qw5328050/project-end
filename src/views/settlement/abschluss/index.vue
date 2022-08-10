<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-if="
              getvIfDomHasPermi(
                [
                  'qy:menu:bs:material:settlement_manage:monthly:pending_list:query',
                  'isAll'
                ],
                'first'
              )
            "
            label="待结算验收单"
            name="first"
          />
          <el-tab-pane
            v-if="
              getvIfDomHasPermi(
                [
                  'qy:menu:bs:material:settlement_manage:monthly:list:query',
                  'isAll'
                ],
                'second'
              )
            "
            label="月度结算列表"
            name="second"
          />
        </el-tabs>
      </div>
    </div>
    <ToMonthly v-if="table" />
    <Monthly v-if="!table" />
  </div>
</template>
<script>
import ToMonthly from './toMonthly.vue'
import Monthly from './monthly.vue'
import { vIfDomHasPermi } from '@/utils'
export default {
  name: '',
  components: {
    ToMonthly,
    Monthly
  },
  data() {
    return {
      table: true, // 显示tab切换
      headerTitle: '', // 头部标题
      projectName: '深圳宝安区鸿昌花园幼儿园项目', // 项目名称
      activeName: 'first'
    }
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '月度结算管理'
    this.activeName = this.$route.query.activeName
      ? this.$route.query.activeName
      : 'first'
    if (this.activeName === 'second') {
      this.table = false
    }
  },
  created() {},
  methods: {
    // 权限
    getvIfDomHasPermi(value, type) {
      if (type === 'first') {
        if (vIfDomHasPermi(value)) {
          this.activeName = 'first'
        } else {
          this.activeName = 'second'
          this.table = false
        }
      }
      return vIfDomHasPermi(value)
    },
    // tab切换
    handleClick(tab, event) {
      if (tab.name === 'first') {
        this.table = true
        this.tableName = '待结算验收单'
      } else {
        this.table = false
        this.tableName = '月度结算列表'
      }
    }
  }
}
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
  .footer {
    width: 100%;
    margin-top: 16px;
    padding-left: 40px;
    padding-right: 24px;
    box-sizing: border-box;
    height: 64px;
    justify-content: space-between;
    background: #ffffff;
    box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
  }
}
.table-col {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.popoverIoc {
  margin-left: 8px;
  font-size: 16px;
  color: #1791ff;
}
.tablePrimary {
  height: 40px;
  background-color: #fff;
  width: 30px;
}
.buttonRight {
  margin-right: 8px;
}

::v-deep .expand .el-table__expand-column .cell {
  display: none;
}
</style>
