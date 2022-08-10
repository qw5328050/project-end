<template>
  <div class="totalPlan-container">
    <el-card class="pm">
      <div slot="header" class="clearfix">
        <span style="font-weight: 600">基本信息</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="form.rules"
        label-width="90px"
        style="margin-top: 20px"
        :label-position="labelPosition"
      >
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="退料单编号" prop="returnCode">
              <el-input
                v-model="form.returnCode"
                disabled
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="报停单编号" prop="reportStopCode">
              <el-input
                v-model="form.reportStopCode"
                disabled
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="材料工程师" prop="receiveEngineer">
              <el-input
                v-model="form.receiveEngineer"
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="收料单编号" prop="receiptCode">
              <el-input
                v-model="form.receiptCode"
                disabled
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="退料车牌号" prop="returnPlateNumber">
              <el-input
                v-model="form.returnPlateNumber"
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="送货人姓名" prop="returnUserName">
              <el-input
                v-model="form.returnUserName"
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="送货人联系方式" prop="returnUserPhone">
              <el-input
                v-model="form.returnUserPhone"
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="退料日期" prop="returnDate">
              <el-date-picker
                v-model="form.returnDate"
                type="date"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="原因" prop="reason" :rules="form.rules.reason">
              <el-input v-model="form.reason" placeholder="请输入" style="width: 80%" clearable />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title-container">
          <el-row>
            <el-col :span="24" style="margin-top: 16px">
              <span class="title" style="font-weight: bold">收货方信息</span>
              <el-divider />
            </el-col>
          </el-row>
        </div>
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
              label="供应商厂家"
              prop="supplier"
            >
              <el-input
                v-model="form.supplier"
                disabled
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
              label="联系人"
              prop="contacts"
            >
              <el-input
                v-model="form.contacts"
                disabled
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
              label="联系电话"
              prop="contactsPhone"
            >
              <el-input
                v-model="form.contactsPhone"
                disabled
                placeholder="请输入"
                clearable
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div class="title-container">
          <el-row>
            <el-col :span="24" style="margin-top: 16px">
              <span class="title" style="font-weight: bold">物资信息</span>
              <el-divider />
            </el-col>
          </el-row>
        </div>
        <AllDelete :checked="checked" :sel-num="selNum" @isCheck="isCheck" @del="del" />
        <el-table
          ref="multipleTable"
          :header-row-class-name="() => 'headerClass'"
          :data="form.prucReturnMaterialDTOList"
          max-height="500"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="50"
            align="left"
            fixed="left"
          />
          <el-table-column prop="materialName" label="物资名称" />
          <el-table-column prop="specification" label="规格/型号" />
          <el-table-column prop="num" label="退料数量">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.num"
                placeholder="请输入"
                clearable
                @keydown.native="limitFloat($event)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="unit" label="单位" />
          <el-table-column prop="taxIncludeUnitPrice" label="含税单价(元)" />
          <el-table-column prop="taxReduceUnitPrice" label="除税单价(元)" />
          <el-table-column prop="taxRate" label="税率(%)" />
          <el-table-column prop="taxes" label="税金(元)" />
          <el-table-column prop="remark" label="备注">
            <template slot-scope="{ row }">
              <el-input v-model="row.remark" placeholder="请输入" clearable />
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
          <el-button @click="submitForm(1)">保存</el-button>
          <el-button type="primary" @click="submitForm(2)">提交</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- </el-dialog> -->
</template>

<script>
import AllDelete from '@/components/AllDelete/AllDelete'
import { getToken } from '@/utils/auth'
import { prucReturnDetail, editPrucReturn, editPrucReturnByReportStopType, selectUsersByRole } from '@/api/borrowSys/prucReportStop'
// import {
//   selectSupplierByNameOrItemType,
//   contractCodeAgain,
// } from "@/api/contractManagement/table";
import {
  getTemplateFile
} from '@/api/contractManagement/table'
export default {
  name: 'AddAndAdit',
  components: {
    // indexDialog,
    // SuppliesDialog,
    AllDelete
    // SuppliesDialogList,
    // // money,
    // SuppliesDialogListS,
  },
  data() {
    return {
      selItems: [],
      selNum: 0, // 物资列表选中数量
      checked: false, // 是否选中
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
      },
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
        21, 22, 23, 24, 25, 26, 27, 28
      ],
      lists: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28
      ],
      form: {
        rules: {
          reason: [{ required: true, message: '原因不能为空', trigger: 'blur' }]
        },
        prucReturnMaterialDTOList: [], // 表格数据
        receiptCode: '',
        receiveEngineer: '',
        reportStopCode: '',
        returnCode: '',
        returnDate: '',
        returnPlateNumber: '',
        returnTotalPrice: '',
        returnUserName: '',
        returnUserPhone: '',
        supplier: '',
        supplierId: '',
        reason: '',
        reportStopIdList: []
      },
      queryParams: {},
      // 结算类型
      settlementTypeId: [
        { value: 1, label: '自然月结' },
        { value: 2, label: '跨月结算' }
      ],
      partyA: [],
      partyS: [],
      tableParty: [],
      isShowSuppliesListDialog: false, // 批量选择物资弹窗
      selItemList: [], // 选中的物资列表
      reportStopCode: '',
      receiptItemId: '',
      leaseParameterIdList: '',
      pageType: '',
      selectUserList: ''
    }
  },
  created() {
    this.leaseParameterIdList = [this.$route.query.id]
    this.prucReturnDetail()
  },
  mounted() {
  },
  methods: {
    async selectUsersByRole (id) {
      const res = selectUsersByRole({id: id})
      if (res && res.data) {
        let result  = res.data
        this.selectUserList = result && result.list
      }
    },
    async prucReturnDetail() {
      this.loading = true
      const res = await prucReturnDetail({ returnCode: this.$route.query.returnCode })
      if (res && res.status === 200) {
        const result = res.data || {}
        this.loading = false
        this.form = Object.assign(this.form, result.prucReturn)
        this.form.prucReturnMaterialDTOList = result.materialList
        this.selectUsersByRole(this.form.projectId)
      }
    },
    limitFloat(e) {
      e.target.value = e.target.value.match(/\d+\.?\d{0,3}/)
    },
    inputMoneyFomet(el, name) {
      this.form[name] = getInputValue(el)
    },
    empty() {
      this.form.contractAmountType = null
      this.form.settlementTypeId = null
    },
    // 物资列表删除
    del() {
      this.selItems.forEach((selItem, selIndex) => {
        this.form.prucReturnMaterialDTOList.forEach((item, index) => {
          if (selItem.id) {
            if (item.id === selItem.id) {
              this.form.prucReturnMaterialDTOList.splice(index, 1)
            }
          } else {
            if (selItem.pid && item.pid === selItem.pid) {
              this.form.prucReturnMaterialDTOList.splice(index, 1)
              this.selItemList.splice(index, 1)
            }
          }
        })
      })
    },
    // 物资列表选中
    isCheck(val) {
      if (!val) {
        this.$refs.multipleTable.clearSelection()
      } else {
        if (this.selItems.length !== this.form.prucReturnMaterialDTOList.length) {
          this.form.prucReturnMaterialDTOList.forEach((item) => {
            this.$refs.multipleTable.toggleRowSelection(item)
          })
        } else {
          this.$refs.multipleTable.clearSelection()
        }
      }
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
    fileUploadError() {
      this.enabledUploadBtn = true
      this.uploadBtnIcon = 'el-icon-upload2'
      this.fileUploadBtnText = '导入'
    },
    beforeFileUpload(file) {
      this.enabledUploadBtn = false
      this.uploadBtnIcon = 'el-icon-upload2'
      this.fileUploadBtnText = '正在导入'
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
      // let type = 0;
      // if (this.form.contractAmountType) {
      //   type = this.form.contractAmountType;
      // }
      const data = {
        isExclude: this.form.isExclude,
        isFloat: this.form.contractAmountType
      }
      /** 判断是否含税 */

      if (!this.form.contractAmountType) {
        this.$message.error('请选择合同价类型')
        return
      }
      if (!this.form.isExclude) {
        this.$message.error('请勾选价格类型')
        return
      }
      getTemplateFile(data).then((response) => {
        // const blob = new Blob([response], { type: 'application/vnd.ms-excel' })
        // const url = window.URL || window.webkitURL || window.moxURL
        // const downloadHref = url.createObjectURL(blob)
        // const downloadLink = document.createElement('a')
        // downloadLink.href = downloadHref
        // downloadLink.download = `物资列表模板.xlsx`
        // downloadLink.click()
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
    // 选择物资弹窗
    focusInput(row, index) {
      this.cliId = row.itemBigTypeId
      this.cliIndex = index
      this.isShowSuppliesDialog = true
      this.$refs['inputDialog'].blur()
    },
    getUUID(len, radix) {
      var chars =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(
          ''
        )
      var uuid = []
      var i
      radix = radix || chars.length
      if (len) {
        for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)]
      } else {
        var r
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | (Math.random() * 16)
            uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r]
          }
        }
      }
      return uuid.join('')
    },
    // 新增行
    addTable() {
      this.form.prucReturnMaterialDTOList.push({
        type: '',
        pid: this.getUUID(32, 16)
      })
    },
    // 复制行
    handelCopy(row) {
      this.form.prucReturnMaterialDTOList.push({ ...row })
    },
    // 删除行
    handelDelete(row, index) {
      this.form.prucReturnMaterialDTOList.splice(index, 1)
    },
    // 关闭
    handleClose() {
      this.$router.go(-1)
    },
    // 提交按钮
    submitForm(type) {
      const reportStopId = this.$route.query.reportStopId
      this.form.submitStatus = type
      this.$refs['form'].validate(async(valid) => {
        if (valid) {
          let res
          const stopReturnStatus = this.$route.query.stopReturnStatus
          this.form.leaseParameterIdList = this.leaseParameterIdList
          //   this.form.reportStopIdList = [reportStopId]
          if (stopReturnStatus === 2) {
            res = await editPrucReturn(this.form)
          } else {
            res = await editPrucReturnByReportStopType(this.form)
          }
          if (res && res.status === 200) {
            this.$message.success('操作成功')
            this.$router.push({ path: '/borrowSys' })
          }
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
.title-container {
    margin: 0 -20px;
    .title {
        padding: 0 20px;
    }
}
.select-material {
    border:1px solid #74bdff;
    margin-top: 16px;
    height: 40px;
    border-radius: 0px;
}
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
</style>
