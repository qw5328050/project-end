<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="60%"
    append-to-body
    :show-close="true"
    :before-close="handleClose"
  >
    <el-form
      ref="queryForm"
      :label-position="labelPosition"
      :model="queryParams"
      label-width="100px"
    >
      <el-row :gutter="20">
        <el-col :span="9">
          <el-form-item label="月度计划名称:" prop="monthPlanName">
            <el-input
              v-model="queryParams.monthPlanName"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="月度计划编号:" prop="monthPlanCode">
            <el-input
              v-model="queryParams.monthPlanCode"
              placeholder="请输入"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <div class="search-btn">
            <el-button @click="handerReset">重置</el-button>
            <el-button type="primary" @click="handleQuery">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      key="结算"
      v-loading="loading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      max-height="385"
      highlight-current-row
      style="margin-top: 26px"
      @row-click="rowClickTable"
    >
      <el-table-column width="35">
        <template slot-scope="{ row }">
          <el-radio
            v-model="radioValue"
            :label="row.id"
            @change="radioChange(row)"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="月度计划名称" prop="monthPlanName">
        <template slot-scope="{ row }">
          {{ row.monthPlanName || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="monthPlanCode">
        <template slot-scope="{ row }">
          {{ row.monthPlanCode || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="物资种类数" prop="materialQuantity">
        <template slot-scope="{ row }">
          {{ row.materialQuantity || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="提交人员" prop="createUserName">
        <template slot-scope="{ row }">
          {{ row.createUserName || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="提交时间" prop="createTime">
        <template slot-scope="{ row }">
          {{ row.createTime || '-' }}
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-if="total > 0"
      :background="false"
      small
      style="margin-left: 85%; margin-top: 8px"
      layout="prev, pager, next"
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.rows"
      @pagination="getList"
    />
    <div slot="footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="actionButtons">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import { selectMonthPlans } from '@/api/plan/needPlan'
export default {
  name: 'MonthlyPlanDialog',
  props: {
    title: {
      type: String,
      require: true,
      default: ''
    },
    visible: {
      type: Boolean,
      require: true
    },
    planType: {
      type: Number,
      require: true,
      default: 0
    }
  },
  data() {
    return {
      total: 0,
      list: [], // 表格数据
      isIndeterminate: false, // 底部选择的状态
      checkAll: false, // 全选的状态
      radioValue: '', // 单选
      date: '',
      loading: false,
      selectData: null,
      labelPosition: 'right',
      queryParams: {
        page: 1,
        rows: 10
      }
    }
  },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  watch: {
    visible: {
      handler() {
        if (this.visible) {
          this.getList()
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    rowClickTable(row) {
      this.radioValue = row.id
      this.selectData = row
    },
    getList() {
      selectMonthPlans({
        ...this.queryParams,
        ...this.projectInformation,
        planType: this.planType
      }).then((res) => {
        const data = res.data
        this.list = data.data
        this.total = data.total
      })
    },
    actionButtons() {
      if (this.radioValue) {
        this.$emit('handlerConfirm', this.selectData)
      } else {
        this.$message({
          message: '请选择月度计划后,在进行操作!',
          type: 'warning'
        })
      }
    },
    radioChange(data) {
      this.selectData = data
    },
    // 重置
    handerReset() {
      this.queryParams = {
        // 查询参数
        page: 1,
        rows: 10
      }
      this.handleQuery()
    },
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
    },
    handleClose() {
      this.radioValue = ''
      this.queryParams = {
        // 查询参数
        page: 1,
        rows: 10
      }
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style scoped>
.search-btn {
  box-sizing: border-box;
  display: flex;
  justify-content: end;
}
.footer {
  width: 100%;
  margin-top: 16px;
  /* padding-left: 40px; */
  padding-right: 24px;
  box-sizing: border-box;
  height: 64px;
  justify-content: space-between;
  /* background: #ffffff;
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08); */
  display: flex;
  align-items: center;
}
</style>
