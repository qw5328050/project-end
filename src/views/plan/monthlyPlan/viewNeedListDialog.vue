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
      label-width="80px"
    >
      <el-row :gutter="20">
        <el-col :span="9">
          <el-form-item label="提交人员:" prop="createUserName">
            <el-input v-model="queryParams.createUserName" />
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="类型:" prop="planType">
            <el-select
              v-model="queryParams.planType"
              placeholder="请选择"
              filterable
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="item in getDictionaryValue('needPlanType')"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
      :header-row-class-name="() => 'headerClass'"
      border
      fit
      height="385"
      highlight-current-row
      style="margin-top: 26px"
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="需用计划名称" prop="needPlanName" width="200">
        <template slot-scope="{ row }">
          {{ row.needPlanName || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="需用计划编号" prop="needPlanCode" width="200">
        <template slot-scope="{ row }">
          {{ row.needPlanCode || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="物资种类数" prop="materialQuantity">
        <template slot-scope="{ row }">
          {{ row.materialQuantity || 0 }}
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
      style="
        margin-left: 85%;
        margin-top: 8px;
        display: flex;
        justify-content: end;
      "
      layout="prev, pager, next"
      :total="total"
      :page.sync="queryParams.page"
      :limit.sync="queryParams.rows"
      @pagination="getList"
    />
    <div slot="footer">
      <el-button @click="handleClose">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import { getList } from '@/api/plan/needPlan'
export default {
  name: 'TotalPlanDialog',
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
    id: {
      type: Number,
      require: true,
      default: null
    }
  },
  data() {
    return {
      list: [], // 表格数据
      date: '',
      total: 0,
      loading: false,
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
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    getList() {
      // 请求数据列表
      this.loading = true
      this.queryParams.monthPlanId = this.id
      getList({ ...this.queryParams, ...this.projectInformation })
        .then((res) => {
          const data = res.data
          this.list = data.data
          this.total = data.total
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 重置
    handerReset() {
      this.date = ''
      this.queryParams = {
        // 查询参数
        page: 1,
        rows: 10,
        planType: ''
      }
      this.handleQuery()
    },
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
    },
    handleClose() {
      this.queryParams = {
        // 查询参数
        page: 1,
        rows: 10,
        planType: ''
      }
      this.$emit('update:visible', false)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
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
