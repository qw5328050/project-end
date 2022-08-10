<template>
  <div class="totalPlan_container">

    <div class="search_content" :class="{ show_height: anSearch }">
      <el-form ref="queryForm" :model="queryParams" label-width="120px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="合同编号:" prop="contractCode">
                  <el-input
                    v-model="queryParams.contractCode"
                    clearable
                    placeholder="请输入"
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="合同乙方:" prop="supplierId">
                  <!-- <el-input
                    v-model="queryParams.supplierId"
                    clearable
                    placeholder="请输入"
                  /> -->
                  <el-select
                    v-model="queryParams.supplierId"
                    filterable
                    remote
                    reserve-keyword
                    placeholder="请输入"
                    clearable
                    :loading="loading"
                  >
                    <el-option
                      v-for="(item, index) in tableDataYF"
                      :key="index"
                      :label="item.supplierName"
                      :value="item.id"
                    />
                  </el-select>
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
                      v-for="(item, index) in getDictionaryValue('useStatusAll')"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="有无解禁记录:" prop="type">
                  <el-select
                    v-model="queryParams.type"
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in option"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="有无变更:" prop="hasModifyLog">
                  <el-select
                    v-model="queryParams.type"
                    placeholder="请选择"
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-col>
          <el-col :xl="4" :lg="6" :md="8" :xs="8" :sm="8">
            <div class="search-btn">
              <el-button
                @click="handerReset"
              >重置</el-button>
              <!--              v-hasPermi="['xm:menu:bs:material:contract_manage:enforce:reset']"-->
              <el-button
                type="primary"
                @click="handleQuery"
              >查询</el-button>
              <!--              v-hasPermi="['xm:menu:bs:material:contract_manage:enforce:query']"-->
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
    <div class="table_box">
      <div class="table_content">
        <div class="table_header">
          <div class="table_title">合同列表</div>
          <div class="table_button">
            <el-button
              v-hasPermi="['xm:menu:bs:material:contract_manage:enforce:export']"
              @click="exportData"
            ><svg-icon icon-class="export" />导出</el-button>
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
          :header-row-class-name="() => 'headerClass'"
          :size="size"
          stripe
          style="margin-top: 16px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="50"
            align="center"
            fixed="left"
          />
          <el-table-column
            v-if="columns[0].visible"
            key="0"
            align="center"
            label="序号"
            width="50"
            fixed="left"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[1].visible"
            key="1"
            label="合同编号"
            prop="contractCode"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                style="color: #1791ff; cursor: pointer"
                @click="checks(scope.row)"
              >{{ scope.row.contractCode }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[2].visible"
            key="2"
            label="合同乙方"
            prop="supplierName"
          >
            <!-- <template slot-scope="{ row }">
              <el-button type="text" @click="toTotalPlanDetails">{{
                row.type
              }}</el-button>
            </template> -->
          </el-table-column>
          <el-table-column
            v-if="columns[3].visible"
            key="3"
            label="合同金额(元)"
            header-align="left"
            align="right"
            prop="contractAmount"
          />
          <el-table-column
            v-if="columns[4].visible"
            key="4"
            label="总结算金额/含税(元)"
            prop="totalSettlementAmountWithTax"
          />
          <el-table-column
            v-if="columns[5].visible"
            key="5"
            label="总结算金额/不含税(元)"
            prop="totalSettlementAmountWithoutTax"
          />
          <el-table-column
            v-if="columns[6].visible"
            key="6"
            label="月度结算金额/含税(元)"
            prop="monthSettlementAmountWithTax"
          />
          <el-table-column
            v-if="columns[7].visible"
            key="7"
            label="月度结算金额/不含税(元)"
            prop="monthSettlementAmountWithoutTax"
          />
          <el-table-column
            v-if="columns[8].visible"
            key="8"
            label="月度结算比例(%)"
            prop="monthSettlementPercent"
          />
          <el-table-column
            v-if="columns[9].visible"
            key="9"
            label="合同状态"
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
            v-if="columns[10].visible"
            key="10"
            label="剩余结算金额(元)"
            prop="leftSettlementAmount"
          />
          <el-table-column
            v-if="columns[11].visible"
            key="11"
            label="变更记录"
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
              <div v-if="row.hasChange == 0">不变更</div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[12].visible"
            key="12"
            width="150"
            label="操作"
            fixed="right"
          >
            <template slot-scope="scope">
              <div class="action-box">
                <!-- <el-button
                  size="mini"
                  type="text"
                  @click="alterations(scope.row)"
                >变更</el-button> -->
                <!-- <span class="action action-border" /> -->
                <el-button
                  v-show="scope.row.useStatus == 1"
                  v-hasPermi="['xm:menu:bs:material:contract_manage:enforce:disabled']"
                  size="mini"
                  type="text"
                  @click="forbidden(scope.row)"
                >禁用</el-button>
                <el-button
                  v-show="scope.row.useStatus == 2"
                  v-hasPermi="['xm:menu:bs:material:contract_manage:enforce:enabled']"
                  size="mini"
                  type="text"
                  @click="liftBan(scope.row)"
                >解禁</el-button>
                <el-button
                  v-show="scope.row.useStatus == 1|| scope.row.useStatus == 1"
                  v-hasPermi="['xm:menu:bs:material:contract_manage:enforce:termination']"
                  size="mini"
                  type="text"
                  @click="termination(scope.row)"
                >终止</el-button>
                <el-button
                  v-show="scope.row.useStatus == 3"
                  v-hasPermi="['xm:menu:bs:material:contract_manage:enforce:recover']"
                  size="mini"
                  type="text"
                  @click="recover(scope.row)"
                >恢复</el-button>
                <!--                <el-popover trigger="hover" placement="top">-->
                <!--                  <span-->
                <!--                    slot="reference"-->
                <!--                    class="name-wrapper"-->
                <!--                    style="font-size: 24px"-->
                <!--                  >...</span>-->
                <!--                </el-popover>-->
              </div>
            </template>
          </el-table-column>
        </el-table>
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
            @pagination="getList"
          />
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <indexDialog
      :visible.sync="isShow"
      title="选择结算金额"
      :interview-id="interviewId"
      @submitForm="submitForm"
    />
  </div>
</template>

<script>
import { getExecuteContractList } from '@/api/contractManagement/execute'
import { mapGetters } from 'vuex'
import {
  selectSupplierByNameOrItemType,
  changeStatus,
  changeStatusJJ,
  changeStatusZZ,
  changeStatusHF,
  exportContractsImplement
} from '@/api/contractManagement/table'
import indexDialog from '../close/indexDialog.vue'
export default {
  name: 'TotalPlan',
  components: { indexDialog },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  data() {
    return {
      selPreOrdetData: [],
      interviewId: '',
      isShow: false,
      size: 'medium', // 表格的密度
      headerTitle: '', // 头部标题
      projectName: '深圳市宝安区鸿昌花园幼儿园', // 项目名称
      isIndeterminate: false, // 底部选择的状态
      checkAllData: false, // 全选的状态
      queryParams: {
        // 查询参数
        // pageNum: 1,
        // pageSize: 10
        page: 1,
        rows: 10
      },
      columns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `合同编号`, visible: true },
        { key: 2, label: `合同乙方`, visible: true },
        { key: 3, label: `合同金额`, visible: true },
        { key: 4, label: `总结算金额/含税(元)`, visible: true },
        { key: 5, label: `总结算金额/不含税(元)`, visible: true },
        { key: 6, label: `月度结算金额/含税(元)`, visible: true },
        { key: 7, label: `月度结算金额/不含税(元)`, visible: true },
        { key: 8, label: `月度结算比例`, visible: true },
        { key: 9, label: `合同状态`, visible: true },
        { key: 10, label: `剩余结算金额(元)`, visible: true },
        { key: 11, label: `变更记录`, visible: true },
        { key: 12, label: `操作`, visible: true }
      ],
      oldColumns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `合同编号`, visible: true },
        { key: 2, label: `合同乙方`, visible: true },
        { key: 3, label: `合同金额`, visible: true },
        { key: 4, label: `总结算金额/含税(元)`, visible: true },
        { key: 5, label: `总结算金额/不含税(元)`, visible: true },
        { key: 6, label: `月度结算金额/含税(元)`, visible: true },
        { key: 7, label: `月度结算金额/不含税(元)`, visible: true },
        { key: 8, label: `月度结算比例`, visible: true },
        { key: 9, label: `合同状态`, visible: true },
        { key: 10, label: `剩余结算金额(元)`, visible: true },
        { key: 11, label: `变更记录`, visible: true },
        { key: 12, label: `操作`, visible: true }
      ],
      list: [
        {
          type: '测试数据',
          planType: '广西建设-区域联合体-WZ-2021117',
          state: '0',
          status: true
        },
        {
          type: '测试数据',
          planType: '广西建设-区域联合体-WZ-2021117',
          state: '1',
          status: false
        }
      ], // 表格数据
      loading: false, // 表格加载
      anSearch: false, // 是否展开搜索
      // 有无解禁
      option: [
        { value: 0, label: '无' },
        { value: 1, label: '有' }
      ],
      // 有无变更
      options: [
        { value: 0, label: '无' },
        { value: 1, label: '有' }
      ],
      tableData: [],
      tableDataYF: [],
      total: 0
    }
  },
  created() {
    this.getList()
    this.getListYF()
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '合同执行'
  },
  methods: {
    resetColumns() {
      this.columns = JSON.parse(JSON.stringify(this.oldColumns))
    },
    handleSelectionChange(val) {
      this.selPreOrdetData = val
    },
    // 导出
    exportData() {
      // if(this.selPreOrdetData===null||this.selPreOrdetData.length===0){
      //   this.$message.warning("请选择需要导出的合同信息")
      //   return;
      // }
      const ids = []
      this.selPreOrdetData.forEach((item) => {
        ids.push(item.id)
      })

      const obj = JSON.parse(JSON.stringify(this.queryParams))
      obj.contractIds = ids
      // console.log(ids)
      exportContractsImplement({ ...obj, orgId: this.projectInformation.orgId === null ? -1 : this.projectInformation.orgId }).then((response) => {
        // const blob = new Blob([response], { type: "application/vnd.ms-excel" });
        // const url = window.URL || window.webkitURL || window.moxURL;
        // const downloadHref = url.createObjectURL(blob);
        // const downloadLink = document.createElement("a");
        // downloadLink.href = downloadHref;
        // downloadLink.download = `合同列表.xlsx`;
        // downloadLink.click();
      })

      // exportContracts(this.ids).then((res) => {})
    },
    // 项目结算金额弹窗
    checks(row, type) {
      this.interviewId = row.id
      this.isShow = true
    },
    // 跳转变更详情页面
    showDialog(row) {
      this.$router.push({
        path: '/contractManagement/changeDetail',
        query: { id: row.id }
      })
    },
    submitForm() {},
    alterations() {
      this.$router.push({ path: '/contractManagement/alterations' })
    },
    // 更改表格密度
    changeSize(type) {
      this.size = type
    },
    // 获取列表数据
    getList() {
      this.loading = true
      getExecuteContractList({ ...this.queryParams, orgId: this.projectInformation.orgId === null ? -1 : this.projectInformation.orgId }).then((res) => {
        const data = res.data
        this.tableData = data.list
        this.total = data.total
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 获取合同乙方数据
    getListYF() {
      selectSupplierByNameOrItemType(this.form).then((res) => {
        this.tableDataYF = res.data
      })
    },
    // 更改展开收回
    changeAnSearch() {
      this.anSearch = !this.anSearch
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
    // 查询
    handleQuery() {
      this.queryParams.page = 1
      this.getList()
    },
    // 跳转新增页面
    toAddView(path) {
      this.$router.push({ path: path })
    },
    // 跳转到总计划详情页面
    toTotalPlanDetails() {
      this.$router.push({ path: '/plan/totalPlanDetails' })
    },
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
    // 跳转合同详情页面
    details(row) {
      this.$router.push({
        path: '/contractManagement/contractDetails',
        query: { id: row.id }
      })
    },
    handlerEdit(row) {
      let path = ''
      switch (row.planType) {
        case '1':
          path = '/plan/materialsNeeded'
          break
        case '2':
          path = '/plan/reinforcedNeeded'
          break
        case '3':
          path = '/plan/concreteNeeded'
          break
        case '4':
          path = '/plan/returnableNeeded'
          break
      }
      this.$router.push({ path: path })
    },
    handlerAlteration(row) {
      let path = ''
      switch (row.planType) {
        case '1':
          path = '/plan/materialsNeeded'
          break
        case '2':
          path = '/plan/reinforcedNeeded'
          break
        case '3':
          path = '/plan/concreteNeeded'
          break
        case '4':
          path = '/plan/returnableNeeded'
          break
      }
      this.$router.push({ path: path })
    },
    getPlanTypeLable(key) {
      switch (key) {
        case '1':
          return '物资需用总计划'
        case '2':
          return '钢筋需用总计划'
        case '3':
          return '混凝土需用总计划'
        case '4':
          return '设备/周转材料/加工定制产品需用总计划'
      }
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
  // justify-content: space-between;
}
.action-border {
  width: 1px;
  height: 14px;
  background: #e9e9e9;
}
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
}
.totalPlan_container {
  .totalPlanTop {
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
  .search_content {
    background: #ffffff;
    margin: 16px;
    padding-top: 20px;
    box-sizing: border-box;
    height: 80px;
    overflow: hidden;
    .search-btn {
      padding-right: 24px;
      box-sizing: border-box;
      justify-content: flex-end;
    }
  }
  .show_height {
    height: auto;
  }
  .table_box {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    .table_content {
      width: 100%;
      height: 100%;
      padding: 16px 24px 0 24px;
      box-sizing: border-box;
      background: #fff;
      position: relative;
      .table_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .table_title {
          font-size: 16px;
          font-weight: 400;
          color: #000000;
        }
        .table_button {
          display: flex;
          align-items: center;
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
</style>
