<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <el-row :gutter="24">
        <el-col :span="24">
          <div class="title" style="font-weight: 600; margin-bottom: 8px">
            订单编号： {{ orderDetail.normalOrderCode }}
          </div>
        </el-col>
      </el-row>
      <div class="totalText">
        <el-row :gutter="24">
          <el-col :span="8"><div>项目名称：{{ orderDetail.projName }}</div></el-col>
          <el-col :span="8"><div>计划编号：{{ orderDetail.needPlanCode }}</div></el-col>
          <el-col :span="8"><div>合同编号：{{ orderDetail.contractCode }}</div></el-col>
        </el-row>
      </div>
      <div class="totalText">
        <el-row :gutter="24">
          <el-col :span="8"><div>供应商名称：{{ orderDetail.supplierName }}</div></el-col>
          <el-col :span="8"><div>联系人：{{ orderDetail.contacts }}</div></el-col>
          <el-col :span="8"><div>联系电话：{{ orderDetail.contactPhone }}</div></el-col>
        </el-row>
      </div>
      <div class="totalText">
        <el-row :gutter="24">
          <el-col :span="8"><div>项目编码：{{ orderDetail.projCode }}</div></el-col>
          <el-col :span="8"><div>发货状态：
            <span v-if="orderDetail.deliveryStatus===1">
              待发货
            </span>
            <span v-else-if="orderDetail.deliveryStatus===2">
              部分发货
            </span>
            <span v-else-if="orderDetail.deliveryStatus===3">
              全部发货
            </span>
          </div></el-col>
          <el-col :span="8"><div>退回状态：
            <span v-if="orderDetail.returnStatus===1">
              部分退回
            </span>
            <span v-else-if="orderDetail.returnStatus===2">
              全部退回
            </span>

          </div></el-col>
        </el-row>
      </div>
      <div class="totalText">
        <el-row :gutter="24">
          <el-col :span="8"><div>收货地址：{{ orderDetail.receivingAddress }}</div></el-col>
          <el-col :span="8"><div>收货人：{{ orderDetail.receivingUserName }} </div>
          </el-col>
          <el-col :span="8">
            <div>收货人联系方式：{{ orderDetail.receivingUserPhone }}
            </div>
          </el-col>
        </el-row>
      </div>
      <div v-if="orderDetail.contractSettlementType === 2" class="totalText">
        <el-row :gutter="24">
          <el-col :span="8"><div>基准类型：{{ getDictionaryLabel(orderDetail.benchmarkType, 'benchmarkType') }}</div></el-col>
        </el-row>
      </div>
    </div>
    <el-card class="search-content">
      <div slot="header" class="clearfix">
        <span style="font-weight: 600">需用物资列表</span>
      </div>
      <el-table
        v-loading="loading"
        :data="orderItems"
        element-loading-text="Loading"
        :header-row-class-name="() => 'headerClass'"
        style="margin-top: 8px"
      >
        <!-- <el-table-column
          type="selection"
          width="55"
          align="center"
          fixed="left"
        /> -->
        <el-table-column align="center" label="序号" width="95" fixed="left">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="物资名称" prop="name" />
        <el-table-column label="计划规格型号" prop="planSpecification" />
        <el-table-column label="合同规格型号" prop="contractSpecification" />
        <el-table-column label="单位" prop="unit" />
        <el-table-column label="税率(%)" prop="taxVal" />
        <el-table-column v-if="orderDetail.contractSettlementType === 1 || orderDetail.contractSettlementType===3 || orderDetail.contractSettlementType===4" label="含税单价(元)">
          <template slot-scope="scope">
            <span v-if="scope.row.excludeTaxPrice&&scope.row.excludeTaxPrice!==null&&scope.row.taxVal&&scope.row.taxVal!==null">{{ (parseFloat(scope.row.excludeTaxPrice) * (parseFloat(scope.row.taxVal)/100+1)).toFixed(2) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-if="orderDetail.contractSettlementType===2" prop="floatingScale" label="浮动比例(%)" />
        <el-table-column v-if="orderDetail.contractSettlementType===2" prop="contractAppointmentPrice" label="合同约定浮动价(元)" />
        <el-table-column v-if="orderDetail.contractSettlementType===4" prop="contractUnit" label="计量方式" />
        <el-table-column v-if="orderDetail.contractSettlementType===4" prop="settlementMethod" label="结算方式">
          <template scope="scope">
            {{ getDictionaryLabel(scope.row.settlementMethod, 'settlementMethod') }}
          </template>
        </el-table-column>
        <!--        <el-table-column label="合同单价" prop="unitPrice" />-->
        <el-table-column label="需用数量" prop="num">
          <template slot-scope="scope">
            {{ scope.row.num }}
          </template>
        </el-table-column>
        <el-table-column label="退回数量" prop="giveBackNum">
          <template slot-scope="scope">
            {{ scope.row.giveBackNum }}
          </template>
        </el-table-column>
        <el-table-column label="进场日期" prop="entryDate" />
        <el-table-column label="备注" prop="remark" />
      </el-table>
    </el-card>
    <!--    <el-card class="search-content">-->
    <!--      <div slot="header" class="clearfix">-->
    <!--        <span>审批信息</span>-->
    <!--      </div>-->
    <!--      <div v-if="flowRecord===null">-->
    <!--        <span>-->
    <!--          暂无-->
    <!--        </span>-->
    <!--      </div>-->
    <!--      <el-timeline v-if="flowRecord!==null" :reverse="reverse" class="timeline">-->
    <!--        <el-timeline-item-->
    <!--          v-for="(activity, index) in flowRecord"-->
    <!--          :key="index"-->
    <!--          :color="activity.comment!==null?'#0bbd87':''"-->
    <!--          :timestamp="activity.nodeName"-->
    <!--        >-->
    <!--          <span v-if="activity.comment!==null">-->
    <!--            {{activity.comment}} {{ activity.createTime===null?'':activity.createTime}}-->
    <!--          </span>-->
    <!--          <span v-else>-->
    <!--            待审批-->
    <!--          </span>-->
    <!--        </el-timeline-item>-->
    <!--      </el-timeline>-->
    <!--    </el-card>-->
  </div>
</template>
<script>
import { getOrderDetail } from '@/api/purchase/normalOrder'
import { approvalProgress } from '@/api/purchase/bpm'

export default {
  name: 'PurchaseDetailsAssets',
  data() {
    return {
      orderDetail: {}, // 订单详情
      orderItems: [], // 订单物资列表
      flowRecord: null, // 订单审批信息
      reverse: true,
      labelPosition: 'top',
      queryParams: {},
      loading: false

    }
  },
  mounted() {

  },
  created() {
    this.getDetail()
  },
  methods: {
    // 获取订单详情
    getDetail() {
      getOrderDetail(this.$route.query.id).then(res => {
        this.orderDetail = res.data
        if (this.orderDetail.processDefinitionId !== null && this.orderDetail.processInstanceId !== null) {
          const obj = { processDefinitionId: this.orderDetail.processDefinitionId, processInstanceId: this.orderDetail.processInstanceId }
          this.getApprovalProgress(obj)
        }
        this.orderItems = res.data.prucNormalOrderItemDetailVOS
        this.flowRecord = res.data.flowRecord
        if (this.flowRecord !== null && this.flowRecord.list !== null) {
          this.flowRecord.flowList.forEach(item => {
            item.color = '#0bbd87'
          })
        }
      })
    },
    // 获取审批进度
    getApprovalProgress(data) {
      approvalProgress(data).then(res => {
        this.flowRecord = res.data
      })
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
.totalPlan-container {
  .totalPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 190px;
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
.totalText {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #595959;
  line-height: 20px;
  margin-top: 8px;
}
::v-deep.el-button {
  margin-left: 0em;
}
.dropdownLeft {
  margin-right: 16px;
}
.search-content {
  margin: 16px;
}
.cardText {
  margin-top: 16px;
  background-color: #fafafa;
}
::v-deep .el-form-item {
  margin-bottom: 0em;
}
::v-deep.el-form--label-top .el-form-item__label {
  padding: 0em;
}
.xian {
  border: 1px dashed #d9d9d9;
  margin-top: 24px;
}
.amount {
  height: 40px;
  line-height: 40px;
}
.timeline {
  margin-left: 1%;
}
.gutterCol {
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-around;
}
</style>
