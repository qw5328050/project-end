<template>
  <div class="search-container">
    <el-row type="flex" justify="space-between" align="middle" class="flex-box">
      <el-col style="flex: 1 1 auto">
        <el-row :gutter="32">
          <el-col :span="7">
            <span class="search-label">退换单编号：</span>
            <el-input
              v-model.trim="form.returnCode"
              class="search-input"
              placeholder="请输入"
            />
          </el-col>
          <el-col :span="7">
            <span class="search-label">原材料单编号：</span>
            <el-input
              v-model.trim="form.receiptCode"
              placeholder="请输入"
              class="search-input"
            />
          </el-col>
          <el-col :span="7">
            <span class="search-label">原收货单编号：</span>
            <el-input
              v-model.trim="form.deliveryNo"
              placeholder="请输入"
              class="search-input"
            />
          </el-col>
        </el-row>
      </el-col>
      <el-col style="flex: 0 0 155px">
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { deliveryOptions, checkOptions } from '../data'
export default {
  components: {},
  props: {},
  data() {
    return {
      deliveryOptions: Object.freeze(deliveryOptions),
      checkOptions: Object.freeze(checkOptions),
      form: {
        returnCode: '',
        receiptCode: '',
        deliveryNo: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.handleSearch()
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.$deepClone(this.form))
    },
    getSearchParams() {
      return this.$deepClone(this.form)
    },
    handleReset() {
      Object.assign(this.$data, this.$options.data())
      this.handleSearch()
    }
  }
}
</script>
<style lang="scss" scoped>
.search-container {
  padding: 24px;
  padding-left: 32px;
  background: white;
  font-size: 14px;
  .flex-box {
    flex-flow: row nowrap;
    > div {
      width: inherit;
    }
  }
  .search-label {
    color: rgba(0, 0, 0, 0.85);
  }
  .search-input {
    width: calc(100% - 100px);
  }
}
</style>
