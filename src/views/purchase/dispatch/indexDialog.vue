<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="50%"
    append-to-body
    :before-close="handleClose"
  >
    <el-table
      v-loading="loading"
      :data="list"
      :size="size"
      height="385"
      :header-row-class-name="() => 'headerClass'"
    >
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column align="center" label="序号" width="95">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="发货单编号" prop="deliveryNo" />
      <el-table-column label="物资名称" prop="materialName" />
      <el-table-column label="车牌号" prop="plateNumber" />
      <el-table-column label="发货时间" prop="deliveryDate" />
      <el-table-column label="验收状态" prop="receiptStatus">
        <template slot-scope="scope">
          <span v-if="scope.row.receiptStatus==='0'">
            未完成
          </span>
          <span v-if="scope.row.receiptStatus==='1'">
            已完成
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click="details(scope.row)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: 'IndexDialog',
  props: {
    list: {
      type: Array,
      require: true,
      default: () => []
    },
    title: {
      type: String,
      require: true,
      default: ''
    },
    visible: {
      type: Boolean,
      require: true
    },
    interviewId: {
      type: String,
      require: true,
      default: ''
    }
  },
  data() {
    return {
      form: {},
      loading: false, // 表格加载
      size: 'medium'

    }
  },
  //   watch: {
  //     visible: {
  //       handler() {
  //         if (this.interviewId) {
  //           this.getList();
  //         }
  //       },
  //       immediate: true,
  //     },
  //   },
  methods: {
    // 获取数据
    // getList() {
    //   this.loading = true;
    //   getEmploymentInfo(this.interviewId).then((res) => {
    //     this.form = res.data;
    //     this.loading = false;
    //   });
    // },
    // 跳转详情页
    details(row) {
      this.$router.push({
        path: '/purchase/deliver',
        query: { id: row.id }
      })
    },
    // 关闭
    handleClose() {
      this.form = {}
      this.$emit('update:visible', false)
    },
    // 提交
    submitForm() {
      this.$emit('submitForm', this.form)
      this.handleClose()
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
::v-deep .el-dialog__title {
  line-height: 24px;
  font-size: 14px;
  font-weight: 600;
  color: #262626;
}
.footer {
  // position: absolute;
  width: 100%;
  margin-top: 16px;
  padding-left: 40px;
  padding-right: 24px;
  box-sizing: border-box;
  height: 64px;
  justify-content: space-between;
  background: #ffffff;
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
}
</style>
