<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="60%"
    append-to-body
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="90px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="供应商名称:">
            <el-input v-model="form.name" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button @click="resetQuery">重置</el-button>
            <el-button type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      v-loading="loading"
      :data="tableData"
      height="385"
      style="margin-top: 26px"
      :header-row-class-name="() => 'headerClass'"
    >
      <el-table-column align="left" prop="id" width="35">
        <template scope="{row}">
          <el-radio
            v-model="radio"
            :label="row.id"
            style="color: #fff; margin-right: -25px"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="序号" width="50">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="供应商名称" prop="supplierName" />
      <el-table-column label="创建时间" prop="createTime" />
    </el-table>
    <div class="actionButtons">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { selectSupplierByNameOrItemType } from "@/api/contractManagement/table";
export default {
  name: "IndexDialog",
  props: {
    visible: {
      type: Boolean,
      require: true,
    },
  },
  data() {
    return {
      radio: "",
      title: "供应商列表",
      tableData: [],
      form: {},
      loading: false, // 表格加载
      list: [], // 表格数据
      multipleSelection: [],
    };
  },
  watch: {
    visible: {
      handler() {
        this.getList();
      },
      immediate: true,
    },
  },
  created() {},
  methods: {
    // 确认按钮
    confirm() {
      this.projectLabel = this.tableData.find(({ id }) => id === this.radio);
      this.$emit("submitForm", this.projectLabel);
      this.$emit("update:visible", false);
    },
    // 获取数据
    getList() {
      this.loading = true;
      selectSupplierByNameOrItemType(this.form).then((res) => {
        this.tableData = res.data;
        this.loading = false;
      });
    },
    resetQuery() {
      this.form = {};
      this.getList();
    },
    handleQuery() {
      // this.queryParams.pageNum = 1
      this.getList();
    },
    // 关闭
    handleClose() {
      this.form = {};
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.actionButtons {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
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
