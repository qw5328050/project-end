<template>
  <div class="operationSuccessful">
    <svg-icon icon-class="operation-successful" style="font-size: 72px" />
    <div class="title">操作成功</div>
    <div class="subTitle">{{ showMsg }}</div>
    <div class="btns">
      <el-button @click="backList">返回列表</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubmitApprovalSuccessful',
  props: {
    showMsg: {
      type: String,
      require: true,
      default: ''
    },
    backListPath: {
      type: String,
      require: true,
      default: ''
    }
  },
  methods: {
    backList() {
      if (this.backListPath) {
        this.$router.push({ path: this.backListPath })
      }
    },
    toCurrent() {
      location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
.operationSuccessful {
  height: 300px;
  width: 100%;
  background: #fff;
  text-align: center;
  .title {
    margin-top: 24px;
    margin-bottom: 8px;
    font-size: 24px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  .subTitle {
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.43);
  }
  .btns {
    margin-top: 24px;
  }
}
</style>
