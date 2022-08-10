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
          <el-button
            v-if="queryParams.splitFlag === 0"
            @click="SeparateBill"
          >拆单</el-button>
          <el-button
            v-if="queryParams.splitFlag === 1"
            @click="cancelSplitting"
          >撤拆</el-button>
          <el-button @click="back">取消</el-button>
          <el-dropdown class="dropdownLeft" @command="handleCommand">
            <el-button>··· </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="save">保存</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button @click="dialog">提交</el-button>
          <!-- <el-button @click="commitAndLock">提交</el-button> -->
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
        <el-tabs v-model="activeName">
          <el-tab-pane label="结算信息" name="1" />
          <el-tab-pane label="审批信息" name="2" />
          <el-tab-pane label="变更记录" name="3" />
        </el-tabs>
      </div>
    </div>
    <div v-show="activeName === '1'">
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
        <el-form
          ref="tableForm"
          :model="tableForm"
          :rules="tableForm.rules"
          size="small"
        >
          <div class="questionBox">
            <div>
              本次结算金额明细
              <el-tooltip content="此金额为含税金额" placement="top">
                <svg-icon icon-class="qusetion" />
              </el-tooltip>
            </div>

            <div>
              <el-button
                type="primary"
                plain
                @click="addTable"
              >新增一行</el-button>
            </div>
          </div>
          <el-table
            :data="tableForm.list"
            style="width: 100%; margin-top: 12px"
          >
            <el-table-column align="center" label="序号" width="95">
              <template slot-scope="scope">
                {{ scope.$index + 1 }}
              </template>
            </el-table-column>
            <el-table-column prop="type" label="明细项" width="180">
              <template slot-scope="{ row }">
                <el-select
                  v-model="row.type"
                  placeholder="请选择"
                  style="width: 70%"
                  clearable
                >
                  <el-option
                    v-for="item in getDictionaryValue('spSettlementTy')"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="含税总金额（元）">
              <template slot-scope="{ row, $index }">
                <el-form-item
                  :prop="`list[${$index}]` + '.amount'"
                  :rules="tableForm.rules.amount"
                >
                  <el-input
                    v-model.number="row.amount"
                    type="number"
                    style="width: 70%"
                    placeholder="请输入"
                    @blur="amount(row)"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="taxRate" label="税率%">
              <template slot-scope="{ row, $index }">
                <el-form-item
                  :prop="`list[${$index}]` + '.taxRate'"
                  :rules="tableForm.rules.taxRate"
                >
                  <el-input
                    v-model.number="row.taxRate"
                    style="width: 70%"
                    placeholder="请输入"
                    @blur="amount(row)"
                  />
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="差补说明">
              <template slot-scope="{ row }">
                <el-input
                  v-model="row.remark"
                  style="width: 70%"
                  placeholder="请输入"
                />
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="{ row, $index }">
                <el-button
                  type="text"
                  size="small"
                  @click="del(row, $index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <el-form ref="queryForm" :model="queryParams" label-width="120px">
          <el-row :gutter="20" style="padding-top: 24px">
            <el-col :span="12">
              <el-row :gutter="20" style="padding-top: 8px">
                <el-col :span="24">
                  <el-form-item
                    label="本次结算其他金额（含税）："
                    label-width="250px"
                  >
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
                  @getFileList="getFileList"
                  @delFile="delFile"
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
    <div v-show="activeName === '2'">
      <!-- 审批信息 -->
      <el-card class="search-content" shadow="never">
        <div slot="header" class="clearfix">
          <span>审批信息</span>
        </div>
        <SelectNode
          v-if="projectManager || approvalInfosShow"
          :is-radio="true"
          :process-key="processKey"
          :all-person="projectManager"
          @selectPersonnel="selectPersonnel"
        />
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span
        v-if="queryParams.splitFlag === 0"
      >该结算单未拆单，是否确认保存此页面数据后进行拆单吗?</span>
      <span v-if="queryParams.splitFlag === 1">提交后结算单数据锁定</span>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="margin-left: 10px"
          @click="handleClose"
        >取 消</el-button>
        <el-button
          v-if="queryParams.splitFlag === 0"
          type="primary"
          style="margin-left: 10px"
          @click="cancel"
        >否</el-button>
        <el-button
          v-if="queryParams.splitFlag === 1 || queryParams.splitFlag === 0"
          type="primary"
          style="margin-left: 10px"
          @click="confirm"
        >是</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SelectNode from '@/components/selectNode'
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
import { getToken } from '@/utils/auth' // get token from cookie
import { chineseNumber } from '@/utils/validate'

import FileUpload from '../components/FileUpload'
import {
  getInfo,
  updatePrintQuantity,
  saveSplitOrderSubsidiary,
  update,
  cancelSplitting,
  commitAndLock,
  getApprovalInfo,
  getCumulativeSettlementAmount
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
    SelectNode,
    FileUpload
  },
  data() {
    return {
      approvalInfosShow: false,
      fileType: ['xls', 'xlsx', 'doc', 'docx', 'pdf', 'jpg', 'png'],
      chineSize: chineseNumber,
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
      labelPosition: 'top',
      headerTitle: '', // 头部标题
      queryParams: {
        orderNo: ''
      },
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
      amounts: 0, // 特殊金额的总和含税
      amountsNo: 0, // 特殊金额的总和不含税
      tableForm: {
        rules: {
          amount: [{ required: true, message: '不能为空', trigger: 'blur' }],
          taxRate: [{ required: true, message: '不能为空', trigger: 'blur' }]
        },
        list: [{}] // 表格数据
      }
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
    // 成功回调
    getFileList(fileList) {
      this.ListDTOS = fileList.map((item) => {
        return {
          fileName: item.name,
          fileUrl: item.url
        }
      })
      this.queryParams.fileInfoDTOList = this.ListDTOS // 上传的附件
    },
    // 删除回调
    delFile(fileList) {
      this.ListDTOS = fileList.map((item) => {
        return {
          fileName: item.name,
          fileUrl: item.url
        }
      })
      this.queryParams.fileInfoDTOList = this.ListDTOS // 上传的附件
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
    // 新增行
    addTable() {
      this.queryParams.otherExpensesList.push({
        orderId: this.queryParams.id
      })
    },
    // 添加一行计算
    amount(row) {
      var amounts = 0
      var amountsNo = 0
      if (row.amount && row.taxRate) {
        this.queryParams.otherExpensesList.forEach((item) => {
          if (item.amount && item.taxRate) {
            item.amountNoTax = item.amount * (1 - item.taxRate / 100)
            amounts += item.amount
            amountsNo += item.amount * (1 - item.taxRate / 100)
          }
        })
        this.amountsNo = amountsNo.toFixed(2)
        this.amounts = amounts
        this.$set(this.queryParams, 'totalOtherAmounts', amounts) // 特殊金额总和含税
        this.$set(this.queryParams, 'totalOtherAmountsNoTax', amountsNo) // 特殊金额总和不含税
        this.calculate()
      }
    },
    // 删除一行
    del(row, index) {
      var amounts = 0
      var amountsNo = 0
      this.queryParams.otherExpensesList.splice(index, 1)
      if (row.amount && row.taxRate) {
        this.queryParams.otherExpensesList.forEach((item) => {
          if (item.amount && item.taxRate) {
            item.amountNoTax = item.amount * (1 - item.taxRate / 100)
            amounts += item.amount
            amountsNo += item.amount * (1 - item.taxRate / 100)
          }
        })
        this.amounts = amounts
        this.amountsNo = amountsNo.toFixed(2)
        this.$set(this.queryParams, 'totalOtherAmounts', amounts) // 特殊金额总和
        this.$set(this.queryParams, 'totalOtherAmountsNoTax', amountsNo) // 特殊金额总和
        this.calculate()
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
      var taxReduceUnitTotalPrice = 0
      var taxIncludeUnitTotalPrice = 0
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
        taxReduceUnitTotalPrice =
          ReceivingTotal - returnTotal - exchangeTotal + amountPaid + amount
        taxIncludeUnitTotalPrice =
          ReceivingTotal1 - returnTotal1 - exchangeTotal1 + amountPaid + amount
        this.$set(
          this.queryParams,
          'settlementAmtNoTax',
          taxReduceUnitTotalPrice.toFixed(2)
        ) // 不含税
        this.$set(
          this.queryParams,
          'settlementAmtTax',
          taxIncludeUnitTotalPrice.toFixed(2)
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
    dialog() {
      if (this.personnelList.length > 0 || this.isSelectNode) {
        const isMeet = this.personnelList.every((item) => {
          return item.personnel && item.personnel.length > 0
        })
        if(isMeet){
            this.dialogVisible = true
        }else{
          this.$message({
            message: '请选择对应节点的审批人后,在进行操作!',
            type: 'warning'
          });
          return ;
        }
      } else {
        this.$message({
          message: '请选择对应节点的审批人后,在进行操作!',
          type: 'warning'
        });
        return ;
      }
    },
    // 获取审批信息审批人
    async getApprovalInfos() {
      const params = {
        id: this.id,
        type: 1
      }
      const res = await getApprovalInfo(params)
      if (res.status === 200) {
        this.projectManager = res.data
      }
    },
    // 选择人员
    selectPersonnel(data, isSelectNode) {
      this.isSelectNode = isSelectNode
      this.personnelList = data
      console.log(data)
      if (this.personnelList.length > 0 || this.isSelectNode) {
        const isMeet = this.personnelList.every((item) => {
          return item.personnel && item.personnel.length > 0
        })
        if (isMeet) {
          const obj = {}
          this.personnelList.forEach((item) => {
            //const arr = item.personnel.map((items) => items.mainCode)
            //obj[item.assignee] = arr.join(',')
            const mainCode = item.personnel.map((items) => items.mainCode)
            console.log('mainCode',mainCode)
            obj[item.assignee] = mainCode.join(',')

          })
          this.ObjList = obj
          this.objShow = true
          console.log('---',this.ObjList)
          this.queryParams.variable = this.ObjList // 审批选择的人员信息
        } else {
          this.objShow = false
        }
      }
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
    // 不拆单提交弹窗
    cancel() {
      var that = this
      if (!that.objShow) {
        that.$message({
          message: '请选择对应节点的审批人后,在进行操作!',
          type: 'warning'
        })
        return
      }
      // 保存
      that.$refs['tableForm'].validate((valid) => {
        if (valid) {
          update(that.queryParams).then((res) => {
            if (res.status === 200) {
              that.handleClose()
              that.commitAndLock() // 提交
            }
          })
        } else {
          this.$message({
            message: '请填写完整信息!'
          })
        }
      })
    },
    // 拆单提交弹窗
    confirm() {
      var that = this
      if (!that.objShow) {
        that.$message({
          message: '请选择对应节点的审批人后,在进行操作!',
          type: 'warning'
        })
        return
      }
      // 保存
      console.log(that.$refs['tableForm'])
      that.$refs['tableForm'].validate((valid) => {
        if (valid) {
          update(that.queryParams).then((res) => {
            if (res.status === 200) {
              that.SplitOrderSubsidiary() // 拆单
              that.handleClose()
              that.commitAndLock() // 提交
            }
          })
        } else {
          this.$message({
            message: '请填写完整信息!'
          })
        }
      })
    },
    // 月度结算单列表
    getInfo() {
      getInfo(this.$route.query.id).then((res) => {
        if (res.status === 200) {
          this.queryParams = res.data
          this.listForm = this.queryParams
          this.tableForm.list = res.data.otherExpensesList
          this.amounts = this.queryParams.totalOtherAmounts
          if (
            res.data.approvalInfoMap === '{}' ||
            res.data.approvalInfoMap === null
          ) {
            this.objShow = false
            this.approvalInfosShow = true
            this.calculate()
          } else {
            this.objShow = true
            this.queryParams.variable = this.processApprovalJson // 审批选择的人员信息
            this.getApprovalInfos()
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
    },
    // 下拉
    handleCommand(command) {
      if (command === 'updatePrintQuantity') {
        this.updatePrintQuantity()
      }
      if (command === 'save') {
        if (!this.objShow) {
          this.$message({
            message: '请选择对应节点的审批人后,在进行操作!',
            type: 'warning'
          })
          return
        }
        this.renewal()
      }
    },
    // 打印次数
    async updatePrintQuantity() {
      await updatePrintQuantity(this.$route.query.id)
    },
    // 保存拆单数据
    async SplitOrderSubsidiary() {
      await saveSplitOrderSubsidiary(this.$route.query.id)
    },
    // 提交
    async commitAndLock() {
      const res = await commitAndLock(this.$route.query.id)
      if (res.status === 200) {
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.$router.push({
          path: '/settlement/abschluss',
          query: { activeName: 'second' }
        })
      }
    },
    // 保存
    renewal() {
      this.$refs['tableForm'].validate((valid) => {
        if (valid) {
          update(this.queryParams).then((res) => {
            if (res.status === 200) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.$router.push('/settlement/abschluss')
            }
          })
        } else {
          this.$message({
            message: '请填写完整信息!'
          })
        }
      })
    },
    // 取消拆单
    cancelSplitting() {
      cancelSplitting(this.$route.query.id).then((res) => {
        this.editableTabs = [
          {
            title: '总单',
            name: 'first'
          }
        ]
        this.editableTabsValue = 'first'
        this.$message({
          type: 'success',
          message: '操作成功!'
        })
        this.getInfo()
        // 拆单后回到主单
        this.listForm = this.queryParams
        this.listType = 1
      })
    },
    // 拆单按钮
    SeparateBill() {
      this.$refs['tableForm'].validate((valid) => {
        if (valid) {
          this.queryParams.splitFlag = 1
          // 0 是没有拆单  1是拆单
          var id = this.$route.query.id
          update(this.queryParams).then((res) => {
            if (res.status === 200) {
              this.$message(res.msg)
              getInfo(id).then((res) => {
                if (res.status === 200) {
                  this.queryParams = res.data
                  this.listForm = this.queryParams
                  this.tableForm.list = res.data.otherExpensesList
                  if (
                    res.data.approvalInfoMap === '{}' ||
                    res.data.approvalInfoMap === null
                  ) {
                    this.objShow = false
                  } else {
                    this.objShow = true
                    this.queryParams.variable = this.processApprovalJson // 审批选择的人员信息
                    this.getApprovalInfos()
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
          })
        } else {
          this.$message({
            message: '请填写完整信息!'
          })
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
