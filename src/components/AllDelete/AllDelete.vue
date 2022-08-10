<template>
  <div class="delete">
    <div class="selectBox">
      <el-checkbox
        v-model="check"
        @change="changeBox"
      >已选{{ selNum }}项</el-checkbox>
    </div>
    <div class="actionButtons">
      <el-popconfirm
        title="确定要删除选中的数据项吗？"
        @onConfirm="del"
      >
        <span slot="reference" style="color: #1890FF;cursor: pointer">删除</span>
      </el-popconfirm>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AllDelete',
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    selNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      check: false
    }
  },
  watch: {
    'checked': {
      handler: function(val, old) {
        if (val) {
          this.check = true
        } else {
          this.check = false
        }
      },
      deep: true	// 对象内部的属性监听，也叫深度监听
    }
  },
  methods: {
    // 选中
    changeBox() {
      this.$emit('isCheck', this.check)
    },
    // 删除
    del() {
      this.$emit('del')
    }
  }
}
</script>

<style lang="scss" scoped>
  .delete {
    border: 1px solid #08a9ef;
    margin-top: 16px;
    margin-bottom: 16px;
    background-color: #EDF7FF;
    width: 100%;
    /* padding-left: 40px; */
    padding-right: 24px;
    box-sizing: border-box;
    height: 40px;
    justify-content: space-between;
    /* background: #ffffff;
    box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08); */
    display: flex;
    align-items: center;
  }
  .selectBox{
    margin-left: 10px;
  }
</style>
