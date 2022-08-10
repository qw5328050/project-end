<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="title">
            结算单编号： {{ queryParams.orderNo || '--' }}
          </div>
        </el-col>
        <el-col
          :span="6"
        ><div class="search-btn">
          <el-button @click="back">取消</el-button>
          <el-button
            v-if="
              queryParams.orderStatus !== 5 &&
                queryParams.orderStatus !== 6 &&
                queryParams.type !== 6
            "
            @click="handerPrintData"
          >打印</el-button>
          <!-- <el-button @click="updatePrintQuantity">打印</el-button> -->
        </div></el-col>
      </el-row>
      <div class="totalText">
        <el-row :gutter="20">
          <el-col
            :span="6"
          ><div>
            结算类型：{{
              getDictionaryLabel(queryParams.type, 'type') || '--'
            }}
          </div></el-col>
          <el-col
            :span="6"
          ><div>
            结算单日期：{{ queryParams.settlementDate || '--' }}
          </div></el-col>
          <el-col
            :span="9"
          ><div>合同编号：{{ queryParams.contractCode || '--' }}</div></el-col>
          <el-col :span="6" />
        </el-row>
      </div>
      <div class="totalText">
        <el-row :gutter="20">
          <el-col
            :span="6"
          ><div>项目名称及编号：{{ queryParams.projectName }}</div></el-col>
          <el-col
            :span="6"
          ><div>
            供应商名称：{{ queryParams.supplierName || '--' }}
          </div></el-col>
          <el-col
            :span="6"
          ><div>
            结算单状态：{{
              getDictionaryLabel(queryParams.orderStatus, 'orderStatus') ||
                '--'
            }}
          </div></el-col>
          <el-col :span="6" />
        </el-row>
      </div>
      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="onTabAction">
          <el-tab-pane label="结算信息" name="1" />
          <el-tab-pane
            v-if="queryParams.orderStatus != 2"
            label="审批信息"
            name="2"
          />
          <el-tab-pane label="变更记录" name="3" />
        </el-tabs>
      </div>
    </div>
    <div v-if="activeName === '1'">
      <!-- <el-card class="search-content" shadow="never">
        <div slot="header" class="clearfix">
          <span>结算信息</span>
        </div>
        <el-form
          ref="queryForm"
          :label-position="labelPosition"
          :model="queryParams"
          label-width="90px"
        >
          <el-row :gutter="20">
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="期间供应商服务满意度" prop="type">
                <el-radio-group v-model="queryParams.satisfiedDegree" disabled>
                  <el-radio :label="1">非常满意</el-radio>
                  <el-radio :label="2">满意</el-radio>
                  <el-radio :label="3">不满意</el-radio>
                  <el-radio :label="4">非常不满意</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card> -->
      <el-card class="search-content" shadow="never">
        <div slot="header" class="clearfix">
          <span>物资信息</span>
        </div>
        <div>
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            @tab-click="handleClick"
          >
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
            />
          </el-tabs>
        </div>
        <!-- 钢筋 -->
        <reinforcing
          v-if="queryParams.type === 1"
          :list="listForm"
          :type="listType"
          @submitForm="reinforcing"
        />
        <!-- 一般材料 -->
        <generalClearing
          v-if="queryParams.type === 2"
          :list="listForm"
          :type="listType"
          @submitForm="generalClearing"
        />
        <!-- 一般材料按信息价除税下浮 -->
        <generalClearingTax
          v-if="queryParams.type === 3"
          :list="listForm"
          :type="listType"
          @submitForm="generalClearingTax"
        />
        <!-- 参考网价结算单物资列表 -->
        <referenceWangJia
          v-if="queryParams.type === 4"
          :list="listForm"
          :type="listType"
          @submitForm="referenceWangJia"
        />
        <!-- 混凝土结算单 -->
        <conCreteStatement
          v-if="queryParams.type === 5"
          :list="listForm"
          :type="listType"
          @submitForm="conCreteStatement"
        />
        <!-- 租赁类材料 -->
        <rentalMaterials
          v-if="queryParams.type === 6"
          :list="listForm"
          :type="listType"
          @submitForm="rentalMaterials"
        />
        <!-- 列表信息 -->
      </el-card>
      <el-card class="search-content" shadow="never">
        <div slot="header" class="clearfix">
          <span>金额信息</span>
        </div>
        <div>
          本次结算金额明细
          <el-tooltip content="此金额为含税金额" placement="top">
            <svg-icon icon-class="qusetion" />
          </el-tooltip>
        </div>
        <el-table
          :data="queryParams.otherExpensesList"
          style="width: 100%; margin-top: 12px"
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="type" label="明细项" width="180">
            <template slot-scope="{ row }">
              {{ getDictionaryLabel(row.type, 'spSettlementTy') }}
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="含税总金额（元）" />
          <el-table-column prop="taxRate" label="税率%" />
          <el-table-column prop="address" label="差补说明" />
        </el-table>
        <el-form ref="queryForm" :model="queryParams" label-width="120px">
          <el-row :gutter="20" style="padding-top: 24px">
            <el-col :span="12">
              <el-row :gutter="20" style="padding-top: 8px">
                <el-col :span="24">
                  <el-form-item label="本次结算其他金额：" label-width="250px">
                    <el-input
                      v-model="queryParams.totalOtherAmounts"
                      style="width: 70%"
                      placeholder="请输入"
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="padding: 16px 0">
            <el-col :span="12">
              <el-form-item
                label="结算其他金额附件："
                prop="fileInfoDTOList"
                label-width="250px"
              >
                <FileUpload
                  :value="fileList"
                  :limit-num="3"
                  :file-size="20"
                  :file-type="fileType"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="padding-top: 8px">
            <el-col :span="12">
              <el-row :gutter="20" style="padding-top: 16px">
                <el-col :span="24">
                  <el-form-item
                    label="本月结算金额（不含增值税）："
                    prop="settlementAmtNoTax"
                    label-width="250px"
                  >
                    <el-input
                      v-model="queryParams.settlementAmtNoTax"
                      style="width: 70%"
                      disabled
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="padding-top: 8px">
                <el-col :span="24">
                  <el-form-item
                    label="本月结算金额（含增值税）："
                    prop="settlementAmtTax"
                    label-width="250px"
                  >
                    <el-input
                      v-model="queryParams.settlementAmtTax"
                      style="width: 70%"
                      disabled
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="padding-top: 8px">
                <el-col :span="24">
                  <el-form-item
                    label="累计结算金额（不含增值税）： "
                    prop="cumSettlementAmtNoTax"
                    label-width="250px"
                  >
                    <el-input
                      v-model="queryParams.cumSettlementAmtNoTax"
                      style="width: 70%"
                      disabled
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="padding-top: 8px">
                <el-col :span="24">
                  <el-form-item
                    label="累计结算金额（含增值税）："
                    prop="cumSettlementAmtTax"
                    label-width="250px"
                  >
                    <el-input
                      v-model="queryParams.cumSettlementAmtTax"
                      style="width: 70%"
                      disabled
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="20">
                <el-col :span="20" style="padding-top: 16px">
                  <div class="inputText">
                    {{ chineSize(queryParams.settlementAmtNoTax) }}
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20" style="padding-top: 8px">
                  <div class="inputText">
                    {{ chineSize(queryParams.settlementAmtTax) }}
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20" style="padding-top: 8px">
                  <div class="inputText">
                    {{ chineSize(queryParams.cumSettlementAmtNoTax) }}
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="20" style="padding-top: 8px">
                  <div class="inputText">
                    {{ chineSize(queryParams.cumSettlementAmtTax) }}
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
        <!-- 列表信息 -->
      </el-card>
    </div>
    <div v-if="activeName === '2'">
      <!-- 审批信息 -->
      <el-card class="search-content" shadow="never">
        <div slot="header" class="clearfix">
          <span>审批信息</span>
        </div>
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :class="{
              line: activity.status <= 1,
              hollow: activity.status === 2
            }"
          >
            <div class="content">
              <div class="top">
                <div class="name">
                  <div class="nodeName">{{ activity.activityName }}</div>
                  <div class="userName">{{ activity.assigneeName }}</div>
                </div>
                <div class="time">{{ activity.createTime }}</div>
              </div>
              <div class="bottom">
                <div
                  class="normal"
                  :class="{ successful: activity.status <= 1 }"
                >
                  {{ activity.comment || '审批中' }}
                </div>
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </div>
    <div v-if="activeName === '3'">
      <!-- 变更记录 -->
      <el-card class="search-content" shadow="never">
        <div slot="header" class="clearfix">
          <span>变更记录</span>
        </div>
        <el-table
          v-loading="loading"
          :data="queryParams.totalOrderRecordVoList"
          element-loading-text="Loading"
          highlight-current-row
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="变更人" prop="createUserName" />
          <el-table-column label="总结算单编号" prop="totalOrderNo" />
          <el-table-column label="月结算单编号" prop="orderNo" />
          <el-table-column label="变更项" prop="updateItem" />
          <el-table-column label="变更前" prop="updateBeforeItem" />
          <el-table-column label="变更后" prop="updateAfterItem" />
        </el-table>
      </el-card>
    </div>
    <!-- 打印 -->
    <PrintComponent
      :visible.sync="isShowPrint"
      :print-loading="printLoading"
      :all-data-lit="printData"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import PrintComponent from '../printComponent'
// 钢筋
import reinforcing from './tableList/reinforcing.vue'
// 一般材料
import generalClearing from './tableList/generalClearing.vue'
// 一般材料按信息价除税下浮
import generalClearingTax from './tableList/generalClearingTax.vue'
// 参考网价结算单
import referenceWangJia from './tableList/referenceWangJia.vue'
// 混凝土结算单
import conCreteStatement from './tableList/conCreteStatement.vue'
// 租赁类材料
import rentalMaterials from './tableList/rentalMaterials.vue'
import FileUpload from '@/components/FileUploadsuccess'
import { getToken } from '@/utils/auth' // get token from cookie
import { chineseNumber } from '@/utils/validate'
import {
  getInfo,
  getCumulativeSettlementAmount,
  getFlowRecord,
  updatePrintQuantity
} from '@/api/settlement/test'
export default {
  name: '',
  components: {
    reinforcing,
    generalClearing,
    generalClearingTax,
    referenceWangJia,
    conCreteStatement,
    rentalMaterials,
    FileUpload,
    PrintComponent
  },
  data() {
    return {
      isShowPrint: false,
      printLoading: false,
      chineSize: chineseNumber,
      printData: [],
      taxReduceUnitTotalPrice: 0,
      taxIncludeUnitTotalPrice: 0,
      fileType: ['xls', 'xlsx', 'doc', 'docx', 'pdf', 'jpg', 'png'],
      upload: {
        // 设置上传的请求头部
        headers: {
          access_token: getToken()
        },
        // 上传的地址
        url:
          process.env.VUE_APP_BASE_API +
          '/settlement-service/totalSettlementOrder/uploadFile'
        // 上传内容
      },
      fileList: [],
      ListDTOS: [],
      tableData: [],
      processKey: 'processSettlementMonthly',
      dialogVisible: false,
      activeName: '1',
      ids: '', // 穿过来的id
      show: false,
      radio: 3, // 单选
      editableTabsValue: 'first', // 切换
      editableTabs: [
        {
          title: '总单',
          name: 'first'
        }
      ],
      activities: [],
      labelPosition: 'top',
      headerTitle: '', // 头部标题
      queryParams: {},
      loading: false,
      listForm: {}, // 表格数据
      listType: 1,
      isSelectNode: false,
      personnelList: [],
      ObjList: {},
      objShow: false,
      id: '',
      projectManager: null,
      itemVoList: [],
      processInstanceId: null,
      amounts: 0 // 特殊金额的总和
    }
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '月度结算单'
    this.id = this.$route.query.id
  },
  created() {
    this.getInfo()
  },
  computed: {
    ...mapGetters(['projectInformation'])
  },
  methods: {
    // 打印
    handerPrintData() {
      this.printData = []
      updatePrintQuantity({ orderId: this.listForm.id }).then((res) => {
        this.isShowPrint = true
        this.printData.push(this.listForm)
      })
    },
    async onTabAction(tab) {
      this.activeName = tab.name
      if (this.activeName === '2') {
        const params = {
          id: this.processInstanceId
        }
        const res = await getFlowRecord(params)
        if (res.status === 200) {
          this.activities = res.data.sort((a, b) =>
            a.createTime.localeCompare(b.createTime)
          )
          console.log(this.activities)
        }
      }
    },
    // 上传回显
    fileInfoDTOS() {
      if (this.queryParams.fileInfoDTOList.length > 0) {
        var arr = this.queryParams.fileInfoDTOList
        this.fileList = arr.map((item) => {
          return {
            name: item.fileName,
            url: item.fileUrl
          }
        })
      }
    },
    // 计算
    calculate() {
      var returnTotal = 0 // 退货不含税
      var exchangeTotal = 0 // 换货不含税
      var ReceivingTotal = 0 // 收货不含税
      var returnTotal1 = 0 // 退货含税
      var exchangeTotal1 = 0 // 换货含税
      var ReceivingTotal1 = 0 // 收货含税
      var loss = 0 // 损失数量租赁的
      var compensation = 0 // 赔偿单价租赁的
      var amountPaid = 0 // 赔偿总价租赁的
      var T = 0 // 退货数量
      var H = 0 // 换货数量
      var S = 0 // 收货数量
      var G = 0 // //供货数量（最终结算的数量）
      if (this.listType === 1) {
        // 租赁返回的数组
        if (this.queryParams.type === 6) {
          this.itemVoList = this.listForm.rentalItemVoList
        }
        // 一般材料返回的
        if (this.queryParams.type === 2) {
          this.itemVoList = this.listForm.generalItemVoList
        }
        // 钢筋
        if (this.queryParams.type === 1) {
          this.itemVoList = this.listForm.rebarItemVoList
        }
        // 混凝土
        if (this.queryParams.type === 5) {
          this.itemVoList = this.listForm.concreteItemVoList
        }
        // 一般材料按信息价除税下浮结算单物资列表
        if (this.queryParams.type === 3) {
          this.itemVoList = this.listForm.floatingItemVoList
        }
        // 参考网价结算单物资列表
        if (this.queryParams.type === 4) {
          this.itemVoList = this.listForm.netPriceItemVoList
        }
        // 不含增值税的金额
        // type识别标识 1:退货, 2:换货, 3:收货
        this.itemVoList.forEach((item) => {
          if (item.lostDamage && item.compensationUnitPrice) {
            loss += item.compensationUnitPrice * item.lostDamage
            compensation += item.otherExpenses
            item.compensationExpenses =
              item.compensationUnitPrice * item.lostDamage
            item.monthlySettlementExpenses =
              item.taxIncludeUnitTotalPrice +
              item.compensationUnitPrice * item.lostDamage +
              item.otherExpenses
          }
          if (item.type === 1) {
            returnTotal += item.taxReduceUnitTotalPrice // 不含税
            returnTotal1 += item.taxIncludeUnitTotalPrice // 含税
            T += item.amount
          }
          if (item.type === 2) {
            exchangeTotal += item.taxReduceUnitTotalPrice // 不含税
            exchangeTotal1 += item.taxIncludeUnitTotalPrice // 含税
            H += item.amount
          }
          if (item.type === 3) {
            ReceivingTotal += item.taxReduceUnitTotalPrice // 不含税
            ReceivingTotal1 += item.taxIncludeUnitTotalPrice // 含税
            S += item.amount
          }
        })
        G = S - H - T
        this.$set(this.listForm, 'supplyQuantity', G) // 供货数量（最终结算的数量）
        amountPaid = loss + compensation // 租赁的
        var amount = this.amounts // 特殊金额
        this.taxReduceUnitTotalPrice =
          ReceivingTotal - returnTotal - exchangeTotal + amountPaid + amount
        this.taxIncludeUnitTotalPrice =
          ReceivingTotal1 - returnTotal1 - exchangeTotal1 + amountPaid + amount
        this.$set(
          this.queryParams,
          'settlementAmtNoTax',
          this.taxReduceUnitTotalPrice.toFixed(2)
        ) // 不含税
        this.$set(
          this.queryParams,
          'settlementAmtTax',
          this.taxIncludeUnitTotalPrice.toFixed(2)
        ) // 含税
        this.getCumulativeSettlementAmount() // 累计金额
      }
      if (this.listType === 2) {
        // 副单a数据
        this.queryParams.settlementAmtNoTax =
          this.queryParams.settlementOrderSubsidiaryVos[0].settlementAmtNoTax
        this.queryParams.settlementAmtTax =
          this.queryParams.settlementOrderSubsidiaryVos[0].settlementAmtTax
        this.queryParams.cumSettlementAmtNoTax =
          this.queryParams.settlementOrderSubsidiaryVos[0].cumSettlementAmtNoTax
        this.queryParams.cumSettlementAmtTax =
          this.queryParams.settlementOrderSubsidiaryVos[0].cumSettlementAmtTax
      }
      if (this.listType === 3) {
        // 副单b数据
        this.queryParams.settlementAmtNoTax =
          this.queryParams.settlementOrderSubsidiaryVos[1].settlementAmtNoTax
        this.queryParams.settlementAmtTax =
          this.queryParams.settlementOrderSubsidiaryVos[1].settlementAmtTax
        this.queryParams.cumSettlementAmtNoTax =
          this.queryParams.settlementOrderSubsidiaryVos[1].cumSettlementAmtNoTax
        this.queryParams.cumSettlementAmtTax =
          this.queryParams.settlementOrderSubsidiaryVos[1].cumSettlementAmtTax
      }
    },
    // 累计金额
    getCumulativeSettlementAmount() {
      var form = {}
      form.contractId = this.queryParams.contractId
      form.orderId = this.$route.query.id
      form.projectId = this.projectInformation.orgId
      getCumulativeSettlementAmount(form).then((res) => {
        if (res.status === 200) {
          // 含增值税的金额
          this.queryParams.cumSettlementAmtTax =
            Number(this.queryParams.settlementAmtTax) +
            res.data.cumSettlementAmtTax
          // 不含增值税的金额
          this.queryParams.cumSettlementAmtNoTax =
            Number(this.queryParams.settlementAmtNoTax) +
            res.data.cumSettlementAmtNoTax
          // 大小写 不含增值税的金额
          this.queryParams.cumSettlementAmtNoTaxWords = this.chineSize(
            this.queryParams.cumSettlementAmtNoTax
          )
          // 大小写 含增值税的金额
          this.queryParams.cumSettlementAmtTaxWords = this.chineSize(
            this.queryParams.cumSettlementAmtTax
          )
          // 大小写 本月结算金额大写（含增值)
          this.queryParams.settlementAmtTaxWords = this.chineSize(
            this.queryParams.settlementAmtTax
          )
          // 大小写 本月结算金额大写（不含增值)
          this.queryParams.settlementAmtNoTaxWords = this.chineSize(
            this.queryParams.settlementAmtNoTax
          )
        }
      })
    },
    // 钢筋
    reinforcing(data) {
      this.queryParams = data
      this.queryParams.rebarDTOList = data.rebarItemVoList
      this.calculate()
    },
    // 一般材料
    generalClearing(data) {
      this.queryParams = data
      this.queryParams.generalDTOList = data.generalItemVoList
      this.calculate()
    },
    // 混凝土结算单
    conCreteStatement(data) {
      this.queryParams = data
      this.queryParams.concreteDTOList = data.concreteItemVoList
      this.calculate()
    },
    // 参考网价结算单物资列表
    referenceWangJia(data) {
      this.queryParams = data
      this.queryParams.netPriceDTOList = data.netPriceItemVoList
      this.calculate()
    },
    // 一般材料按信息价除税下浮
    generalClearingTax(data) {
      this.queryParams = data
      this.queryParams.floatingDTOList = data.floatingItemVoList
      this.calculate()
    },
    // 租赁类材料
    rentalMaterials(data) {
      this.queryParams = data
      this.queryParams.rentalDTOList = data.rentalItemVoList
      this.calculate()
    },
    // tab切换
    handleClick(tab) {
      if (tab.name === 'first') {
        // 主单
        this.listForm = this.queryParams
        this.listType = 1 // 主单
        this.calculate()
      }
      if (tab.name === 'two') {
        // 副单
        this.listType = 2 // a单
        this.listForm = this.queryParams.settlementOrderSubsidiaryVos[0] // 副单数据a
        this.calculate()
      }
      if (tab.name === 'three') {
        // 副单
        this.listType = 3 // b单
        this.listForm = this.queryParams.settlementOrderSubsidiaryVos[1] // 副单数据b
        this.calculate()
      }
    },
    handleClose() {
      this.dialogVisible = false
    },
    back() {
      this.$router.push({
        path: '/settlement/abschluss',
        query: { activeName: 'second' }
      })
    },
    // 月度结算单列表
    getInfo() {
      getInfo(this.$route.query.id).then((res) => {
        if (res.status === 200) {
          this.processInstanceId = res.data.processInstanceId
          this.queryParams = res.data
          this.listForm = this.queryParams
          this.amounts = this.queryParams.totalOtherAmounts
          if (
            res.data.processApprovalJson === '{}' ||
            res.data.processApprovalJson === null
          ) {
            this.objShow = false
          } else {
            this.objShow = true
          }
          if (this.queryParams.fileInfoDTOList) {
            this.fileInfoDTOS()
          }
          if (res.data.splitFlag === 1) {
            this.editableTabs.push(
              {
                title: 'A单',
                name: 'two'
              },
              {
                title: 'B单',
                name: 'three'
              }
            )
          }
          this.editableTabsValue = 'first'
        }
      })
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
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    .search-btn {
      display: flex;
      justify-content: flex-end;
      margin-right: 16px;
    }
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
}
.tab {
  margin-top: 8px;
}
.totalText {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
  line-height: 20px;
}
::v-deep.el-button {
  margin-left: 0em;
}
.dropdownLeft {
  margin-right: 16px;
}
.search-content {
  margin: 16px;
}
.cardText {
  margin-top: 16px;
  background-color: #fafafa;
}
::v-deep .el-form-item {
  margin-bottom: 0em;
}
::v-deep.el-form--label-top .el-form-item__label {
  padding: 0em;
}
.xian {
  border: 1px dashed #d9d9d9;
  margin-top: 24px;
}
.amount {
  height: 40px;
  line-height: 40px;
}
.timeline {
  margin-left: 1%;
}
.inputText {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #262626;
  margin-left: -100px;
  height: 32px;
  line-height: 32px;
}
.questionBox {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
}
.buttonRow {
  display: flex;
  align-content: center;
  flex-direction: row;
  justify-content: center;
}
</style>
