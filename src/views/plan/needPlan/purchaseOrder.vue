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
        <el-col :span="6">
          <el-form-item label="订单编号:" prop="orderCode">
            <el-input v-model="queryParams.orderCode" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称:" prop="projectName">
            <el-input v-model="queryParams.projectName" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="供应商名称:" prop="supplierName">
            <el-input v-model="queryParams.supplierName" />
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
      max-height="385"
      highlight-current-row
      style="margin-top: 26px"
    >
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="采购单编号" prop="orderCode" width="200">
        <template slot-scope="{ row }">
          {{ row.orderCode || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="项目名称" prop="projectName" width="200">
        <template slot-scope="{ row }">
          {{ row.projectName || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="供应商" prop="supplierName">
        <template slot-scope="{ row }">
          {{ row.supplierName || 0 }}
        </template>
      </el-table-column>
      <el-table-column label="发货状态" prop="deliveryStatus">
        <template slot-scope="{ row }">
          {{ getDictionaryLabel(row.deliveryStatus, 'deliveryStatus') || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="验收状态" prop="checkStatus">
        <template slot-scope="{ row }">
          <div class="planStatus">
            <div class="box" :class="getClass1(row)" />
            <span>{{
              getDictionaryLabel(row.checkStatus, 'checkStatus')
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="物资种类数" prop="itemNum">
        <template slot-scope="{ row }">
          {{ row.itemNum || '0' }}
        </template>
      </el-table-column>
      <el-table-column label="发货单数量" prop="deliveryNum">
        <template slot-scope="{ row }">
          {{ row.deliveryNum || '0' }}
        </template>
      </el-table-column>
      <el-table-column label="下单人员" prop="issuingUserName">
        <template slot-scope="{ row }">
          {{ row.issuingUserName || '-' }}
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
import { getPurchaseList } from '@/api/plan/mad'
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
      this.queryParams.planId = this.id
      getPurchaseList(this.queryParams)
        .then((res) => {
          const data = res.data
          this.list = data.list
          this.total = data.total
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
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
    getClass1(row) {
      switch (row.purchaseStatus) {
        case 1:
          return 'normal'
        case 2:
          return 'approval'
        case 3:
          return 'draft'
      }
    },
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
    },
    handleClose() {
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
