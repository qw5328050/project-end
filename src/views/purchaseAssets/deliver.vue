<template>
  <div>
    <!-- <div class="box"> -->
    <!-- <div class="box1">合同详情</div> -->
    <!-- <div class="box2">项目名称：深圳宝安区鸿昌花园幼儿园项目</div> -->
    <!-- <div class="box3">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="合同" name="first" />
          <el-tab-pane label="合同" name="second" />
        </el-tabs>
      </div> -->
    <!-- </div> -->
    <div class="app-container">
      <el-card class="box-card" style="box-shadow: none">
        <!-- <div slot="header" class="clearfix">
            <span>基本信息</span>
          </div> -->
        <div>
          <span class="title" style="font-weight: 600">基本信息deliver</span>
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
              <td class="tableTH">发货单编号</td>
              <td class="tableTD">{{ deliveryOrderData.deliveryNo }}</td>
              <td class="tableTH">采购单编号</td>
              <td class="tableTD">{{ deliveryOrderData.normalOrderCode }}</td>
            </tr>
            <tr>
              <td class="tableTH">供应商厂家</td>
              <td class="tableTD">{{ deliveryOrderData.supplierName }}</td>
              <td class="tableTH">发货车牌号</td>
              <td class="tableTD">{{ deliveryOrderData.plateNumber }}</td>
            </tr>
            <tr>
              <td class="tableTH">送货人姓名</td>
              <td class="tableTD">{{ deliveryOrderData.deliverName }}</td>
              <td class="tableTH">送货人联系电话</td>
              <td class="tableTD">{{ deliveryOrderData.deliverTel }}</td>
            </tr>
            <tr>
              <td class="tableTH">发货日期</td>
              <td class="tableTD">{{ deliveryOrderData.deliveryDate }}</td>
              <td class="tableTH">备注</td>
              <td class="tableTD">{{ deliveryOrderData.remark }}</td>
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
            <td class="tableTD">{{ deliveryOrderData.receiveCompanyName }}</td>
            <td class="tableTH">收料单位</td>
            <td class="tableTD">{{ deliveryOrderData.receiveProjectName }}</td>
          </tr>
          <tr>
            <td class="tableTH">材料工程师</td>
            <td class="tableTD" colspan="3">{{ deliveryOrderData.receiveEngineerName }}</td>
          </tr>
        </table>
        <div class="title" style="font-weight: 600">
          <span>物资信息</span>
        </div>
        <el-table
          :data="deliveryOrderData.detailList"
          style="width: 100%"
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column prop="name" label="物资名称" />
          <el-table-column prop="planSpecification" label="规格型号" />
          <el-table-column prop="num" label="发货数量" />
          <el-table-column prop="unit" label="单位" />
          <!--          <el-table-column prop="excludeTaxPrice" label="含税单价(元)" />-->
          <el-table-column prop="unitPrice" label="除税单价(元)" />
          <!--          <el-table-column prop="unitPrice" label="合同约定浮动价(含税)(元)" />-->
          <!--          <el-table-column prop="unitPrice" label="合同约定浮动价(除税)(元)" />-->
          <el-table-column prop="taxVal" label="税率(%)" />
          <!--          <el-table-column prop="taxes" label="税金(元)" />-->
          <el-table-column prop="certificate" label="合格证号" />
          <el-table-column prop="brand" label="品牌" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="enterStatus" label="录入状态">
            <!--            <template slot-scope="scope">-->
            <!--              <span v-if="scope.row.enterStatus===1">-->
            <!--                已完成-->
            <!--              </span>-->
            <!--              <span v-if="scope.row.enterStatus===0">-->
            <!--                未完成-->
            <!--              </span>-->
            <!--            </template>-->
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { queryDeliveryOrderById } from '@/api/purchase/deliveryOrder'

export default {
  name: 'DeliverAssets',
  data() {
    return {
      deliveryOrderData: {}, // 发货单详情数据
      loading: false,
      size: '',
      ruleForm: {},
      tableData: [
        { name: '测试', date: '2022-05-19' },
        { name: '测试', date: '2022-05-19' },
        { name: '测试', date: '2022-05-19' },
        { name: '测试', date: '2022-05-19' }
      ]
    }
  },
  created() {
  },
  mounted() {
    // 发货单详情
    this.queryDeliveryOrderById()
  },
  methods: {
    // 发货单详情
    queryDeliveryOrderById() {
      queryDeliveryOrderById(this.$route.query.id).then(res => {
        this.deliveryOrderData = res.data
      })
    },
    // getDetail(id) {
    //   this.loading = true;
    //   CheckPedestrianAreaInfo(this.id).then((res) => {
    //     this.form = { ...res.data };
    //     this.loading = false;
    //   });
    // },
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
.box {
  background-color: #fff;
  padding-bottom: 18px;
}
.box1 {
  margin-left: 32px;
  width: 120px;
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
  line-height: 28px;
}
.box2 {
  margin-left: 30px;
  margin-top: 8px;
  width: 266px;
  height: 28px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
  line-height: 28px;
}
.box3 {
  margin-left: 30px;
  position: relative;
  bottom: -15px;
}
</style>
