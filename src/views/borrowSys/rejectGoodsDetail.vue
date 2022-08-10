<template>
  <div v-loading="loading" class="totalPlan-container">
    <div class="totalPlanTop">
      <div style="font-weight: 600">退料单：{{ returnData.returnCode || '' }}</div>
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
              <td class="tableTH">退料单编号</td>
              <td class="tableTD">{{ returnData.returnCode || '' }}</td>
              <td class="tableTH">报停单编号</td> 
              <td class="tableTD">{{ returnData.reportStopCode || '' }}</td>
            </tr>
            <tr>
              <td class="tableTH">收料单编号</td>
              <td class="tableTD">{{ returnData.receiptCode || '' }}</td>
              <td class="tableTH">退料车牌号</td>
              <td class="tableTD">{{ returnData.returnPlateNumber || '' }}</td>
            </tr>
            <tr>
              <td class="tableTH">送货人姓名</td>
              <td class="tableTD">{{ returnData.returnUserName || '' }}</td>
              <td class="tableTH">送货人联系电话</td>
              <td class="tableTD">{{ returnData.returnUserPhone || '' }}</td>
            </tr>
            <tr>
              <td class="tableTH">退料日期</td>
              <td class="tableTD">{{ returnData.returnDate || '' }}</td>
              <td class="tableTH">原因</td>
              <td class="tableTD">{{ returnData.reason || '' }}</td>
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
            <td class="tableTD">{{ returnData.supplier || '' }}</td>
            <td class="tableTH">联系人</td>
            <td class="tableTD">{{ returnData.contacts || '' }}</td>
          </tr>
          <tr>
            <td class="tableTH">联系电话</td>
            <td class="tableTD" colspan="3">{{ returnData.contactsPhone || '' }}</td>
          </tr>
        </table>
        <div class="title" style="font-weight: 600">
          <span>需用物资列表</span>
        </div>
        <el-table
          :data="materialList"
          style="width: 100%"
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column prop="materialName" label="物资名称" fixed="left" />
          <el-table-column prop="specification" label="规格型号" />
          <el-table-column prop="num" label="退货数量" />
          <el-table-column prop="unit" label="单位" />
          <el-table-column prop="taxIncludeUnitPrice" label="含税单价(元)" />
          <el-table-column prop="taxReduceUnitPrice" label="除税单价(元)" />
          <el-table-column prop="taxRate" label="税率(%)" />
          <el-table-column prop="taxes" label="税金(元)" />
          <el-table-column prop="remark" label="备注" />
          <!--          <el-table-column prop="editStatus" label="录入状态" fixed="right">-->
          <!--            <template slot-scope="scope">-->
          <!--              <el-button-->
          <!--                size="mini"-->
          <!--                type="text"-->
          <!--                @click="del(scope.row)"-->
          <!--              >删除</el-button> </template>>-->
          <!--          </el-table-column>-->
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { queryByReturnCode } from '@/api/contractManagement/material'
import { prucReturnDetail } from '@/api/borrowSys/prucReportStop'
export default {
  name: 'AddAndAdit',
  data() {
    return {
      orderNumber: '273.276.35.28',
      loading: false,
      size: '',
      ruleForm: {},
      form: {},
      returnData: {},
      materialList: []
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
      prucReturnDetail({ returnCode: this.$route.query.returnCode }).then(res => {
        if (res && res.status === 200) {
          let result = res.data || {}
          this.returnData = Object.assign(result.prucReturn, result.signUserByReturnIdDtos)
          this.materialList = result.materialList
        }
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
