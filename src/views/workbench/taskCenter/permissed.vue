<template>
  <div class="pageWrap">
    <div class="border pb20">
      <span class="fwb pl25">审批信息</span>
    </div>
    <div class="pl40 pt15">
      <el-row :gutter="40">
        <el-col
          :span="10"
        ><div class="grid-content bg-purple">提交人：陈志明</div></el-col>
        <el-col
          :span="4"
        ><div class="grid-content bg-purple-light">
          模块：物资管理
        </div></el-col>
        <el-col
          :span="4"
        ><div class="grid-content bg-purple-light">
          业务：合同变更
        </div></el-col>
        <el-col
          :span="6"
        ><div class="grid-content bg-purple-light">
          提交时间：2017-10-31 23:18
        </div></el-col>
      </el-row>
      <p>项目名称：深圳市龙岗区耳鼻喉医院迁址重建工程</p>
      <p><span class="fl pr10">附件:</span></p><div class="section3 flex-col fl" /><span class="approveFile">审批附件.jpg</span>

    </div>
    <div class="border pb20 mb30 mt60">
      <span class="fwb pl25">审批进度</span>
    </div>
    <div class="block w50p">
      <el-timeline>
        <el-timeline-item v-for="lineitem in progressData" :key="lineitem" :timestamp="lineitem.userName" class="posr" placement="top">
          <span class="floatTime">{{ lineitem.createTime }}</span>
          <el-card>
            <p class="init" :class="{'green':lineitem.status==1}">{{ lineitem.nodeName }}</p>
            <p>{{ lineitem.comment }}</p>
          </el-card>
        </el-timeline-item>
        <!-- <el-timeline-item timestamp="2018/4/3" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/3 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-timeline-item timestamp="2018/4/2" placement="top">
      <el-card>
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/2 20:46</p>
      </el-card>
    </el-timeline-item> -->
      </el-timeline>
    </div>
  </div>
</template>

<script>
import { approvalProgress, approveTask } from '@/api/waitDeal'
export default {
  data() {
    return {
      progressData: [],
      textarea: ''
    }
  },
  async created() {
    const params = this.$route.query
    var initData = await approvalProgress({
      processInstanceId: params.procInsId,
      processDefinitionId: params.procDefId
    })
    this.progressData = initData.data
  },
  methods: {
    refuseTask() {},
    async permissTask() {
      const params = this.$route.query
      const bb = await approveTask({
        comment: this.textarea,
        instanceId: params.procInsId,
        taskId: params.taskId
      })
    }
  }
}
</script>

<style scoped lang="scss">
.pageWrap {
  margin-top: 16px;
  margin-left: 16px;
  margin-right: 16px;
  padding-top: 20px;
  background: #fff;
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
  left: 120px;
  color: #000;
  opacity: 0.4;
  font-size: 13px;
}
</style>
