<template>
  <div class="totalPlan-container">
    <el-card v-if="!isApproveShow && !submitSuccess" class="pm">
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
        <el-row>
          <el-col>
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="form.type" @change="handleRadioChange">
                <el-radio :label="1">仅报停</el-radio>
                <el-radio :label="2">报停并退料</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="报停单编号" prop="reportStopCode">
              <el-input
                v-model="form.reportStopCode"
                disabled
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="收料单编号" prop="receiptCode">
              <el-input
                v-model="form.receiptCode"
                disabled
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="报停时间段" prop="reportStopEndDate">
              <el-date-picker
                v-if="formType == 1"
                key="reportStopEndDate1"
                v-model="form.reportStopEndDate"
                type="daterange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 80%"
              />
              <el-date-picker
                v-if="formType == 2"
                key="reportStopEndDate2"
                v-model="form.reportStopEndDate"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
              label="原因"
              prop="reason"
            >
              <el-input
                v-model="form.reason"
                placeholder="请输入"
                clearable
                maxlength="30"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <el-row>
            <el-col :span="18" style="margin-top: 16px">
              <span style="font-weight: bold">收货方信息</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="供应商厂家" prop="supplierName">
                <el-input
                  v-model="form.supplierName"
                  disabled
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="联系人" prop="contacts">
                <el-input
                  v-model="form.contacts"
                  disabled
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
            <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
              <el-form-item label="联系电话" prop="contactsPhone">
                <el-input
                  v-model="form.contactsPhone"
                  disabled
                  style="width: 80%"
                />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <AllDelete
          :checked="checked"
          :sel-num="selNum"
          @isCheck="isCheck"
          @del="delCheck"
        />
        <el-table
          ref="multipleTable"
          :header-row-class-name="() => 'headerClass'"
          :data="form.reportList"
          max-height="500"
          border
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="50"
            align="left"
            fixed="left"
          />
          <el-table-column align="center" label="序号" width="50" fixed="left">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="materialName" label="物资名称" />
          <el-table-column prop="specification" label="规格/型号" />
          <el-table-column :label="form.type == 2 ? '退料数量' : '报停数量'">
            <template slot-scope="{ row, $index }">
              <el-form-item :prop="`reportList.${$index}.num`" :rules="rules.num">
                <el-input v-model="row.num" maxlength="10" />
              </el-form-item>
            </template>
          </el-table-column>
          <el-table-column prop="unit" label="单位" />
          <el-table-column
            prop="taxIncludeUnitPrice"
            label="含税单价(元)"
          />
          <el-table-column
            prop="taxReduceUnitPrice"
            label="除税单价(元)"
          />
          <el-table-column
            prop="taxRate"
            label="税率"
          />
          <el-table-column
            prop="taxes"
            label="税金"
          />
          <el-table-column prop="remark" label="备注">
            <template slot-scope="{ row }">
              <el-input v-model="row.remark" />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="{ row, $index }">
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
        <div class="footer">
          <div class="select_box">
            <div class="action_buttons">
              <el-button @click="handleCancle">取消</el-button>
              <el-button @click="submitSaveForm">保存</el-button>
              <el-button type="primary" @click="submitForm">提交</el-button>
            </div>
          </div>
        </div>
      </el-form>
    </el-card>

    <div v-else>
      <SelectNode
        :is-radio="true"
        :alteration="alteration"
        :process-key="processKey"
        @selectPersonnel="selectPersonnel"
      />
      <div class="checkPerson">
        <el-button @click="prevHandle">上一步</el-button>
        <el-button type="primary" @click="submitHandleForm">提交</el-button>
      </div>
    </div>

  </div>
</template>

<script>
import AllDelete from '@/components/AllDelete/AllDelete'
import SelectNode from '@/components/selectNode'
import { stopDetail, stopAdd, prucReportStopDetail, editReportStop } from '@/api/borrowSys/prucReportStop'
export default {
  name: 'StopDoc',
  components: {
    AllDelete,
    SelectNode
  },
  data() {
    return {
      labelPosition: 'top',
      leaseParameterIdList: [], // 主id
      reportStopCode: [], // 退料单id
      receiptItemId: [], // 报停单id
      checked: false,
      selNum: 0,
      selItems: [],
      formType: 1,
      form: {
        type: 1, // 1仅报停  2 报停并退料
        reportStopCode: '',
        receiptCode: '',
        reportStopEndDate: '',
        reason: '',
        supplierName: '',
        supplierId: '',
        contacts: '',
        contactsPhone: '',
        variable: {},
        reportList: []
      },
      // 底部表格
      alteration: 1,
      processKey: 'materialReportStop',
      approver: [], // 选中的审批人列表
      isApproveShow: false, // 是否显示选择审批人页面
      submitSuccess: false, // 是否提交成功
      pageType: '',
      rules: {
        reason: [
          { required: false, message: '请输入原因', trigger: 'blur' }
        ],
        reportStopEndDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        num: [
          { required: true, message: '请输入数量' },
          { pattern: /^[0-9]*[1-9][0-9]*$/, message: '请输入正整数', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.pageType = this.$route.query.pageType
    if (this.pageType !== 'edit') {
      const { id, receiptCode, receiptItemId } = this.$route.query
      this.leaseParameterIdList = JSON.parse(id)
      this.reportStopCode = JSON.parse(receiptCode)
      this.receiptItemId = JSON.parse(receiptItemId)
    }
  },
  mounted() {
    if (this.pageType === 'edit') {
      this.prucReportStopDetail()
    } else {
      this.showDetail()
    }
  },
  methods: {
    handleRadioChange(val) {
      this.form.reportStopEndDate = ''
      this.formType = val
    },
    prevHandle() {
      this.isApproveShow = false
      this.submitSuccess = false
    },
    submitHandleForm() {
      if (!this.approver || this.approver === null || this.approver.length === 0) {
        this.$message.warning('请选择审批人信息')
        return
      }
      // 设置审批人
      const variable = {}
      var isCheckPerson = this.approver.every((item) => item.personnel != null)
      if (!isCheckPerson) {
        this.$message.warning('请选择完整的对应审批人')
        return
      }
      this.approver.forEach(item => {
        variable[item.assignee] = item.personnel[0].mainCode
      })
      this.form.variable = variable
      this.commonSubmit(2)
    },
    // 选中的审批人列表
    selectPersonnel(val) {
      this.approver = val
    },
    async prucReportStopDetail() {
      const res = await prucReportStopDetail({ reportStopCode: this.$route.query.reportStopCode })
      if (res && res.status === 200) {
        const result = res.data || {}
        this.form = Object.assign(this.form, result.reportStop)
        this.form.reportList = result.materialList
        this.leaseParameterIdList = result.leaseParameterIdList
      }
    },
    showDetail() {
      const parm = { receiptCodeList: this.reportStopCode,
        receiptItemIdList: this.receiptItemId }
      stopDetail(parm).then(res => {
        if (res.status === 200) {
          const { supplierName, supplierId, contacts, contactPhone } = res.data.consigneeInformationVo
          const { receiptCode } = res.data
          // this.form.reportStopCode=receiptCode
          this.form.receiptCode = receiptCode

          this.form.supplierName = supplierName
          this.form.supplierId = supplierId
          this.form.contacts = contacts
          this.form.contactsPhone = contactPhone

          const { toReportStopDetailMateiralVoList } = res.data
          this.form.reportList = toReportStopDetailMateiralVoList
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 列表删除
    delCheck() {
      this.selItems.forEach((selItem, selIndex) => {
        this.form.reportList.forEach((item, index) => {
          if (item.receiptItemId === selItem.receiptItemId) {
            this.form.reportList.splice(index, 1)
          }
        })
      })
    },
    // 列表选中
    isCheck(val) {
      if (!val) {
        this.$refs.multipleTable.clearSelection()
      } else {
        if (this.selItems.length !== this.form.reportList.length) {
          this.form.reportList.forEach((item) => {
            this.$refs.multipleTable.toggleRowSelection(item)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      }
    },
    handleSelectionChange(val) {
      if (val.length > 0) {
        this.checked = true
      } else {
        this.checked = false
      }
      // 选中数量
      this.selNum = val.length
      // 选中数据
      this.selItems = val
    },
    // 删除行
    handelDelete(row, index) {
      this.form.reportList.splice(index, 1)
    },
    // 取消
    handleCancle() {
      this.$router.go(-1)
    },
    // 提交打开选择审批人
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 先打开审批人
          this.isApproveShow = true
          this.submitSuccess = true
        }
      })
    },
    // 公共提交方法
    async commonSubmit(submitStatus) {
      const formData = {}
      formData.type = this.form.type
      formData.reason = this.form.reson
      // 选择报停时候
      if (this.form.type === 1) {
        const startDate = this.form.reportStopEndDate[0]
        const endDate = this.form.reportStopEndDate[1]
        formData.reportStopStartDate = startDate
        formData.reportStopEndDate = endDate
      } else {
        const returnDate = this.form.reportStopEndDate
        formData.reportStopStartDate = returnDate
      }
      formData.supplierId = this.form.supplierId

      formData.contacts = this.form.contacts
      formData.contactsPhone = this.form.contactsPhone
      formData.leaseParameterIdList = this.leaseParameterIdList

      // 收料单编号
      formData.receiptCode = this.form.receiptCode

      // 1为保存
      if (submitStatus === 1) {
        formData.submitStatus = 1
      } else {
        formData.submitStatus = 2
        formData.variable = this.form.variable
      }
      // 底部table
      formData.prucReportStopMaterialDTOList = this.form.reportList
      if (this.pageType === 'edit') {
        formData.id = this.$route.query.id
        const res = await editReportStop(formData)
        if (res && res.status === 200) {
          this.$message.success('操作成功')
          this.$router.push({ path: '/borrowSys/index' })
        }
        return
      }
      stopAdd(formData).then((res) => {
        if (res.status === 200) {
          this.$message.success('操作成功')
          this.$router.push({ path: '/borrowSys/index' })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 保存
    submitSaveForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.commonSubmit(1)
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

.totalPlan-container {
  .pm {
    margin: 16px;
    max-height: 1280px;
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
.checkPerson{
  padding: 10px;
  text-align: right;
  background: #fff;

}
</style>
