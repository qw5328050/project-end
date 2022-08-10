<template>
  <div>

    <div class="app-container">
      <div class="search-content" :class="{ 'show-height': anSearch }">
        <el-form ref="queryForm" :model="queryParams" label-width="90px">
          <el-row :gutter="20">
            <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
              <el-row :gutter="20">
                <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="合同编号:" prop="contractCode">
                    <el-input
                      v-model="queryParams.contractCode"
                      placeholder="请输入"
                      style="width: 100%"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="合同乙方:" prop="supplierName">
                    <!-- <el-select
                      v-model="queryParams.supplierId"
                      filterable
                      remote
                      reserve-keyword
                      placeholder="请输入"
                      clearable
                      style="width:100%"
                      :loading="loading">
                      <el-option
                        v-for="(item,index) in tableDataYF"
                        :key="index"
                        :label="item.supplierName"
                        :value="item.id">
                      </el-option>
                    </el-select> -->
                    <el-input
                      v-model="queryParams.supplierName"
                      placeholder="请输入"
                      style="width: 100%"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="合同状态:" prop="useStatus">
                    <el-select
                      v-model="queryParams.useStatus"
                      placeholder="请选择"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        v-for="(item, index) in getDictionaryValue(
                          'useStatusAll'
                        )"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="合同类型:" prop="contractType">
                    <el-select
                      v-model="queryParams.contractType"
                      placeholder="请选择"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        v-for="(item, index) in getDictionaryValue(
                          'contractType'
                        )"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="录入人:" prop="createUserName">
                    <el-input
                      v-model="queryParams.createUserName"
                      placeholder="请输入"
                      style="width: 100%"
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="合同价类型:" prop="contractAmountType">
                    <el-select
                      v-model="queryParams.contractAmountType"
                      placeholder="请选择"
                      style="width: 100%"
                      clearable
                    >
                      <el-option
                        v-for="(item, index) in getDictionaryValue(
                          'contractAmountTypeAll'
                        )"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                      />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                  <el-form-item label="创建时间:" prop="date">
                    <el-date-picker
                      v-model="date"
                      type="datetimerange"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      range-separator="~"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style="width: 150%"
                      @change="changevalue"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
              <div class="search-btn">
                <el-button
                  @click="handerReset"
                >重置</el-button>
                <!--                v-hasPermi="['xm:menu:bs:material:contract_manage:list:reset']"-->
                <el-button
                  type="primary"
                  @click="handleQuery"
                >查询</el-button>
                <!--                v-hasPermi="['xm:menu:bs:material:contract_manage:list:query']"-->
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
                >收起<i
                  class="el-icon-arrow-up"
                /></el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-card>
        <div class="table_header">
          <div class="table_title">合同列表</div>
          <div class="table_button">
            <!-- <el-button @click="handlerPrint"><svg-icon icon-class="print" />打印</el-button>  -->
            <el-button
              v-hasPermi="['xm:menu:bs:material:contract_manage:list:export']"
              @click="exportData"
            ><svg-icon icon-class="export" />导出</el-button>
            <!--            <el-button-->
            <!--              type="primary"-->
            <!--              icon="el-icon-plus"-->
            <!--              @click="toAddView"-->
            <!--            >新增</el-button>-->
            <right-toolbar
              :size="size"
              :columns="columns"
              @queryTable="getList"
              @resetColumns="resetColumns"
              @changeSize="changeSize"
            />
          </div>
        </div>
        <el-table
          v-loading="loading"
          border
          :data="tableData"
          element-loading-text="Loading"
          :size="size"
          fit
          highlight-current-row
          :header-row-class-name="() => 'headerClass'"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" align="left" />
          <el-table-column
            v-if="columns[0].visible"
            key="0"
            align="left"
            label="序号"
            width="80"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column> -->
          <el-table-column
            v-if="columns[11].visible"
            key="11"
            label="合同类型"
            align="left"
            prop="contractType"
          >
            <template slot-scope="{ row }">
              <span>{{
                getDictionaryLabel(row.contractType, 'contractType')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[1].visible"
            key="1"
            label="合同编号"
            align="left"
            prop="contractCode"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                style="color: #1791ff; cursor: pointer"
                @click="details(scope.row)"
              >{{ scope.row.contractCode }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[2].visible"
            key="2"
            label="合同乙方"
            align="left"
            prop="supplierName"
          />
          <el-table-column
            v-if="columns[5].visible"
            key="5"
            label="合同金额(元)"
            header-align="left"
            align="right"
            prop="contractAmount"
          />
          <el-table-column
            v-if="columns[8].visible"
            key="8"
            class-name="status-col"
            label="合同状态"
            align="left"
            prop="useStatus"
          >
            <template slot-scope="{ row }">
              <div class="planStatus">
                <div class="box" :class="getClass(row)" />
                <span>{{
                  getDictionaryLabel(row.useStatus, 'useStatus')
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[9].visible"
            key="9"
            align="left"
            prop="receiptProject"
            label="收货项目数"
          >
            <template slot-scope="scope">
              <span
                style="color: #1791ff; cursor: pointer"
                @click="checkProject(scope.row)"
              >{{ scope.row.receiptProject }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[10].visible"
            key="10"
            label="变更记录"
            align="left"
            prop="hasChange"
          >
            <template slot-scope="{ row }">
              <div
                v-if="row.hasChange == 1"
                style="color: #1791ff; cursor: pointer"
                @click="showDialog(row)"
              >
                查看详情
              </div>
              <div v-if="row.hasChange == 0">无变更</div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[6].visible"
            key="6"
            label="录入人"
            align="left"
            prop="createUserName"
          >
            <template slot-scope="{ row }">
              {{ row.createUserName || '-' }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[7].visible"
            key="7"
            label="录入时间"
            align="left"
            prop="createTime"
            sortable
          />
          <el-table-column
            v-if="columns[4].visible"
            key="4"
            label="合同价类型"
            align="left"
            prop="contractAmountType"
          >
            <template slot-scope="{ row }">
              <span>{{
                getDictionaryLabel(row.contractAmountType, 'contractAmountType')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[3].visible"
            key="3"
            label="可使用分公司"
            align="left"
            prop="useName"
            show-overflow-tooltip
          />
          <el-table-column
            v-if="columns[13].visible"
            key="13"
            label="税率(%)"
            align="right"
            prop="taxVal"
          />
          <el-table-column
            v-if="columns[14].visible"
            key="14"
            label="结算周期"
            align="right"
            prop="periodType"
          >
            <template slot-scope="{ row }">
              <span>{{
                getDictionaryLabel(row.periodType, 'periodType')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[15].visible"
            key="15"
            label="结算类型"
            align="right"
            prop="settlementTypeId"
          >
            <template slot-scope="{ row }">
              <span>{{
                getDictionaryLabel(row.settlementTypeId, 'settlementTypeId')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[16].visible"
            key="16"
            label="价格类型"
            align="right"
            prop="isExclude"
          >
            <template slot-scope="{ row }">
              <span>{{
                getDictionaryLabel(row.isExclude, 'isExclude')
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[17].visible"
            key="17"
            label="结算方式"
            align="right"
            prop="settlementMode"
          >
            <template slot-scope="{ row }">
              <span>{{
                getDictionaryLabel(row.settlementMode, 'clearingList')
              }}</span>
            </template>
          </el-table-column>
          <!--          <el-table-column-->
          <!--            v-if="columns[12].visible"-->
          <!--            key="12"-->
          <!--            label="操作"-->
          <!--            align="left"-->
          <!--            width="150"-->
          <!--          >-->
          <!--            <template slot-scope="scope">-->
          <!--              <div class="action-box">-->
          <!--                <el-button-->
          <!--                  v-if="scope.row.useStatus == 5"-->
          <!--                  size="mini"-->
          <!--                  type="text"-->
          <!--                  @click="edit(scope.row)"-->
          <!--                >编辑</el-button>-->
          <!--                <el-button-->
          <!--                  size="mini"-->
          <!--                  type="text"-->
          <!--                  @click="relevance(scope.row)"-->
          <!--                >关联项目</el-button>-->
          <!--                <el-popover trigger="hover" placement="top">-->
          <!--                  <el-button-->
          <!--                    size="mini"-->
          <!--                    type="text"-->
          <!--                    @click="alteration(scope.row)"-->
          <!--                  >变更</el-button>-->
          <!--                  <el-button-->
          <!--                    size="mini"-->
          <!--                    type="text"-->
          <!--                    @click="forbidden(scope.row)"-->
          <!--                  >禁用</el-button>-->
          <!--                  <el-button-->
          <!--                    size="mini"-->
          <!--                    type="text"-->
          <!--                    @click="liftBan(scope.row)"-->
          <!--                  >解禁</el-button>-->
          <!--                  <el-button-->
          <!--                    size="mini"-->
          <!--                    type="text"-->
          <!--                    @click="termination(scope.row)"-->
          <!--                  >终止</el-button>-->
          <!--                  <el-button-->
          <!--                    size="mini"-->
          <!--                    type="text"-->
          <!--                    @click="recover(scope.row)"-->
          <!--                  >恢复</el-button>-->
          <!--                  <span-->
          <!--                    slot="reference"-->
          <!--                    class="name-wrapper"-->
          <!--                    style="font-size: 24px; cursor: pointer"-->
          <!--                  >...</span>-->
          <!--                </el-popover>-->
          <!--              </div>-->
          <!--            </template>-->
          <!--          </el-table-column>-->
        </el-table>
        <div v-if="total > 0" class="pagination">
          <div class="pageNumberRecord">
            共{{ total }}条记录 第{{ queryParams.pageNum }}/{{
              Math.ceil(total / queryParams.pageSize)
            }}页
          </div>
          <Pagination
            background
            layout="prev, pager, next, sizes, jumper"
            :page-sizes="[10, 20, 50, 100, 200, 500]"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />
        </div>
      </el-card>
    </div>
    <!-- <div class="footer">
      <div class="selectBox">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
        >已选4项</el-checkbox>
        <el-button type="text" style="margin-left: 4px">取消</el-button>
      </div>
      <div class="actionButtons">
        <el-button>批量导出</el-button>
        <el-button>打印表格</el-button>
      </div>
    </div> -->
    <!-- 弹窗 -->
    <indexDialog
      :visible.sync="isShow"
      title="查看收货项目"
      :interview-id="interviewId"
      :h-t-m-c="HT"
      @submitForm="submitForm"
    />
  </div>
</template>

<script>
import indexDialog from '../checkReceivingProject/indexDialog.vue'
import { objectToQueryString, delEmtQueryNodes } from '@/utils/validate'
import { mapGetters } from 'vuex'
// import { getList } from '@/api/table'
import {
  getLists,
  exportContracts,
  changeStatus,
  changeStatusJJ,
  changeStatusZZ,
  changeStatusHF,
  selectSupplierByNameOrItemType
} from '@/api/contractManagement/table'
export default {
  components: { indexDialog },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  data() {
    return {
      isShowPrint: false,
      date: '',
      HT: '',
      interviewId: '',
      isShow: false,
      size: 'medium', // 表格的密度
      isIndeterminate: false, // 底部选择的状态
      checkAllData: false, // 全选的状态
      tableData: [],
      tableDataYF: [],
      total: 0,
      anSearch: false,
      // loading: true,
      loading: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        beginTime: null,
        endTime: null
      },
      // 合同价类型
      contractType: [{}],
      // 表单参数
      form: {},
      list: [],
      ids: [],
      selPreOrdetData: [],
      columns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `合同编号`, visible: true },
        { key: 2, label: `合同乙方`, visible: true },
        { key: 3, label: `可使用分公司`, visible: false },
        { key: 4, label: `合同价类型`, visible: false },
        { key: 5, label: `合同金额(元)`, visible: true },
        { key: 6, label: `录入人`, visible: true },
        { key: 7, label: `录入时间`, visible: true },
        { key: 8, label: `合同状态`, visible: true },
        { key: 9, label: `收货项目`, visible: true },
        { key: 10, label: `变更记录`, visible: true },
        { key: 11, label: `合同类型`, visible: true },
        { key: 12, label: `操作`, visible: true },
        { key: 13, label: `税率`, visible: false },
        { key: 14, label: `结算周期`, visible: false },
        { key: 15, label: `结算类型`, visible: false },
        { key: 16, label: `价格类型`, visible: false },
        { key: 17, label: `结算方式`, visible: false }
      ],
      oldColumns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `合同编号`, visible: true },
        { key: 2, label: `合同乙方`, visible: true },
        { key: 3, label: `可使用分公司`, visible: false },
        { key: 4, label: `合同价类型`, visible: false },
        { key: 5, label: `合同金额(元)`, visible: true },
        { key: 6, label: `录入人`, visible: true },
        { key: 7, label: `录入时间`, visible: true },
        { key: 8, label: `合同状态`, visible: true },
        { key: 9, label: `收货项目`, visible: true },
        { key: 10, label: `变更记录`, visible: true },
        { key: 11, label: `合同类型`, visible: true },
        { key: 12, label: `操作`, visible: true },
        { key: 13, label: `税率`, visible: false },
        { key: 14, label: `结算周期`, visible: false },
        { key: 15, label: `结算类型`, visible: false },
        { key: 16, label: `价格类型`, visible: false },
        { key: 17, label: `结算方式`, visible: false }
      ]
    }
  },
  created() {
    // this.fetchData()
    this.getList()
    this.getListYF()
  },
  methods: {
    // 打印
    handlerPrint() {
      this.isShowPrint = true
    },
    // 获取合同乙方数据
    getListYF() {
      selectSupplierByNameOrItemType(this.form).then((res) => {
        this.tableDataYF = res.data
      })
    },
    // 查询时间
    changevalue(e) {
      if (e && e.length > 0) {
        this.queryParams.beginTime = e[0]
        this.queryParams.endTime = e[1]
      } else {
        this.queryParams.beginTime = ''
        this.queryParams.endTime = ''
      }
    },
    // 禁用
    forbidden(row) {
      // var contractId = {}
      var arr = []
      const ids = row.id || this.ids
      arr.push(ids)
      // contractId.contractIds = JSON.stringify(arr)
      // contractId.contractIds = arr
      this.$confirm('此操作将禁用该合同, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return changeStatus(arr)
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '禁用成功!'
          })
          this.getList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消禁用'
          })
        })
    },
    // 解禁
    liftBan(row) {
      var arr = []
      const ids = row.id || this.ids
      arr.push(ids)
      this.$confirm('此操作将解禁该合同, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return changeStatusJJ(arr)
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '解禁成功!'
          })
          this.getList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解禁'
          })
        })
    },
    // 终止
    termination(row) {
      var arr = []
      const ids = row.id || this.ids
      arr.push(ids)
      this.$confirm('此操作将终止该合同, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return changeStatusZZ(arr)
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '终止成功!'
          })
          this.getList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消终止'
          })
        })
    },
    // 恢复
    recover(row) {
      var arr = []
      const ids = row.id || this.ids
      arr.push(ids)
      this.$confirm('此操作将恢复该合同, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(function() {
          return changeStatusHF(arr)
        })
        .then(() => {
          this.$message({
            type: 'success',
            message: '恢复成功!'
          })
          this.getList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消恢复'
          })
        })
    },
    handleSelectionChange(val) {
      // console.log(val,"==---")
      this.selPreOrdetData = val
    },

    // 导出
    exportData() {
      // if (this.selPreOrdetData === null || this.selPreOrdetData.length === 0) {
      //   this.$message.warning('请选择需要导出的合同信息')
      //   return
      // }
      const ids = []
      this.selPreOrdetData.forEach((item) => {
        ids.push(item.id)
      })

      const obj = delEmtQueryNodes(delEmtQueryNodes(JSON.parse(JSON.stringify(this.queryParams))))
      if (this.queryParams.beginTime == null) {
        delete obj.beginTime
      }
      if (this.queryParams.endTime == null) {
        delete obj.endTime
      }
      obj.contractIds = ids
      delete obj.pageNum
      delete obj.pageSize
      exportContracts(objectToQueryString({ ...obj, orgId: this.projectInformation.orgId === null ? -1 : this.projectInformation.orgId })).then((response) => {
        // const blob = new Blob([response], { type: 'application/vnd.ms-excel' })
        // const url = window.URL || window.webkitURL || window.moxURL
        // const downloadHref = url.createObjectURL(blob)
        // const downloadLink = document.createElement('a')
        // downloadLink.href = downloadHref
        // downloadLink.download = `合同列表.xlsx`
        // downloadLink.click()
      })

      // exportContracts(this.ids).then((res) => {})
    },
    // 获取列表数据
    getList() {
      this.loading = true
      getLists({ ...this.queryParams, orgId: this.projectInformation.orgId === null ? -1 : this.projectInformation.orgId })
        .then((res) => {
          const data = res.data
          this.tableData = data.list
          this.total = data.total
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 查看收货项目弹窗
    checkProject(row, type) {
      this.HT = row.contractCode
      this.interviewId = row.id
      this.isShow = true
    },
    submitForm() {},
    // 返回颜色
    getClass(row) {
      switch (row.useStatus) {
        case 1:
          return 'draft'
        case 2:
          return 'forbidden'
        case 3:
          return 'normal'
        case 4:
          return 'rejected'
        case 5:
          return 'approval'
      }
    },
    resetColumns() {
      this.columns = JSON.parse(JSON.stringify(this.oldColumns))
    },
    // 更改表格密度
    changeSize(type) {
      this.size = type
    },
    // 跳转合同变更详情页面
    showDialog(row) {
      this.$router.push({
        path: '/contractManagement/changeDetails',
        query: { id: row.id }
      })
    },
    // 跳转关联项目页面
    relevance(row) {
      this.$router.push({
        path: '/contractManagement/relevance',
        query: { id: row.id }
      })
    },
    // 跳转合同详情页面
    details(row) {
      this.$router.push({
        path: '/contractManagement/contractDetails',
        query: { id: row.id }
      })
    },
    // 跳转编辑页面
    edit(row) {
      this.$router.push({
        path: '/contractManagement/edit',
        query: { id: row.id }
      })
    },
    // 跳转变更页面
    alteration(row) {
      this.$router.push({
        path: '/contractManagement/alteration',
        query: { id: row.id }
      })
    },
    // 跳转新增页面
    toAddView() {
      this.$router.push({ path: '/contractManagement/add' })
    },
    // 更改展开收回
    changeAnSearch() {
      this.anSearch = !this.anSearch
    },
    // fetchData() {
    //   this.loading = true
    //   getList().then((response) => {
    //     this.tableData = response.data.items
    //     this.loading = false
    //   })
    // },
    /** 搜索按钮操作 */
    // handleQuery() {
    //   // this.getList()
    // },
    /** 重置按钮操作 */
    // handerReset() {
    //   this.resetForm('queryForm')
    //   this.handleQuery()
    // },
    // 重置
    handerReset() {
      this.date = ''
      this.queryParams = {
        // 查询参数
        pageNum: 1,
        pageSize: 10
      }
      this.handleQuery()
    },
    handleQuery() {
      this.form.pageNum = 1
      this.getList()
    }
  }
}
</script>

<style lang="scss" scoped>
.needPlanTop {
  background: #fff;
  padding-left: 32px;
  box-sizing: border-box;
  width: 100%;
  height: 32px;
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  .project {
    font-size: 14px;
    font-weight: 400;
    color: #595959;
    display: flex;
    padding-bottom: 16px;
    align-items: center;
    .switch_svg {
      margin-left: 8px;
      font-size: 24px;
    }
  }
}
  .popoverIoc {
    margin-left: 8px;
    font-size: 16px;
    color: #1791ff;
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
    .normal {
      background: #bfbfbf;
    }
    .approval {
      background: #1791ff;
    }
    .draft {
      background: #00cc33;
    }
    .rejected {
      background: #faad14;
    }
    .forbidden {
      background: red;
    }
  }
  .action-box {
    color: #1791ff;
    display: flex;
    justify-content: space-between;
  }
  .action-border {
    width: 1px;
    height: 14px;
    background: #e9e9e9;
  }
  ::v-deep .headerClass th {
    background: #fafafa !important;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  // .box {
  //   background-color: #fff;
  //   padding-bottom: 18px;
  // }
  .box1 {
    margin-left: 32px;
    width: 80px;
    height: 28px;
    font-size: 20px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
  }
  .box2 {
    margin-left: 30px;
    margin-top: 8px;
    width: 266px;
    height: 28px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #595959;
    line-height: 28px;
  }
  .box3 {
    margin-left: 30px;
    position: relative;
    bottom: -15px;
  }
  .search-content {
    background: #ffffff;
    // margin: 16px;
    margin-bottom: 16px;
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
  .table_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .table_title {
      margin-bottom: 24px;
      font-size: 16px;
      font-weight: 400;
      color: #000000;
    }
    .table_button {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  .pagination {
    margin-left: 1%;
    width: 97%;
    height: 64px;
    display: flex;
    // position: absolute;
    bottom: 0;
    align-items: center;
    justify-content: space-between;
    .pageNumberRecord {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.6);
    }
  }
  .footer {
    // position: absolute;
    width: 100%;
    // margin-top: 16px;
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
</style>
