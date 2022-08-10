<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <div style="font-weight: 600">发货IP2：{{ orderNumber }}</div>
      <div class="project">
        <div class="name">项目名称：{{ form.projectName }}</div>
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
          <el-form>
            <el-form-item
              label="费用类型:"
              prop="feeType"
              style="margin-top: 16px"
            >
              <el-radio-group v-model="form.feeType" disabled>
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
            <span class="title" style="font-weight: 600">满意度</span>
            <el-divider></el-divider>
            <p>期间供应商服务满意度</p>
            <el-radio-group v-model="form.evaluate" disabled>
              <el-radio :label="1">非常满意</el-radio>
              <el-radio :label="2">满意</el-radio>
              <el-radio :label="3">不满意</el-radio>
              <el-radio :label="4">非常不满意</el-radio>
            </el-radio-group>
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
          <el-table-column prop="amount" label="收货数量" />
          <el-table-column prop="deliveryAmount" label="发货数量" />
          <el-table-column prop="unit" label="单位" />
          <el-table-column
            prop="taxIncludeUnitPrice"
            label="含税单价(元)"
            v-if="form.contractSettlementType != 2"
          />
          <el-table-column
            prop="taxReduceUnitPrice"
            label="降税单价(元)"
            v-if="form.contractSettlementType != 2"
          />
          <!--          <el-table-column prop="a" label="综合含税单价" />-->
          <!--          <el-table-column prop="a" label="综合除税单价" />-->
          <el-table-column
            v-if="form.contractSettlementType == 2"
            prop="taxIncludeUnitPrice"
            label="合同约定浮动价(含税)(元)"
          />
          <el-table-column
            v-if="form.contractSettlementType == 2"
            prop="taxReduceUnitPrice"
            label="合同约定浮动价(除税)(元)"
          />
          <el-table-column
            v-if="form.contractSettlementType == 2"
            prop="basePrice"
            label="基准价(元)"
          />
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
                getDictionaryLabel(row.settlementMode, "settlementMethod")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="form.contractSettlementType == 4"
            prop="renEndDate"
            label="租赁结束时间"
            width="200"
          >
          </el-table-column>
          <el-table-column
            v-if="form.contractSettlementType == 1"
            prop="adjustPrice"
            label="调价(元)"
            width="120"
          >
          </el-table-column>
          <el-table-column prop="extraPrice" label="附加费(元)" width="120">
          </el-table-column>
          <el-table-column prop="taxRate" label="税率(%)" />
          <el-table-column prop="taxes" label="税金(元)" />
          <el-table-column prop="certificate" label="合格证号" />
          <el-table-column prop="brand" label="品牌" />
          <el-table-column prop="remark" label="备注" />
          <el-table-column prop="editStatus" label="录入状态" fixed="right">
            <template slot-scope="{ row }">
              <span v-if="row.editStatus == 1">未完成</span>
              <span v-if="row.editStatus == 2">已完成</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="title" style="font-weight: 600">
          <span>签字记录表</span>
        </div>
        <el-table
          :data="form.prucReceiptSignList"
          style="width: 100%"
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column prop="receiverJob" label="人员类型" />
          <el-table-column prop="receiver" label="操作人" />
          <el-table-column prop="updateTime" label="操作时间">
            <template slot-scope="{ row }">
              <div :class="row.isOverFlow == 1 ? 'dateClass' : ''">
                {{ row.updateTime }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="title" style="font-weight: 600">
          <span>签收照片</span>
        </div>
        <div>
          <el-image
            v-for="item in url"
            :key="item"
            style="width: 100px; height: 100px; margin-right: 10px"
            :src="item"
            :preview-src-list="srcList"
          >
          </el-image>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { detail } from "@/api/contractManagement/material";
export default {
  name: "AddAndAdit",
  data() {
    return {
      loading: false,
      form: {},
      url: [],
    };
  },
  created() {
    this.getDetail();
  },
  mounted() {},
  methods: {
    // 详情
    getDetail(id) {
      this.loading = true;
      detail(this.$route.query.id).then((res) => {
        this.form = { ...res.data };
        if (res.data && res.data.hasOwnProperty("prucReceiptItemPicList")) {
          this.srcList = res.data.prucReceiptItemPicList.map((v) => {
            return v.imgUrl;
          });
          this.url = this.srcList;
        }
        this.loading = false;
      });
    },
    // 关闭
    handleClose() {
      //   this.form = {};
      //   this.$emit("update:visible", false);
      //   this.$emit("handleClose");
      //   if (this.$refs["form"]) {
      //     this.$refs["form"].clearValidate();
      //   }
    },
  },
};
</script>
<style lang="scss" scoped>
.dateClass {
  color: red;
}

.totalPlan-container {
  .satisfaction {
    border: 1px solid #909498;
    border-radius: 15px;
    padding: 15px 10px;
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
