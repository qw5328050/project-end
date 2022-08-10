<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <div class="project">
        <div class="name">项目名称：{{ form.projectName }}</div>
        <!-- <div class="switch-svg"><svg-icon icon-class="switch" /></div> -->
      </div>
    </div>
    <div class="app-container">
      <el-card class="box-card" style="box-shadow: none">
        <div class="title">基本资料</div>
        <div>
          <table
            border="1"
            style="
              border-collapse: collapse;
              width: 100%;
              text-align: center;
              border-color: #dfe6ec;
            "
          >
            <tr>
              <td class="tableTH">盘点内容</td>
              <td class="tableTD">{{ form.content }}</td>
              <td class="tableTH">盘点时间</td>
              <td class="tableTD">
                {{ `${form.inventoryStartTime} ~ ${form.inventoryEndTime}` }}
              </td>
            </tr>
            <tr>
              <td class="tableTH">盘点人</td>
              <td class="tableTD">{{ form.createUserName }}</td>
              <td class="tableTH"></td>
              <td class="tableTD"></td>
            </tr>
          </table>
        </div>
        <div class="title">盘点人</div>
        <el-table
          :data="form.operatorDTOS"
          :header-cell-style="{ background: '#FAFAFA' }"
          max-height="590"
          style="width: 100%"
        >
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="materialName" label="物资名称"  />
          <el-table-column prop="specification" label="规格型号" width="120"/>
          <el-table-column prop="unit" label="单位" width="80"/>
          <el-table-column prop="nodeGraphCalculation" label="工程节点图算量" width="120"/>
          <el-table-column prop="lastPeriodStock" label="总量上期存量" width="120"/>
          <el-table-column prop="incomingQuantity" label="总量当期进厂量" width="120"/>
          <el-table-column prop="stockMaterials" label="存量原材料" width="120"/>
          <el-table-column prop="stockSemiFinishedProducts" label="存量成品/半成品数量" width="120"/>
          <el-table-column prop="usageAmount" label="使用数量" width="120"/>
          <el-table-column prop="riskAnalysis" label="风险分析" width="120"/>
          <el-table-column prop="remark" label="原因说明" width="120"/>
          <el-table-column prop="consumptionRatio" label="耗用量" width="120"/>
          <el-table-column prop="festivalRate" label="节超率" width="120"/>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getDetails } from "@/api/materialsSiteManagement/plan";

export default {
  name: "Base",
  data() {
    return {
      loading: false,
      form: {},
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    async getDetail() {
      this.loading = true;
      let res = await getDetails({ id: this.$route.query.id });
      if (res && res.status == 200) {
        this.form = res.data;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.dateClass {
  color: red;
}

.totalPlan-container {
  .totalPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    .project {
      font-size: 14px;
      font-weight: 400;
      color: #595959;
      display: flex;
      align-items: center;
      .switch-svg {
        margin-left: 8px;
        font-size: 24px;
      }
    }
  }
  .box-content {
    padding: 24px;
    background: #fafafa;
    margin-top: 50px;
    .content-item {
      display: flex;
      align-items: flex-start;
      color: rgba(0, 0, 0, 0.85);
      margin-bottom: 24px;
      &:last-child {
        margin-bottom: 0px;
      }
      .item-name {
        width: 79px;
        font-size: 15px;
        font-weight: 600;
      }
      .item-content {
        font-size: 14px;
        font-weight: 400;
        flex: 1;
        color: #595959;
        &-attachment {
          margin-top: -2px;
          margin-left: -1px;
        }
      }
    }
  }
}

.title {
  margin-top: 24px;
  margin-bottom: 16px;
  &:nth-of-type(1) {
    margin-top: 0px;
  }
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
