<template>
  <div class="needPlan_container">
    <div class="search_content" :class="{ show_height: anSearch }">
      <el-form ref="queryForm" :model="queryParams" label-width="110px">
        <el-row :gutter="20">
          <el-col :xl="20" :lg="18" :md="16" :xs="16" :sm="16">
            <el-row :gutter="20">
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="类型:" prop="planType">
                  <el-select
                    v-model="queryParams.planType"
                    placeholder="请选择"
                    filterable
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in planTypeOption"
                      :key="item.dataValue"
                      :label="item.dataName"
                      :value="item.dataValue"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="状态:" prop="status">
                  <el-select
                    v-model="queryParams.status"
                    placeholder="请选择"
                    filterable
                    style="width: 100%"
                    clearable
                  >
                    <el-option
                      v-for="item in getDictionaryValue('planStatus')"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="提交人员:" prop="createUserName">
                  <el-input
                    v-model="queryParams.createUserName"
                    placeholder="请输入"
                    clearable
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="6" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="提交时间:" prop="date">
                  <el-date-picker
                    v-model="date"
                    type="daterange"
                    unlink-panels
                    value-format="yyyy-MM-dd"
                    range-separator="~"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    style="width: 100%"
                    :picker-options="pickerOptions"
                    @change="changevalue"
                  />
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
    <div class="table_box">
      <div class="table_content">
        <div class="table_header">
          <div class="table_title">需用计划列表</div>
          <div class="table_button">
            <el-button
              v-hasPermi="[
                'xm:menu:bs:material:plan_manage:demand_plan:print',
                'isAll'
              ]"
              @click="handlerPrint"
            >
              <svg-icon icon-class="print" />
              打印</el-button>
            <el-button
              v-hasPermi="[
                'xm:menu:bs:material:plan_manage:demand_plan:export',
                'isAll'
              ]"
              @click="exportData(1)"
            >
              <svg-icon icon-class="export" />
              导出计划</el-button>
            <el-button
              v-hasPermi="[
                'xm:menu:bs:material:plan_manage:demand_plan:material_export',
                'isAll'
              ]"
              @click="exportData(2)"
            >
              <svg-icon icon-class="export" />
              导出物资</el-button>
            <el-dropdown style="margin-left: 10px" @command="toAddView">
              <el-button
                v-hasPermi="['xm:menu:bs:material:plan_manage:demand_plan:add']"
                type="primary"
                icon="el-icon-plus"
              >新增</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item, index) in addPlanData"
                  :key="index"
                  :command="item.dataValue"
                >{{ item.dataName }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <right-toolbar
              :size="size"
              :columns="columns"
              @queryTable="getListData"
              @resetColumns="resetColumns"
              @changeSize="changeSize"
            />
          </div>
        </div>
        <el-table
          ref="tableBox"
          v-loading="loading"
          border
          :data="list"
          :header-row-class-name="() => 'headerClass'"
          :size="size"
          style="margin-top: 26px"
          @selection-change="handleSelectionChange"
        >
          <el-table-column key="0" type="selection" width="55" align="center" />
          <el-table-column
            v-if="columns[0].visible"
            key="1"
            align="center"
            label="序号"
            width="65"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[10].visible"
            key="11"
            label="类型"
            prop="needPlanType"
            width="120"
          >
            <template slot-scope="{ row }">
              {{ getDictLabel(row.needPlanType) || '-' }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[1].visible"
            key="2"
            label="需用计划名称"
            prop="needPlanName"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              {{ row.needPlanName }}
            </template>
          </el-table-column>

          <el-table-column
            v-if="columns[2].visible"
            key="3"
            label="需用计划编号"
            prop="needPlanCode"
            width="230"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toNeedPlanDetails(row)">{{
                row.needPlanCode || '-'
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[3].visible"
            key="4"
            label="关联的月度计划编号"
            prop="monthPlanCode"
            width="200"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toMonthlyDetails(row)">
                {{ row.monthPlanCode || '_' }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[4].visible"
            key="5"
            label="物资种类数"
            sortable
            width="120"
            prop="materialQuantity"
          >
            <template slot-scope="{ row }">
              {{ row.materialQuantity || 0 }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[5].visible"
            key="6"
            label="采购订单数量"
            sortable
            width="150"
            prop="count"
          >
            <template slot-scope="{ row }">
              <el-button type="text" @click="toPurchaseOrder(row)">
                {{ row.count || 0 }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[6].visible"
            key="7"
            label="提交人员"
            prop="createUserName"
          >
            <template slot-scope="{ row }">
              {{ row.createUserName || '-' }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[7].visible"
            key="8"
            label="提交时间"
            prop="createTime"
            width="150"
            show-overflow-tooltip
          >
            <template slot-scope="{ row }">
              {{ row.createTime || '-' }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[8].visible"
            key="9"
            label="状态"
            prop="status"
          >
            <template slot-scope="{ row }">
              <div class="planStatus">
                <div class="box" :class="getClass(row)" />
                <span>{{ row.statusText }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[9].visible"
            key="10"
            label="采购状态"
            prop="purchaseStatus"
          >
            <template slot-scope="{ row }">
              {{ row.purchaseStatusText || '-' }}
            </template>
          </el-table-column>
          <el-table-column
            v-if="columns[11].visible"
            key="12"
            width="200"
            label="操作"
            fixed="right"
          >
            <template slot-scope="{ row, $index }">
              <el-button
                v-if="row.status === 1 || row.status === 4 || row.status === 6"
                v-hasPermi="[
                  'xm:menu:bs:material:plan_manage:demand_plan:edit'
                ]"
                size="mini"
                type="text"
                @click="handlerEdit(row)"
              >编辑</el-button>
              <el-popconfirm
                v-if="row.status === 1 || row.status === 4 || row.status === 6"
                title="确定要删除这一行吗？"
                style="margin-left: 10px"
                @onConfirm="handelDelete(row, $index)"
              >
                <el-button
                  slot="reference"
                  v-hasPermi="[
                    'xm:menu:bs:material:plan_manage:demand_plan:delete'
                  ]"
                  size="mini"
                  type="text"
                >删除</el-button>
              </el-popconfirm>
              <el-button
                v-if="row.status === 2"
                v-hasPermi="[
                  'xm:menu:bs:material:plan_manage:demand_plan:approval_progress',
                  'isAll'
                ]"
                size="mini"
                type="text"
                @click="showDetail(row)"
              >审批进度</el-button>
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
            :total="total"
            :page.sync="queryParams.page"
            :limit.sync="queryParams.rows"
            @pagination="getListData"
          />
        </div>
      </div>
    </div>
    <MonthlyPlanDialog
      title="选择月度计划"
      :visible.sync="isShowMonthlyPlanDialog"
      :plan-type="newConfiguration"
      @handlerConfirm="handlerConfirm"
    />
    <ApprovalProgress
      :visible.sync="isShowApprovalProgress"
      :processdata="processdata"
    />
    <PurchaseOrder
      :id="needId"
      title="查看采购订单"
      :visible.sync="isShowPurchaseOrder"
    />
    <PrintComponent
      :visible.sync="isShowPrint"
      :print-loading="printLoading"
      :all-data-lit="printData"
    >
      <template #content="data">
        <template v-if="data.row && data.row.monthPlanType !== 2">
          <tr class="text-c">
            <td colspan="1">序号</td>
            <td colspan="1">物资名称</td>
            <td colspan="1">规格型号(工料机描述)</td>
            <td colspan="1">工料机补充描述</td>
            <td colspan="1">单位</td>
            <td colspan="1">进场数量</td>
            <td colspan="1">计划进场时间</td>
            <td colspan="1">使用部位</td>
          </tr>
          <tr v-for="(item, index) in data.list" :key="index" class="text-c">
            <td colspan="1">{{ index + 1 }}</td>
            <td colspan="1">{{ item.materialName }}</td>
            <td colspan="1">{{ item.specification }}</td>
            <td colspan="1">{{ item.remark }}</td>
            <td colspan="1">{{ item.unit }}</td>
            <td colspan="1">{{ item.useNum }}</td>
            <td colspan="1">{{ item.useTime }}</td>
            <td colspan="1">{{ item.usePosition }}</td>
          </tr>
        </template>
        <template v-else>
          <tr class="text-c">
            <td colspan="1">序号</td>
            <td colspan="1">物资名称</td>
            <td colspan="1">标号(工料机描述)</td>
            <td colspan="1">计划方量</td>
            <td colspan="1">塌落度</td>
            <td colspan="1">浇筑部位</td>
            <td colspan="1">浇筑时间</td>
            <td colspan="1">卸料方式</td>
          </tr>
          <tr v-for="(item, index) in data.list" :key="index" class="text-c">
            <td colspan="1">{{ index + 1 }}</td>
            <td colspan="1">{{ item.materialName }}</td>
            <td colspan="1">{{ item.markNum }}</td>
            <td colspan="1">{{ item.planVolume }}</td>
            <td colspan="1">{{ item.collapseDegree }}</td>
            <td colspan="1">{{ item.usePosition }}</td>
            <td colspan="1">{{ item.useTime }}</td>
            <td colspan="1">{{ item.unloadingWay }}</td>
          </tr>
        </template>
      </template>
    </PrintComponent>
    <el-dialog
      :title="processView.title"
      :visible.sync="processView.open"
      width="50%"
      append-to-body
    >
      <div v-if="processView.open">
        <approve-detail :info="info" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { approvalProgress, selectDictDatas } from '@/api/plan/mad'
import PrintComponent from './printComponent'
import ApproveDetail from '../components/approveDetail'
import { mapGetters } from 'vuex'
import MonthlyPlanDialog from '../components/monthlyPlanDialog.vue'
import ApprovalProgress from '../components/approvalProgress.vue'
import PurchaseOrder from './purchaseOrder.vue'
import {
  getList,
  deleteData,
  exportNeedData,
  selectPrintData,
  exportMaterials
} from '@/api/plan/needPlan'
export default {
  name: 'NeedPlan',
  components: {
    MonthlyPlanDialog,
    ApprovalProgress,
    PurchaseOrder,
    PrintComponent,
    ApproveDetail
  },
  data() {
    return {
      processView: {
        title: '审批详情',
        open: false
      },
      info: {},
      isShowPrint: false,
      isShowPurchaseOrder: false,
      isShowApprovalProgress: false,
      processdata: {},
      printData: [],
      projectId: null,
      projectOption: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      date: [],
      size: 'medium', // 表格的密度
      headerTitle: '', // 头部标题
      isShowMonthlyPlanDialog: false,
      projectName: '深圳市龙岗区耳鼻喉医院迁址重建', // 项目名称
      isIndeterminate: false, // 底部选择的状态
      checkAllData: false, // 全选的状态
      queryParams: {
        // 查询参数
        page: 1,
        rows: 10,
        planType: null,
        status: ''
      },
      total: 0,
      ids: [],
      needId: null,
      columns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `需用计划名称`, visible: true },
        { key: 2, label: `需用计划编号`, visible: true },
        { key: 3, label: `关联的月度计划`, visible: true },
        { key: 4, label: `物资种类数`, visible: true },
        { key: 5, label: `采购订单数量`, visible: true },
        { key: 6, label: `提交人员`, visible: true },
        { key: 7, label: `提交时间`, visible: true },
        { key: 8, label: `状态`, visible: true },
        { key: 9, label: `采购状态`, visible: true },
        { key: 10, label: `类型`, visible: true },
        { key: 11, label: `操作`, visible: true }
      ],
      oldColumns: [
        { key: 0, label: `序号`, visible: true },
        { key: 1, label: `需用计划名称`, visible: true },
        { key: 2, label: `需用计划编号`, visible: true },
        { key: 3, label: `关联的月度计划`, visible: true },
        { key: 4, label: `物资种类数`, visible: true },
        { key: 5, label: `采购订单数量`, visible: true },
        { key: 6, label: `提交人员`, visible: true },
        { key: 7, label: `提交时间`, visible: true },
        { key: 8, label: `状态`, visible: true },
        { key: 9, label: `采购状态`, visible: true },
        { key: 10, label: `类型`, visible: true },
        { key: 11, label: `操作`, visible: true }
      ],
      list: [], // 表格数据
      loading: false, // 表格加载
      anSearch: false, // 是否展开搜索
      printLoading: false, // 是否展开搜索
      planTypeOption: [],
      addPlanData: [],
      newConfiguration: null
    }
  },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  watch: {
    columns: {
      handler() {
        this.$nextTick(() => {
          this.$refs.tableBox.doLayout()
        })
      },
      immediate: true,
      deep: true
    }
  },
  created() {},
  mounted() {
    if (!this.loading) {
      this.getListData()
    }
    this.getDictValue()
    this.headerTitle = this.$route.name ? this.$route.name : '总计划'
  },
  activated() {
    if (!this.loading) {
      this.getListData()
    }
  },
  methods: {
    getDictValue() {
      selectDictDatas('DIC_NEED_PLAN_TYPE').then((res) => {
        if (res.data && res.data.length > 0) {
          const newArray = [...res.data]
          this.addPlanData = res.data
          newArray.unshift({ dataName: '全部', dataValue: null })
          this.planTypeOption = newArray
        }
      })
    },
    getDictLabel(type) {
      let name = ''
      this.planTypeOption.forEach((item) => {
        if (Number(item.dataValue) === type) {
          name = item.dataName
        }
      })
      return name
    },
    showDetail(row) {
      const { processDefinitionId, processInstanceId } = row
      this.info.processDefinitionId = processDefinitionId
      this.info.processInstanceId = processInstanceId
      this.processView.open = true
    },
    // 返回颜色
    getClass(row) {
      switch (row.status) {
        case 1:
          return 'draft'
        case 2:
          return 'approval'
        case 3:
          return 'normal'
        case 4:
          return 'rejected'
        case 6:
          return 'withdraw'
      }
    },
    changeArr(arr) {
      const idArr = []
      const arrData = []
      arr.forEach((item) => {
        if (idArr.findIndex((items) => items === item.activityId) < 0) {
          idArr.push(item.activityId)
        }
      })
      if (idArr.length > 0) {
        idArr.forEach((item) => {
          const newArr = arr.filter((items) => item === items.activityId)
          newArr.sort((a, b) => {
            return new Date(b.createTime) - new Date(a.createTime)
          })
          arrData.push(newArr[0])
        })
      }
      arrData.sort((a, b) => {
        return new Date(a.createTime) - new Date(b.createTime)
      })
      if (arrData && arrData.length > 0) {
        return arrData
      } else {
        return []
      }
    },
    selectPrintData() {
      selectPrintData(this.ids).then((res) => {
        const data = res.data || []
        data.forEach((item) => {
          if (item.processInstanceId && item.processDefinitionId) {
            approvalProgress({
              processInstanceId: item.processInstanceId
            }).then((res) => {
              if (res.data && res.data.length > 0) {
                const arrData = this.changeArr(res.data)
                arrData.forEach((resDataItem, index) => {
                  if (index === 0) {
                    this.$set(item, 'compile', resDataItem.assigneeName)
                    this.$set(item, 'compileTime', resDataItem.createTime)
                  } else if (index === 1) {
                    this.$set(item, 'production', resDataItem.assigneeName)
                    this.$set(item, 'productionTime', resDataItem.createTime)
                  } else if (index === 2) {
                    this.$set(item, 'business', resDataItem.assigneeName)
                    this.$set(item, 'businessTime', resDataItem.createTime)
                  } else if (index === 3) {
                    this.$set(item, 'manager', resDataItem.assigneeName)
                    this.$set(item, 'managerTime', resDataItem.createTime)
                  }
                })
              }
              res.data
            })
          }
        })
        this.printData = res.data
        this.printLoading = false
      })
    },
    // 打印
    handlerPrint() {
      if (this.ids && this.ids.length > 0) {
        this.printLoading = true
        this.selectPrintData()
        this.isShowPrint = true
      } else {
        this.$message.warning('请先选择需要打印的需用计划')
      }
    },
    // 查看采购订单
    toPurchaseOrder(row) {
      if (row.count > 0) {
        this.needId = row.id
        this.isShowPurchaseOrder = true
      } else {
        this.$message({
          message: '当前计划暂无采购订单!',
          type: 'warning'
        })
      }
    },
    // 显示审批进度
    showApprovals(row) {
      this.processdata = {
        processInstanceId: row.processInstanceId,
        processDefinitionId: row.processDefinitionId
      }
      this.isShowApprovalProgress = true
    },
    getListData() {
      // 请求数据列表
      this.loading = true
      getList({
        ...this.queryParams,
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
    },
    // 查询时间
    changevalue(e) {
      if (e && e.length > 0) {
        this.queryParams.startDate = e[0]
        this.queryParams.endDate = e[1]
      } else {
        this.queryParams.startDate = ''
        this.queryParams.endDate = ''
      }
    },
    // 跳转新增页面
    toAddView(type) {
      this.newConfiguration = Number(type)
      if (this.newConfiguration === 1 || this.newConfiguration === 2) {
        this.isShowMonthlyPlanDialog = true
      } else {
        this.$router.push({
          path: '/plan/suppliesNeedNoPlan',
          query: { needPlanType: this.newConfiguration }
        })
      }
    },
    // 跳转到详情页面
    toNeedPlanDetails(row) {
      this.$router.push({
        path: '/plan/needPlanDetail',
        query: {
          id: row.id,
          processInstanceId: row.processInstanceId
        }
      })
    },
    toMonthlyDetails(row) {
      if (row.monthPlanId) {
        this.$router.push({
          path: '/plan/monthlyPlanDetail',
          query: { id: row.monthPlanId }
        })
      } else {
        this.$message({
          message: '当前计划暂无关联月度计划!',
          type: 'warning'
        })
      }
    },
    // 多选
    handleSelectionChange(data) {
      this.ids = data.map((item) => {
        return item.id
      })
    },
    // 导出
    exportData(type) {
      if (type === 1) {
        exportNeedData({
          ...this.queryParams,
          ids: this.ids,
          ...this.projectInformation
        }).then((res) => {
          // console.log(res);
        })
      } else {
        exportMaterials({
          ...this.queryParams,
          ids: this.ids,
          ...this.projectInformation
        }).then((res) => {
          // console.log(res);
        })
      }
    },
    resetColumns() {
      this.columns = JSON.parse(JSON.stringify(this.oldColumns))
    },
    // 更改表格密度
    changeSize(type) {
      this.size = type
    },
    // 删除
    handelDelete(row, index) {
      deleteData({ planId: row.id }).then((res) => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getListData()
      })
    },
    // 更改展开收回
    changeAnSearch() {
      this.anSearch = !this.anSearch
    },
    // 重置
    handerReset() {
      this.date = ''
      this.queryParams = {
        // 查询参数
        page: 1,
        rows: 10,
        planType: null,
        status: ''
      }
      this.handleQuery()
    },
    handleQuery() {
      this.queryParams.page = 1
      this.getListData()
    },
    handlerConfirm(row) {
      this.isShowMonthlyPlanDialog = false
      this.$router.push({
        path:
          row.overallPlanType === 3
            ? '/plan/concreteNeedPlan'
            : '/plan/suppliesNeedPlan',
        query: {
          monthPlanId: row.id,
          monthPlanCode: row.monthPlanCode,
          monthPlanName: row.monthPlanName,
          monthPlanType: row.overallPlanType,
          planMonth: row.planMonth,
          planYear: row.planYear,
          needPlanType: this.newConfiguration
        }
      })
    },
    handlerEdit(row) {
      let path = ''
      if (row.monthPlanType === 3) {
        path = '/plan/concreteNeedPlan'
      } else {
        if (row.needPlanType === 1) {
          path = '/plan/suppliesNeedPlan'
        } else {
          path = '/plan/suppliesNeedNoPlan'
        }
      }
      this.$router.push({
        path: path,
        query: {
          id: row.id
        }
      })
    },
    handlerAlteration(row) {}
  }
}
</script>
<style lang="scss" scoped>
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
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
  .withdraw {
    background: #ff4d4f;
  }
}
.needPlan_container {
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
  .search_content {
    background: #ffffff;
    margin: 16px;
    padding-top: 20px;
    box-sizing: border-box;
    height: 80px;
    overflow: hidden;
    .search-btn {
      padding-right: 24px;
      display: flex;
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
