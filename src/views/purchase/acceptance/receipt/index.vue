<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <div style="font-weight: 600">发货IP：{{ orderNumber }}</div>
      <div class="project">
        <div class="name" />
        <!-- <div class="switch-svg"><svg-icon icon-class="switch" /></div> -->
      </div>
    </div>
    <div class="app-container">
      <el-card class="box-card" style="box-shadow: none">
        <!-- <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div> -->
        <div>
          <span class="title" style="font-weight: 600">基本信息</span>
          <el-form :rules="rules">
            <el-form-item
              label="费用类型:"
              prop="feeType"
              style="margin-top: 16px"
            >
              <el-radio-group v-model="form.feeType">
                <el-radio :label="1">工程实体</el-radio>
                <el-radio :label="2">架体材料费用投入</el-radio>
                <el-radio :label="3">临时设施费用</el-radio>
                <el-radio :label="4">安全文明措施费</el-radio>
                <el-radio :label="5">零星辅材</el-radio>
                <el-radio :label="6">其他费用(调差及资金成本)</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div class="satisfaction">
            <div class="satisfaction-content">
              <span class="title" style="font-weight: 600">满意度</span>
              <el-divider />
              <p>期间供应商服务满意度</p>
              <el-radio-group v-model="form.evaluate">
                <el-radio :label="1">非常满意</el-radio>
                <el-radio :label="2">满意</el-radio>
                <el-radio :label="3">不满意</el-radio>
                <el-radio :label="4">非常不满意</el-radio>
              </el-radio-group>
            </div>
          </div>
          <table
            border="1"
            style="
              border-collapse: collapse;
              width: 100%;
              text-align: center;
              border-color: #dfe6ec;
              margin-top: 10px;
              margin-bottom: 10px;
            "
          >
            <tr>
              <td class="tableTH">收料单编号</td>
              <td class="tableTD">{{ form.receiptCode }}</td>
              <td class="tableTH">发货单编号</td>
              <td class="tableTD">{{ form.deliveryNo }}</td>
            </tr>
            <tr>
              <td class="tableTH">供应商厂家</td>
              <td class="tableTD">{{ form.supplierName }}</td>
              <td class="tableTH">发货车牌号</td>
              <td class="tableTD">{{ form.plateNumber }}</td>
            </tr>
            <tr>
              <td class="tableTH">送货人姓名</td>
              <td class="tableTD">{{ form.deliverName }}</td>
              <td class="tableTH">送货人联系电话</td>
              <td class="tableTD">{{ form.deliverPhone }}</td>
            </tr>
            <tr>
              <td class="tableTH">发货日期</td>
              <td class="tableTD">{{ form.deliveryDate }}</td>
              <td class="tableTH">备注</td>
              <td class="tableTD">{{ form.deliveryRemark }}</td>
            </tr>
            <tr v-if="form.contractSettlementType == 2">
              <td class="tableTH">浮动比例</td>
              <td class="tableTD" colspan="3">{{ form.floatingScale }}%</td>
            </tr>
          </table>
        </div>
        <div class="title" style="font-weight: 600">
          <span>收货方信息</span>
        </div>
        <table
          border="1"
          style="
            border-collapse: collapse;
            width: 100%;
            text-align: center;
            border-color: #dfe6ec;
            margin-top: 10px;
            margin-bottom: 10px;
          "
        >
          <tr>
            <td class="tableTH">单位</td>
            <td class="tableTD">{{ form.orgName }}</td>
            <td class="tableTH">收料单位</td>
            <td class="tableTD">{{ form.projectName }}</td>
          </tr>
          <tr>
            <td class="tableTH">备注</td>
            <td class="tableTD" colspan="3">{{ form.remark }}</td>
          </tr>
        </table>
        <div class="title" style="font-weight: 600">
          <span>需用物资列表</span>
        </div>
        <el-table
          :data="form.prucReceiptItemList"
          style="width: 100%"
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column prop="materialName" label="物资名称" fixed="left" />
          <el-table-column prop="standards" label="规格型号" />
          <el-table-column prop="amount" label="收货数量" width="120">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.amount"
                clearable
                placeholder="请输入"
                :min="0"
                :max="scope.row.deliveryAmount"
                @change="verifyAmount(scope.row.amount,scope.row.deliveryAmount,scope.$index)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="deliveryAmount" label="发货数量" />
          <el-table-column prop="unit" label="单位" />
          <el-table-column
            v-if="form.contractSettlementType != 2"
            prop="taxIncludeUnitPrice"
            label="含税单价(元)"
          />
          <el-table-column
            v-if="form.contractSettlementType != 2"
            prop="taxReduceUnitPrice"
            label="除税单价(元)"
          />
          <!--          <el-table-column-->
          <!--            v-if="contractSettlementType == 3"-->
          <!--            prop="floatingScale"-->
          <!--            label="浮动比例"-->
          <!--          />-->
          <el-table-column
            v-if="form.contractSettlementType == 2"
            prop="taxIncludeContractAppointmentPrice"
            label="合同约定浮动价(含税)(元)"
          />
          <el-table-column
            v-if="form.contractSettlementType == 2"
            prop="taxReduceContractAppointmentPrice"
            label="合同约定浮动价(除税)(元)"
          />
          <el-table-column
            v-if="form.contractSettlementType == 2"
            prop="basePrice"
            label="基准价(元)"
            width="120"
          >
            <template slot-scope="{ row }">
              <el-input
                v-model="row.basePrice"
                clearable
                placeholder="请输入"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="form.contractSettlementType == 2"
            prop="receiveDate"
            label="收料日期"
            width="140"
          />
          <el-table-column
            v-if="form.contractSettlementType == 4"
            prop="settlementMode"
            label="结算方式"
          >
            <template slot-scope="{ row }">
              <span>{{
                getDictionaryLabel(row.settlementMode, 'settlementMethod')
              }}</span>
            </template>
          </el-table-column>
          <!--          <el-table-column prop="entryDate" label="租赁开始时间" width="200">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-date-picker-->
          <!--                v-model="scope.row.entryDate"-->
          <!--                clearable-->
          <!--                value-format="yyyy-MM-dd HH:mm:ss"-->
          <!--                type="date"-->
          <!--                placeholder="选择日期"-->
          <!--                style="width: 90%"-->
          <!--              />-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column
            v-if="form.contractSettlementType == 4"
            prop="renEndDate"
            label="租赁结束时间"
            width="200"
          >
            <template slot-scope="scope">
              <el-date-picker
                v-model="scope.row.renEndDate"
                clearable
                value-format="yyyy-MM-dd HH:mm:ss"
                type="date"
                placeholder="选择日期"
                style="width: 90%"
              />
            </template>
          </el-table-column>
          <!--          <el-table-column prop="fjf" label="租赁周期">-->
          <!--            <template slot-scope="{ row }">-->
          <!--              <el-input v-model="row.tj" clearable />-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column
            v-if="form.contractSettlementType == 1"
            prop="adjustPrice"
            label="调价(元)"
            width="120"
          >
            <template slot-scope="{ row }">
              <el-input
                v-model="row.adjustPrice"
                clearable
                placeholder="请输入"
              />
            </template>
          </el-table-column>
          <el-table-column prop="extraPrice" label="附加费(元)" width="120">
            <template slot-scope="{ row }">
              <el-input
                v-model="row.extraPrice"
                clearable
                placeholder="请输入"
              />
            </template>
          </el-table-column>
          <el-table-column prop="taxRate" label="税率(%)" width="120" />
          <el-table-column prop="taxes" label="税金(元)" width="120" />
          <el-table-column prop="certificate" label="合格证号" width="120">
            <template slot-scope="{ row }">
              <el-input v-model="row.certificate" placeholder="请输入" />
            </template>
          </el-table-column>
          <!--          v-if="form.contractSettlementType != 4"-->
          <el-table-column prop="brand" label="品牌" width="120">
            <template slot-scope="{ row }">
              <el-input v-model="row.brand" placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="120">
            <template slot-scope="{ row }">
              <el-input v-model="row.remark" clearable placeholder="请输入" />
            </template>
          </el-table-column>
          <el-table-column prop="editStatus" label="录入状态" fixed="right">
            <template slot-scope="{ row }">
              <span v-if="row.editStatus == 1">未完成</span>
              <span v-if="row.editStatus == 2">已完成</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
    <div class="footer">
      <div class="select_box">
        <!-- <div class="prompt_information">
          <svg-icon icon-class="complete" />
          <div class="information">已保存草稿</div>
          <div class="time">2分钟前</div>
        </div> -->
        <div class="action_buttons">
          <el-button @click="cancel">取消</el-button>
          <el-button @click="save(1)">保存</el-button>
          <el-button type="primary" @click="save(2)">提交</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { detail, update } from '@/api/contractManagement/material'
export default {
  name: 'AddAndAdit',
  data() {
    return {
      orderNumber: '',
      projectName: '深圳市宝安区鸿昌花园幼儿园',
      loading: false,
      size: '',
      ruleForm: {},
      form: {},
      form1: {},
      rules: {
        feeType: [{ required: true, message: '请选择', trigger: 'blur' }],
        amount: [
          { required: true, message: '收获数量不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {},
  methods: {
    // calculate(){
    //   this.form.prucReceiptItemList.forEach((item) => {
    //     if (item.amount) {
    //       item.taxes = item.taxIncludeUnitPrice - item.taxReduceUnitPrice
    //     }
    //   })
    // },
    // 校验退货数量
    verifyAmount(val, max, index) {
      if (val > max) {
        this.$message.error('收获数量不能超过发货数量')
        this.form.prucReceiptItemList[index].amount = max
      }
      if (val < 0) {
        this.$message.error('最小收货值为0')
        this.form.prucReceiptItemList[index].amount = 0
      }
      if (val === '') {
        this.$message.error('收获数量不能为空')
        this.form.prucReceiptItemList[index].amount = 0
      }
    },
    // 详情
    getDetail(id) {
      this.loading = true
      detail(this.$route.query.id).then((res) => {
        this.form = { ...this.form, ...res.data }
        this.loading = false
      })
    },
    cancel() {
      this.$router.go(-1)
    },
    save(operationType) {
      // /操作类型，1-保存，2-提交
      this.form.operationType = operationType
      var arr = this.form.prucReceiptItemList
      var updateItemDTOList = arr.map((item) => {
        return {
          itemId: item.itemId,
          brand: item.brand,
          receiveAmount: Number(item.amount),
          remark: item.remark,
          certificate: item.certificate
        }
      })
      this.form.updateItemDTOList = updateItemDTOList
      this.form.receiptId = Number(this.$route.query.id)
      if (!this.form.feeType) {
        this.$message({
          message: '请选择费用类型',
          type: 'warning'
        })
        return
      }
      if (!this.form.evaluate) {
        this.$message({
          message: '请输入满意度',
          type: 'warning'
        })
        return
      }
      update(this.form).then((res) => {
        this.$message.success('操作成功')
        this.$router.push({ path: '/purchase/acceptance' })
      })
    },
    // 关闭
    handleClose() {
      //   this.form = {};
      //   this.$emit("update:visible", false);
      //   this.$emit("handleClose");
      //   if (this.$refs["form"]) {
      //     this.$refs["form"].clearValidate();
      //   }
    }
  }
}
</script>
<style lang="scss" scoped>
.totalPlan-container {
  .satisfaction {
      background: #ecf0f5;
      margin: 0 -20px;
      padding: 20px 0;
      .satisfaction-content {
        background: #fff;
        padding: 20px;
      }
      .title::before {
            content: '*';
            color: #F56C6C;
            margin-right: 4px;
      }
    }
  .totalPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 40px;
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
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
.title {
  margin-top: 24px;
  margin-bottom: 16px;
}
.tableTH {
  text-align: right;
  padding-right: 16px;
  width: 100px;
  height: 45px;
  font-size: 14px;
  font-weight: bold;
  color: #555f73;
  background-color: #f8f8f9;
}
.tableTD {
  text-align: left;
  padding-left: 16px;
  width: 240px;
  color: #606266;
  font-size: 14px;
}
</style>
