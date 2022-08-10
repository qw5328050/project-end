<template>
  <div v-loading="loading" class="totalPlan-container">
    <div class="totalPlanTop">
      <div style="font-weight: 600">退货单编号：{{ returnData.returnCode }}</div>
      <!-- <div class="project"> -->
      <!-- <div class="name">项目名称：{{ projectName }}</div> -->
      <!-- <div class="switch-svg"><svg-icon icon-class="switch" /></div> -->
      <!-- </div> -->
    </div>
    <div class="app-container">
      <el-card class="box-card" style="box-shadow: none">
        <!-- <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div> -->
        <div>
          <span class="title" style="font-weight: 600">基本信息</span>
          <el-form style="margin:16px 0;">
            <el-form-item label="退换货类型:">
              <el-radio-group v-model="returnData.returnType">
                <el-radio :label="'1'" disabled>退货</el-radio>
                <el-radio :label="'2'" disabled>换货</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="是否结算:">
              <el-radio-group v-model="returnData.isSettlement" disabled>
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
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
              <td class="tableTH">采购单编号</td>
              <td class="tableTD">{{ returnData.normalOrderCode }}</td>
              <td class="tableTH">发货单编号</td>
              <td class="tableTD">{{ returnData.deliveryNo }}</td>
            </tr>
            <tr>
              <td class="tableTH">收料单编号</td>
              <td class="tableTD">{{ returnData.receiptCode }}</td>
              <td class="tableTH">发货车牌号</td>
              <td class="tableTD">{{ returnData.plateNumber }}</td>
            </tr>
            <tr>
              <td class="tableTH">送货人姓名</td>
              <td class="tableTD">{{ returnData.deliverName }}</td>
              <td class="tableTH">送货人联系电话</td>
              <td class="tableTD">{{ returnData.deliverTel }}</td>
            </tr>
            <tr>
              <td class="tableTH">发货日期</td>
              <td class="tableTD">{{ returnData.deliveryDate }}</td>
              <td class="tableTH">原因</td>
              <td class="tableTD">{{ returnData.reason }}</td>
            </tr>
            <tr>
              <td class="tableTH" v-if="returnData.returnCode">退货单编号</td>
              <td class="tableTD" v-if="returnData.returnCode">{{ returnData.returnCode }}</td>
              <td class="tableTH" v-if="returnData.returnCode">退货单编号</td>
              <td class="tableTD" v-if="returnData.returnCode">{{ returnData.returnCode }}</td>
            </tr>
            <tr>
              <td class="tableTH" v-if="returnData.plateNumber">退货车牌号</td>
              <td class="tableTD" v-if="returnData.plateNumber">{{ returnData.plateNumber }}</td>
              <td class="tableTH" v-if="returnData.returnContactPhone">发货人联系电话</td>
              <td class="tableTD" v-if="returnData.returnContactPhone">{{ returnData.returnContactPhone }}</td>
            </tr>
            <tr>
              <td class="tableTH" v-if="returnData.returnDate">退货日期</td>
              <td class="tableTD" v-if="returnData.returnDate">{{ returnData.returnDate }}</td>
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
            <td class="tableTH">供应商/厂家</td>
            <td class="tableTD">{{ returnData.supplierName }}</td>
            <td class="tableTH">联系人</td>
            <td class="tableTD">{{ returnData.contact }}</td>
          </tr>
          <tr>
            <td class="tableTH">联系电话</td>
            <td class="tableTD" colspan="3">{{ returnData.phone }}</td>
          </tr>
        </table>
        <div class="title" style="font-weight: 600">
          <span>需用物资列表</span>
        </div>
        <el-table
          :data="returnData.returnItemList"
          style="width: 100%"
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column prop="materialName" label="物资名称" fixed="left" />
          <el-table-column prop="standards" label="规格型号" />
          <el-table-column prop="returnNum" label="退货数量" />
          <el-table-column prop="unit" label="单位" />
          <el-table-column prop="includeTaxPrice" label="含税单价(元)" />
          <el-table-column prop="excludeTaxPrice" label="除税单价(元)" />
          <el-table-column prop="taxRate" label="税率(%)" />
          <el-table-column prop="taxes" label="税金(元)" />
          <el-table-column prop="remark" label="备注" />
          <!-- <el-table-column prop="editStatus" label="录入状态" fixed="right">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="del(scope.row)"
              >删除</el-button> </template>
          </el-table-column> -->
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { queryByReturnCode } from '@/api/contractManagement/material'
export default {
  name: 'AddAndAdit',
  data() {
    return {
      orderNumber: '273.276.35.28',
      loading: false,
      size: '',
      ruleForm: {},
      form: {},
      returnData: {}
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {},
  methods: {
    del() {},
    // 详情
    getDetail() {
      this.loading = false
      queryByReturnCode({ returnCode: this.$route.query.returnCode }).then(res => {
        this.returnData = res.data
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
