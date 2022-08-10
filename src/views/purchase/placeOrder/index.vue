<template>
  <div v-loading="loading" class="totalPlan-container">
    <div style="margin-bottom: 75px">
      <div v-show="isApproveShow && !submitSuccess">
        <div class="totalPlanTop">
          <div style="font-weight: 600">订单编号：{{ placeDetailData.preOrderCode }}</div>
          <div class="project">
            <div class="name">项目名称：{{ placeDetailData.projName }}</div>
            <!-- <div class="switch-svg"><svg-icon icon-class="switch" /></div> -->
          </div>
        </div>
        <el-card class="pm">
          <div slot="header" class="clearfix">
            <span style="font-weight: 600">基本信息</span>
          </div>
          <el-form
            ref="form"
            :model="form"
            :rules="rules"
            label-width="90px"
            style="margin-top: 20px"
            :label-position="labelPosition"
          >
            <p style="font-weight: 600">计划编号:{{ placeDetailData.needPlanCode }}</p>
            <el-row :gutter="20">
              <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="项目编码">
                  <el-input
                    v-model="placeDetailData.projCode"
                    disabled
                    placeholder="请输入"
                    clearable
                    style="width: 82%"
                  />
                </el-form-item>
              </el-col>
              <el-col style="padding-left: 5px" :xl="7" :lg="8" :xs="12" :sm="12" :md="12" v-if="pageType">
                <el-form-item label="供应商名称" prop="supplierId">
                  <el-select
                    v-model="form.supplierId"
                    v-loadmore="loadSupplierMore"
                    placeholder="请选择"
                    style="width: 80%"
                    filterable
                    clearable
                    @change="changeSupplier"
                  >
                    <el-option
                      v-for="(item,index) in selectSupplierList"
                      :key="index"
                      :label="item.supplierName"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col style="padding-left: 0px" :xl="7" :lg="8" :xs="12" :sm="12" :md="12" v-if="pageType">
                <el-form-item label="合同编号" prop="contractId">
                  <el-input
                    v-model="form.contractCode"
                    :validate-on-rule-change="ruleChange"
                    placeholder="请选择"
                    style="width: 80%"
                    @click.native="selContract"
                  />
                  <!--                  <el-select-->
                  <!--                    v-model="form.contractId"-->
                  <!--                    placeholder="请选择"-->
                  <!--                    @change="changeContract"-->
                  <!--                    v-loadmore="loadContractMore"-->
                  <!--                    style="width: 80%"-->
                  <!--                    filterable-->
                  <!--                    clearable-->
                  <!--                  >-->
                  <!--                    <el-option-->
                  <!--                      v-for="(item,index) in contractList"-->
                  <!--                      :key="index"-->
                  <!--                      :label="item.contractCode"-->
                  <!--                      :value="item.id"-->
                  <!--                    />-->
                  <!--                  </el-select>-->

                </el-form-item>
              </el-col>

              <!--        <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">-->
              <!--          <el-form-item label="供应商名称"  prop="supplierName">-->
              <!--            <el-input disabled v-model="form.supplierName"></el-input>-->
              <!--          </el-form-item>-->
              <!--        </el-col>-->
              <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12" v-if="pageType">
                <el-form-item label="联系人" prop="contacts">
                  <el-input
                    v-model="form.contacts"
                    :validate-on-rule-change="ruleChange"
                    placeholder="请输入"
                    clearable
                    style="width: 80%"
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12" v-if="pageType">
                <el-form-item label="联系电话" prop="contactPhone">
                  <el-input
                    v-model="form.contactPhone"
                    :validate-on-rule-change="ruleChange"
                    placeholder="请输入"
                    clearable
                    style="width: 80%"
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="收货地址" prop="receivingAddress">
                  <el-input
                    v-model="form.receivingAddress"
                    :validate-on-rule-change="ruleChange"
                    placeholder="请输入"
                    clearable
                    style="width: 80%"
                    :disabled="pageType"
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="收货人" prop="receivingUserName">
                  <el-input
                    v-model="form.receivingUserName"
                    :validate-on-rule-change="ruleChange"
                    placeholder="请输入"
                    style="width: 80%"
                    @click.native="selReceUser"
                    :disabled="pageType"
                    readonly
                  />
                </el-form-item>
              </el-col>
              <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="收货人联系方式" prop="receivingUserPhone">
                  <el-input
                    v-model="form.receivingUserPhone"
                    placeholder="请输入"
                    clearable
                    style="width: 80%"
                    :disabled="pageType"
                  />
                </el-form-item>
              </el-col>
              <el-col v-if="form.contractSettlementType===2" :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
                <el-form-item label="基准类型" prop="benchmarkType">
                  <el-input
                    disabled
                    placeholder="请输入"
                    :value="getDictionaryLabel(form.benchmarkType, 'benchmarkType')"
                    clearable
                    style="width: 80%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <div style="font-weight: 600; margin-top: 24px; margin-bottom: 16px">
              需用物资列表
            </div>
            <div>
              <!-- <el-button type="danger" plain @click="delS">批量删除</el-button> -->
            </div>
            <!-- <div style="margin-left: 90%">
              <el-button size="small" @click="addButton(3)">导 入</el-button>
              <el-button size="small" @click="addButton(3)">下载模板</el-button>
            </div> -->
            <AllDelete
              :checked="checked"
              :sel-num="selNum"
              @isCheck="isCheck"
              @del="del"
            />
            <el-table
              ref="multipleTable"
              :data="prucPreOrderItemDetailVOS"
              max-height="200"
              style="width: 100%; margin-top: 10px"
              :header-row-class-name="() => 'headerClass'"
              @selection-change="handleSelectionChange"
            >
              <el-table-column
                type="selection"
                width="50"
                align="left"
                fixed="left"
                :selectable="selected"
              />
              <el-table-column align="center" label="序号" width="95" fixed="left">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column prop="name" label="物资名称" />
              <el-table-column prop="planSpecification" label="计划规格类型">
                <!-- <template slot-scope="{ row }">
                  <el-input v-model="row.type" clearable />
                </template> -->
              </el-table-column>
              <el-table-column prop="contractSpecification" label="合同规格型号" />
              <el-table-column v-if="form.contractSettlementType===1 || form.contractSettlementType===4" prop="unit" label="单位">
                <!-- <template slot-scope="{ row }">
                  <el-input v-model="row.type" clearable />
                </template> -->
              </el-table-column>

              <el-table-column v-if="form.contractSettlementType===1||form.contractSettlementType===3||form.contractSettlementType===4" label="含税单价(元)">
                <template slot-scope="scope">
                  <span v-if="scope.row.excludeTaxPrice&&scope.row.excludeTaxPrice!==null&&scope.row.taxVal&&scope.row.taxVal!==null">{{ (parseFloat(scope.row.excludeTaxPrice) * (parseFloat(scope.row.taxVal)/100+1)).toFixed(2) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="单位" prop="unit" />
              <el-table-column prop="taxVal" label="税率(%)" />
              <el-table-column v-if="form.contractSettlementType===2" prop="floatingScale" label="浮动比例(%)" />
              <el-table-column v-if="form.contractSettlementType===2" prop="contractAppointmentPrice" label="合同约定浮动价(元)" />
              <el-table-column v-if="form.contractSettlementType===4" prop="contractUnit" label="计量方式" />
              <el-table-column v-if="form.contractSettlementType===4" prop="settlementMethod" label="结算方式">
                <template scope="scope">
                  {{ getDictionaryLabel(scope.row.settlementMethod, 'settlementMethod') }}
                </template>
              </el-table-column>
              <!--            <el-table-column prop="unitPrice" label="合同单价">-->
              <!--              &lt;!&ndash; <template slot-scope="{ row }">-->
              <!--                <el-input v-model="row.unitPrice" clearable />-->
              <!--              </template> &ndash;&gt;-->
              <!--            </el-table-column>-->
              <!--            <el-table-column prop="length" label="长(M)">-->
              <!--              <template slot-scope="scope">-->
              <!--                <el-input @input="formatNumLength(scope.row.length,scope.$index)" type="number" v-model="scope.row.length" clearable />-->
              <!--              </template>-->
              <!--            </el-table-column>-->
              <!--            <el-table-column prop="width" label="宽(M)">-->
              <!--              <template slot-scope="scope">-->
              <!--                <el-input @input="formatNumWidth(scope.row.width,scope.$index)" type="number" v-model="scope.row.width" clearable />-->
              <!--              </template>-->
              <!--            </el-table-column>-->
              <el-table-column prop="num" label="需用数量" width="150">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.num"
                    type="number"
                    aria-valuemax="scope.row.num"
                    clearable
                    @input="changeNum(scope.row,scope.$index)"
                    :disabled="pageType"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="entryDate" label="进场日期" width="270">
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.entryDate"
                    clearable
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    :picker-options="pickerOptions"
                    placeholder="选择日期"
                    style="width: 80%"
                    :disabled="pageType"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="type" label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.remark" clearable  :disabled="pageType"/>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right">
                <template slot-scope="{ row, $index }">
                  <!-- <el-button
                    size="mini"
                    type="text"
                    @click="handelCopy(row)"
                  >复制</el-button> -->
                  <el-popconfirm
                    title="确定要删除这一行吗？"
                    style="margin-left: 10px"
                    @onConfirm="handelDelete(row, $index)"
                  >
                    <el-button
                      slot="reference"
                      size="mini"
                      type="text"
                    >删除</el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
            <!-- <div class="addTableline" @click="addTable">
              <i class="el-icon-plus" />
              新增一行
            </div> -->
          </el-form>
        </el-card>
      </div>
      <div v-if="!isApproveShow && !submitSuccess">
        <SelectNode
          title="选择生产经理"
          pageName="指定生产经理"
          pageTip="当前仅选择生产经理，后续审批人由生产经理选择"
          :is-radio="true"
          :alteration="alteration"
          :process-key="processKey"
          @selectPersonnel="selectPersonnel"
        />
      </div>
    </div>

    <div v-if="!submitSuccess" class="footer">
      <div class="select_box">
        <!-- <div class="prompt_information">
            <svg-icon icon-class="complete" />
            <div class="information">已保存草稿</div>
            <div class="time">2分钟前</div>
          </div> -->
        <div class="action_buttons">
          <el-button @click="cancelOrder">取消</el-button>
          <el-button v-if="isApproveShow" :loading="saveLoadingBtn" @click="submitOrderDetail(1)">
            {{ saveLoadingBtn?"保存中":"保存" }}
          </el-button>
          <el-button v-if="!isApproveShow" @click="goBack">上一步</el-button>
          <el-button type="primary" :loading="submitLoadingBtn" @click="submitOrderDetail(6)">
            {{ submitLoadingBtn?"提交中":"提交" }}
          </el-button>
        </div>
      </div>
    </div>

    <div v-if="submitSuccess">
      <SubmitApprovalSuccessful
        :show-msg="showMsg"
        :back-list-path="backListPath"
      />
    </div>
    <ApproverRadioDialog
      title="选择收货人"
      :visible.sync="isShowApproverDialog"
      :select-all="selectAll"
      @selectSubmit="submitApproverDialog"
      @handleClose="closeApproverDialog"
    />
    <ContractDialog
      :visible.sync="isShowContractDialog"
      :data="contractList"
      :default-data="form.contractId"
      :supplier-name="supplierName"
      @handleClose="handleCloseContractDialog"
      @handleSuccess="changeContract"
      @submitContractParams="submitContractParams"
    />
  </div>
  <!-- </el-dialog> -->
</template>

<script>
import AllDelete from '@/components/AllDelete/AllDelete'
import ContractDialog from '@/views/purchase/components/ContractDialog'
import SubmitApprovalSuccessful from '@/views/purchase/components/submitApprovalSuccessful.vue'
import ApproverRadioDialog from '@/views/purchase/components/approverRadio'
import SelectNode from '@/components/selectNode'
import { placeDetail } from '@/api/purchase/preOrder'
import { getSupplierListByProjectId } from '@/api/purchase/mdmSupplier'
import { purchaseList, selectItemsByContractId } from '@/api/purchase/contract'
import { placeOrder, placeOrderItemsCheck, projectManagerCheckOrder } from '@/api/purchase/normalOrder'

export default {
  name: 'AddAndAdit',
  components: {
    SelectNode,
    SubmitApprovalSuccessful,
    ApproverRadioDialog,
    AllDelete,
    ContractDialog
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(date) {
          const zero = new Date().setHours(0, 0, 0, 0)
          if (date.getTime() < zero) {
            return true
          }
          return false
        }
      },
      ruleChange: true,
      isShowApproverDialog: false, // 选择收货人弹窗
      loading: true,
      placeDetailData: {}, // 下单数据详情
      prucPreOrderItemDetailVOS: [], // 下单的物资列表
      selectSupplierList: [], // 供应商列表
      contractList: [], // 合同列表
      supplierId: null, // 供应商id
      form: {
        contractId: null, // 合同id
        contacts: null, // 联系人
        contactPhone: null, // 联系人手机号
        supplierId: null, // 供应商id
        receivingAddress: null, // 收货地址
        receivingUser: null, // 收货人
        receivingUserPhone: null, // 收货人电话
        contractSettlementType: null, // 合同结算类型
        taxVal: null, // 税率
        receivingUserName: null, // 收货人姓名
        contractCode: null // 合同编号
      }, // 下单的数据
      selItems: [],
      interviewId: '',
      propData: [],
      isShow: false,
      labelPosition: 'top',
      disabled: false,
      rules: {
        // 规则
        supplierId: [{ required: true, message: '请选择供应商', trigger: 'change' }],
        contractId: [{ required: true, message: '请选择合同编号', trigger: 'change' }],
        contacts: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        contactPhone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
        receivingAddress: [{ required: true, message: '请输入收货地址', trigger: 'blur' }],
        receivingUserName: [{ required: true, message: '请选择收货人', trigger: 'blur' }],
        receivingUserPhone: [{ required: true, message: '请选择收货电话', trigger: 'blur' }]
      },
      queryParams: {},
      supplierPage: {
        page: 1,
        rows: 10,
        total: 0
      }, // 供应商分页信息
      contractPage: {
        page: 1,
        rows: 10,
        total: 0
      }, // 合同分页信息
      alteration: 1,
      processKey: 'process_cez0vrrd',
      approver: [], // 选中的审批人列表
      isApproveShow: true, // 是否显示选择审批人页面
      submitSuccess: false, // 是否提交成功
      showMsg: '', // 订单提交成功后跳转的提示语
      backListPath: '/purchase/order', // 订单提交成功后退回的页面路径
      submitLoadingBtn: false, // 提交按钮loding
      saveLoadingBtn: false, // 保存按钮loding
      contractAmountType: null, // 合同金额类型
      taxVal: null, // 税率
      selectAll: null, // 默认收货人
      selNum: 0, // 物资列表选中数量
      checked: false, // 是否选中
      isShowContractDialog: false, // 选择合同弹窗
      supplierName: null,
      contractParams: {}, // 合同搜索条件
      pageType: '',
      isBuyer: true,
    }
  },
  created() {
    this.getPlaceDetail()
    // this.getSupplierListByProjectId()
  },
  mounted() {
    console.log(this.$route.query.pageType)
    this.pageType = this.$route.query.pageType
    this.headerTitle = this.$route.name ? this.$route.name : '新增合同'
  },
  methods: {
    selected(row, index) {
      if (this.pageType) {
        return false // 不可勾选
      } else {
        return true // 可勾选
      }
    },
    // 合同弹窗关闭
    handleCloseContractDialog() {
      this.isShowContractDialog = false
    },
    // 批量删除
    delS(row, index) {
      this.prucPreOrderItemDetailVOS.splice(index, 1)
    },
    // 选中的审批人列表
    selectPersonnel(val) {
      console.log(val)
      this.approver = val
    },
    // 合同下拉触底监听
    loadContractMore() {
      if (this.contractList.length < this.contractPage.total) {
        this.contractPage.page += 1
        this.getcontractList()
      }
    },
    // 供应商下拉框触底监听
    loadSupplierMore() {
      if (this.selectSupplierList.length < this.supplierPage.total) {
        this.supplierPage.page += 1
        this.getSupplierListByProjectId()
      }
    },
    // 长度限制两位小数点
    formatNumLength(val, index) {
      let temp = val.toString()
      temp = temp.replace(/。/g, '.')
      temp = temp.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
      temp = temp.replace(/^\./g, '') // 验证第一个字符是数字
      temp = temp.replace(/\.{2,}/g, '') // 只保留第一个, 清除多余的
      temp = temp.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      temp = temp.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
      this.prucPreOrderItemDetailVOS[index].length = temp
    },
    // 宽限制两位小数点
    formatNumWidth(val, index) {
      let temp = val.toString()
      temp = temp.replace(/。/g, '.')
      temp = temp.replace(/[^\d.]/g, '') // 清除"数字"和"."以外的字符
      temp = temp.replace(/^\./g, '') // 验证第一个字符是数字
      temp = temp.replace(/\.{2,}/g, '') // 只保留第一个, 清除多余的
      temp = temp.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
      temp = temp.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
      this.prucPreOrderItemDetailVOS[index].width = temp
    },
    // 获取下单详情
    getPlaceDetail() {
      placeDetail(this.$route.query.id).then(res => {
        // 下单详情
        this.placeDetailData = res.data
        this.form.receivingAddress = res.data.receivingAddress // 收货地址
        this.form.receivingUser = res.data.receivingUser // 收货人
        this.form.receivingUserName = res.data.receivingUserName // 收货人姓名
        this.form.receivingUserPhone = res.data.receivingUserPhone // 收货人联系方式
        const obj = {
          mainCode: res.data.receivingUser,
          name: res.data.receivingUserName,
          phone: res.data.receivingUserPhone
        }
        this.selectAll = [obj]
        if (this.placeDetailData.prucPreOrderItemDetailVOS) {
          this.prucPreOrderItemDetailVOS = this.deepCopy(this.placeDetailData.prucPreOrderItemDetailVOS)
        }
        this.getSupplierListByProjectId()
        this.loading = false
      })
    },
    // 设置最大值
    changeNum(row, index) {
      if (row.num === null || row.num === '') {
        this.prucPreOrderItemDetailVOS[index].num = 0
      } else {
        if (parseFloat(row.num) > parseFloat(this.placeDetailData.prucPreOrderItemDetailVOS[index].num)) {
          this.prucPreOrderItemDetailVOS[index].num = this.placeDetailData.prucPreOrderItemDetailVOS[index].num
        }
      }
    },
    // 获取供应商
    getSupplierListByProjectId() {
      getSupplierListByProjectId({ projectId: this.placeDetailData.projId }).then(res => {
        this.selectSupplierList = res.data
      })
    },
    // 获取合同列表
    getContractList() {
      purchaseList({ ...{ pageNum: 1, pageSize: 100000, supplierId: this.form.supplierId }, ...this.contractParams }).then(res => {
        this.contractPage.total = res.data.total
        if (res.data.list) {
          this.contractList = res.data.list
        } else {
          this.contractList = []
        }
      })
    },
    // 供应商值改变获取合同
    changeSupplier(val) {
      this.selectSupplierList.forEach(item => {
        if (val === item.id) {
          this.supplierName = item.supplierName
        }
      })
      this.reductionOrderItemDetail()
      this.form.contractId = null
      this.form.contractCode = null
      this.form.contacts = null
      this.form.contactPhone = null
      this.form.supplierName = null
      this.form.contractSettlementType = null
      this.form.benchmarkType = null
      this.contractAmountType = null
      this.form.taxVal = null
      this.contractList = []
      for (let i = 0; i < this.selectSupplierList.length; i++) {
        if (this.selectSupplierList[i].id === val) {
          this.form.contacts = this.selectSupplierList[i].contactName
          this.form.contactPhone = this.selectSupplierList[i].phone
          break
        }
      }
      if (val !== null && val !== '') {
        purchaseList({ pageNum: 1, pageSize: 100000, supplierId: val }).then(res => {
          if (res.data.list) {
            this.contractList = res.data.list
          } else {
            this.contractList = []
          }
        })
      }
      this.$nextTick(() => this.$refs.form.clearValidate())
    },
    // 点击选择合同
    selContract() {
      if (!this.form.supplierId || this.form.supplierId === null) {
        this.$message.warning('请先选择供应商')
        return
      }
      this.isShowContractDialog = true
    },
    // 合同值改变更新物资列表
    changeContract(val) {
      this.form.contractId = val
      this.form.isExclude = null
      this.form.supplierName = null // 供应商名称
      this.form.contractSettlementType = null // 合同结算类型
      this.contractAmountType = null // 合同金额类型
      this.form.benchmarkType = null // 合同基准类型
      this.form.taxVal = null // 税率
      this.reductionOrderItemDetail()
      this.form.taxVal = null
      this.contractList.forEach(item => {
        if (item.id === val) {
          this.form.contractCode = item.contractCode
          this.form.supplierName = item.supplierName
          this.form.contractSettlementType = item.contractSettlementType
          this.form.benchmarkType = item.benchmarkType
          this.form.taxVal = item.taxVal
          this.form.isExclude = item.isExclude
          this.form.floatingScale = item.floatingScale
        }
      })
      if (val !== null && val !== '') {
        selectItemsByContractId(val).then(res => {
          if (res.data) {
            for (let i = 0; i < res.data.length; i++) {
              for (let j = 0; j < this.prucPreOrderItemDetailVOS.length; j++) {
                if (res.data[i].itemId === this.prucPreOrderItemDetailVOS[j].id && res.data[i].specifications === this.prucPreOrderItemDetailVOS[j].planSpecification) {
                  this.prucPreOrderItemDetailVOS[j].contractSpecification = res.data[i].specifications
                  this.prucPreOrderItemDetailVOS[j].taxVal = this.form.taxVal
                  this.prucPreOrderItemDetailVOS[j].excludeTaxPrice = res.data[i].excludeTaxPrice
                  this.prucPreOrderItemDetailVOS[j].floatingScale = this.form.floatingScale
                  this.prucPreOrderItemDetailVOS[j].contractUnit = res.data[i].unit
                  this.prucPreOrderItemDetailVOS[j].settlementMethod = res.data[i].settlementMethod
                  if (this.form.isExclude === 1) {
                    // 含税
                    this.prucPreOrderItemDetailVOS[j].contractAppointmentPrice = res.data[i].containTaxPrice
                  } else if (this.form.isExclude === 2) {
                    // 不含税
                    this.prucPreOrderItemDetailVOS[j].contractAppointmentPrice = res.data[i].excludeTaxPrice
                  }
                }
              }
            }
          }
        })
      }
      this.isShowContractDialog = false
    },
    // 搜索合同
    submitContractParams(val) {
      this.contractParams = val
      this.getContractList()
    },
    // 还原物资中的合同信息
    reductionOrderItemDetail() {
      if (this.prucPreOrderItemDetailVOS !== null) {
        this.prucPreOrderItemDetailVOS.forEach(item => {
          item.contractSpecification = null
          item.excludeTaxPrice = null
          item.taxVal = null
          item.floatingScale = null
          item.contractAppointmentPrice = null
          item.contractUnit = null
          item.settlementMethod = null
        })
      }
    },
    // 上一步
    goBack() {
      this.isApproveShow = true
      this.isBuyer = true
      this.saveLoadingBtn = false
      this.submitLoadingBtn = false
    },
    // 下单
    submitOrderDetail(status) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
           if (this.selItems === null || this.selItems.length === 0) {
            this.$message.warning('请选择下单物资')
            return
          }
          for (let i = 0; i < this.selItems.length; i++) {
            if (this.selItems[i].num === 0 || this.selItems[i].num === '0' || this.selItems[i].num === null || this.selItems[i].num === '') {
              this.$message.warning('所选物资数量不能为0')
              return
            }
          }
          this.form.orderStatus = status
          this.form.status = status
          this.form.projId = this.placeDetailData.projId
          this.form.prucPreOrderId = this.$route.query.id
          const placeOrderItemDtos = []
          this.selItems.forEach(item => {
            const obj = {}
            obj.entryDate = item.entryDate
            obj.itemId = item.id
            obj.num = parseFloat(item.num)
            obj.planSpecification = item.planSpecification
            obj.remark = item.remark
            obj.taxVal = item.taxVal
            obj.contractSpecification = item.contractSpecification
            obj.excludeTaxPrice = item.excludeTaxPrice
            obj.settlementMethod = item.settlementMethod
            obj.contractUnit = item.contractUnit
            obj.name = item.name
            obj.unit = item.unit
            obj.floatingScale = item.floatingScale
            obj.contractAppointmentPrice = item.contractAppointmentPrice
            if (obj.num === 0) {
              this.$message.warning('下单物资数量不能为0')
              return
            }
            placeOrderItemDtos.push(obj)
          })
          this.form.placeOrderItemDtos = placeOrderItemDtos
          // 提交前验证
          if (this.isApproveShow && status === 6) {
              this.isApproveShow = false
              return
            } else if (!this.isApproveShow && status === 6) {
              if (!this.approver || this.approver === null || this.approver.length === 0) {
                this.$message.warning('请选择审批人信息')
                return
              }
              // 设置审批人
              const variable = {}
              this.approver.forEach(item => {
                if (item.personnel && item.personnel.length === 0) {
                  this.$message.warning('请选择审批人信息')
                  return
                }
                variable[item.assignee] = item.personnel[0].mainCode
              })
              this.form.variable = variable
            } else if (status === 1 && this.form.variable) {
              this.form.variable = undefined
            }
            // 如果选的是提交并且审批人信息为空
            if (status === 6 && (!this.approver || this.approver === null || this.approver.length === 0)) {
              this.$message.warning('请选择审批人信息')
              return
            }
            if (status === 6) {
              this.submitLoadingBtn = true
            } else {
              this.saveLoadingBtn = true
            }
            if (!this.isApproveShow) {
              this.form.projectProductionManager = this.approver[0].personnel[0].mainCode
            }
            this.placeOrder(status)
        } else {
          return
        }
      })
    },
    placeOrder (status) {
      console.log(this.form)
      debugger
      placeOrder(this.form).then(res => {
        if (res.status === 200) {
          if (status === 1) {
            this.$message.success('保存成功')
            this.showMsg = '当前订单已保存成功，点击下方按钮返回待采购单列表！'
            this.submitSuccess = true
          } else {
            this.$message.success('提交成功')
            this.showMsg = '当前订单已提交审批，请及时跟进审批进度！'
            this.submitSuccess = true
          }
        } else {
          this.$message.error(res.msg)
        }
        this.submitLoadingBtn = false
        this.saveLoadingBtn = false
      })
    },
    // 取消
    cancelOrder() {
      this.$router.go(-1)
    },
    // 下单物资多选
    handleSelectionChange(val) {
      if (val.length > 0) {
        this.checked = true
      } else {
        this.checked = false
      }
      this.selNum = val.length
      this.selItems = val
    },

    // 深拷贝
    deepCopy(obj, cache = []) {
      // 如果为普通数据类型，则直接返回，完成拷贝
      if (obj === null || typeof obj !== 'object') {
        return obj
      }
      // cache用来储存原始值和对应拷贝数据，在递归调用deepCopy函数时，如果本次拷贝的原始值在之前已经拷贝了，则直接返回储存中的copy值，这样的话就不用再循环复制本次原始值里面的每一项了。
      // 还有一个更为重要的作用，假如原始值里面嵌套两个引用地址相同的对象，使用cache可以保证拷贝出来的copy值里面两个对象的引用地址也相同。
      // 如果find查找的是一个空数组，则不会执行
      const hit = find(cache, c => c.original === obj)
      if (hit) {
        return hit.copy
      }
      // 定义拷贝的数据类型
      const copy = Array.isArray(obj) ? [] : {}
      // 用来记录拷贝的原始值和copy值
      cache.push[{
        original: obj,
        copy
      }]
      // 递归调用深拷贝函数，拷贝对象中的每一个值
      Object.keys(obj).forEach(key => {
        copy[key] = this.deepCopy(obj[key], cache)
      })
      return copy
    },
    // getDetail(id) {
    //   this.loading = true;
    //   CheckPedestrianAreaInfo(this.id).then((res) => {
    //     this.form = { ...res.data };
    //     this.loading = false;
    //   });
    // },
    // 选择供应商弹窗
    supplier(row, type) {
      this.interviewId = row.id
      this.propData = row
      this.isShow = true
    },
    submitForm() {},
    // 新增行
    addTable() {
      this.list.push({ type: '' })
    },
    // 复制行
    handelCopy(row) {
      this.list.push({ ...row })
    },
    // 删除行
    handelDelete(row, index) {
      this.prucPreOrderItemDetailVOS.splice(index, 1)
    },
    // 关闭
    handleClose() {
      this.form = {}
      this.$emit('update:visible', false)
      if (this.$refs['form']) {
        this.$refs['form'].clearValidate()
      }
    },
    // 点击收货人
    selReceUser() {
      this.isShowApproverDialog = true
    },
    // 选择收货人弹窗
    submitApproverDialog(val) {
      if (val && val !== null) {
        this.form.receivingUser = val[0].mainCode
        this.form.receivingUserPhone = val[0].phone
        this.form.receivingUserName = val[0].name
        this.selectAll = val
        this.$nextTick(() => this.$refs.form.clearValidate())
      }
    },
    // 关闭收货人弹窗
    closeApproverDialog() {
      this.isShowApproverDialog = false
    },
    // 物资列表选中
    isCheck(val) {
      if (!val) {
        this.$refs.multipleTable.clearSelection()
      } else {
        if (this.selItems.length !== this.prucPreOrderItemDetailVOS.length) {
          this.prucPreOrderItemDetailVOS.forEach(item => {
            this.$refs.multipleTable.toggleRowSelection(item)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      }
    },
    // 物资列表删除
    del() {
      if (this.pageType) { 
        return
      }
      this.selItems.forEach(item => {
        this.prucPreOrderItemDetailVOS.forEach((item2, index) => {
          if (item.id === item2.id && item.planSpecification == item2.planSpecification) {
            this.prucPreOrderItemDetailVOS.splice(index, 1)
          }
        })
      })

      // this.$refs.multipleTable.clearSelection();
    }
    // 提交按钮
    // submitForm() {
    //   this.$refs["form"].validate((valid) => {
    //     if (valid) {
    //       if (this.form.id) {
    //         UpdatePedestrianAreaInfo(this.form).then((res) => {
    //           this.$modal.msgSuccess("修改成功");
    //           this.handleClose();
    //           this.$emit("submitForm");
    //         });
    //       } else {
    //         AddPedestrianAreaInfo(this.form).then((res) => {
    //           this.$modal.msgSuccess("添加成功");
    //           this.handleClose();
    //           this.$emit("submitForm");
    //         });
    //       }
    //     }
    //   });
    // },
  }
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
<style lang="scss" scoped>
::v-deep .el-card__body {
  padding: 0 20px 20px 20px;
}
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.totalPlan-container {
  .pm {
    margin: 16px;
    height: 780px;
  }
  .totalPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 75px;
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
  .table_box {
    margin: 16px;
    background: #fff;
    .table_content {
      padding: 19px 24px 24px 24px;
      box-sizing: border-box;
      margin-bottom: 16px;
      .addTableline {
        margin-top: 16px;
        width: 100%;
        height: 40px;
        border: 1px dashed#BFBFBF;
        font-size: 14px;
        font-weight: 400;
        color: #595959;
        line-height: 40px;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .addTableline {
    margin-top: 16px;
    width: 100%;
    height: 40px;
    border: 1px dashed#BFBFBF;
    font-size: 14px;
    font-weight: 400;
    color: #595959;
    line-height: 40px;
    text-align: center;
    &:hover {
      cursor: pointer;
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 64px;
    line-height: 64px;
    padding: 0 16px;
    box-sizing: border-box;
    background: #ffffff;
    box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
    .select_box {
      display: flex;
      float: right;
      .prompt_information {
        display: flex;
        align-items: center;
        .information {
          font-size: 14px;
          font-weight: 400;
          color: #595959;
          padding-left: 16px;
          padding-right: 8px;
          box-sizing: border-box;
        }
        .time {
          font-size: 12px;
          font-weight: 400;
          color: #bfbfbf;
        }
      }
      .action_buttons {
        box-sizing: border-box;
        padding-left: 16px;
      }
    }
  }
}
</style>
