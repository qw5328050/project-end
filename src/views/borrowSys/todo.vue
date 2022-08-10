<template>
  <div class="totalPlan-container">
    <div class="search-content">
      <el-form ref="queryForm" :model="queryParams" label-width="90px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="收料单编号:" prop="type">
                  <el-input
                    v-model.trim="queryParams.receiptCode"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="结算方式:" prop="type">
                  <el-select
                    v-model="queryParams.settlementMode"
                    filterable
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictionaryValue('settlementMethod')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="材料工程师:" prop="type">
                  <el-input
                    v-model.trim="queryParams.receiver"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
            <div class="search-btn">
              <el-button @click="handerReset">重置</el-button>
              <el-button type="primary" @click="searchTodo">查询</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-box">
      <div class="table-content">
        <div class="table-header">
          <div class="table-title">{{ tableName }}</div>
          <div class="table-col">
            <el-button @click="exportData">
              <svg-icon icon-class="export" />
              导出</el-button>
            <el-button type="primary" @click="sureBatchExam()">
              <i class="el-icon-edit iconfont" />
              报停</el-button>
          </div>
        </div>
        <el-table
          ref="tableBox"
          v-loading="loading"
          :data="list"
          :header-row-class-name="() => 'headerClass'"
          :size="size"
          border
          stripe
          style="margin-top: 26px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column key="0" type="selection" width="50" align="center" />
          <el-table-column
            key="1"
            align="center"
            label="序号"
            width="50"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            key="2"
            :show-overflow-tooltip="true"
            label="收料单编号"
          >
            <template slot-scope="{ row }">
              <a
                href="javascript:void(0);"
                style="color: #1791ff; cursor: pointer"
                @click="togoOrderDetail(row)"
              >{{ row.receiptCode }}</a>
            </template>
          </el-table-column>
          <el-table-column
            key="3"
            :show-overflow-tooltip="true"
            label="物资名称"
            prop="materialName"
          />
          <el-table-column
            key="4"
            label="计量单位"
            prop="unit"
          />
          <el-table-column
            key="5"
            label="结算方式"
            prop="settlementMode"
          >
            <template slot-scope="{ row }">
              <span>{{getDictionaryLabel(row.settlementMode, 'settlementMethod')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            key="6"
            label="数量"
            prop="originalNum"
          />
          <el-table-column
            key="7"
            :show-overflow-tooltip="true"
            label="供应商名称"
            prop="supplierName"
          />
          <el-table-column
            key="8"
            :show-overflow-tooltip="true"
            label="合同编号"
            prop="contractCode"
          />
          <el-table-column
            key="9"
            label="含税单价（元）"
            prop="containTaxPrice"
          />
          <el-table-column
            key="10"
            label="材料工程师"
            prop="receiver"
          />
          <el-table-column
            key="11"
            :show-overflow-tooltip="true"
            label="收料日期"
            prop="receiveDate"
          />
          <el-table-column
            key="12"
            :show-overflow-tooltip="true"
            label="报停日期"
            prop="reportStopDates"
          />
          <el-table-column
            key="13"
            label="报停单号"
          >
            <template slot-scope="{ row }">
              <span style="color: #1791ff;cursor: pointer" @click="tableDetail(row, 'stop')">
                查看
              </span>
            </template>
          </el-table-column>
          <el-table-column
            key="14"
            label="结算单号"
          >
            <template slot-scope="{ row }">
              <span style="color: #1791ff;cursor: pointer" @click="tableDetail(row, 'settlement')">
                查看
              </span>
            </template>
          </el-table-column>
          <el-table-column
            key="15"
            label="退料单号"
          >
            <template slot-scope="{ row }">
              <span style="color: #1791ff;cursor: pointer" @click="tableDetail(row, 'return')">
                查看
              </span>
            </template>
          </el-table-column>
          <el-table-column
            key="16"
            :show-overflow-tooltip="true"
            label="退料日期"
            prop="returnDates"
          />
          <el-table-column
            key="17"
            label="状态"
            prop="status"
          >
            <template slot-scope="{ row }">
              {{ getDictionaryLabel(row.status, 'leaseStatus') }}
            </template>
          </el-table-column>
          <el-table-column
            key="18"
            class="cup"
            label="操作"
            fixed="right"
            width="100"
          >
            <template slot-scope="{ row }">
              <el-button
                v-if="row.status == 1"
                size="mini"
                type="text"
                class="cup"
                @click="tellStop(row)"
              >报停</el-button>
              <el-button
                v-if="row.status == 1"
                size="mini"
                type="text"
                class="cup"
                @click="returnMater(row)"
              >退料</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <div class="pageNumberRecord">
            共{{ pageTotal }}条记录 第{{ page }}/{{
              pageTotal > 0
                ? Math.ceil(pageTotal / rows)
                : 0
            }}页
          </div>
          <el-pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[10, 20, 50, 100, 200, 500]"
            :current-page="page"
            :page-size="rows"
            :total="pageTotal"
            @size-change="changePageSize"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <el-dialog title="报停" :visible.sync="examOpinion" width="50%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="报停" required>
          <el-input
            v-model="form.examComment"
            type="textarea"
            :rows="5"
            required
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="examRefuse()">驳回</el-button>
        <el-button type="primary" @click="batchExam()">同意</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="tableTitle" :visible.sync="showTable" width="665px">
      <el-table v-if="tableType == 'stop'" :data="tableData" border stripe>
        <el-table-column key="1" align="center" label="序号" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="报停单号" prop="reportStopCode" align="center" />
        <el-table-column label="报停日期" prop="reportStopStartDate" align="center" />
        <el-table-column label="报停金额" prop="reportStopTotalPrice" align="center" />
        <el-table-column label="审批状态" prop="approvalStatus" align="center">
          <template slot-scope="scope">
            <span>{{
              getDictionaryLabel(scope.row.approvalStatus, 'approval_status')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="确认状态" prop="confirmStatus" align="center">
          <template slot-scope="scope">
            <span>{{
              getDictionaryLabel(scope.row.confirmStatus, 'confirm_status')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-show="scope.row.approvalStatus !==3 && scope.row.approvalStatus !==2" type="text" @click="toEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="todetails(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="tableType == 'return'" :data="tableData" border stripe>
        <el-table-column key="1" align="center" label="序号" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="退料单号" prop="returnCode" align="center" />
        <el-table-column label="退料日期" prop="returnDate" align="center" />
        <el-table-column label="退料金额" prop="returnTotalPrice" align="center" />
        <el-table-column label="确认状态" prop="confirmStatus" align="center">
          <template slot-scope="scope">
            <span>{{
              getDictionaryLabel(scope.row.confirmStatus, 'confirm_status')
            }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button v-show="scope.row.submitStatus !==2" type="text" @click="toEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="todetails(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table v-if="tableType == 'settlement'" :data="tableData" border stripe>
        <el-table-column key="1" align="center" label="序号" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="结算单号" prop="orderNo" align="center" />
        <el-table-column label="结算日期" prop="createTime" align="center" />
        <el-table-column label="结算金额" prop="settlementAmtTax" align="center" />
        <el-table-column label="结算详情" prop="materialName" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="todetails(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import { leaseList, prucReportStopList, prucReturnList, exportTalentList, listSettlementOrdersByReceiptCode } from '@/api/borrowSys/prucReportStop'
export default {
  name: 'Todo',
  data() {
    return {
      ids: [],
      form: { examComment: '' } /** 审批意见 */,
      pageTotal: 0, // 总条数
      rows: 10,
      page: 1,
      showTable: false,
      examOpinion: false,
      tableTitle: '',
      tableType: '',
      tableData: [],
      tableTileList: {
        stop: '报停单号',
        settlement: '结算单号',
        return: '退料单号'
      },
      tablePage: {
        pageTotal: 0,
        rows: 10,
        page: 1
      },
      tableName: '租赁物资列表', // table的名字
      size: 'medium', // 表格的密度
      title: '', // 标题
      isIndeterminate: false, // 底部选择的状态
      checkAll: false, // 全选的状态
      queryParams: {
        receiptCode: '',
        settlementMode: '',
        receiver: ''
      },
      list: [], // 表格数据
      loading: false, // 表格加载
      options: []
    }
  },
  mounted() {
  },
  created() {
    this.getList()
  },
  methods: {
    searchTodo() {
      this.getList()
    },
    toEdit(row) {
      this.showTable = false
      if (this.tableType === 'stop') {
        this.$router.push(
          `stopDoc?id=${row.id}&reportStopCode=${row.reportStopCode}&pageType=edit`
        )
      }
      if (this.tableType === 'return') {
        const query = { returnCode: row.returnCode, stopReturnStatus: row.stopReturnStatus, id: row.id }
        this.$router.push({ path: `/borrowSys/returnTableEidht`, query: query })
      }
    },
    todetails(row) {
      let page = ''
      let query = {}
      this.showTable = false
      if (this.tableType === 'stop') {
        page = 'prucReportStop'
        query = { reportStopCode: row.reportStopCode, processInstanceId: row.processInstanceId }
      }
      if (this.tableType === 'return') {
        page = 'rejectGoodsDetail'
        query = { returnCode: row.returnCode }
      }
      if (this.tableType === 'settlement') {
        this.$router.push({ path: '/settlement/finalStatement', query: { id: row.id }})
        return
      }
      this.$router.push({ path: `/borrowSys/${page}`, query: query })
    },
    tableDetail(row, type) {
      this.showTable = true
      this.tableTitle = this.tableTileList[type]
      this.tableType = type
      this.getTableData(row)
    },
    async getTableData(row) {
      let res
      const id = row.id
      this.tableData = []
      if (this.tableType === 'stop') {
        res = await prucReportStopList({ leaseParameterId: id })
      }
      if (this.tableType === 'return') {
        res = await prucReturnList({ leaseParameterId: id })
      }
      if (this.tableType === 'settlement') {
        res = await listSettlementOrdersByReceiptCode({ receiptCode: row.receiptCode })
      }
      if (res && res.status == 200) {
        this.tableData = res.data
      }
    },
    // 收料单详情
    togoOrderDetail(row) {
      this.$router.push({ path: '/purchase/checkReceipt', query: { id: row.receiptId, deliveryId: '' }})
    },
    async examRefuse() {
      if (!this.form.examComment) {
        this.$message.error('请填写驳回意见')
        return
      }
      var paramArr = []
      this.ids.forEach((item) => {
        const obj = {}
        obj.taskId = item.taskId
        obj.processBaseId = item.processBaseId ? item.processBaseId : ''
        paramArr.push(obj)
      })
      var ret = await batchReturn({
        comment: this.form.examComment,
        flowTaskDTOList: paramArr
      }).then(() => {
        this.form.examComment = ''
        this.page = 0
        this.renderList()
      })
    },
    async batchExam() {
      if (!this.form.examComment) {
        this.$message.error('请填写审批意见')
        return
      }
      var paramArr = []
      this.ids.forEach((item) => {
        const obj = {}
        obj.taskId = item.taskId
        obj.instanceId = item.procInsId
        obj.processBaseId = item.processBaseId ? item.processBaseId : ''
        paramArr.push(obj)
      })
      const bb = await batchComplete({
        flowTaskDTOList: paramArr
      })
        .then(() => {
          this.form.examComment = ''
          this.page = 1
          this.renderList()
        })
        .catch((err) => {
        })
    },
    // 选择多个报停
    sureBatchExam() {
      if (this.ids.length <= 0) {
        this.$message.error('请勾选报停项')
        return
      }
      const statusList = this.ids.map(v => {
        return v.status
      })
      if (statusList.indexOf(3) !== -1 || statusList.indexOf(4) !== -1 || statusList.indexOf(5) !== -1) {
        this.$message.error('已报停、已退料或者部分报停，不可选择')
        return
      }
      var idList = []; var receiptCodeList = []; var receiptItemIdList = []
      this.ids.forEach(item => {
        idList.push(item.id)
        receiptCodeList.push(item.receiptCode)
        receiptItemIdList.push(item.receiptItemId)
      })
      const idStr = JSON.stringify(idList)
      const receiptCodeStr = JSON.stringify(receiptCodeList)
      const receiptItemIdStr = JSON.stringify(receiptItemIdList)

      this.$router.push(
        `stopDoc?id=${idStr}&receiptCode=${receiptCodeStr}&receiptItemId=${receiptItemIdStr}`
      )
    },
    changePageSize(val) {
      this.rows = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    // 多选
    handleSelectionChange(data) {
      this.ids = data
    },
    // 导出
    exportData() {
      exportTalentList({ ...this.queryParams, page: this.page, rows: this.rows }).then((res) => {})
    },
    async getList() {
      // 请求数据列表
      var dealList = await leaseList({
        ...this.queryParams,
        page: this.page,
        rows: this.rows
      })
      this.list = dealList.data.data
      this.pageTotal = dealList.data.total
    },
    // 重置
    handerReset() {
      this.queryParams = {}
      this.renderList()
    },
    // 报停
    tellStop(row) {
      var { id, receiptCode, receiptItemId } = row
      const idStr = JSON.stringify([id])
      const receiptCodeStr = JSON.stringify([receiptCode])
      const receiptItemIdStr = JSON.stringify([receiptItemId])

      this.$router.push(
        `stopDoc?id=${idStr}&receiptCode=${receiptCodeStr}&receiptItemId=${receiptItemIdStr}`
      )
    },
    returnMater(row) {
      var { id, receiptCode, receiptItemId, reportStopId } = row
      const idStr = JSON.stringify([id])
      const receiptCodeStr = JSON.stringify([receiptCode])
      const receiptItemIdStr = JSON.stringify([receiptItemId])
      this.$router.push(
        `returnTable?id=${idStr}&receiptCode=${receiptCodeStr}&receiptItemId=${receiptItemIdStr}&pageType=lease`
      )
      // this.$router.push({path: '/borrowSys/returnTable', query: {reportStopId: row.reportStopId,id: row.id, pageType: 'lease' }});
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
  .search-content {
    background: #ffffff;
    margin: 16px;
    padding-top: 30px;
    box-sizing: border-box;
    height: 80px;
    overflow: hidden;
    .search-btn {
      padding-right: 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
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

.cup {
  cursor: pointer;
}
.posr {
  position: relative;
}

.posa {
  position: absolute;
}
.el-table-column {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
