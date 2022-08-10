<template>
  <div class="totalPlan-container">
    <div class="totalPlanTop">
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="title">结算单编号： {{ queryParams.orderNo }}</div>
        </el-col>
        <el-col
          :span="6"
        ><div class="search-btn">
          <el-button @click="back">取消</el-button>
          <el-button
            v-if="
              queryParams.orderStatus !== 5 && queryParams.orderStatus !== 6
            "
            @click="handerPrintData"
          >打印</el-button>
        </div></el-col>
      </el-row>
      <div class="totalText">
        <el-row :gutter="20">
          <el-col
            :span="5"
          ><div>结算单日期：{{ queryParams.createTime || '--' }}</div></el-col>
          <el-col
            :span="5"
          ><div>
            供应商名称：{{ queryParams.supplierName || '--' }}
          </div></el-col>
          <el-col
            :span="8"
          ><div>合同编号：{{ queryParams.contractNo || '--' }}</div></el-col>
          <el-col :span="6" />
        </el-row>
      </div>
      <div class="totalText">
        <el-row :gutter="20">
          <el-col
            :span="5"
          ><div>
            项目名称及编号：{{ queryParams.projectInfo || '--' }}
          </div></el-col>
          <el-col
            :span="5"
          ><div>
            结算单状态：
            {{
              getDictionaryLabel(queryParams.orderStatus, 'orderStatus') ||
                '--'
            }}
          </div></el-col>
          <el-col :span="6" />
        </el-row>
      </div>
      <div class="tab">
        <el-tabs
          v-model="activeName"
          class="tabBottom"
          @tab-click="handleClick"
        >
          <el-tab-pane label="结算信息" name="1" />
          <el-tab-pane
            v-if="queryParams.orderStatus != 2"
            label="审批信息"
            name="2"
          />
          <el-tab-pane label="变更记录" name="3" />
        </el-tabs>
      </div>
    </div>
    <el-card v-if="activeName === '1'" class="search-content">
      <div slot="header" class="clearfix">
        <span>结算信息</span>
      </div>
      <el-form
        ref="queryForm"
        :rules="rules"
        :label-position="labelPosition"
        :model="queryParams"
        label-width="90px"
      >
        <div class="boxContent">
          以上结算单内容为{{ queryParams.createTime }}至{{
            queryParams.endTime
          }}期间与本项目发生的所有业务，已按照合同（合同编号：{{
            queryParams.contractNo
          }}）约定的方式按月度结算进行结算，累计办理 月度结算{{
            copies || '0'
          }}份,实际结算金额{{ queryParams.actualAmount }}元。
        </div>
        <!-- <el-row :gutter="20">
          <el-col :xl="7" :lg="8" :xs="12" :sm="12" :md="12">
            <el-form-item label="期间供应商服务满意度" prop="satisfiedDegree">
              <el-radio-group v-model="queryParams.satisfiedDegree" disabled>
                <el-radio :label="1">非常满意</el-radio>
                <el-radio :label="2">满意</el-radio>
                <el-radio :label="3">不满意</el-radio>
                <el-radio :label="4">非常不满意</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
    </el-card>
    <el-card v-if="activeName === '1'" class="search-content">
      <div slot="header" class="clearfix">
        <span>月度结算单</span>
      </div>
      <el-table
        v-loading="loading"
        :data="queryParams.totalRelDTOS"
        element-loading-text="Loading"
        height="250"
        :header-row-class-name="() => 'headerClass'"
        style="margin-top: 8px"
      >
        <el-table-column align="center" label="序号" width="95">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="供货月份" prop="submitTime" />
        <el-table-column label="物资种类" prop="type">
          <template slot-scope="{ row }">
            {{ getDictionaryLabel(row.type, 'type') }}
          </template>
        </el-table-column>
        <el-table-column label="供货数量" prop="supplyQuantity" />
        <el-table-column label="供货金额" prop="supplyAmount" />
        <el-table-column
          label="月度结算单单号"
          show-overflow-tooltip
          prop="orderNo"
        />
        <el-table-column label="月度结算税率" prop="taxRate" />
        <el-table-column label="备注" prop="remark" />
      </el-table>
      <div class="cardText">
        <el-form
          ref="queryFormb"
          :rules="rules"
          :model="queryParams"
          label-width="250px"
        >
          <el-row :gutter="20" style="padding-top: 8px">
            <el-col :span="12">
              <el-row :gutter="20" style="padding-top: 29px">
                <el-col :span="24">
                  <el-form-item
                    label="除税结算金额（不含增值税）："
                    label-width="250px"
                  >
                    <el-input
                      v-model="queryParams.amountNoTax"
                      style="width: 70%"
                      placeholder="请输入"
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="padding-top: 28px">
                <el-col :span="24">
                  <el-form-item
                    label="含税结算金额（含增值税）："
                    label-width="250px"
                  >
                    <el-input
                      v-model="queryParams.amountTax"
                      style="width: 70%"
                      placeholder="请输入"
                      disabled
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row :gutter="20" style="padding-top: 24px">
                <el-col :span="20">
                  <div class="inputText">
                    {{ queryParams.amountNoTaxCapitalize }}
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="padding-top: 24px">
                <el-col :span="20">
                  <div class="inputText">
                    {{ queryParams.amountTaxCapitalize }}
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <div class="xian" />
          <el-row :gutter="20" style="padding-top: 28px">
            <el-col :span="12">
              <el-row :gutter="20" style="padding-top: 29px">
                <el-col :span="24">
                  <el-form-item
                    label="实际结算金额："
                    prop="actualAmount"
                    label-width="250px"
                  >
                    <el-input
                      v-model="queryParams.actualAmount"
                      style="width: 70%"
                      placeholder="请输入"
                      disabled
                    >
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="padding: 16px 0">
                <el-col :span="24">
                  <el-form-item
                    label="附件："
                    prop="fileInfoDTOS"
                    label-width="250px"
                  >
                    <FileUpload
                      :value="fileList"
                      :limit-num="3"
                      :file-size="20"
                      :file-type="fileType"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card v-if="activeName === '2'" class="search-content">
      <div slot="header" class="clearfix">
        <span>审批信息</span>
      </div>
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :class="{
            line: activity.status <= 1,
            hollow: activity.status === 2
          }"
        >
          <div class="content">
            <div class="top">
              <div class="name">
                <div class="nodeName">{{ activity.activityName }}</div>
                <div class="userName">{{ activity.assigneeName }}</div>
              </div>
              <div class="time">{{ activity.createTime }}</div>
            </div>
            <div class="bottom">
              <div class="normal" :class="{ successful: activity.status <= 1 }">
                {{ activity.comment || '同意' }}
              </div>
            </div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </el-card>
    <el-card v-if="activeName === '3'" class="search-content">
      <!-- 变更记录 -->
      <el-card class="search-content" shadow="never">
        <div slot="header" class="clearfix">
          <span>变更记录</span>
        </div>
        <el-table
          v-loading="loading"
          :data="queryParams.totalOrderRecordVoList"
          element-loading-text="Loading"
          highlight-current-row
          :header-row-class-name="() => 'headerClass'"
        >
          <el-table-column align="center" label="序号" width="95">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="变更人" prop="createUserName" />
          <el-table-column label="总结算单编号" prop="totalOrderNo" />
          <el-table-column label="月结算单编号" prop="orderNo" />
          <el-table-column label="变更项" prop="updateItem" />
          <el-table-column label="变更前" prop="updateBeforeItem" />
          <el-table-column label="变更后" prop="updateAfterItem" />
        </el-table>
      </el-card>
    </el-card>
    <PrintComponentTotal
      :visible.sync="isShowPrint"
      :print-loading="printLoading"
      :all-data-lit="printData"
    />
  </div>
</template>
<script>
import PrintComponentTotal from '../printComponentTotal'
import { getToken } from '@/utils/auth' // get token from cookie
import { getTotalOrderDetails } from '@/api/lumpsum/test'
import { getFlowRecord, totalUpdatePrintQuantity } from '@/api/settlement/test'
import FileUpload from '@/components/FileUploadsuccess'
import { chineseNumber } from '@/utils/validate'
export default {
  name: '',
  components: {
    FileUpload,
    PrintComponentTotal
  },
  data() {
    return {
      isShowPrint: false,
      chineSize: chineseNumber,
      printLoading: false,
      printData: [],
      fileType: ['xls', 'xlsx', 'doc', 'docx', 'pdf', 'jpg', 'png'],
      upload: {
        // 设置上传的请求头部
        headers: {
          access_token: getToken()
        },
        // 上传的地址
        url:
          process.env.VUE_APP_BASE_API +
          '/settlement-service/totalSettlementOrder/uploadFile'
        // 上传内容
      },
      activeName: '1', // tab切换
      tableTab: true, // tab切换
      copies: '', // 份数
      fileList: [],
      List: [], // 返回的数据集合
      reverse: true,
      activities: [],
      labelPosition: 'top',
      headerTitle: '', // 头部标题
      queryParams: {},
      loading: false,
      rules: {},
      processInstanceId: '' // 审批信息ID
    }
  },
  mounted() {
    this.headerTitle = this.$route.name ? this.$route.name : '总结算单'
    if (this.$route.query.activeName === '3') {
      this.activeName = this.$route.query.activeName
    }
  },
  created() {
    this.Details()
  },
  methods: {
    // 打印
    handerPrintData() {
      this.printData = []
      totalUpdatePrintQuantity({ orderId: this.queryParams.id }).then((res) => {
        this.isShowPrint = true
        this.printData.push(this.queryParams)
      })
    },
    back() {
      this.$router.push({
        path: '/settlement/lumpsum',
        query: { activeName: 'second' }
      })
    },
    // tab切换
    async handleClick(tab) {
      console.log(tab)
      if (tab.name === '1') {
        this.tableTab = true
      } else if (tab.name === '2') {
        const params = {
          id: this.processInstanceId
        }
        const res = await getFlowRecord(params)
        if (res.status === 200) {
          this.activities = res.data.sort((a, b) =>
            a.createTime.localeCompare(b.createTime)
          )
        }
      } else {
        this.tableTab = false
      }
    },
    submitForm() {},
    // 显示大写
    blurInputNo() {
      var amountNoTaxCapitalize = this.chineSize(
        this.queryParams.amountNoTax
      )
      this.$set(
        this.queryParams,
        'amountNoTaxCapitalize',
        amountNoTaxCapitalize
      )
    },
    // 显示大写
    blurInput() {
      var amountTaxCapitalize = this.chineSize(this.queryParams.amountTax)
      this.$set(this.queryParams, 'amountTaxCapitalize', amountTaxCapitalize)
    },
    // 总结算-详情
    Details() {
      this.loading = true
      getTotalOrderDetails({ totalOrderId: this.$route.query.id }).then(
        (res) => {
          if (res.status === 200) {
            this.queryParams = res.data
            this.processInstanceId = res.data.processInstanceId
            this.calculate()
            this.copies = this.queryParams.totalRelDTOS.length
            if (this.queryParams.fileInfoDTOS) {
              this.fileInfoDTOS()
            }
            this.loading = false
          }
        }
      )
    },
    // 上传回显
    fileInfoDTOS() {
      if (this.queryParams.fileInfoDTOS.length > 0) {
        this.List = this.queryParams.fileInfoDTOS
        var arr = this.queryParams.fileInfoDTOS
        this.fileList = arr.map((item) => {
          return {
            name: item.fileName,
            url: item.fileUrl
          }
        })
      }
    },
    // 合计金额
    calculate() {
      this.blurInputNo()
      this.blurInput()
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
    // height: 120px;
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
.inputText {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #262626;
  margin-left: -100px;
  height: 40px;
  line-height: 40px;
}
.boxFile {
  border: #d9d9d9 1px solid;
  width: 150px;
  background: #ffffff;
  text-align: center;
}
.buttonRow {
  display: flex;
  align-content: center;
}
.tab {
  margin-top: 8px;
}
.tabBottom {
  margin-top: 8px;
}
.boxContent {
  width: 99%;
  margin: 12px auto;
  padding: 8px;
  background: #fafafa;
  border-radius: 2px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #1791ff;
  line-height: 22px;
}

.content {
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .name {
      display: flex;
      align-items: center;
      .userName {
        margin-left: 16px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.9);
      }
      .nodeName {
        font-size: 14px;
        font-weight: 400;
        color: #1791ff;
      }
    }

    .time {
      margin-left: 16px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.4);
    }
  }
  .bottom {
    height: 40px;
    background: #f4f6fa;
    margin: 10px 0;
    line-height: 40px;
    padding-left: 24px;
    box-sizing: border-box;
    .successful {
      color: #0ac76f !important;
    }
    .normal {
      font-size: 14px;
      font-weight: 400;
      color: #595959;
    }
  }
}
</style>
