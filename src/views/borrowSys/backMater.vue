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
        <el-row>
          <el-col>
            <el-form-item label="类型" prop="type">
              <el-radio-group v-model="form.type">
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
                v-model="form.reportStopEndDate"
                type="daterange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 80%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
              label="原因"
              prop="reson"
            >
              <el-input
                v-model="form.reson"
                placeholder="请输入"
                clearable
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
          @del="del"
        />
        <el-table
          ref="multipleTable"
          style="width: 100%"
          stripe
          border
          max-height="500"
          :data="reportList"
          :header-row-class-name="() => 'headerClass'"
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
          <el-table-column label="退料数量">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.num"
              />
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
              <el-input
                v-model="row.remark"
              />
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
      </el-form>
    </el-card>
    <div class="footer">
      <div class="select_box">
        <div class="action_buttons">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="submitFormBC">保存</el-button>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AllDelete from '@/components/AllDelete/AllDelete'
import { stopDetail } from '@/api/waitDeal'
import {
  save
} from '@/api/contractManagement/table'
export default {
  name: 'AddAndAdit',
  components: {
    AllDelete
  },
  data() {
    return {
      labelPosition: 'top',
      reportStopCode: [],
      receiptItemId: [],
      checked: false,
      selNum: 0,
      form: {
        type: 1,
        reportStopCode: '',
        receiptCode: '',
        reportStopEndDate: '',
        reson: '',
        supplierName: '',
        contacts: '',
        contactsPhone: ''
      },
      reportList: [],
      rules: {
        reson: [
          { required: true, message: '请输入原因', trigger: 'blur' }
        ],
        reportStopEndDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    const { receiptCode, receiptItemId } = this.$route.query
    this.reportStopCode.push(receiptCode)
    this.receiptItemId.push(receiptItemId)
  },
  mounted() {
    this.showDetail()
  },
  methods: {
    showDetail() {
      const parm = { receiptCodeList: this.reportStopCode, receiptItemIdList: this.receiptItemId }
      stopDetail(parm).then(res => {
        if (res.status === 200) {
          const { supplierName, contacts, contactPhone } = res.data.consigneeInformationVo
          const { receiptCode } = res.data
          // this.form.reportStopCode=receiptCode
          this.form.receiptCode = receiptCode

          this.form.supplierName = supplierName
          this.form.contacts = contacts
          this.form.contactsPhone = contactPhone

          const { toReportStopDetailMateiralVoList } = res.data
          this.reportList = toReportStopDetailMateiralVoList
        }
      }).catch(err => {
        console.log(err)
      })
    },
    // 物资列表删除
    del() {
      this.selItems.forEach((selItem, selIndex) => {
        this.form.prucContractItemList.forEach((item, index) => {
          if (selItem.id) {
            if (item.id === selItem.id) {
              this.form.prucContractItemList.splice(index, 1)
            }
          } else {
            if (selItem.pid && item.pid === selItem.pid) {
              this.form.prucContractItemList.splice(index, 1)
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
        if (this.selItems.length !== this.form.prucContractItemList.length) {
          this.form.prucContractItemList.forEach((item) => {
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
    },
    submit(row) {
      this.isShow = false
    },
    // 选择物资弹窗
    focusInput(row, index) {
      this.cliId = row.itemBigTypeId
      this.cliIndex = index
      this.$refs['inputDialog'].blur()
    },
    // 删除行
    handelDelete(row, index) {
      this.form.prucContractItemList.splice(index, 1)
    },
    // 关闭
    handleClose() {
      this.$router.go(-1)
    },
    // 保存
    submitFormBC() {
      this.form.useStatus = 5
      this.form.prucContractItemList.forEach((item) => {
        item.fullName = item.name + item.specifications
      })
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save(this.form).then((res) => {
            this.$message.success('操作成功')
            this.$router.push({ path: '/contractManagement/table' })
          })
        }
      })
    },
    // 提交按钮
    submitForm() {
      // this.form.prucContractItemList.forEach((item, idx) => {
      //   item.specifications =
      //     item.name + (item.specifications ? item.specifications : "");
      // });
      this.$refs['form'].validate((valid) => {
        if (valid) {
          save(this.form).then((res) => {
            this.$message.success('操作成功')
            this.$router.push({ path: '/contractManagement/table' })
          })
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
</style>
