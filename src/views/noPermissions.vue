<template>
  <div class="noPermissions">
    <div class="content">
      <div class="svg">
        <svg-icon
          icon-class="noPermissions"
          style="font-size: 80px;width: 80px;height:80px;display: flex;justify-content: center;"
        />
      </div>
      <div class="title">暂时没有权限哦</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.noPermissions {
  width: 100%;
  height: 500px;
  margin-top: 16px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    .svg{
      display: flex;
      justify-content: center;
      margin-bottom: 8px;
    }
    .title{
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #595959;
    }
  }
}
</style>
