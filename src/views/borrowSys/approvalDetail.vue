<template>
  <div class="pageWrap">
    <!-- <div class="border pb20">
      <span class="fwb pl25">审批信息</span>
    </div> -->
    <!-- <div class="pl40 pt15">
              <el-row :gutter="40">
        <el-col :span="10"
          ><div class="grid-content bg-purple">提交人：陈志明</div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple-light">
            模块：物资管理
          </div></el-col
        >
        <el-col :span="4"
          ><div class="grid-content bg-purple-light">
            业务：合同变更
          </div></el-col
        >
        <el-col :span="6"
          ><div class="grid-content bg-purple-light">
            提交时间：2017-10-31 23:18
          </div></el-col
        >
      </el-row>
            <p>项目名称：深圳市龙岗区耳鼻喉医院迁址重建工程</p>
      <p><span class="fl pr10">附件:</span><div class="section3 flex-col fl"></div><span class="approveFile">审批附件.jpg</span></p>

      </div> -->
    <div class="border pb20 mb30">
      <span class="fwb pl25">审批进度</span>
    </div>
    <div class="block w50p posr">
      <p v-show="hideOverflow" class="textOpa" @click="hideOverflow = false">
        点击查看更多
      </p>
      <el-timeline class="posr" :class="{ hideOverflow: hideOverflow }">
        <el-timeline-item
          v-for="(lineitem, index) in progressData"
          :key="lineitem + index"
          color="#1791FF"
          class="posr"
          placement="top"
        >
          <span
            class="floatTime"
          ><span class="nodename">{{
            lineitem.activityName ? lineitem.activityName : ""
          }}</span><span style="opacity: 0.4">{{ lineitem.createTime }}</span></span>
          <el-card>
            <p class="init" :class="dynamicColor(lineitem.type)">
              {{ typeStr(lineitem.type) }}
            </p>
            <p>{{ lineitem.comment }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { approvalProgress, approveTask, returnTask } from '@/api/waitDeal'
export default {
  data() {
    return {
      areaForm: { textarea: '同意' },
      regInput: { moneyNum: '' },
      hideOverflow: false,
      iframeloading: false,
      moneyShow: false,
      whichPlanBasicInfo: '',
      progressData: []
    }
  },
  mounted() {
    this.iframeLoad()
    this.$store.commit('app/CLOSE_SIDEBAR')
  },
  async created() {
    const params = this.$route.query
    var initData = await approvalProgress({
      processInstanceId: params.procInsId,
      processDefinitionId: params.procDefId
    })
    if (initData.data.length > 3) {
      this.hideOverflow = true
    }
    this.progressData = initData.data.reverse()
    this.frameSrc()
    this.showMoneyInput()
  },
  methods: {
    dynamicColor(type) {
      let str = ''
      switch (type) {
        case '1':
          str = 'green'
          break
        case '2':
          str = 'red'
          break
        case '3':
          str = 'red'
          break
        case '4':
          str = 'green'
          break
        case '5':
          str = 'green'
          break
        case '6':
          str = 'red'
          break
        case '7':
          str = 'red'
          break
      }
      return str
    },
    typeStr(type) {
      let str = ''
      switch (type) {
        case '1':
          str = '同意'
          break
        case '2':
          str = '退回'
          break
        case '3':
          str = '驳回'
          break
        case '4':
          str = '委派'
          break
        case '5':
          str = '转办'
          break
        case '6':
          str = '终止'
          break
        case '7':
          str = '撤回'
          break
      }
      return str
    },
    iframeLoad() {
      this.iframeloading = true
      const iframe = this.$refs.Iframe
      if (iframe.attachEvent) {
        // IE
        iframe.attachEvent('onload', () => {
          this.iframeloading = false
        })
      } else {
        // 非IE
        iframe.onload = () => {
          this.iframeloading = false
          // let iframeDom = document.querySelector("iframe");
          // let sideBar =
          //   iframeDom.contentWindow.document.querySelector(".has-logo");
        }
      }
    },
    showMoneyInput() {
      const { processCode, taskDefKey } = this.$route.query
      const renwu =
        taskDefKey === 'costAccountant' ||
        taskDefKey === 'companyMaterialManager'
      const liucheng = processCode === 'processSettlementTotal'
      if (liucheng && renwu) {
        this.moneyShow = true
      }
    },
    frameSrc() {
      const query = this.$route.query
      const commonUrlParam = `?id=${query.id}&processInstanceId=${
        query.procInsId
      }&isChange=${query.isChange ? query.isChange : ''}`
      switch (query.processCode) {
        case 'Process_1653649890649': /** 物资需用总计划 */
        case 'process_xa2gg3vg' /** 周转料需用总计划 */:
          this.whichPlanBasicInfo =
            '/#/plan/materialsTotalPlanDetails' + commonUrlParam
          break
        case 'Process_month_plan' /** 物资需用月度计划 */:
          this.whichPlanBasicInfo =
            '/#/plan/monthlyPlanDetail' + commonUrlParam
          break
        case 'Process_need_plan' /** 物资需用计划 */:
          this.whichPlanBasicInfo =
            '/project/#/plan/needPlanDetail' + commonUrlParam
          break
        case 'processSettlementMonthly' /** 月度结算 */:
          this.whichPlanBasicInfo =
            '/#/settlement/finalStatement' + commonUrlParam
          break
        case 'processSettlementTotal' /** 总结算 */:
          this.whichPlanBasicInfo =
            '/#/settlement/generalStatement' + commonUrlParam
          break
        case 'purchaseOrderPlacing' /** 采购订单 */:
          this.whichPlanBasicInfo =
            '/#/purchase/purchaseDetails' + commonUrlParam
          break
        case 'unlockReceiving' /** 收料 */:
          this.whichPlanBasicInfo = '/#/purchase/checkReceipt' + commonUrlParam
          break
      }
    },
    async refuseTask(param) {
      // if (!this.areaForm.textarea) {
      //   this.$message.error("请填写审批意见");
      //   return;
      // }
      // if (!this.areaForm.textarea) {
      //   return;
      // }
      // this.$refs[param].validate((valid) => {
      //   if (!valid) {
      //     return;
      //   }
      // });
      const params = this.$route.query
      const ret = await returnTask({
        taskId: params.taskId,
        processBaseId: params.processBaseId ? params.processBaseId : '',
        comment: this.areaForm.textarea ? this.areaForm.textarea : '不同意'
      }).then(() => {
        this.$router.push('/workbench/todo/index')
      })
    },
    async permissTask(param) {
      // if (!this.areaForm.textarea) {
      //   this.$message.error("请填写审批意见");
      //   return;
      // }
      // this.$refs[param].validate((valid) => {
      //   if (!valid) {
      //     return;
      //   }
      // });

      // if (!this.areaForm.textarea) {
      //   return;
      // }
      if (this.moneyShow && !this.regInput.moneyNum) {
        this.$message.error('请填写金额')
        return
      }
      const { taskDefKey, id } = this.$route.query
      const renwu =
        taskDefKey === 'costAccountant' ||
        taskDefKey === 'companyMaterialManager'
      const params = this.$route.query
      const bb = await approveTask({
        comment: this.areaForm.textarea ? this.areaForm.textarea : '同意',
        instanceId: params.procInsId,
        taskId: params.taskId,
        processBaseId: params.processBaseId,
        businessId: parseInt(id),
        cumSettlementPaidAmt:
          taskDefKey === 'costAccountant'
            ? parseFloat(this.regInput.moneyNum)
            : '',
        actualAmount:
          taskDefKey === 'companyMaterialManager'
            ? parseFloat(this.regInput.moneyNum)
            : ''
      })
        .then(() => {
          this.$router.push('/workbench/todo/index')
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.pageWrap {
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  // padding-top: 20px;
  background: #fff;
  padding-bottom: 50px;
}

.fwb {
  font-weight: bold;
}

.pb20 {
  padding-bottom: 20px;
}

.fz14 {
  font-size: 14px;
}

.mt60 {
  margin-top: 60px;
}

.mb30 {
  margin-bottom: 30px;
}

.pt15 {
  padding-top: 15px;
}

.pl25 {
  padding-left: 25px;
}
.pl40 {
  padding-left: 40px;
}

.dib {
  display: inline-block;
}
.section3 {
  width: 1.12vw;
  height: 1.12vw;
  background: url(https://lanhu.oss-cn-beijing.aliyuncs.com/SketchPng185fe0f7b65df4cc636dbd260b5d42d0e6bd4604d5ad68ef5e811cf3dd43a8b6)
    100% no-repeat;
}
.fl {
  float: left;
}

.pr10 {
  padding-right: 10px;
}
.approveFile {
  color: rgba(23, 145, 255, 1);
  margin-left: 5px;
}

.posr {
  position: relative;
}

.posa {
  position: absolute;
}

.hr {
  left: 0;
  width: 100%;
}

.pb15 {
  padding-bottom: 15px;
}

.w50p {
  width: 50%;
}

.border {
  border-bottom: 1px solid #f0f0f0;
}

.opa4 {
  opacity: 0.4;
}

.mr10 {
  margin-right: 10px;
}
.green {
  color: #0ac76f;
}

.init {
  margin: 0;
  padding: 0;
}

.timeline-textarea {
  width: 43.5%;
  margin-left: 68px;
}
.mt20 {
  margin-top: 20px;
}
.floatTime {
  position: absolute;
  top: 5px;
  font-size: 13px;
}

::v-deep {
  .el-timeline-item__timestamp {
    min-height: 17px;
  }
}

.moneyWrap {
  width: 43.5%;
  margin-left: 68px;
  margin-bottom: 40px;
}
.ovh {
  overflow: hidden;
}
.mapiframe {
  height: 473px;
  width: 111%;
  left: -81px;
  top: -176px;
}

// @media (max-width: 1366px) {
//   .mapiframe {
//     left: -7%;
//   }
// }

// @media (min-width: 1367px) and (max-width: 1440px) {
//   .mapiframe {
//     left: calc(100vw - 116%);
//   }
// }
// @media (min-width: 1441px) and (max-width: 1920px) {
//   .mapiframe {
//     left: -14%;
//   }
// }
// @media (min-width: 1920px) and (max-width: 2560px) {
//   .mapiframe {
//     left: -5%;
//   }
// }

::v-deep {
  .el-timeline-item__timestamp {
    color: #000;
  }
}
.nodename {
  color: #000;
  margin-right: 15px;
}

.red {
  color: #ff4d4f;
}

.hideOverflow {
  height: 440px;
  overflow: hidden;
}
.textOpa {
  background: rgba(256, 256, 256, 0.8);
  position: absolute;
  bottom: -18px;
  left: 0;
  right: 0;
  text-align: center;
  z-index: 1;
  line-height: 40px;
  cursor: pointer;
}

::v-deep {
  .el-form-item__error {
    top: 101%;
    left: 67px;
  }
}
</style>
