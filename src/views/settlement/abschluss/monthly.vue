<template>
  <div class="totalPlan-container">
    <!-- 月度结算搜索 -->
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
                    placeholder="请输入内容"
                    clearable
                    @clear="clearSupplierName"
                    @focus="addSupplierName"
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="合同编号:" prop="type">
                  <el-input
                    v-model="queryParams.contractCode"
                    placeholder="请输入内容"
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
    <!-- 导出打印 -->
    <div class="table-box">
      <div class="table-content">
        <div class="table-header">
          <div class="table-title">月度结算列表</div>
          <div class="table-col">
            <el-button
              v-hasPermi="[
                'qy:menu:bs:material:settlement_manage:monthly:list:export',
                'isAll',
              ]"
              class="buttonRight"
              @click="exportData"
            >
              导出
            </el-button>
            <div class="tablePrimary" />
            <right-toolbar
              :columns="columns"
              @queryTable="getList"
              @resetColumns="resetColumns"
              @changeSize="changeSize"
            />
          </div>
        </div>
        <!-- 月度结算列表 -->
        <el-table
          v-loading="loading"
          :data="list"
          :size="size"
          :header-row-class-name="() => 'headerClass'"
          :row-key="getRowKeys"
          border
          :expand-row-keys="expands"
          :row-class-name="setClassName"
          style="margin-top: 26px"
          @expand-change="expandChange"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column align="center" label="序号" width="50" fixed="left">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[1].visible"
            key="1"
            label="结算类型"
            prop="type"
            show-overflow-tooltip
            width="200"
          ><template slot-scope="{ row }">
            {{ getDictionaryLabel(row.type, "type") }}
          </template>
          </el-table-column>
          <el-table-column v-if="columns[2].visible" type="expand">
            <template slot-scope="{ row }">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="">
                  <div class="expandBox">
                    <div>
                      {{ row.typeA.orderNo }}--{{ row.typeA.monthPayPercent }}%
                    </div>
                    <div>
                      {{ row.typeB.orderNo }}--{{ row.typeB.monthPayPercent }}%
                    </div>
                  </div>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[2].visible"
            key="2"
            label="结算单编号"
            prop="orderNo"
            width="200"
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
            width="200"
            show-overflow-tooltip
            prop="projectName"
          />
          <el-table-column
            v-if="columns[4].visible"
            key="4"
            label="供应商名称"
            width="200"
            show-overflow-tooltip
            prop="supplierName"
          />
          <el-table-column
            v-if="columns[5].visible"
            key="5"
            label="合同编号"
            width="200"
            show-overflow-tooltip
            prop="contractCode"
          />
          <el-table-column
            v-if="columns[6].visible"
            key="6"
            label="含税金额"
            sortable
            width="200"
            prop="settlementAmtTax"
          >
            <template slot-scope="{ row }">
              <span>{{ row.settlementAmtTax.toFixed(4) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[7].visible"
            key="7"
            label="状态"
            show-overflow-tooltip
            width="200"
            prop="orderStatus"
          >
            <template slot-scope="{ row }">
              <div class="planStatus">
                <div class="box" :class="getClass(row)" />
                <span>{{
                  getDictionaryLabel(row.orderStatus, "orderStatus")
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200" fixed="right">
            <template slot-scope="scope">
              <el-button
                v-show="scope.row.orderStatus == 1"
                v-hasPermi="[
                  'qy:menu:bs:material:settlement_manage:monthly:list:edit',
                ]"
                size="mini"
                type="text"
                @click="edit(scope.row)"
              >编辑</el-button>
              <el-button
                v-show="scope.row.orderStatus != 1"
                size="mini"
                type="text"
                @click="toDetails(scope.row)"
              >详情</el-button>
              <el-button
                v-show="
                  scope.row.orderStatus == 4 ||
                    scope.row.orderStatus == 5 ||
                    scope.row.orderStatus == 6
                "
                v-hasPermi="[
                  'qy:menu:bs:material:settlement_manage:monthly:list:reopen',
                ]"
                size="mini"
                type="text"
                @click="cancellation(scope.row)"
              >作废重开</el-button>
              <el-button
                v-show="scope.row.orderStatus == 8"
                size="mini"
                type="text"
                @click="changeRecord(scope.row)"
              >变更记录</el-button>
              <el-dropdown
                @command="
                  (data) => {
                    handleCommand(data, scope.row);
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
                      'qy:menu:bs:material:settlement_manage:monthly:list:delete',
                    ]"
                    command="delete"
                  >删除</el-dropdown-item>
                  <el-dropdown-item
                    v-show="scope.row.orderStatus == 5"
                    v-hasPermi="[
                      'qy:menu:bs:material:settlement_manage:monthly:list:upload_invoice',
                    ]"
                    command="invoice"
                  >上传发票</el-dropdown-item>
                  <el-dropdown-item
                    v-show="scope.row.orderStatus == 6"
                    v-hasPermi="[
                      'qy:menu:bs:material:settlement_manage:monthly:list:download_invoice',
                    ]"
                    command="downloadInvoiceDate"
                  >下载发票</el-dropdown-item>
                  <el-dropdown-item
                    v-show="
                      scope.row.orderStatus == 5 || scope.row.orderStatus == 6
                    "
                    v-hasPermi="[
                      'qy:menu:bs:material:settlement_manage:monthly:list:download_signature',
                    ]"
                    command="Signature"
                  >下载签章文件</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <!-- 月度结算分页 -->
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
            @pagination="listPage"
          />
        </div>
      </div>
    </div>
    <!-- 开发票 -->
    <Development
      :id="orderNo"
      :visible.sync="isShow_Development"
      :title="title"
      @submitForm="submitForm"
    />
    <!-- 作废 -->
    <Cancellations
      :visible.sync="isShow_Cancellation"
      :title="title"
      :total-no="totalNo"
      :total-order-id="totalOrderId"
      @submitForm="submitForm"
    />
    <!-- 选择供应商 -->
    <supplierDialog
      :visible.sync="supplierDialogs"
      @submitForm="supplierDialog"
    />
    <!-- 选择合同 -->
    <ContractDialog
      :id="ContractId"
      :visible.sync="ContractNo"
      @contract="contract"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import supplierDialog from '@/components/SupplierDialog/index'
import ContractDialog from '@/components/ContractDialog/index'
import Development from './DevelopmentInvoice.vue'
import Cancellations from './CancellationInvoice.vue'
import {
  listPage,
  deleteList,
  getCollapsedAuxiliaryOrder,
  exportSearchData
} from '@/api/settlement/test'
import { downloadInvoice, downLoadElecSignature } from '@/api/lumpsum/test'
export default {
  name: '',
  components: {
    Development,
    Cancellations,
    supplierDialog,
    ContractDialog
  },
  data() {
    return {
      supplierDialogs: false, // 供应商弹窗
      ContractNo: false, // 合同弹窗
      ContractId: 0, // 关联的供应商id
      expands: [], // 下拉展开的
      getRowKeys(row) {
        return row.id
      },
      ids: [], // 选择的id数据
      size: 'medium', // 表格的密度
      title: '', // 标题
      isShow: false, // 结算弹窗
      isShow_Development: false, // 开发票弹窗
      isShow_Cancellation: false, // 作废弹窗
      columns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `结算类型`, visible: true },
        { key: 2, label: `结算单编号`, visible: true },
        { key: 3, label: `项目名称`, visible: true },
        { key: 4, label: `供应商名称`, visible: true },
        { key: 5, label: `合同编号`, visible: true },
        { key: 6, label: `含税金额`, visible: true },
        { key: 7, label: `状态`, visible: true },
        { key: 8, label: `操作`, visible: true }
      ], // 显隐列
      oldColumns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `结算类型`, visible: true },
        { key: 2, label: `结算单编号`, visible: true },
        { key: 3, label: `项目名称`, visible: true },
        { key: 4, label: `供应商名称`, visible: true },
        { key: 5, label: `合同编号`, visible: true },
        { key: 6, label: `含税金额`, visible: true },
        { key: 7, label: `状态`, visible: true },
        { key: 8, label: `操作`, visible: true }
      ], // 显隐列
      table: true, // 显示tab切换
      headerTitle: '', // 头部标题
      projectName: '深圳宝安区鸿昌花园幼儿园项目', // 项目名称
      checkAll: false, // 全选的状态
      queryParams: {
        // 查询已锁定的待结算收料单查询参数
        supplierName: '',
        contractCode: '',
        orderStatus: '',
        page: 1,
        rows: 10,
        type: ''
      },
      total: 0, // 返回的条数
      list: [], // 月度结算单列表
      loading: false, // 表格加载
      anSearch: false, // 是否展开搜索
      orderNo: '', // 订单编号
      totalNo: '', // 结算单单号
      totalOrderId: 0 // 订单id
    }
  },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  mounted() {},
  created() {
    this.listPage()
  },
  methods: {
    clearSupplierName() {
      this.queryParams.contractCode = ''
    },
    // 选择供应商弹窗
    addSupplierName() {
      this.supplierDialogs = true
    },
    // 供应商弹窗回显
    supplierDialog(data) {
      this.queryParams.supplierName = data.supplierName
      this.ContractId = data.id
    },
    addContractNo() {
      if (this.queryParams.supplierName) {
        this.ContractNo = true
      } else {
        this.$message('请先选择供应商')
      }
    },
    // 合同回显
    contract(data) {
      this.queryParams.contractCode = data.contractCode
    },
    // 下拉
    expandChange(row, expandRows) {
      if (expandRows.length) {
        this.expands = []
        if (row) {
          this.getCollapsedAuxiliaryOrder(row)
          this.expands.push(row.id)
        }
      } else {
        this.expands = []
      }
    },
    // 获取折叠的月度结算单副单
    getCollapsedAuxiliaryOrder(row) {
      getCollapsedAuxiliaryOrder(row.id).then((res) => {
        if (res.status === 200) {
          var typeA = res.data[0]
          var typeB = res.data[1]
          row.typeA = typeA
          row.typeB = typeB
          var index = this.list.findIndex((value, index, arr) => {
            return value.id === row.id
          })
          this.$set(this.list, index, row)
        }
      })
    },
    // 月度结算单列表
    listPage() {
      this.loading = true
      listPage({ ...this.queryParams, ...this.projectInformation }).then(
        (res) => {
          if (res.status === 200) {
            this.loading = false
            if (res.data.list != null) {
              this.list = res.data.list
              this.total = res.data.total
            }
          }
        }
      )
    },
    // 搜索导出月度结算单列表
    exportData() {
      exportSearchData({
        ...this.queryParams,
        ...this.projectInformation
      }).then((res) => {})
    },
    // 下拉
    handleCommand(command, row) {
      if (command === 'delete') {
        // 删除
        this.handleDelete(row)
      }
      if (command === 'invoice') {
        // 上传发票
        this.invoice(row)
      }
      if (command === 'downloadInvoiceDate') {
        // 下载发票
        this.downloadInvoiceDate(row)
      }
      if (command === 'Signature') {
        // 下载电子签章
        this.Signature(row)
      }
    },
    // 下载电子签章
    Signature(row) {
      var that = this
      var from = {}
      from.orderId = row.id
      from.type = 1
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
    // 列表展开
    setClassName({ row, index }) {
      return row.splitFlag === 0 ? 'expand' : ''
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id) // 选择的id
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$confirm('是否确认删除月度结算单?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return deleteList(ids)
        })
        .then(() => {
          this.listPage()
          this.$message('删除成功')
        })
    },
    // 详情
    toDetails(row) {
      if (row.orderStatus === 1) {
        this.$router.push({
          path: '/settlement/finalStatementEdit',
          query: { id: row.id }
        })
      } else {
        this.$router.push({
          path: '/settlement/finalStatement',
          query: { id: row.id }
        })
      }
    },
    // 编辑
    edit(row) {
      this.$router.push({
        path: '/settlement/finalStatementEdit',
        query: { id: row.id }
      })
    },
    // 变更记录
    changeRecord(row) {
      this.$router.push({
        path: '/settlement/finalStatement',
        query: { activeName: '3', id: row.id }
      })
    },
    resetColumns() {
      this.columns = JSON.parse(JSON.stringify(this.oldColumns))
    },
    // 更改表格密度
    changeSize(type) {
      this.size = type
    },
    getList() {
      // 请求数据列表
      this.queryParams.page = 1
      this.listPage()
    },
    submitForm() {},
    // 作废
    cancellation(row) {
      console.log(row)
      this.$router.push({
        path: '/settlement/monthlyCancellation',
        query: {
          id: row.id,
          totalNo: row.orderNo
        }
      })
    },
    invoice(row) {
      this.title = '发票信息'
      this.orderNo = row.orderNo
      this.isShow_Development = true
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
    // 更改展开收回
    changeAnSearch() {
      this.anSearch = !this.anSearch
    },
    // 重置
    handerReset() {
      this.queryParams = {
        page: 1,
        rows: 10
      }
      this.listPage()
    },
    // 查询月度结算列表
    handleQuery() {
      this.queryParams.page = 1
      this.listPage()
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
    height: 110px;
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

::v-deep .expand .el-table__expand-column .cell {
  display: none;
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
.expandBox {
  height: 50px;
  margin-left: 350px;
}
</style>
