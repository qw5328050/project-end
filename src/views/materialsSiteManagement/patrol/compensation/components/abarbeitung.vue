<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    width="60%"
    append-to-body
    :before-close="handleClose"
  >
    <div class="table_content">
      <el-table
        ref="listTable"
        v-loading="loading"
        :data="list"
        border
        :header-row-class-name="() => 'headerClass'"
        style="margin-top: 5px"
        @selection-change="handleSelectionChange"
      >
        <el-table-column key="0" type="selection" width="55" align="center" />
        <el-table-column align="center" label="序号" width="50">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          label="整改单据编号"
          show-overflow-tooltip
          prop="number"
        />
        <el-table-column
          label="项目名称"
          show-overflow-tooltip
          prop="project"
        />
        <el-table-column
          label="接收名称"
          prop="acceptCompany"
          show-overflow-tooltip
          width="250"
        />
      </el-table>
      <div v-if="total > 0" class="pagination" style="margin-top: 15px">
        <Pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page.sync="queryParams.page"
          @pagination="getList"
        />
      </div>
    </div>
    <div class="actionButtons">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getList } from "@/api/materialsSiteManagement/abarbeitung";
export default {
  name: "Abarbeitung",
  props: {
    visible: {
      type: Boolean,
      require: true,
    },
    project: {
      type: Object,
      require: true,
      default: () => {},
    },
  },
  data() {
    return {
      title: "关联整改单",
      relationId: "",
      queryParams: {
        // 查询参数
        page: 1,
        rows: 10,
        status: "",
        type: "",
        projectId: '',
        project: ''
      },
      total: 0, // 总数
      list: [], // 表格数据
      ids: [],
      loading: false, // 表格加载
    };
  },
  watch: {
    visible: {
      handler(val) {        
        val && this.getList()
      },
      immediate: true
    }
  },
  methods: {
    handleSelectionChange(val) {
      if (val.length > 1) {
        this.$refs.listTable.clearSelection();
        this.$refs.listTable.toggleRowSelection(val.pop());
        return;
      }
      if (val[0]) {
        this.relationId = val[0].id;
        this.relationNumber = val[0].number;
      } else {
        this.relationId = "";
        this.relationNumber = '';
      }
    },
    // 获取数据
    getList() {
      this.loading = true;
      this.queryParams.projectId = this.project.projectId;
      this.queryParams.project = this.project.project;
      getList(this.queryParams)
        .then((res) => {
          const { list, total } = res.data;
          this.$set(this, "list", list);
          this.$set(this, "total", total);
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
      // 请求数据列表
    },
    // 确认按钮
    confirm() {
      this.$emit("submitForm", {id: this.relationId, number: this.relationNumber});
      this.$emit("update:visible", false);
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
::v-deep .headerClass th {
  background: #fafafa !important;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
}
.planStatus {
  display: flex;
  align-items: center;
  .box {
    width: 7px;
    height: 7px;
    box-sizing: border-box;
    border-radius: 50%;
    margin-right: 8px;
  }
  .draft {
    background: #bfbfbf;
  }
  .approval {
    background: #1791ff;
  }
  .normal {
    background: #00cc33;
  }
  .rejected {
    background: #faad14;
  }
  .withdraw {
    background: #ff4d4f;
  }
}
.totalPlan_container {
  .totalPlanTop {
    background: #fff;
    padding-left: 32px;
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    font-size: 20px;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    .project {
      font-size: 14px;
      font-weight: 400;
      color: #595959;
      display: flex;
      padding-bottom: 16px;
      align-items: center;
      .switch_svg {
        margin-left: 8px;
        font-size: 24px;
      }
    }
  }
  .search_content {
    background: #ffffff;
    margin: 16px;
    padding-top: 20px;
    box-sizing: border-box;
    height: 80px;
    overflow: hidden;
    .search-btn {
      padding-right: 24px;
      display: flex;
      box-sizing: border-box;
      justify-content: flex-end;
    }
  }
  .show_height {
    height: auto;
  }
  .table_box {
    width: 100%;
    padding: 0 16px;
    box-sizing: border-box;
    .table_content {
      width: 100%;
      height: 100%;
      padding: 16px 24px 0 24px;
      box-sizing: border-box;
      background: #fff;
      position: relative;
      .table_header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .table_title {
          font-size: 16px;
          font-weight: 400;
          color: #000000;
        }
        .table_button {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .footer {
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
}
</style>
