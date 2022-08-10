<template>
  <div class="totalPlan-container">
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
        <el-row :gutter="20">
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="合同类型" prop="contractType">
              <el-select
                v-model="form.contractType"
                placeholder="请选择"
                style="width: 80%"
                clearable
              >
                <el-option
                  v-for="(item, index) in getDictionaryValue('contractType')"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="合同编号" prop="contractCode">
              <el-input
                v-model="form.contractCode"
                placeholder="请输入"
                clearable
                style="width: 82%"
                @blur="contractCodeChange"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="合同金额" prop="contractAmount">
              <el-input
                v-model="form.contractAmount"
                placeholder="请输入"
                clearable
                style="width: 81.4%"
              >
                <template slot="append">万</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="合同甲方" prop="organizationId">
              <el-select
                v-model="form.organizationId"
                placeholder="请选择"
                style="width: 80%"
                clearable
              >
                <el-option
                  v-for="(item, index) in partyA"
                  :key="index"
                  :label="item.orgName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="合同乙方" prop="supplierId">
              <el-select
                v-model="form.supplierId"
                placeholder="请选择"
                style="width: 80%"
                clearable
                @focus="supplier"
              >
                <el-option
                  v-for="item in tableData"
                  :key="item.id"
                  :label="item.supplierName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="合同价类型" prop="contractAmountType">
              <el-select
                v-model="form.contractAmountType"
                placeholder="请选择"
                style="width: 80%"
                clearable
                @change="htjType"
              >
                <el-option
                  v-for="item in getDictionaryValue(
                    'contractAmountType'
                  )"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="可使用分公司" prop="userIds">
              <el-select
                v-model="form.userIds"
                placeholder="请选择"
                style="width: 80%"
                clearable
                multiple
              >
                <el-option
                  v-for="(item, index) in partyA"
                  :key="index"
                  :label="item.orgName"
                  :value="item.id"
                  hidden
                />
                <!-- <el-option
                  :key="form.userIds"
                  :value="form.userIds"
                  :label="form.userIds"
                  hidden
                />
          <el-tree :data="partyA"
                   :props="defaultProps"
                   node-key="id"
                   accordion
                   highlight-current
                   @node-click="handleNodeClick"/> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="乙方法定代表人" prop="legalRepresentative">
              <el-input
                v-model="form.legalRepresentative"
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>

          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="月度付款比例" prop="monthPayPercent">
              <el-input
                v-model="form.monthPayPercent"
                placeholder="请输入"
                clearable
                style="width: 80%"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="结算周期" prop="organizationName">
              <el-select
                v-model="form.periodType"
                placeholder="请选择"
                style="width: 25%; margin-right: 2%"
                clearable
              >
                <el-option
                  v-for="(item, index) in getDictionaryValue('periodType')"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <span
                v-if="form.periodType == 1"
              >自本月1日00:00起至本月月末23:59结束</span>
              <span v-if="form.periodType == 2">本月: </span>
              <el-select
                v-if="form.periodType == 2"
                v-model="form.startDay"
                placeholder="请选择"
                style="width: 16%; margin-right: 3%"
                clearable
              >
                <el-option
                  v-for="(item, index) in list"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <span v-if="form.periodType == 2">次月: </span>
              <el-select
                v-if="form.periodType == 2"
                v-model="form.endDay"
                placeholder="请选择"
                style="width: 16%; margin-right: 3%"
                clearable
              >
                <el-option
                  v-for="(item, index) in list"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <!-- <el-date-picker
                v-if="form.periodType == 2"
                v-model="form.organizationName"
                type="daterange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 50%"
              /> -->
              <!-- <el-date-picker
                v-if="form.periodType == 1"
                v-model="form.organizationName"
                type="month"
                placeholder="选择月"
                style="width: 50%"
              /> -->
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="税率" prop="taxVal">
              <el-input
                v-model="form.taxVal"
                placeholder="请输入"
                clearable
                style="width: 80%"
              >
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="税率执行时间" prop="effectDate">
              <el-date-picker
                v-model="form.effectDate"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
              v-if="form.contractType == 1"
              label="结算类型"
              prop="settlementTypeId"
            >
              <el-select
                v-model="form.settlementTypeId"
                placeholder="请选择"
                style="width: 80%"
                clearable
              >
                <el-option
                  v-for="(item, index) in getDictionaryValue(
                    'settlementTypeId'
                  )"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="form.contractType == 2"
              label="结算类型"
              prop="settlementTypeId"
            >
              <el-select
                v-model="form.settlementTypeId"
                placeholder="请选择"
                style="width: 80%"
                clearable
              >
                <el-option
                  v-for="(item, index) in settlementTypeIds"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
              v-if="form.contractAmountType == 1"
              label="是否关联订单"
              prop="isRefOrder"
            >
              <el-radio-group v-model="form.isRefOrder">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <el-row>
            <el-col :span="6" :offset="18">
              <div style="display: inline-block; margin-right: 10px">
                <el-upload
                  :show-file-list="false"
                  :headers="headers"
                  :action="fileUploadUrl"
                  :on-success="fileUploadSuccess"
                  :on-error="fileUploadError"
                  :disabled="fileUploadBtnText == '正在上传'"
                  :before-upload="beforeFileUpload"
                >
                  <el-button
                    :icon="uploadBtnIcon"
                    :loading="fileUploadBtnText == '正在上传'"
                  ><i class="fa fa-lg fa-level-up" />{{
                    fileUploadBtnText
                  }}</el-button>
                </el-upload>
              </div>
              <el-button size="small" @click="xzmb">下载模板</el-button>
              <el-button
                size="small"
                type="primary"
                @click="addTable"
              >新增一行</el-button>
            </el-col>
          </el-row>
        </div>
        <el-table
          :data="form.prucContractItemList"
          max-height="300"
          style="width: 100%"
        >
          <el-table-column align="center" label="序号" width="95" fixed="left">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="物资大类" prop="big" fixed="left">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'prucContractItemList.' + $index + '.big'"
                :rules="form.rules.big"
              >
                <el-input
                  ref="inputDialog"
                  v-model="row.big"
                  placeholder="请选择"
                  clearable
                  @focus="focusInput(row, $index)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="small" label="物资小类">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'prucContractItemList.' + $index + '.small'"
                :rules="form.rules.small"
              >
                <el-input
                  ref="inputDialog"
                  v-model="row.small"
                  placeholder="请选择"
                  clearable
                  @focus="focusInput(row, $index)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="itemName" label="物料名称">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="'prucContractItemList.' + $index + '.itemName'"
                :rules="form.rules.itemName"
              >
                <el-input
                  ref="inputDialog"
                  v-model="row.itemName"
                  placeholder="请选择"
                  clearable
                  @focus="focusInput(row, $index)"
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="specifications" label="规格型号">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="`prucContractItemList[${$index}]` + '.specifications'"
                :rules="form.rules.specifications"
              >
                <el-input
                  v-model="row.specifications"
                  placeholder="请输入"
                  clearable
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            v-if="
              (form.contractType == 1 || form.contractType == 2) &&
                form.contractAmountType == 1
            "
            prop="unit"
            label="计量单位"
          >
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="`prucContractItemList[${$index}]` + '.unit'">
                <el-input v-model="row.unit" placeholder="请输入" clearable />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            v-if="
              (form.contractType == 1 || form.contractType == 2) &&
                form.contractAmountType == 1
            "
            prop="clearing"
            label="结算方式"
          >
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="`prucContractItemList[${$index}]` + '.clearing'"
              >
                <el-select
                  v-model="row.clearing"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in getDictionaryValue('clearingList')"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column
            v-if="
              (form.contractType == 1 || form.contractType == 2) &&
                form.contractAmountType == 1
            "
            prop="excludeTaxPrice"
            label="除税单价"
          >
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="`prucContractItemList[${$index}]` + '.excludeTaxPrice'"
                :rules="form.rules.excludeTaxPrice"
              >
                <el-input
                  v-model="row.excludeTaxPrice"
                  placeholder="请输入"
                  clearable
                />
              </el-form-item>
            </template>
          </el-table-column>
          <!-- <el-table-column
            v-if="
              (form.contractType == 1 || form.contractType == 2) &&
                form.contractAmountType == 2
            "
            prop="taxVal"
            label="税率"
          >
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="`prucContractItemList[${$index}]` + '.taxVal'"
                :rules="form.rules.taxVal"
              >
                <el-input v-model="row.taxVal" placeholder="请输入" clearable>
                  <template slot="append">%</template>
                </el-input>
              </el-form-item>
            </template>
          </el-table-column> -->
          <el-table-column
            v-if="
              (form.contractType == 1 || form.contractType == 2) &&
                form.contractAmountType == 2
            "
            prop="unitPrice"
            label="单价"
          >
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="`prucContractItemList[${$index}]` + '.unitPrice'"
                :rules="form.rules.unitPrice"
              >
                <el-input
                  v-model="row.unitPrice"
                  placeholder="请输入"
                  clearable
                />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注">
            <template slot-scope="{ row, $index }">
              <el-form-item
                :prop="`prucContractItemList[${$index}]` + '.remark'"
              >
                <el-input v-model="row.remark" placeholder="请输入" clearable />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="{ row, $index }">
              <el-button
                size="mini"
                type="text"
                @click="handelCopy(row)"
              >复制</el-button>
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
    <div class="footer">
      <div class="select_box">
        <!-- <div class="prompt_information">
          <svg-icon icon-class="complete" />
          <div class="information">已保存草稿</div>
          <div class="time">2分钟前</div>
        </div> -->
        <div class="action_buttons">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="submitFormBC">保存</el-button>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <indexDialog
      :visible.sync="isShow"
      title="选择供应商"
      :interview-id="interviewId"
      :prop-data="propData"
      @submitForm="submit"
    />
    <!-- 选择物资 -->
    <SuppliesDialog
      :id="cliId"
      :visible.sync="isShowSuppliesDialog"
      title="选择物资"
      @submitForm="submitForms"
    />
  </div>
  <!-- </el-dialog> -->
</template>

<script>
import { getToken } from '@/utils/auth'
import {
  selectSupplierByNameOrItemType,
  contractCodeAgain
} from '@/api/contractManagement/table'
import indexDialog from '../supplier/indexDialog.vue'
import SuppliesDialog from '../components/suppliesDialog.vue'
import {
  save,
  getAllOrganization,
  getTemplateFile
} from '@/api/contractManagement/table'
export default {
  name: 'AddAndAdit',
  components: { indexDialog, SuppliesDialog },
  data() {
    return {
      fileUploadUrl:
        process.env.VUE_APP_BASE_API +
        '/purchase-service/prucContractItem/importConstantItems',
      fileUploadBtnText: '导入',
      uploadBtnIcon: 'el-icon-upload2',
      settlementTypeIds: [
        {
          label: '租赁类材料结算',
          value: 6
        }
      ],
      userIds: '',
      fileData: {
        type: 0
      },
      val: 0,
      fileList: [],
      show: false,
      importUrl: '',
      headers: {
        access_token: this.getTokens()
      },
      cliId: null,
      cliIndex: null,
      isShowSuppliesDialog: false,
      tableData: [], // 合同乙方
      interviewId: '',
      propData: [],
      isShow: false,
      labelPosition: 'top',
      radio: '',
      headerTitle: '', // 头部标题
      prucContractItemList: [{}],
      disabled: false,

      list: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
      ],
      form: {
        rules: {
          big: [
            { required: true, message: '物料大类不能为空', trigger: 'change' }
          ],
          small: [
            { required: true, message: '物资小类不能为空', trigger: 'blur' }
          ],
          itemName: [
            { required: true, message: '物料名称不能为空', trigger: 'blur' }
          ]
          // specifications: [
          //   {
          //     required: true,
          //     message: '规格型号不能为空',
          //     trigger: 'blur'
          //   }
          // ],
          // unitPrice: [
          //   {
          //     required: true,
          //     message: '单价不能为空',
          //     trigger: 'blur'
          //   }
          // ]
        },
        prucContractItemList: [{}], // 表格数据
        userIds: '',
        isRefOrder: 1
      },
      queryParams: {},
      rules: {
        contractType: [
          { required: true, message: '请输入', trigger: 'change' }
        ],
        contractCode: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            min: 20,
            max: 200,
            message: '长度在 20 到 200 个字符',
            trigger: 'blur'
          }
          // {
          //   pattern: /^([\u4e00-\u9fa5]|[0-9]|[,]|[,]){20,200}$/,
          //   message: '请输入20-200字符',
          //   trigger: 'blur'
          // }
        ],
        contractAmount: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            pattern: /^(([1-9]{1}\d*)|(0{1}))(\.\d{1,3})?$/,
            message: '请输入正确金额',
            trigger: 'blur'
          }
          // { max: 11, message: "最大长度为11个字符", trigger: "blur" },
        ],
        organizationId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        supplierId: [{ required: true, message: '请选择', trigger: 'change' }],
        contractAmountType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        isRefOrder: [{ required: true, message: '请选择', trigger: 'change' }],
        settlementTypeId: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        monthPayPercent: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            pattern: /^99$|^(\d|[1-9]\d)(\.\d+)*$/,
            message: '请勿大于等于100%',
            trigger: 'blur'
          }
        ],
        // organizationName: [
        //   { required: true, message: "请选择", trigger: "blur" },
        // ],
        taxVal: [
          { required: true, message: '请输入', trigger: 'blur' },
          {
            pattern: /^100$|^(\d|[1-9]\d)(\.\d+)*$/,
            message: '请勿大于100%',
            trigger: 'blur'
          }
        ],
        effectDate: [{ required: true, message: '请选择', trigger: 'blur' }],
        userIds: [{ required: true, message: '请选择', trigger: 'blur' }],
        legalRepresentative: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      // 结算类型
      settlementTypeId: [
        { value: 1, label: '自然月结' },
        { value: 2, label: '跨月结算' }
      ],
      partyA: []
    }
  },
  created() {
    this.getDetail()
    this.getList()
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '新增合同'
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data)
      this.form.userIds = data.label
      // 使 input 失去焦点，并隐藏下拉框
      this.$refs.selectTree.blur()
    },
    // 导入
    fileUploadSuccess() {
      this.enabledUploadBtn = true
      this.uploadBtnIcon = 'el-icon-upload2'
      this.fileUploadBtnText = '导入数据'
      this.$message.success('数据导入成功!')
    },
    fileUploadError() {
      this.enabledUploadBtn = true
      this.uploadBtnIcon = 'el-icon-upload2'
      this.fileUploadBtnText = '导入数据'
    },
    beforeFileUpload(file) {
      this.enabledUploadBtn = false
      this.uploadBtnIcon = 'el-icon-upload2'
      this.fileUploadBtnText = '正在导入'
    },

    handleSuccess(response, file, fileList) {
      // console.log(response, file, fileList,"===")
    },
    htjType(val) {
      this.fileData.type = val
      // this.process.env.VUE_APP_BASE_API +
      //   '/purchase-service/prucContractItem/importConstantItems/' +
      //   val
    },
    getTokens() {
      const obj = getToken()
      return obj
    },
    // 合同编号校验
    contractCodeChange() {
      if (
        this.form.contractCode &&
        this.form.contractCode !== null &&
        this.form.contractCode !== ''
      ) {
        contractCodeAgain({ contractCode: this.form.contractCode }).then(
          (res) => {
            // this.form.contractCode = ''
          }
        )
      }
    },
    // 下载模板
    xzmb() {
      let type = 0
      if (this.form.contractAmountType) {
        type = this.form.contractAmountType
      }
      getTemplateFile(type).then((response) => {
        const blob = new Blob([response], { type: 'application/vnd.ms-excel' })
        const url = window.URL || window.webkitURL || window.moxURL
        const downloadHref = url.createObjectURL(blob)
        const downloadLink = document.createElement('a')
        downloadLink.href = downloadHref
        downloadLink.download = `物资列表模板.xlsx`
        downloadLink.click()
      })
    },
    getDetail() {
      this.loading = true
      getAllOrganization().then((res) => {
        this.partyA = res.data
        this.loading = false
      })
    },
    // 选择供应商弹窗
    supplier(row, type) {
      this.interviewId = row.id
      this.propData = row
      this.isShow = true
    },
    submit(row) {
      this.isShow = false
      this.$set(this.form, 'supplierId', row)
    },
    // 供应商
    getList() {
      selectSupplierByNameOrItemType().then((res) => {
        this.tableData = res.data
      })
    },
    // 选择物资弹窗
    focusInput(row, index) {
      this.cliId = row.itemBigTypeId
      this.cliIndex = index
      this.isShowSuppliesDialog = true
      this.$refs['inputDialog'].blur()
    },
    // 选择物资
    submitForms(data) {
      if (this.cliIndex >= 0) {
        this.form.prucContractItemList.forEach((item, index) => {
          if (index === this.cliIndex) {
            this.$set(item, 'itemId', data.id)
            this.$set(item, 'big', data.itemBigType)
            this.$set(item, 'small', data.itemSmallType)
            this.$set(item, 'itemName', data.name)
            this.$set(item, 'unit', data.unit)
          }
        })
      }
    },
    // 新增行
    addTable() {
      this.form.prucContractItemList.push({ type: '' })
    },
    // 复制行
    handelCopy(row) {
      this.form.prucContractItemList.push({ ...row })
    },
    // 删除行
    handelDelete(row, index) {
      this.form.prucContractItemList.splice(index, 1)
    },
    // 关闭
    handleClose() {
      this.$router.go(-1)
      // this.form = {}
      // this.$emit('update:visible', false)
      // if (this.$refs['form']) {
      //   this.$refs['form'].clearValidate()
      // }
    },
    // 保存
    submitFormBC() {
      // this.form.userId = this.form.userId.toString()
      // this.form.userIds = this.form.userIds.toString()
      // this.form.monthPayPercent = this.form.monthPayPercent / 100
      // this.form.taxVal = this.form.taxVal / 100
      this.form.useStatus = 5
      // this.form.hasChange = 0
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // if (this.form.id) {
          //   UpdatePedestrianAreaInfo(this.form).then((res) => {
          //     this.$modal.msgSuccess("修改成功");
          //     this.handleClose();
          //     this.$emit("submitForm");
          //   });
          // } else {
          save(this.form).then((res) => {
            this.$message.success('操作成功')
            this.$router.push({ path: '/contractManagement/table' })
          })
          // }
        }
      })
    },
    // 提交按钮
    submitForm() {
      this.form.useStatus = 1
      // this.form.userIds = this.form.userIds.toString()
      // this.form.monthPayPercent = this.form.monthPayPercent / 100
      // this.form.taxVal = this.form.taxVal / 100
      // this.form.hasChange = 0
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // if (this.form.id) {
          //   UpdatePedestrianAreaInfo(this.form).then((res) => {
          //     this.$modal.msgSuccess("修改成功");
          //     this.handleClose();
          //     this.$emit("submitForm");
          //   });
          // } else {
          save(this.form).then((res) => {
            this.$message.success('操作成功')
            this.$router.push({ path: '/contractManagement/table' })
          })
          // }
        }
      })
    }
  }
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
<style lang="scss" scoped>
::v-deep .el-table {
  .el-form-item {
    margin-bottom: 0px;
    &__content {
      width: 100%;
    }
    &.is-error {
      width: 100%;
    }
  }
}

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
    height: 1000px;
  }
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
    // position: absolute;
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
