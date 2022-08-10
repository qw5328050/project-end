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
      label-width="90px"
    >
      <el-row :gutter="20">
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
                v-for="item in getDictionaryValue('monthlyPlanType')"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="总计划编号:" prop="planCode">
            <el-input
              v-model="queryParams.planCode"
              placeholder="请选择"
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
      key="总计划"
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
      <el-table-column label="类型" prop="planType">
        <template slot-scope="{ row }">
          {{ getDictionaryLabel(row.planType, 'planType') }}
        </template>
      </el-table-column>
      <el-table-column label="编号" prop="planCode">
        <template slot-scope="{ row }">
          {{ row.planCode || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="物资种类数" prop="materialQuantity">
        <template slot-scope="{ row }">
          {{ row.materialQuantity | numValueIsTrue }}
        </template>
      </el-table-column>
      <el-table-column label="提交人员" prop="createUserName">
        <template slot-scope="{ row }">
          {{ row.createUserName || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="提交时间" prop="createTime" />
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
      <el-button type="primary" @click="actionButtons">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'
import { getList } from '@/api/plan/totalPlan'
export default {
  name: 'TotalPlanDialog',
  filters: {
    numValueIsTrue(val) {
      if (val) {
        return val
      } else {
        return 0
      }
    }
  },
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
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      list: [], // 表格数据
      radioValue: '', // 单选
      date: '',
      loading: false,
      labelPosition: 'right',
      total: 0,
      selectData: null,
      queryParams: {
        page: 1,
        rows: 10,
        planType: ''
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
          if (this.id) {
            this.radioValue = this.id
          } else {
            this.radioValue = null
          }
          this.getList()
        }
      },
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
    actionButtons() {
      this.$emit('handlerConfirm', this.selectData)
    },
    // 获取数据
    getList() {
      this.loading = true
      getList({
        ...this.queryParams,
        planStatus: 3,
        ...this.projectInformation
      })
        .then((res) => {
          const data = res.data
          this.list = data.data
          this.total = data.total
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
      // 请求数据列表
    },
    radioChange(row) {
      this.selectData = row
    },
    // 重置
    handerReset() {
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
