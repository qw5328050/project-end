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
            <el-form-item label="退换货类型" prop="returnType">
              <el-radio-group v-model="form.returnType">
                <el-radio :label="1">退货</el-radio>
                <el-radio :label="2">换货</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="是否结算" prop="isSettlement">
              <!--              <el-checkbox-->
              <!--                v-model="form.isSettlement"-->
              <!--                :checked="form.isSettlement === 1 ? true : false"-->
              <!--                :true-label="1"-->
              <!--                :false-label="0"-->
              <!--              >是否结算</el-checkbox>-->
              <el-radio-group v-model="form.isSettlement">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item
              v-if="receiptCodeshow"
              label="退货单编号"
              prop="returnCode"
            >
              <el-input
                v-model="form.returnCode"
                placeholder="请输入"
                clearable
                style="width: 82%"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="收料单编号" prop="receiptCode">
              <el-input
                v-model="form.receiptCode"
                placeholder="请输入"
                clearable
                style="width: 82%"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="发货单编号" prop="deliveryNo">
              <el-input
                v-model="form.deliveryNo"
                placeholder="请输入"
                clearable
                style="width: 82%"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="退货车牌号" prop="plateNumber">
              <el-input
                v-model="form.plateNumber"
                placeholder="请输入"
                clearable
                style="width: 82%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="送货人姓名" prop="returnContact">
              <el-input
                v-model="form.returnContact"
                placeholder="请输入"
                clearable
                style="width: 82%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="发货人联系电话" prop="returnContactPhone">
              <el-input
                v-model="form.returnContactPhone"
                placeholder="请输入"
                clearable
                style="width: 82%"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="退货日期" prop="returnDate">
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
            <el-form-item label="原因" prop="reason">
              <el-input
                v-model="form.reason"
                placeholder="请输入"
                clearable
                style="width: 82%"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div style="font-weight: 600; margin: 16px 0">收货方信息</div>
        <el-row :gutter="20">
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="供应商厂家" prop="supplierName">
              <el-input
                v-model="form.supplierName"
                placeholder="请输入"
                clearable
                style="width: 82%"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="联系人" prop="contact">
              <el-input
                v-model="form.contact"
                placeholder="请输入"
                clearable
                style="width: 82%"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input
                v-model="form.phone"
                placeholder="请输入"
                clearable
                style="width: 82%"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <div style="margin-left: 0%">
          <span style="font-weight: 600;margin-right:88%">物资信息</span>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="add()">添加</el-button>
        </div>
        <AllDelete
          :checked="checked"
          :sel-num="selNum"
          @isCheck="isCheck"
          @del="del"
        />
        <el-table
          ref="multipleTable"
          :data="form.prucReceiptReturnItemVOList"
          style="width: 100%; margin-top: 10px"
          height="385"
          :header-row-class-name="() => 'headerClass'"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="50" align="left" />
          <!-- <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column> -->
          <el-table-column prop="materialName" label="物资名称" />
          <el-table-column prop="standards" label="规格型号" />
          <el-table-column prop="returnNum" label="退货数量">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.returnNum"
                type="number"
                clearable
                :min="0"
                :max="scope.row.amount"
                @change="verifyAmount(scope.row.returnNum,scope.row.amount,scope.$index)"
              />
              <!--              :max="scope.row.returnNumCheck"-->
              <!--              @input="calculate(scope.row,scope.$index)"-->
              <!--              aria-valuemax="scope.row.returnNum"-->
            </template>
          </el-table-column>
          <el-table-column prop="unit" label="单位" />
          <el-table-column prop="taxIncludeUnitPrice" label="含税单价(元)" />
          <el-table-column prop="taxReduceUnitPrice" label="除税单价(元)" />
          <el-table-column prop="taxRate" label="税率(%)" />
          <el-table-column prop="taxes" label="税金(元)" />
          <el-table-column prop="remark" label="备注">
            <template slot-scope="{ row }">
              <el-input v-model="row.remark" clearable />
            </template>
          </el-table-column>
          <el-table-column label="操作">
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
        <div v-if="form.returnId != null || ''" class="prompt_information">
          <svg-icon icon-class="complete" />
          <div class="information">已保存草稿</div>
          <!-- <div class="time">2分钟前</div> -->
        </div>
        <div class="action_buttons">
          <el-button @click="handleClose">取消</el-button>
          <el-button @click="saveOrCommit(1)">保存</el-button>
          <el-button type="primary" @click="saveOrCommit(2)">提交</el-button>
        </div>
      </div>
    </div>
    <listTable
      :visible.sync="isShow"
      :title="title"
      :options="options"
      :list-ids="listIds"
      @submitForm="submitForm"
    />
  </div>
  <!-- </el-dialog> -->
</template>

<script>
import AllDelete from '../../../../components/AllDelete/AllDelete'
import {
  intoReturnPage,
  intoReturnPageInfo,
  saveOrCommit,
  getAllReceiptItem
} from '@/api/contractManagement/material'
import listTable from './listTable.vue'
export default {
  name: 'AddAndAdit',
  components: {
    listTable,
    AllDelete
  },
  data() {
    return {
      selItems: [],
      selNum: 0, // 物资列表选中数量
      checked: false, // 是否选中
      listIds: [], // 选择的id
      receiptCodeshow: false,
      listData: [], // 数据
      interviewId: '',
      propData: [],
      isShow: false,
      labelPosition: 'top',
      radio: '',
      value1: '',
      headerTitle: '', // 头部标题
      list: [{ type: '测试1' }, { type: '测试2' }, { type: '测试3' }],
      disabled: false,
      rules: {
        // 规则
        returnType: [
          { required: true, message: '请选择退换货类型', trigger: 'blur' }
        ],
        isSettlement: [
          { required: true, message: '请选择是否结算', trigger: 'blur' }
        ],
        plateNumber: [
          { required: true, message: '请输入退货车牌号', trigger: 'blur' }
        ],
        returnContact: [
          { required: true, message: '请输入送货人姓名', trigger: 'blur' }
        ],
        returnContactPhone: [
          { required: true, message: '请输入发货人联系电话', trigger: 'blur' }
        ],
        returnDate: [
          { required: true, message: '请选择退货日期', trigger: 'blur' }
        ]
      },
      form: {},
      prucReceiptItemVOList: [], // 回显
      queryParams: {},
      title: '', // 弹窗的名字
      options: [] // 获取收料单里面的所有物资
    }
  },
  created() {
    this.intoReturnPage()
    this.getAllReceiptItem()
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '填写退换货单据'
  },
  methods: {
    calculate(row, index) {
      if (row.returnNum === null || row.returnNum === '') {
        this.prucReceiptReturnItemVOList[index].returnNum = 0
      } else {
        if (row.returnNum > row.returnNumCheck) {
          this.prucReceiptReturnItemVOList[index].returnNum = row.returnNumCheck
        }
      }
    },
    // 物资列表删除
    del() {
      this.form.prucReceiptReturnItemVOList.forEach((item, index) => {
        this.selItems.forEach((selItem, selIndex) => {
          if (item.id === selItem.id) {
            this.form.prucReceiptReturnItemVOList.splice(index, 1)
          }
        })
      })
      // this.$refs.multipleTable.clearSelection();
    },
    // 物资列表选中
    isCheck(val) {
      if (!val) {
        this.$refs.multipleTable.clearSelection()
      } else {
        if (this.selItems.length !== this.form.prucReceiptReturnItemVOList.length) {
          this.form.prucReceiptReturnItemVOList.forEach(item => {
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
    // 退货详情
    async intoReturnPage() {
      this.loading = true
      var res = null
      if (!this.$route.query.hasOwnProperty('clickStatus')) {
        // 点击收料列表内‘退货’按钮获取退货/换货单详情
        res = await intoReturnPage(this.$route.query.id)
      } else {
        // 点击退换货列表内’编辑‘按钮获取退货/换货单详情
        res = await intoReturnPageInfo(this.$route.query.id)
      }
      this.form = res.data
      if (res.data.returnId !== null || '') {
        this.prucReceiptItemVOList = res.data.prucReceiptReturnItemVOList
        this.receiptCodeshow = true
      } else {
        this.prucReceiptItemVOList = []
        this.receiptCodeshow = false
      }
    },
    // 获取收料单里面的所有物资
    getAllReceiptItem() {
      getAllReceiptItem(this.$route.query.id).then((res) => {
        if (res.data) {
          this.options = res.data
        }
      })
    },
    // 保存
    saveOrCommit(saveType) {
      // 1.保存2.提交
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.form.saveType = saveType
          var arr = this.form.prucReceiptReturnItemVOList
          var updateItemDTOList = arr.map((item) => {
            return {
              itemId: item.id,
              brand: item.brand,
              materialName: item.materialName,
              taxRate: item.taxRate,
              amount: item.amount,
              taxReduceUnitPrice: item.taxReduceUnitPrice,
              returnNum: Number(item.returnNum),
              remark: item.remark,
              certificate: item.certificate,
              unit: item.unit,
              taxes: item.taxes,
              taxIncludeUnitPrice: item.taxIncludeUnitPrice,
              standards: item.standards
            }
          })
          this.form.prucReceiptReturnItemDTOList = updateItemDTOList
          saveOrCommit(this.form).then((res) => {
            this.$message.success(res.msg)
            this.$router.push({
              path: '/purchase/acceptance'
            })
          })
        }
      })
    },
    // 校验退货数量
    verifyAmount(val, max, index) {
      if (val > max) {
        this.$message.error('超过最大值')
        this.form.prucReceiptReturnItemVOList[index].returnNum = max
      }
      if (val < 0) {
        this.$message.error('最小退货值为0')
        this.form.prucReceiptReturnItemVOList[index].returnNum = 0
      }
    },
    // 添加收料
    add() {
      this.title = '添加'
      this.isShow = true
      var arr = []
      this.form.prucReceiptReturnItemVOList.forEach((item) => {
        arr.push(item.materialName)
      })
      this.listIds = arr // 选择的数据回显回传判断选中
    },
    submitForm(data) {
      this.isShow = false
      if (data !== false) {
        this.prucReceiptItemVOList = []
        var arr = this.prucReceiptItemVOList.concat(data)
        var updateItemDTOList = arr.map((item) => {
          return {
            itemId: item.id,
            brand: item.brand,
            materialName: item.materialName,
            taxRate: item.taxRate,
            amount: item.amount,
            taxReduceUnitPrice: item.excludeTaxPrice,
            returnNum: Number((!item.amount || item.amount === null || item.amount === '') ? 0 : item.amount),
            remark: item.remark,
            certificate: item.certificate,
            unit: item.unit,
            taxes: item.taxes,
            taxIncludeUnitPrice: item.includeTaxPrice,
            standards: item.standards
          }
        }) // 收货单的数据改变成为退货单的数据
        this.form.prucReceiptReturnItemDTOList = updateItemDTOList // 穿给后台的数据
        this.form.prucReceiptReturnItemVOList = updateItemDTOList // 显示的数据
        // console.log(this.form.prucReceiptReturnItemVOList.returnNum,'===============')
        this.form.prucReceiptReturnItemVOList.forEach(items => {
          let returnNumCheck
          items[returnNumCheck] = items.returnNum
          // console.log(items[returnNumCheck],'------------')
        })
      }
    },
    // 删除行
    handelDelete(row, index) {
      this.form.prucReceiptReturnItemVOList.splice(index, 1)
    },
    // 关闭
    handleClose() {
      this.$router.back()
      // this.$router.push({
      //   name: 'orderIndex',
      //   params: { clickStatus: this.$route.query.clickStatus }
      // })
    }
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
