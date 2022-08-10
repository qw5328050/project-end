<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-if="
              getvIfDomHasPermi(
                [
                  'qy:menu:bs:material:settlement_manage:master:pending_list:query',
                  'isAll'
                ],
                'first'
              )
            "
            label="待总结算单"
            name="first"
          />
          <el-tab-pane
            v-if="
              getvIfDomHasPermi(
                [
                  'qy:menu:bs:material:settlement_manage:master:list:query',
                  'isAll'
                ],
                'second'
              )
            "
            label="总结算列表"
            name="second"
          />
        </el-tabs>
      </div>
    </div>
    <!-- 待总结算单 -->
    <stayStatement v-if="table" />
    <!-- 总结算列表 -->
    <Statement v-if="!table" />
  </div>
</template>
<script>
import Statement from './statementx.vue'
import stayStatement from './stayStatement.vue'
import { vIfDomHasPermi } from '@/utils'
export default {
  name: '',
  components: {
    stayStatement,
    Statement
  },
  data() {
    return {
      table: true, // 显示tab切换
      headerTitle: '', // 头部标题
      title: '', // 标题
      activeName: 'first'
    }
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '总结算管理'
    this.activeName = this.$route.query.activeName
      ? this.$route.query.activeName
      : 'first'
    if (this.activeName === 'second') {
      this.table = false
      this.activeName = 'second'
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
    handleClick(tab) {
      if (tab.name === 'first') {
        this.table = true
        this.activeName = 'first'
      } else {
        this.table = false
        this.activeName = 'second'
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
}
</style>
