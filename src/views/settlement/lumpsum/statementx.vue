<template>
  <div class="totalPlan-container">
    <!-- 总结算搜索 -->
    <div class="search-content" :class="{ 'show-height': anSearch }">
      <el-form ref="queryForm" :model="queryParams" label-width="120px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="结算类型:">
                  <el-select
                    v-model="queryParams.type"
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictionaryValue('type')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="供应商名称:">
                  <el-input
                    v-model="queryParams.supplierName"
                    placeholder="请输入"
                    clearable
                    @focus="addSupplierName"
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="合同编号:">
                  <el-input
                    v-model="queryParams.contractNo"
                    placeholder="请输入"
                    clearable
                    @focus="addContractNo"
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="结算单状态:">
                  <el-select
                    v-model="queryParams.orderStatus"
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictionaryValue('orderStatus')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
            <div class="search-btn">
              <el-button @click="handerReset">重置</el-button>
              <el-button type="primary" @click="handleQuery">查询</el-button>
              <el-button
                v-if="!anSearch"
                type="text"
                @click="changeAnSearch"
              >展开<i
                class="el-icon-arrow-down"
              /></el-button>
              <el-button
                v-else
                type="text"
                @click="changeAnSearch"
              >收回<i
                class="el-icon-arrow-up"
              /></el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-box">
      <div class="table-content">
        <div class="table-header">
          <div class="table-title">总结算单</div>
          <!-- 总结算单 -->
          <div class="table-col">
            <el-button
              v-hasPermi="[
                'qy:menu:bs:material:settlement_manage:master:list:export'
              ]"
              class="buttonRight"
              @click="exportData"
            >
              导出
            </el-button>
            <right-toolbar
              :columns="columns"
              @queryTable="listTotalOrderPage"
              @resetColumns="resetColumns"
              @changeSize="changeSize"
            />
          </div>
        </div>
        <!-- 总结算列表 -->
        <el-table
          key="总结算"
          v-loading="loading"
          :data="listTotal"
          element-loading-text="Loading"
          :size="size"
          border
          :header-row-class-name="() => 'headerClass'"
          style="margin-top: 26px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column align="center" label="序号" fixed="left">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[1].visible"
            key="1"
            label="结算类型"
            prop="type"
            width="200"
          >
            <template slot-scope="{ row }">
              {{ getDictionaryLabel(row.type, "type") }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[2].visible"
            key="2"
            label="总结算单编号"
            width="200"
            prop="orderNo"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toDetails(row)">{{
                row.orderNo
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[3].visible"
            key="3"
            label="项目名称"
            prop="projectName"
            show-overflow-tooltip
            width="200"
          />
          <el-table-column
            v-if="columns[4].visible"
            key="4"
            label="供应商名称"
            prop="supplierName"
            show-overflow-tooltip
            width="200"
          />
          <el-table-column
            v-if="columns[5].visible"
            key="5"
            label="合同编号"
            prop="contractCode"
            show-overflow-tooltip
            width="200"
          />
          <el-table-column
            v-if="columns[6].visible"
            key="6"
            label="合同总金额(元)"
            prop="contractTotalAmount"
            sortable
            align="right"
            width="150"
          />
          <el-table-column
            v-if="columns[7].visible"
            key="7"
            label="月度已结算金额"
            prop="monthAmtTax"
            sortable
            align="right"
            width="150"
          />
          <el-table-column
            v-if="columns[8].visible"
            key="8"
            label="实际结算金额"
            prop="actualAmount"
            sortable
            align="right"
            width="150"
          />
          <el-table-column
            v-if="columns[9].visible"
            key="9"
            label="创建日期"
            prop="createTime"
            width="200"
          />
          <el-table-column
            v-if="columns[10].visible"
            key="10"
            label="状态"
            prop="orderStatus"
            width="200"
          >
            <template slot-scope="{ row }">
              <div class="planStatus">
                <div class="box" :class="getClass(row)" />
                <span>{{
                  getDictionaryLabel(row.orderStatus, 'orderStatus')
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[11].visible"
            key="11"
            label="打印次数"
            prop="printQuantity"
            width="200"
          />
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.orderStatus == 1"
                v-hasPermi="[
                  'qy:menu:bs:material:settlement_manage:master:list:edit'
                ]"
                size="mini"
                type="text"
                @click="edit(scope.row)"
              >编辑</el-button>
              <el-button
                v-show="scope.row.orderStatus != 1"
                size="mini"
                type="text"
                @click="particulars(scope.row)"
              >详情</el-button>
              <el-button
                v-show="scope.row.orderStatus == 8"
                size="mini"
                type="text"
                @click="changeRecord(scope.row)"
              >变更记录</el-button>
              <el-button
                v-show="
                  scope.row.orderStatus == 4 ||
                    scope.row.orderStatus == 5 ||
                    scope.row.orderStatus == 6
                "
                v-hasPermi="[
                  'qy:menu:bs:material:settlement_manage:master:list:Reopen'
                ]"
                size="mini"
                type="text"
                @click="cancellation(scope.row)"
              >
                作废重开</el-button>
              <el-dropdown
                @command="
                  (data) => {
                    handleCommand(data, scope.row)
                  }
                "
              >
                <span class="el-dropdown-link">
                  <span class="el-dropdown-link popoverIoc"> ··· </span>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-show="scope.row.orderStatus == 1"
                    v-hasPermi="[
                      'qy:menu:bs:material:settlement_manage:master:list:delete'
                    ]"
                    command="delete"
                  >删除</el-dropdown-item>
                  <el-dropdown-item
                    v-show="scope.row.orderStatus == 5"
                    v-hasPermi="[
                      'qy:menu:bs:material:settlement_manage:master:list:upload_invoice'
                    ]"
                    command="invoice"
                  >上传发票</el-dropdown-item>
                  <el-dropdown-item
                    v-show="scope.row.orderStatus == 6"
                    v-hasPermi="[
                      'qy:menu:bs:material:settlement_manage:master:list:download_invoice'
                    ]"
                    command="downloadInvoice"
                  >下载发票</el-dropdown-item>
                  <el-dropdown-item
                    v-show="scope.row.orderStatus == 4"
                    v-hasPermi="[
                      'qy:menu:bs:material:settlement_manage:master:list:signature'
                    ]"
                    command="stamp"
                  >签章</el-dropdown-item>
                  <el-dropdown-item
                    v-show="
                      scope.row.orderStatus == 5 || scope.row.orderStatus == 6
                    "
                    v-hasPermi="[
                      'qy:menu:bs:material:settlement_manage:master:list:download_signature'
                    ]"
                    command="Signature"
                  >下载签章文件</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!-- 总结算分页 -->
        <div v-if="total > 0" class="pagination">
          <div class="pageNumberRecord">
            共{{ total }}条记录 第{{ queryParams.page }}/{{
              Math.ceil(total / queryParams.rows)
            }}页
          </div>
          <Pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[10, 20, 50, 100, 200, 500]"
            :total="total"
            :page.sync="queryParams.page"
            :limit.sync="queryParams.rows"
            @pagination="listTotalOrderPage"
          />
        </div>
      </div>
    </div>
    <!-- 作废 -->
    <Cancellations
      :visible.sync="isShow_Cancellation"
      :title="title"
      :total-no="totalNo"
      :total-order-id="totalOrderId"
      @submitForm="submitForm"
    />
    <!-- 开发票 -->
    <Development
      :id="orderNo"
      :contract-code="contractCode"
      :visible.sync="isShow_Development"
      :title="title"
      @submitForm="submitForm"
    />
    <!-- 选择供应商 -->
    <IndexDialog :visible.sync="IndexDialogs" @submitForm="submitForm" />
    <!-- 选择项目 -->
    <ContractDialog
      :id="ContractId"
      :visible.sync="ContractNo"
      @contract="contractS"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import IndexDialog from '@/components/SupplierDialog/index'
import ContractDialog from '@/components/ContractDialog/index'
import Cancellations from './CancellationInvoice.vue'
import Development from './DevelopmentInvoice.vue'
import {
  listTotalOrderPage,
  exportOrder,
  downloadInvoice,
  deleteOrder,
  listProjectByContractId,
  downLoadElecSignature,
  stamp
} from '@/api/lumpsum/test'
export default {
  name: '',
  components: {
    Cancellations,
    IndexDialog,
    ContractDialog,
    Development
  },
  data() {
    return {
      orderNo: '', // 订单编号
      listProject: [], // 项目列表
      ContractId: 0, // 选择的供应商id
      butShow: false, // 禁用
      size: 'medium', // 密度
      IndexDialogs: false, // 供应商弹窗
      ContractNo: false, // 项目弹窗
      columns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `结算类型`, visible: true },
        { key: 2, label: `结算单编号`, visible: true },
        { key: 3, label: `项目名称`, visible: true },
        { key: 4, label: `供应商名称`, visible: true },
        { key: 5, label: `合同编号`, visible: true },
        { key: 6, label: `合同总金额（元）`, visible: true },
        { key: 7, label: `月度已结算金额`, visible: true },
        { key: 8, label: `实际结算金额`, visible: true },
        { key: 9, label: `创建日期`, visible: true },
        { key: 10, label: `状态`, visible: true },
        { key: 11, label: `打印次数`, visible: true },
        { key: 12, label: `操作`, visible: true }
      ], // 显隐列
      oldColumns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `结算类型`, visible: true },
        { key: 2, label: `结算单编号`, visible: true },
        { key: 3, label: `项目名称`, visible: true },
        { key: 4, label: `供应商名称`, visible: true },
        { key: 5, label: `合同编号`, visible: true },
        { key: 6, label: `合同总金额（元）`, visible: true },
        { key: 7, label: `月度已结算金额`, visible: true },
        { key: 8, label: `实际结算金额`, visible: true },
        { key: 9, label: `创建日期`, visible: true },
        { key: 10, label: `状态`, visible: true },
        { key: 11, label: `打印次数`, visible: true },
        { key: 12, label: `操作`, visible: true }
      ], // 显隐列
      isShow_Development: false, // 发票信息弹窗
      isShow_Cancellation: false, // 作废弹窗
      totalNo: '', // 结算单单号
      title: '', // 标题
      projectName: '深圳宝安区鸿昌花园幼儿园项目', // 项目名称
      queryParams: {
        // 查询参数
        contractNo: '',
        supplierName: '',
        page: 1,
        rows: 10
      }, // 总结算-待结算验收列表
      listTotal: [], // 总结算列表
      loading: false, // 表格加载
      anSearch: false, // 是否展开搜索
      total: '',
      ids: [],
      contractCode: '',
      contract: [], // 选择的月度结算的id
      contractAll: [], // 多选框
      totalOrderId: 0 // 选择月份的id
    }
  },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  mounted() {},
  created() {
    this.listTotalOrderPage()
  },
  methods: {
    // 多选
    handleSelectionChange(data) {
      this.ids = data.map((item) => {
        return item.totalOrderId
      })
    },
    // 选择供应商弹窗
    addSupplierName() {
      this.IndexDialogs = true
    },
    addContractNo() {
      if (this.queryParams.supplierName) {
        this.ContractNo = true
      } else {
        this.$message('请先选择供应商')
      }
    },
    // 返回颜色
    getClass(row) {
      switch (row.orderStatus) {
        case 1:
          return 'draft'
        case 7:
          return 'approval'
        case 3:
          return 'normal'
        case 4:
          return 'rejected'
        case 2:
          return 'rejected'
        case 5:
          return 'rejected'
        case 6:
          return 'rejected'
        case 8:
          return 'draft'
      }
    },
    // 总结算列表
    listTotalOrderPage() {
      this.loading = true
      listTotalOrderPage({
        ...this.queryParams,
        ...this.projectInformation
      }).then((res) => {
        if (res.status === 200) {
          this.listTotal = res.data.list
          this.loading = false
          this.total = res.data.total
        }
      })
    },
    changeRecord(row) {
      this.$router.push({
        path: '/settlement/generalStatement',
        query: { activeName: '3', id: row.totalOrderId }
      })
    },
    // 下拉
    handleCommand(command, row) {
      if (command === 'delete') {
        // 删除
        this.deleteDate(row)
      }
      if (command === 'cancellation') {
        this.title = '作废'
        this.isShow_Cancellation = true
        this.totalOrderId = row.totalOrderId
        this.totalNo = row.orderNo
      }
      if (command === 'invoice') {
        this.title = '开发票'
        this.isShow_Development = true
        this.orderNo = row.orderNo
        this.contractCode = row.contractCode
      }
      if (command === 'downloadInvoice') {
        // 下载发票信息
        this.downloadInvoiceDate(row)
      }
      if (command === 'Signature') {
        // 下载电子签章
        this.Signature(row)
      }
      if (command === 'stamp') {
        // 电子签章
        this.stamp(row)
      }
    },
    // 电子签章
    stamp(row) {
      var that = this
      var from = {}
      from.settlementOrderId = row.totalOrderId
      from.supplierName = row.supplierName
      from.type = 2
      from.source = 2
      that
        .$confirm('是否确认电子签章?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          return stamp(from)
        })
        .then((res) => {
          that.$message(res.msg)
          window.location.href = res.data
        })
    },
    // 下载电子签章
    Signature(row) {
      var that = this
      var from = {}
      console.log(row)
      from.orderId = row.totalOrderId
      from.type = 2
      that
        .$confirm('是否确认下载电子签章?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          return downLoadElecSignature({ ...from })
        })
        .then((res) => {
          that.$message('操作成功')
        })
    },
    // 下载发票信息
    downloadInvoiceDate(row) {
      var that = this
      that
        .$confirm('是否确认下载发票信息?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          return downloadInvoice(row.orderNo)
        })
        .then((res) => {
          that.$message('操作成功')
        })
    },
    // 作废
    cancellation(row) {
      this.title = '作废'
      this.isShow_Cancellation = true
      this.totalOrderId = row.totalOrderId
      this.totalNo = row.orderNo
    },
    // 删除的数据
    deleteDate(row) {
      // 未锁定状态的结算单删除
      var that = this
      const params = new URLSearchParams()
      params.append('orderId', row.totalOrderId)
      params.append('orderStatus', row.orderStatus)
      that
        .$confirm('是否删除结算单?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          return deleteOrder(params)
        })
        .then(() => {
          that.listTotalOrderPage()
          that.$message('删除成功')
        })
    },
    // 编辑
    edit(row) {
      this.$router.push({
        path: '/settlement/generalStatementEdit',
        query: { id: row.totalOrderId }
      })
    },
    // 详情
    toDetails(row) {
      if (row.orderStatus === 1) {
        this.$router.push({
          path: '/settlement/generalStatementEdit',
          query: { id: row.totalOrderId }
        })
      } else {
        this.$router.push({
          path: '/settlement/generalStatement',
          query: { id: row.totalOrderId }
        })
      }
    },
    // 详情
    particulars(row) {
      this.$router.push({
        path: '/settlement/generalStatement',
        query: { id: row.totalOrderId }
      })
    },
    // 刷新
    resetColumns() {
      this.columns = JSON.parse(JSON.stringify(this.oldColumns))
    },
    // 更改表格密度
    changeSize(type) {
      this.size = type
    },
    // 供应商回显
    submitForm(data) {
      this.queryParams.supplierName = data.supplierName
      this.ContractId = data.id
    },
    // 合同回显
    contractS(data) {
      this.queryParams.contractNo = data.contractCode
      this.listProjectByContractId(data.contractId)
    },
    //  根据合同id查询项目编号项目名称
    listProjectByContractId(id) {
      listProjectByContractId(id).then((res) => {
        if (res.status === 200) {
          this.listProject = res.data
        }
      })
    },
    // 更改展开收回
    changeAnSearch() {
      this.anSearch = !this.anSearch
    },
    // 总结算导出
    exportData() {
      exportOrder({ ...this.queryParams, ...this.projectInformation, totalOrderIds: this.ids }).then(
        (res) => {}
      )
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
      this.listTotalOrderPage()
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
    height: 130px;
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
    height: 70px;
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
        // position: absolute;
        // bottom: 0;
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
.planStatus {
  display: flex;
  align-items: center;
  .box {
    width: 7px;
    height: 7px;
    box-sizing: border-box;
    border-radius: 50%;
    margin-right: 8px;
  }
  .draft {
    background: #bfbfbf;
  }
  .approval {
    background: #1791ff;
  }
  .normal {
    background: #00cc33;
  }
  .rejected {
    background: #faad14;
  }
}
</style>
